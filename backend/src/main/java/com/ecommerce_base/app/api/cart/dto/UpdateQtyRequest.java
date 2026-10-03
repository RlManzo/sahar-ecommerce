package com.ecommerce_base.app.api.cart.dto;

import jakarta.validation.constraints.Min;

public class UpdateQtyRequest {
    @Min(0)
    public int qty;
}