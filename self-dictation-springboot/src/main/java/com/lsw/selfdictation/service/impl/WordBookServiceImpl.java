package com.lsw.selfdictation.service.impl;

import com.lsw.selfdictation.dao.WordBookDao;
import com.lsw.selfdictation.pojo.Word;
import com.lsw.selfdictation.service.WordBookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordBookServiceImpl implements WordBookService {
    @Autowired
    WordBookDao wordBookDao;

    @Override
    public List<Word> queryWordBookWordsByOpenId(String openid) {
        return wordBookDao.queryWordBookWordsByOpenId(openid);
    }

    @Override
    public int deleteWordBookWordById(int id, String openid) {
        int i = wordBookDao.deleteWordBookWordById(id, openid);
        return i;
    }

    @Override
    public int addWordToWordBook(int id, String openid) {
        int i = wordBookDao.addWordToWordBook(id, openid);
        return i;
    }
}
