# Integración Continua

## ¿Qué es?

La integración continua es una práctica de desarrollo de software mediante la cual los desarrolladores combinan los cambios en el código en un repositorio central de forma periódica, tras lo cual se ejecutan versiones y pruebas automáticas. La integración continua se refiere en su mayoría a la fase de creación o integración del proceso de publicación de software. 

Los objetivos clave de la integración continua consisten en encontrar y arreglar errores con mayor rapidez, mejorar la calidad del software y reducir el tiempo que se tarda en validar y publicar nuevas actualizaciones de software. Por tanto, con la integración continua, los desarrolladores envían los cambios de forma periódica a un repositorio compartido con un sistema de control de versiones como *Git*. 

[Fuente](https://aws.amazon.com/es/devops/continuous-integration/)

## ¿Qué me aporta?

Es importante destacar los beneficios que aportan las herramientas de este tipo y que además justifican la necesidad de su uso en cualquier proyecto software moderno.

- Detectan rápidamente posibles errores de compilación o de instalación.
- Detectan funcionamientos anómalos en el software, gracias a la realización de pruebas más frecuentes.
- Mejora de la productividad de desarrollo, ya que libera a los desarrolladores de ciertas tareas manuales.
- Mejora la calidad de nuestro producto.
- Entrega de actualizaciones con mayor rapidez y frecuencia.

- [Fuente](https://aws.amazon.com/es/devops/continuous-integration/)
- [Fuente](https://www.campusmvp.es/recursos/post/integracion-continua-que-es-y-por-que-deberias-aprender-a-utilizarla-cuanto-antes.aspx)

## Criterios de aceptación

Una vez presentado que es la integración continua es el momento de mencionar los diferentes criterios definidos en las historias de usuario que consideramos de especial relevancia para la elección de una herramienta u otra del mercado:

- Integración con *Github*.
- La herramienta de integración podrá lanzar y verificar que los tests se pasan correctamente.
- La herramienta nos permitirá desplegar automáticamente en el sistema *Cloud* elegido.
- Los tests deben poder realizarse en cada microservicio de forma independiente.
- El coste de administración y uso de la herramienta deberá ser sencillo.
- Debe tener un plan gratuito.
- Debe tener soporte para hacer uso de *Docker*.
- Debe tener una interfaz de usuario.
- Debe soportar notificaciones por correo.
- *Open source*.

## Elección final

La oferta en cuanto a herramientas de integración continua podemos decir que es amplia, siendo los más populares Jenkins, Circle CI y TravisCI. Si bien todos cumplen en gran medida los requisitos planteados, en nuestro caso nos hemos decantado por TravisCI.

En el caso de Jenkins, el que seguramente sea el más completo, tiene una curva de aprendizaje alta y además hace uso de un archivo de configuración propio (Jenkinsfile, no yml), lo que hace aún más complejo el adaptarse a la herramienta. CircleCI es otra gran opción y bastante potente en cuanto al despliegue posterior de los cambios (*continuous delivery*). 

Pero como hemos dicho, en nuestro caso nos hemos decidido por TravisCI. Su gran apuesta por el software libre es importante además de la facilidad tanto en su uso como en su configuración. Como característica interesante podemos comentar que nos permite testear diferentes versiones de los lenguajes y paquetes. Como último detalle, TravisCI nos permite ejecutar *scripts* una vez que los tests hayan finalizado con éxito, lo que puede ser de utilidad tanto para desplegar los cambios en sistemas *Cloud* como por ejemplo en *Docker*, entre otros.

- [Fuente](https://dzone.com/articles/maze-of-continuous-integration-engines)
- [Fuente](https://www.katalon.com/resources-center/blog/ci-cd-tools/)
- [Fuente](https://djangostars.com/blog/continuous-integration-circleci-vs-travisci-vs-jenkins/)
