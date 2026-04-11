// C'est dans ce fichier que tout le code JavaScript de la page principale sera écrit.


let allWorks=[];

function displayWorks(works){
    const gallery=document.querySelector(".gallery")  //trouve la div avec la classe gallery dans le HTML
    gallery.innerHTML="" //vide son contenu (supprime les 11 <figure> statiques)

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
fetch("http://localhost:5678/api/works") // fetch(...) → envoie une requête à l'API pour demander les projets
.then(function(response){
    return response.json();   // .then(response => response.json()) → transforme la réponse en tableau JavaScript lisible
})
.then(function(works){
    allWorks=works;
    displayWorks(works)// ← appel de la fonction
});    

fetch("http://localhost:5678/api/categories")
.then(function(response){
    return response.json();
})
.then(function(categories){
    console.log(categories);

    // Bouton "Tous"
    const filters=document.querySelector("#filters")
    const btnALl=document.createElement("button")
    btnALl.textContent="Tous"
    btnALl.dataset.id="ALl"
    filters.appendChild(btnALl)

    btnALl.addEventListener("click",function(){
        displayWorks(allWorks);
    });

    // Un bouton par catégorie
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