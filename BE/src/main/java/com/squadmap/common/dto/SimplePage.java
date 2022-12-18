package com.squadmap.common.dto;

import lombok.*;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
@NoArgsConstructor(access = AccessLevel.PRIVATE)
public class SimplePage<T> {

    private int pageNumber;
    private int size;
    private int totalPages;
    private long totalElements;
    private boolean first;
    private boolean last;
    private List<T> content;

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
