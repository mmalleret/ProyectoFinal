window.addEventListener("load", function(){

//guardo el arrayDePelisFavoritas que esta en session storage
 arrayDePeliFavorita= JSON.parse(window.sessionStorage.getItem("arrayDePelisFavoritas"));
//chequeo que el array tenga por lo menos una peli favorita (un item)

 if (arrayDePeliFavorita !=null && arrayDePeliFavorita.length>0){
  var urls = []
   //como arrayDePelisFavoritas es un
   //este for de aca busca todas las urls, arma en el array de urls todas juntas
  for (var i=0; i < arrayDePeliFavorita.length; i++){

  var url = "https://api.themoviedb.org/3/movie/" + arrayDePeliFavorita[i] + "?api_key=11f88aad97603b2da806d195dbb8daed&language=en-US"

  urls.push(url)


  }
//un fetch es una promesa. es algo que se va a ejecutar y nose cuando termina
//hasta que no termines de hacer todos los fetchs juntos, no vuelvas
//recibe el urls map (a cada una de las urls les haces un fetch)
  Promise.all(urls.map(function(url) {
    return fetch(url)
  }))
  //vamos a hacer otro resumen de promesas, cuando terminas de ejectutar el .json a todos no sigas
  .then(function(resp) {
    return Promise.all( resp.map(function(r) {
      return r.json()
    }))
  })
  .then(function(arrayDePelis) {
    for (var i = 0; i < arrayDePelis.length; i++) {
      var titulo =  arrayDePelis[i].title
      var poster = arrayDePelis[i].poster_path
      var id = arrayDePelis[i].id
      var resumen = arrayDePelis[i].overview
      var fecha = arrayDePelis[i].release_date
      var puntos = arrayDePelis[i].vote_average

      document.querySelector("#favs").innerHTML +='<li><div class="pelis"><a class="poster" posArray="' + i + '" idPelicula="' + id + '" href="#modal-example" uk-toggle><img src="https://image.tmdb.org/t/p/original/'+ poster +'" width= "300px" alt=""></a></div></li>'

    }

    var posters = document.querySelectorAll(".poster")

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
  });


  }
})
