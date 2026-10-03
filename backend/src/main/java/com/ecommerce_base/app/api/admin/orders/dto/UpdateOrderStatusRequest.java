package com.ecommerce_base.app.api.admin.orders.dto;

import com.ecommerce_base.app.domain.order.OrderStatus;
import jakarta.validation.constraints.NotNull;

public class UpdateOrderStatusRequest {
    @NotNull
    public OrderStatus status;
}