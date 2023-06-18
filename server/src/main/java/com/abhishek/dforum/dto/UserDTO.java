package com.abhishek.dforum.dto;

import lombok.Builder;

import java.sql.Timestamp;

@Builder
public record UserDTO(
        long userId,
        String username,
        String email,
        Timestamp createdAt
) {
}
