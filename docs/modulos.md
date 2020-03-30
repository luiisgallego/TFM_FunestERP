# Módulos propuestos

La idea central del ERP consiste en desarrollar diferentes módulos de trabajo que puedan ser independientes y con funciones individuales claramente definidas, aunque entre todos se retroalimenten con la información propia de cada módulo. Como primera aproximación podemos definir los siguientes:

## Módulo 1: Gestión de datos

Primer módulo y punto inicial tanto del proceso funcional del sistema como de la información captada relativa al servicio que nos ocupe. En él se añadirán todos los datos asociados a un difunto en forma de ficha personal, como nombres, fechas, datos concretos, direcciones, etc. Directamente relacionado con dicho difunto encontraríamos los datos del servicio en sí. En este caso los datos estarían relacionados con la fecha de defunción o fecha de la misa, lugares de estos, etc.

También en este módulo es importante poder añadir los datos relativos al cliente o a los familiares ligados al difunto y al servicio. Es interesante dar la posibilidad de añadir estos datos en el momento de crear un nuevo servicio o posteriormente, pudiendo enlazarlos a servicios previamente creados. Estos datos son un punto importante sobre el que pensar principalmente para orientarlo de la forma más genérica y extensible posible. Quizás la cuestión más importante es como nombrar el concepto de 'cliente' y de 'familiares' para que sea lo más adaptable a cada cliente posible. 

Por otro lado, al acceder a dicho módulo tendríamos la posibilidad de añadir un nuevo servicio a la vez que visualizaríamos un listado de los servicios actuales. Al seleccionar un servicio del listado podríamos ver todos sus datos completos. También encontraríamos diferentes secciones relativas a los datos del cliente y de los familiares, con la misma interacción que la anteriormente comentada.

En una ampliación futura se podría añadir información relativa al servicio de tanatorio y de crematorio.

## Módulo 2: Gestor de documentos

El segundo módulo se centrará en la generación de los distintos documentos que requiera el cliente especialmente ligados a cada servicio concreto. Destacar que este módulo es independiente de la facturación, pues principalmente lo que nos ocupa son documentos como las esquelas o las misas. También podría ser interesante la generación de un documento como por ejemplo justificantes o autorizaciones. Otra idea sería genera un documento con los datos necesarios sobre el servicio para su posterior almacenamiento en papel.

Una cuestión importante a la hora de generar los documentos sería verificar si se dispone de todos los datos necesarios para la generación de los diferentes documentos. En caso negativo, valorar las opciones de redirigir al anterior módulo o desde este mismo añadir dichos datos. Pensar especialmente en la independencia entre módulos.

Finalmente, el módulo será capaz de realizar un pre-visualizado del documento y su posterior generación en pdf para descarga.

Como posible expansión del módulo en un aspecto más ambicioso podríamos valorar las siguientes posibilidades: 
- Trabajar con archivos word o excel almacenados en servicios de la nube como google drive o dropbox.
- Adjuntar archivos cargados en el sistema desde plataformas como google drive, dropbox o escaner. Por ejemplo, un DNI.

## Módulo 3: Gestor de contabilidad

Módulo más abierto de todos y especialmente dependiente del tiempo disponible. Como caso base nos permitirá añadir los datos necesarios para la generación de una factura estándar. Es especialmente importante pensar como generar una factura customizada para cada cliente. Es decir, todo cliente añadirá los datos bajo el mismo proceso, pero luego cada uno podría tener su estructura de factura propia. Esto es un punto interesante que pensar y que valorar en el diseño de la arquitectura. Además, como en el módulo anterior, tendremos la posibilidad de previsualizar la factura y posteriormente descargar en pdf.

Importante poder establecer valores relativos a conceptos como IVA, IRFP, base imponible, descuentos, etc. 

Destacable en esta sección la posibilidad de controlar el estado de la factura, siendo esta sin emitir, emitida, sin cobrar o cualquier otro estado posible. Esto cobra especial importancia para la posterior generación de alertas, gráficos o estadísticas.

En el caso de un óptimo aprovechamiento del tiempo, se podría trabajar en aspectos extra como el control de inventario, control de pedidos a empresas externas, control de gastos de todo tipo como por ejemplo de empleados, combustibles, tickets y facturas, etc. Como punto final sería la posibilidad de emitir documentos legales ligados a la contabilidad de la empresa para futuras declaraciones.

## Módulo 4: Agenda

Cuarto módulo en cuestión, esta vez encargado de la gestión de un calendario. En este aspecto tenemos dos posibilidades por delante que valorar. Un camino sería trabajar con un calendario global para todos los usuarios de una misma empresa en el que puedan crear nuevos eventos que estén por realizar. Así, de una manera sencilla y rápida, todos podrán visualizar las tareas pendientes por realizar. Incluso se añadirían los eventos que automáticamente se generen. El segundo caso estaría enfocado a que cada usuario pueda tener un calendario propio.

Ambas posibilidades tienen muchas cuestiones abiertas, pues una empresa con un gran número de usuarios puede hacer que su calendario global sea muy caótico. Quizás la idea de un calendario individual sea lo más apetecible, pero también habría que pensar en como añadir las alertas que se generen en cada calendario individual. Aunque este segundo caso puede llegar a abrir otras posibilidades, pues una vez que se defina un servicio, si la empresa tiene varios funerarios en su plantilla, el servicio puede ir adjudicado a uno de estos, y por tanto, la alerta solo se generaría en el calendario de este. Hay que pensar por tanto en todas estas posibilidades.

Como eventos interesantes por generar encontraríamos fechas y horas de servicios pendientes, también misas pendientes, o facturas tanto pendientes de emitir como de cobrar.

## Módulo 5: Correo

Relacionado conceptualmente con el módulo anterior, cada usuario podría tener su propia dirección de correo. Entonces las tareas ligadas a este módulo sería la de tanto poder enviar correo como poder recibirlos, leerlos y cualquier cuestión relacionada. En general la idea de todos estos módulos es la de poder gestionar nuestra empresa o PYME sin salir de la plataforma.

Sería muy interesante poder adjuntar en el correo cualquiera de los documentos generados por el sistema. 

## Módulo 6: Informes, Alertas y Gráficos

Al final de todo, poder manejar, estudiar, valorar y visualizar los datos que se generan en el sistema es un punto que nos puede aportar información sustancial y de valor. Por tanto, este último módulo estará encargado por un lado de la generación tanto de los datos como del aspecto visual de distintos gráficos. Estos podrían mostrar información como por ejemplo de los servicios alcanzados mensualmente. Gráficos como esté podría estar sometido a restricciones según el rol del usuario, siendo solo visible para usuarios de alto rango. 

Por otro lado, un sistema de notificaciones. Este en función de distintos eventos, como facturas sin cobrar, servicios en ejecución o misas funerales próximas, nos mostrará un listado de noticias a tener presente.

## Módulo 7: Gestión de personal

Módulo extra que no entra en los planes de ejecución inicial pero que puede resultar muy interesante en una expansión futura. Pues como es normal, una empresa tendrá un amplio personal en su plantilla, con diferentes funciones, horarios, etc. Este módulo estaría encargado de almacenar todos los datos relativos y poder gestionar las diferentes tareas que le ocupen. Por ejemplo, cuando se cree un servicio y sea asignado al empleado X, el sistema podrá calcular que ese empleado va a estar ciertas horas ocupado con un servicio, y por tanto, en el caso de que se genere un nuevo servicio, tendrá que estar asignado a otro empleado. Entonces este módulo realizaría funciones como imposibilitar ciertas asignaciones y mucho más. Por ahora es solo un idea surgida.
