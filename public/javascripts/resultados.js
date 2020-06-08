window.onload = function(){
  var queryString = new URLSearchParams(window.location.search);

     var buscar = queryString.get("buscador");

     var url = "https://api.themoviedb.org/3/search/movie?api_key=9fe1abda2acd785b6fc8d949de634904&language=en-US&query="+ buscar +"&page=1&include_adult=false"

     fetch(url)

       .then(function(respuesta) {
         return respuesta.json()
       })
       .then(function(informacion) {
         console.log(informacion.results);
         var arrayDePelis = informacion.results

         for (var i = 0; i < arrayDePelis.length; i++) {
           var titulo =  arrayDePelis[i].title
           var poster = arrayDePelis[i].poster_path
           var id = arrayDePelis[i].id
           var resumen = arrayDePelis[i].overview
           var fecha = arrayDePelis[i].release_date
           var puntos = arrayDePelis[i].vote_average

           document.querySelector(".pelis").innerHTML +='<div class="pelis"><a class="poster" posArray="' + i + '" idPelicula="' + id + '" href="#modal-example" uk-toggle><img src="https://image.tmdb.org/t/p/original/'+ poster +'" width= "300px" alt=""></a></div>'

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
                  let reseniasHTML = '<div class="reseniasModal">'
                  reseniasHTML += '<ul class="reseniaDelModal">'
                  reseniasHTML += '<li><span uk-icon="commenting"></span>  " ' + resenias[i].texto_de_resenia + '"</li>'
                  reseniasHTML += '<li><span uk-icon="user"></span>  <a href="/peliculas/detalleUsuario/' + resenias[i].id_usuarios + '">' + resenias[i].Usuario.nombre + '</a></li>'
                  reseniasHTML += '<li><span class="fa fa-star checked"></span>  ' + resenias[i].puntaje + '</li>'
                  reseniasHTML += '<li> <span uk-icon="calendar"></span> ' + resenias[i].updatedAt + '</li>'
                  reseniasHTML += '</ul>'
                  reseniasHTML += '</div>'
                  document.querySelector(".reseniasPelis").innerHTML += reseniasHTML
                  }
            })
            
             document.querySelector(".el-titular").innerHTML = titulo
             document.querySelector(".el-resumen").innerHTML = resumen
             document.querySelector("#elVerMas").style.display = "none"
             //esta linea de codigo es para agregar el id de la pelicula a la ruta 
             document.querySelector(".jsBackPlis").innerHTML = '<a href="/peliculas/agregarResenia/' + id + '" > <button class= "uk-button uk-button-default" id="aniadir" > Añadir reseñas </button> </a>'
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

}
