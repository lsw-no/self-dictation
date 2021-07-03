package com.lsw.selfdictation.pojo;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Word {
    private int id;
    private String word;
    private String interpretation;
    private String type;
    private String[] typeList;

}
