function init(){
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

init();