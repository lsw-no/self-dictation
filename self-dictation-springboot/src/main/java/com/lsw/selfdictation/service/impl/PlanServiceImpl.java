package com.lsw.selfdictation.service.impl;

import com.lsw.selfdictation.dao.PlanDao;
import com.lsw.selfdictation.pojo.Plan;
import com.lsw.selfdictation.pojo.Word;
import com.lsw.selfdictation.service.PlanService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PlanServiceImpl implements PlanService {
    @Autowired
    PlanDao planDao;

    @Override
    public List<Plan> queryPlanByOpenid(String openid) {
        return planDao.queryPlanByOpenid(openid);
    }

    @Override
    public Plan queryPlanById(int id) {
        return planDao.queryPlanById(id);
    }

    @Override
    public Plan queryPlanByPlanName(String planName) {
        return planDao.queryPlanByPlanName(planName);
    }

    @Override
    public List<Word> queryWordsByPlanId(int id) {
        return planDao.queryWordByPlanId(id);
    }

    @Override
    public int addPlan(String planName, String openid) {
        int i = planDao.addPlan(planName, openid);
        return i;
    }

    @Override
    public int addPlanWord(int planId, int wordId) {
        int i = planDao.addPlanWord(planId, wordId);
        return i;
    }

    @Override
    public int deletePlanById(int id) {
        int i = planDao.deletePlanById(id);
        return i;
    }

    @Override
    public int deletePlanWord(int planId, int wordId) {
        int i = planDao.deletePlanWord(planId, wordId);
        return i;
    }

    @Override
    public int updatePlanName(int planId, String planName) {
        int i = planDao.updatePlanName(planId, planName);
        return i;
    }
}
