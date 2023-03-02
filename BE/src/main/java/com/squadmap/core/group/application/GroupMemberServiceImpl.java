package com.squadmap.core.group.application;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.access.CurrentAuthority;
import com.squadmap.core.access.MemberContext;
import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.group.application.dto.GroupMemberInfo;
import com.squadmap.core.group.application.dto.GroupMemberSimpleInfo;
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
import java.util.Optional;
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
        checkHasAuthority(mapId, loginMemberId, PermissionLevel.READ);
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
                    return new GroupMemberInfo(member.getId(), member.getNickname(), member.getProfileImage(), group.getPermissionLevel().name());
                })
                .collect(Collectors.toUnmodifiableList());

    }

    @Override
    @Transactional
    public GroupMemberSimpleInfo changeGroupMemberLevel(Long loginMemberId, Long mapId, Long memberId, String level) {
        checkHasAuthority(mapId, loginMemberId, PermissionLevel.HOST);
        GroupMember groupMember = groupMemberRepository.findByMapIdAndMemberId(mapId, memberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER));
        groupMember.updatePermissionLevel(level);

        return new GroupMemberSimpleInfo(groupMember.getMapId(), groupMember.getMemberId(), groupMember.getPermissionLevel().name());
    }

    @Override
    @Transactional
    public GroupMemberSimpleInfo addGroupMember(Long loginMemberId, Long mapId, Long memberId, String level) {

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

        return new GroupMemberSimpleInfo(mapId, memberId, level);

    }

    @Override
    @Transactional
    public void removeGroupMember(Long loginMemberId, Long mapId, Long memberId) {

        checkHasAuthority(mapId, loginMemberId, PermissionLevel.HOST);
        if(loginMemberId.equals(memberId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.HOST_IMMUTABLE);
        }

        groupMemberRepository.deleteByMapIdAndMemberId(mapId, memberId);
    }

    @Override
    public boolean hasRequiredLevel(AccessInfo accessInfo, PermissionLevel requiredLevel) {
        if(requiredLevel.equals(PermissionLevel.READ)) {
            com.squadmap.core.map.domain.Map map = mapRepository.findById(accessInfo.getMapId())
                    .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MAP));
            Optional<GroupMember> groupMemberOptional = groupMemberRepository.findByMapIdAndMemberId(accessInfo.getMapId(), accessInfo.getLoginId());
            if(groupMemberOptional.isPresent()) {
                GroupMember groupMember = groupMemberOptional.get();
                MemberContext.setContext(new CurrentAuthority(groupMember.getMemberId(), groupMember.getPermissionLevel()));
            }
            if (map.isFullDisclosure()) {
               return true;
            }
        }
        return hasAuthority(accessInfo, requiredLevel);
    }

    private boolean hasAuthority(AccessInfo accessInfo, PermissionLevel permissionLevel) {
        GroupMember groupMember = groupMemberRepository.findByMapIdAndMemberId(accessInfo.getMapId(), accessInfo.getLoginId())
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN));

        if (groupMember.hasRequiredPermission(permissionLevel)) {
            MemberContext.setContext(new CurrentAuthority(groupMember.getMemberId(), groupMember.getPermissionLevel()));
            return true;
        }
        return false;
    }

    private void checkHasAuthority(Long mapId, Long loginMemberId, PermissionLevel permissionLevel) {
        GroupMember groupMember = groupMemberRepository.findByMapIdAndMemberId(mapId, loginMemberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN));

        if (!groupMember.hasRequiredPermission(permissionLevel)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }
    }

}
