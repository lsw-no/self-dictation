package com.lsw.selfdictation;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@MapperScan(basePackages = {"com.lsw.selfdictation.dao","com.lsw.selfdictation.mapper"})
public class SelfdictationApplication {

    public static void main(String[] args) {
        SpringApplication.run(SelfdictationApplication.class, args);
    }

}
