package com.lsw.selfdictation.controller;

import com.alibaba.fastjson.JSON;
import com.lsw.selfdictation.pojo.Word;
import com.lsw.selfdictation.service.WordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class WordController {
    @Autowired
    WordService wordService;

    @RequestMapping(value = "/getWordById", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getWordById(String wordId) {
        Word word = wordService.queryWordById(Integer.parseInt(wordId));

        String wordJson = JSON.toJSONString(word);

        return wordJson;

    }

    @RequestMapping(value = "/getWordByWord", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getWordByWord(String wordStr) {
        Word word = wordService.queryWordByWord(wordStr);

        String wordJson = JSON.toJSONString(word);

        return wordJson;

    }

    @RequestMapping(value = "/getWordByType", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getWordByType(String type,String page) {
        List<Word> words = wordService.queryWordsByType("%" + type + "%", Integer.parseInt(page));

        String wordsJson = JSON.toJSONString(words);

        return wordsJson;

    }
}
