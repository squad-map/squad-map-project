package com.squadmap.comment.domain;

import com.squadmap.common.excetpion.ClientException;
import com.squadmap.common.excetpion.ErrorStatusCodeAndMessage;
import com.squadmap.core.category.domain.Category;
import com.squadmap.core.comment.domain.Comment;
import com.squadmap.core.map.domain.Map;
import com.squadmap.core.place.domain.Place;
import com.squadmap.core.place.domain.Position;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThatThrownBy;

class CommentTest {

    @Test
    @DisplayName("Comment의 content의 길이가 150자를 초과하면 Exception이 발생한다.")
    void CommentCreateTest() {

        Long memberId = 1L;
        String content = "a";
        String outOfSizeContent = content.repeat(151);

        String placeName = "name";
        String address = "address";
        Position position = new Position(123.00, 36.00);
        String description = "description";
        String detailLink = "detailLink";
        Map map = Map.of("name", "emoji", true, memberId);
        Category category = Category.of("name", "color", map);
        Place place = Place.of(placeName, address, position, description, detailLink, map, category, memberId);

        assertThatThrownBy(() -> new Comment(memberId, place, outOfSizeContent))
                .isInstanceOf(ClientException.class)
                .hasMessage(ErrorStatusCodeAndMessage.OUT_OF_LIMIT_COMMENT_LENGTH.getMessage());
    }
}
