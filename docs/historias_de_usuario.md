# Historias de usuario

Para la realización de historias de usuario nos basaremos en el siguiente [ejemplo](https://www.scrummanager.net/bok/index.php/Historia_de_usuario).

## Descripción

Podemos entender las historias de usuario como una manera simple de describir una tarea, la cual aporta valor al usuario que hace uso de la aplicación. Para ello hacemos uso del lenguaje común del usuario, coloquial, y con tan solo un par de frases queda definido el requisito.

Esta forma de representar a los requisitos está directamente ligada a los casos de uso, y en gran parte los sustituye. Esto se debe a que las historias de usuarios son más simples de escribir y de entender, además nos aseguran que no hay cabos sueltos.

Finalmente están especialmente relacionadas con el desarrollo ágil. Las historias de usuarios están vivas. Cuando se realizan las planificaciones para los sprint son fácilmente desglosables, priorizadas y organizadas en diferentes tareas, listas para ser repartidas a los diferentes equipos. Ideal para metodologías como *Scrum*.

- La estructura que siguen es la siguiente:
	- Yo como <usuario>
	- necesito / deseo / quiero <funcionalidad>
	- para <beneficio de negocio>

## Listado

- HU. 1 - Sistema
	- Usuario: Jefe / Empleado
	- Funcionalidad: *Login* en el sistema.
	- Resultado: Nos permitirá verificar que los datos del usuario introducidos son correctos. También nos permitirá manejar la información de los usuarios (creación - lectura, actualización - borrado).
	- Criterios de aceptación:
		- Se aceptará como nombre de usuario tanto el correo como el nombre.
		- La contraseña asociada tiene que ser correcta.
		- La contraseña tendrá más de 8 carácteres.
		- La contraseña se almacenará bajo encriptación.
		- Se proporcionarán varios métodos de login o al menos el sistema estará preparado para su inclusión rápida.
		- Se debe posibilitar el uso de JWT si fuera necesario.
		- El nombre del usuario y su correo deberán ser únicos.
		- Al menos podremos loguearnos mediante usuario y contraseña.
		- Debemos poder tener diferentes roles.

- HU. 2 - Sistema
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar una defunción (servicio funerario).
	- Resultado: El sistema añadirá, leerá, actualizará o borrará los datos de la defunción en el sistema. 
	- Criterios de aceptación:
		- Se tiene que permitir tanto añadir una nueva defunción como leer, actualizar y borrar este.
		- La defunción comprenderá los datos tanto de difunto (nombre, DNI, etc) como del servicio en sí (fecha del servicio, lugar, fecha de la misa, etc).
		- Debemos poder obtener la información de todos las defunciones almacenadas en la base de datos.
		- Debemos poder tener referencias a su cliente, familiares y facturas asociados.
		- Debemos poder tener información de historial de cambios, como fecha de creación, fecha de edición, usuario creador y actualizador en principio.
		- Solo un usuario con rol de administrador podrá borrar una defunción.

- HU. 3 - Sistema
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar los datos relativos a un cliente.
	- Resultado: El sistema añadirá, leerá, actualizará o borrará los datos del cliente en el sistema. 
	- Criterios de aceptación:
		- Se tiene que permitir tanto añadir un nuevo cliente como leer, actualizar y borrar este.
		- Un cliente no tiene porqué estar ligado inicialmente a una defunción.
		- El sistema debe permitir asociar el cliente al difunto posteriormente.
		- Un cliente debe poder asociarse a varios defunciones. 
		- Los datos que manejaremos relativos al cliente están especialmente ligados a la posterior facturación de la defunción, por lo que la posibilidad de almacenar datos como cuentas bancarias serán de especial interés.
		- Debemos poder tener información de historial de cambios, como fecha de creación, fecha de edición, usuario creador y actualizador en principio.
		- Solo un usuario con rol de administrador podrá borrar un cliente.

- HU. 4 - Sistema
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar los datos relativos a familiares.
	- Resultado: El sistema añadirá, leerá, actualizará o borrará los datos del cliente en el sistema. 
	- Criterios de aceptación:		
		- Se tiene que permitir tanto añadir los datos de familiares como leer, actualizar y borrar estos.
		- Familiares es una sola entidad que tiene información relativa a los familiares del difunto. Está especialmente ligado a los datos que aparecerán en los documentos (esquela y misa). 
		- Tiene que estar siempre ligada a una defunción.
		- La estructura que se utilice para su almacenamiento debe ser óptima para su posterior uso en documentos.
		- Debemos poder tener información de historial de cambios, como fecha de creación, fecha de edición, usuario creador y actualizador en principio.
		- Solo un usuario con rol de administrador podrá borrar un familiar.	

- HU. 5 - Sistema
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar los distintos conceptos de una factura.
	- *Los aspectos relativos a contabilidad dan cabida a un gran número de posibilidades, desde controlar el stock de material actual en la empresa hasta tener un control de gastos total, pero de cara el proyecto que nos ocupa esta parte de simplificará a tan solo generar una factura final. Esta parte se ampliará si el tiempo lo permite.*
	- Resultado: El sistema añadirá, leerá, actualizará o borrará los datos para la factura. Además nos permitirá realizar operaciones para calcular los costes finales en dicha factura. 
	- Criterios de aceptación:
		- Se tiene que permitir tanto añadir los conceptos que aparecerán en la factura, además de leerlos, editarlos o borrarlos.
		- Debemos poder obtener la información de todos los datos de las facturas.
		- Los datos de facturas siempre están asociados a una defunción.
		- La estructura de datos utilizada debe ser manejable y lo más extensible posible. Además debe ser óptima para su uso en documentos.
		- El sistema realizará los cálculos finales tales como cálculo de IVA o importe final entre otros.
		- Solo un usuario con rol de administrador podrá borrar una factura.
		- Debemos poder tener información de historial de cambios.
		- Solo un usuario con rol de administrador podrá borrar una factura.

- HU. 6 - Interfaz 
	- Usuario: Jefe / Empleado
	- Funcionalidad: *Login* desde la interfaz.
	- Resultado: La interfaz nos proporcionará diferentes métodos para realizar el *login* del usuario en la plataforma.
	- Criterios de aceptación:
		- El método inicial que nos mostrará será el típico usuario - contraseña mediante un formulario sencillo para el usuario.
		- El *frontend* verificará que los parámetros obligatorios (usuario - contraseña) son introducidos antes de enviar la petición al *backend*.
		- Una vez realizado el *login* el sistema mantendrá la sesión abierta.
		- Si el tiempo lo permite, se usarán otros métodos de *login*, y para ello el sistema proporcionará los botones y formularios adecuados para su uso. Por ejemplo, *login* mediante *Google* o *Facebook*.

- HU. 7 - Interfaz
	- Usuario: Jefe / Empleado
	- Funcionalidad: *Logout* en el sistema.
	- Resultado: Salir del sistema.
	- Criterios de aceptación:
		- Se redirigirá a la pantalla inicial de *login* y se mostrará un claro mensaje de confirmación sobre que la sesión ha terminado correctamente.
		- Se cerrará completamente la sesión del usuario.
		- Los datos almacenados en caché se eliminarán.

- HU. 8 - Interfaz. 
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar una defunción (servicio funerario) en la interfaz.
	- Resultado: La interfaz nos proporcionará todos los instrumentos necesarios con los que poder realizar dichas acciones.
	- Criterios de aceptación:	
		- La solicitud de datos se presentará en un formulario, el cual distinguirá claramente las diferentes secciones (defunción - cliente - familiares).
		- El formulario tiene que ser comprensible para cualquier tipo de usuario, incluso para aquellos que no sean especialmente habilidosos con las nuevas tecnologías. Por tanto, la experiencia del usuario al usar la plataforma tiene que ser óptima.
		- Se tiene que permitir añadir los datos del cliente y familiares asociados, aunque estos serán opcionales en este punto.
		- Solo si algún campo de las secciones de cliente y familiares tienen datos rellenos se enviará la petición al *backend*.
		- El sistema nos proporcionará una tabla en la que se listará las defunciones almacenadas. Dicha tabla nos debe permitir seleccionar la opción tanto de editar como de borrar. Además podremos seleccionar la opción de ver la información completa.
		- Desde la vista en detalle de la defunción debemos poder acceder al resto de vistas en detalle (cliente - documentos - facturas) ligadas a esta defunción en concreto.
		- El sistema nos tiene que permitir introducir las fechas y horas por separado, pero si estas se refieren a lo mismo, se unificarán posteriormente.
		- Mostrar alertas en el caso de que algún campo obligatorio no haya sido rellenado.
		- Mostrar alertas en el caso de que algo haya fallado.
		- El sistema nos tiene que permitir validar los datos en el lado del *frontend*, es decir, el tipado de los datos es importante.
		- La pantalla se tiene que adaptar tanto a ordenadores como a *tablets*, y si fuera posible, a móviles.
		- Solo si el usuario tiene un rol suficiente podrá ver la opción de borrar. 
		- Solo si el usuario está correctamente *logueado* podrá realizar las acciones.

- HU. 9 - Interfaz 
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar los datos relativos a un cliente en la interfaz.
	- Resultado: La interfaz nos proporcionará todos los instrumentos necesarios con los que poder realizar dichas acciones.
	- Criterios de aceptación:
		- El sistema nos proporcionará una sección específica para los clientes.
		- La información de los actuales clientes se listarán en una tabla.
		- La tabla nos permitirá la selección de edición, borrado y vista en más detalle.
		- Desde la vista en detalle del cliente debemos poder acceder al resto de vistas en detalle (defunción - documentos - facturas) ligadas a este cliente concreto.
		- Si el cliente está asociado a varias defunciones, entonces en el momento de acceder a sus vistas asociadas estas se mostrarán inicialmente listadas en una tabla.
		- La sección de clientes nos debe permitir añadir el cliente seleccionado la defunción deseada.
		- Mostrar alertas en el caso de que algún campo obligatorio no haya sido rellenado.
		- Mostrar alertas en el caso de que algo haya fallado.
		- Validación de tipado de datos.
		- Pantalla adaptable a otro dispositivos. 		
		- La experiencia del usuario debe ser óptima.
		- Solo si el usuario tiene un rol suficiente podrá ver la opción de borrar. 
		- Solo si el usuario está correctamente *logueado* podrá realizar las acciones.	

- HU. 10 - Interfaz 
	- Usuario: Jefe / Empleado
	- Funcionalidad: Visualizar, editar y descargar los distintos documentos (esquelas y misas) de la defunción.
	- Resultado: La interfaz nos proporcionará todos los instrumentos necesarios con los que poder realizar dichas acciones.
	- Criterios de aceptación:	
		- Inicialmente los documentos con los que trabajaremos son dos, esquelas mortuorias y esquelas funerales.
		- El sistema nos proporcionará un listado de documentos disponibles mediante una tabla.
		- El sistema nos permitirá visualizar los documentos. Para ello tendrá que recuperar toda la información necesaria y mostrarla en el formato del documento elegido, por tanto deberá autoajustarse.
		- El sistema nos permitirá descargar los documentos en formato *.pdf*.
		- Mientras visualizamos debemos poder acceder al resto de vistas en detalle (defunción - cliente - facturas) ligadas a este documento concreto.
		- Si la defunción ya tiene los datos de cliente y familiares asociados, los documentos debe aparecer en el listado (tabla).
		- En esta sección el sistema nos debe permitir añadir los datos de familiares a defunciones que aún no las tengan, esto además generaría los documentos correspondientes. Esto se realizará mediante un formulario.
		- Mostrar alertas en el caso de que algún campo obligatorio no haya sido rellenado.
		- Mostrar alertas en el caso de que algo haya fallado.
		- Validación de tipado de datos.
		- Pantalla adaptable a otro dispositivos. 		
		- La experiencia del usuario debe ser óptima.
		- Solo si el usuario tiene un rol suficiente podrá ver la opción de borrar. 
		- Solo si el usuario está correctamente *logueado* podrá realizar las acciones.

- HU. 11 - Interfaz 
	- Usuario: Jefe / Empleado
	- Funcionalidad: Visualizar, editar y descargar la factura de la defunción.
	- Resultado: La interfaz nos proporcionará todos los instrumentos necesarios con los que poder realizar dichas acciones.
	- Criterios de aceptación:		
		- El sistema nos proporcionará un listado de facturas disponibles mediante una tabla.	
		- El sistema nos permitirá visualizar las facturas. Para ello tendrá que recuperar toda la información necesaria y mostrarla en el formato del documento elegido. Si la factura es extensa, deberá autoajustarse correctamente.
		- El sistema nos permitirá descargar los documentos en formato *.pdf*.
		- Mientras visualizamos debemos poder acceder al resto de vistas en detalle (defunción - cliente - documentos) ligadas a este factura concreta.
		- Si la defunción ya tiene los datos de cliente y factura asociados, los documentos debe aparecer en el listado (tabla).
		- El sistema nos debe permitir añadir la información de los conceptos de la factura a defunciones que aún no tengan estos asociados. Esto se realizará mediante un formulario.		
		- Mostrar alertas en el caso de que algún campo obligatorio no haya sido rellenado.
		- Mostrar alertas en el caso de que algo haya fallado.
		- Validación de tipado de datos.
		- Pantalla adaptable a otro dispositivos. 		
		- La experiencia del usuario debe ser óptima.
		- Solo si el usuario tiene un rol suficiente podrá ver la opción de borrar. 
		- Solo un usuario con permisos especiales podrá visualizar las facturas.

- HU. 12 - Sistema
	- Usuario: Jefe / Empleado
	- Funcionalidad: CRUD de los eventos del calendario.
	- Resultado: El sistema nos permitirá añadir, editar y borrar eventos en el calendario. 
	- Criterios de aceptación:
		- Se tiene que permitir tanto añadir como editar y eliminar eventos en la agenda.
		- Un aspecto interesante que se debería cubrir es el de la realización de eventos automáticos. Estos se activarían en diferentes casos como podrían ser:
			- Se establece la fecha de una defunción, entonces se añade la información al calendario.
			- Se establece la fecha de una misa, se añade la información al calendario. También eventos como este podrían desencadenar el envío de un correo electrónico en cierto momento a modo de recordatorio.
		- Se debe estudiar la posibilidad de integración con sistemas de correo como *Google Calendar*, por ejemplo.

- HU. 13 - Interfaz
	- Usuario: Jefe / Empleado
	- Funcionalidad: Visualizar y trabajar con calendario.
	- Resultado: Podremos ver una sección destinada a la agenda y podremos crear eventos en esta.
	- Criterios de aceptación:
		- Se mostrará como pantalla principal el mes completo de la fecha actual.
		- Se podrá cambiar la vista a la semana o el día actual.
		- El usuario podrá añadir nuevos eventos, además estos podrán comprender información variada.
		- Se podrá acceder a información específica sobre los diferentes eventos.
		- El usuario podrá modificar información de los eventos.
		- El usuario podrá mover los eventos a otra fecha deseada.
		- Se podrá utilizar en varios dispositivos.
		- Solo un usuario logueado podrá realizar esta acción.

- HU. 14 - Sistema
	- Usuario: Jefe / Empleado
	- Funcionalidad: Leer, enviar y recibir correo.
	- Resultado: El correo será enviado.
	- Criterios de aceptación:
		- El sistema nos tiene que permitir tanto enviar como recibir correos.
		- Los mensajes enviados se almacenarán en el sistema.
		- Se debe estudiar la posibilidad de integración con sistemas de correo como *Gmail*, por ejemplo.
		- Para poder hacer estas operaciones la cuenta de correo debe existir y debe estar correctamente validada.	

- HU. 15 - Interfaz
	- Usuario: Jefe / Empleado
	- Funcionalidad: Visualizar los diferentes correos y poder enviar.
	- Resultado: Leer los mensajes de mi bandeja de entrada y enviar nuevos.
	- Criterios de aceptación:	
		- El sistema proporcionará un formulario sencillo en el que introducir la información necesaria.
		- El sistema solicitará las credenciales de la dirección de correo usada para enviar.
		- Solo si las credenciales son correctas se podrá enviar el correo.
		- Se podrá leer el correo de la dirección de correo asignada al usuario logueado.
		- Solo un usuario logueado podrá realizar esta acción.

- HU. 16
	- Usuario: Administrador
	- Funcionalidad: Permitir el uso del lenguaje óptimo en cada momento.
	- Resultado: Múltiples lenguajes funcionando entre sí.
	- Criterios de aceptación:
		- Sistema en el que puedan coexistir múltiples lenguajes.
		- Cada módulo trabaja de forma independiente y realiza su funcionalidad sin importarle el resto de los módulos.

- HU. 17
	- Usuario: Administrador
	- Funcionalidad: Permitir el uso de diferentes protocolos de comunicación.
	- Resultado: Poder usar tanto un protocolo síncrono como asíncrono.
	- Criterios de aceptación:
		- El sistema debe permitir ambos protocolos.
		- El sistema debe permitir la comunicación más óptima según la petición que se realice.
		- En cada caso el lenguaje que reciba la petición debe poder satisfacer la demanda.
		- Los tiempos de respuesta se verán reducidos.

- HU. 18
	- Usuario: Administrador
	- Funcionalidad: El sistema podrá realizar tareas en segundo plano.
	- Resultado: Las peticiones que se puedan realizar en segundo plano se enviarán a una cola y se procesarán mientras el sistema trabaja en otras tareas.
	- Criterios de aceptación:
		- Trabajos como el envío de correo se realizarán en segundo plano. 
		- Trabajos como la generación de eventos en el calendario se realizarán en segundo plano.
		- Las tareas en segundo plano no interferirán en la experiencia del usuario.

- HU. 19
	- Usuario: Administrador
	- Funcionalidad: Como administrador debo ser capaz de testear los cambios añadidos a *Git* y, si fuera necesario, desplegar el proyecto si dichos tests finalizan positivamente.
	- Resultado: El sistema se testeará y verificará que los nuevos cambios son válidos. (Integración continua)
	- Criterios de aceptación:
		- Integración con *Github*.
		- La herramienta de integración podrá lanzar y verificar que los tests se pasan correctamente.
		- La herramienta nos permitirá desplegar automáticamente en el sistema *Cloud* elegido.
		- Los tests deben poder realizarse en cada microservicio de forma independiente.
		- El coste de administración y uso de la herramienta deberá ser sencillo.
		- Debe tener un plan gratuito.
		- Debe tener soporte para hacer uso de Docker.
		- Debe tener una interfaz de usuario.
		- Debe soportar notificaciones por correo.
		- Open source.

- HU. 20 
	- Usuario: Administrador
	- Funcionalidad: Como administrador quiero ser capaz de almacenar un historial de todo lo que ocurra en mi sistema. (LOG)
	- Resultado: Cada acción realizada en el sistema tendrá una entrada en el historial de cambios.
	- Criterios de aceptación:
		- No debe interferir de forma notable en los tiempos de respuesta.
		- Se debe poder anotar de forma independiente la información de cada microservicio. 
		- Debe poder almacenarse la información tanto en la base de datos como en ficheros.
		- La información también podrá mostrarse por consola.
		- Se debe de poder almacenar distintos niveles de alertas.

- HU. 21
	- Usuario: Administrador
	- Funcionalidad: Como administrador, quiero ser capaz de desplegar mi infraestructura de forma escalable. (Api Gateway)
	- Resultado: El sistema responderá en un tiempo óptimo sin necesidad de máquinas adicionales.
	- Criterios de aceptación:
		- Múltiples usuarios podrán trabajar simultáneamente de forma que el sistema no se vuelva más lento.
		- El sistema será capaz de responder a las múltiples peticiones sin necesidad de un incremento de infraestructura hardware.
		- La experiencia de usuario no se verá ralentizada cuando múltiples usuarios estén trabajando en el sistema.
		- Debe poder comunicarse con microservicios creados en cualquier lenguaje o *framework*.
		- Debe poder usarse en cualquier servicio *cloud*.
		- Debe poder usarse con Docker, ya que esto facilitaría su uso tanto en una plataforma local para desarrollo, como en el servicio *cloud*.
		- Debe poder ser usable por diferentes orquestadores, ya que en una versión más amplia del proyecto serán interesante usarlos.
		- Debe permitir el uso de diferentes políticas de seguridad, como OAuth, JWT o SSL entre otras
		- Debe ser capaz tanto de verificar la entrada de datos, como de preparar correctamente la salida de estos.
		- Open source.

- HU. 22
	- Usuario: Administrador
	- Funcionalidad: Como administrador quiero ser capaz tanto de provisionar como orquestar para diferentes sistemas (Docker - PaaS - SaaS) con una solo definición de mi microservicio.
	- Resultado: Desde infraestructura como código podremos configurar nuestro proyecto para poder ser usado en diferentes sistemas.
	- Criterios de aceptación:
		- Se elegirá un sistema operativo sobre el que correrá el proyecto.
		- Este sistema operativo será común para cada microservicio. Aunque se valorará la posibilidad de que algún microservicio funciones mejor en cualquier otro sistema operativo.
		- Cada microservicio tendrá su propia provisión.
		- Cada microservicio tendrá su propia orquestación.
		- Debemos poder desplegar nuestros sistema en contenedores Docker.
		- Nuestro sistema será fácilmente desplegable en proveedores *Cloud*.
		- (Investigar criterios para elegir orquestador y provisionador).

- HU. 23
	- Usuario: Administrador
	- Funcionalidad: Como administrador, debo ser capaz de desplegar el proyecto en un sistema *Cloud*.
	- Resultado:
	- Criterios de aceptación:
		- Deberá tener tarifas gratuitas para las diferentes pruebas durante el desarrollo.
		- (Investigar requisitos)

- HU. 24
	- Usuario: Administrador
	- Funcionalidad: Como administrador quiero ser capaz de evaluar los costes de operar mi aplicación en un proveedor *Cloud* final, haciendo uso de *software as a service*.
	- Resultado: Obtendremos los costes de trabajar con un proyecto como el que nos ocupa en proveedores *Cloud*.
	- Criterios de aceptación:
		- Realizaremos las pruebas en diferentes proveedores.
		- Realizaremos las pruebas en distintas localizaciones para los mismos proveedores.
		- Los diferentes estudios comprenderán desde el momento en el que el sistema comienza el despliegue en el proveedor *Cloud* hasta la interacción con este. Para esta última parte se necesitará también alguna forma de automatizar y masificar esa interacción con la plataforma de una forma rápida.
		- Podremos valorar y documentar cuales son las mejores opciones.

HU. 25
	- Usuario: Administrador
	- Funcionalidad: Como administrador debo ser capaz de almacenar información en bases de datos.
	- Resultado: La información obtenida en los diferentes microservicios será almacenada.
	- Criterios de aceptación:
		- La base de datos nos debe permitir un crear un esquema flexible. Es decir, debemos poder trabajar con datos no estructurados o semiestructurados.
		- La base de datos debe usar un modelo de datos eficiente e intuitivo, como puede ser *Json* por ejemplo.
		- Sería ideal trabajar en una versión Cloud de la base de datos elegida.
		- No debe generar cuellos de botella.
		- Nos debe proporcionar buena escalabilidad.
		- Debemos de poder usar tanto una versión para los tests como otra independiente para los datos reales.

HU. X
	- Usuario: Administrador
	- Funcionalidad: 
	- Resultado:
	- Criterios de aceptación:
		-
		-

*Algunas de estas historias de usuario dependerán del tiempo disponible final para su implementación, especialmente algunos de sus criterios de aceptación.*