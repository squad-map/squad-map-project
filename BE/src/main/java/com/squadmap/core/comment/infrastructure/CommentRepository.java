package com.squadmap.core.comment.infrastructure;

import com.squadmap.core.comment.domain.Comment;
import com.squadmap.core.place.domain.Place;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Slice;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CommentRepository extends JpaRepository<Comment, Long> {

    @Query("select c from Comment c join fetch c.place where c.id = :commentId")
    Optional<Comment> findByIdFetchPlace(@Param("commentId") Long commentId);

    Slice<Comment> findCommentsByPlaceIdAndIdIsAfter(Long placeId, Long lastCommentId, Pageable pageable);

    Slice<Comment> findCommentsByPlaceId(Long placeId, Pageable pageable);

    @Modifying
    @Query("delete from Comment c where c.place.id in :places")
    void deleteCommentByPlaceIn(@Param("places") List<Long> places);

    @Modifying
    @Query("delete from Comment c where c.place.id = :placeId")
    void deleteCommentByPlaceIdQuery(@Param("placeId") Long placeId);
}
