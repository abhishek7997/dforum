package com.abhishek.dforum.repository;

import com.abhishek.dforum.model.Thread;
import jakarta.transaction.Transactional;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface ThreadRepository extends JpaRepository<Thread, Long> {
    @Query(value = "SELECT * FROM threads WHERE threads.user_id = :userId ORDER BY threads.created_at DESC", nativeQuery = true)
    Page<Thread> findThreadsByUserId(@Param("userId") long userId, Pageable pageable);

    @Query(value = "SELECT * FROM threads ORDER BY threads.created_at DESC", nativeQuery = true)
    Page<Thread> findThreads(Pageable pageable);

    @Transactional
    @Modifying
    @Query(value = "UPDATE threads thread SET thread.title = :title, thread.content = :content WHERE thread.thread_id = :threadId", nativeQuery = true)
    Thread updateThread(@Param("threadId") long threadId, @Param("title") String title, @Param("content") String content);
}
