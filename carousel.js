(function(){
function build(el){
var imgs=[].slice.call(el.querySelectorAll("img"));
if(imgs.length<2){ if(imgs[0]) imgs[0].classList.add("on"); return; }
var i=0;
imgs.forEach(function(im,k){ im.classList.toggle("on",k===0); });
var bar=document.createElement("div");
bar.className="carnav";
var prev=document.createElement("button"); prev.textContent="‹";
var num=document.createElement("span");
var next=document.createElement("button"); next.textContent="›";
bar.appendChild(prev); bar.appendChild(num); bar.appendChild(next);
el.appendChild(bar);
function show(x){
i=(x+imgs.length)%imgs.length;
imgs.forEach(function(im,k){ im.classList.toggle("on",k===i); });
num.textContent=(i+1)+" / "+imgs.length;
}
prev.onclick=function(e){ e.stopPropagation(); show(i-1); };
next.onclick=function(e){ e.stopPropagation(); show(i+1); };
el.addEventListener("click",function(e){
if(e.target.closest(".carnav")) return;
show(e.clientX<el.getBoundingClientRect().left+el.offsetWidth/2?i-1:i+1);
});
show(0);
}
function wrapRefs(){
document.querySelectorAll(".refs,.hero").forEach(function(box){
var imgs=box.querySelectorAll("img");
if(!imgs.length) return;
var c=document.createElement("div");
c.className="carousel";
[].forEach.call(imgs,function(im){ c.appendChild(im); });
box.parentNode.insertBefore(c, box);
box.parentNode.removeChild(box);
});
document.querySelectorAll(".carousel").forEach(build);
}
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",wrapRefs);
else wrapRefs();
})();
