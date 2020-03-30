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

- HU. 1
	- Usuario: Jefe / Empleado
	- Funcionalidad: *Login* en el sistema.
	- Resultado: Acceder a las funcionalidades del sistema.
	- Criterios de aceptación:
		- Se aceptará como nombre de usuario tanto el correo como el nombre.
		- La contraseña asociada tiene que ser correcta.
		- La contraseña tendrá más de 8 carácteres.
		- Se tiene que proporcionar una doble verificación.
		- Una vez realizado el *login* el sistema mantendrá la sesión abierta.

- HU. 2
	- Usuario: Jefe / Empleado
	- Funcionalidad: *Logout* en el sistema.
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
		- Se tiene que permitir añadir los datos del cliente y familiares asociados, aunque estos serán opciones en este punto.
		- La solicitud de datos se presentará en un formulario, el cual distinguirá claramente las diferentes secciones (servicio-cliente-familiares).
		- Solo si algún campo de las secciones de cliente y familiares tienen datos rellenos se almacenarán.
		- El formulario tiene que ser comprensible para cualquier tipo de usuario.
		- La pantalla se tiene que adaptar tanto a ordenadores como a tablets, y si fuera posible, a móviles.
		- Solo un usuario logueado podrá crear un nuevo servicio.

- HU. 4
	- Usuario: Jefe / Empleado
	- Funcionalidad: Añadir los datos del cliente o de los familiares tras el registro del servicio.
	- Resultado: Registrar los datos en el sistema.
	- Criterios de aceptación:
		- El sistema tiene que permitir añadir los datos del cliente y de los familiares en un punto posterior a la creación del servicio.
		- El sistema tiene que permitir añadir estos datos sin vincular a ningún servicio.
		- La solicitud de datos se presentará en un formulario, el cual distinguirá claramente las diferentes secciones.
		- La pantalla se tiene que adaptar tanto ordenadores como tablets, y si fuera posible, a móviles.
		- Solo un usuario logueado podrá crear un nuevo servicio.


- HU. 5
	- Usuario: Jefe / Empleado
	- Funcionalidad: Ver datos del servicio, cliente y familiares.
	- Resultado: El sistema mostrará datos sobre el servicio y su cliente y familiares asociados de forma ordenada y legible.
	- Criterios de aceptación:
		- Se tiene que poder mostrar todos los datos del servicio, cliente y familiares en una misma pantalla.
		- Se tienen que poder mostrar las diferentes secciones de datos en pantallas diferentes. Quizás lo más interesante es tener una pantalla general y otra para los clientes especialmente, ya que estos se pueden vincular a varios servicios.
		- Se tiene que poder buscar entre servicios. Según el servicio elegido, se mostrará su cliente y sus familiares.
		- Se tiene que poder buscar entre clientes. Según el cliente elegido, se mostrará su servicio y sus familiares.
		- Se tiene que permitir la edición de los datos desde esta misma pantalla.
		- La información tiene que poder ser mostrada en diversos dispositivos (pc-tablet).
		- Solo un usuario logueado podrá acceder a la información.

- HU. 6
	- Usuario: Jefe / Empleado
	- Funcionalidad: Editar datos del servicio, cliente y familiares.
	- Resultado: Edición y guardado de los datos en cuestión del servicio, cliente o familiares.
	- Criterios de aceptación:
		- Se tiene que poder mostrar y editar todos los datos habilitados.
		- Se tiene que poder excluir ciertos datos de la edición. Como por ejemplo, fecha de creación del servicio o identificadores varios.
		- Solo se actualizarán los datos relativos al servicio, cliente o familiares si algún campo de estos es modificado.
		- Se tiene que almacenar un historial de cambios. Si fuera posible además guardar la información previa por si fuera necesario volver atrás.
		- La información tiene que poder ser mostrada en diversos dispositivos (pc-tablet).
		- Solo un usuario logueado podrá editar un servicio.

- HU. 7
	- Usuario: Jefe 
	- Funcionalidad: Borrar servicio, cliente o familiares.
	- Resultado: La información no será accesible.
	- Criterios de aceptación:
		- El listado de servicios no mostrará el servicio eliminado.
		- Los datos del servicio permanecerán en la base de datos, por si en un futuro se necesitaran de nuevo.
		- El sistema debe permitir mostrar los servicios eliminados.
		- El sistema solicitará una confirmación antes de ser eliminado.
		- Solo un usuario con permisos especiales podrá borrar un servicio.
		- Solo un usuario con permisos especiales podrá tener la opción de borrar un servicio.

- HU. 8
	- Usuario: Jefe / Empleado
	- Funcionalidad: Enlazar cliente a varios servicios.
	- Resultado: La información relativa al cliente se enlazará a otro nuevo servicio.
	- Criterios de aceptación:
		- El sistema tiene que permitir enlazar un cliente existente a un servicio.
		- El sistema tiene que proporcionar información de los servicios sin clientes.
		- Un servicio no puede tener varios clientes.		
		- Solo un usuario logueado podrá realizar esta acción.

*Los aspectos relativos a contabilidad dan cabida a un gran número de posibilidades, desde controlar el stock de material actual en la empresa hasta tener un control de gastos total, pero de cara el proyecto que nos ocupa esta parte de simplificará a tan solo generar una factura final. Esta parte se ampliará si el tiempo lo permite.*

- HU. 9
	- Usuario: Jefe
	- Funcionalidad: Añadir datos para contabilidad.
	- Resultado: La información se almacenará en el sistema.
	- Criterios de aceptación:
		- El sistema presentará un formulario sencillo en el que añadir los diferentes conceptos que tendrán lugar en la factura.
		- El sistema realizará los cálculos finales tales como cálculo de IVA o importe final entre otros.
		- Solo un usuario con permisos especiales podrá realizar esta acción.

- HU. 10
	- Usuario: Jefe
	- Funcionalidad: Editar datos de contabilidad.
	- Resultado: El sistema mostrará los datos y posteriormente los actualizará.
	- Criterios de aceptación:
		- El sistema permitirá editar los diferentes puntos de las facturas.
		- Solo un usuario con permisos especiales podrá realizar esta acción.

HU. 11
	- Usuario: Jefe
	- Funcionalidad: Borrar facturas.
	- Resultado: La información no será mostrada de nuevo en el listado.
	- Criterios de aceptación:
		- El sistema permitirá borrar la factura.
		- La factura no se borrará completamente del sistema, por si fuera necesario su recuperación.
		- Solo un usuario con permisos especiales podrá realizar esta acción.

- HU. 12
	- Usuario: Jefe / Empleado
	- Funcionalidad: Vista previa de los diferentes documentos y de las facturas.
	- Resultado: El sistema nos permitirá observar el resultado final del montaje de los diferentes documentos y facturas del servicio.
	- Criterios de aceptación:
		- Los datos se mostrarán correctamente en el documento.
		- El documento debe autoajustarse en función de la longitud del texto personalizado que se use en cada caso.
		- El visualizado se tiene que poder realizar en diferentes dispositivos.
		- Solo un usuario con permisos especiales podrá visualizar las facturas.
		- Solo un usuario logueado podrá realizar esta acción.

- HU. 13
	- Usuario: Jefe / Empleado
	- Funcionalidad: Exportación a PDF de los documentos y de las facturas.
	- Resultado: El sistema nos permitirá descargar los documentos en PDF para su posterior guardado.
	- Criterios de aceptación:
		- El documento mantendrá el mismo formato que el mostrado en la vista previa.
		- El sistema nos tiene que permitir descargar el documento en formato .pdf.
		- Solo un usuario logueado podrá realizar esta acción.

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