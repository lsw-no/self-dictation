package com.lsw.selfdictation.service;

public interface UserService {
    void addUser(String openid);
    int hasUser(String openid);
}
