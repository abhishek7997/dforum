package com.abhishek.dforum.controller;

import com.abhishek.dforum.dto.UserDTO;
import com.abhishek.dforum.model.User;
import com.abhishek.dforum.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/users")
@RequiredArgsConstructor
public class UserController {
    @Autowired
    private UserService userService;
    @GetMapping("/user/{id}")
    public UserDTO getUserDetails(@PathVariable("id") long user_id) {
        return userService.getUserDetails(user_id);
    }

    @GetMapping("/currentUserId")
    public ResponseEntity<Long> getUserId(Authentication authentication) {
        if (authentication == null)
            return ResponseEntity.badRequest().body(null);

        User user = (User) authentication.getPrincipal();
        return ResponseEntity.ok().body(user.getUserId());
    }
}
