(function(){
var isDoc=/[?&]docente=1/.test(location.search);
if(isDoc) document.body.classList.add("docente");
document.body.classList.add("en");
var tr=document.getElementById("tr"); if(tr) tr.style.display="none";
var vo=document.getElementById("voice"); if(vo) vo.style.display="none";
if(!document.getElementById("docstyle")){
var st=document.createElement("style"); st.id="docstyle";
st.textContent=[
"body.en .it{display:none!important}",
"body.en .en{display:block!important}",
"body.docente .hero,body.docente .refs,body.docente .vid,body.docente .playvid,body.docente iframe{display:none!important}",
"body.docente .docread{display:block;margin:12px 6vw 80px;padding:22px 24px;background:#f3eee6;color:#1a1612;border-radius:4px;max-width:820px}",
"body.docente .docread .lab{font:11px Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8a6a3a;margin:0 0 12px}",
"body.docente .docread p{font:18px/1.65 Helvetica,Arial,sans-serif;color:#1a1612;margin:0 0 12px}",
"body:not(.docente) .docread{display:none!important}",
"#voice,.say,.sub{display:none!important}"
].join("");
document.head.appendChild(st);
}
var hb=document.querySelector(".controls");
if(hb&&!document.getElementById("projBtn")){
var b=document.createElement("button");
b.id="projBtn"; b.textContent=isDoc?"Projector":"Teacher";
hb.insertBefore(b,hb.firstChild);
b.onclick=function(){
if(isDoc) window.open(location.pathname.split("?")[0]+location.hash,"fsf_class");
else {
var u=location.href;
location.href=u.indexOf("?")>=0?u+"&docente=1":u+"?docente=1";
}
};
}
function paras(s){
return String(s||"").split(". ").filter(Boolean).map(function(x){
if(!/\.\s*$/.test(x)) x=x+".";
return "<p>"+x+"</p>";
}).join("");
}
function paint(){
if(!isDoc) return;
var slide=document.querySelector(".slide.on")||document.querySelector(".slide");
if(!slide) return;
var kEl=slide.querySelector(".k");
var key=kEl?kEl.textContent.replace(/\s+/g," ").trim():"";
var rec=window.TEACHER_NOTES&&(window.TEACHER_NOTES[key]||window.TEACHER_NOTES[key.replace(" ","")]);
var box=slide.querySelector(".docread");
if(!box){ box=document.createElement("div"); box.className="docread"; slide.appendChild(box); }
var en=rec?(typeof rec==="string"?rec:rec.en):"Open a chapter. The reading text appears here.";
box.innerHTML='<div class="lab">Read</div>'+paras(en);
}
setInterval(paint,250);
if(document.readyState==="loading") document.addEventListener("DOMContentLoaded",paint);
else paint();
})();
