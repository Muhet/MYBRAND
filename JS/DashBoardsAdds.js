
const containerONE = document.querySelector("#likes_views")
fetch("https://excited-visor-hen.cyclic.app/api/project")
.then(response => response.json())
  .then(data => {
   totCount = data.data.length;
   if(totCount<10){
    totCount= "0"+totCount;
   }
    let template =`
    
    <h1>${totCount}</h1>
    `
   
    containerONE.innerHTML = template; 
  })
  .catch(error => console.error(error));
const containerTWO = document.querySelector("#comment_views")
fetch("https://excited-visor-hen.cyclic.app/api/comments")
.then(response => response.json())
  .then(data => {
   totCount = data.data.length;
   if(totCount<10){
    totCount= "0"+totCount;
   }
    let template =`
    
    <h1>${totCount}</h1>
    `
   
    containerTWO.innerHTML = template; 
  })
  .catch(error => console.error(error));
  // ############################
const containerTHREE = document.querySelector("#messaget_views")
fetch("https://excited-visor-hen.cyclic.app/api/messages")
.then(response => response.json())
  .then(data => {
   totCount = data.data.length;
   if(totCount<10){
    totCount= "0"+totCount;
   }
    let template =`
    
    <h1>${totCount}</h1>
    `
   
    containerTHREE.innerHTML = template; 
  })
  .catch(error => console.error(error));
const containerFOUR = document.querySelector("#Blog_views")
fetch("https://excited-visor-hen.cyclic.app/api/blogs")
.then(response => response.json())
  .then(data => {
   totCount = data.data.length;
   if(totCount<10){
    totCount= "0"+totCount;
   }
    let template =`
    
    <h1>${totCount}</h1>
    `
   
    containerFOUR.innerHTML = template; 
  })
  .catch(error => console.error(error));


 

