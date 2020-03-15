# TFM_FunestERP

[![Build Status](https://travis-ci.com/luiisgallego/TFM_FunestERP.svg?branch=master)](https://travis-ci.com/luiisgallego/TFM_FunestERP)

Repositorio para el TFM del Máster en Ingeniería Informática.

### Autor: Luis Gallego Quero

# Proyecto a desarrollar

Sistema cloud de gestión empresarial, concretamente para una funeraria, el cual tiene que ser capaz de organizar los diferentes servicios y controlar todo el sistema de contabilidad, correo y diferente documentación.

Para ello se desarrollará una arquitectura basada en microservicios y se podrá controlar y desarrollar toda su infraestructura haciendo uso de herramientas de integración continua y de infraestructura como código.

## Listado de apartados

- [Descripción](#descripcion)
- [Documentación](#documentacion)
- [Instalación](#instalacion)

## Descripción <a name="descripcion"></a>

Trabajo de fin de máster que tiene varios objetivos principales. Por un lado el desarrollo de un proyecto al completo, haciendo uso de herramientas actuales y de una arquitectura puntera y novedosa, además de lidiar con todos los problemas que surgen en el largo camino del desarrollo de un proyecto software al completo. Por otro lado, buscamos cubrir la necesidad de automatización y evolución que sufren las empresas hoy en día, en este caso, una PYME dedicada a los servicios funerarios.

## Documentación <a name="documentacion"></a>

Uno de los puntos más importantes en el desarrollo de un proyecto software es su documentación. Comprendida desde la investigación inicial de requisitos, herramientas y lenguajes, pasando por los diferentes diagramas y módulos que serán creados y culminando con la explicación completa de cada punto creado o desarrollado, es esencial para que en cualquier momento podemos comprender el proceso seguido en el proyecto. 

Se puede ver la documentación completa [aquí](docs/documentacion.md).

## Instalación <a name="instalacion"></a>

- Una vez clonado el repositorio, accedemos a la carpeta e instalamos las dependencias:
    ~~~~
    cd TFM_FunestERP
    npm install
    ~~~~
- Lanzamos los tests:
    ~~~
    npm test
    ~~~~
- Lanzamos la aplicación:
    ~~~
    npm start
    ~~~~

