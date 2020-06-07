# ************ TODO ************ 

## DOCUMENTACIÓN:

- CRUD LOGIN:
	- Porqué usamos passport?
		- Que es?
		- Que nos proporciona?
		- Y sobre todo, que nos puede proporcionar en el futuro...
	- Importancia de tener la contraseña encriptada.
	- Posibles ampliaciones:
		- JWT
	- ....

- CRUD DEFUNCIONES:	
	- Relación entre difunto - servicio y porqué se unen en 'defunción'. Es decir, 
	hablar sobre los diferentes modelos planteados en el microservicio y 
	porqué deberían estar todos en un mismo microservicio.
		- También comentar sobre difunto como eje central del sistema.
			- En todo momento debemos tener la información vinculada de cliente, 
			familiarr, factura ligada a el, ya que es el punto de partida del servicio 
			(software - aplicación) que planteamos...
			- Esto es interesante para exponer cual es la idea del software, donde nace, 
			cual es la necesidad primaria que busca satisfacer y hacia donde nos dirigimos.
	- ¿Que pasa cuando eliminamos un difunto (servicio)? (interesante comentarlo???)
	- ....

- CRUD CLIENTE:
	- Idea base de este microservicio.
	- ¿Porque podemos tener varios clientes para un mismo difunto?

- CRUD LOG:	
	- Comentar que primero se comenzó usando winston, pero que este presentaba problemas 
		al guardar en la db, lo que lo convertía en inutil para el propósito real de un LOG,
		poder en el futuro ver que ha pasado, por quien, que cambió, etc etc.
	- Comentar que se buscaba usar alguna librería que nos permitiera usar mongo y tal, y por
	eso elegimos winston, pero que finalmente definimos nuestro propio modelo y funcionalidad
	para asi en el futuro poder crear esto a nuestro gusto y además satisface completamente
	nuestros requisitos.
	- Documentar el porqué usarlo en un microservicio independiente.	(!!!!!)

- CRUD FAMILIA:
	- Explicar la idea de la estructura rol-values creada.
		- Comentar que esta es una de las razones de peso
			por la que se usó MONGODB.

- INTEGRACIÓN CONTINUA:
	- Documentar sobre el proceso de despliegue en cloud, 
		ya que es parte importante de su elección. Por tanto investigar también.

- PROVISIÓN:	
	- Definir los requisitos en las HU.
	- Presentar las ofertas del mercado.
	- Defender una de ellas (Ansible).
	- Exponer porque esto es importante en un proyecto y arquitectura
	moderna, que ventajas nos presentan este tipo de herramientas.
		- Beneficios especiales en microservicios ???

- ORQUESTACIÓN:											
	- Definir los requisitos en las HU.
	- Presentar las ofertas del mercado.
	- Defender una de ellas (Vagrant).
	- Exponer porque esto es importante en un proyecto y arquitectura
	moderna, que ventajas nos presentan este tipo de herramientas.
		- Beneficios especiales en microservicios ???

- DIAGRAMAS:
	- Evaluar que diagramas pueden ser útiles en este proyecto. Por ejemplo:
		- Diagrama de la infraestructura.

- INVESTIGACIÓN:
	- No dejas claro si es un sistema que se va a instalar "on premises" 
	para la Funeraria o bien hacer un sistema multi-tennant, 
	donde tengas varios clientes y lo vendas como software como servicio.
		- Investigar estos conceptos.
		- Crear la historia de usuario si corresponde.

	- Modelo de negocio:
		- ¿Cómo vas a vender tu FunestERP?
			- Sistema Cloud: 
				- Tienes que estimar costes y sobre todo ver la forma de 
				montarlo para que varios clientes puedan usar la misma infraestructura.
				- Hacer pruebas de coste.
				- Siempre el coste de desarrollo y el coste de servicio hay que 
				tratar de estimarlo, al menos en proyectos de este tipo.
				- Costes a calcular: costes laborales tuyos. Costes de infraestructura, 
				nube en este caso. Costes de amortización de tu equipo personal 
				(portátil o lo que sea). A partir de ahí pones un coste al servicio.
				- Píllate alguna cloud gratis, sube tu infraestructura, hazle pruebas 
				con n peticiones y demás, mira lo que cuesta, y en función de 
				eso haces una estimación de cuanto costaría.

- REPLANIFICACIÓN:
	- Este punto es interesante para comparar lo que deseábamos hacer con lo que ha sido posible hacer.
	- Comentar con JJ:
		- ¿Qué pasa con esas historias incompletas?
			- Deberían ser eliminadas?
			- Se plantean como partes incompletas? Sería lo más lógico, 
			en plan, "quisimos hacer todo esto pero como en la mayoría 
			de proyectos, se sufren retrasos" .....


## FUNCIONALIDAD

- AUTOTEST:																	
	- Hacer script SHELL que nos permita realizar peticiones entre MV.
		- Deberíamos poder realizar las mismas acciones(peticiones) que en 'Test API'

- PROVISIÓN:																	
	- Configuración LOCAL:
		- Actualizar el sistema operativo a la última versión estable.
			- Es decir, es preferible usar la última version de los SO posibles.
		- Simplificar los playbook, es decir, eliminamos todo lo innecesario.
		- Customizar los playbook a cada caso concreto, si se tienen que replicar,
		por tiempo o porque son asi, pues vale, pero intentar adaptarlos a cada
		caso concreto.
		- Realizar esto para cada microservicio.

	- Configuración CLOUD.
		- Desplegar en una máquina virtual de Azure.
			- Quizás el primer test debe hacerse funcionando todos los
			microservicios dentro de la misma máquina. Luego con 
			Vagrant podemos lanzarlos en todas las máquinas.
		-  Verificar que el uso de las últimas versiones tanto de SO, como
			de cualquier libreria usada funciona correctamente. Basicamente
			se trata de hacer estable, funcional y facil de desplegar el 
			proyecto.

- ORQUESTACIÓN:	
	- Configuración LOCAL:
		- Investigar si podemos construir los vagrantfile por
		microservicio y luego tener un vangrantfile que unifique todos.
		- Investigar maquinas virtuales con sistemas operativos más modernos.
		- Probar que funciona con Virtualbox.

	- Configuración CLOUD:.
		- Desplegar en una máquina virtual de Azure.
			- Verificamos que todo funciona según lo esperado.
		- Desplegamos cada microservicio en una máquina distinta.
			- Deberían funcionar bajo el mismo grupo de recursos.

- DEPLOY:
	- Puertos / IPs en los microservicios
		- ¿Cómo sabe el microservicio DEFUNCION que el microservicio 
		CLIENTE está en el puerto 3030? 
			- Posiblemente todo esto vaya ligado a variables de entorno 
			que haya que definir, pero hay que investigar si hay alguna 
			herramienta o parte del sistema que se encarga especialmente de esto.
		- ¿Como sabe cualquier microservicio la dirección donde está 
		operando cualquier otro microservicio?




## INVESTIGAR: 

- CLOUD:
	- Definir requisitos en las HU.
	- Investigar créditos gratis Azure.
	- ¿Como se construirá la infraestructura? Posibilidades:
		- Grupo de recursos general y las diferentes máquinas virtuales dentro de este.

	- "Como administrador quiero ser capaz de desplegar mi aplicación en un servicio cloud gratuito, de manera que me permita realizar despliegues continuos durante su desarrollo."
		- Hay que evaluar/investigar cual es la forma más óptima de desplegar tanto en Heroku como Azure - Google - AWS. Realmente la cuestión es si lo más correcto es "enfrascar" cada microservicio en un contenedor Docker. Esto tiene implicaciones importantes y que habrá que argumentar bien, ya que afecta considerablemente a la configuración de provision y orquestación que hagamos. Además tiene otra implicación importante, no es lo mismo desplegar un microservicio directamente en un máquina virtual, que desplegarlo en un contenedor y este en el contenedor. Esto tiene implicaciones directas con toda la configuración de puertos y demás, ya que tienes a docker por medio. También respecto a prestaciones supongo, aunque puede ser positivo el hecho de poder desplegar varios contenedores en la misma máquina, es decir N veces. Investigar todo esto.


- PROD VS LOCAL => CONFIG VARS:
	- Actualmente estamos hardcodeando las direcciones que usaremos por ejemplo para mongo, por que de ante mano sabemos donde estarán, pero esto habrá que hacerlo de forma automática, es decir, con variable de entorno, asique en ese momento configurar correctamente cada microservicio y por ejemplo en el log, en la definicion de la db para winston, usar las variables de entorno.


- CRUD DEFUNCIONES (REVISAR EN ESTE CASO):
	- Revisar el DELETE del difunto_controller, potencialmente peligroso.
	- Revisar el 'resolve', simplificar si es posible, o eliminar si fuera innecesario.



