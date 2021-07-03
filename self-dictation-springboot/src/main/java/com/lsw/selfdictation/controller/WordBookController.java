package com.lsw.selfdictation.controller;

import com.alibaba.fastjson.JSON;
import com.lsw.selfdictation.pojo.Word;
import com.lsw.selfdictation.service.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
public class WordBookController {
    @Autowired
    WordBookService wordBookService;

    @RequestMapping(value = "/getPlanBookWords", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getPlanBookWords(String openid) {

        List<Word> words = wordBookService.queryWordBookWordsByOpenId(openid);

        String wordsJson = JSON.toJSONString(words);

        return wordsJson;
    }

    @RequestMapping(value = "/deleteWord", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String deleteWord(String wordId,String openid){
        int i = wordBookService.deleteWordBookWordById(Integer.parseInt(wordId), openid);
        return String.valueOf(i);
    }

    @RequestMapping(value = "/addWord", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String addWord(String wordId,String openid){
        int i = wordBookService.addWordToWordBook(Integer.parseInt(wordId), openid);
        return String.valueOf(i);
    }

    @RequestMapping(value = "/addWordsList", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String addWordsList(String wordsStr,String openid){
        int count;
        int i = 0;
        List<Word> addWordList = JSON.parseArray(wordsStr, Word.class);
        List<Word> oldWords = wordBookService.queryWordBookWordsByOpenId(openid);

        for (Word newWord : addWordList) {
            count = 0;
            for (Word oldWord : oldWords) {
                if (oldWord.getWord().equals(newWord.getWord())){
                    count++;
                }
            }
            if (count == 0){
                i = wordBookService.addWordToWordBook(newWord.getId(), openid);
            }
        }

        if (i != 0){
            return "success";
        }

        return "not add";



    }



}
