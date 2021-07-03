package com.lsw.selfdictation.dao;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

@Repository
public interface UserDao {

    @Insert("insert user(openid) value(#{openid})")
    void addUser(@Param("openid")String openid);

    @Select("select count(*) from user where openid=#{openid}")
    int hasUser(@Param("openid")String openid);

}
