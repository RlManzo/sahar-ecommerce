package com.ecommerce_base.app.domain.customer;

import com.ecommerce_base.app.domain.user.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface CustomerRepository extends JpaRepository<Customer, Long> {
    Optional<Customer> findByUserId(Long userId);
    boolean existsByDocumento(String documento);
    boolean existsByDocumentoAndUserIdNot(String documento, Long userId);
    @Query("""
        SELECT c
        FROM Customer c
        JOIN FETCH c.user u
        WHERE u.role = :role
        ORDER BY u.id ASC
    """)
    List<Customer> findAllByUserRole(@Param("role") Role role);
}