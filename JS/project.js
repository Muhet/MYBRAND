
/* INSERTING DATA INTO DATABASE */

const postProject = async () => {
    let date = new Date().toDateString();
    const title = document.querySelector("#title").value;
    const image = document.querySelector("#file").value;
    const Description = document.querySelector("#description").value;

    const response = await fetch("https://nice-teal-chinchilla-suit.cyclic.app/Project", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title,
            image,
            Description,
            date,
        }),
    });

    document.querySelector("#title").value = "";
    document.querySelector("#file").value = "";
    document.querySelector("#description").value = "";

    alert("Your blog has been added successfully")
    window.location.replace('./ArticleList.html');

}

/* RETRIEVING DATA FROM DATABASE */

/*==========ON ADMIN SIDE========== */
const viewProjects = async () => {
   const response = await fetch("https://nice-teal-chinchilla-suit.cyclic.app/Project");
    const Items = await response.json();
    const List_container = document.querySelector('#Projects');
    let myTemp = "";
    Items.forEach((item) => {
      myTemp +=`
      <div class="table_row">
      <div class="table_cell first_cell">
          <p>${item.id}</p>
      </div>
      <div class="table_cell">
          <p>${item.title}</p>
      </div>
      <div class="table_cell">
          <p>${item.Description.slice(0,50)}</p>
      </div>
     
      <div class="table_cell">
          <p>${item.date}</p>
      </div>
      <div class="table_cell">
          <div class="actionIcons last_cell">
              <img src="../images/Edit.png" alt="" id="editIcon" onClick="OpenModel(${item.id});");"  />
              <img src="../images/Delete.png" alt="" id="deleteIcon" onClick="deleteBlog(${item.id});"/>
          </div>
      </div>
  </div>
  ` 
});
List_container.innerHTML = myTemp;
}
viewProjects();
/*==========ON CLIENTS' SIDE========== */
const Projecto = async () => {
    const response = await fetch("https://nice-teal-chinchilla-suit.cyclic.app/Project");
     const proj = await response.json();
     const container = document.querySelector('.works');
     let Temp = "";
     proj.forEach((pro) => {

       Temp +=`
       <div class="firstCard">
       <div class="workNumber">
           <span id="workNumber">${pro.id}</span>
       </div>
       <a href="https://dgbuyoz.netlify.app/">
           <img id="imageTwo" src="${pro.image}" alt="" />
       </a>
       <span class="PIC-descrption">
          ${pro.Description}
       </span>
   </div>
   ` 
 });
 container.innerHTML = Temp;
 }
 Projecto();