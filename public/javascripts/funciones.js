window.addEventListener("load", function(){
// trailer pelicula
    var urlParams = new URLSearchParams(window.location.search);
    var idPeliculas = urlParams.get("id");
    var urlTrailer = ""




  if (document.querySelector("#vamos") != null) {
     document.querySelector("#vamos").onclick = function() {
       var idPelicula = this.getAttribute("idpelicula")

       fetch("https://api.themoviedb.org/3/movie/" + idPelicula + "/videos?api_key=11f88aad97603b2da806d195dbb8daed&language=en-US")
       .then(function(respuesta){
         return respuesta.json()
       })
       .then (function(data){
         console.log(data);
         console.log(data.status_code);
         var trailer = data.results[0].key
         urlTrailer = '<iframe width="560" height="315" src="https://www.youtube.com/embed/'+ trailer +'" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen>'

         fetch("https://api.themoviedb.org/3/movie/" + idPelicula + "?api_key=11f88aad97603b2da806d195dbb8daed&language=en-US")
           .then(function(respuesta){
             return respuesta.json()
           })
           .then(function(pelicula){
             id = pelicula.id
             fecha = pelicula.release_date
             idioma = pelicula.original_language
             recomendadas = pelicula.genre_ids
             puntos = pelicula.vote_average
             url = pelicula.poster_path

            var arrayDeGeneros = pelicula.genres
            var generos =""
            // for (var i=0; i< arrayDeGeneros.length; i++){
            //   generos+= arrayDeGeneros[i].name + " "
            // }
             document.querySelector(".laFecha").innerHTML = '<p><i class="fas fa-clock"></i> Fecha de Estreno: '+ fecha + '</p>'
             document.querySelector(".puntosPeli").innerHTML = '<p><i class="fas fa-star"></i> Puntuación: '+ puntos + '</p>'
             document.querySelector(".iframe").innerHTML ='<div class="iframe">'+ urlTrailer + '</div>'

             if (idioma == undefined) {
               document.querySelector(".generoDe").style.display = "none"
             }
             else {
               document.querySelector(".generoDe").innerHTML = '<p class=idioma><i class="fas fa-globe"></i> Lenguaje original: '+idioma+'</p>'
             }
             var laLista = '<p class=laLista><u>Generos</u>:</p><ul class="fa-ul">'
             for (var i=0; i< arrayDeGeneros.length; i++){
                laLista += '<li class="listaDeModal"><span class="fa-li" ><i class="fas fa-ticket-alt"></i></span><a id="anchor" href="/peliculas/listado?genero='+arrayDeGeneros[i].id+'&nombre=' + arrayDeGeneros[i].name + '">' + arrayDeGeneros[i].name + '</a></li>'
             }

             laLista += '</ul>'

             document.querySelector(".laLista").innerHTML = laLista
             document.querySelector("#elVerMas").style.display = "block";
             document.querySelector("#vamos").style.display = "none";

         fetch("https://api.themoviedb.org/3/movie/"+id+"/recommendations?api_key=11f88aad97603b2da806d195dbb8daed&language=en-US&page=1")
         .then(function(respuesta){
           return respuesta.json()
         })
         .then(function(peliculas){
           var arrayDePelis = peliculas.results
           for(var i=0; i< arrayDePelis.length; i++){
             var url= arrayDePelis[i].poster_path
             var titulo =  arrayDePelis[i].title
             var id = arrayDePelis[i].id
             var resumen = arrayDePelis[i].overview
             var fecha = arrayDePelis[i].release_date
             var puntos = arrayDePelis[i].vote_average
             if (i == 0) {
               document.querySelector("#carrousel-recomendadas").innerHTML = '<li><div class="las-recomendadas"><a id="detalle" class= "posterC" posArray="' + i + '" idPelicula="' + id + '"href="#modal-example" uk-toggle><img src="https://image.tmdb.org/t/p/original'+ url+'"></a></div></li>'
              }else {
                document.querySelector("#carrousel-recomendadas").innerHTML += '<li><div class="las-recomendadas"><a id="detalle" class= "posterC" posArray="' + i + '" idPelicula="' + id + '"href="#modal-example" uk-toggle><img src="https://image.tmdb.org/t/p/original'+url+'"></a></div></li>'
              }
           }

         })
         .catch(function(error){
           console.log(error);
           return console.log("Error" + error);
         })

     })


         .catch(function(error){
           console.log(error);
           return console.log("Error" + error);
         })


       })
       .catch(function(error){
         console.log(error);
         return console.log("Error" + error);
       })



}}
//validando los datos de login//
//   var login = document.querySelector("#singIn");
//     login.onclick = function (event){
//       event.preventDefault()
//       var email = document.querySelector('input[name="inputEmail"]');
//       var nombre = document.querySelector('input[name="inputName"]');
//         if (email.value==""){
//           UIkit.notification({message: 'Dejaste el email vacio', status: 'danger'})
//         }
//         if (!validateEmail(email.value)) {
//           UIkit.notification({message: 'Eh gato, escribi un mail legal', status: 'danger'})
//         }
//         if (nombre.value=="") {
//          UIkit.notification({message: 'No completaste tu nombre', status: 'danger'})
//         }


// //si los datos son correctos, guardarlos//
//       if (nombre.value != "") {
//           document.querySelector("#botonLog").click()
//           window.localStorage.setItem("usuario", nombre.value)
//           window.sessionStorage.setItem("usuario", nombre.value)
//           mostrarInfoLogin(nombre.value)
//           //cuando me logueo debo iniciar el array donde voy a guardar las pelis preferidas
//           var arrayDePelisFavoritas = []
//           console.log(arrayDePelisFavoritas);
//           window.sessionStorage.setItem('arrayDePelisFavoritas', JSON.stringify(arrayDePelisFavoritas))
//         }
//       }
//si el campo de login ya esta completo saludar al usuario//
      // if (sessionStorage.getItem("usuario") != null) {
      // mostrarInfoLogin(sessionStorage.getItem("usuario"))
      // var usuario = "usuario"
      // }
      // function mostrarInfoLogin(nombreUsuario) {
      //   var nuevo = document.querySelector ('.nombreDeUsuario')
      //   nuevo.style.backgroundColor = "black"
      //   nuevo.innerHTML = "Bienvenido " +  nombreUsuario +" "+'<i class="fas fa-user"></i>'
      //   document.querySelector ("#botonLog").style.display = "none"
      //   document.querySelector(".favoritos").style.display = "block"
      //   document.querySelector("#elDivFav").classList.remove("display-none")
      //   document.querySelector ("div.logout").classList.remove("display-none")
      //   }
      //   document.querySelector("#botonLogOut").onclick = function() {
      //     window.sessionStorage.clear("usuario");
      //     window.location.reload()
      //   }







})

function validateEmail(email) {
  var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase());
}
