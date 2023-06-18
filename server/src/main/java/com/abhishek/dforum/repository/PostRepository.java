package com.abhishek.dforum.repository;

import com.abhishek.dforum.model.Post;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface PostRepository extends JpaRepository<Post, Long> {
    @Query(value = "SELECT * FROM posts WHERE posts.thread_id = :threadId ORDER BY posts.created_at DESC", nativeQuery = true)
    List<Post> findPostsByThreadId(@Param("threadId") long threadId);

    @Query(value = "SELECT * FROM posts WHERE posts.user_id = :userId ORDER BY posts.created_at DESC", nativeQuery = true)
    Page<Post> findPostsByUserId(@Param("userId") long userId, Pageable pageable);
}
