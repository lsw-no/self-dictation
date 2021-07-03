package com.lsw.selfdictation.controller;

import com.alibaba.fastjson.JSON;
import com.lsw.selfdictation.pojo.Plan;
import com.lsw.selfdictation.pojo.Word;
import com.lsw.selfdictation.service.PlanService;
import com.lsw.selfdictation.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.ArrayList;
import java.util.List;


@Controller
public class PlanController {
    @Autowired
    PlanService planService;
    @Autowired
    UserService userService;

    @RequestMapping(value = "/getPlans", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getPlanList(String openid) {

        if (userService.hasUser(openid) == 0) {
            userService.addUser(openid);
            return null;
        } else {
            List<Plan> plans = planService.queryPlanByOpenid(openid);
            String plansJson = JSON.toJSONString(plans);
            return plansJson;
        }

    }

    @RequestMapping(value = "/getPlanWords", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String getPlanWordList(String planName, int id) {//传参时id为0或具体值，planName可以为null
        if (id != 0) {
            List<Word> words = planService.queryWordsByPlanId(id);
            String wordsJson = JSON.toJSONString(words);
            return wordsJson;
        } else if (planName != null) {
            Plan plan = planService.queryPlanByPlanName(planName);
            List<Word> words = planService.queryWordsByPlanId(plan.getId());
            String wordsJson = JSON.toJSONString(words);
            return wordsJson;
        } else {
            return null;
        }
    }

    @RequestMapping(value = "/addNewPlan", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String addNewPlan(String planName, String openId) {
        int i = planService.addPlan(planName, openId);
        return String.valueOf(i);
    }

    @RequestMapping(value = "/addPlansWords", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String addPlansWords(String plansStr, String wordsStr) {

        List<Plan> plans = JSON.parseArray(plansStr, Plan.class);
        List<Word> words = JSON.parseArray(wordsStr, Word.class);

        int count = 0;
        for (Plan plan : plans) {
            List<Word> oldWords = planService.queryWordsByPlanId(plan.getId());

            for (Word word : words) {
                int i = 0;
                for (Word oldWord : oldWords) {
                    if (word.getWord().equals(oldWord.getWord())){
                        i++;
                    }
                }
                if (i == 0){
                    count += planService.addPlanWord(plan.getId(), word.getId());
                }

            }
        }


        if (count != 0){
            return "success";
        }else {
            return "not add";
        }

    }

    @RequestMapping(value = "/updatePlan", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String updatePlan(String wordsStr, String planId, String planName) {

        List<Word> deleteWords = JSON.parseArray(wordsStr, Word.class);

        for (Word deleteWord : deleteWords) {
            planService.deletePlanWord(Integer.parseInt(planId), deleteWord.getId());
        }

        int i = planService.updatePlanName(Integer.parseInt(planId), planName);

        return "success";

    }

    @RequestMapping(value = "/deletePlan", produces = {"application/json;charset=UTF-8"})
    @ResponseBody
    public String deletePlan(String planId) {
        int i = planService.deletePlanById(Integer.parseInt(planId));
        return String.valueOf(i);
    }

    private List<Word> getAddList(List<Word> moreList, List<Word> leastList) {
        if (leastList != null && !leastList.isEmpty()) {
            List<Word> resultList = new ArrayList<Word>();

            if (moreList != null && !moreList.isEmpty()) {
                for (Word word : moreList) {
                    if (!leastList.contains(word)) {
                        resultList.add(word);
                    }
                }
            }
            return resultList;
        } else {
            return moreList;
        }
    }


}
