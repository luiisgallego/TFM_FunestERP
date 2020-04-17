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

- HU. 1 - Backend
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
		- Debemos poder tener diferentes roles.

- HU. - Backend
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar un servicio (funerario).
	- Resultado: El sistema añadirá, leerá, actualizará o borrará los datos del servicio en el sistema. 
	- Criterios de aceptación:
		- Se tiene que permitir tanto añadir un nuevo servicio como leer, actualizar y borrar este.
		- Debemos poder obtener la información de todos los servicios almacenados en la base de datos.
		- Nos debe proporcionar almacenar datos para la primera parte del servicio, estos son datos como nombre de difunto, DNI, fecha, localización, etc.
		- Debemos poder tener referencias a su cliente, familiares y facturas asociados.
		- Debemos poder tener información de historial de cambios, como fecha de creación, fecha de edición, usuario creador y actualizador en principio.
		- Solo un usuario con rol de administrador podrá borrar un servicio.

- HU. - Backend
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar los datos relativos a un cliente.
	- Resultado: El sistema añadirá, leerá, actualizará o borrará los datos del cliente en el sistema. 
	- Criterios de aceptación:
		- Se tiene que permitir tanto añadir un nuevo cliente como leer, actualizar y borrar este.
		- Un cliente no tiene porqué estar ligado inicialmente a un servicio (difunto).
		- El sistema debe permitir asociar el cliente al difunto posteriormente.
		- Un cliente debe poder asociarse a varios servicios. 
		- Los datos que manejaremos relativos al cliente están especialmente ligados a la posterior facturación del servicio, por lo que la posibilidad de almacenar datos como cuentas bancarias serán de especial interés.
		- Debemos poder tener información de historial de cambios, como fecha de creación, fecha de edición, usuario creador y actualizador en principio.
		- Solo un usuario con rol de administrador podrá borrar un servicio.

- HU. - Backend
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar los datos relativos a familiares.
	- Resultado: El sistema añadirá, leerá, actualizará o borrará los datos del cliente en el sistema. 
	- Criterios de aceptación:		
		- Se tiene que permitir tanto añadir los datos de familiares como leer, actualizar y borrar estos.
		- Familiares es una sola entidad que tiene información relativa a los familiares más cercanos del difunto.
		- Tiene que estar siempre ligada a un servicio, no tiene sentido crearlo independiente a un servicio concreto.
		- La estructura que se utilice para su almacenamiento debe ser óptima para su posterior uso en documentos.
		- Debemos poder tener información de historial de cambios, como fecha de creación, fecha de edición, usuario creador y actualizador en principio.
		- Solo un usuario con rol de administrador podrá borrar un servicio.		

*Los aspectos relativos a contabilidad dan cabida a un gran número de posibilidades, desde controlar el stock de material actual en la empresa hasta tener un control de gastos total, pero de cara el proyecto que nos ocupa esta parte de simplificará a tan solo generar una factura final. Esta parte se ampliará si el tiempo lo permite.*

- HU. - Backend
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar los distintos conceptos de una factura.
	- Resultado: El sistema añadirá, leerá, actualizará o borrará los datos para la factura. Además nos permitirá realizar operaciones para calcular los costes finales en dicha factura. 
	- Criterios de aceptación:
		- Se tiene que permitir tanto añadir los conceptos que aparecerán en la factura, además de leerlos, editarlos o borrarlos.
		- Debemos poder obtener la información de todos los datos de las facturas.
		- Los datos de facturas siempre están asociados a un servicio.
		- La estructura de datos utilizada debe ser manejable y lo más extensible posible. Además debe ser óptima para su uso en documentos.
		- El sistema realizará los cálculos finales tales como cálculo de IVA o importe final entre otros.
		- Solo un usuario con rol de administrador podrá borrar una factura.
		- Debemos poder tener información de historial de cambios.

- HU - Interfaz 
	- Usuario: Jefe / Empleado
	- Funcionalidad: *Login* desde la interfaz.
	- Resultado: La interfaz nos proporcionará diferentes métodos para realizar el *login* del usuario en la plataforma.
	- Criterios de aceptación:
		- El método inicial que nos mostrará será el típico usuario - contraseña mediante un formulario sencillo para el usuario.
		- El *frontend* verificará que los parámetros obligatorios (usuario - contraseña) son introducidos antes de enviar la petición al *backend*.
		- Una vez realizado el *login* el sistema mantendrá la sesión abierta.
		- Si el tiempo lo permite, se usarán otros métodos de *login*, y para ello el sistema proporcionará los botones y formularios adecuados para su uso. Por ejemplo, *login* mediante *Google* o *Facebook*.

- HU. - Interfaz
	- Usuario: Jefe / Empleado
	- Funcionalidad: *Logout* en el sistema.
	- Resultado: Salir del sistema.
	- Criterios de aceptación:
		- Se redirigirá a la pantalla inicial de *login* y se mostrará un claro mensaje de confirmación sobre que la sesión ha terminado correctamente.
		- Se cerrará completamente la sesión del usuario.
		- Los datos almacenados en caché se eliminarán.

- HU - Interfaz. 
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar un servicio (funerario) en la interfaz.
	- Resultado: La interfaz nos proporcionará todos los instrumentos necesarios con los que poder realizar dichas acciones.
	- Criterios de aceptación:	
		- La solicitud de datos se presentará en un formulario, el cual distinguirá claramente las diferentes secciones (servicio - cliente - familiares).
		- El formulario tiene que ser comprensible para cualquier tipo de usuario, incluso para aquellos que no sean especialmente habilidosos con las nuevas tecnologías. Por tanto, la experiencia del usuario al usar la plataforma tiene que ser óptima.
		- Se tiene que permitir añadir los datos del cliente y familiares asociados, aunque estos serán opcionales en este punto.
		- Solo si algún campo de las secciones de cliente y familiares tienen datos rellenos se enviará la petición al *backend*.
		- El sistema nos proporcionará una tabla en la que se listará los servicios almacenados. 
		- Dicha tabla nos debe permitir seleccionar la opción tanto de editar como de borrar. Además podremos seleccionar la opción de ver la información completa.
		- La información completa almacenada se nos presentará de una forma amigable y correctamente ordenada. Además podremos ver los datos del cliente y familiares asociados. 
		- Desde la vista en detalle del servicio debemos poder acceder al resto de vistas en detalle (cliente - documentos - facturas) ligadas a este servicio concreto.
		- Mostrar alertas en el caso de que algún campo obligatorio no haya sido rellenado.
		- Mostrar alertas en el caso de que algo haya fallado.
		- El sistema nos tiene que permitir validar los datos en el lado del *frontend*, es decir, el tipado de los datos es importante.
		- La pantalla se tiene que adaptar tanto a ordenadores como a *tablets*, y si fuera posible, a móviles.
		- Solo si el usuario tiene un rol suficiente podrá ver la opción de borrar. 
		- Solo si el usuario está correctamente *logueado* podrá realizar las acciones.

- HU - Interfaz 
	- Usuario: Jefe / Empleado
	- Funcionalidad: Crear, leer, actualizar y borrar los datos relativos a un cliente en la interfaz.
	- Resultado: La interfaz nos proporcionará todos los instrumentos necesarios con los que poder realizar dichas acciones.
	- Criterios de aceptación:
		- El sistema nos proporcionará una sección específica para los clientes.
		- La información de los actuales clientes se listarán en una tabla.
		- La tabla nos permitirá la selección de edición, borrado y vista en más detalle.
		- Desde la vista en detalle del cliente debemos poder acceder al resto de vistas en detalle (servicio - documentos - facturas) ligadas a este servicio concreto.
		- Si el cliente está asociado a varios servicios, entonces en el momento de acceder a sus vistas asociadas estas se mostrarán inicialmente listadas en una tabla.
		- La sección de clientes nos debe permitir añadir el cliente seleccionado al servicio deseado.
		- Mostrar alertas en el caso de que algún campo obligatorio no haya sido rellenado.
		- Mostrar alertas en el caso de que algo haya fallado.
		- Validación de tipado de datos.
		- Pantalla adaptable a otro dispositivos. 		
		- La experiencia del usuario debe ser óptima.
		- Solo si el usuario tiene un rol suficiente podrá ver la opción de borrar. 
		- Solo si el usuario está correctamente *logueado* podrá realizar las acciones.	

- HU - Interfaz 
	- Usuario: Jefe / Empleado
	- Funcionalidad: Visualizar, editar y descargar los distintos documentos (esquelas y misas) del servicio.
	- Resultado: La interfaz nos proporcionará todos los instrumentos necesarios con los que poder realizar dichas acciones.
	- Criterios de aceptación:	
		- Inicialmente los documentos con los que trabajaremos son dos, esquelas mortuorias y esquelas funerales.
		- El sistema nos proporcionará un listado de documentos disponibles mediante una tabla.
		- El sistema nos permitirá visualizar los documentos. Para ello tendrá que recuperar toda la información necesaria y mostrarla en el formato del documento elegido, por tanto deberá autoajustarse.
		- El sistema nos permitirá descargar los documentos en formato *.pdf*.
		- Mientras visualizamos debemos poder acceder al resto de vistas en detalle (servicio - cliente - facturas) ligadas a este servicio concreto.
		- Si el servicio ya tiene los datos de cliente y familiares asociados, los documentos debe aparecer en el listado (tabla).
		- En esta sección el sistema nos debe permitir añadir los datos de familiares a servicios que aún no los tengan, esto además generaría los documentos correspondientes. Esto se realizará mediante un formulario.
		- Mostrar alertas en el caso de que algún campo obligatorio no haya sido rellenado.
		- Mostrar alertas en el caso de que algo haya fallado.
		- Validación de tipado de datos.
		- Pantalla adaptable a otro dispositivos. 		
		- La experiencia del usuario debe ser óptima.
		- Solo si el usuario tiene un rol suficiente podrá ver la opción de borrar. 
		- Solo si el usuario está correctamente *logueado* podrá realizar las acciones.

- HU - Interfaz 
	- Usuario: Jefe / Empleado
	- Funcionalidad: Visualizar, editar y descargar la factura del servicio.
	- Resultado: La interfaz nos proporcionará todos los instrumentos necesarios con los que poder realizar dichas acciones.
	- Criterios de aceptación:		
		- El sistema nos proporcionará un listado de facturas disponibles mediante una tabla.	
		- El sistema nos permitirá visualizar las facturas. Para ello tendrá que recuperar toda la información necesaria y mostrarla en el formato del documento elegido. Si la factura es extensa, deberá autoajustarse correctamente.
		- El sistema nos permitirá descargar los documentos en formato *.pdf*.
		- Mientras visualizamos debemos poder acceder al resto de vistas en detalle (servicio - cliente - documentos) ligadas a este servicio concreto.
		- Si el servicio ya tiene los datos de cliente y factura asociados, los documentos debe aparecer en el listado (tabla).
		- El sistema nos debe permitir añadir la información de los conceptos de la factura a servicios que aún no tengan estos asociados. Esto se realizará mediante un formulario.		
		- Si el servicio ya tiene los datos de cliente y facturas asociados, los documentos debe aparecer en el listado (tabla).
		- Mostrar alertas en el caso de que algún campo obligatorio no haya sido rellenado.
		- Mostrar alertas en el caso de que algo haya fallado.
		- Validación de tipado de datos.
		- Pantalla adaptable a otro dispositivos. 		
		- La experiencia del usuario debe ser óptima.
		- Solo si el usuario tiene un rol suficiente podrá ver la opción de borrar. 
		- Solo un usuario con permisos especiales podrá visualizar las facturas.	






- HU. 14
	- Usuario: Jefe / Empleado
	- Funcionalidad: Ver calendario.
	- Resultado: Ver el calendario para este la fecha actual en formato mensual.
	- Criterios de aceptación:
		- Se mostrará como pantalla principal el mes completo de la fecha actual.
		- Se podrá cambiar la vista a la semana o el día actual.
		- Se podrá acceder a información específica sobre los diferentes eventos.
		- Se podrá utilizar en varios dispositivos.
		- Solo un usuario logueado podrá realizar esta acción.

- HU. 15
	- Usuario: Jefe / Empleado
	- Funcionalidad: Generar nuevo evento en el calendario.
	- Resultado: El evento se añadirá al calendario y será visible.
	- Criterios de aceptación:
		- El usuario podrá introducir información relevante.
		- Solo un usuario logueado podrá realizar esta acción.

- HU. 16
	- Usuario: Jefe / Empleado
	- Funcionalidad: Editar evento del el calendario.
	- Resultado: El evento se añadirá al calendario y será visible.
	- Criterios de aceptación:
		- El usuario podrá modificar información del evento.
		- El usuario podrá mover el evento a otra fecha deseada.
		- Solo un usuario logueado podrá realizar esta acción.

- HU. 17
	- Usuario: Sistema
	- Funcionalidad: Crear eventos automáticos.
	- Resultado: Nuevos eventos se crearán automáticamente en el sistema.
	- Criterios de aceptación:
		- Una vez creado un nuevo servicio y conocida su fecha de realización, el sistema creará un evento automáticamente.

- HU. 18
	- Usuario: Jefe / Empleado
	- Funcionalidad: Enviar correo.
	- Resultado: El correo será enviado.
	- Criterios de aceptación:
		- El sistema proporcionará un formulario sencillo en el que introducir la información necesaria.
		- El mensaje se almacenará en el sistema.
		- El sistema solicitará las credenciales de la dirección de correo usada para enviar.
		- Solo si las credenciales son correctas se podrá enviar el correo.
		- Solo un usuario logueado podrá realizar esta acción.

- HU. 19
	- Usuario: Jefe / Empleado
	- Funcionalidad: Leer correo.
	- Resultado: Leer los mensajes de mi bandeja de entrada.
	- Criterios de aceptación:
		- Se podrá leer el correo de la dirección de correo que se desee.
		- Las credenciales del correo tienen que ser correctas.
		- Solo un usuario logueado podrá realizar esta acción.

- HU. 20
	- Usuario: Sistema
	- Funcionalidad: Sistema circular de datos.
	- Resultado: Rápido acceso entre secciones.
	- Criterios de aceptación:
		- Una vez seleccionado un servicio concreto el sistema nos tiene que permitir acceder de una forma rápida a los datos de su cliente asociado, sus documentos y sus facturas.
		- Desde cualquiera de estas cuatro secciones (servicio - cliente - documentos - facturas) se tiene que poder acceder al resto de forma rápida.






- HU. 21
	- Usuario: Programador
	- Funcionalidad: Permitir el uso del lenguaje óptimo en cada momento.
	- Resultado: Múltiples lenguajes funcionando entre sí.
	- Criterios de aceptación:
		- Sistema en el que puedan coexistir múltiples lenguajes.

- HU. 22
	- Usuario: Programador
	- Funcionalidad: Permitir el uso de diferentes protocolos de comunicación.
	- Resultado: Poder usar tanto un protocolo síncrono como asíncrono.
	- Criterios de aceptación:
		- El sistema debe permitir ambos protocolos.
		- El sistema debe permitir la comunicación más óptima según la petición que se realice.
		- En cada caso el lenguaje que reciba la petición debe poder satisfacer la demanda.

- HU. 23
	- Usuario: Programador
	- Funcionalidad: El sistema debe permitir múltiples peticiones simultáneas.
	- Resultado: El sistema responderá sin necesidad de máquinas adicionales.
	- Criterios de aceptación:
		- Múltiples usuarios podrán trabajar simultáneamente.
		- El sistema responderá a las múltiples peticiones sin necesidad de más infraestructura hardware.
		- La experiencia de usuario no se verá ralentizada cuando múltiples usuarios estén trabajando en el sistema.

- HU. 24
	- Usuario: Programador
	- Funcionalidad: El sistema podrá realizar tareas en segundo plano.
	- Resultado: Las peticiones que se puedan realizar en segundo plano se enviarán a una cola y se procesarán mientras el sistema trabaja en otras tareas.
	- Criterios de aceptación:
		- Trabajos como el envío de correo se realizarán en segundo plano. 
		- Trabajos como la generación de eventos en el calendario se realizarán en segundo plano.
		- Las tareas en segundo plano no interferirán en la experiencia del usuario.

- HU. 25
	- Usuario: Programador
	- Funcionalidad: Integración continua.
	- Resultado: El sistema se testeará y desplegará automáticamente al añadir los cambios a Git.  
	- Criterios de aceptación:
		- Integración con Github.
		- La herramienta de integración continua lanzará y verificará que los tests se pasan correctamente.
		- La herramienta desplegará automáticamente en el sistema cloud elegido.
		- El coste de administración será sencillo.
		- Debe tener un plan gratuito.

- HU. 26
	- Usuario: Programador
	- Funcionalidad: Crear y configurar máquinas virtuales en la nube.
	- Resultado: Desde infraestructura como código podremos crear y manejar máquinas virtuales en el sistema cloud elegido.
	- Criterios de aceptación:
		- Tenemos que poder provisionar cada una de las máquinas virtuales específicamente para la funcionalidad que corra en dicha máquina.
		- Tenemos que poder orquestar las máquinas en el sistema cloud elegido.

HU. X
	- Usuario: Programador
	- Funcionalidad: 
	- Resultado:
	- Criterios de aceptación:
		-
		-

*Algunas de estas historias de usuario dependerán del tiempo disponible final para su implementación, especialmente algunos de sus criterios de aceptación.*