package com.ecommerce_base.app.api.cart.dto;

import java.util.List;

public class CartResponse {
    public Long id;
    public List<CartItemResponse> items;
    public int totalItems;
}