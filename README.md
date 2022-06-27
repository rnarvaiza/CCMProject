# CCMProject



## Inicio

http://rnarvaiza.click

Este proyecto recoge tres soluciones para el blog del CCM (asociación de Cerveceros Caseros Malagueños).
El objetivo es proporcionar un espacio en el que poder intercambiar nuestras recetas. Con la finalidad de replicarlas, se pretende ofrecer un sistema que busque los ingredientes de las recetas y los almacene para en un futuro poder tratarlos.


## Soluciones en el proyecto

CCMBlogApi
CCMBlogFront
CCMScraper


## Requisitos de software

```

sudo apt update
sudo apt install nodejs npm

```

### CCMBlogApi

```
cd $/CCMBlogApi
npm install
node index.js

```

### CCMBlogFront

```
cd $/CCMBlogFront
npm start

```

### CCMBlogApi

```
cd $/CCMScraper
node scraper.js

```

- [ ] CCMBlogApi
- [ ] CCMBlogFront
- [ ] CCMBlogApi



## Integrar con cada entorno

### CCMBlogAPI

Es necesario declarar en el .env la variable de entorno para conectarse a mongoDB.
Para ello, la forma mas sencilla es desde la propia web de mongoDB, crear una cuenta gratuita e instanciar una base de datos compartida.


### CCMBlogFront

Es necesario declarar en el .env la variable de entorno para conectarse a la API rest de express
Es necesario declarar también las credenciales de firebase para estar autorizados a subir imagenes

### CCMScraper

Es necesario declarar la ruta de la API rest de express


# IMPORTANTE

Los archivos .env, como tal, estan ocultos. La ruta es CCMProject/Config/env/api y CCMProject/Config/env/front. Dentro se encuentran los archivos ocultos con las variables de entorno.

Los datos de acceso al VPS se encuentran en la memoria.

La web y la API están accesibles desde http://rnarvaiza.click

Para poder probar las rutas, queda en la ruta CCMProject/Config/Postman/ una colección de peticiones.


