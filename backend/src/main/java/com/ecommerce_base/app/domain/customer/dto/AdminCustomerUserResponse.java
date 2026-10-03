package com.ecommerce_base.app.domain.customer.dto;

import com.ecommerce_base.app.domain.user.Role;

import java.time.LocalDateTime;

public record AdminCustomerUserResponse(
        Long id,
        String email,
        Role role,
        boolean enabled,
        boolean emailVerified,
        LocalDateTime createdAt,
        LocalDateTime updatedAt,
        String nombre,
        String apellido,
        String telefono,
        String direccion,
        String documento
) {
}