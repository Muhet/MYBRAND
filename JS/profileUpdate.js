
const form = document.querySelector(".form_EditProfile");
const updateProf = async (id) => {
    const res = await fetch('http://localhost:3000/users')
    
    const profileItems = await res.json();
    form.last_name.value = profileItems.lastName;
    form.first_name.value = profileItems.firstName;
    form.phone.value = profileItems.phone;
    form.password.value = profileItems.password;
    form.email.value = profileItems.username;
    form.location.value = profileItems.address;
}
updateProf();


const updatingPost = async () => {

    const post = {
        lastName: form.last_name.value,
        firstName: form.first_name.value,
        phone: form.phone.value,
        password: form.password.value,
        username: form.email.value,
        address: form.location.value,

    }

    const response = await fetch(`http://localhost:3000/profileUpdate/1`, {
        method: "PUT",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(post),

    });
    alert("Your blog has been Updated successfully!!!!")
}

if (newForm != null) {
    newForm.addEventListener("submit", (e) => {
        e.preventDefault();
        updatingPost();
    })
}
