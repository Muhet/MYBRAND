
const id2 = new URLSearchParams(window.location.search).get('id');

const readsend = async () => {
    const blogContent = document.querySelector('#sendComent');

    const res = await fetch(`https://excited-visor-hen.cyclic.app/api/blog/${id2}`);
    const blog = await res.json();
    
    const blogHTML = `
    <main class="main">
    <div class="leftSide">
        <h1>${blog.data.title}</h1>
        <img src="${blog.data.image}" alt="" id="image"/>
    </div>
    <div class="form-group">
        <label>Space for Comments</label>
        <form class="form" id="commentForm">
            <textarea  class="textArea" id="commentBody" style="font-family:'Font Awesome 5 free'; font-weight: 900;" type="text" placeholder="&#xf075; your comment here..." rows="10"></textarea>
            <div class="btn">
                <button onclick="submitComment('${blog.data._id}');" class="btn-btn"> >Submit</button>
            </div>
          
        </form>
    </div>
</main>
<div class="rightSide">
    <spam id="paragraph">
       ${blog.data.description}
   </spam>
   <div class="social_media">
  
      <img src="../images/BackICNBlue.png" alt="" class="backward"/></a>
     
 </div>
 </div>
           `
    blogContent.innerHTML = blogHTML;
};
readsend();