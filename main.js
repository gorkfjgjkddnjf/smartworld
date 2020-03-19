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