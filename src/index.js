import { fetchCatByBreed } from "./dog-api";
import { fetchBreeds } from "./dog-api";

const selected = document.querySelector('.breed-select');
const catInfo = document.querySelector('.cat-info');
catInfo.innerHTML+= '<div class = cat-info-desc></div>';
const divCatDesc = document.querySelector('.cat-info-desc');
const loader = document.querySelector('.loader');
const erroeEl = document.querySelector('.error');

selected.addEventListener('change', onChange);
fetchAndRenderBreeds()

function onChange(evt){
    evt.preventDefault();
    const breedId = evt.currentTarget.value;
fetchCatByBreed(breedId)
.then(breed => markupDogCard(breed))
.catch(err => console.log(err))
}

function markupBreedOption(breeds){
    const markup = breeds.map(breed => {return `<option value = ${breed.reference_image_id}>${breed.name}</option>`}).join('');
    selected.insertAdjacentHTML('beforeend', markup)
}

function markupDogCard(breed){
const markup = `<ul><li>
<img src="${breed.image.url}" alt="${breed.id}"><h2>${breed.breeds[0].name}</h2>
<p>Temperament:${breed.breeds[0].temperament}</p>
<p>Country:${breed.breeds[0].origin}</p>
</li></ul>`;
divCatDesc.insertAdjacentHTML('beforeend', markup);

}

function fetchAndRenderBreeds(){
    fetchBreeds()
    .then(breeds => markupBreedOption(breeds) )
    .catch(err => console.log(err))
 
}