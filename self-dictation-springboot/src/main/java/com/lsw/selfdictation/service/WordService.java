package com.lsw.selfdictation.service;
import com.lsw.selfdictation.pojo.Word;

import java.util.List;


public interface WordService {
    Word queryWordById(int id);
    Word queryWordByWord(String word);
    List<Word> queryWordsByType(String type,int startIndex);
}
