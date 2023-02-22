document.querySelector(".sidebar .toggle-btn").addEventListener("click", function(){
    document.querySelector(".sidebar").classList.toggle("active")
});


function menuToggle(){
    const toggleBTN = document.querySelector("#profile");
    const divlist = document.querySelector(".menuprofile");
    toggleBTN.addEventListener('click', () =>{
        if(divlist.style.display === 'none'){
            divlist.style.display ="block";
        }else{
            divlist.style.display === 'none'; 
        }
    })
   
    
}

