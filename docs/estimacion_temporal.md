## Metodología *Scrum*

Antes de adentrarnos en los detalles de la planificación temporal marcada para los próximos meses, afirmar que el desarrollo estará guiado por la metodología *Scrum*. Por tanto, es conveniente indagar un poco más en los detalles de dicha metodología.

Podríamos decir que *Scrum* es un proceso en el que se aplican de manera regular un conjunto de buenas prácticas para trabajar en equipo, y obtener el mejor resultado posible de un proyecto. Estas prácticas se apoyan unas a otras, y su selección tiene origen en un estudio enfocado en la organización del trabajo de equipos altamente productivos.

En *Scrum* se realizan entregas parciales y regulares del producto final, priorizadas por el beneficio que aportan al receptor del proyecto. Por ello, *Scrum* está especialmente indicado para proyectos en entornos complejos, donde se necesita obtener resultados pronto, donde los requisitos son cambiantes o poco definidos, donde la innovación, la competitividad, la flexibilidad y la productividad son fundamentales. 

### Proceso

En *Scrum* un proyecto se ejecuta en ciclos temporales cortos y de duración fija (iteraciones que normalmente son de 2 semanas, aunque en algunos equipos son de 3 y hasta 4 semanas, límite máximo de *feedback* de producto real y reflexión). Cada iteración tiene que proporcionar un resultado completo, un incremento de producto final que sea susceptible de ser entregado con el mínimo esfuerzo al cliente cuando lo solicite.

![scrum](imagenes/estimacion_temporal/scrum.gif)

Hay que tener en cuenta que es el cliente el que selecciona cuales son los objetivos prioritarios para el siguiente *sprint* en función del valor que aportan respecto al coste. 

### Planificación de la iteración:

Se suele realizar el primer día de la iteración y tiene dos partes:

- Selección de requisitos: El cliente presenta al equipo la lista de requisitos priorizada del producto o proyecto. El equipo pregunta al cliente las dudas que surgen y selecciona los requisitos más prioritarios que prevé que podrá completar en la iteración, de manera que puedan ser entregados si el cliente lo solicita.
- Planificación de la iteración: El equipo elabora la lista de tareas de la iteración necesarias para desarrollar los requisitos seleccionados. La estimación de esfuerzo se hace de manera conjunta y los miembros del equipo se auto-asignan las tareas.

### Ejecución de la iteración

Diariamente cada equipo realiza una reunión de sincronización/actualización en la cual el equipo inspecciona el trabajo que el resto está realizando, para así poder hacer las adaptaciones necesarias que permitan cumplir con la previsión de objetivos a mostrar al final de la iteración.

Durante la iteración, el cliente junto con el equipo refinan la lista de requisitos (para prepararlos para las siguientes iteraciones) y, si es necesario, cambian o re-planifican los objetivos del proyecto con el objetivo de maximizar la utilidad de lo que se desarrolla y el retorno de inversión.

### Inspección y adaptación

El último día de la iteración se realiza la reunión de revisión del *sprint*. Tiene dos partes:

- Revisión (demostración): El equipo presenta al cliente los requisitos completados en la iteración, en forma de incremento de producto preparado para ser entregado con el mínimo esfuerzo. En función de los resultados mostrados y de los cambios que haya habido en el contexto del proyecto, el cliente realiza las adaptaciones necesarias de manera objetiva, ya desde la primera iteración, re-planificando el proyecto.

- Retrospectiva: El equipo analiza cómo ha sido su manera de trabajar y cuáles son los problemas que podrían impedirle progresar adecuadamente, mejorando de manera continua su productividad. 

### Conclusión

A grandes rasgos estos son los principios y las pautas que rigen a la metodología *Scrum*. Como podemos ver, en líneas generales está enfocada a la entrega rápida de nuevo material útil y funcional al cliente, además de integrar al cliente en el proceso de desarrollo y orientarlo como una parte importante de este. Añadir también que la metodología está especialmente enfocada a trabajo en equipo, pero en nuestro caso el desarrollo es individual por lo que nos centraremos en obtener los beneficios que nos proporcionaría la entrega periódica de funcionalidad.

Por tanto, en nuestro caso usaremos los principios básicos de la metodología *Scrum* pero orientada al caso de un solo usuario en el proyecto, que a la vez es tanto cliente, como desarrollador.

- [Fuente_1](https://proyectosagiles.org/que-es-scrum/)
- [Fuente_2](https://proyectosagiles.org/como-funciona-scrum/)

## Estimación temporal

No cabe duda que parte del éxito de un proyecto recae en la correcta organización del trabajo que se desarrollará, de cuando se desarrollará y del tiempo que ocupara. Es por ello que esta sección se vuelve especialmente relevante ya que, una vez más, hemos caído en el optimismo. 

En los próximos apartados presentaremos la planificación inicial que se marco para el presente proyecto e intentaremos finalizar este punto con algunas conclusiones que nos permitan entender el grado de éxito, o no, alcanzando durante estos meses. 

Como aspectos iniciales comentar que definimos una planificación con la que poder afrontar progresivamente cada una de las historias de usuario que podrá encontrar en el siguiente punto. Por tanto, definimos los siguientes *sprints*, que tendrán una duración cada uno de 4 semanas aproximadamente, para los que se dedicarán unas 80 horas en cada uno dando lugar a temporización final de unas 300 horas. 

Culminar esta introducción añadiendo que aunque ahora presentamos los *sprints* a alto nivel, es decir, mediante ideas generales de lo que buscábamos conseguir, el proceso de desarrollo ha estado marcado por las historias de usuario relativas a cada meta que establecemos en dichos *sprints*. Y por tanto, marcada por *milestones* en los que entregar el trabajo realizado. Si bien, todo lo relativo a los *milestones* lo veremos en más detalle cuando hablemos especialmente de las herramientas y *Github*. Sin más, presentamos los *sprints*.

### Sprint 1 - Marzo

La primera iteración de nuestro proyecto estará marcada especialmente por la documentación tanto de los requisitos como de la investigación de los diferentes lenguajes y herramientas que usaremos en el desarrollo. También nos enfocaremos en crear el primer microservicio del proyecto. Concretamente las competencias de este *sprint* son las siguientes:

- Investigación y documentación sobre los microservicios.
- Investigación y documentación de las distintas herramientas a usar, tanto para el desarrollo del software como de la infraestructura.
- Documentación sobre todo lo relacionado con la especificación de requisitos, enfocado especialmente en las historias de usuarios.
- Configuración de la herramienta para la integración continua de nuestro proyecto con *git*.
- Trabajar en el primer microservicio.

### Sprint 2 - Abril

Una vez que tengamos todo lo relacionado con los requisitos y herramientas de nuestro proyecto correctamente investigado, documentado y elegido, además de una primera base funcional, es el momento de adentrarnos plenamente en el desarrollo de este. Es por ello que en esta iteración nos centraremos en analizar los datos principales que requiere nuestro sistema, para posteriormente poder construirlos en los microservicios correspondientes. Además trabajaremos en el segundo microservicio y eje principal del proyecto.

- Análisis de los diferentes datos que usaremos en nuestro sistema.
- Microservicios para el gestor de defunciones.
- Documentación.

### Sprint 3 - Mayo

Una vez que todo nuestro proyecto tenga una base solida, nos centraremos en seguir construyendo este proporcionalmente aunque principalmente centrados en el desarrollo de nuevos microservicios. Si bien llegados a este punto deberemos enfocarnos en dos puntos importantes también, en trabajar tanto la orquestación, provisión y despliegue de los microservicios como la parte visual de este, es decir, *el frontend*. 

- Microservicios para manejar los datos del cliente y familiares.
- *Frontend* para el *login* y las defunciones.
- Provisión, orquestación y despliegue del primer microservicio.
- Documentación.

### Sprint 4 - Junio

Sprint final en el que nos enfocaremos en culminar los detalles, y que estará marcado tanto por el desarrollo de la infraestructura como código de los microservicios restantes como los aspectos visuales de estos. También la documentación final, enfocada a las conclusiones de estos últimos meses, y la preparación de la presentación serán puntos a tener en cuenta. Si finalmente dispusiéramos de tiempo restante, podríamos dedicarlo a la realización del gestor de contabilidad, agenda o correo. Las competencias del *sprint* final son las siguientes:

- Orquestación, provisión y despliegue de los microservicios restantes.
- *Frontend* enfocado a la visualización de los documentos finales.
- Documentación final.
- Presentación.

### Conclusión

Como podemos ver, y ya adelantábamos, inicialmente el *frontend* era parte de nuestro proyecto, pero los sobrecostes en cuanto a tiempo que nos hemos encontrado por el camino especialmente para la realización de los microservicios lo ha imposibilitado.

¿Porqué ocurre esto? Desde mi punto de vista afirmaría que en gran medida ocurre debido al nivel de conocimiento que se posea sobre las herramientas y lenguajes utilizados. En nuestro caso, indagar y utilizar microservicios ha sido toda una nueva experiencia que nos ha obligado a cambiar nuestra forma de enfocar cada parte del software que construimos. Eso requiere tiempo.

Además, en nuestro afán por aprender nuevos lenguajes que sean tanto potentes como modernos, y además útiles en el proyecto que nos ocupe, como se verá más adelante nos decantamos por usar *Node.js*. Por tanto, el tiempo que se requiere para aprender y poder aprovechar todas las ventajas que nos aporta el lenguaje de nuevo requiere tiempo.

Podemos concluir diciendo que en gran medida, en nuestro caso, el no poder culminar dentro del tiempo marcado todo el proyecto ideado, se basa totalmente en el tiempo requerido para aprender, el cual no se ha tenido en cuenta a la hora de elaborar dicha planificación.
