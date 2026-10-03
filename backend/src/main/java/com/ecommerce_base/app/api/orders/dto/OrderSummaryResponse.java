package com.ecommerce_base.app.api.orders.dto;

import java.time.Instant;

public class OrderSummaryResponse {
    public Long id;
    public Instant createdAt;
    public int itemsCount;
    public String status; // opcional (si lo tenés)
    public String comment; // opcional

    public OrderSummaryResponse(Long id, Instant createdAt, int itemsCount, String status, String comment) {
        this.id = id;
        this.createdAt = createdAt;
        this.itemsCount = itemsCount;
        this.status = status;
        this.comment = comment;
    }
}
