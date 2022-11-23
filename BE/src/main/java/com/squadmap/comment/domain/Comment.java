package com.squadmap.comment.domain;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.place.domain.Place;
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

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "place_id")
    private Place place;

    @Column(length = MAX_COMMENT_LENGTH)
    private String content;

    @CreatedDate
    private LocalDateTime writtenAt;

    @LastModifiedDate
    private LocalDateTime modifiedAt;

    public Comment(Long memberId, Place place, String content) {
        this.memberId = memberId;
        this.place = place;
        this.content = checkContentLength(content);
    }

    private String checkContentLength(String content) {
        if (content.isBlank() || content.length() > MAX_COMMENT_LENGTH) {
            throw new ClientException(ErrorStatusCodeAndMessage.OUT_OF_LIMIT_COMMENT_LENGTH);
        }
        return content;
    }

    public void update(String content) {
        this.content = checkContentLength(content);
    }

    public boolean isWriterId(Long memberId) {
        return this.memberId.equals(memberId);
    }

}
