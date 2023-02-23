const comentForm = document.querySelector('#form');
const creatcoment = async (e) => {
    e.preventDefault();
    const OBDOC = {
        names: comentForm.names.value,
        email: comentForm.email.value,
        textarea: comentForm.textarea.value,
    }
    await fetch("https://nice-teal-chinchilla-suit.cyclic.app/Comments", {
        method: 'POST',
        body: JSON.stringify(OBDOC),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    window.location.replace("./index.html")
}
/* comentForm.addEventListener('submit', creatcoment); */


const fetch_comment = async () => {
    const response = await fetch("https://nice-teal-chinchilla-suit.cyclic.app/Comments");
    const post = await response.json();
    const ClientContent = document.querySelector('#Client_comment');
    let temp = "";
    post.forEach((coment) => {
        temp += `
      <div class="table_row">
      <div class="table_cell first_cell">
          <p>${coment.id}</p>
      </div>
      <div class="table_cell">
          <p>${coment.names}</p>
      </div>
      <div class="table_cell">
          <p>${coment.email}</p>
      </div>
      <div class="table_cell">
          <p>${coment.textarea.slice(0, 50)}</p>
      </div>
      <div class="table_cell last_cell">
          <div class="actionIcons">
              <a href="viewComent.html">
              <img src="../images/ViewsIcon.png" alt="" id="editIcon"/></a>
              <img src="../images/Delete.png" alt="" id="deleteIcon" onclick="deletecoment(${coment.id});"/>
          </div>
      </div>
  </div>
          
          `

    });
    ClientContent.innerHTML = temp;
}
fetch_comment();

const deletecoment = async (article_id) => {
    await fetch(`https://nice-teal-chinchilla-suit.cyclic.app/Comments/${article_id}`, {
        method: "DELETE",

    });

}

