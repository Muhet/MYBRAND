const url = "https://excited-visor-hen.cyclic.app/api/"
const send_message = async () => {
    const QueryForm = document.querySelector("#new_client_form");
    const names = document.querySelector("#Names").value;
    const phone= document.querySelector("#PNumber").value;
    const email = document.querySelector("#emails").value;
    const message = document.querySelector("#message").value;
        console.log(QueryForm)
    try {
        const res = await fetch(`${url}/project/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                names,
                phone,
                email,
                message,
            }),
        });
        if(response.ok){
            QueryForm.reset();
            toastr.success("Your project has been saved successfully!!");
        }
        toastr.info("Something is wrong your project is not saved!!!")
    } catch (error) {
        toastr.error("OOPS there is problem try again later!!");
    }

}
send_message();


/* RETRIEVING DATA FROM DATABASE */
/*==========ON ADMIN SIDE========== */
const ViewMessages = async () => {
    const List_container = document.getElementById('Message');
    await fetch(`${URL}/messages`)
        .then((response) => response.json())
        .then((messages) => {
            console.log(messages.data.length)
            let myTemp = "";
            messages.data.forEach((message) => {
                myTemp += `
            <div class="table_row">
            <div class="table_cell first_cell">
                <p>${message._id.slice(6, 8)}</p>
            </div>
            <div class="table_cell">
                <p>${message.phone}</p>
            </div>
            <div class="table_cell">
                <p>${message.email}</p>
            </div>
            <div class="table_cell">
                <p>${message.createdAt}</p>
            </div>
            <div class="table_cell">
                <div class="actionIcons last_cell">
                <a href="start.html?id=">
                <img src="../images/ViewsIcon.png" alt="" id="editIcon"" onclick="renderMess()"/></a>
                    <img src="../images/Delete.png" alt="" id="deleteIcon" onClick="deleteMessage('${message._id}');"/>
                </div>
            </div>
        </div>
        `

            })

            List_container.innerHTML = myTemp;
        })

}
ViewMessages();

const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('#might');
const renderMess = async () => {
    const response = await fetch(`${URL}/messages/` + id);
    const item = await response.json();

    template = `

    <div class="messageCards">
    <div class="info">
    <img src="../images/avatarTwo.png" alt="" id="profile"/>
        <h2>${item.Names}</h2>
        <h3>${item.Emails}</h3>
        <h4>${item.Phone}</h4>
    </div>
   <div class="message">
    <p>${item.T_Message}</p>
    <span>sent on: ${item.date}</span>
   </div>
   <button class="replyMessage">reply</button>
</div>
    `
    container.innerHTML = template;
}

renderMess();

const ViewallMessages = async () => {
    const res = await fetch(`${URL}/messages`);
    const newMes = await res.json();
    const containerMess = document.querySelector(".messageContainer");
    let temp = "";
    newMes.forEach((mess) => {
        temp += `
        <div class="messageCards">
        <div class="info">
        <img src="../images/avatarTwo.png" alt="" id="profile"/>
            <h2>${mess.Names}</h2>
            <h3>${mess.Emails}</h3>
            <h4>${mess.Phone}</h4>
        </div>
       <div class="message">
        <p>${mess.T_Message}</p>
        <span>sent on: ${mess.date}</span>
       </div>
       <button class="replyMessage">reply</button>
</div>
        
     
        `
    });

    containerMess.innerHTML = temp;
}
ViewallMessages();



const deleteMessage = async (id) => {
    fetch(`${URL}/message/delete/${id}`, {
        method: "DELETE",
    })
        .then((response) => response.json())
        .then((data) => {
            // functionalities of delete
            location.reload();
        })
        .catch((err) => {
            alert(err)
        });
}
