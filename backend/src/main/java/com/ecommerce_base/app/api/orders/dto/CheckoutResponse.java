package com.ecommerce_base.app.api.orders.dto;

public class CheckoutResponse {
    public Long orderId;
    public CheckoutResponse(Long orderId) { this.orderId = orderId; }
}
