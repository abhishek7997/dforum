package com.abhishek.dforum.service;

import com.abhishek.dforum.dto.UserDTO;
import com.abhishek.dforum.dto.UserDTOMapper;
import com.abhishek.dforum.model.User;
import com.abhishek.dforum.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class UserService {
    @Autowired
    private UserRepository userRepository;

    @Autowired
    private final UserDTOMapper userDTOMapper;

    public UserDTO getUserDetails(long user_id) {
        User user = userRepository.findById(user_id).orElseThrow();
        return userDTOMapper.apply(user);
    }
}
