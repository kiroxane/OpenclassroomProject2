// Cible le formulaire de connexion via son id
const form = document.querySelector("#form-login")
// Écoute la soumission du formulaire
form.addEventListener('submit',(event)=>{
    // Empêche le rechargement de la page (comportement par défaut du formulaire)
    event.preventDefault()
    // Récupère la valeur saisie dans le champ email
    const inputemail = document.querySelector('#emailinput').value;
    // Récupère la valeur saisie dans le champ mot de passe
    const Passwordinput = document.querySelector('#Passwordinput').value;
    // Crée un objet avec les clés attendues par l'API (email et password)
    const body= {
    email:inputemail,
    password:Passwordinput}

    // Envoie une requête POST à l'API de login avec les identifiants en JSON
    fetch("http://localhost:5678/api/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)})
    // Convertit la réponse brute en objet JavaScript
    .then(function(response){
        return response.json(); })

        // Traite les données reçues de l'API
        .then(function(data){
            // Si l'API renvoie un token, la connexion a réussi
            if(data.token){
            // Stocke le token dans le localStorage du navigateur
            localStorage.setItem("token", data.token)
            // Redirige l'utilisateur vers la page d'accueil
            window.location.href="index.html"
            }
            // Si pas de token, la connexion a échoué
            else{
                // Crée un élément <p> pour afficher le message d'erreur
                let p =document.createElement('p')
                // Vérifie si un message d'erreur existe déjà sur la page
                let id= document.querySelector('#error-message')
                // S'il existe, le supprime pour éviter les doublons
                if(id){
                    id.remove()
                }
                // Donne un id au nouveau message d'erreur (pour pouvoir le retrouver)
                p.id = "error-message"
                // Définit le texte du message d'erreur
                p.textContent="Erreur dans l'identifiant ou le mot de passe"
                // Ajoute le message d'erreur dans le formulaire
                form.appendChild(p)

    }

    });

})
