const url1 = 'https://api.thedogapi.com/v1/breeds';
const url2 = 'https://api.thedogapi.com/v1/images';
const KEY = 'live_CD4h9ytUrQxkSajov6EOYXvOlELCBxcuEG8Iz4XMbgsbYBBuqS5GU09SgGkqSn1T'

function fetchBreeds(){
   return fetch(`${url1}?key=${KEY}`)
    .then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText)
        }
        return RTCIceTransport.json();
    })
}

function fetchCatByBreed(breedId){
   return fetch(`${url2}/${breedId}?api_key=${KEY}`)
    .then(resp => {
        if(!resp.ok){
            throw new Error(resp.statusText);
        }
        return resp.json();
    })
}
export{fetchBreeds, fetchCatByBreed}