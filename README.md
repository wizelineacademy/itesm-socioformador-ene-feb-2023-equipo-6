### WizeTalk
WizeTalk es un sistema que le otorga la oportunidad a la empresa de Wizeline de eficientizar su proceso de reclutamiento, agilizando la evaluación del nivel de inglés y conocimientos técnicos de los aplicantes en cuestión de minutos por medio del uso de las herramientas AI de Whisper y ChatGPT. 

## Stack
- Deployment [Lightsail](https://aws.amazon.com/es/lightsail/)
- Database deployment [RDS](https://aws.amazon.com/es/rds/)
- Database [Postgres](https://www.postgresql.org/)
- ORM [Prisma](https://www.prisma.io/)
- API [gpt-3.5-turbo](https://platform.openai.com/docs/guides/gpt)
- API [Whisper](https://platform.openai.com/docs/guides/speech-to-text)
- Testing [Cypress](https://www.cypress.io/)
- Code formatiting [Prettier](https://prettier.io/)
- Framework [Remix](https://remix.run/)

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

## Video prueba

En la siguiente liga pueden visualizar un video donde se exponen las funcionalidades del proyecto: 

- [WizeTalk video](https://youtu.be/RE-gCAjyXK8)

## Ambientes de desarrollo 

El proyecto fue desplegado en AWS empleando un ambiente de desarrollo. Para la instancia web se implementó Lightsail, mientras que en la base de datos se utilizó RDS. Así mismo se empleó S3 como servicio de almacenamiento en la nube para los archivos mp4, mp3 y txt generados en el proyecto. 


### Integrantes del equipo
- Santiago Ortiz
- Diego Bugarin
- Hugo Palomares
- Edgar Castillo
