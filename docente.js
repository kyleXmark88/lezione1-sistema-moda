(function(){
var isDoc=/teacher\.html/i.test(location.pathname)||document.body.classList.contains("docente")||/[?&]docente=1/.test(location.search);
if(isDoc) document.body.classList.add("docente","en");
else document.body.classList.add("en");
var lang="en";
var tr=document.getElementById("tr");
if(tr){
 tr.onclick=function(){
  lang=lang==="en"?"it":"en";
  document.body.classList.toggle("en", lang==="en");
  tr.classList.toggle("on", lang==="en");
  tr.textContent=lang==="en"?"EN":"IT";
  paint();
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
var pad=slide.querySelector(".pad");
if(!box){
 box=document.createElement("div");
 box.className="docread";
 if(pad&&pad.nextSibling) slide.insertBefore(box,pad.nextSibling);
 else if(pad) pad.after(box);
 else slide.appendChild(box);
}
var txt="";
if(rec) txt=typeof rec==="string"?rec:(lang==="it"?(rec.it||rec.en):(rec.en||rec.it));
box.innerHTML='<div class="lab">'+(lang==="it"?"Da leggere":"Read")+'</div>'+(txt?paras(txt):"");
}
setInterval(paint,300);
paint();
})();
