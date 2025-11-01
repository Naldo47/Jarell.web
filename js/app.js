(function(){
    const listElements = document.querySelectorAll(' .menu_item--show');
    const list = document.querySelector('.menu_links');
    const menu = document.querySelector('.menu_hamburger');

    const addClick = ()=>{
       listElements.forEach( element =>{
       element.addEventListener('click', ()=>{

       let subMenu = element.children[1];
       let height = 0;
       element.classList.toggle('menu_item--active');


        if(subMenu.clientHeight === 0){
            height = subMenu.scrollHeight;
        }

        subMenu.style.height = `${height}px`;
        
       });
    });

    }

        const deleteStyleHeight = ()=>{
            listElements.forEach(element=>{
                
                if(element.children[1].getAttribute('style')){
                    element.children[1].removeAttribute('style');
                    element.classList.remove('menu_item--active');
                }    
            });
        }
 

        window.addEventListener('resize', ()=>{
            if (window.innerWidth > 800) {
                deleteStyleHeight();
                if(list.classList.contains('menu_links--show'))
                    list.classList.remove('menu_links--show');
                
            }else{
                addClick();
            }
        });

        if(window.innerWidth <= 800) {
            addClick();
        }

       menu.addEventListener('click', ()=> list.classList.toggle('menu_links--show'));

})();

// Slideshow con fade usando clases (más suave y fiable)
(function() {
  const slides = document.querySelectorAll('.slide');
  if (!slides.length) return;

  let idx = 0;
  const show = (i) => {
    slides.forEach((s, j) => {
      s.classList.toggle('is-active', j === i);
    });
  };

  show(idx); // mostrar el primero

  // auto-play
  const delay = 4500; // ms por cada slide
  setInterval(() => {
    idx = (idx + 1) % slides.length;
    show(idx);
  }, delay);
})();



