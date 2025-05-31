# Documentación Técnica del Proyecto – Sistema de Gestión de Citas y Pagos para Estudio de Tatuajes

## Descripción general

Este proyecto consiste en el desarrollo de una aplicación web orientada a la gestión integral de citas en un estudio de tatuajes. El objetivo principal es facilitar y automatizar el proceso de reserva, confirmación, y pago de citas, así como la comunicación entre clientes y personal del estudio.

El sistema permite tanto a clientes como a administradores interactuar con la plataforma a través de distintos roles:

- **Clientes**: pueden registrarse, solicitar una cita, visualizar su estado, realizar pagos en línea y recibir notificaciones de confirmación.
- **Administradores o artistas**: pueden visualizar solicitudes, confirmar o cancelar citas, gestionar el calendario de citas y controlar el estado de cada reserva.

## Tecnologías utilizadas

El desarrollo de la aplicación se ha realizado utilizando las siguientes tecnologías:

- **Frontend**:
  - JavaScript 
  - React 

- **Backend**:
  - Node.js con Express
  - MySQL (mediante Sequelize como ORM)
  - Stripe para gestión de pagos

## Arquitectura general

La aplicación sigue una arquitectura cliente-servidor, donde:

- El **cliente** realiza solicitudes al servidor para operaciones como autenticación, creación de citas, confirmación, cancelación o pagos.
- El **servidor** valida, procesa y responde a las solicitudes. Se comunica con la base de datos y servicios externos (Stripe) según sea necesario.

## Funcionalidades clave

1. **Verificación de correo electrónico**
   - Los usuarios deben confirmar su email mediante un código enviado. Esta verificación activa su cuenta y les permite avanzar en el proceso de reserva.

2. **Creación y gestión de citas**
   - Los usuarios pueden crear solicitudes de cita especificando detalles como fecha, hora y tipo de tatuaje.
   - Los administradores pueden confirmar, asignar horarios o cancelar citas.

3. **Gestión de pagos con Stripe**
   - La plataforma permite generar un `PaymentIntent` y confirmarlo con tarjeta desde el frontend, actualizando el estado de la cita una vez realizado el pago.

4. **Control de acceso**
   - Todas las rutas protegidas se autentican mediante tokens almacenados en localStorage y enviados en las cabeceras HTTP.

## Manejo de errores

La aplicación implementa manejo de errores tanto en frontend como backend, para casos como:

- Códigos de verificación inválidos
- Datos incompletos al crear citas
- Fallos en la comunicación con Stripe

Estos errores se capturan y muestran de forma comprensible al usuario, y se registran en consola para facilitar el mantenimiento y la depuración.
