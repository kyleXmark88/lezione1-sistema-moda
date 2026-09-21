(function(){
var isDoc=/[?&]docente=1/.test(location.search);
if(isDoc)document.body.classList.add("docente");
var tr=document.getElementById("tr");
if(tr){tr.style.display="";tr.textContent="Traduttore LIVE";}
var v=document.getElementById("voice");if(v)v.style.display="none";
if(!document.querySelector("style#docstyle")){
var st=document.createElement("style");st.id="docstyle";
st.textContent="body.docente .hero,body.docente .refs,body.docente .vid,body.docente .playvid,body.docente iframe,body.docente .slide img{display:none!important}body.docente .tnotes{display:none!important}body.docente .docread{display:block;padding:8px 7vw 80px;max-width:820px}body:not(.docente) .docread{display:none!important}body.docente .docread .lab{font:11px Helvetica,Arial,sans-serif;letter-spacing:.14em;text-transform:uppercase;color:#d4b483;margin:18px 0 8px}body.docente .docread p{font:18px/1.65 Helvetica,Arial,sans-serif;color:#eadcc4;margin:0 0 14px}#voice,.say,.sub{display:none!important}#tr{display:inline-block!important}";
document.head.appendChild(st);}
var hb=document.querySelector(".controls");
if(hb&&!document.getElementById("projBtn")){
var b=document.createElement("button");b.id="projBtn";b.textContent=isDoc?"Proiettore":"Docente";hb.insertBefore(b,hb.firstChild);
b.onclick=function(){if(isDoc)window.open(location.href.replace(/[?&]docente=1/g,""),"fsf_class");else location.href=location.href.split("?")[0]+"?docente=1";};
}
function paint(){
if(!isDoc)return;
var slide=document.querySelector(".slide.on");if(!slide)return;
var k=slide.querySelector(".k");
var rec=window.TEACHER_NOTES&&window.TEACHER_NOTES[k?k.textContent.trim():""];
var box=slide.querySelector(".docread");
if(!box){box=document.createElement("div");box.className="docread";slide.appendChild(box);}
if(!rec){box.innerHTML="";return;}
var it=typeof rec==="string"?rec:rec.it;
var en=typeof rec==="string"?rec:rec.en;
function paras(s){return (s||"").split(/(?<=\.)\s+/).filter(Boolean).map(function(x){return "<p>"+x+"</p>";}).join("");}
var on=document.body.classList.contains("en");
box.innerHTML=on?('<div class="lab">Read · English</div>'+paras(en)):('<div class="lab">Da leggere · Italiano</div>'+paras(it));
}
setInterval(paint,300);paint();
})();
