package com.lsw.selfdictation.service.impl;

import com.lsw.selfdictation.dao.WordDao;
import com.lsw.selfdictation.pojo.Word;
import com.lsw.selfdictation.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class WordServiceImpl implements WordService {

    @Autowired
    WordDao wordDao;

    @Override
    public Word queryWordById(int id) {
        return wordDao.queryWordById(id);
    }

    @Override
    public Word queryWordByWord(String word) {
        return wordDao.queryWordByWord(word);
    }

    @Override
    public List<Word> queryWordsByType(String type,int startIndex) {
        return wordDao.queryWordsByType(type,startIndex);
    }


}
