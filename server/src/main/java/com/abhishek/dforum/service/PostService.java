package com.abhishek.dforum.service;

import com.abhishek.dforum.dto.PostDTOMapper;
import com.abhishek.dforum.dto.PostObj;
import com.abhishek.dforum.dto.PostDTO;
import com.abhishek.dforum.model.Post;
import com.abhishek.dforum.model.Thread;
import com.abhishek.dforum.model.User;
import com.abhishek.dforum.repository.PostRepository;
import com.abhishek.dforum.repository.ThreadRepository;
import com.abhishek.dforum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class PostService {
    @Autowired
    private PostRepository postRepository;
    @Autowired
    private UserRepository userRepository;
    @Autowired
    private ThreadRepository threadRepository;
    @Autowired
    private PostDTOMapper postDTOMapper;

    public List<Post> getAllPosts(long thread_id) {
        return postRepository.findPostsByThreadId(thread_id);
    }

    public Post createPost(String username, PostDTO postDTO) {
        User user = userRepository.findByUserName(username).orElseThrow();
        Thread thread = threadRepository.findById(postDTO.threadId()).orElseThrow();
        Post p = postRepository.save(Post.builder().user(user).postBody(postDTO.postBody()).thread(thread).build());
        return p;
    }

    public Page<PostDTO> getPostsByUserId(long user_id, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Post> pages = postRepository.findPostsByUserId(user_id, pageable);
        List<PostDTO> posts = pages.getContent().stream().map(postDTOMapper).collect(Collectors.toList());
        return new PageImpl<>(posts, pageable, pages.getTotalElements());
    }

    public List<PostDTO> getPostsByThreadId(long thread_id) {
        List<PostDTO> posts = postRepository.findPostsByThreadId(thread_id).stream().map(postDTOMapper).collect(Collectors.toList());
        return posts;
    }
}
