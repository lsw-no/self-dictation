package com.lsw.selfdictation.dao;

import com.lsw.selfdictation.pojo.Plan;
import com.lsw.selfdictation.pojo.Word;
import org.apache.ibatis.annotations.*;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanDao {

    @Select("select * from plan where user_id=#{openid}")
    List<Plan> queryPlanByOpenid(@Param("openid")String openid);

    @Select("select * from plan where id=#{id}")
    Plan queryPlanById(@Param("id")int id);

    @Select("select * from plan where planName=#{planName}")
    Plan queryPlanByPlanName(@Param("planName")String planName);

    @Select("select * from word where id in (select word_id from plan_word where plan_id=#{id})")
    List<Word> queryWordByPlanId(@Param("id")int id);

    @Insert("insert plan(planName,user_id) values(#{planName},#{openid})")
    int addPlan(@Param("planName") String planName, @Param("openid")String openid);

    @Insert("insert plan_word(plan_id,word_id) values(#{plan_id},#{word_id})")
    int addPlanWord(@Param("plan_id")int planId, @Param("word_id")int wordId);

    @Delete("delete from plan where id=#{id}")
    int deletePlanById(@Param("id")int id);

    @Delete("delete from plan_word where plan_id=#{planId} and word_id=#{wordId}")
    int deletePlanWord(@Param("planId")int planId, @Param("wordId")int wordId);

    @Update("update plan set planName=#{planName} where id=#{planId}")
    int updatePlanName(@Param("planId")int planId, @Param("planName") String planName);

}
