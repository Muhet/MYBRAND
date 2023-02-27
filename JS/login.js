
const Form=document.getElementById("Form");
const username = document.querySelector("#email");
const password = document.querySelector("#password");
const error=document.getElementById("error");
let errMessage="";  

const login = async (e)=>{
   e.preventDefault();
const res = await fetch(`http://localhost:3000/profileUpdate`);
let Items = await res.json();

   Items.forEach(user=>{
  
    if(user.username == username.value && user.password == password.value){
        alert("Login success!!  WELCOME")
       window.location.replace('Admin.html');
    }else{
        alert("User Name or Password Incorrect")
        window.location.replace('index.html');
    }
   })



}

Form.addEventListener('submit', login); 

