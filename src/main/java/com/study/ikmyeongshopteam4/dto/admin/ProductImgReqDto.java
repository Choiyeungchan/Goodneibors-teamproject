package com.study.ikmyeongshopteam4.dto.admin;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ProductImgReqDto {
    private int Id;
    private String name;
}
