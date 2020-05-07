# API Gateway	

Podemos definir una *Api Gateway* como un herramienta de administración de la *Api* que se encuentra entre un cliente y una serie de servicios proporcionados por el *backend*. 

Una *Api Gateway* actúa como un *proxi* inverso para aceptar todas las llamadas a la *Api*, agregar los diversos servicios necesarios para cumplir las llamadas y devolver los resultados apropiados. Suele ser común que estas herramientas realicen tareas como autenticación de usuarios, limitación de velocidad y diversas estadísticas. 

Las razones para elegir una puerta de enlace pueden ser variadas, entre las que encontramos:
- Buscamos proteger las *Apis* contra un uso excesivo, utilizando para ello un servicio de autenticación.
- Deseamos comprender que uso hacen las personas de nuestra *Api*, por lo que necesitamos monitorizar.
- Queremos conectarnos a un sistema de facturación, ya que tenemos las *Apis* monetizadas.
- Especialmente si usamos una arquitectura de microservicios, ya que una sola solicitud puede requerir llamadas a muchas otras aplicaciones distintas.

- [Fuente](https://www.redhat.com/en/topics/api/what-does-an-api-gateway-do)
- [Fuente](https://www.itdo.com/blog/api-gateway-en-tu-arquitectura-de-microservicios/)

## Criterios

Unificando los requisitos obtenidos en las historias de usuario junto con la investigación de las diferentes propiedades necesarias en un *Api Gateway* completo, hemos recolectado los siguientes criterios que debe cumplir nuestra elección:

- Debe poder comunicarse con microservicios creados en cualquier lenguaje o *framework*.
- Debe poder usarse en cualquier servicio *cloud*.
- Debe poder usarse con Docker, ya que esto facilitaría su uso tanto en una plataforma local para desarrollo, como en el servicio *cloud*.
- Debe poder ser usable por diferentes orquestadores, ya que en una versión más amplia del proyecto serán interesante usarlos.
- Debe permitir el uso de diferentes políticas de seguridad, como OAuth, JWT o SSL entre otras
- Debe ser capaz tanto de verificar la entrada de datos, como de preparar correctamente la salida de estos.
- Open source.
- Además debe proporcionar las características anteriormente comentadas.

## Solución

La oferta que podemos encontrar en el mercado es variada, pero hay tres que están herramientas que están sonando con fuerza. Estas son Kong, Tyk y KrakendD. En nuestro caso nos decantaremos por esta última y es que presenta algunos beneficios respecto a las otras bastante interesantes.

Comenzar comentando que cumple cada uno de los criterios especificados por lo que de entrada podemos afirmar que estamos ante una herramienta bastante potente. Además, entre los beneficios respecto al resto hay que destacar uno, y es que es capaz de responder a casi el doble de peticiones por segundo que su competidor mas directo, Kong, y casi cuatro veces más respuestas que su segundo competidor, Tyk. Esto, en conjunto con protocolos de colas puede dar lugar a tiempos de respuesta muy competitivos.

Otro punto destacable es que es *stateles* y no necesita base de datos, por lo que haciendo uso de infraestructuras muy pequeñas es capaz de proporcionar buenos resultados.

Son muchos más los puntos interesantes que tenemos en torno a esta herramientas, por lo que estamos seguros de que KrakenD cumplirá todas nuestras expectativas y necesidades.

- [Fuente](https://www.saasworthy.com/compare/kong-vs-krakend-vs-tyk-api-management-platform?pIds=440,3510,3552)
- [Fuente](http://aibyat.com/opensource-api-gateway-what-made-us-pick-krakend/)
