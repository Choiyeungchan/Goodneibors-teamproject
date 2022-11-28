package com.study.ikmyeongshopteam4.domain.admin;


import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class CategoryResponseDto {
    private int id;
    private String name;
}
