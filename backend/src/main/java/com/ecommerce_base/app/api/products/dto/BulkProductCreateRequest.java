package com.ecommerce_base.app.api.products.dto;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotEmpty;
import java.util.List;

public class BulkProductCreateRequest {

    @NotEmpty
    @Valid
    public List<CreateProductRequest> items;

}