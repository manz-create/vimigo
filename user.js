const userlist = document.querySelector('.user-list');

const url = 'https://gorest.co.in/public-api/users';

let output='';
const renderUsers = (user) => {
    user.forEach(user => {
       output += `<div class="card" style="width: 18rem;">
       <div class="card-body">
         <h5 class="card-title">Name: ${user.name}</h5>
         <h5 class="card-title">ID: ${user.id}</h5>
         <h6 class="card-subtitle mb-2 text-muted">Created At: $[] </h6>
         <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
         <a href="#" class="card-link">Edit</a>
         <a href="#" class="card-link">Delete</a>
       </div>
     </div>
   `
    });
userlist.innerHTML=output; 
}



fetch(url)
    .then(res => res.json())
    .then(data =>{
        console.log(data);
        renderUsers(data.data);
        
    })