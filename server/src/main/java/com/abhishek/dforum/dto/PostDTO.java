package com.abhishek.dforum.dto;

import lombok.Builder;

import java.sql.Timestamp;

@Builder
public record PostDTO(
        long threadId,
        long postId,
        long userId,
        String username,
        String postBody,
        String threadTitle,
        Timestamp createdAt,
        Timestamp updatedAt
) {

}

