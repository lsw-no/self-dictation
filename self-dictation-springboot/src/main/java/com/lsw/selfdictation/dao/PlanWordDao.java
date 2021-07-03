package com.lsw.selfdictation.dao;

import com.lsw.selfdictation.pojo.Word;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface PlanWordDao {
    @Select("select * from plan_word where plan_id=#{planId} group by word")
    List<Word> queryWordsByPlanId(@Param("planId")String planId);

    @Delete("delete from plan_word where plan_id=#{planId}")
    int deleteWordByPlanId(@Param("planId")int planId);

    @Delete("delete from plan_word where word_id=#{wordId} and plan_id=#{planId}")
    int deleteWordByWordId(@Param("wordId")int wordId, @Param("planId")int planId);

}
