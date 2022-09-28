import { galleryItems } from './gallery-items';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// console.log(galleryItems);

const listGallery = document.querySelector(`.gallery`) // возвр-т элемент (Element) док, кот-й соот-т указанному селектору

const makeListImg = createImage(galleryItems);    //викл ф-ю, робимо список картинок обращаясь из шаблона createImage к библиотеке galleryItems заполняем фактически                                              
listGallery.insertAdjacentHTML('beforeend', makeListImg); //разбирает  текст как HTML/XML и вставляет полученные узлы (nodes)  

function createImage(items) {                    //make шаблон element div //
    return items.map (({preview, original, description}) =>{    // в тегу а змінили класс і прибирали  data-source="${original}"   //
        return `
          <a class="gallery__item" 
            href="${original}">
              <img class="gallery__image" src="${preview}" alt="${description}"
          /> </a>
         </div> `;
        })
        .join(''); 
}
//onsole.log(makeListImg)
const lightbox = new SimpleLightbox(".gallery a", {
  /* options */
  captionsData: "alt",
  captionDelay: 250,
});

listGallery.addEventListener('click', onClickHandler )

