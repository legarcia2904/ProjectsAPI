# ProjectsAPI

## Introducción

ProjectsAPI es un API REST, que facilita la gestión de proyectos de Investigación, Desarrollo e innovación (I+D+i) entre las empresas y el Consejo Nacional de Ciencia y Tecnología (CONACYT). Las empresas, las universidades y los centros de investigación CONACYT podrán acceder a las siguientes funcionalidades: gestionar proyectos I+D+i, suscribirse como colaborador a un proyecto. 

## Características

Permite a los desarrolladores crear aplicaciones web para gestionar proyectos de I+D+i. Los principales recursos que se pueden gestionar a través de ProjectsAPI son /proyectos y /colaboradores. Utiliza los códigos de error clásicos de HTML. Utiliza el formato JSON para el intercambio de información. Proporciona un mecanismo de filtro o consulta de selección de resultados. /proyectos/?colaborador=:id&area_conocimiento=[":id", ":id"]. Está implementado utilizando NodeJS, ExpressJS y MongoDB.

## Pasos para utilizar ProjectsAPI

// Descargar el proyecto desde https://github.com/legarcia2904/ProjectsAPI.git
git clone

// Instalar dependencias
npm install

// Para conectarse la Base de datos Mongo DB debe estar ejecutandose
mongod.exe
mongo.exe

// Ejecutar la aplicación
npm start

# Documentación del API:
https://documenter.getpostman.com/view/2966984/projectapi/7ED8t7u