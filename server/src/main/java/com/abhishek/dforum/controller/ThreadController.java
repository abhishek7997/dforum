package com.abhishek.dforum.controller;

import com.abhishek.dforum.dto.ThreadDTO;
import com.abhishek.dforum.model.Thread;
import com.abhishek.dforum.service.ThreadService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/threads")
@RequiredArgsConstructor
public class ThreadController {
    @Autowired
    private ThreadService threadService;
    @PostMapping("/create")
    public ResponseEntity<Thread> createThread(Authentication authentication, @RequestBody ThreadDTO threadDTO) {
        if (authentication == null)
            return ResponseEntity.badRequest().body(null);
        System.out.println(authentication);
        Thread t = threadService.createThread(authentication.getName(), threadDTO);
        return ResponseEntity.ok(t);
    }

    @GetMapping("/getThreadById/{id}")
    public ThreadDTO getThreadById(@PathVariable("id") long threadId) {
        return threadService.getThreadById(threadId);
    }

    @GetMapping("/getThreadsByUserId/{id}")
    public Page<ThreadDTO> getThreadsByUserId(@PathVariable("id") long userId, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return threadService.getThreadsByUserId(userId, page, pageSize);
    }

    @GetMapping("/all")
    public List<ThreadDTO> getThreads() {
        return threadService.getAllThreads();
    }

    @GetMapping("/threads")
    public Page<ThreadDTO> getThreads(@RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int pageSize) {
        return threadService.getThreads(page, pageSize);
    }

    @DeleteMapping("/delete/{id}")
    public void deleteThreadById(@PathVariable("id") long threadId) {
        threadService.deleteThreadByThreadId(threadId);
    }

    @PutMapping("/update/{id}")
    public ThreadDTO updateThread(@PathVariable("id") long threadId, @RequestBody ThreadDTO threadDTO) {
        return threadService.updateThread(threadId, threadDTO);
    }
}
