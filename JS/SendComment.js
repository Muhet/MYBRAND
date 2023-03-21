const blogId = new URLSearchParams(window.location.search).get('id');
const newComForm = document.getElementById('commentForm');


newComForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const commentBody = document.querySelector("#commentBody").value;
    const data = { commentBody}
    console.log("+++++++++++++give data=============")
        console.log(JSON.stringify(data))
        console.log("+++++++++++++give data=============")
    const response = fetch(`http://localhost:3000/api/blog/create/${blogId}/comments`,
        {
            method: "POST",
             headers: {
                "Content-Type":"application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json()
         
        }).then((data) => {
            console.log(response)
           if (response.ok) {
            window.location.href="./index.html"
          
            console.log(JSON.stringify(data))
           
            } else {
              
                console.log(JSON.stringify(data))
               
            }
        }).catch(error => {
            
            console.log(error)
        })

});
