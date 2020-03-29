# REORGANIZACIÓN

# Info

- Todas las decisiones que se tomen respecto al proyecto tienen que hacerse en el contexto del proyecto. Es decir, hay que establecer una serie de criterios en base a lo que quieres tener, a las historias de usuario que se tenga. En función de eso, por ejemplo, la elección del front-end puede ser o no irrelevante, pero igual uno u otro tienen más soporte para algún tipo de característica (accesibilidad, posibilidad de traducción, cosas así).

- Un milestone es un hito. No es un grupo de cosas parecidas o no, es algo con cierta coherencia estructural, de forma que cuando se termine el hito, podemos decir que tenemos algo con una cierta funcionalidad y que cumpla una serie de requisitos, algo que se pueda publicar. Todo hito, por lo tanto, tiene que decir "Al final de este hito tendremos X", y ese X será un release que se hará al final del hito.

- PROCEDIMIENTO:
	- Establecer historias de usuario. Con estas delimitamos las diferentes partes del dominio del problema.
	- Luego diseño de la clase.
	- Luego tests.
	- Luego el código que cumpple los tests y resuelve las historias de usuario.

- Extra:
	- Hablar de historias de usuario y no de requisitos funcionales, ya que es mas adecuado en un entorno basado en tests. 

- Luego una vez que tenemos todas las historias de usuario, por ejemplo relativas al backend cubiertas, ya podemos abordar historias relativas a api gateway, provisionadores, etc etc. Esto se valorará en función de las prestaciones o calidad de servicio que queremos obtener.

## Historias de usuario

### Info sobre las actuales:

- HU1: en ella podemos encontrar una serie de especificaciones, si hay alguna biblioteca en algún lenguaje que proporcione eso, trabajo que nos ahorramos.
	- Este puede ser nuestro punto de partida, necesitamos crear: 
		- Diseño de una clase. En este caso sería una clase "Usuario" que maneje los datos de este.
		- Tests que verifiquen cada uno de los requisitos especificados.
		- Código que resuelva el problema.
		- Documentar

- HU2: Es una historia de frontend, no de backend. Una cosa es gestión de usuarios, otra cómo se trabaje con el usuario en el frontend. Así que HU2 iría casi al final cuando tengas el backend completo.

- HU3: "Podría ser otro hito, o varios. Hablas de formulario, que es frontend, pero mezclas cosas de backend. De ahí tendrás que poner diferentes issues para cada una de las cosas."

- Modificar historias en las que estemos planteando operaciones distintas en torno a un mismo tipo de dato ya que es la misma historia de usuario. Entiendo que entonces lo que estamos planteando es un número de requisitos mayor, y por tanto, más issues dentro de un mismo milestone. Por ejemplo la historia 6,7,8.

- Sobre la integración continua:
	- Testear por microservicio? En el caso afirmativo, necesitamos una herramienta que lo permita.
		- https://stackoverflow.com/questions/27644586/how-to-set-up-travis-ci-with-multiple-languages
		- https://docs.travis-ci.com/user/build-matrix/#listing-individual-jobs


### Nuevas a crear

- "Como administrador, debo ser capaz de desplegar la infraestructura en este u otro entorno ( Azure / Amazon / ... )"
- "Como administrador, quiero ser capaz de desplegar mi infraestructura de forma escalable" => Api Gateway
- "Como administrador quiero ser capaz de almacenar un historial de todo lo que ocurra en mi sistema."

- Pensar en las siguientes historias:
	- "Como administrador quiero ser capaz de desplegar mi aplicación en un servicio cloud gratuito, de manera que me permita realizar despliegues continuos durante su desarrollo."
		- Hay que evaluar/investigar cual es la forma más óptima de desplegar tanto en Heroku como Azure - Google - AWS. Realmente la cuestión es si lo más correcto es "enfrascar" cada microservicio en un contenedor Docker. Esto tiene implicaciones importantes y que habrá que argumentar bien, ya que afecta considerablemente a la configuración de provision y orquestación que hagamos. Además tiene otra implicación importante, no es lo mismo desplegar un microservicio directamente en un máquina virtual, que desplegarlo en un contenedor y este en el contenedor. Esto tiene implicaciones directas con toda la configuración de puertos y demás, ya que tienes a docker por medio. También respecto a prestaciones supongo, aunque puede ser positivo el hecho de poder desplegar varios contenedores en la misma máquina, es decir N veces. Investigar todo esto.
	-"Como administrador quiero ser capaz de evaluar los costes de operar mi aplicación en un proveedor cloud final, haciendo uso de software as a service." Esto implica poder provisionarlo, orquestarlo y desplegarlo.
	- "Como administrador quiero poder provisionar para diferentes sistemas (Docker - Heroku - Azure) con una solo definición de mi microservicio."

# TODO

## NOW

- Crear milestone (hito) para microservicio "Login".
	- Documentar milestone.
	- Crear issues (diseño , test, código)

- Issues para Milestone Documentación:
	- HU reorganizar: 
		- Divididas en front / back.
			- el usuario podrá realizar el login desde varios sistemas ( user-pass, google, ...)
			- la interfaz web para el login debe de ...
		- Agrupadas por tipo de dato común.
		- Ampliar requisitos.
		- Añadir nuevas.
	- Replanificar:
		- Primero sprints de back - front y luego infraestructura? o podemos hacerlo en común?
	- Reorganizar documentación.
		- Reajustar algunas cosas o replantear:
			- Elección del frontend. Criterios:
				- Diseño adaptable tanto a pc como móvil.
				- El mismo lenguaje debe poder crear código para ambas plataformas.
				- Validación de formularios.
				- Calendario: 
					- Google calendar.
					- Paquete que lo resuelva.
				- TypeScript vs JavaScript.
					- Lenguaje con tipos ? -> TypeScript
				- Accesibilidad.
				- Traducción a otros lenguajes.
	- Corregir faltas de ortografía:
		- Buscar corrector para markdown.
		- Framework es plural, y siendo inglesa, en cursiva.
	- Domain driven design:
		- Investigar
			- Desarrollo basado en tests?
			- Pautas
			- Tomar como base la documentación de JJ.
		- Se puede "situar" a continuación de la metodología. Es decir, usamos metodología ágil siguiendo un proceso en el código de domain driven design, y como arquitectura, microservicios.

- Crear milestone (hito) para microservicio "Log". ---> AÑADIR HITO CUANDO ESTE SU HISTORIA DE USUARIO !!!!
	- Documentar milestone.
	- Crear issues (diseño , test, código).

- Crear milestone INTEGRACIÓN CONTINUA:
	- Una vez que hayamos repasado las historias de usuario, y mejorado los criterios relacionada con la integración continua, tenemos que establecer el  milestone para "verificar" que se usará Travis o cualquier otro.






## FUTURO

- No dejas claro si es un sistema que se va a instalar "on premises" para la Funeraria o bien hacer un sistema multi-tennant, donde tengas varios clientes y lo vendas como software como servicio.
	- Investigar estos conceptos.
	- Crear la historia de usuario correcpondiente.

- Modelo de negocio:
	- ¿Cómo vas a vender tu FunestERP?
		- Sistema Cloud: 
			- Tienes que estimar costes y sobre todo ver la forma de montarlo para que varios clientes puedan usar la misma infraestructura.
			- Hacer pruebas de coste.
			- Siempre el coste de desarrollo y el coste de servicio hay que tratar de estimarlo, al menos en proyectos de este tipo.
			- Costes a calcular: costes laborales tuyos. Costes de infraestructura, nube en este caso. Costes de amortización de tu equipo personal (portátil o lo que sea). A partir de ahí pones un coste al servicio.
			- Píllate alguna cloud gratis, sube tu infraestructura, hazle pruebas con n peticiones y demás, mira lo que cuesta, y en función de eso haces una estimación de cuanto costaría.


 

