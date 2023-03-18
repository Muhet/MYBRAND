
/*........BLOG CONTENTS.... */
let articleID = "";

const Form = document.querySelector(".form");

Form.addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector("#title").value;
    const category = document.querySelector("#cat").value;
    const description = document.querySelector("#blogMessage").value;
    const image = document.querySelector("#file").value;

    const data = { title, category, description, image }
    fetch("https://excited-visor-hen.cyclic.app/api/blogs/create",
        {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data)
        }).then((response) => {
            return response.json()
        }).then((data) => {
           if (data.ok) {
                alert(data.message)
            } else {
                alert(data.errors.name)
            }
        }).catch(error => alert(error))

});

/* ####################################### */

/* ####################################### */
/* DISPLAY TABLE CONTENT */

const fetchBlog = async () => {
    const BlogsContent = document.querySelector('#Blogs');
    fetch("https://excited-visor-hen.cyclic.app/api/blogs")
        .then((response) => response.json())
        .then((blogs) => {
            let template = "";
            blogs.data.forEach((blog) => {
                template += `
        <div class="table_row">
                                <div class="table_cell first_cell">
                                    <p>${blog._id.toString()}</p>
                                </div>
                                <div class="table_cell">
                                    <p>${blog.category}</p>
                                </div>
                                <div class="table_cell">
                                    <p>${blog.title}</p>
                                </div>
                               
                                <div class="table_cell">
                                    <p>${blog.createdAt}</p>
                                </div>
                                <div class="table_cell">
                                    <div class="actionIcons last_cell">
                                        <img src="../images/Edit.png" alt="" id="editIcon" onClick="openModel('${blog._id}');"  />
                                        <img src="../images/Delete.png" alt="" id="deleteIcon" onClick="deleteBlog('${blog._id}');"/>
                                    </div>
                                </div>
                            </div>
        `
            })
            BlogsContent.innerHTML = template;
        })


}
fetchBlog();
/* FETCHING ON CLIENT SIDE */

const fetch_clientBlog = async () => {
    const BlogsContent = document.querySelector('#Client_Blogs');
    fetch("https://excited-visor-hen.cyclic.app/api/blogs")
        .then((response) => response.json())
        .then((blogs) => {
            let temp = "";
            blogs.data.forEach((blog) => {

                temp += `
                 <div class="blogCard">
                 <img src="${blog.image}"  alt="" id="blogIMG"/>
                         <div class="sectionPar">
                             <h3>${blog.title}</h3>
                             <span id="blogparagraph">${blog.description.slice(0, 50)}
                             </span>
                             <div class="ReadMore" >
                                 <a href="ReadmoreBlog.html?id=${blog._id}" onClick='renderBlog()' id="blogReadMore">Read More</a>
                             </div>
                         </div>
                         </div>
                  `
            })

            BlogsContent.innerHTML = temp;
        });

}
fetch_clientBlog();

/* READMORE ABOUT POST ON CLIENT SIDE */

/* GETTING SINGLE BLOG BY IT'S ID */

const id = new URLSearchParams(window.location.search).get('id');
const container = document.querySelector('#might');
const renderBlog = async () => {
    const res = await fetch(`https://excited-visor-hen.cyclic.app/api/blogs/${id}`);
    const post = await res.json();
   const template = `
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

    container.innerHTML = template;
}
renderBlog();


/* DELETE FUNCTION */

const deleteBlog = async (blogId) => {
    fetch(`https://excited-visor-hen.cyclic.app/api/blog/delete/${blogId}`, {
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

};


const getById = async (article_id) => {
    await fetch(`https://excited-visor-hen.cyclic.app/api/blog/${article_id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    });
    alert("deleted successfully")
}

/* UPDATE FUNCTION */

// get model box
const modelBox = document.getElementById("modelBox");
// get form 
const newForm = document.getElementById("newForm");

// hide model boox
modelBox.style.display = "none";


// fun to open model with content of selected article
const openModel = async (blogId) => {
    modelBox.style.display = "block";
    const response = await fetch(`https://excited-visor-hen.cyclic.app/api/blog/${blogId}`);
    const blog = await response.json();


    newForm.title.value = blog.data.title;
    newForm.cat.value = blog.data.category;
    newForm.file.value = blog.data.image;
    newForm.message.value = blog.data.description;
    newForm.id.value = blog.data._id;

}
const updateBlog = async () => {
    const form = document.getElementById("newForm");
    const title = form.elements.title.value;
    const category = form.elements.cat.value;
    const image = form.elements.file.value;
    const message = form.elements.message.value;
    const articleID = form.elements.id.value;

    try {
        const response = await fetch(`https://excited-visor-hen.cyclic.app/api/blog/update/${articleID}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                title,
                category,
                image,
                message,
            }),
        });

        if (response.ok) {
            form.reset();
            toastr.success("Your blog has been updated successfully");
        } else {
            const error = await response.json();
            toastr.info(`Failed to update blog: ${error.message}`);
        }
    } catch (error) {
        toastr.error("Failed to update blog. Please try again later.");
    }
}

