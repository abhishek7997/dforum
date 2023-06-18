package com.abhishek.dforum.controller;

import com.abhishek.dforum.dto.PostDTO;
import com.abhishek.dforum.dto.PostDTOMapper;
import com.abhishek.dforum.model.Post;
import com.abhishek.dforum.service.PostService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/posts")
@RequiredArgsConstructor
public class PostController {
    @Autowired
    private PostService postService;
    @Autowired
    private PostDTOMapper postDTOMapper;

    @GetMapping("/all")
    public ResponseEntity<List<Post>> getAllPosts(@RequestParam long thread_id) {
        List<Post> posts = postService.getAllPosts(thread_id);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/getPostsByUserId/{id}")
    public ResponseEntity<Page<PostDTO>> getPostsByUserId(@PathVariable("id") long user_id, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int pageSize) {
        Page<PostDTO> posts = postService.getPostsByUserId(user_id, page, pageSize);
        return ResponseEntity.ok(posts);
    }

    @GetMapping("/getPostsByThreadId/{id}")
    public List<PostDTO> getPostsByThreadId(@PathVariable("id") long thread_id) {
        List<PostDTO> posts = postService.getPostsByThreadId(thread_id);
        return posts;
    }

    @PostMapping("/create")
    public ResponseEntity<PostDTO> createPost(Authentication authentication, @RequestBody PostDTO postDTO) {
        Post p = postService.createPost(authentication.getName() , postDTO);
        return ResponseEntity.ok(postDTOMapper.apply(p));
    }
}
