// App logic.
window.myApp = {};

document.addEventListener('init', function(event) {
  var page = event.target;

   console.log("page id:"+page.id);

   // borramos del cache
    borrar_cache();

  // Each page calls its own initialization controller.
  if (myApp.controllers.hasOwnProperty(page.id)) {
    myApp.controllers[page.id](page);
  }

 /* ************** ANTES DE LLENAR LA LISTA DEBO SACAR LOS VALORES DEL STORAGE Y ASIGNARLOS A LA LISTA #pendingTasksPage     ************************************************/

 /*
 if (localStorage.getItem("eltitulo")) {
    let recuperado= localStorage.getItem("eltitulo");
    console.log("el cache: "+recuperado);
 
    
    myApp.services.tasks.create(
    {
      title: recuperado,
     /* category: page.querySelector('#category-input').value,
        description: page.querySelector('#description-input').value,
       highlight: page.querySelector('#highlight-input').checked,
       urgent: page.querySelector('#urgent-input').checked
     }
     
  );
 }
*/
   //Ahora  obtenenos los valores almacenados localmente
            let v_titulo= localStorage.getItem("eltitulo");                 console.log("v_titulo:"+v_titulo);
            let v_categoria=localStorage.getItem("la_categoria");           console.log("v_categoria:"+v_categoria);
            let v_descripcion=localStorage.getItem("la_descripcion");       console.log("v_descripcion:"+v_descripcion);
            let v_highlight=localStorage.getItem("highlight");              console.log("v_hightlight:"+v_highlight);
            let v_urgente=localStorage.getItem("urgente");                  console.log("v_urgente:"+v_urgente);
    

          
 /* ************************************************************* */

  // Fill the lists with initial data when the pages we need are ready.
  // This only happens once at the beginning of the app.
  if (page.id === 'menuPage' || page.id === 'pendingTasksPage') {
    if (document.querySelector('#menuPage')
      && document.querySelector('#pendingTasksPage')
      && !document.querySelector('#pendingTasksPage ons-list-item')
    ) {
         myApp.services.fixtures.forEach(function(data) {
         myApp.services.tasks.create(data);
      });
    }
  }
});

// Borramos el cache
function borrar_cache(){

  
  if (localStorage.getItem("eltitulo")) {
    localStorage.removeItem("eltitulo");
    localStorage.removeItem("la_categoria");
    localStorage.removeItem("la_descripcion");
    localStorage.removeItem("highlight");
    localStorage.removeItem("urgente");
  }
  

}