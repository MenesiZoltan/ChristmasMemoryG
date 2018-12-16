function remove_flash_messages(){
    let flashes = document.querySelectorAll(".flashes");
    if(flashes.length){
      for (flash of flashes){
          flash.addEventListener("click",function(){
               let flashes = document.querySelectorAll(".flashes");
               flashes.forEach(function(element){element.remove()});
          });
      }
    }
}



function selectAllBtn() {
    let btn = document.querySelector("#selectAll");
    if(btn !== null){
        btn.addEventListener("click",function(){
            let checkboxes = document.querySelectorAll("input[type=checkbox]");
            for (checkbox of checkboxes){
                checkbox.checked = true;
            }
        })
    }
}







function init(){
    remove_flash_messages();
    selectAllBtn();
}

init();