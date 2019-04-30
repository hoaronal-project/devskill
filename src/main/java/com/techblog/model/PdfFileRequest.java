package com.techblog.model;

import lombok.*;

@Data
@ToString
@NoArgsConstructor
@AllArgsConstructor
@EqualsAndHashCode
public class PdfFileRequest {
    private String fileName;
    private String sourceHtmlUrl;
}

