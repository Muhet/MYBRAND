const blogId = new URLSearchParams(window.location.search).get('id');
const newComForm = document.getElementById('commentForm');


newComForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const commentBody = document.querySelector("#commentBody").value;
    const data = { commentBody }
    const response = fetch(`https://excited-visor-hen.cyclic.app/api/blog/create/${blogId}/comments`,
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data)
        })
        .then((response) => {
            return response.json()

        }).then((data) => {
           
            if (response.ok) {
                Toastify({
                    text: "Sorry your comment is not sent!!",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top", 
                    position: "right",
                    stopOnFocus: true,
                    style: {
                      background:"#96c93d",
                    },
                    onClick: function(){} 
                  }).showToast();

            } else {
                Toastify({
                    text: "Thankyou for sending us you comment",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top", 
                    position: "right",
                    stopOnFocus: true,
                    style: {
                      background:"#96c93d",
                    },
                    onClick: function(){} 
                  }).showToast();
                window.location.href = "./index.html"

            }
        }).catch(error => {
            Toastify({
                text: "Server error",
                duration: 3000,
                newWindow: true,
                close: true,
                gravity: "top", 
                position: "right",
                stopOnFocus: true,
                style: {
                  background:"#96c93d",
                },
                onClick: function(){} // Callback after click
              }).showToast();
        })

});
