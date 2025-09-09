package com.learndock.learndock.api.dto.content;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class ContentDetails {
    private String poster;
    private String title;
    private String subtitle;
    private String description;
    private Double userRating;
    private List<DetailKV> details;
    private Actions actions;
    private List<Episode> episodes;
    private List<RelatedItem> related;
    private List<ExternalLink> externalLinks;

    @Data
    @Builder
    public static class DetailKV {
        private String label;
        private String value;
    }

    @Data
    @Builder
    public static class Actions {
        private Boolean isSaved;
        private Boolean isSubscribed;
        private Boolean isContinue;
    }

    @Data
    @Builder
    public static class Episode {
        private Object id;
        private Integer season;
        private Integer number;
        private String title;
        private String duration;
        private Double progress;
        private String thumbnail;
        private String description;
    }

    @Data
    @Builder
    public static class RelatedItem {
        private Object id;
        private String title;
        private String subtitle;
        private String poster;
    }

    @Data
    @Builder
    public static class ExternalLink {
        private String label;
        private String href;
    }
}
