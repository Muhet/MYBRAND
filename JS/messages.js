/* ADDING NEW MESSAGE {FROM CLIENT SIDE} */

const neame =  document.querySelector("#new_client_form")
 console.log(neame)

/* RETRIEVING DATA FROM DATABASE */
/*==========ON ADMIN SIDE========== */
const ViewMessages = async () => {
    const List_container = document.getElementById('Message');
    await fetch(`https://excited-visor-hen.cyclic.app/api/messages`)
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
    const response = await fetch(`https://excited-visor-hen.cyclic.app/api/messages`).
    then((response) = response.json())
    .then((Items) =>{
        let template="";
        Items.data.forEach((item)=>{

            console.log(item)
    template = `
    <div class="main_Admin">
    <div class="cardContainer_Admin">
        <div class="header_Admin">
            <span><i class="fa fa-cog" aria-hidden="true"></i></span>
            <span ><i class="fa fa-bars" aria-hidden="true"></i></span>
        </div>
        <div class="imageprof_Admin">
            <img src="../images/dario.jpg" alt="" class="profilePhoto_Admin">
        </div>
        <h3>Muheto G. Darius<span>${item.names}</span></h3>
        <div class="socialMedias_Admin">
            <ul>
                <li><i class="fa fa-graduation-cap"></i></a></li>
                <li><i class="fa fa-book" aria-hidden="true"></i></a></li>
                <li><a  href=""><i class="fa fa-envelope" aria-hidden="true"></i></a></li>
            </ul>
        </div>
        <div class="moreBTN_Admin">
            <a href="index.html" class="clickMe">Click me</a>
           </div>  
    </div>
       
       <h4>Click above buttom to view more Info</h4>
       <h5>Along side with love and Compation</h5>
    </div>
    `

        })
    })
    
    container.innerHTML = template;
}

renderMess();

const ViewallMessages = async () => {
    const res = await fetch(`https://excited-visor-hen.cyclic.app/api/messages`);
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
    fetch(`https://excited-visor-hen.cyclic.app/api/message/delete/${id}`, {
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
