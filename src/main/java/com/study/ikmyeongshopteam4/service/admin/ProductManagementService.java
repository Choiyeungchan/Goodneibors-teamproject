package com.study.ikmyeongshopteam4.service.admin;

import com.study.ikmyeongshopteam4.domain.admin.CategoryResponseDto;

import java.util.List;

public interface ProductManagementService {

    public List<CategoryResponseDto> getCategoryList() throws Exception;
}
