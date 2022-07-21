const posts = [
    {
        "id": 1,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/300?image=171",
        "author": {
            "name": "Phil Mangione",
            "image": "https://unsplash.it/300/300?image=15"
        },
        "likes": 80,
        "created": "2021-06-25"
    },
    {
        "id": 2,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=112",
        "author": {
            "name": "Sofia Perlari",
            "image": "https://unsplash.it/300/300?image=10"
        },
        "likes": 120,
        "created": "2021-09-03"
    },
    {
        "id": 3,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=234",
        "author": {
            "name": "Chiara Passaro",
            "image": "https://unsplash.it/300/300?image=20"
        },
        "likes": 78,
        "created": "2021-05-15"
    },
    {
        "id": 4,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=24",
        "author": {
            "name": "Luca Formicola",
            "image": null
        },
        "likes": 56,
        "created": "2021-04-03"
    },
    {
        "id": 5,
        "content": "Placeat libero ipsa nobis ipsum quibusdam quas harum ut. Distinctio minima iusto. Ad ad maiores et sint voluptate recusandae architecto. Et nihil ullam aut alias.",
        "media": "https://unsplash.it/600/400?image=534",
        "author": {
            "name": "Alessandro Sainato",
            "image": "https://unsplash.it/300/300?image=29"
        },
        "likes": 95,
        "created": "2021-03-05"
    }
];
//richiamo la funzione creazione DOM
const containerDom = document.getElementById('container');

posts.forEach((post) =>{
    createTemplate(post);
});



const jsLikeButtonsDom = document.getElementsByClassName('js-like-button');
const likedArray = [];

//per aggiungere mi piace e nel caso toglierlo
//approccio con data attribute
for(let i = 0; i < jsLikeButtonsDom.length; i++){

    jsLikeButtonsDom[i].addEventListener('click', function (event){

        event.preventDefault();
        const postid = this.getAttribute('data-postid');
        
        //tolgo il mi piace
        if(likedArray.includes(postid)){

            this.classList.remove('like-button--liked');
            const likeCounterDom = document.getElementById('like-counter-' + postid);
            likeCounterDom.innerText = parseInt(likeCounterDom.innerText) - 1;
            
            let positionElement;

            for(let i = 0; i< likedArray.length; i++){
                if(likedArray[i] == postid){
                    positionElement = i;
                }
            }

            likedArray.splice(positionElement, 1);

        }else{//rimetto il mi piace
            this.classList.add('like-button--liked');
            const likeCounterDom = document.getElementById('like-counter-' + postid);
            likeCounterDom.innerText = parseInt(likeCounterDom.innerText) + 1;
            likedArray.push(postid);
        }

        
    });
}


//per invertire la data
function formatdate(date){

    return date.split('-').reverse().join('/');

}

//per cambiare l'immagine se non è presente
function fallbackAvatar (username){

    const nameParts = username.split(' ');

    const iniziali = nameParts.map(part => part.charAt(0).toUpperCase());

    return `<div class="profile-pic-default">${iniziali.join('')}</div>`;
}


function defaultImage(author){
    return `<img class="profile-pic" src="${author.image}" alt="${author.name}">`;
}



//creo una funzione che quando richiamata la stamperà nel DOM 
function createTemplate(post){
    containerDom.innerHTML +=    
`<div class="post">
    <div class="post__header">
        <div class="post-meta">                    
            <div class="post-meta__icon">
                ${post.author.image?defaultImage(post.author):fallbackAvatar(post.author.name)}
            </div>
            <div class="post-meta__data">
                <div class="post-meta__author">${post.author.name}</div>
                <div class="post-meta__time">${formatdate(post.created)}</div>
            </div>                    
        </div>
    </div>
    <div class="post__text">${post.content}</div>
    <div class="post__image">
        <img src=${post.media} alt="">
    </div>
    <div class="post__footer">
        <div class="likes js-likes">
            <div class="likes__cta">
                <a class="like-button  js-like-button" href="#" data-postid=${post.id}>
                    <i class="like-button__icon fas fa-thumbs-up" aria-hidden="true"></i>
                    <span class="like-button__label">Mi Piace</span>
                </a>
            </div>
            <div class="likes__counter">
                Piace a <b id="like-counter-${post.id}" class="js-likes-counter">${post.likes}</b> persone
            </div>
        </div> 
    </div>            
</div>`;
}





