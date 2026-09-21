(function(){
try{localStorage.removeItem("fsf-slide");}catch(e){}
function clean(url){if(!url)return "";return url.replace(/[?&]autoplay=1/g,"");}
function unload(iframe){if(!iframe)return;iframe.removeAttribute("src");}
function arm(){
document.querySelectorAll(".vid iframe").forEach(function(ifr){
var raw=clean(ifr.getAttribute("data-src")||"");
ifr.setAttribute("data-src",raw);unload(ifr);
var box=ifr.parentNode;if(!box)return;box.classList.add("needplay");
if(box.querySelector(".playvid"))return;
var b=document.createElement("button");b.type="button";b.className="playvid";b.textContent="Play";
b.onclick=function(e){e.preventDefault();e.stopPropagation();
document.querySelectorAll(".vid iframe").forEach(unload);
document.querySelectorAll(".vid").forEach(function(v){v.classList.add("needplay");});
ifr.src=raw+"?rel=0&modestbranding=1";box.classList.remove("needplay");};
box.appendChild(b);
});
}
var st=document.createElement("style");st.textContent=".vid{position:relative;padding-top:56.25%;margin:14px 0;background:#111}.vid iframe{position:absolute;inset:0;width:100%;height:100%;border:0}.vid.needplay iframe{display:none}.playvid{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:3;background:#d4b483;color:#111;border:0;padding:14px 22px;font:13px Helvetica,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;cursor:pointer}";document.head.appendChild(st);
arm();setTimeout(arm,300);setTimeout(arm,1000);
})();
