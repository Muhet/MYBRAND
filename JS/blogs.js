/*........INSERT CONTENT.... */
let articleID = "";
const postBlog = async () => {

    const title = document.querySelector("#title").value;
    const category = document.querySelector("#cat").value;
    const messageB = document.querySelector("#blogMessage").value;
    const image = document.querySelector("#file").value;

    const response = await fetch("http://localhost:3000/Blogs", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            category,
            messageB,
            image,
        }),
    });

    document.querySelector("#title").value = "";
    document.querySelector("#cat").value = "";
    document.querySelector("#blogMessage").value = "";
    document.querySelector("#file").value = "";
    alert("Your blog has been added successfully")
    window.location.replace('./ArticleList.html');

}

/* DISPLAY TABLE CONTENT */

const fetchBlog = async () => {
    const date = new Date().toJSON();
    const response = await fetch("http://localhost:3000/Blogs");
    const post = await response.json();
    const BlogsContainer = document.querySelector("#Blogs");
    let templete = "";
    let clientBlog = "";
    post.forEach((blog) => {
        templete += `
        <div class="table_row">
                                <div class="table_cell first_cell">
                                    <p>${blog.id}</p>
                                </div>
                                <div class="table_cell">
                                    <p>${blog.category}</p>
                                </div>
                                <div class="table_cell">
                                    <p>${blog.title}</p>
                                </div>
                               
                                <div class="table_cell">
                                    <p>${date}</p>
                                </div>
                                <div class="table_cell">
                                    <div class="actionIcons last_cell">
                                        <img src="../images/Edit.png" alt="" id="editIcon" onClick="OpenModel(${blog.id});");"  />
                                        <img src="../images/Delete.png" alt="" id="deleteIcon" onClick="deleteBlog(${blog.id});"/>
                                    </div>
                                </div>
                            </div>
        `
    });
    BlogsContainer.innerHTML = templete;


}

/* FETCHING ON CLIENT SIDE */

const fetch_clientBlog = async () => {
    const response = await fetch("http://localhost:3000/Blogs");
    const post = await response.json();
    const BlogsContent = document.querySelector('#Client_Blogs');
    let temp = "";

    post.forEach((blog) => {
        temp += `
       <div class="mainBlog">
           <div class="blogCard">
            <img src="${blog.image}" />
                    <div class="sectionPar">
                        <h3>${blog.title}</h3>
                        <span id="blogparagraph">${blog.messageB.slice(0, 50)}
                        </span>
                        <div class="ReadMore">
                            <a href="ReadmoreBlog.html" id="blogReadMore" onClick="fetchRead(${blog.id});">Read More</a>
                        </div>
                    </div>
                    </div>
                  </div>
            
            `

    });
    BlogsContent.innerHTML = temp;
}
fetch_clientBlog();
/* READMORE ABOUT POST ON CLIENT SIDE */
const fetchRead = async () => {
    let myTemp="";
 const readMoreBlog = document.querySelector('#might')   
const res = await fetch(`http://localhost:3000/Blogs`)
const post = await res.json();
post.forEach((post)=>{

 myTemp += `
        <div class="leftSide">
        <h1>${post.title}</h1>
        <img src="${post.image}" alt="" id="image"/>
    </div>
    <div class="rightSide">
        <spam id="paragraph">
            ${post.messageB}
        </spam>
        <div class="social_media">
           <img src="../images/BackICNBlue.png" alt="" class="backward"/>
            <a href="comment.html"> <img src="../images/comment.png" alt="" class="comment"/><span id="likes"></span></a>
           560k</span>
            <img src="../images/likes.png" alt="" class="like"/> <span id="likes">200k</span>
           
        </div>
      </div>
        `
    })

 readMoreBlog.innerHTML = myTemp;
}
fetchRead();
/* DELETE FUNCTION */

const deleteBlog = async (article_id) => {
    await fetch(`http://localhost:3000/Blogs/${article_id}`, {
        method: "DELETE",
        headers: {
            "Content-Type": "application/json",
        },
    });

}

/* UPDATE FUNCTION */

// get model box
const modelBox = document.getElementById("modelBox");
// get form 
const newForm = document.getElementById("newForm");

// hide model boox
modelBox.style.display = "none";


// fun to open model with content of selected article
const OpenModel = async (article_id) => {
    const response = await fetch(`http://localhost:3000/Blogs/${article_id}`);

    const blog = await response.json();
    // show model box
    modelBox.style.display = "block";
    // set input values from server
    newForm.title.value = blog.title;
    newForm.cat.value = blog.category;
    newForm.message.value = blog.messageB;
    newForm.file.value = blog.image;
    articleID = blog.id;

}


const updatingPost = async () => {

    const post = {
        title: newForm.title.value,
        category: newForm.cat.value,
        messageB: newForm.message.value,
        image: newForm.file.value,
    }

    const response = await fetch(`http://localhost:3000/Blogs/${articleID}`, {
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



window.addEventListener("DOMContentLoaded", () => fetchBlog());

