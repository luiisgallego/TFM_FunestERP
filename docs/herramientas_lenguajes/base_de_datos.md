# Base de datos

(Pequeña introducción...)

Nos adentramos en el análisis de ese "almacén" que nos permitirá guardar la diferente información que se usará en cada microservicio. Pieza importante de muchas aplicaciones web, en nuestro caso se vuelve esencial.

Hasta ahora estábamos acostumbrados a utilizar bases de datos SQL como MySQL o Oracle por ejemplo, pero desde hace unos años han tomado especial relevancia las denominadas NoSQL, las cuales presentan un importante número de características tanto interesantes como útiles, lo que hace de la elección del tipo de base de datos un verdadero reto.

Por tanto en la presente sección trataremos de introducir ambos tipos, centrándonos en las características de ambas, y elegiremos la que mejor se adapte a nuestras necesidades.

Antes de comenzar es interesante exponer los criterios de aceptación marcados en la historia de usuario, los cuales debemos de tener presentes en todo el proceso de elección. Son los siguientes:
- La base de datos nos debe permitir un crear un esquema flexible. Es decir, debemos poder trabajar con datos no estructurados o semiestructurados.
- La base de datos debe usar un modelo de datos eficiente e intuitivo, como puede ser *Json* por ejemplo.
- Sería ideal trabajar en una versión Cloud de la base de datos elegida.
- No debe generar cuellos de botella.
- Nos debe proporcionar buena escalabilidad.
- Debemos de poder usar tanto una versión para los tests como otra independiente para los datos reales.

## SQL vs No-SQL

(Presentar las principales diferencias)

Una base de datos relacional (SQL) es aquella que almacena y proporciona acceso a puntos de datos relacionados entre sí. Se basan en el modelo relacional y están formadas por filas, las cuales son un registro con un ID único llamado clave y columnas, las cuales contienen los datos. 

En el caso de las bases de datos no relacionales (NoSQL) son aquellas que tienen esquemas flexibles y que usan un modelo de almacenamiento que está optimizado para los requisitos específicos del tipo de dato que se almacena. Por ejemplo, datos como pareces clave-valor o documentos Json o grafos.

Aunque la lista de características diferenciadoras entre ambos tipos puede ser extensa, vamos a presentar las que consideramos principales:

| | SQL | NoSQL |
| -- | -- | -- |
| Cargas de trabajo óptimas | Destacan para el procesamiento de transacciones online y también para el procesamiento analítico online. | Diseñadas para hacer análisis sobre datos semiestructurados. |
| Modelo de datos | Esquema estricto de tablas, filas, columnas, índices y relaciones entre tablas. | Variedad de modelos de datos como clave-valor, documentos y gráficos, optimizados para el rendimiento y escala. |
| ACID | Ofrecen propiedades de atomicidad, coherencia, aislamiento y durabilidad. | Flexibilizan las propiedades ACID para crear un modelo de datos más flexible que se pueda escalar horizontalmente. |
| Rendimiento | Se necesita la optimización de consultas, índices y estructura para lograr un máximo rendimiento. | Depende del clúster de hardware subyacente, la latencia de red y la aplicación que efectúa la llamada. |
| API | Las consultas se ajustan a un lenguaje de consultas estructurado (SQL) | Las claves de partición permiten que las aplicaciones busquen pares de clave-valor, conjuntos de columnas o documentos semiestructurados que contengan atributos y objetos de aplicación serializados. |


## Tipos de bases de datos No-SQL

(Presentar los tipos y las marcas que las usan)

## Database as a Service

(Presentar algunas ofertas y sobre todo las características del DBaaS)

## Elección final



- [Fuente](https://www.oracle.com/ar/database/what-is-a-relational-database/)
- [Fuente](https://docs.microsoft.com/es-es/azure/architecture/data-guide/big-data/non-relational-data)
- [Fuente](https://aws.amazon.com/es/nosql/)