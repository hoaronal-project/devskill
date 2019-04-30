package com.techblog.domain;


import lombok.*;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class PaggingResult {
    private long firstPage;
    private long lastPage;
    private long totalPage;
    private long totalItem;
    private List itemList;
}
