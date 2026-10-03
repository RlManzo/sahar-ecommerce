package com.ecommerce_base.app.api.auth.dto;

public class AuthResponse {
    public String token;

    public AuthResponse(String token) {
        this.token = token;
    }
}
