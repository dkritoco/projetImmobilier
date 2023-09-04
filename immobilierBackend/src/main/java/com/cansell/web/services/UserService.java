package com.cansell.web.services;

import com.cansell.web.dao.UserDao;
import com.cansell.web.model.User;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserService {
    private final UserDao userDao;

    public UserService(UserDao userDao) {
        this.userDao = userDao;
    }
    public void createUser(User user) {
        userDao.save(user);
    }

    public User findUserById(Long userId) {
        Optional<User> userOptional = userDao.findById(userId);
        return userOptional.orElse(null);
    }



}