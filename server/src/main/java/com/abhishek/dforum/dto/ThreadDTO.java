package com.abhishek.dforum.dto;

import lombok.Builder;

import java.sql.Timestamp;

@Builder
public record ThreadDTO (
    long threadId,
    long userId,
    String content,
    String title,
    Timestamp createdAt,
    String username
) {}
