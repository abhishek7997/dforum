package com.abhishek.dforum.dto;

import com.abhishek.dforum.model.Thread;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class ThreadDTOMapper implements Function<Thread, ThreadDTO> {
    @Override
    public ThreadDTO apply(Thread thread) {
        return ThreadDTO.builder()
                .threadId(thread.getThreadId())
                .title(thread.getTitle())
                .createdAt(thread.getCreatedAt())
                .content(thread.getContent())
                .username(thread.getUser().getUsername())
                .userId(thread.getUser().getUserId())
                .build();
    }
}
