package com.squadmap.group.application;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.group.application.dto.GroupMemberInfo;
import com.squadmap.group.domain.GroupMember;
import com.squadmap.group.domain.PermissionLevel;
import com.squadmap.group.infrastructure.GroupMemberRepository;
import com.squadmap.map.infrastructure.MapRepository;
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
        checkHasAuthority(loginMemberId, mapId, PermissionLevel.READ);
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
        if(!mapRepository.existsById(mapId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP);
        }
        groupMemberRepository.save(GroupMember.of(mapId, memberId, level));
    }

    @Override
    @Transactional
    public void removeGroupMember(Long loginMemberId, Long mapId, Long memberId) {
        if(!loginMemberId.equals(memberId)) {
            checkHasAuthority(mapId, loginMemberId, PermissionLevel.HOST);
        }

        groupMemberRepository.deleteByMapIdAndMemberId(mapId, memberId);
    }

    @Override
    public void checkHasAuthority(Long mapId, Long memberId, PermissionLevel permissionLevel) {
        GroupMember groupMember = groupMemberRepository.findByMapIdAndMemberId(mapId, memberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER));

        if(!groupMember.hasRequiredPermission(permissionLevel)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }

    }

}