## Funciones a desarrollar 

La idea central del proyecto consiste en desarrollar diferentes módulos de trabajo que puedan ser independientes y con funciones individuales claramente definidas. Como primera aproximación podemos definir los siguientes:

### Gestión de defunciones

Primer módulo y punto inicial del proceso funcional del sistema. En él se desarrollarán todos los datos asociados a un difunto en forma de ficha personal, como nombres, fechas, datos concretos, direcciones, etc. Directamente relacionado con dicho difunto encontraríamos los datos del servicio en si, como fecha de defunción o fecha de la misa por mencionar algún dato.

Una idea interesante sería la de incluir desde el primer momento un enlace a los datos de familiares o del cliente encargado del servicio y de la facturación. Esto será un tema interesante a analizar ya que haría nuestro sistema más dependiente de una empresa en concreto, por lo que dejaría de ser genérico para cualquier otra empresa que decida hacer uso del software. Por lo tanto será necesario estudiar esta idea para que resulte lo más atractiva, funcional y genérica posible.

Por otro lado, también encontramos al acceder al módulo en primera instancia el listado completo almacenado de defunciones, y en segunda instancia, los datos completos de cada uno cuando lo seleccionemos. Claro está que las opciones de edición y borrado serán cómodamente accesibles.

### Gestor documental

En el segundo módulo encontraríamos toda la funcionalidad relacionada con la gestión de documentos. En este apartado concreto ya nos centramos en la inclusión de los datos necesarios para estos documentos concretos, siendo estos los relacionados con los familiares del difunto. Destacar que primero tendremos que hacer una búsqueda por los difuntos para relacionar dichos documentos con su difunto en cuestión.

Una vez más, tenemos la posibilidad del editado y borrado de los datos, además del visionado de estos. Como cuestión interesante, podremos ver cómo quedaría el documento final listo para su impresión, además de la opción de guardarlo directamente en PDF en nuestro ordenador personal.

### Gestión contabilidad

Este módulo se implementará en mayor o menor medida en función del tiempo disponible.

Módulo encargado del control de la facturación para cada servicio. Como en los casos anteriores, dispondremos de diversas opciones para el manejo de los datos, visualizado y descarga en PDF.

Destacable en esta sección la posibilidad de controlar el estado de la factura, siendo esta sin emitir o sin cobrar. Esto cobra especial importancia con dos aspectos de nuestro home. Por un lado, la posibilidad de generar alertas en función de dicho estado, y por otro, la generación de un gráfico que nos mostrará el número de servicios realizados cada mes.

### Agenda

Cuarto modulo en cuestión, esta vez encargado de la gestión de un calendario. En él, los distintos usuarios del sistema pueden crear nuevos eventos que estén por realizar. Así, de una manera sencilla y rápida, todos podrán visualizar las tareas pendientes por realizar.

Sería interesante que eventos como misas pendientes, o facturas por emitir, por nombrar algunos, se añadan a la agenda automaticamente.

### Correo

Relacionado con el anterior, un módulo para la gestión del correo. Siendo así posible el envío de emails, y como cuestión destacable, la posibilidad de obtener la bandeja de entrada desde dentro del mismo sistema. Con esto englobamos toda la idea inicial de poder gestionar la pyme al completo desde el sistema web.

### Informes, Alertas y Gráficos

Pensando en aportar información desde el home del sistema tendremos dos ítems importantes.

Por un lado, encontramos un gráfico representativo del número de servicios alcanzados mensualmente. Dicho gráfico podrá estar sometido a restricciones de los roles, siendo solo visible para usuarios de alto rango.

Por otro lado, un sistema de notificaciones. Este en función de distintos eventos, como facturas sin cobrar, servicios en ejecución o misas funerales próximas, nos mostrará un listado de noticias a tener en cuenta.
