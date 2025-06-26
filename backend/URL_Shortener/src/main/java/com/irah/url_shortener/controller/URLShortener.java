package com.irah.url_shortener.controller;

import com.irah.url_shortener.db.ShortenRequest;
import com.irah.url_shortener.db.ShortenResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.UUID;

@RestController
@RequestMapping("/api")
public class URLShortener {

    @PostMapping("/shorten")
    public List<ShortenResponse> shortenUrls(@RequestBody ShortenRequest request) {
        List<ShortenResponse> responseList = new ArrayList<>();

        for (ShortenRequest.UrlEntry entry : request.getUrls()) {
            String shortUrl = "https://shorturl/" + UUID.randomUUID().toString().substring(0, 6);
            responseList.add(new ShortenResponse(entry.getUrl(), shortUrl, entry.getValidity()));
            System.out.println("URL: " + entry.getUrl() + "Short URL: " + shortUrl);
        }
        return responseList;
    }

}
