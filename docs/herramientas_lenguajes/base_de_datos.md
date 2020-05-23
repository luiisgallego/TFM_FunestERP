# Base de datos

Nos adentramos en el análisis de ese "almacén" que nos permitirá guardar la diferente información que se usará en cada microservicio. Pieza importante de muchas aplicaciones web, en nuestro caso se vuelve esencial.

Hasta ahora estábamos acostumbrados a utilizar bases de datos SQL como MySQL o Oracle, por ejemplo, pero desde hace unos años han tomado especial relevancia las denominadas NoSQL, las cuales presentan un importante número de características tanto interesantes como útiles, lo que hace de la elección del tipo de base de datos un verdadero reto. Por tanto en la presente sección trataremos de introducir ambos tipos, centrándonos en sus características, y elegiremos la que mejor se adapte a nuestras necesidades.

Antes de comenzar es interesante exponer los criterios de aceptación marcados en la historia de usuario, los cuales debemos de tener presentes en todo el proceso de elección. Siendo los siguientes:
- La base de datos nos debe permitir un crear un esquema flexible. Es decir, debemos poder trabajar con datos no estructurados o semiestructurados.
- La base de datos debe usar un modelo de datos eficiente e intuitivo, como puede ser *Json* por ejemplo.
- Sería ideal trabajar en una versión Cloud de la base de datos elegida.
- No debe generar cuellos de botella.
- Nos debe proporcionar buena escalabilidad.
- Debemos de poder usar tanto una versión para los tests como otra independiente para los datos reales.

## SQL vs No-SQL

Una base de datos relacional (SQL) es aquella que almacena y proporciona acceso a puntos de datos relacionados entre sí. Se basa en el modelo relacional y está formada por filas, las cuales son un registro con un ID único llamado clave y columnas, conteniendo estas los datos. 

En el caso de las bases de datos no relacionales (NoSQL) son aquellas que tienen esquemas flexibles y que usan un modelo de almacenamiento que está optimizado para los requisitos específicos del tipo de dato que se almacena. Por ejemplo, datos como pares clave-valor, documentos *Json* o grafos.

Aunque la lista de características diferenciadoras entre ambos tipos puede ser extensa, vamos a presentar las que consideramos principales.

| | SQL | NoSQL |
| -- | -- | -- |
| Cargas de trabajo óptimas | Destacan para el procesamiento de transacciones online y también para el procesamiento analítico online. | Diseñadas para hacer análisis sobre datos semiestructurados. |
| Modelo de datos | Esquema estricto de tablas, filas, columnas, índices y relaciones entre tablas. | Variedad de modelos de datos como clave-valor, documentos y gráficos, optimizados para el rendimiento y escalado. |
| ACID | Ofrecen propiedades de atomicidad, coherencia, aislamiento y durabilidad. | Flexibilizan las propiedades ACID para crear un modelo de datos más flexible que se pueda escalar horizontalmente. |
| Consistencia | Debe configurarse para una fuerte consistencia. | Depende del DBMS, ya que algunos ofrecen una consistencia fuerte, mientras que otros ofrecen solo una consistencia eventual. |
| Rendimiento | Se necesita la optimización de consultas, índices y estructura para lograr un máximo rendimiento. | Depende del *clúster* de *hardware* subyacente, la latencia de red y la aplicación que efectúa la llamada. |
| API | Las consultas se ajustan a un lenguaje de consultas estructurado (SQL) | Las claves de partición permiten que las aplicaciones busquen pares de clave-valor, conjuntos de columnas o documentos semiestructurados que contengan atributos y objetos de aplicación serializados. |

Si bien ambas soluciones son viables para nuestro problema, nos decantaremos por la opción NoSQL principalmente por la características de su modelo de datos. En nuestro sistema es llamativo, y en gran medida necesario, disponer de una estructura flexible, por ejemplo a la hora de añadir la información de los familiares para los distintos documentos (esquelas). Para estos necesitaremos almacenar valores del tipo clave-valor o como documento, por lo que la base de datos NoSQL es prioridad.

¿Se podría usar un tipo de base de datos distinto según el microservicio que nos ocupe? Si, se podría y quizás sea una gran solución, pero al ser este proyecto una primera aproximación a un proyecto futuro más grande, en principio la idea de usar para todos los microservicios el mismo tipo de base de datos resulta más óptimo, tanto en cuanto a tiempo como a dificultad. Quizás en el futuro esta solución se pueda ampliar.

## Tipos de bases de datos No-SQL

Ahora que ya tenemos claro el tipo de base de datos que vamos a usar necesitamos decidir entra las distintas opciones que podemos encontrar dentro de las NoSQL. Esta elección se presenta más obvia, ya que buscamos la máxima flexibilidad posible, pero igualmente presentaremos algunas de las distintas alternativas que podemos encontrar.

- Clave-valor: Básicamente es una tabla *hash* grande. Nos permite asociar cada valor de datos con una clave única y el almacén clave-valor usará esta clave para almacenar los datos mediante el uso de una función *hash* adecuada. Permiten escalado horizontal a escalas que otros tipos de bases de datos no pueden alcanzar y se caracterizan por ser muy eficientes tanto para las lecturas como para las escrituras. Los casos de uso como juegos, tecnología publicitaria e IoT se prestan particularmente bien con el modelo de datos clave-valor. Algunos ejemplos de este tipo son Cassandra, BigTable o HBase.
- Documentos: Un almacén de datos de documentos administra un conjunto de campos de cadena con nombre y valores de datos de objeto en una entidad que se conoce como un documento. Normalmente, estos almacenes guardan los datos en forma de documentos JSON o XML. Facilitan a los desarrolladores el almacenamiento y la consulta de datos en una base de datos mediante el uso del mismo formato de modelo de documento que emplean en el código de aplicación. El modelo de documentos funciona bien con catálogos, perfiles de usuario y sistemas de administración de contenido en los que cada documento es único y evoluciona con el tiempo. Algunos ejemplos de este tipo son MongoDB o CouchDB.
- Grafos: Administra dos tipos de información, nodos y bordes. Los nodos representan entidades y los bordes especifican las relaciones entre estas entidades. El propósito de un almacén de datos de grafos es permitir a una aplicación realizar consultas de manera eficaz que recorran la red de nodos y bordes y analizar las relaciones entre las entidades. Los casos de uso típicos para una base de datos de gráficos incluyen redes sociales, motores de recomendaciones, detección de fraude y gráficos de conocimiento. Algunos ejemplos de este tipo son Neo4j y Giraph.
- Objetos: Optimizados para almacenar y recuperar objetos binarios grandes como imágenes, archivos, transmisiones de vídeo y audio, objetos de datos de aplicación de gran tamaño, documentos e imágenes de disco de una máquina virtual. Un objeto se compone de los datos almacenados, algunos metadatos y un identificador único para acceder a él. Un caso especial de almacenes de datos de objetos es el recurso compartido de archivos de red, este permite que se acceda a los archivos a través de una red mediante protocolos de red estándar como el protocolo SMB. Algunos ejemplos de este tipo de bases de datos son Zope o Db4o.

Nuestro proyecto se podría englobar dentro de la categoría de "sistemas de administración de contenido" por lo que la opción de usar MongoDB es la más atractiva.

## Database as a Service

Tal y como podíamos ver en los criterios de aceptación, la idea de disponer de nuestra base de datos de forma independiente al proyecto puede ser una interesante forma de aislar los datos que almacenamos de la aplicación en sí. Consiguiendo de esta forma tener la seguridad de que los datos nunca se verán alterados por posibles despliegues fallidos o eliminaciones de recursos inesperados dentro del sistema *Cloud*.

Para solucionar esta cuestión disponemos de *DBaaS*(Database as a service). Con este término nos referimos a la ejecución y gestión de las bases de datos alojadas dentro de la infraestructura del proveedor de servicios. Normalmente también se refiere a un servicio de pago por uso que permite el acceso *on demand* a los ficheros, consiguiendo tanto reducción de costes como escalabilidad conforme a las necesidades.

Las razones que podemos encontrar para usar un DBaaS respecto a otras soluciones, como por ejemplo, provisionar, orquestar y desplegar tu propio sistema de base de datos, puede ser extensa, por lo que vamos a enumerar y comentar las que consideramos relevantes:
- Backups, normalmente diarios. Además de sencillas restauraciones de los datos.
- Automatización en la nube: Aprovisionamiento bajo demanda, escalado sin interrupciones y alta disponibilidad.
- Herramientas de monitorio, visibles desde gráficos y alertas personalizables.
- Alta seguridad, por lo general haciendo uso de SSL, además de *firewalls* personalizados.

## Elección final

Después del análisis presente añadir que el mismo *MongoDB* dispone de su solución *DBaaS*, denominada *Atlas*, pero en nuestro caso usaremos [mLab](https://mlab.com/). La decisión se basa principalmente por la facilidad de su configuración tanto a la hora de crear una base de datos en su sistema como de conectar con ella desde el código. Además dispone de una versión gratuita.


- [Fuente](https://www.oracle.com/ar/database/what-is-a-relational-database/)
- [Fuente](https://docs.microsoft.com/es-es/azure/architecture/data-guide/big-data/non-relational-data)
- [Fuente](https://aws.amazon.com/es/nosql/)
- [Fuente](https://www.mongodb.com/cloud-database)
- [Fuente](https://apser.es/dbaas-base-de-datos-en-la-nube/)


