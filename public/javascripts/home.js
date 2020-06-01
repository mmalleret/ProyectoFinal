window.addEventListener("load", function(){

 //API peliculas populares//
 fetch("https://api.themoviedb.org/3/movie/popular?api_key=9fe1abda2acd785b6fc8d949de634904&language=en-US&page=1")
   .then(function (respuesta){
     return respuesta.json()
   })
   .then(function(informacion){
     console.log(informacion.results);
     var arrayDePelis = informacion.results
     for(i=0; i<12; i++){
       var url=informacion.results[i].poster_path
       console.log(url);
       var titulo =  arrayDePelis[i].title
       var id = arrayDePelis[i].id
       var resumen = arrayDePelis[i].overview
       var fecha = arrayDePelis[i].release_date
       var puntos = arrayDePelis[i].vote_average
       if (i == 0) {
         document.querySelector("#carrousel-populares").innerHTML += '<li><div class="pelis"><a id="detalle" class= "poster" posArray="' + i + '" idPelicula="' + id + '"href="#modal-example" uk-toggle><img src="https://image.tmdb.org/t/p/original'+ url+'"></a></div></li>'
        }else {
          document.querySelector("#carrousel-populares").innerHTML += '<li><div class="pelis"><a id="detalle" class= "poster" posArray="' + i + '" idPelicula="' + id + '"href="#modal-example" uk-toggle><img src="https://image.tmdb.org/t/p/original'+url+'"></a></div></li>'
        }
     }
     var posters = document.querySelectorAll(".poster")

     for (var i = 0; i < posters.length; i++) {
       posters[i].addEventListener("click", function() {
         id = this.getAttribute("idPelicula")
         pos = this.getAttribute("posArray")
         pelicula = arrayDePelis[pos]
         titulo = pelicula.title
         resumen = pelicula.overview
         
         fetch('/peliculas/resenias/' +id)
         .then(function(res){
           return res.json()
         })
         .then(function(resenias){
          console.log(resenias)
          document.querySelector(".reseniasPelis").innerHTML = ""
          for (var i = 0; i < resenias.length; i++) {
              let reseniasHTML = "<div>"
              reseniasHTML += resenias[i].texto_de_resenia
              reseniasHTML += resenias[i].puntaje
              reseniasHTML += resenias[i].updatedAt
              reseniasHTML += '<a href="/peliculas/detalleUsuario/' + resenias[i].id_usuarios + '">' + resenias[i].Usuario.nombre + '</a>'
              reseniasHTML += "</div>"
              document.querySelector(".reseniasPelis").innerHTML += reseniasHTML
              }
        })
        
         document.querySelector(".el-titular").innerHTML = titulo
         document.querySelector(".el-resumen").innerHTML = resumen
         document.querySelector("#elVerMas").style.display = "none"
         //esta linea de codigo es para agregar el id de la pelicula a la ruta 
         document.querySelector(".jsBackPlis").innerHTML = '<a href="/peliculas/agregarResenia/' + id + '" > <button class= "uk-button uk-button-default" > Añadir reseñas </button> </a>'
         document.querySelector("#vamos").style.display = "block"
         document.querySelector("#vamos").setAttribute("idPelicula", id)
         document.querySelector("#elDivFav").innerHTML ='<button class="miBoton" id="botonFavoritos" name="' + id + '"> &#9733; </button>'
         var boton = document.querySelector('#botonFavoritos')
         // document.querySelector ("#botonFavoritos").style.display= "none"
         boton.addEventListener("click", function(){
           var id = boton.name

           var arrayDePelisFavoritas = JSON.parse(window.sessionStorage.getItem("arrayDePelisFavoritas"))
           console.log(arrayDePelisFavoritas);
           //primero reviso si hay alguna peli favorita en el array
           if (arrayDePelisFavoritas.indexOf(id)===-1){
           // en este caso no es favorita
           // pusheo el id dentro del array
             arrayDePelisFavoritas.push(id)
             //guardo en session el array, como es un objeto debo transformarlo a string
             window.sessionStorage.setItem("arrayDePelisFavoritas",JSON.stringify(arrayDePelisFavoritas))
             alert("tu pelicula ha sido agregada a favoritos")
           } else{
             // esta peli ya es favorita, la saco del array
             arrayDePelisFavoritas.splice(arrayDePelisFavoritas.indexOf(id),1)
             //reemplazo el array que tenia la peli como favorita, por un array que ya no la tiene
             window.sessionStorage.setItem("arrayDePelisFavoritas",JSON.stringify(arrayDePelisFavoritas))
             alert("tu pelicula ha sido sacada de favoritos")
           }

           console.log(id);
           console.log(JSON.parse(window.sessionStorage.getItem("arrayDePelisFavoritas")))
         })

              })
     }


   })
    .catch(function(error){
      console.log("Error" + error)
   })

//API peliculas mejores rankeadas//
fetch("https://api.themoviedb.org/3/movie/top_rated?api_key=9fe1abda2acd785b6fc8d949de634904&language=en-US&page=1")
  .then(function (respuesta){
    return respuesta.json()
  })
  .then(function(informacion){
    var arrayDePelis = informacion.results
    for(i=0; i<12; i++){
      var url=informacion.results[i].poster_path
      var titulo =  arrayDePelis[i].title
      var id = arrayDePelis[i].id
      var resumen = arrayDePelis[i].overview
      var fecha = arrayDePelis[i].release_date
      var puntos = arrayDePelis[i].vote_average
    if (i == 0) {
      document.querySelector("#carrousel-puntuadas").innerHTML += '<li><div class="lasPelis"><a id="detalle" class= "posterA" posArray="' + i + '" idPelicula="' + id + '"href="#modal-example" uk-toggle><img src="https://image.tmdb.org/t/p/original'+ url+'"></div></li>'
     }else {
       document.querySelector("#carrousel-puntuadas").innerHTML += '<li><div class="lasPelis"><a id="detalle" class= "posterA" posArray="' + i + '" idPelicula="' + id + '"href="#modal-example" uk-toggle><img src="https://image.tmdb.org/t/p/original'+url+'"></div></li>'
     }
    }
    var posters = document.querySelectorAll(".posterA")

    for (var i = 0; i < posters.length; i++) {
      posters[i].addEventListener("click", function() {
        id = this.getAttribute("idPelicula")
        pos = this.getAttribute("posArray")

        pelicula = arrayDePelis[pos]
        titulo = pelicula.title
        resumen = pelicula.overview


        document.querySelector(".el-titular").innerHTML = titulo
        document.querySelector(".el-resumen").innerHTML = resumen
        document.querySelector("#elVerMas").style.display = "none"
        //esta linea de codigo es para agregar el id de la pelicula a la ruta 
        document.querySelector(".jsBackPlis").innerHTML = '<a href="/peliculas/agregarResenia/' + id + '" > <button class= "uk-button uk-button-default" > Añadir reseñas </button> </a>'
        document.querySelector("#vamos").style.display = "block"
        document.querySelector("#vamos").setAttribute("idPelicula", id)
        document.querySelector("#elDivFav").innerHTML ='<button class="miBoton" id="botonFavoritos" name="' + id+ '"> &#9733; </button>'
        var boton = document.querySelector('#botonFavoritos')
        // document.querySelector ("#botonFavoritos").style.display= "none"
        boton.addEventListener("click", function(){
          var id = boton.name

          var arrayDePelisFavoritas = JSON.parse(window.sessionStorage.getItem("arrayDePelisFavoritas"))
          console.log(arrayDePelisFavoritas);
          //primero reviso si hay alguna peli favorita en el array
          if (arrayDePelisFavoritas.indexOf(id)===-1){
          // en este caso no es favorita
          // pusheo el id dentro del array
            arrayDePelisFavoritas.push(id)
            //guardo en session el array, como es un objeto debo transformarlo a string
            window.sessionStorage.setItem("arrayDePelisFavoritas",JSON.stringify(arrayDePelisFavoritas))
            alert("tu pelicula ha sido agregada a favoritos")
          } else{
            // esta peli ya es favorita, la saco del array
            arrayDePelisFavoritas.splice(arrayDePelisFavoritas.indexOf(id),1)
            //reemplazo el array que tenia la peli como favorita, por un array que ya no la tiene
            window.sessionStorage.setItem("arrayDePelisFavoritas",JSON.stringify(arrayDePelisFavoritas))
            alert("tu pelicula ha sido sacada de favoritos")
          }

          console.log(id);
          console.log(JSON.parse(window.sessionStorage.getItem("arrayDePelisFavoritas")))
        })


      })
    }
   })
   .catch(function(error){
     console.log("Error" + error)
  })

 // //API proximos estrenos//
 fetch("https://api.themoviedb.org/3/movie/upcoming?api_key=9fe1abda2acd785b6fc8d949de634904&language=en-US&page=1")
   .then(function (respuesta){
     return respuesta.json()
   })
   .then(function(informacion){
     var arrayDePelis = informacion.results
     for(i=0; i<12; i++){
       var url=informacion.results[i].poster_path
       var titulo =  arrayDePelis[i].title
       var id = arrayDePelis[i].id
       var resumen = arrayDePelis[i].overview
       var fecha = arrayDePelis[i].release_date
       var puntos = arrayDePelis[i].vote_average

     if (i == 0) {
       document.querySelector("#carrousel-estrenos").innerHTML += '<li><div class="laEstrella"><a id="detalle" class="posterB" posArray="' + i + '" idPelicula="' + id + '"href="#modal-example" uk-toggle><img src="https://image.tmdb.org/t/p/original'+ url+'"></div></li>'
      }else {
        document.querySelector("#carrousel-estrenos").innerHTML += '<li><div class="laEstrella"><a id="detalle" class="posterB" posArray="' + i + '" idPelicula="' + id + '"href="#modal-example" uk-toggle><img src="https://image.tmdb.org/t/p/original'+url+'"></div></li>'
      }
     }
     var posters = document.querySelectorAll(".posterB")

     for (var i = 0; i < posters.length; i++) {
       posters[i].addEventListener("click", function() {
         id = this.getAttribute("idPelicula")
         pos = this.getAttribute("posArray")

         pelicula = arrayDePelis[pos]
         titulo = pelicula.title
         resumen = pelicula.overview

         document.querySelector(".el-titular").innerHTML = titulo
         document.querySelector(".el-resumen").innerHTML = resumen
         document.querySelector("#elVerMas").style.display = "none"
         //esta linea de codigo es para agregar el id de la pelicula a la ruta 
         document.querySelector(".jsBackPlis").innerHTML = '<a href="/peliculas/agregarResenia/' + id + '" > <button class= "uk-button uk-button-default" > Añadir reseñas </button> </a>'
         document.querySelector("#vamos").style.display = "block"
         document.querySelector("#vamos").setAttribute("idPelicula", id)
         document.querySelector("#elDivFav").innerHTML ='<button class="miBoton" id="botonFavoritos" name="' + id+ '"> &#9733; </button>'
         var boton = document.querySelector('#botonFavoritos')
         // document.querySelector ("#botonFavoritos").style.display= "none"
         boton.addEventListener("click", function(){
           var id = boton.name

           var arrayDePelisFavoritas = JSON.parse(window.sessionStorage.getItem("arrayDePelisFavoritas"))
           console.log(arrayDePelisFavoritas);
           //primero reviso si hay alguna peli favorita en el array
           if (arrayDePelisFavoritas.indexOf(id)===-1){
           // en este caso no es favorita
           // pusheo el id dentro del array
             arrayDePelisFavoritas.push(id)
             //guardo en session el array, como es un objeto debo transformarlo a string
             window.sessionStorage.setItem("arrayDePelisFavoritas",JSON.stringify(arrayDePelisFavoritas))
             alert("tu pelicula ha sido agregada a favoritos")
           } else{
             // esta peli ya es favorita, la saco del array
             arrayDePelisFavoritas.splice(arrayDePelisFavoritas.indexOf(id),1)
             //reemplazo el array que tenia la peli como favorita, por un array que ya no la tiene
             window.sessionStorage.setItem("arrayDePelisFavoritas",JSON.stringify(arrayDePelisFavoritas))
             alert("tu pelicula ha sido sacada de favoritos")
           }

           console.log(id);
           console.log(JSON.parse(window.sessionStorage.getItem("arrayDePelisFavoritas")))
         })
       })
       }
     })
    .catch(function(error){
      console.log("Error" + error)
   })



})

