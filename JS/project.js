

const url = "https://excited-visor-hen.cyclic.app/api/"
const postProject = async () => {
    const ProjectForm = document.querySelector("#form");
    let date = new Date().toDateString();
    const title = document.querySelector("#title").value;
    const image = document.querySelector("#file").value;
    const description = document.querySelector("#description").value;

    try {
        const res = await fetch(`${url}/project/create`,{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body: JSON.stringify({
                title,
                image,
                description,
            }),
        });
        if(response.ok){
            ProjectForm.reset();
            alert("Your project has been saved successfully!!");
        }
        alert("Something is wrong your project is not saved!!!")
    } catch (error) {
        alert("OOPS there is problem try again later!!");
    }

}


/* RETRIEVING DATA FROM DATABASE */

/*==========ON ADMIN SIDE========== */
const viewProjects = async () => {
    const List_container = document.querySelector('#ProjectList');

    fetch("https://excited-visor-hen.cyclic.app/api/project")
        .then((res) => res.json())
        .then((works) => {
            let myTemp = "";
            works.data.forEach((work) => {
               myTemp += `
       <div class="table_row">
       <div class="table_cell first_cell">
       <p>${work._id.slice(4, 7)}</p>
   </div>
   <div class="table_cell">
      <p>${work.title}</p>
      </div>
      <div class="table_cell">
      <p>${work.description.slice(0, 20)}</p>
  </div>
  <div class="table_cell">
  <p>${work.createdAt}</p>
</div>
<div class="table_cell">
<div class="actionIcons last_cell">
    <img src="../images/Edit.png" alt="" id="editIcon" onClick="OpenModel(${work._id});");"  />
    <img src="../images/Delete.png" alt="" id="deleteIcon" onClick="deleteBlog(${work._id});"/>
</div>
</div>
       </div>
       `
            })
            List_container.innerHTML = myTemp;
        })

}
viewProjects();
/*==========ON CLIENTS' SIDE========== */
const fetch_clientproject = async () => {
    const ProjectsContent = document.querySelector('#injectedCard');
   fetch(`${url}/project`)
        .then((response) => response.json())
        .then((projects) => {
           let Temp = "";
            projects.data.forEach((pro) => {

                Temp += `
              <div class="firstCard">
              <div class="workNumber">
                  <span id="workNumber">${pro._id.slice(5, 6)}</span>
              </div>
              <a href="https://dgbuyoz.netlify.app/">
                  <img id="imageTwo" src="${pro.image}" alt="" />
              </a>
              <span class="PIC-descrption">
                 ${pro.description}
              </span>
          </div>
          `
            });
            ProjectsContent.innerHTML = Temp;
        });
}
fetch_clientproject();


// delete blog
const deleteproject = async (blogId) => {
    try {
      const res = await fetch(`${url}/project/delete/${blogId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (res.ok) {
        alert("Blog deleted successfully");
        // Update the view after deleting the blog
        viewProjects();
      } else {
        alert("Something went wrong while deleting the blog");
      }
    } catch (error) {
      alert("OOPS there is problem try again later!!");
    }
  };
  


window.addEventListener("DOMContentLoaded", () => viewProjects());
