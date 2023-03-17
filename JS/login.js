
const Form=document.getElementById("Form");
const username = document.querySelector("#email");
const password = document.querySelector("#password");
const error=document.getElementById("error");
let errMessage="";  

const login = async (event)=>{
   event.preventDefault();
   const email = document.querySelector("#email").value;
   const password = document.querySelector("#password").value;

   axios.post('http://localhost:3000/api/login', { email, password })
      .then(response => {
         // Store the token in a browser cookie or local storage for future requests
         document.cookie = `token=${response.data.token}; HttpOnly`;
         if(!(email || password)){
            
            window.location.href = './login.html';
         }
         alert("Saccessfully logged!!")
         window.location.href = './admin.html';
         // Redirect the user to the protected page on the frontend
       
      })
      .catch(error => {
        alert(error.response.data.message);
      });
}

Form.addEventListener('submit', login); 

