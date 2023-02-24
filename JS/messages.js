/* INSERTING DATA INTO DATABASE */

const postMessage = async () => {
    let date = new Date().toDateString();
   const Names = document.querySelector("#Names").value;
   const Phone = document.querySelector("#PNumber").value;
    const Emails = document.querySelector("#emails").value;
    const T_Message = document.querySelector("#message").value;

    await fetch("http://localhost:3000/messages", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            date,
            Names,
            Phone,
            Emails,
            T_Message, 
        }),
    });

    document.querySelector("#Namea").value = "";
    document.querySelector("#PNumber").value = "";
    document.querySelector("#emails").value = "";
    document.querySelector("#message").value = "";

    alert("Your Message has been sent successfully!! Thank you for reaching us")
    window.location.replace('./index.html');

}

/* RETRIEVING DATA FROM DATABASE */

/*==========ON ADMIN SIDE========== */
const ViewMessages = async () => {
   const response = await fetch("http://localhost:3000/messages");
    const Items = await response.json();
    const List_container = document.querySelector('#Message');
    let myTemp = "";
    Items.forEach((item) => {
      myTemp +=`
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
              <img src="../images/Edit.png" alt="" id="editIcon"/>
              <img src="../images/Delete.png" alt="" id="deleteIcon" onClick="deleteMessage(${item.id});"/>
          </div>
      </div>
  </div>
  ` 
});
List_container.innerHTML = myTemp;
}
ViewMessages();


const deleteMessage = async (id)=>{
    await fetch(`http://localhost:3000/messages/${id}`,{
        method:'DELETE',
    })
}