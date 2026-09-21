(function(){
var isDoc=/[?&]docente=1/.test(location.search);
if(isDoc)document.body.classList.add("docente");
var voice=document.getElementById("voice");
if(voice)voice.style.display="none";
if(!document.querySelector("style#docstyle")){
var st=document.createElement("style");st.id="docstyle";
st.textContent=".tnotes{display:none}body.docente .tnotes{display:block;position:fixed;right:0;top:48px;bottom:40px;width:min(360px,38vw);background:#120e0a;border-left:1px solid #3a3224;padding:14px;overflow:auto;z-index:25;font:15px/1.5 Helvetica,Arial,sans-serif;color:#eadcc4}body.docente main{margin-right:min(360px,38vw)}.tnotes .lab{font:11px Helvetica,Arial,sans-serif;letter-spacing:.12em;text-transform:uppercase;color:#d4b483;margin:12px 0 6px}.tnotes .lab:first-child{margin-top:0}.vid{position:relative;padding-top:56.25%;margin:14px 0;background:#111}.vid iframe{position:absolute;inset:0;width:100%;height:100%;border:0}#voice,.say{display:none!important}";
document.head.appendChild(st);}
if(!document.getElementById("tnotes")){var a=document.createElement("aside");a.id="tnotes";a.className="tnotes";document.body.appendChild(a);}
var hb=document.querySelector(".controls");
if(hb&&!document.getElementById("projBtn")){var b=document.createElement("button");b.id="projBtn";b.textContent=isDoc?"Proiettore":"Docente";hb.insertBefore(b,hb.firstChild);b.onclick=function(){if(isDoc)window.open(location.href.replace(/[?&]docente=1/g,""),"fsf_class");else location.href=location.href.split("?")[0]+"?docente=1";};}
function paint(){var box=document.getElementById("tnotes");if(!box)return;var k=document.querySelector(".slide.on .k");var rec=k&&window.TEACHER_NOTES&&window.TEACHER_NOTES[k.textContent.trim()];if(!rec){box.textContent="";return;}if(typeof rec==="string"){box.textContent=rec;return;}box.innerHTML='<div class="lab">Italiano</div><p>'+rec.it+'</p><div class="lab">English</div><p>'+rec.en+'</p>';}
setInterval(paint,400);paint();
})();
