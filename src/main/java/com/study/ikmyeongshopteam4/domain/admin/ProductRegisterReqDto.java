package com.study.ikmyeongshopteam4.domain.admin;

import com.study.ikmyeongshopteam4.domain.Product;
import lombok.Data;

import javax.validation.constraints.Min;
import javax.validation.constraints.Pattern;

@Data
public class ProductRegisterReqDto {
    private int category;
    private String name;
    @Min(value = 100, message = "최소 가격은 100원 입니다.")
    private int price;

    public Product toEntity() {
        return Product.builder()
                .category_id(category)
                .pdt_name(name)
                .pdt_price(price)
                .build();
    }
}
