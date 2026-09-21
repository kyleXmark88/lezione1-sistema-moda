(function(){
var isDoc=/[?&]docente=1/.test(location.search);
if(isDoc) document.body.classList.add("docente");
var lang="en";
document.body.classList.add("en");
var vo=document.getElementById("voice"); if(vo) vo.style.display="none";
var tr=document.getElementById("tr");
if(tr){
 tr.style.display="inline-block";
 tr.textContent="EN";
 tr.classList.add("on");
 tr.onclick=function(){
  lang=lang==="en"?"it":"en";
  document.body.classList.toggle("en", lang==="en");
  tr.classList.toggle("on", lang==="en");
  tr.textContent=lang==="en"?"EN":"IT";
  paint();
 };
}
if(!document.getElementById("docstyle")){
var st=document.createElement("style"); st.id="docstyle";
st.textContent="#tr{display:inline-block!important}#voice,.say,.sub{display:none!important}";
document.head.appendChild(st);
}
var hb=document.querySelector(".controls");
if(hb&&!document.getElementById("projBtn")){
var b=document.createElement("button");
b.id="projBtn"; b.textContent=isDoc?"Projector":"Teacher";
hb.insertBefore(b,hb.firstChild);
b.onclick=function(){
if(isDoc) window.open(location.href.replace(/[?&]docente=1/,""),"fsf_class");
else location.href=location.href+(location.search?"&":"?")+"docente=1";
};
}
function paras(s){
return String(s||"").split(". ").filter(Boolean).map(function(x){
if(x.slice(-1)!==".") x=x+".";
return "<p>"+x+"</p>";
}).join("");
}
function paint(){
var slide=document.querySelector(".slide.on");
if(!slide) return;
var kEl=slide.querySelector(".k");
var key=kEl?kEl.textContent.replace(/\s+/g," ").trim():"";
var rec=window.TEACHER_NOTES&&window.TEACHER_NOTES[key];
var box=slide.querySelector(".docread");
if(!box){
 box=document.createElement("div");
 box.className="docread";
 var pad=slide.querySelector(".pad");
 if(pad&&pad.nextSibling) slide.insertBefore(box, pad.nextSibling);
 else slide.insertBefore(box, slide.firstChild.nextSibling);
}
var txt="";
if(rec){
 if(typeof rec==="string") txt=rec;
 else txt=lang==="it"?(rec.it||rec.en):(rec.en||rec.it);
}
box.innerHTML='<div class="lab">'+(lang==="it"?"Da leggere":"Read")+'</div>'+(txt?paras(txt):"");
}
setInterval(paint,300);
paint();
})();
