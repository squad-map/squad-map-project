package com.squadmap.comment.domain;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import javax.persistence.*;
import java.time.LocalDateTime;

@Entity
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
@EntityListeners(AuditingEntityListener.class)
public class Comment {

    private static final int MAX_COMMENT_LENGTH = 150;

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long memberId;

    private Long placeId;

    @Column(length = MAX_COMMENT_LENGTH)
    private String comment;

    @CreatedDate
    private LocalDateTime writeAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public Comment(Long memberId, Long placeId, String comment) {
        this.memberId = memberId;
        this.placeId = placeId;
        this.comment = checkCommentLength(comment);
    }

    private String checkCommentLength(String comment) {
        if(comment.isBlank() || comment.length() > MAX_COMMENT_LENGTH) {
            throw new ClientException(ErrorStatusCodeAndMessage.OUT_OF_LIMIT_COMMENT_LENGTH);
        }
        return comment;
    }

    private void update(String comment) {
        this.comment = checkCommentLength(comment);
    }

}
