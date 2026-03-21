const form = document.querySelector("#form-login")
form.addEventListener('submit',(event)=>{
    event.preventDefault()
const inputemail = document.querySelector('#emailinput').value;
const Passwordinput = document.querySelector('#Passwordinput').value;
const body= { 
    email:inputemail,
    password:Passwordinput}

fetch("http://localhost:5678/api/users/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(body)})
.then(function(response){
    return response.json(); })





})


   




















   
