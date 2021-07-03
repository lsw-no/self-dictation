package com.lsw.selfdictation.service;

import com.lsw.selfdictation.pojo.Plan;
import com.lsw.selfdictation.pojo.Word;

import java.util.List;

public interface PlanService {
    List<Plan> queryPlanByOpenid(String openid);
    Plan queryPlanById(int id);
    Plan queryPlanByPlanName(String planName);
    List<Word> queryWordsByPlanId(int id);
    int addPlan(String planName, String openid);
    int addPlanWord(int planId,int wordId);
    int deletePlanById(int id);
    int deletePlanWord(int planId,int wordId);
    int updatePlanName(int planId, String planName);
}
