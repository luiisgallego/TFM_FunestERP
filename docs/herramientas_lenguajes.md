# Herramientas

En el presente documento tendrá lugar la proposición de las diferentes herramientas a usar en cada aspecto del desarrollo del proyecto, los criterios que se tendrán en cuenta y la elección final.

## FrontEnd

Dentro del frontend podemos tomar dos caminos distintos. Desarrollar haciendo uso de HTML+CSS+JavaScript sin más o hacer uso de alguna librería o framework. Esta primera decisión está clara y es que los nuevos framework-librerías que se están usando hoy en día facilitan el trabajo a gran escala respecto al uso de HTML+CSS. Por tanto, nuestra investigación continuará respecto a estos nuevos lenguajes.

Con el constante nacimiento y crecimiento de librerías y framework basados en JavaScript elegir uno de ellos se puede convertir en una espada de doble filo. Si bien hay mucho espacio para la creatividad y la experimentación, en ocasiones no estamos seguros de cual elegir. Por tanto, vamos a exponer diferentes perspectivas para finalmente elegir una de las opciones (Angular, React y Vue). 

### Curva de aprendizaje

Con curva de aprendizaje nos referimos a la dificultad de aprender un nuevo lenguaje y que tiempo nos llevará poder obtener beneficios y resultados de este.

Seguramente Angular sea el que más tiempo nos ocupe en este aspecto y tanto React como Vue tengan una mejor curva.

### Experiencia de desarrollo

En este aspecto valoramos que los lenguajes tengan buenas herramientas para desarrollo, buena integración con editores y por supuesto herramientas diseñadas para mejorar el flujo de trabajo. En definitiva, que te permitan programar más rápido, detectar errores, etc.

Punto a favor para Angular ya que usa Typescript de forma obligatoria y este mejora la experiencia de desarrollo de aplicaciones de JavaScript. Si bien, Typescript también es bastante usado en React y Vue, no tiene porqué ser de forma obligatoria.

Aunque finalmente en este apartado es React quien sale beneficiado por el desarrollo de herramientas como React Developer Tools. Además también cuenta con Jest, una librería para test.

### Expresividad

En este punto considereamos los términos de expresividad del lenguaje y cómo de fácil es de mantener su código. Esto también tiene mucho que ver con las herramientas de depuración y de como funciona el framework internamente.

En este aspecto Angular sale mermado ya que el inyector de dependencias y el data binding pueden ser difíciles de comprender. En el caso de React, el flujo de información es claro y detectar un posible error es más sencillo.

### Facilidad de integración (con otras bibliotecas)

No importa qué tan rico en funciones tenga el framework seleccionado, es probable que nos enfrentemos a problemas donde se necesitan herramientas adicionales. Hay excelentes bibliotecas enfocándose en un problema, ya sea manipulación de DOM, procesamiento de datos, formateo de tiempo, edición de texto enriquecido, etc. Si intentamos integrar una de ellas y dedicar horas cada vez, quizás esa no sea la mejor opción.

No todas las bibliotecas admiten TypeScript. Como Angular lo usa en gran medida, algunas de las bondades de TypeScript podrían desaparecer al usar dicha biblioteca. Para Vue y React, usted es responsable de casi todo, y el uso de otras bibliotecas no es una excepción. Si usa Webpack o una herramienta de compilación similar, puede consultar directamente las bibliotecas instaladas mediante NPM.

### Conclusión

El número de aspectos a valorar puede llegar a ser especialmente largo, obteniendo ganadores distintos en cada uno de ellos. En definitiva podemos ver que cada lenguaje tiene sus beneficios en ciertos aspectos, pero pensando en actualizarnos y aprender una nueva tecnología, y además aprovechando sus bondades, para la realización de este proyecto haremos uso de React.

- [Fuente1](https://codigofacilito.com/articulos/angular-react-vue)
- [Fuente2](https://www.toptal.com/javascript/como-elegir-el-mejor-framework-de-front-end)

## BackEnd

### API Gateway	

Podemos definir una Api Gateway como un herramienta de administración de la Api que se encuentra entre un cliente y una serie de servicios proporcionados por el backend. 

Una Api Gateway actúa como un proxi inverso para aceptar todas las llamadas a la Api, agregar los diversos servicios necesarios para cumplir las llamadas y devolver los resultados apropiados. Suele ser común que estas herramientas realicen tareas como autenticación de usuarios, limitación de velocidad y diversas estadísticas. 

Las razones para elegir una puerta de enlace pueden ser variadas, entre las que encontramos:
- Buscamos proteger las Apis contra un uso excesivo, utilizando para ello un servicio de autenticación.
- Deseamos comprender que uso hacen las personas de nuestra Api, por lo que necesitamos monitorizar.
- Queremos conectarnos a un sistema de facturación, ya que tenemos las Apis monetizadas.
- Especialmente si usamos una arquitectura de microservicios, ya que una sola solicitud puede requerir llamadas a muchas otras aplicaciones distintas.

- [Fuente](https://www.redhat.com/en/topics/api/what-does-an-api-gateway-do)
- [Fuente](https://www.itdo.com/blog/api-gateway-en-tu-arquitectura-de-microservicios/)

#### Criterios

Unificando los requisitos obtenidos en las historias de usuario junto con la investigación de las diferentes propiedades necesarias en un Api Gateway completo, hemos recolectado los siguientes criterios que debe cumplir nuestra elección:

- Debe poder comunicarse con microservicios creados en cualquier lenguaje o framework.
- Debe poder usarse en cualquier servicio cloud.
- Debe poder usarse con Docker, ya que esto facilitaría su uso tanto en una plataforma local para desarrollo, como en el servicio cloud.
- Debe poder ser usable por diferentes orquestadores, ya que en una versión más amplia del proyecto serán interesante usarlos.
- Debe permitir el uso de diferentes políticas de securidad, como OAuth, JWT o SSL entre otras
- Debe ser capaz tanto de verificar la entrada de datos, como de preparar correctamente la salida de estos.
- Open source.
- Además debe proporcionar las características anteriormente comentadas.

#### Solución

La oferta que podemos encontrar en el mercado es variada, pero hay tres que están herramientas que están sonando con fuerza. Estas son Kong, Tyk y KrakendD. En nuestro caso nos decantaremos por esta última y es que presenta algunos beneficios respecto a las otras bastante interesantes.

Comenzar comentando que cumple cada uno de los criterios especificados por lo que de entrada podemos afirmar que estamos ante una herramienta bastante potente. Además, entre los beneficios respecto al resto hay que destacar uno, y es que es capaz de responder a casi el doble de peticiones por segundo que su competidor mas directo, Kong, y casi cuatro veces más respuestas que su segundo competidor, Tyk. Esto, en conjunto con protocolos de colas puede dar lugar a tiempos de respuesta muy competitivos.

Otro punto destacable es que es stateles y no necesita base de datos, por lo que haciendo uso de infraestructuras muy pequeñas es capaz de proporcionar buenos resultados.

Son muchos más los puntos interesantes que tenemos en torno a esta herramientas, por lo que estamos seguros de que KrakenD cumplirá todas nuestras expectativas y necesidades.

- [Fuente](https://www.saasworthy.com/compare/kong-vs-krakend-vs-tyk-api-management-platform?pIds=440,3510,3552)
- [Fuente](http://aibyat.com/opensource-api-gateway-what-made-us-pick-krakend/)


### Lenguaje de programación de los microservicios (Node.js? Python?) -> Viernes

- Establecer las posibilidades y dejar la elección final para una vez que tengamos bien definidos los diferentes módulos.

### Protocolos de comunicación (HTTP? RabbitMQ? ---> Issue #9) -> Jueves

- Igual para los protocolos de comunicacion (HTTP VS RabbitMQ), decidir tras su documentación específica.

## Base de datos (SQL? NoSQL?) -> Miércoles

## Dockerizar el proyecto -> Viernes

## Sistema de integración continua (Travis?)

## Sistema de orquestación (Vagrant?)

## Sistema Cloud (Azure? AWS? Google Cloud?)

- El que nos proporcione créditos gratis...

