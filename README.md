### WizeTalk
WizeTalk es un sistema que le otorga la oportunidad a la empresa de Wizeline de eficientizar su proceso de reclutamiento, agilizando la evaluación del nivel de inglés y conocimientos técnicos de los aplicantes en cuestión de minutos por medio del uso de las herramientas AI de Whisper y ChatGPT. 

## Instalación
Para correr el sistema de manera local es necesario clonar el repositorio empleando el comando "git clone". Posteriormente será necesario instalar los modulos empleados con el siguiente comando: 
```
npm install
```
## Correr el sistema
Una vez se hayan instalado las dependencias se debe correr el siguiente comando: 
```
npm run dev
```

## Video explicativo

En la siguiente liga pueden visualizar un video donde se exponen las funcionalidades del proyecto: 

- [Remix Docs](https://remix.run/docs)

## Ambientes de desarrollo 

El proyecto fue desplegado en AWS empleando un ambiente de desarrollo. Para la instancia web se implementó Lightsail, mientras que en la base de datos se utilizó RDS. Así mismo se empleó S3 como servicio de almacenamiento en la nube para los archivos mp4, mp3 y txt generados en el proyecto. 


### DIY

If you're familiar with deploying node applications, the built-in Remix app server is production-ready.

Make sure to deploy the output of `remix build`

- `build/`
- `public/build/`
