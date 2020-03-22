# Estimación temporal

En esta sección comentaremos la planificación temporal que seguiremos para el desarrollo del proyecto, basado principalmente en la metodología ágil Scrum. Pero antes vamos a indagar un poco más en la metodología Scrum.

## Metodología Scrum

Podríamos decir que Scrum es un proceso en el que se aplican de manera regular un conjunto de buenas prácticas para trabajar en equipo, y obtener el mejor resultado posible de un proyecto. Estas prácticas se apoyan unas a otras y su selección tiene origen en un estudio de la manera de trabajar de equipos altamente productivos.

En Scrum se realizan entregas parciales y regulares del producto final, priorizadas por el beneficio que aportan al receptor del proyecto. Por ello, Scrum está especialmente indicado para proyectos en entornos complejos, donde se necesita obtener resultados pronto, donde los requisitos son cambiantes o poco definidos, donde la innovación, la competitividad, la flexibilidad y la productividad son fundamentales. 

### Proceso

En Scrum un proyecto se ejecuta en ciclos temporales cortos y de duración fija (iteraciones que normalmente son de 2 semanas, aunque en algunos equipos son de 3 y hasta 4 semanas, límite máximo de feedback de producto real y reflexión). Cada iteración tiene que proporcionar un resultado completo, un incremento de producto final que sea susceptible de ser entregado con el mínimo esfuerzo al cliente cuando lo solicite.

![scrum](imagenes/estimacion_temporal/scrum.gif)

Hay que tener en cuenta que es el cliente el que selecciona cuales son los objetivos prioritarios para el siguiente sprint en función del valor que aportan respecto al coste. 

#### Planificación de la iteración:

Se suele realizar el primer día de la iteración y tiene dos partes:

- Selección de requisitos: El cliente presenta al equipo la lista de requisitos priorizada del producto o proyecto. El equipo pregunta al cliente las dudas que surgen y selecciona los requisitos más prioritarios que prevé que podrá completar en la iteración, de manera que puedan ser entregados si el cliente lo solicita
- Planificación de la iteración: El equipo elabora la lista de tareas de la iteración necesarias para desarrollar los requisitos seleccionados. La estimación de esfuerzo se hace de manera conjunta y los miembros del equipo se autoasignan las tareas.

### Ejecucción de la iteración

Diariamente cada equipo realiza una reunión de sincronización/actualización en la cual el equipo inspecciona el trabajo que el resto está realizando, para así poder hacer las adaptaciones necesarias que permitan cumplir con la previsión de objetivos a mostrar al final de la iteración.

Durante la iteración, el cliente junto con el equipo refinan la lista de requisitos (para prepararlos para las siguientes iteraciones) y, si es necesario, cambian o replanifican los objetivos del proyecto con el objetivo de maximizar la utilidad de lo que se desarrolla y el retorno de inversión.

### Inspección y adaptación

El último día de la iteración se realiza la reunión de revisión del sprint. Tiene dos partes:

- Revisión (demostración): El equipo presenta al cliente los requisitos completados en la iteración, en forma de incremento de producto preparado para ser entregado con el mínimo esfuerzo. En función de los resultados mostrados y de los cambios que haya habido en el contexto del proyecto, el cliente realiza las adaptaciones necesarias de manera objetiva, ya desde la primera iteración, replanificando el proyecto.

- Retrospectiva: El equipo analiza cómo ha sido su manera de trabajar y cuáles son los problemas que podrían impedirle progresar adecuadamente, mejorando de manera continua su productividad. 

### Conclusión

A grandes rasgos estos son los principios y las pautas que rigen a la metodología Scrum. Como podemos ver, en líneas generales está enfocada a la entrega rápida de nuevo material útil y funcional al cliente, además de tener al cliente integrado en el proceso de desarrollo y como una parte importante de este. Además, la metodología está especialemente enfocada a trabajo en equipo, pero en nuestro caso el desarrollo es individual por lo que nos centraremos en obtener los benefecicios de la entrega periódica de funcionalidad.

Por tanto, en nuestro caso usaremos los principios básicos de la metodología Scrum pero orientada al caso de un solo usuario en el proyecto, que a la vez es tanto cliente, como desarrollador.

- [Fuente_1](https://proyectosagiles.org/que-es-scrum/)
- [Fuente_2](https://proyectosagiles.org/como-funciona-scrum/)

## Planificación

Una vez definidos los requisitos (en este caso historias de usuario) que el sistema debería poder cumplirr al culminar este, definimos una planificación con la que poder afrontar progresivamente cada unos de estos requisitos. Por tanto definimos los siguientes sprints, que tendrán una duración cada uno de 4 semanas, para los que se dedicarán unas 80 horas en cada uno dando lugar a temporización final de unas 300 horas. 

*En el siguiente documento se irán anotando las horas empleadas y las tareas realizadas en cada momentot para que una vez finalizado el proyecto podamos establecer una comparativa real entre la estimación inicial realizada y la final necesitada. ([Enlace - Timing](personal/timing.md))* 

### Sprint 1 - Marzo

La primera iteración de nuestro proyecto estará marcada especialmente por la documentación tanto de requisitos como de la investigación de los diferentes lenguajes y herramientas que usaremos en el desarrollo. Además crearemos un primer servicio que nos permita establecer una base. Concretamente las competencias de este sprint son las siguientes:

- Investigación y documentación sobre los microservicios.
- Investigación y documentación de las distintas herramientas a usar, tanto para el desarrollo del software como de la infraestructura.
- Documentación sobre todo lo relacionado con la especificación de requisitos.
- Configuración de la herramienta para la integración continua de nuestro proyecto con git.
- Creación de la estructura basica del proyecto tanto en el frontend como en el backend (Hello World).
- Primeros microservicios:
	- Login.
	- Log

### Sprint 2 - Abril

Una vez que tengamos todo lo relacionado con los requisitos y herramientas de nuestro proyecto correctamente investigado, documentado y elegido, además de una primera base funcional, es el momento de adentrarnos plenamente en el desarrollo de este. Es por eso que en esta iteración nos centraremos en analizar los datos principales que requiere nuestro sistema, ha captarlos desde este y poder mostrarlos. Además, en cuanto a la infraestructura, configuraremos y trabajaremos con todas las herramientas al completo que usaremos en el desarrollo, estableciendo una primera base funcional con estas según los servicios actuales desarrollados. Concretamente las competencias de este sprint son las siguientes:

- Análisis de los diferentes datos que usaremos en nuestro sistema.
- Microservicios para el gestor de datos.
- Provisión de los módulos actuales.
- Orquestación de los módulos actuales.
- Despliegue en servicio Cloud.
- Documentación.

### Sprint 3 - Mayo

Una vez que todo nuestro proyecto tenga una base solida, nos centraremos en seguir desarrollando esta proporcionalmente aunque principalmente centrados en el desarrollo de nuevos microservicios. Por tanto, añadiremos la lógica que se encargará de mostrar la información anteriormente captada en un formato que pueda ser exportado. Además, trabajaremos en la agenda o calendario y en la generación de alertas e informes. Concretamente las competencias de este sprint son las siguientes:

- Microservicios:
	- Gestor de documentos.
	- Agenda.
	- Informes, alertas y gráficos.
- Ampliar la provisión con los nuevos módulos.
- Ampliar la orquestación con los nuevos módulos.
- Documentación.

### Sprint 4 - Junio

Sprint final en el que culminaremos los detalles, y que estará marcado de nuevo por la generación de nuevos microservicios. Como ya hemos adelantado en varias ocasiones, tenemos un caso base que desarrollar en el módulo de contabilidad pero que en el caso de disponer de tiempo extra hay buenas ideas con las que ampliarlo. Además, será un sprint en el que habrá que dedicar tambien un tiempo especial en la finalización completa de la documentación y preparación de la exposición. Concretamente las competencias de este sprint son las siguientes:

- Microservicios:
	- Gestor de contabilidad. 	
	- Correo.
	- Ampliación del servicio de informes, alertas y gráficos si fuera necesario con nueva información del gestor de contabilidad. 
	- Ampliación de la Agenda debido a los eventos que se generen según el gestor de contabilidad.
- Documentación.
- Exposición

*Los diferentes sprints se pueden ampliar con información más detallada una vez que estemos trabajando en cada uno de estos.*
