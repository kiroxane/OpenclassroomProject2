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

  const modal_Overlay_2=document.querySelector("#modal-overlay-2")
  const add_Img=document.querySelector("#btn-add-photo")
  add_Img.addEventListener("click",(event)=>{
    modal_Overlay.style.display = "none"
    modal_Overlay_2.style.display = "flex"
  })

  const close_Modale_2=document.querySelector(".close-modal-2")
  close_Modale_2.addEventListener("click",(event)=>{
   modal_Overlay_2.style.display = "none"
  })
      const back_modal_Overlay=document.querySelector("#back")
      back_modal_Overlay.addEventListener("click",(event)=>{
      modal_Overlay_2.style.display = "none"
      modal_Overlay.style.display = "flex"
  })

  const imageUpload = document.querySelector("#image-upload")
  const uploadBox = document.querySelector(".upload-box")
  imageUpload.addEventListener("change", function(){
    const file = imageUpload.files[0]
    if(file){
      const reader = new FileReader()
      reader.onload = function(e){
        uploadBox.innerHTML = ""
        uploadBox.style.padding = "0"
        uploadBox.appendChild(imageUpload)
        const preview = document.createElement("img")
        preview.src = e.target.result
        preview.style.maxWidth = "100%"
        preview.style.maxHeight = "169px"
        preview.style.objectFit = "contain"
        uploadBox.appendChild(preview)
      }
      reader.readAsDataURL(file)
    }
  })

  const submitBtn = document.querySelector(".submit-btn")
  const workTitle = document.querySelector("#work-title")
  const categorySelect = document.querySelector("#category")

  function checkForm(){
    if(imageUpload.files.length > 0 && workTitle.value.trim() !== "" && categorySelect.value !== ""){
      submitBtn.style.background = "#1D6154"
    } else {
      submitBtn.style.background = "#A7A7A7"
    }
  }

  imageUpload.addEventListener("change", checkForm)
  workTitle.addEventListener("input", checkForm)
  categorySelect.addEventListener("change", checkForm)

  const form = document.querySelector(".photo-form")
   form.addEventListener('submit',(event)=>{

    event.preventDefault()

   const formData = new FormData()
      formData.append("image", imageUpload.files[0])
      formData.append("title", document.querySelector('#work-title').value)
      formData.append("category", document.querySelector('#category').value)

  fetch("http://localhost:5678/api/works",{
    method:"POST",

    headers:{"Authorization": "Bearer " + token},

    body:formData
    })
    .then(function(response){
        return response.json(); })

        .then(function(newWork){
            allWorks.push(newWork)
            displayWorks(allWorks)

            modal_Overlay_2.style.display = "none"
            })


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
 i.addEventListener("click",(event)=>{
    fetch("http://localhost:5678/api/works/" + work.id,{
      method:"DELETE",
      headers:{"Authorization": "Bearer " + token}
    })
    .then(function(response){
      if(response.ok){
        figure.remove()
        allWorks = allWorks.filter(function(w){ return w.id !== work.id })
        displayWorks(allWorks)
      }
    })
 });

 figure.appendChild(image)
 figure.appendChild(i)
 modal_Gallery.appendChild(figure)

 })
}
