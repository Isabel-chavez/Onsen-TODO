/***********************************************************************
 * App Controllers. These controllers will be called on page initialization. *
 ***********************************************************************/

myApp.controllers = {

  //////////////////////////
  // Tabbar Page Controller //
  //////////////////////////
  tabbarPage: function(page) {
    // Set button functionality to open/close the menu.
    page.querySelector('[component="button/menu"]').onclick = function() {
      document.querySelector('#mySplitter').left.toggle();
      console.log("la page;"+page);
    };

    // Set button functionality to push 'new_task.html' page.
    // Cuanso se presiona el boton new-task
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/new-task"]'), function(element) {
      element.onclick = function() {
        document.querySelector('#myNavigator').pushPage('html/new_task.html');
      };

      element.show && element.show(); // Fix ons-fab in Safari.
    });

    // Change tabbar animation depending on platform.
    page.querySelector('#myTabbar').setAttribute('animation', ons.platform.isAndroid() ? 'slide' : 'none');
  },

  ////////////////////////
  // Menu Page Controller //
  ////////////////////////
  menuPage: function(page) {
    // Set functionality for 'No Category' and 'All' default categories respectively.
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item[category-id=""]'));
    myApp.services.categories.bindOnCheckboxChange(page.querySelector('#default-category-list ons-list-item:not([category-id])'));

    // Change splitter animation depending on platform.
    document.querySelector('#mySplitter').left.setAttribute('animation', ons.platform.isAndroid() ? 'overlay' : 'reveal');
  },

  ////////////////////////////
  // New Task Page Controller //
  ////////////////////////////
  newTaskPage: function(page) {
    // Set button functionality to save a new task.
    // pone el botton ADD New task
    Array.prototype.forEach.call(page.querySelectorAll('[component="button/save-task"]'), function(element) {
      element.onclick = function() {
        // Aquí sacamos 
        var newTitle = page.querySelector('#title-input').value; console.log("title-input="+ newTitle);

        // SI EXISTE UNA NUEVA TAREA TASK SE VA A CREAR
        if (newTitle) {
          console.log("si existe una nueva tarea capturada");
            //* ***************** AQUI ES DONDE DEBE PONER EL WEBSTORAGE *******************************************************/

        
        
            // seteamos los valores del nuevo elemento
            localStorage.setItem("eltitulo", newTitle);  
            localStorage.setItem("la_categoria",page.querySelector('#category-input').value);
            localStorage.setItem("la_descripcion",page.querySelector('#description-input').value);
            localStorage.setItem("highlight",page.querySelector('#highlight-input').checked);
            localStorage.setItem("urgente",page.querySelector('#urgent-input').checked);

            //Ahora  obtenenos los valores almacenados localmente
            let v_titulo= localStorage.getItem("eltitulo");                 console.log("v_titulo:"+v_titulo);
            let v_categoria=localStorage.getItem("la_categoria");           console.log("v_categoria:"+v_categoria);
            let v_descripcion=localStorage.getItem("la_descripcion");       console.log("v_descripcion:"+v_descripcion);
            let v_highlight=localStorage.getItem("highlight");              console.log("v_hightlight:"+v_highlight);
            let v_urgente=localStorage.getItem("urgente");                  console.log("v_urgente:"+v_urgente);
    

          /*   *****************END *****************************************************************************************/


          
          // If input title is not empty, create a new task.
          // Si el input del titulo no esta vacio ENTONCES se crea la nueva tarea en ala lista
          myApp.services.tasks.create(
           /* {
              title: newTitle,
              category: page.querySelector('#category-input').value,
              description: page.querySelector('#description-input').value,
              highlight: page.querySelector('#highlight-input').checked,
              urgent: page.querySelector('#urgent-input').checked
            }
              */

            {
              title: v_titulo,
              category: v_categoria,
              description: v_descripcion,
              highlight: v_highlight,
              urgent: v_urgente
            }


          );

          // Set selected category to 'All', refresh and pop page.
          document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
          document.querySelector('#default-category-list ons-list-item').updateCategoryView();
          document.querySelector('#myNavigator').popPage();

         

        } else {
          // Show alert if the input title is empty.
          ons.notification.alert('You must provide a task title.');
        }
      };
    });
  },

  ////////////////////////////////
  // Details Task Page Controller //
  ///////////////////////////////
  detailsTaskPage: function(page) {
    // Get the element passed as argument to pushPage.
    var element = page.data.element;

    // Fill the view with the stored data.
    page.querySelector('#title-input').value = element.data.title;
    page.querySelector('#category-input').value = element.data.category;
    page.querySelector('#description-input').value = element.data.description;
    page.querySelector('#highlight-input').checked = element.data.highlight;
    page.querySelector('#urgent-input').checked = element.data.urgent;


    /* ***************AQUI DEBO SACAR LOS DATOS ALMACENDOS CON EL LOCALSTORAGE*********    */

    // if (!localStorage.getItem(URL)) {
     //  localStorage.setItem(URL, 'https://pokeapi.co/api/v2/pokemon');
    // }


    // Set button functionality to save an existing task.
    page.querySelector('[component="button/save-task"]').onclick = function() {
      var newTitle = page.querySelector('#title-input').value;

      if (newTitle) {
        // If input title is not empty, ask for confirmation before saving.
        ons.notification.confirm(
          {
            title: 'Save changes?',
            message: 'Previous data will be overwritten.',
            buttonLabels: ['Discard', 'Save']
          }
        ).then(function(buttonIndex) {
          if (buttonIndex === 1) {

             //Ahora  obtenenos los valores almacenados localmente
             let v_titulo= localStorage.getItem("eltitulo");                 console.log("v_titulo:"+v_titulo);
             let v_categoria=localStorage.getItem("la_categoria");           console.log("v_categoria:"+v_categoria);
             let v_descripcion=localStorage.getItem("la_descripcion");       console.log("v_descripcion:"+v_descripcion);
             let v_highlight=localStorage.getItem("highlight");              console.log("v_hightlight:"+v_highlight);
             let v_urgente=localStorage.getItem("urgente");                  console.log("v_urgente:"+v_urgente);
     


            // If 'Save' button was pressed, overwrite the task.
            // SI EL BOTON GRABAR FUE presionado, se sobreescribe el task
            myApp.services.tasks.update(element,
             /* {
                title: newTitle,
                category: page.querySelector('#category-input').value,
                description: page.querySelector('#description-input').value,
                ugent: element.data.urgent,
                highlight: page.querySelector('#highlight-input').checked
              } */

              {
                title: v_titulo,
                category: v_categoria,
                description: v_descripcion,
                urgent: v_urgente,
                highlight: v_highlight
              } 


            );

            // Set selected category to 'All', refresh and pop page.
            document.querySelector('#default-category-list ons-list-item ons-radio').checked = true;
            document.querySelector('#default-category-list ons-list-item').updateCategoryView();
            document.querySelector('#myNavigator').popPage();
          }
        });

      } else {
        // Show alert if the input title is empty.
        ons.notification.alert('You must provide a task title.');
      }
    };
  }
};
