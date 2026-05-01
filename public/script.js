if(typeof window!=="undefined"){

setInterval(()=>{

let players=document.getElementById("players");

if(players){
let num=Math.floor(Math.random()*50)+220;
players.innerText=num;
}

},3000);

window.addEventListener("scroll",()=>{

document.querySelectorAll(".box").forEach(box=>{

let top=box.getBoundingClientRect().top;

if(top<window.innerHeight-50){
box.style.opacity="1";
box.style.transform="translateY(0)";
}

});

});

}