package com.irah.url_shortener.db;


import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
public class ShortenResponse {
    private String originalUrl;
    private String shortUrl;
    private int validity;

    public ShortenResponse(String originalUrl, String shortUrl, int validity) {
        this.originalUrl = originalUrl;
        this.shortUrl = shortUrl;
        this.validity = validity;
    }
}
