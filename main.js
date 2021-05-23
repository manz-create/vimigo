const postlist = document.querySelector('.post-list');
const addPostForm = document.querySelector('.add-post-form');
const titleValue = document.getElementById('title-value');
const bodyValue = document.getElementById('body-value');
const idValue = document.getElementById('id-value');
const useridValue = document.getElementById('user_id-value');
const searchBtn= document.getElementById('search');
const searchContent = document.getElementById('myInput');

let output = '';
// Get- read the post 
// Method: Get 

const renderPosts = (post) => {
    post.forEach(post => {
        output = `
       <div class="card-body" data-id=${post.id}>
         <h4><span class="badge bg-secondary">TITLE</span></h4>
         <h5 class="card-title">${post.title}</h5><hr>
         <h6 class="card-subtitle mb-2 text-muted"><span class="badge rounded-pill bg-success">POST TIME</span> ${post.created_at}</h6>
         <h6 class="card-subtitle mb-2 text-muted"><span class="badge rounded-pill bg-success">UPDATE TIME</span> ${post.updated_at}</h6><hr>
         <h4><span class="badge bg-secondary">CONTENT</span></h4>
         <p class="card-text">${post.body}</p><hr>
         <h5><span class="badge rounded-pill bg-info text-dark">POST ID</span><h6 class="card-title-id">${post.id}</h6></h5>
         <h5><span class="badge rounded-pill bg-info text-dark">USER ID</span><h6 class="card-title-user"> ${post.user_id}</h6></h5>            
         <button class="btn btn-warning"><a href="/edit.html?id=${post.id}">Edit</a></button>
         <button class="btn btn-danger" data-id="${post.id}" onclick="deletepost(${post.id})">Delete</button>
        </div>
        
     <br><br>
   `+ output;
    });
   
    postlist.innerHTML = output;
}

const url = 'https://gorest.co.in/public-api/posts';
const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);
const pageNo = Number(urlParams.get('page')) || 1 ;
fetch(url + `?page=${pageNo}`)
    .then(res => res.json())
    .then(data =>{
         console.log(data);
         renderPosts(data.data);
         renderPagination(data.meta);
    })

function deletepost(id) {
    fetch(`${url}/${id}`, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer fde9918b9d624313fde7b20c66758cfa7db3dd342f29b1941ae299ab86c28bf1'
        },
    })
        .then(res => res.json())
        .then(() => location.reload())
}

function pagination(page, total) {
    let first = {
      'name': "first",
      page: 1
    };
    let last = {
      name: "last",
      page: total
    }
    let prev = {
      name: "prev",
      page: page - 1 <= 0 ? 1 : page - 1
    }
    let next = {
      name: "next",
      page: page < total ? page + 1 : page
    }
    let current = []
  
    for (let i = page - 2; i < page + 19; i++) {
      if (i >= 1 && i <= total) {
        current.push({
          name: i,
          page: i,
          active: page === i,
        })
      }
  
    }
  
    let items = [
      first, prev, ...current, next, last
    ]
  
  
    let itemHtml = items.map(item => {
      return `<li class="page-item ${item.active?'active':''}"><a class="page-link" href="/?page=${item.page}">${item.name}</a></li>`
    }).join("\n")
  
  
    let html = `<nav aria-label="Page navigation example">
    <ul class="pagination">
    ${itemHtml}
    </ul>
  </nav>`
  
    return html;
  
  }  
function renderPagination(meta){
      console.log(meta);
      let pgHTML = pagination(meta.pagination.page, meta.pagination.pages);
      let pg = document.getElementById('pagination');
      pg.innerHTML = pgHTML;
 }
 
 searchBtn.addEventListener('click', (e) => {
     console.log(searchContent.value); 
 })