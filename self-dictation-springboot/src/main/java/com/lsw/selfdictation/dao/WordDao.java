package com.lsw.selfdictation.dao;

import com.lsw.selfdictation.pojo.Word;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface WordDao {

    @Select("select * from word where id=#{id} group by word")
    Word queryWordById(@Param("id")int id);

    @Select("select * from word where word=#{word} group by word")
    Word queryWordByWord(@Param("word")String word);

    @Select("select * from word where type like #{type} group by word limit #{startIndex},20")
    List<Word> queryWordsByType(@Param("type") String type, @Param("startIndex")int startIndex);

}
