const token=localStorage.getItem("token")
if(token){
    
    let modal_Overlay=document.querySelector('#modal-overlay')
    let close_Modale=document.querySelector('.close-modal')
    close_Modale.addEventListener("click",(event)=>{
    modal_Overlay.style.display = "none"
   
    })
    let filters = document.querySelector("#filters")                                                                                      
    filters.style.display = "none"      
    let edit_Bar=document.querySelector("#edit-bar")
    edit_Bar.style.display="flex"
    const title =document.querySelector('#portfolio h2')
    const edit=document.createElement("a")
    title.appendChild(edit)
    edit.innerHTML = '<i class="fa-regular fa-pen-to-square"></i> modifier'
    edit.addEventListener("click",(event)=>{
        
         modal_Overlay.style.display = "flex"
         displayModalWorks()
       

         
    })
    let logout=document.querySelector('#login-1')
    logout.textContent="logout"
    logout.addEventListener('click',(event)=>{
    localStorage.removeItem("token")
     window.location.reload()
    })
}

let allWorks=[];

function displayWorks(works){
    const gallery=document.querySelector(".gallery")
    gallery.innerHTML=""

    works.forEach(function(work){
        const figure=document.createElement("figure");
        const img=document.createElement("img");
        const figcaption=document.createElement("figcaption")

        img.src= work.imageUrl;
        img.alt= work.title;
        figcaption.textContent=work.title;

        figure.appendChild(img);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);
    });

};
fetch("http://localhost:5678/api/works")
.then(function(response){
    return response.json();
})
.then(function(works){
    allWorks=works;
    displayWorks(works)
});

fetch("http://localhost:5678/api/categories")
.then(function(response){
    return response.json();
})
.then(function(categories){
    console.log(categories);

    const filters=document.querySelector("#filters")
    const btnALl=document.createElement("button")
    btnALl.textContent="Tous"
    btnALl.dataset.id="ALl"
    filters.appendChild(btnALl)

    btnALl.addEventListener("click",function(){
        displayWorks(allWorks);
    });

    categories.forEach(function(category){
        const btn=document.createElement("button");
        btn.textContent=category.name;
        btn.dataset.id =category.id;
        filters.appendChild(btn);
        btn.addEventListener("click",function() {
            const id=btn.dataset.id;
            const filtered =allWorks.filter(function(work){
                return work.categoryId ==id;
            });
            displayWorks(filtered);
        })
    })
}).catch(function(error){
      console.error("Erreur catégories :", error);
  });




function displayModalWorks(){
 const modal_Gallery=document.querySelector(".modal-gallery")
 modal_Gallery.innerHTML=""
 allWorks.forEach(function(work){
 const figure=document.createElement("figure")
 const image=document.createElement("img")
 image.src=work.imageUrl 

 const i =document.createElement('i')
 i.classList.add("fa-solid", "fa-trash-can")

 figure.appendChild(image)
 figure.appendChild(i)
 modal_Gallery.appendChild(figure)

 })
}