# Documentación

¡¡La documentación provisional que se está preparando para ser entregada junto con el proyecto se puede encontrar [aquí](indice.md)!!

En el presente documento se pretende introducir los diferentes aspectos de documentación que se vayan creando. De esta forma podremos encontrar una pequeña introducción al apartado que nos ocupe y un enlace al trabajo completo sobre este.

## Índice

- [Módulos propuestos](#modulos)
- [Metodología y estimación](#metodologia_estimacion)
	- [Metodología de desarrollo](#metodologia_desarrollo) 
	- [Estimación temporal](#estimacion_temporal)
- [Especificación de requisitos](#especificacion_requisitos)
	- [Requisitos funcionales](#requisitos_funcionales)
	- [Requisitos no funcionales](#requisitos_no_funcionales)
	- [Historias de usuarios](#historias_usuarios)
- [Terminología](#terminología)
- [Investigación](#investigacion)
	- [Arquitectura de microservicios](#microservicios)
	- [Herramientas y lenguajes](#herramientas_lenguajes)

## Módulos propuestos <a name="modulos"></a>

Quizás una de las cuestiones más difíciles que se nos presenta en el proyecto que comenzamos es que módulos crear y como hacerlos lo más genéricos posible. Es decir, que distintos clientes puedan usar la misma plataforma y todos tener toda la información disponible. Esta cuestión será recurrente en el desarrollo y debemos tenerla muy presente, para así conseguir hacer la plataforma lo más general posible. 

Mientras tanto, la primera conceptualización de los módulos a crear la podemos encontrar [aquí](modulos.md).

## Metodología de desarrollo y estimación temporal <a name="metodologia_estimacion"></a>

En los siguientes apartados nos centraremos en valorar las diferentes metodologías de desarrollo existentes y en la elección de la más adecuada al proyecto que nos ocupa. Una vez elegida, plantearemos una primera estimación temporal, especialmente ligada a la metodología elegida. Esto será especialmente útil para marcar una visión inicial del proceso que queremos seguir en el desarrollo y su estimación. Después, a la finalización del proyecto podremos comparar lo estimado, con lo realmente necesitado.

### Metodología de desarrollo <a name="metodologia_desarrollo"></a>

A lo largo del tiempo, la cantidad de metodologías de desarrollo ha ido creciendo para paliar los deficits que podíamos encontrar tanto en metodologías previas como en las necesidades de los equipos de desarrollo y de los procesos de negocio. En la actualidad, la necesidad de la entrega rápida y continua de nuevas funcionalidades por parte de las empresas, ha hecho surgir una vertiente de desarrollo ágil bastante interesante en la modalidad de desarrollo actual.

La investigación completa puede verse [aquí](metodologias_desarrollo.md).

### Estimación temporal <a name="estimacion_temporal"></a>

Necesaria desde los primeros compases del desarrollo de un nuevo proyecto, marca una previsión inicial del tiempo que prevemos emplear para el desarrollo de este. Esencial para establecer unas metas realistas, además nos puede ayudar a reorganizar diferentes entregas del proyecto en función del tiempo que estemos empleando. Por tanto, junto a la metodología *Scrum* elegida, vamos a proceder a establecer la planificación que marcará el desarrollo de los próximos meses.

La estimación completa puede verse [aquí](estimacion_temporal.md).

## Especificación de requisitos <a name="especificacion_requisitos"></a>

### Requisitos funcionales <a name="requisitos_funcionales"></a>

### Requisitos no funcionales <a name="requisitos_no_funcionales"></a>

### Historias de usuarios <a name="historias_usuarios"></a>

Las historias de usuario son especialmente utilizadas en las metodologías de desarrollo ágil ya que estas son una forma rápida y sencilla de definir y administrar los requisitos de los usuarios sin tener que elaborar gran cantidad de documentación. Por tanto, una historia de usuario es la representación de un requisito escrito en una o dos frases, utilizando el lenguaje común del usuario.

Las historias de usuario pueden verse [aquí](historias_de_usuario.md).

## Terminología <a name="especificacion_requisitos"></a>

Durante el desarrollo de la presente documentación, y en general en todo el proyecto que nos ocupa, podemos encontrar diferentes términos que nos provoquen confusión o que no se comprendan completamente dentro del ámbito funerario. Por lo tanto, en el siguiente documento se pretende explicar aquellos términos que son usados con frecuencia y que pueden causar confusión.

La terminología completa puede verse [aquí](terminologia.md).

## Investigación <a name="investigacion"></a>

El primer paso claro en el desarrollo de un nuevo proyecto software es el de la investigación. El gran abanico de herramientas, lenguajes, *frameworks*, librerías, etc que disponemos hoy en día es inmenso. Renovándose constantemente, siempre podemos encontrar una opción que se adapte lo mejor posible a nuestras necesidades principales. Por todo eso, el primer paso es valorar las diferentes opciones y mediante un análisis de los requisitos de nuestro proyecto, elegir la opción que nos resulte más favorable.

### Arquitectura de microservicios <a name="microservicios"></a>

No hay duda alguna que la arquitectura monolítica es la predominante en la mayoría de proyectos software, tanto en los ya creados como en muchos que están naciendo hoy en día. Pero como cualquier otra arquitectura o herramienta, esta presenta inconvenientes importantes. Es por ello que se crean y desarrollan nuevas opciones, y una de ellas es la arquitectura de microservicios. 

Desarrollada buscando paliar los inconvenientes anteriores, tiene como principal característica la completa independencia de cada módulo desarrollado. De esta forma, cada módulo puede tener tanto su equipo de desarrollo dedicado, como los recursos propios necesarios para su uso, consiguiendo así innumerables beneficios. 

La investigación completa puede verse [aquí](microservicios.md).

### Herramientas y lenguajes <a name="herramientas_lenguajes"></a>

Punto determinante en el largo camino del desarrollo, elegir bien las diferentes herramientas es crucial para culminar exitosamente el proyecto. Si bien al elegir una arquitectura de microservicios contamos con una ventaja importante, cada módulo puede estar escrito en el lenguaje mas favorable para la función que ocupe dicho módulo.

De esta forma, nos centraremos en exponer y analizar las diferentes opciones que tenemos y estas se irán utilizando conforme sean necesarias. En el aspecto de infraestructura como código e integración continua si será importante decidir desde el primer momento las herramientas a usar.

Por tanto se han creado una serie de documentos donde se explorarán los detalles de cada una de estas:
- [FrontEnd](herramientas_lenguajes/frontend.md)
- Backend
	- [*Lenguaje de programación*]() 
	- [*Protocolo de comunicación*]()
	- [Api Gateway](herramientas_lenguajes/api_gateway.md)
- [Base de datos](herramientas_lenguajes/base_de_datos.md)
- [Integración continua](herramientas_lenguajes/integracion_continua.md)
- [*Provisión*]()
- [*Orquestación*]()
- [*Despliegue Cloud*]()

