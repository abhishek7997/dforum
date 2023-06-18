package com.abhishek.dforum.service;

import com.abhishek.dforum.dto.ThreadDTO;
import com.abhishek.dforum.dto.ThreadDTOMapper;
import com.abhishek.dforum.model.Thread;
import com.abhishek.dforum.model.User;
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
public class ThreadService {
    @Autowired
    private ThreadRepository threadRepository;
    @Autowired
    private ThreadDTOMapper threadDTOMapper;
    @Autowired
    private UserRepository userRepository;
    public Thread createThread(String username, ThreadDTO threadDTO) {
        User user = userRepository.findByUserName(username).orElseThrow();
        Thread t = threadRepository.save(Thread.builder().user(user).title(threadDTO.title()).content(threadDTO.content()).build());
        return t;
    }

    public List<ThreadDTO> getAllThreads() {
        return threadRepository.findAll().stream().map(threadDTOMapper).collect(Collectors.toList());
    }

    public Page<ThreadDTO> getThreadsByUserId(long userId, int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Thread> pages = threadRepository.findThreadsByUserId(userId, pageable);
        List<ThreadDTO> threadDTOs = pages.getContent().stream().map(threadDTOMapper).collect(Collectors.toList());
        return new PageImpl<>(threadDTOs, pageable, pages.getTotalElements());
    }

    public Page<ThreadDTO> getThreads(int page, int pageSize) {
        Pageable pageable = PageRequest.of(page, pageSize);
        Page<Thread> pages = threadRepository.findThreads(pageable);
        List<ThreadDTO> threadDTOs = pages.getContent().stream().map(threadDTOMapper).toList();
        return new PageImpl<>(threadDTOs, pageable, pages.getTotalElements());
    }

    public ThreadDTO getThreadById(long threadId) {
        Thread thread = threadRepository.findById(threadId).orElseThrow();
        return threadDTOMapper.apply(thread);
    }

    public ThreadDTO updateThread(long threadId, ThreadDTO threadDTO) {
        Thread thread = threadRepository.findById(threadId).orElseThrow();
        thread.setContent(threadDTO.content());
        thread.setTitle(threadDTO.title());
        threadRepository.save(thread);
        return threadDTOMapper.apply(thread);
    }

    public void deleteThreadByThreadId(long threadId) {
        threadRepository.deleteById(threadId);
    }
}
