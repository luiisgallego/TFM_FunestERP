# Análisis del sistema

Comenzamos a adentrarnos en las cuestiones importantes del proyecto que nos ocupa, exponiendo en este capítulo el análisis completo que hemos seguido para la realización del sistema. Comenzaremos con la planificación inicialmente ideada, continuaremos con los presupuestos calculados y culminaremos con las diferentes historias de usuario definidas.

## Planificación

Podríamos afirmar que una correcta planificación puede suponer el éxito en gran medida de un proyecto en cualquier disciplina aplicable. Si nos centramos en la idea de ingeniería, la planificación tiene tal importancia que ha generado multitud de modelos que son usados por todos los profesionales que se dedican al desarrollo de software. La necesidad de una correcta planificación de cara a un proyecto que durará meses, o incluso algún año, es crucial para marcar la línea a seguir.

Posteriormente realizaremos una estimación tanto de recursos como temporal con el coste asociado a su desarrollo, introduciremos los distintos modos de desarrollo de software disponibles, haciendo especial hincapié en el que hemos utilizado nosotros. Terminaremos con un análisis completo de las historias de usuario necesarias para la realización del sistema de información.

### Estimación de recursos necesarios para el desarrollo

Primeramente, abordaremos los distintos recursos utilizados, siendo estos tanto de personal como de hardware y de software.

- Personal: El coste del proyecto en cuanto a personal se centra en una sola persona, Luis Gallego Quero, el cual ha sido el encargado de la materialización de la aplicación.
- Hardware: Los componentes de la máquina utilizada son los siguientes:
	- Procesador: Intel Core i7 de seis núcleos a 2,6 GHz de novena generación.
	- Tarjeta gráfica: AMD Radeon Pro 5300M con 4 GB de memoria GDDR6.
	- Memoria Ram: 16 GB de memoria DDR4 a 2.666 MHz.
	- Disco duro: 512 GB de almacenamiento SSD.
- Software: Aplicaciones que hemos usado durante el desarrollo.
	- [WebStorm](https://www.jetbrains.com/webstorm/): IDE especializado en JavaScript, nos proporciona gran cantidad de herramientas y facilidades para que el proceso de desarrollo sea cómodo e intuitivo. Además tiene una buena integración con *Github* o Docker entre otros, lo que lo convierte en una herramientas de trabajo imprescindible para cualquier desarrollador.
	- [Robo3T](https://robomongo.org/): Aplicación opensource que nos permite manejar nuestra base de datos mongodb de forma intuitiva. Ha sido especialmente útil para conectar y visualizar nuestra base de datos local.
	- [Toggl](https://toggl.com/): Herramienta sencilla y útil enfocada al rastreo del tiempo de trabajo. Por tanto ha sido utilizada para controlar de forma exhaustiva el tiempo empleado durante el desarrollo del TFM.
	- [Chrome](https://www.google.com/intl/es/chrome/): Navegador web que hemos usado tanto para el uso de *Github* como para algunos tests a nuestra aplicación. 
	- [Texmaker](https://www.xm1math.net/texmaker/): Editor para documentos en Latex.
	- [Telegram](https://telegram.org/): Herramienta de comunicación usada principalmente para nuestra interacción con el tutor. Además disponíamos de un *bot* que notificaba de cada suceso que ocurría en nuestro repositorio de *Github*.

### Metodología de desarrollo

Las metodologías de desarrollo se centran principalmente en hacer uso de diversas herramientas, técnicas, métodos y modelos para la ejecución correcta de los procesos que conlleva el proyecto. Concretamente [Sommerville](https://books.google.es/books?hl=es&lr=&id=gQWd49zSut4C&oi=fnd&pg=PR14&dq=Ian+Sommerville.+Ingenier%C3%ADa+del+Software,+9a+Edici%C3%B3n&ots=s775xtrBvi&sig=gYSUgO0IotekleX-1ppRObgta9U#v=onepage&q=Ian%20Sommerville.%20Ingenier%C3%ADa%20del%20Software%2C%209a%20Edici%C3%B3n&f=false) define el proceso de software como "una representación, simplificada de un proceso de software, representada desde una perspectiva específica. Por su naturaleza los modelos son simplificados, por lo tanto, un modelo de procesos del software es una abstracción de un proceso real".

Actualmente disponemos de una gran cantidad de modelos y metodologías para el desarrollo de software. Durante muchos años se han estudiado y elaborado diferentes propuestas que buscan hacer más eficiente y efectivo el desarrollo de un proyecto, por lo que hoy en día disfrutamos la oportunidad de elegir el que más se adapte a nuestras necesidades.

Los más destacados son los siguientes que expondremos, de los cuales podemos encontrar una amplia bibliografía.

#### Tipos de metodologías de desarrollo

##### Metodología en cascada: 

Comenzamos por una de las metodologías más antiguas, ya que derivó de otros procesos de ingeniería no relacionados con la informática. Metodología lineal, consta de distintas fases que hay que completar para poder avanzar a la siguiente. Está compuesta por las siguientes fases:

- Análisis de requisitos.
- Diseño
- Implementación y desarrollo. 
- Integración
- Pruebas o validación.
- Mantenimiento

Como podemos ver, es una metodología lineal, en la que, si no se completa cada una de las fases en su totalidad, no es posible avanzar a la siguiente.

##### Modelo en espiral: 

Principalmente va dirigido hacia el análisis de riesgos. Consiste en realizar varias iteraciones, pasando por cada una de sus fases una y otra vez. A diferencia del anterior, que no tiene vuelta atrás, se pueden hacer las iteraciones que se consideren necesarias. Sus fases principales son las siguientes:

- Determinación de objetivos. 
- Análisis de riesgos. 
- Desarrollo y pruebas.
- Planificación.

##### Metodología de prototipo: 

Este modelo es básicamente prueba y error, ya que nos da la posibilidad de desarrollar prototipos desechables que se refinarán hasta obtener el producto deseado. 

Una de las principales ventajas es que la retroalimentación a los usuarios se proporciona desde etapas muy tempranas, así ellos participan en todo momento en el desarrollo del proyecto.

Si bien podríamos estar definiendo diferentes metodologías y variantes de este tipo durante mucho más tiempo, vamos a terminar centrándonos en dos que actualmente están cobrando especial relevancia.

Denominadas metodologías ágiles de desarrollo, nacieron tratando de dar una respuesta a las necesidades de proyectos cada vez más cambiantes y dinámicos. Por lo tanto, no es más que una metodología adaptativa, que te permite llevar a cabo proyectos de desarrollo de software adaptándote a los cambios que llegan y evolucionando de forma conjunta con el software. De este modo podemos encontrar dos de especial relevancia:

##### Metodología Scrum: 

Basada en la idea de minimizar los riesgos durante la realización de un proyecto de forma colaborativa. Encontramos distintas ventajas como la productividad, la calidad y el seguimiento diario de los avances del proyecto, logrando así que los integrantes estén unidos, comunicados y que el cliente este informado de los avances.

Podríamos decir que *Scrum* es un proceso en el que se aplican de manera regular un conjunto de buenas prácticas para trabajar en equipo, y obtener el mejor resultado posible de un proyecto. Estas prácticas se apoyan unas a otras y su selección tiene origen en un estudio de la manera de trabajar de equipos altamente productivos.

En *Scrum* se realizan entregas parciales y regulares del producto final, priorizadas por el beneficio que aportan al receptor del proyecto. Por ello, *Scrum* está especialmente indicado para proyectos en entornos complejos, donde se necesita obtener resultados pronto, donde los requisitos son cambiantes o poco definidos, donde la innovación, la competitividad, la flexibilidad y la productividad son fundamentales. [Fuente](https://proyectosagiles.org/que-es-scrum/)

##### ProgramaciónExtrema:

Metodología de desarrollo ágil que tiene como principal objetivo aumentar la productividad a la hora de desarrollar un proyecto software. Da prioridad a los trabajos que dan un resultado directo y en los cuales se reduce la burocracia que pueda existir en el entorno de trabajo. Dentro de sus principios podemos encontrar:

- Retroalimentación.
- Proceso continuo en lugar de por bloques. 
- Propiedad intelectual compartida.
- Entendimiento compartido.

Después de valorar las distintas metodologías de desarrollo, nos hemos decantado para la realización de nuestro proyecto por *Scrum*. La razón ha sido bastante básica, nos enfrentamos a un trabajo con unos requisitos definidos, pero no tenemos dudas de que estos pueden cambiar (ampliándose y reduciéndose) a lo largo de su desarrollo, o más concretamente, surgirán nuevas posibilidades para acometerlos de maneras más efectivas, fruto de la experiencia tomada a lo largo del proceso de desarrollo.

También la metodología *Scrum* es relevante para nuestro proceso de desarrollo ya que nos permite desde tiempos tempranos establecer una base completa de nuestro proyecto, con cada una de las tecnologías y herramientas funcionando desde casos base. Y por tanto, construir el trabajo planificado de forma uniforme, consiguiendo de esta manera entregar funcionalidad tanto operativa como completamente testeada.

Por tanto, mediante esta metodología, una vez definido el proyecto, se seguirá un proceso iterativo que nos ayude a controlar, desarrollar y mejorar nuestra idea inicial.

[Otra Fuente](https://www.megapractical.com/blog-de-arquitectura-soa-y-desarrollo-de-software/metodologias-de-desarrollo-de-software)

### Estimación temporal

(Hecho - estimación temporal)

### Metodología SCRUM

## Presupuesto

Pensando en la situación hipotética de que el proyecto que nos ocupa tuviera que desarrollarse por una empresa, encontraríamos diferentes roles. Por un lado, tendríamos al cliente concreto, el cual nos presentaría los diferentes requisitos del proyecto y de la funcionalidad final a conseguir. Dicho rol se enmarcaría en la figura del tutor. Por otro lado, respecto al personal encargado de su realización, nos encontramos con su autor, Luis Gallego Quero, que ocupa el papel de ingeniero informático. En base a esto último podemos definir los siguientes costes:

- Costes personal: Ingeniero informático => 300 horas x 25€/hora = 7500€
- Costes hardware: MacBook Pro.
	- Precio: 2800€
	- Periodo amortización: 2 años.
	- Duración proyecto: 4 meses
	- Total = 467€

En resumen, el coste del proyecto asciende hasta los 7967€.

## Análisis. Especificación de requisitos.

### Propósito

### Ámbito del sistema

### Descripción general

#### Perspectiva del producto

#### Funciones del producto (módulos)

#### Requisitos futuros

### Historias de usuarios.
- Plantear todas o solo las realizadas?