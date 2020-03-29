# Arquitectura

- El grueso duro de la aplicación podría desarrollarse en Node.js
- El envio de mensajes puede hacerse en Python y de forma asincrona, por lo que podríamos usar RabbitMQ.
- Sería interesante hacer un API Gateway hybrido, que pueda hacer uso tanto de HTTP como RabbitMQ.

# CRITERIOS

## FRONTEND

- Diseño adaptable tanto a pc como móvil.
- El mismo lenguaje debe poder crear código para ambas plataformas.
- Validación de formularios ?
- Calendario (google calendar)