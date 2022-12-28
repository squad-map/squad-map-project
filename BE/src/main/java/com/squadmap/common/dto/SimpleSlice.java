package com.squadmap.common.dto;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
import org.springframework.data.domain.Slice;

import java.util.List;

@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SimpleSlice<T> {

    private List<T> content;
    private int size;
    private int numberOfElements;
    private boolean hasNext;

    public SimpleSlice(Slice<T> slice) {
        this.content = slice.getContent();
        this.size = slice.getSize();
        this.numberOfElements = slice.getNumberOfElements();
        this.hasNext = slice.hasNext();
    }

    public List<T> getContent() {
        return content;
    }

    public int getSize() {
        return size;
    }

    public int getNumberOfElements() {
        return numberOfElements;
    }

    @JsonGetter
    public boolean hasNext() {
        return hasNext;
    }
}
