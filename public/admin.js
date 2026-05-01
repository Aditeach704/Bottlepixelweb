loadUsers();

function loadUsers(){
fetch("/users")
.then(res=>res.json())
.then(data=>{

let html="";

data.forEach(u=>{
html+=`
<div class="user">
<div>${u.username} (${u.role})</div>
<div>
<button onclick="deleteUser(${u.id})">Delete</button>
</div>
</div>
`;
});

document.getElementById("usersList").innerHTML=html;

});
}

function deleteUser(id){
fetch("/delete-user",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({id:id})
}).then(()=>loadUsers());
}

function sendAnnouncement(){
let text=document.getElementById("announceText").value;

fetch("/announce",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({message:text})
}).then(()=>alert("Announcement Posted"));
}

function setRank(){
let username=document.getElementById("rankUser").value;
let role=document.getElementById("rankRole").value;

fetch("/set-rank",{
method:"POST",
headers:{'Content-Type':'application/json'},
body:JSON.stringify({username,role})
}).then(()=>alert("Rank Updated"));
}