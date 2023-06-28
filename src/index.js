import { fetchCatByBreed } from "./dog-api";
import { fetchBreeds } from "./dog-api";
import { Notify } from "notiflix";

const selected = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
catInfo.innerHTML+= '<div class = cat-info-desc></div>';
const divCatDesc = document.querySelector('.cat-info-desc');
const loader = document.querySelector('.loader');
const erroeEl = document.querySelector('.error');
const body = document.querySelector('body');
selected.style = 'position : absolute; top: 5%; left :40%';
body.style.backgroundImage = 'url(https://petkeen.com/wp-content/uploads/2021/06/Different-dogs-on-training-in-winter_Rita_Kochmarjova_Shutterstock.webp)';
body.style.backgroundSize = "cover";
divCatDesc.style.backgroundColor = 'PaleTurquoise';
divCatDesc.style.borderRadius = '15px';
catInfo.style.width = '500px'
catInfo.style = 'position : absolute; top: 10%; left :30% ';
// divCatDesc.style = 'backgroundColor : blue; width = 400px';



selected.addEventListener('change', onChange);
erroeEl.hidden = true;
fetchAndRenderBreeds()

function onChange(evt){
    evt.preventDefault();
    divCatDesc.innerHTML = '';
    const breedId = evt.currentTarget.value;
fetchCatByBreed(breedId)
.then(breed => markupDogCard(breed))
.catch(err => {console.log(err); Notify.failure('Oops! Something went wrong! Try reloading the page!')})
.finally(() => {loader.hidden = true})
}

function markupBreedOption(breeds){
    const markup = breeds.map(breed => {return `<option value = ${breed.reference_image_id}>${breed.name}</option>`}).join('');
    selected.insertAdjacentHTML('beforeend', markup)
}

function markupDogCard(breed){
const markup = `<img src="${breed.url}" alt="${breed.id}" width ='400px'><h2>${breed.breeds[0].name}</h2>
<p>Temperament: ${breed.breeds[0].temperament}</p>
<p>Life span: ${breed.breeds[0].life_span}</p>
`;
divCatDesc.insertAdjacentHTML('beforeend', markup);

}

function fetchAndRenderBreeds(){
    fetchBreeds()
    .then(breeds => markupBreedOption(breeds) )
    .catch(err => console.log(err))
 
}