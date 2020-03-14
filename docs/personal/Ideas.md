
# Arquitectura

- El grueso duro de la aplicación podría desarrollarse en Node.js
- El envio de mensajes puede hacerse en Python y de forma asincrona, por lo que podríamos usar RabbitMQ.
- Sería interesante hacer un API Gateway hybrido, que pueda hacer uso tanto de HTTP como RabbitMQ.