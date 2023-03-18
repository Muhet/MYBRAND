const comentForm = document.querySelector('#form');
const creatcoment = async (e) => {
    e.preventDefault();
    const OBDOC = {
        names: comentForm.names.value,
        email: comentForm.email.value,
        textarea: comentForm.textarea.value,
    }
    await fetch("http://localhost:3000/Comments", {
        method: 'POST',
        body: JSON.stringify(OBDOC),
        headers: {
            'Content-Type': 'application/json'
        }

    });
    window.location.replace("./index.html")
}
comentForm && comentForm.addEventListener('submit', creatcoment);


const fetch_comment = async (id) => {
    const ClientContent = document.querySelector('#Client_comment');
    const response = await fetch(`http://localhost:3000/api/comments`)
    .then((response) => response.json())
    .then((comments) => {
        let temp = "";
        comments.data.forEach((comment) => {
            console.log(comment)
            temp += `
     <div class="table_row">
      <div class="table_cell first_cell">
          <p>${comment._id.slice(4, 7)}</p>
      </div>
      <div class="table_cell">
          <p>${comment.commentBody.slice(0, 30)}</p>
      </div>
      <div class="table_cell">
      <p>${comment.blog.slice(0, 4)}</p>
  </div>
  <div class="table_cell">
  <p>${comment.createdAt.slice(0, 10)}</p>
</div>
      <div class="table_cell last_cell">
          <div class="actionIcons">
              <a href="viewComent.html/?id=${comment._id}">
              <img src="../images/ViewsIcon.png" alt="" id="editIcon""/></a>
              <img src="../images/Delete.png" alt="" id="deleteIcon" onclick="deletecoment('${comment._id}');"/>
          </div>
      </div>
  </div>
          
          `
        })
        
        ClientContent.innerHTML = temp;
    });
    
}
fetch_comment();

const deletecoment = async (article_id) => {
    await fetch(`http://localhost:3000/Comments/${article_id}`, {
        method: "DELETE",

    });

}
const viewComment = async (id) => {
    const res = await fetch(`http://localhost:3000/Comments/?id=${id}`);
    const Blog = await res.json();
    const COM = await res.json();
    const ViewContent = document.querySelector('#View_comment');
    let temp = "";
    Blog.forEach((coment) => {
        COM.forEach((com) => {

            temp += `
        <h2 id="comentTitle">${coment.title}</h2>
        <div class="cards_Main_comment">
            <div class="left_Cards_comment" id="Cards_comment">
                <img src="${coment.image}" alt="" id="webDesImage"/>
            </div>
            <div class="right_card_Comment" id="card_Comment">
                <span class="Pargraph">
                   ${coment.messageB}
                </span>
                <div class="Viewcomments">
                    <p id="feedBack">${com.textarea}</p>
                    <div class="comentetorIMG">
                        <img src="../images/account.png" alt="" id="viewer"><span id="viewer_name">${com.names}</span>
                    </div>
                </div>
            </div>
            
        </div>
          
          `
        });
    });
    ViewContent.innerHTML = temp;
}
viewComment();
