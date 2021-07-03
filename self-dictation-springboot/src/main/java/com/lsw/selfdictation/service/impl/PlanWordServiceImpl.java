package com.lsw.selfdictation.service.impl;

import com.lsw.selfdictation.dao.PlanWordDao;
import com.lsw.selfdictation.pojo.Word;
import com.lsw.selfdictation.service.PlanWordService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanWordServiceImpl implements PlanWordService {
    @Autowired
    PlanWordDao planWordDao;

    @Override
    public List<Word> queryWordsByPlanId(String planId) {
        List<Word> words = planWordDao.queryWordsByPlanId(planId);
        return words;
    }

    @Override
    public int deleteWordByPlanId(int planId) {
        int i = planWordDao.deleteWordByPlanId(planId);
        return i;
    }

    @Override
    public int deleteWordByWordId(int wordId, int planId) {
        int i = planWordDao.deleteWordByWordId(wordId, planId);
        return i;
    }

}
