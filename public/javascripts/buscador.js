window.addEventListener("load", function(){
// boton de busqueda//

document.querySelector(".form-buscar").onsubmit = function(e) {
  var buscadorInput = document.querySelector("#buscador")
  if (buscadorInput.value.length < 3) {
    e.preventDefault()
    document.querySelector(".alert-light").style.display = "block"
    setTimeout(function() {
      document.querySelector(".alert-light").style.display = "none"
    },3000)
  }}


})
