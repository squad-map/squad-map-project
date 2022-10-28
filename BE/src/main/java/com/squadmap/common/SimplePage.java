package com.squadmap.common;

import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@RequiredArgsConstructor
public class SimplePage<T> {

    private final int pageNumber;
    private final int size;
    private final int totalPages;
    private final long totalElements;
    private final boolean first;
    private final boolean last;
    private final List<T> content;

    public SimplePage(Page<T> page) {
        this.pageNumber = page.getPageable().getPageNumber();
        this.size = page.getSize();
        this.totalPages = page.getTotalPages();
        this.totalElements = page.getTotalElements();
        this.first = page.isFirst();
        this.last = page.isLast();
        this.content = page.getContent();
    }

}
