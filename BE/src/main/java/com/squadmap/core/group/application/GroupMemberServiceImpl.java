package com.squadmap.core.group.application;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.group.application.dto.GroupMemberInfo;
import com.squadmap.core.group.domain.GroupMember;
import com.squadmap.core.group.domain.PermissionLevel;
import com.squadmap.core.group.infrastructure.GroupMemberRepository;
import com.squadmap.core.map.infrastructure.MapRepository;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class GroupMemberServiceImpl implements GroupMemberService {

    private final GroupMemberRepository groupMemberRepository;
    private final MemberRepository memberRepository;
    private final MapRepository mapRepository;

    @Override
    public List<GroupMemberInfo> searchMembersInGroup(Long loginMemberId, Long mapId) {
        checkHasReadLevel(mapId, loginMemberId);
        List<GroupMember> groups = groupMemberRepository.findByMapId(mapId);

        List<Long> memberIds = groups.stream()
                .map(GroupMember::getMemberId)
                .collect(Collectors.toUnmodifiableList());

        Map<Long, Member> members = memberRepository
                .findAllById(memberIds)
                .stream()
                .collect(Collectors.toMap(Member::getId, Function.identity()));

        return groups.stream()
                .map(group -> {
                    Member member = members.get(group.getMemberId());
                    return new GroupMemberInfo(member.getId(), member.getNickname(), member.getProfileImage(), group.getPermissionLevel());
                })
                .collect(Collectors.toUnmodifiableList());

    }

    @Override
    @Transactional
    public void changeGroupMemberLevel(Long loginMemberId, Long mapId, Long memberId, String level) {
        checkHasAuthority(mapId, loginMemberId, PermissionLevel.HOST);
        GroupMember groupMember = groupMemberRepository.findByMapIdAndMemberId(mapId, memberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER));
        groupMember.updatePermissionLevel(level);
    }

    @Override
    @Transactional
    public void addGroupMember(Long loginMemberId, Long mapId, Long memberId, String level) {

        checkHasAuthority(mapId, loginMemberId, PermissionLevel.HOST);
        GroupMember groupMember = GroupMember.of(mapId, memberId, level);
        if (groupMember.isHost()) {
            throw new ClientException(ErrorStatusCodeAndMessage.UNIQUE_HOST);
        }
        if (!mapRepository.existsById(mapId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP);
        }
        if (groupMemberRepository.existsByMapIdAndMemberId(mapId, memberId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.ALREADY_REGISTERED_GROUP_MEMBER);
        }

        groupMemberRepository.save(groupMember);
    }

    @Override
    @Transactional
    public void removeGroupMember(Long loginMemberId, Long mapId, Long memberId) {
        if (!loginMemberId.equals(memberId)) {
            checkHasAuthority(mapId, loginMemberId, PermissionLevel.HOST);
        }

        groupMemberRepository.deleteByMapIdAndMemberId(mapId, memberId);
    }

    @Override
    public void checkHasReadLevel(Long mapId, Long loginMemberId) {
        checkHasAuthority(mapId, loginMemberId, PermissionLevel.READ);
    }

    @Override
    public void checkHasMaintainLevel(Long mapId, Long loginMemberId) {
        checkHasAuthority(mapId, loginMemberId, PermissionLevel.MAINTAIN);
    }

    private void checkHasAuthority(Long mapId, Long loginMemberId, PermissionLevel permissionLevel) {
        GroupMember groupMember = groupMemberRepository.findByMapIdAndMemberId(mapId, loginMemberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN));

        if (!groupMember.hasRequiredPermission(permissionLevel)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }
    }

}
