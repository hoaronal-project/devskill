package com.devskill.model;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.springframework.web.multipart.MultipartFile;

@Data
@ToString
@EqualsAndHashCode
@NoArgsConstructor
@AllArgsConstructor
public class GoogleAnalyticsUpdateRequest {
	private long blogId;
	private String trackingId;
	private String profileId;
	private Integer customDimensionIndex;
	private String serviceAccountId;
	private MultipartFile serviceAccountP12File;
}
