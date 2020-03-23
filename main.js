(function(){
    
    function backToTop(){
        if(window.pageYOffset > 0){
            window.scrollBy(0, -15);
            setTimeout(backToTop, 0);
        }
    }
    let btnToTop = document.querySelector('.to-top');

    btnToTop.addEventListener('click', backToTop);
})();

(function(){

    function backToDown(){
        let match = Math.ceil(window.pageYOffset + document.documentElement.clientHeight);
  
        if (match != document.documentElement.scrollHeight) {
          window.scrollBy(0, 15);
          setTimeout(backToDown, 0);
        } 
    }
    let btnToDown = document.querySelector('.to-down');

    btnToDown.addEventListener('click', backToDown);
})();

