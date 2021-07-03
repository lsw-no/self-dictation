package com.lsw.selfdictation.dao;

import com.lsw.selfdictation.pojo.Word;
import org.apache.ibatis.annotations.Delete;
import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordBookDao {

    @Select("select * from word where id in (select word_id from word_book where openid=#{openid}) group by word")
    List<Word> queryWordBookWordsByOpenId(@Param("openid") String openid);

    @Delete("delete from word_book where word_id=#{id} and openid=#{openid}")
    int deleteWordBookWordById(@Param("id")int id, @Param("openid")String openid);

    @Insert("insert word_book(word_id,openid) values(#{id},#{openid})")
    int addWordToWordBook(@Param("id")int id, @Param("openid")String openid);
}
