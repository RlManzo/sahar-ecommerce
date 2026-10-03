# Ecommerce Base

Clon reutilizable del ecommerce original, orientado exclusivamente a venta online.

## Qué se eliminó

- Módulo backend de ventas locales (`LocalSale`, `LocalSaleItem`, repositorios, servicios, DTOs y controller).
- API `/api/admin/local-sales/**`.
- Pantalla administrativa de caja/ventas locales.
- Cliente Angular para ventas locales.
- Comprobante PDF de venta local.
- Ruta `/admin/cartOrders` y acceso "Ventas LOCAL" del menú.
- Redirección del rol OPERADOR hacia la pantalla de caja.
- Logs, uploads y dump de base de datos del proyecto original.

## Qué se conserva

- Autenticación JWT y usuarios.
- Clientes.
- Productos y stock.
- Carrito.
- Checkout online.
- Pedidos web y administración de pedidos.
- Administración de productos y clientes.
- Recuperación de contraseña/verificación de email.
- Uploads de imágenes/archivos para nuevas instalaciones.
- Docker Compose, NGINX, PostgreSQL y Flyway.

## Estructura

- `frontend/`: Angular.
- `backend/`: Spring Boot.
- `infra/`: configuración de NGINX.
- `docker-compose.yml`: stack local/base.

## Puesta en marcha

1. Copiar `.env.example` a `.env`.
2. Ajustar secretos, correo y credenciales de PostgreSQL.
3. Ejecutar `docker compose up --build`.

## Importante antes de usarlo para otra tienda

Este clon ya no contiene ventas locales y fue renombrado como proyecto base. Sin embargo, algunos elementos visuales y reglas de catálogo heredados del ecommerce original (logos, redes sociales, marcas/categorías y textos comerciales) siguen siendo datos de ejemplo. Conviene moverlos a una configuración de tienda o a datos de base de datos antes de usarlo como white-label definitivo.

También conviene reemplazar `spring.jpa.hibernate.ddl-auto=update` por `validate` una vez que el esquema actual esté completamente representado por migraciones Flyway.
