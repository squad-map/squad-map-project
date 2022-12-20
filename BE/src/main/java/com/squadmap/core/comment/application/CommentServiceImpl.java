package com.squadmap.core.comment.application;

import com.squadmap.core.access.RequiredPermission;
import com.squadmap.core.comment.application.dto.CommentInfo;
import com.squadmap.core.comment.application.dto.CommentResponse;
import com.squadmap.core.comment.domain.Comment;
import com.squadmap.core.comment.infrastructure.CommentRepository;
import com.squadmap.common.dto.SimpleSlice;
import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.group.application.dto.AccessInfo;
import com.squadmap.core.group.domain.PermissionLevel;
import com.squadmap.member.domain.Member;
import com.squadmap.member.infrastructure.MemberRepository;
import com.squadmap.core.place.domain.Place;
import com.squadmap.core.place.infrastructure.PlaceRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Map;
import java.util.function.Function;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PlaceRepository placeRepository;
    private final MemberRepository memberRepository;

    @Override
    @Transactional
    @RequiredPermission(level = PermissionLevel.READ)
    public CommentInfo writeComment(AccessInfo accessInfo, Long placeId, String content) {
        Place place = placeRepository.findPlaceFetchAllById(placeId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_PLACE));


        Member member = memberRepository.findById(accessInfo.getLoginId())
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_MEMBER));

        Comment comment = commentRepository.save(new Comment(member.getId(), place, content));

        return new CommentInfo(member.getId(), member.getNickname(), member.getProfileImage(),
                comment.getId(), comment.getContent(), comment.getWrittenAt());
    }

    @Override
    @Transactional
    public CommentResponse updateComment(Long loginMemberId, Long commentId, String contents) {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_COMMENT));

        if (!comment.isWriterId(loginMemberId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }

        comment.update(contents);
        return new CommentResponse(commentId);

    }

    @Override
    @Transactional
    public void deleteComment(Long loginMemberId, Long commentId) {

        Comment comment = commentRepository.findById(commentId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_COMMENT));

        if (!comment.isWriterId(loginMemberId)) {
            throw new ClientException(ErrorStatusCodeAndMessage.FORBIDDEN);
        }
        commentRepository.delete(comment);
    }

    @Override
    @RequiredPermission(level = PermissionLevel.READ)
    public SimpleSlice<CommentInfo> readComments(AccessInfo accessInfo, Long placeId, Long lastCommentId, Integer size) {

        Place place = placeRepository.findPlaceFetchMapById(placeId)
                .orElseThrow(() -> new ClientException(ErrorStatusCodeAndMessage.NO_SUCH_PLACE));

        Slice<Comment> comments = commentRepository.findCommentsByPlaceIdAndIdIsAfter(placeId, lastCommentId, Pageable.ofSize(size));

        List<Long> memberIds = comments.getContent().stream()
                .map(Comment::getMemberId)
                .collect(Collectors.toUnmodifiableList());

        Map<Long, Member> memberMap = memberRepository.findAllById(memberIds)
                .stream()
                .collect(Collectors.toMap(Member::getId, Function.identity()));

        Slice<CommentInfo> commentInfos = comments.map(comment -> {
            Member member = memberMap.get(comment.getMemberId());
            return new CommentInfo(member.getId(), member.getNickname(), member.getProfileImage(),
                    comment.getId(), comment.getContent(), comment.getWrittenAt());
        });

        return new SimpleSlice<>(commentInfos);
    }
}
