package com.devskill.domain;

import lombok.Data;
import lombok.EqualsAndHashCode;
import lombok.ToString;

import javax.persistence.Column;
import javax.persistence.Embeddable;
import javax.persistence.Lob;
import java.io.Serializable;

@Data
@ToString
@EqualsAndHashCode
@Embeddable
public class GoogleAnalytics implements Serializable {

	@Column(name = "ga_tracking_id", length = 100)
	private String trackingId;

	@Column(name = "ga_profile_id", length = 100)
	private String profileId;

	@Column(name = "ga_custom_dimension_index")
	private int customDimensionIndex;

	@Column(name = "ga_service_account_id", length = 300)
	private String serviceAccountId;

	@Column(name = "ga_service_account_p12_file_name", length = 300)
	private String serviceAccountP12FileName;

	@Lob
	@Column(name = "ga_service_account_p12_file_content")
	private byte[] serviceAccountP12FileContent;
}
