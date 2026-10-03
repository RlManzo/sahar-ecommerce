package com.ecommerce_base.app.api.auth.dto;

import jakarta.validation.constraints.*;

public class LoginRequest {
    @Email @NotBlank
    public String email;

    @NotBlank
    public String password;
}
