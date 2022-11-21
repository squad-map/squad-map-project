package com.squadmap.common;

import com.fasterxml.jackson.annotation.JsonGetter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Slice;

import java.util.List;

@RequiredArgsConstructor
public class SimpleSlice<T> {

    private final List<T> content;
    private final int size;
    private final int numberOfElements;
    private final boolean hasNext;

    public SimpleSlice (Slice<T> slice) {
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
