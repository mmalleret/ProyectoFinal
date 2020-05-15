//PELICULAS POR GENERO

window.addEventListener("load",function(){
fetch("https://api.themoviedb.org/3/genre/movie/list?api_key=11f88aad97603b2da806d195dbb8daed&language=en-US")
.then(function(respuesta){
  return respuesta.json()
})
.then(function(informacion){
    console.log(informacion);
    var generos = informacion.genres

    for (var i = 0; i < generos.length; i++) {
      document.querySelector(".listado-generos").innerHTML += '<a id="ultimo" class="dropdown-item" href="/peliculas/listado?genero='+generos[i].id+'&nombre=' + generos[i].name + '">' + generos[i].name + '</a>'
    }


})

.catch(function(error){
  console.log("Error" + error)
})
})
