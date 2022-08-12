# b-news

# Endpoints

```js
[GET] /live Retorna informacion del servidor, principalmente para saber si esta encendido o no

[POST] /feed Recibe un objeto con la informacion para crear un Feed #ejemplo mas abajo

[GET] /feed/:oid Recibe en la url un ObjectId del Feed que desea retornar

[PUT] /feed/:oid Recibe en la url un ObectId del Feed que desea modificar y en el body el campo que desea modificar

[DELETE] /feed/:oid Recibe en la url un ObjectId del Feed que desea eliminar

[POST] /generateDaily Ejecuta la busqueda de noticias de hoy y las retorna y añade en la base de datos
```

# Ejemplo Feed
```js
FEED = {
  source: "[urlNoticia]",
  title: "Titulo", // campo unico
  body: "Descripcion",
  image: "[urlImagen]",
  publisher: "[urlPagina]" // https://www.elmundo.es//
}
```

## DB
Debe existir la base de datos `news` la cual creara la coleccion Feeds