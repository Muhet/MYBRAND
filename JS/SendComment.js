const blogId = new URLSearchParams(window.location.search).get('id');
const newComForm = document.getElementById('commentForm');


newComForm.addEventListener('submit', (event) => {
    event.preventDefault();
    const commentBody = document.querySelector("#commentBody").value;
    const data = { commentBody }
    const response = fetch(`http://localhost:3000/api/blog/create/${blogId}/comments`,
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
                        background: "#24BDF6",
                    },
                    onClick: function () { }
                }).showToast();

            } else {
                Toastify({
                    text: "Thank you for sending us you comment",
                    duration: 3000,
                    newWindow: true,
                    close: true,
                    gravity: "top",
                    position: "right",
                    stopOnFocus: true,
                    style: {
                        background: "#67DD59",
                    },
                    onClick: function () { }
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
                    background: "#FA2525",
                },
                onClick: function () { } // Callback after click
            }).showToast();
        })

});
