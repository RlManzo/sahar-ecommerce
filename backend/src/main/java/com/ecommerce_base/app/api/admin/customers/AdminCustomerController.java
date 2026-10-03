package com.ecommerce_base.app.api.admin.customers;

import com.ecommerce_base.app.domain.customer.dto.AdminCustomerUserResponse;
import com.ecommerce_base.app.service.AdminCustomerService;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/customers")
public class AdminCustomerController {

    private final AdminCustomerService adminCustomerService;

    public AdminCustomerController(AdminCustomerService adminCustomerService) {
        this.adminCustomerService = adminCustomerService;
    }

    @GetMapping
    @PreAuthorize("hasRole('ADMIN')")
    public List<AdminCustomerUserResponse> findAllRegisteredUsers() {
        return adminCustomerService.findAllRegisteredUsers();
    }
}