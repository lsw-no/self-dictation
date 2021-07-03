package com.lsw.selfdictation.service.impl;

import com.lsw.selfdictation.dao.UserDao;
import com.lsw.selfdictation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserServiceImpl implements UserService {
    @Autowired
    UserDao userDao;

    @Override
    public void addUser(String openid) {
        userDao.addUser(openid);
    }

    @Override
    public int hasUser(String openid) {
        return userDao.hasUser(openid);
    }
}
