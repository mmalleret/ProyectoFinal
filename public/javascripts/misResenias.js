window.addEventListener("load", function(){
    let botonesDetalle = document.querySelectorAll('.detalle');
    for (let i = 0; i < botonesDetalle.length; i++) {
        botonesDetalle[i].onclick = function (){
            let idPelicula = this.getAttribute('idpelicula')
            abrirModalDePeli(idPelicula)
            .then(function(){
                let element = document.querySelector('#modal-example')
                UIkit.modal(element).show();
            })
        }
        
    }
})
async function abrirModalDePeli (idDePeli) {
    id = idDePeli
    let datos = await fetch("https://api.themoviedb.org/3/movie/" + id + "?api_key=9fe1abda2acd785b6fc8d949de634904&language=en-US&page=1")
  
    pelicula = await datos.json()
    console.log("----------")
    console.log(pelicula)
    console.log("----------")
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
  }
  