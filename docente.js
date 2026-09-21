(function(){
var isDoc=/[?&]docente=1/.test(location.search);
if(isDoc)document.body.classList.add("docente");
if(!document.querySelector("style#docstyle")){
var st=document.createElement("style");st.id="docstyle";st.textContent=".tnotes{display:none}body.docente .tnotes{display:block;position:fixed;right:0;top:48px;bottom:40px;width:min(340px,36vw);background:#120e0a;border-left:1px solid #3a3224;padding:14px;overflow:auto;z-index:25;font:16px/1.5 Helvetica,Arial,sans-serif;color:#eadcc4}body.docente main{margin-right:min(340px,36vw)}";document.head.appendChild(st);
}
if(!document.getElementById("tnotes")){var a=document.createElement("aside");a.id="tnotes";a.className="tnotes";document.body.appendChild(a);}
var hb=document.querySelector(".controls");
if(hb&&!document.getElementById("projBtn")){
var b=document.createElement("button");b.id="projBtn";b.textContent=isDoc?"Proiettore":"Docente";hb.insertBefore(b,hb.firstChild);
b.onclick=function(){if(isDoc){var u=location.href.replace(/[?&]docente=1/g,"");window.open(u,"fsf_class");}else location.href=location.href.split("?")[0]+"?docente=1";};
}
function paint(){var box=document.getElementById("tnotes");if(!box)return;var k=document.querySelector(".slide.on .k");box.textContent=(k&&window.TEACHER_NOTES&&window.TEACHER_NOTES[k.textContent.trim()])||"";}
setInterval(paint,400);paint();
})();
