package com.lsw.selfdictation.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;


@Data
@AllArgsConstructor
@NoArgsConstructor
public class Plan {
    private int id;
    private String planName;
    private List<Word> words;
    private User user;

}
