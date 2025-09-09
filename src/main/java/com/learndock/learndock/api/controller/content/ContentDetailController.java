package com.learndock.learndock.api.controller.content;

import com.learndock.learndock.api.dto.content.ContentDetails;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Random;
import java.util.stream.IntStream;

@RestController
@RequestMapping("/api/content")
public class ContentDetailController {

    @GetMapping("/{id}")
    public ContentDetails getContent(@PathVariable String id) {
        Random rand = new Random();

        return ContentDetails.builder()
                .title("Title for " + id)
                .description("Description for " + id)
                .userRating(rand.nextDouble() * 5)
                .details(List.of(
                        ContentDetails.DetailKV.builder().label("Language").value("English, Japanese").build(),
                        ContentDetails.DetailKV.builder().label("Studio").value("Studio Mir").build(),
                        ContentDetails.DetailKV.builder().label("Premiere").value("2025-08-15").build(),
                        ContentDetails.DetailKV.builder().label("Status").value("Ongoing").build(),
                        ContentDetails.DetailKV.builder().label("Genre").value("Adventure, Sci-Fi").build(),
                        ContentDetails.DetailKV.builder().label("Episodes").value("12").build()
                ))
                .episodes(IntStream.rangeClosed(1, 12).mapToObj(i ->
                        ContentDetails.Episode.builder()
                                .id(i)
                                .season(1)
                                .number(i)
                                .title("Episode " + i)
                                .duration("24m")
                                .progress(rand.nextDouble() * 0.9)
                                .description("A short synopsis of the episode goes here.")
                                .build()
                ).toList())
                .related(IntStream.rangeClosed(1, 12).mapToObj(i ->
                        ContentDetails.RelatedItem.builder()
                                .id(i + 100)
                                .title("Related Title " + i)
                                .subtitle("Original Title")
                                .build()
                ).toList())
                .externalLinks(List.of(
                        ContentDetails.ExternalLink.builder().label("synchronkartei").href("https://www.synchronkartei.de/").build(),
                        ContentDetails.ExternalLink.builder().label("wikipedia").href("https://wikipedia.org").build(),
                        ContentDetails.ExternalLink.builder().label("fandom").href("https://www.fandom.com/").build()
                ))
                .actions(ContentDetails.Actions.builder()
                        .isSaved(false)
                        .isSubscribed(false)
                        .isContinue(false)
                        .build())
                .build();
    }
}
