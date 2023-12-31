package com.cansell.web.security;

import com.cansell.web.dao.UserDao;
import com.cansell.web.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    UserDao userDao;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Optional<User> optionalUser = userDao.findByEmail(email);


        if(optionalUser.isEmpty()){
            throw  new UsernameNotFoundException("L'utilisateur n'existe pas");
        }
        return new UserDetailsImpl(optionalUser.get());
    }

}
