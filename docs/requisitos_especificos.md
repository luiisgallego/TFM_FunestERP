# Especificación de requisitos

En esta sección expondremos los requisitos a un nivel de detalle suficiente como para permitirnos diseñar un sistema que los satisfaga, y que además permita realizar las pruebas pertinentes que demuestren que el sistema cumple correctamente nuestras necesidades. Todo requisito aquí especificado describirá los comportamientos externos del sistema, perceptibles por parte de los usuarios. (Citar documento segundo).

## Estandar a seguir

El estándar utilizado para la especificación de requisitos es el [IEE 830](http://www.math.uaa.alaska.edu/~afkjm/cs401/IEEE830.pdf). Usado durante años en la mayoría de proyectos de software, describe los enfoques más adecuados para su especificación. 

En nuestro caso utilizaremos el siguiente [documento](https://www.fdi.ucm.es/profesor/gmendez/docs/is0809/ieee830.pdf) como guía en la especificación.

## Requisitos funcionales

- RF. Nombre
    - Características:
    - Descripción:
    - Prioridad:

- RF. Registro de usuario
    - Características: Todo usuario tiene que estar registrado en el sistema para poder hacer uso de él.
    - Descripción: Será el administrador o jefe el que registre un nuevo usuario. Este especificará el tipo de rol que tendrá en la empresa.
        - Serán necesarios datos como nombre de usuario, contraseña y rol en el sistema.
	    - No pueden existir dos usuarios con igual nombre de usuario.
        - Necesario la validación del formato de los datos de entrada.
	    - Contraseña con mínimo 6 caracteres.
	    - Contraseña encriptada.
	- Prioridad: Alta.

- RF. Login de usuario.
    - Características: Todo usuario tiene que identificarse para poder acceder al sistema.
    - Descripción: Para el acceso es necesario su nombre de usuario y contraseña.
    - Prioridad: Alta.

- RF. Logout de usuario.
    - Características: Todo usuario puede cerrar su sesión en el sistema.
    - Descripción: Cierra la sesión y nos redirige hasta la página de login.
    - Prioridad: Baja.

- RF. Añadir nuevo servicio. 
    - Características: Se registra un nuevo difunto en el sistema. Comienza un nuevo ciclo en el sistema.
    - Descripción: Se proporcionará varios formularios para los distintos datos a insertar (difunto, cliente, familiares, ...). Aquellos formularios que no estén vacíos serán los ítems que se generen, siendo posible crear un difunto con su servicio, el cliente y los datos para los documentos. Finalmente, el sistema creará el enlace correspondiente entre ellos.    
        - Datos para el registro del difunto: Nombre, DNI, sexo, natural de, provincia, calle, número, código postal, fecha nacimiento, estado civil, nombre pareja, hijo de, natural de, y de, natural de. 
        - Datos para el registro del servicio: Fecha defunción, hora defunción, fecha entierro, hora entierro, población entierro, fecha misa, hora misa, tanatorio, tipo servicio, compañía.
        - Datos para el registro del cliente: Nombre, DNI, dirección, población, código postal, teléfono, email, cuenta bancaria.
        - Datos para el registro de familiares: Par de datos denominados rol y nombres. Tantas veces como el usuario quiera.
    - Prioridad: Alta.

- RF. Ver datos defunción
    - Características: Los usuarios pueden ver los datos almacenados de un difunto y el servicio asociado.
    - Descripción: Formateado en una tabla de los diferentes datos que se almacenan junto a su valor.
    - Prioridad: Baja.

- RF. Editar datos defunción
    - Características: Los usuarios pueden modificar los datos de un difunto y los del servicio asociado.
    - Descripción: Cualquier dato es modificable, excepto los identificadores que ligan difunto – esquela – cliente – factura. Será necesaria la validación del formato de los nuevos datos introducidos.	
    - Prioridad: Media.

- RF. Borrar defunción
    - Características: Los usuarios podrán borrar los datos de un difunto y su servicio.
    - Descripción: El sistema eliminará los datos del difunto y del servicio. Además, las relaciones creadas con el resto de ítems también serán suprimidas. 
    - Prioridad: Baja.

- RF. Añadir nuevo cliente
    - Características: En el caso de que en el proceso inicial no se haya creado el cliente asociado al difunto, el usuario podrá crearlo posteriormente.
    - Descripción: El sistema primero nos proporcionará un buscador con los difuntos almacenados en el sistema para indicar con cual está asociado el nuevo cliente. Posteriormente podremos añadir los datos del nuevo cliente.
        - Datos para el registro del cliente: Nombre, DNI, dirección, población, código postal, teléfono, email, cuenta bancaria.
    - Prioridad: Alta.

- RF. Añadir difunto a cliente
    - Características: Un cliente puede tener asociado varios difuntos. Por lo tanto, un usuario podrá crear esta relación.
    - Descripción: El sistema nos permitirá para un cliente ya existente, asociarle un difunto que aún no tenga cliente. Para ello utilizaremos un buscador.
    - Prioridad: Media.

- RF. Ver datos cliente
    - Características: Los usuarios pueden ver los datos almacenados de un cliente.
    - Descripción: Formateado en una tabla de los diferentes datos que se almacenan junto a su valor.
    - Prioridad: Baja.

- RF. Editar datos cliente
    - Características: Los usuarios pueden modificar los datos de un cliente.
    - Descripción: Cualquier dato es modificable, excepto los identificadores que ligan difunto – esquela – cliente – factura. Será necesaria la validación del formato de los nuevos datos introducidos.
    - Prioridad: Media.

- RF. Borrar cliente
    - Características: Los usuarios podrán borrar los datos de un cliente.
    - Descripción: El sistema eliminará el cliente en cuestión además de las relaciones que tenga establecidas con el resto de ítems.
    - Prioridad: Baja.

- RF. Añadir nuevos documentos
    - Características: En el caso de que en el proceso inicial no se haya creado los datos asociados a los familiares del difunto, el usuario podrá crearlo posteriormente para la generación de las esquelas, misas y recordatorias.
    - Descripción: El sistema primero nos proporcionará un buscador con los difuntos almacenados en el sistema para indicar con cual está asociado los nuevos familiares. Posteriormente podremos añadir los pares de datos.
	    - Datos para el registro de familiares: Par de datos denominados rol y nombres. Tantas veces como el usuario quiera.
    - Prioridad: Media.

- RF. Ver documentos
    - Características: Los usuarios pueden ver los datos almacenados de los documentos. El sistema distingue entre esquela, misa y recordatoria
    - Descripción: Formateado de los datos de forma final. Este formateado se realizará con el tamaño de una hoja A4.
    - Prioridad: Baja.

- RF. Generar pdf documentos
    - Características: Los usuarios pueden exportar los distintos documentos directamente a pdf, para su posterior descarga.
    - Descripción: El sistema nos carga los datos en su forma final listo para descarga mediante pdf.
    - Prioridad: Baja.

- RF. Editar documentos
    - Características: Los usuarios pueden modificar los datos de los familiares para la generación de los documentos.
    - Descripción: Cualquier dato es modificable, excepto los identificadores que ligan difunto – esquela – cliente – factura. Será necesaria la validación del formato de los nuevos datos introducidos.
    - Prioridad: Media.

- RF. Modificar estado documentos
    - Características: Los usuarios podrán indicar el estado de los documentos.
    - Descripción: El sistema nos permite indicar si cada documento ha sido emitido o no, siendo esto de especial utilidad para las notificaciones.
    - Prioridad: Baja.

- RF. Borrar documentos
    - Características: Los usuarios podrán borrar los datos de los documentos.
    - Descripción: El sistema eliminará el listado de familiares en cuestión además de las relaciones que tenga establecidas con el resto de ítems. 
    - Prioridad: Baja.

- RF. Añadir nueva factura
    - Características: El usuario podrá introducir los datos asociados a la factura del difunto, especialmente enfocado en el par concepto – precio.
    - Descripción: El sistema primero nos proporcionará un buscador con los difuntos almacenados en el sistema para indicar con cual está asociado la nueva factura. Posteriormente podremos añadir los pares de datos.
	    - Datos para el registro de la factura: Par de datos denominados concepto e importe. Tantas veces como el usuario quiera.
    - Prioridad: Alta.

- RF. Ver factura
    - Características: Los usuarios pueden ver los datos almacenados de cada factura. 
    - Descripción: Formateado de los datos de forma final, como si para una impresión se tratase.
    - Prioridad: Baja.

- RF. Generar pdf factura
    - Características: Los usuarios pueden exportar las facturas directamente a pdf, para su posterior descarga.
    - Descripción: El sistema nos carga los datos en su forma final listo para descarga mediante pdf.
    - Prioridad: Baja.

- RF. Editar factura
    - Características: Los usuarios pueden modificar los datos de una factura.
    - Descripción: Cualquier dato es modificable, excepto los identificadores que ligan difunto – esquela – cliente – factura. Será necesaria la validación del formato de los nuevos datos introducidos.
    - Prioridad: Media.

- RF. Modificar estado factura
    - Características: Los usuarios podrán indicar el estado de las facturas.
    - Descripción: El sistema nos permite indicar si cada factura ya ha sido emitida y si ya ha sido cobrada, siendo esto de especial utilidad para las notificaciones.
    - Prioridad: Baja.

- RF. Borrar factura
    - Características: Los usuarios podrán borrar los datos de una factura.
    - Descripción: El sistema eliminará los datos asociados a la factura en cuestión además de las relaciones que tenga establecidas con el resto de ítems.
    - Prioridad: Baja.

- RF. Ligado de ítems (Difunto – Cliente – Documentos - Factura)
    - Características: Los usuarios podrán acceder desde cualquiera de los cuatro ítems que componen el sistema, al resto de una forma rápida y sencilla.
    - Descripción: Dentro de las opciones de cada ítem, encontramos una navegación que nos lleve al resto de ítems mostrándonos tan solo la información relacionada con el ítem del cual procedíamos. Es decir, desde un difunto podremos acceder rápidamente a su cliente en cuestión asociado, o los documentos pertinentes y factura. Así para cualquiera combinación posible entre los cuatro ítems.
    - Prioridad: Baja.

- RF. Ver agenda
    - Características: Los usuarios dispondrán de un calendario donde se muestren los eventos pendientes.
    - Descripción: Distintos tipos de eventos serán mostrados en la agenda. Entre ellos, los almacenados previamente o algunos generados mediante las notificaciones.
    - Prioridad: Baja.

- RF. Añadir evento a la agenda
    - Características: El usuario podrá generar nuevos eventos en la agenda.
    - Descripción: El sistema nos proporcionará un pequeño formulario donde introducir los datos para el nuevo evento. Siendo estos datos una descripción y la fecha del evento, distinguiendo en este último caso entre día completo o horario concreto.
    - Prioridad: Baja.

- RF. Enviar correo
    - Características: Todo usuario podrá enviar correos desde su cuenta personal.
    - Descripción: El usuario puede enviar correos a cualquier dirección.
        - El correo se realizará a través de un formulario el cual contendrá los siguientes datos: Dirección, asunto y mensaje.
    - Prioridad: Baja.

- RF. Leer correo
    - Características: Un usuario podrá leer los correos de su bandeja de entrada
    - Descripción: Bandeja de entrada donde mediante un listado se mostrará los mensajes recibidos.
    - Prioridad: Baja.

- RF. Generar notificación
    - Características: El usuario podrá visualizar las notificaciones generadas en base a distintos eventos.
    - Descripción: Eventos posibles que generarán notificación:
        - Misas funerales próximas.
        - Esquelas sin emitir.
        - Misas sin emitir.
        - Recordatorias sin emitir.
        - Facturas sin emitir.
        - Facturas sin cobrar.
    - Prioridad: Baja.

- RF. Actualizar gráfico
    - Características: El usuario podrá visualizar un gráfico informativo sobre el rendimiento mensual del negocio.
    - Descripción: El sistema actualizará el gráfico principal en base al número de servicios atendidos cada mes.
    - Prioridad: Baja.

## Requisitos no funcionales

- RNF. Nombre
    - Características:
    - Descripción:

- RNF. Plataforma
    - Características: Aplicación web alojada en sistema cloud.
    - Descripción: Diseño responsive permitiéndonos la visualización en cualquier dispositivo y momento.

- RNF. Interfaz sencilla.
    - Características: La interfaz de trabajo debe ser lo más intuitiva posible.
    - Descripción: A modo de actualización sencilla del trabajo manual hasta el informático, la interfaz debe ser lo más amigable posible destacando sus funcionalidades y opciones rápidamente.

- RNF. Distintas interfaces según usuario
    - Características: Todos los usuarios no deben de poder ver lo mismo.
    - Descripción: Algunas vistas estarán restringidas a los distintos roles de usuarios, por ejemplo, la de contabilidad o el gráfico inicial.

- RNF. Disponibilidad
    - Características: El sistema funcionará continuamente.
    - Descripción: No hay tramo horario en el cual el sistema se paralice, estamos ante una empresa que trabaja las 24 horas del día y la disponibilidad del sistema en todo momento es esencial.

- RNF. Eficiencia.
    - Características: El sistema será ágil en sus procesos.
    - Descripción: Si hay una cuestión que desespera a cualquier usuario es que el sistema con el que trabaja sea lento y pesado, por ello, una cuestión importante es que la fluidez de trabajo sea la adecuada.

- RNF. Usabilidad
    - Características: Sistema sencillo de usar.
    - Descripción: El tiempo de aprendizaje del sistema por un usuario debe ser mínimo. Además, la tasa de errores que desarrolle en el sistema también debe ser lo más baja posible.

- RNF. Escalabilidad
    - Características: El sistema soportará cualquier número de peticiones.
    - Descripción: Si el número de procesos crece, el sistema será capaz de ampliar sus recursos para abastecer todas las peticiones.
