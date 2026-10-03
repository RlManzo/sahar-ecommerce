package com.ecommerce_base.app.domain.user.dto;

import com.ecommerce_base.app.domain.user.Role;

import java.time.LocalDateTime;

public record AdminUserResponse(
        Long id,
        String email,
        Role role,
        Boolean enabled,
        Boolean emailVerified,
        LocalDateTime createdAt,
        LocalDateTime updatedAt
) {
}