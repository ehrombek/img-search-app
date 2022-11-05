// https://www.pexels.com/api/documentation/#photos-search

const auth ='563492ad6f917000010000011253baadec704769884dda887206cd80';
const next = document.querySelector('.next')
const input  = document.querySelector('input')
const searchbtn = document.querySelector('.searchbtn')

let pagener =1;
let search = false;
let query = "";
input.addEventListener('input', (e) =>{
    e.preventDefault();
    query = e.target.value;
});

async function CuratedPhotos(pagener){
    const data = await fetch(
        `https://api.pexels.com/v1/curated?per_page=25&page=${pagener}`,
        {
            method: "GET",
            headers:{
                Accept: "application/json",
                Authorization: auth,
            },
        }
    );
    const result = await data.json();
    result.photos.forEach((photo) =>{
        const pic =document.createElement("div");
        pic.innerHTML = ` <img src=${photo.src.large}>
                 <p>Photo: <span>${photo.photographer}</span> </p>
                 <a href=${photo.src.large}><i class="fa-solid fa-download"></i> Download</a>   
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}

async function SearchPhotos(query, pagener){
    const data = await fetch(
        `https://api.pexels.com/v1/search?query=${query}&per_page=15&page-${pagener}`,
        {
            method: "GET",
            headers:{
                Accept: "application/json",
                Authorization: auth,
            },
        }
    );
    const result = await data.json();
    result.photos.forEach((photo) =>{
        const pic =document.createElement("div");
        pic.innerHTML = ` <img src=${photo.src.large}>
                 <p class="switch_theme">Photo: <span>${photo.photographer}</span> </p>
                 <a href=${photo.src.large}><i class="fa-solid fa-download"></i> Download</a>   
        `;
        document.querySelector(".gallery").appendChild(pic);
    });
}

searchbtn.addEventListener('click', () =>{
    if(input.value === "") return;
    clear();
    search = true;
    SearchPhotos(query, pagener);
    pagener ++;
})

function clear(){
    input.value = "";
    document.querySelector('.gallery').innerHTML="";
    pagener -1;
}

next.addEventListener('click', ()=>{
    if(!search)
    {
        pagener++;
        CuratedPhotos(pagener)
    }else{
        if(query.value ==="") return;
        pagener ++;
        SearchPhotos(query, pagener)
    }
})
CuratedPhotos(pagener)




var switchThemeBtn = document.querySelector(".switch_btn");

var currTheme = 'light';

function switchTheme() {
    let isLigthTheme = currTheme === 'light';
    document.body.setAttribute("class", isLigthTheme ? 'dark_theme' : 'light_theme');
    currTheme = isLigthTheme ? 'dark' : 'light';
}

switchThemeBtn.addEventListener("click",()=>{
    switchTheme();
},false);