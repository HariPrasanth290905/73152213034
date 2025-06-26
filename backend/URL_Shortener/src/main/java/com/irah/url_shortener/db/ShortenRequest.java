package com.irah.url_shortener.db;


import lombok.Data;

import java.util.List;

@Data
public class ShortenRequest {
    private List<UrlEntry> urls;

    @Data
    public static class UrlEntry {
        private String url;
        private Integer validity;
    }
}

