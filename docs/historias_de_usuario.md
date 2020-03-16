# Historias de usuario

Para la realización de historias de usuario nos basaremos en el siguiente [ejemplo](https://www.scrummanager.net/bok/index.php/Historia_de_usuario).

## Descripción

Podemos entender las historias de usuario como una manera simple de describir una tarea, la cual aporta valor al usuario que hace uso de la aplicación. Para ello hacemos uso del lenguaje común del usuario, coloquial, y con tan solo un par de frases queda definido el requisito.

Esta forma de representar a los requisitos está directamente ligada a los casos de uso, y en gran parte los sustituye. Esto se debe a que las historias de usuarios son más simples de escribir y de entender, además nos aseguran que no hay cabos sueltos.

Finalmente están especialmente relacionadas con el desarrollo ágil. Las historias de usuarios están vivas. Cuando se realizan las planificaciones para los sprint son fácilmente desglosables, priorizadas y organizadas en diferentes tareas, listas para ser repartidas a los diferentes equipos. Ideal para metodologías como Scrum.

La estructura que siguen es la siguiente:
	Yo como <usuario>
	necesito / deseo / quiero <funcionalidad>
	para <beneficio de negocio>

## Listado

- HU. 1
	- Usuario: Jefe / Empleado
	- Funcionalidad: Login en el sistema.
	- Resultado: Acceder a las funcionalidades del sistema.
	- Criterios de aceptación:
		- Se aceptará como nombre de usuario tanto el correo como el nombre.
		- La contraseña asociada tiene que ser correcta.
		- La contraseá tendrá más de 8 carácteres.
		- Se tiene que proporcionar una doble verificación.

- HU. 2
	- Usuario: Jefe / Empleado
	- Funcionalidad: Logout en el sistema.
	- Resultado: Salir del sistema.
	- Criterios de aceptación:
		- Se cerrará completamente la sesión del usuario.
		- Los datos almacenados en caché se eliminarán.

- HU. 3
	- Usuario: Jefe / Empleado
	- Funcionalidad: Comenzar nuevo servicio.
	- Resultado: Registrar los datos del nuevo servicio en el sistema.
	- Criterios de aceptación:
		- Se tiene que permitir añadir un nuevo servicio.
		- Se tiene que permitiar añadir los datos del cliente y familiares asociados, aunque estos serán en este punto de forma opcional.
		- La solicitud de datos se presentará en un formulario, el cual distinguirá claramente las diferentes secciones.
		- Solo si algún campo de las secciones de clientes y familiares tienen datos se almacenarán.
		- El formulario tiene que ser comprensible para cualquier tipo de usuario.
		- La pantalla se tiene que adaptar tanto ordenadores como tablets, y si fuera posible, a móviles.
		- Solo un usuario logueado podrá crear un nuevo servicio.

- HU. 4
	- Usuario: Jefe / Empleado
	- Funcionalidad: Añadir los datos del cliente o de los familiares tras el registro del servicio.
	- Resultado: Registrar los datos en el sistema.
	- Criterios de aceptación:
		- El sistema tiene que permitir añadir los datos del cliente y de los familiares en un punto posterior a la creación del servicio.
		- Los datos se vincularán al servicio en cuestión.
		- La solicitud de datos se presentará en un formulario, el cual distinguirá claramente las diferentes secciones.
		- La pantalla se tiene que adaptar tanto ordenadores como tablets, y si fuera posible, a móviles.
		- Solo un usuario logueado podrá crear un nuevo servicio.


- HU. 5
	- Usuario: Jefe / Empleado
	- Funcionalidad: Ver datos del servicio, cliente y familiares.
	- Resultado: El sistema mostrará datos sobre el servicio y su cliente y familiares asociados de forma ordenada y legible.
	- Criterios de aceptación:
		- Se tiene que poder mostrar todos los datos del servicio, cliente y familiares en una misma pantalla.
		- Se tiene que poder buscar entre servicios. Según el servicio elegido, se mostrará su cliente y sus familiares.
		- Se tiene que poder buscar enntre clientes. Según el cliente elegido, se mostrará su servicio y sus familiares.
		- Se tiene que permitir la edición de los datos desde esta misma pantalla.
		- La información tiene que poder ser mostrada en diversos dispositivos (pc-tablet).
		- Solo un usuario logueado podrá acceder a la información.

- HU. 6
	- Usuario: Jefe / Empleado
	- Funcionalidad: Editar datos del servicio, cliente y familiares.
	- Resultado: Edición y guardado de los datos en cuestión del servicio, cliente o familiares.
	- Criterios de aceptación:
		- Se tiene que poder mostrar y editar todos los datos habilitados.
		- Se tiene que poder excluir ciertos datos de la edición. Como por ejemplo, fecha de creación del servicio o identicadores varios.
		- Solo se actualizarán los datos relativos al servicio, cliente o familiares si algún campo de estos es modificado.
		- Se tiene que almacenar un historial de cambios. Si fuera posible además guardar la información previa por si fuera necesario volver atrás.
		- La información tiene que poder ser mostrada en diversos dispositivos (pc-tablet).
		- Solo un usuario logueado podrá editar un servicio.

- HU. 7
	- Usuario: Jefe / Empleado
	- Funcionalidad: Borrar servicio, cliente o familiares.
	- Resultado: La información no será accesible.
	- Criterios de aceptación:
		- El listado de servicios no mostrará el servicio eliminado.
		- Los datos del servicio permanecerán en la base de datos, por si en un futuro se necesitaran de nuevo.
		- Si se eliminan los datos de un servicio, se eliminan los datos de cliente y familiares asociados.
		- Si se eliminan los datos de un cliente o familiares, el resto de datos permanecerán sin modificar.
		- El sistema debe permitir mostrar los servicios eliminados.
		- El sistema solicitará una confirmación antes de ser eliminado.
		- Solo un usuario logueado podrá borrar un servicio.

- HU. 8
	- Usuario: Jefe / Empleado
	- Funcionalidad: Enlazar cliente a varios servicios.
	- Resultado: La información relativa al cliente se enlazará a otro nuevo servicio.
	- Criterios de aceptación:
		-
		-

- HU. 9
	- Usuario: Jefe
	- Funcionalidad: Añadir datos para contabilidad.
	- Resultado: 
	- Criterios de aceptación:
		-
		-


- HU. 10
	- Usuario: Jefe
	- Funcionalidad: Ver facturas.
	- Resultado: 
	- Criterios de aceptación:
		-
		-

HU. 11
	- Usuario: Jefe
	- Funcionalidad: Editar facturas.
	- Resultado: 
	- Criterios de aceptación:
		-
		-

HU. 12
	- Usuario: Jefe
	- Funcionalidad: Borrar facturas.
	- Resultado: La información no será mostrada de nuevo en el listado.
	- Criterios de aceptación:
		-
		-

- HU. 13
	- Usuario: Jefe / Empleado
	- Funcionalidad: Vista previa de los diferentes documentos y de las facturas.
	- Resultado: El sistema nos permitirá observar el resultado final del montaje de los diferentes documentos del servicio.
	- Criterios de aceptación:
		-
		-

- HU. 14
	- Usuario: Jefe / Empleado
	- Funcionalidad: Exportación a PDF de los documentos y de las facturas.
	- Resultado: El sistema nos permitirá descargar los documentos en PDF para su posterior guardado.
	- Criterios de aceptación:
		-
		-

HU.
Usuario: Jefe / Empleado
Funcionalidad: Generar nuevo evento en el calendario
Resultado: Tenerlo visible cada vez que accedo a la agenda.
- Criterios de aceptación:
	-
	-

HU.
Usuario: Jefe / Empleado
Funcionalidad: Enviar correo.
Resultado: Poder comunicarme por email desde dentro del sistema.
- Criterios de aceptación:
	-
	-

HU.
Usuario: Jefe / Empleado
Funcionalidad: Leer correo.
Resultado: Leer los mensajes de mi bandeja de entrada.
- Criterios de aceptación:
	-
	-

HU. X
	- Usuario: Jefe
	- Funcionalidad: 
	- Resultado:
	- Criterios de aceptación:
		-
		-
