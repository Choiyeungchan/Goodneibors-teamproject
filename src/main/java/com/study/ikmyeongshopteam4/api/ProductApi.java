package com.study.ikmyeongshopteam4.api;

import com.study.ikmyeongshopteam4.dto.CMRespDto;
import com.study.ikmyeongshopteam4.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
@RequiredArgsConstructor
public class ProductApi {

    private final ProductService productService;

    @GetMapping("/goods/{category}")
    public ResponseEntity<?> getGoods(@PathVariable String category, int page) throws Exception {
        return ResponseEntity.ok(new CMRespDto<>("Successfully", productService.getProductList(category, page)));
    }

    @GetMapping("/product/{pdtId}")
    public ResponseEntity<?> getProduct(@PathVariable int pdtId) throws Exception {

        return ResponseEntity.ok(new CMRespDto<>("Successfully", productService.getProduct(pdtId)));
    }
}
