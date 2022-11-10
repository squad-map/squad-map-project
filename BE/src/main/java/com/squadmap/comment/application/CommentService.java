package com.squadmap.comment.application;

import com.squadmap.comment.application.dto.CommentInfo;
import com.squadmap.comment.domain.Comment;
import com.squadmap.comment.infrastructure.CommentRepository;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.group.infrastructure.GroupMemberRepository;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import com.squadmap.place.domain.Place;
import com.squadmap.place.infrastructure.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentService {

    private final CommentRepository commentRepository;
    private final PlaceRepository placeRepository;
    private final MemberRepository memberRepository;
    private final GroupMemberRepository groupMemberRepository;

    @Transactional
    public CommentInfo writeComment(Long memberId, Long placeId, String content) {
        Place place = placeRepository.findPlaceFetchAllById(placeId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_PLACE));

        if(!groupMemberRepository.existsByMapIdAndMemberId(place.getMapId(), memberId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_GROUP_MEMBER);
        }

        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MEMBER));

        Comment comment = commentRepository.save(new Comment(member.getId(), place, content));

        return new CommentInfo(member.getId(), member.getNickname(), member.getProfileImage(),
                comment.getId(), comment.getContent());
    }
}
