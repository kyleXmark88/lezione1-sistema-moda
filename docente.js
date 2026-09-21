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
".docread{display:block;margin:12px 6vw 80px;padding:22px 24px;background:#f3eee6;color:#1a1612;border-radius:4px;max-width:820px}",
".docread .lab{font:11px Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#8a6a3a;margin:0 0 12px}",
".docread p{font:18px/1.65 Helvetica,Arial,sans-serif;color:#1a1612;margin:0 0 12px}",
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
if(isDoc) window.open(location.href.replace(/[?&]docente=1/,"").replace(/\?&/,"?").replace(/\?$/,""),"fsf_class");
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
if(!box){ box=document.createElement("div"); box.className="docread"; slide.appendChild(box); }
var en=rec?(typeof rec==="string"?rec:(rec.en||rec.it)):"";
box.innerHTML='<div class="lab">Read</div>'+(en?paras(en):"<p>Choose a chapter.</p>");
}
setInterval(paint,250);
paint();
})();
