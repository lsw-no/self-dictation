package com.lsw.selfdictation.service;

import com.lsw.selfdictation.pojo.Word;

import java.util.List;

public interface PlanWordService {
    List<Word> queryWordsByPlanId(String planId);

    int deleteWordByPlanId(int planId);

    int deleteWordByWordId(int wordId,int planId);
}
