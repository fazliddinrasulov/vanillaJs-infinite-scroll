const imageContainer= document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0; 
let photosArray = [];



//Unsplash API
const count = 5;
const apiKey = '3vGKwL_MFZMCF47GH-HLZUwL7IT0Fqwm4yweZKLZdX0';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;


//Check if all images were loades
function imageLoaded(){
    imageLoaded++;
    if(imagesLoaded === totalImages){
        ready = true;
        loader.hidden = true;
        count = 30;
    }
}

//Create elements for links & photos, add to DOM
function displayPhotos(){
    imagesLoaded = 0;
    totalImages = photosArray.length;
    //Run function for each object in photosArray
    photosArray.forEach((photo)=>{
        //Creating <a> to link to Unsplash
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank');
        // Create <img> for photo
        const img = document.createElement('img');
        img.setAttribute('src', photo.urls.regular);
        img.setAttribute('alt', photo.alt_decription);
        img.setAttribute('title', photo.alt_decription);

        //Event Listerner, check when each is finished loading
        img.addEventListener('load', imageLoaded);

        //Put <img> inside <a>, then put both inside imageContainer element
        item.appendChild(img);
        imageContainer.appendChild(item);
    });
}

document.getElementById('image').setAttribute('src', 'https//image.com');


//Get photos from Unsplash API
async function getPhotos(){
    try{
        const respone = await fetch(apiUrl);
        photosArray = await respone.json();
        displayPhotos();
    }catch(error){
        //Catch error here
    }
} 

// Check to see if scrolling near bottom of page, load more photos
window.addEventListener('scroll', ()=>{
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready){
        ready = false;
        getPhotos();
    }
});

// On Load
getPhotos();