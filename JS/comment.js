
const form = document.querySelector('#commentForm');
const commentBody = document.querySelector('#commentBody');
console.log(form)
const submitComment = async (blogId, commentBody) => {
  const data = { blog: blogId, commentBody };
  fetch(`https://excited-visor-hen.cyclic.app/api/blog/${blogId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data)
  })
  .then((response) => response.json())
  .then((data) => {
    toastr.success("Your comment has been posted successfully");
    location.reload();
  })
  .catch((err) => {
    toastr.error(err.message);
  });
};

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
const ClientContent = document.querySelector('#Client_comment');

const fetch_comment = async () => {
    fetch(`https://excited-visor-hen.cyclic.app/api/comments`)
        .then((response) => response.json())
        .then((comments) => {
            let temp = "";
            comments.data.forEach((comment) => {
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
                                <a href="viewComent.html/id=${comment._id}">
                                    <img src="../images/ViewsIcon.png" alt="" id="editIcon""/>
                                </a>
                                <img src="../images/Delete.png" alt="" id="deleteIcon" onclick="deletecomment('${comment.blog}', '${comment._id}')"/>
                            </div>
                        </div>
                    </div>
                `;
            });
            ClientContent.innerHTML = temp;
        });
}

const deletecomment = async (blogId, commentId) => {
    fetch(`https://excited-visor-hen.cyclic.app/api/blog/${blogId}/comments/${commentId}`, {
        method: "DELETE",
       
    })    
    .then((response) => response.json())
    .then((data) => {
        toastr.success("Your comment has been deleted successfully");
        location.reload();
    })
    .catch((err) => {
        toastr.error(err.message);
    });
}

fetch_comment();

/* $$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$$ */
const id = new URLSearchParams(window.location.search).get('id');

const viewComment = async (blog_id, comment_id) => {
    const ViewContent = document.querySelector('#View_comment');
    fetch(`https://excited-visor-hen.cyclic.app/api/blog/${id}`)
      .then((res) => res.json())
      .then((Blog) => {
        fetch(`https://excited-visor-hen.cyclic.app/api/comments`+id)
          .then((response) => response.json())
          .then((comments) => {
            let temp = "";
            Blog.data.forEach((blog) => {
              comments.data.forEach((comment) => {
                temp += `
                  <h2 id="comentTitle">${blog.title}</h2>
                  <div class="cards_Main_comment">
                    <div class="left_Cards_comment" id="Cards_comment">
                      <img src="${blog.image}" alt="" id="webDesImage"/>
                    </div>
                    <div class="right_card_Comment" id="card_Comment">
                      <span class="Pargraph">
                       ${blog.description}
                      </span>
                      <div class="Viewcomments">
                        <p id="feedBack"> ${comment.commentBody}</p>
                        <div class="comentetorIMG">
                          <img src="../images/account.png" alt="" id="viewer"><span id="viewer_name">Muheto</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              })
            })
            ViewContent.innerHTML = temp;
          });
      });
  }
  viewComment(); // Pass the blogId parameter to the function when calling it.
  