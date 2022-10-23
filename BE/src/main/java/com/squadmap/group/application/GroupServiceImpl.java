package com.squadmap.group.domain.application;

import com.squadmap.common.auth.application.dto.MemberInfo;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GroupServiceImpl implements GroupService {

    private final GroupRepository groupRepository;

    @Override
    public List<MemberInfo> searchMembersInGroup(Long mapId) {
        groupRepository.
        return null;
    }

}
