const formQuery = document.querySelector("#new_client_form");

formQuery.addEventListener('submit', (e) => {
    e.preventDefault();

    const names = document.querySelector("#Names").value;
    const phone = document.querySelector("#PNumber").value;
    const email = document.querySelector("#emails").value;
    const message = document.querySelector("#message").value;

    const data = { names, phone, email, message }
   const response =  fetch("http://localhost:3000/api/message/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json()
        }).then((data) => {
           
           if (response.ok) {
            Toastify({
                text: "Success!!",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "left",
                stopOnFocus: true,
                style: {
                  background: "#1AE263",
                },
                onClick: function(){} // Callback after click
              }).showToast();
            window.location.href ="./ArticleList.html"
               
            } else {
                toastr.warning(data.errors.name)
            }
        }).catch(error =>{
             Toastify({
                text: "Successfully sent!!!!",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top",
                position: "center",
                stopOnFocus: true,
                style: {
                  background: "#1AE263",
                },
                onClick: function(){} 
              }).showToast();
        })

});
