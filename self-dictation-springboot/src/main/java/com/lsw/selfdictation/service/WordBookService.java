package com.lsw.selfdictation.service;

import com.lsw.selfdictation.pojo.Word;

import java.util.List;

public interface WordBookService {
    List<Word> queryWordBookWordsByOpenId(String openid);

    int deleteWordBookWordById(int id,String openid);

    int addWordToWordBook(int id,String openid);
}
