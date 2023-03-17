const url = "https://excited-visor-hen.cyclic.app/api"
const postmessage = async () => {
    const comentForm = document.querySelector('#form');
    const names = document.querySelector("Names")
    const phone = document.querySelector("PNumbers")
    const email = document.querySelector("emails")
    const message= document.querySelector("message")

    try {
        await fetch(`${url}/message/create`,{
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
            comentForm.reset();
            alert("Your message has been saved successfully!!");
            window.location.replace("./index.html")
        }
        alert("Something is wrong your message is not saved!!!")
    } catch (error) {
        alert("OOPS there is problem try again later!!");
    }

}
postmessage();


/* RETRIEVING DATA FROM DATABASE */

/*==========ON ADMIN SIDE========== */
const ViewMessages = async () => {
    const response = await fetch("http://localhost:3000/messages");
    const Items = await response.json();
    const List_container = document.querySelector('#Message');
    let myTemp = "";
    Items.forEach((item) => {
       
        myTemp += `
      <div class="table_row">
      <div class="table_cell first_cell">
          <p>${item.id}</p>
      </div>
     
      <div class="table_cell">
          <p>${item.Phone}</p>
      </div>
      <div class="table_cell">
          <p>${item.Emails}</p>
      </div>
      <div class="table_cell">
          <p>${item.T_Message.slice(0, 40)}</p>
      </div>
     
      <div class="table_cell">
          <p>${item.date}</p>
      </div>
      <div class="table_cell">
          <div class="actionIcons last_cell">
          <a href="start.html?id=${item.id}">
          <img src="../images/ViewsIcon.png" alt="" id="editIcon"" onclick="renderMess()"/></a>
              <img src="../images/Delete.png" alt="" id="deleteIcon" onClick="deleteMessage(${item.id});"/>
          </div>
      </div>
  </div>
  `
    });
    List_container.innerHTML = myTemp;
}
ViewMessages();

const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('#might');
const renderMess = async () => {
    const response = await fetch('http://localhost:3000/messages/'+id);
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

const ViewallMessages = async ()=>{
    const res = await fetch("http://localhost:3000/messages");
    const newMes = await res.json();
    const containerMess = document.querySelector(".messageContainer");
    let temp ="";
    newMes.forEach((mess) =>{
        temp +=`
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
    } );

    containerMess.innerHTML = temp;
}
ViewallMessages();



const deleteMessage = async (id) => {
    await fetch(`http://localhost:3000/messages/${id}`, {
        method: 'DELETE',
        headers: {
            "Content-Type": "application/json",
        },
    })
}