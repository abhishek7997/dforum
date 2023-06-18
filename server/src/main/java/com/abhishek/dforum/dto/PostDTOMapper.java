package com.abhishek.dforum.dto;

import com.abhishek.dforum.model.Post;
import org.springframework.stereotype.Service;

import java.util.function.Function;

@Service
public class PostDTOMapper implements Function<Post, PostDTO> {
    @Override
    public PostDTO apply(Post post) {
        return PostDTO.builder()
                .postBody(post.getPostBody())
                .postId(post.getPostId())
                .userId(post.getUser().getUserId())
                .threadId(post.getThread().getThreadId())
                .threadTitle(post.getThread().getTitle())
                .createdAt(post.getCreatedAt())
                .updatedAt(post.getUpdatedAt())
                .username(post.getUser().getUsername())
                .build();
    }
}
