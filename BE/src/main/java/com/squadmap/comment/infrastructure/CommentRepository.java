package com.squadmap.comment.infrastructure;

import com.squadmap.comment.domain.Comment;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.PathVariable;

import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c join fetch c.place where c.id = :commentId")
    Optional<Comment> findByIdFetchPlace(@Param("commentId") Long commentId);

    Slice<Comment> findCommentsByPlaceIdAndIdIsAfter(Long placeId, Long lastCommentId, Pageable pageable);

    Slice<Comment> findCommentsByPlaceId(Long placeId, Pageable pageable);
}
