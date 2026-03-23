// C'est dans ce fichier que tout le code JavaScript de la page principale sera écrit.

// Récupère le token stocké dans le navigateur. S'il existe, l'utilisateur est connecté.
const token=localStorage.getItem("token")
// Vérifie si le token existe (pas null)
if(token){
    let edit_Bar=document.querySelector("#edit-bar")
    edit_Bar.display="none"
    // Cible le lien "login" dans la navigation via son id
    let logout=document.querySelector('#login-1')
    // Remplace le texte "login" par "logout"
    logout.textContent="logout"
    // Écoute le clic sur ce lien
    logout.addEventListener('click',(event)=>{
    // Au clic, supprime le token du localStorage (= déconnexion)
    localStorage.removeItem("token")
    // Recharge la page (le token n'existe plus, donc on revient en mode visiteur)
     window.location.reload()
    })
}

// Crée un tableau vide qui stockera tous les projets
let allWorks=[];

// Déclare une fonction qui prend un tableau de projets en paramètre
function displayWorks(works){
    // Cible la div .gallery dans le HTML
    const gallery=document.querySelector(".gallery")
    // Vide tout le contenu HTML de la galerie
    gallery.innerHTML=""

    // Boucle sur chaque projet du tableau
    works.forEach(function(work){
        // Crée un élément <figure>
        const figure=document.createElement("figure");
        // Crée un élément <img>
        const img=document.createElement("img");
        // Crée un élément <figcaption>
        const figcaption=document.createElement("figcaption")

        // Définit la source de l'image avec l'URL du projet
        img.src= work.imageUrl;
        // Définit le texte alternatif de l'image avec le titre du projet
        img.alt= work.title;
        // Met le titre du projet dans le figcaption
        figcaption.textContent=work.title;

        // Ajoute l'image dans le figure
        figure.appendChild(img);
        // Ajoute le figcaption dans le figure
        figure.appendChild(figcaption);
        // Ajoute le figure dans la galerie
        gallery.appendChild(figure);
    });

};
// Envoie une requête GET à l'API pour récupérer les projets
fetch("http://localhost:5678/api/works")
// Convertit la réponse brute en tableau JavaScript
.then(function(response){
    return response.json();
})
.then(function(works){
    // Stocke tous les projets dans la variable globale allWorks
    allWorks=works;
    // Appelle la fonction pour afficher les projets
    displayWorks(works)
});

// Envoie une requête GET à l'API pour récupérer les catégories
fetch("http://localhost:5678/api/categories")
// Convertit la réponse en tableau JavaScript
.then(function(response){
    return response.json();
})
.then(function(categories){
    // Affiche les catégories dans la console (pour debug)
    console.log(categories);

    // Cible la div #filters dans le HTML
    const filters=document.querySelector("#filters")
    // Crée un bouton
    const btnALl=document.createElement("button")
    // Met le texte "Tous" dans le bouton
    btnALl.textContent="Tous"
    // Ajoute un attribut data-id au bouton
    btnALl.dataset.id="ALl"
    // Ajoute le bouton dans la div des filtres
    filters.appendChild(btnALl)

    // Écoute le clic sur le bouton "Tous"
    btnALl.addEventListener("click",function(){
        // Au clic, réaffiche tous les projets (sans filtre)
        displayWorks(allWorks);
    });

    // Boucle sur chaque catégorie
    categories.forEach(function(category){
        // Crée un bouton pour cette catégorie
        const btn=document.createElement("button");
        // Met le nom de la catégorie comme texte du bouton
        btn.textContent=category.name;
        // Stocke l'id de la catégorie dans le bouton (data-id)
        btn.dataset.id =category.id;
        // Ajoute le bouton dans la div des filtres
        filters.appendChild(btn);
        // Écoute le clic sur ce bouton
        btn.addEventListener("click",function() {
            // Récupère l'id stocké dans le bouton cliqué
            const id=btn.dataset.id;
            // Filtre les projets pour ne garder que ceux dont le categoryId correspond
            const filtered =allWorks.filter(function(work){
                return work.categoryId ==id;
            });
            // Affiche uniquement les projets filtrés
            displayWorks(filtered);
        })
    })
// Si une erreur survient pendant le fetch, l'affiche dans la console
}).catch(function(error){
      console.error("Erreur catégories :", error);
  });


  const title =document.querySelector('#portfolio  h2')
  const edit=document.createElement(a)
  edit.textContent="modifier"
  title.appendChild

