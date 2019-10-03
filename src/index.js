

const $app = document.getElementById('app');
const $observe = document.getElementById('observe');
const API = 'https://rickandmortyapi.com/api/character/';
//const API = 'https://us-central1-escuelajs-api.cloudfunctions.net/charecters/';

load = localStorage.clear();

load;



const getData = api => {
  fetch(api)
    .then(response => response.json())
    .then(response => {
      //debugger
      const characters = response.results;
      let localS = this.localStorage.setItem('next_fetch',response.info.next);
      let output = characters.map(character => {
        return `
      <article class="Card">
        <img src="${character.image}" />
        <h2>${character.name}<span>${character.species}</span></h2>
      </article>
    `
      }).join('');
      let newItem = document.createElement('section');
      newItem.classList.add('Items');
      newItem.innerHTML = output;
      $app.appendChild(newItem);
    })
    .catch(error => console.log(error));
}

//const loadData = (next='') => {
//  if (next===''){
//    getData(API);
//  }else{
//    getData(next);
//  }  
//}

async function loadData(next ='') {
   let url = ''
    if (next===''){

      url = API;
     

    }else{ 
      url= next;
    }
   try{
    let response = await getData(url);
   } catch(error){
      error => console.log(`Error al procesas petición ${error}`)
   }
   
}

const intersectionObserver = new IntersectionObserver(entries => {
  if (entries[0].isIntersecting) {
    //debugger

      if (!this.localStorage.key('next_fetch')){
        loadData();
      }else{
        if (this.localStorage.getItem('next_fetch')===''){
           intersectionObserver.clear;
           return alert('Ya no hay personajes...');
        }else
        {
          loadData(this.localStorage.getItem('next_fetch'))
          
        }

        
      }
  
    
  }
}, {
  rootMargin: '0px 0px 100% 0px',
});

intersectionObserver.observe($observe);
