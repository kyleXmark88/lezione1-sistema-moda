(function(){
function clean(url){if(!url)return "";return url.replace(/[?&]autoplay=1/g,"").replace(/enablejsapi=1/g,"");}
function unload(iframe){if(!iframe)return;iframe.removeAttribute("src");}
function arm(){
document.querySelectorAll(".vid iframe").forEach(function(ifr){
var raw=clean(ifr.getAttribute("data-src")||ifr.getAttribute("src")||"");
ifr.setAttribute("data-src",raw);unload(ifr);
ifr.setAttribute("allow","accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture");
var box=ifr.parentNode;if(!box||box.querySelector(".playvid"))return;
box.classList.add("needplay");
var b=document.createElement("button");b.type="button";b.className="playvid";b.textContent="Play";
b.onclick=function(e){e.stopPropagation();document.querySelectorAll(".vid iframe").forEach(unload);document.querySelectorAll(".vid").forEach(function(v){v.classList.add("needplay");});ifr.src=ifr.getAttribute("data-src");box.classList.remove("needplay");};
box.appendChild(b);
});
}
var st=document.createElement("style");st.textContent=".vid.needplay{background:#111;min-height:42vh}.playvid{position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);z-index:3;background:#d4b483;color:#111;border:0;padding:14px 22px;font:13px Helvetica,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;cursor:pointer}.vid:not(.needplay) .playvid{display:none}";document.head.appendChild(st);
if(document.readyState==="loading")document.addEventListener("DOMContentLoaded",arm);else arm();
setTimeout(arm,400);setTimeout(arm,1200);
})();
