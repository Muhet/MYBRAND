
const id = new URLSearchParams(window.location.search).get('id');

const fetch_singleBlog = async () => {
    const blogContent = document.querySelector('#might');

    const res = await fetch(`https://excited-visor-hen.cyclic.app/api/blog/${id}`);
    const blog = await res.json();

    const blogHTML = `
    <div class="leftSide"> 
    <h1>${blog.data.title}</h1>
    <img src="${blog.data.image}" alt="" id="image"/>
</div>
<div class="rightSide">
    <spam id="paragraph">
        ${blog.data.description}
    </spam>
    <div class="social_media">
    <a href="/index.html">
       <img src="../images/BackICNBlue.png" alt="" class="backward"/></a>
       <a href="./comment.html?id=${blog.data._id}"><img src="../images/comment.png"alt="" class="comment"/><span id="likes"></span></a>
       560k</span>
       
 </div>
 </div>
            `
    blogContent.innerHTML = blogHTML;

};
fetch_singleBlog();