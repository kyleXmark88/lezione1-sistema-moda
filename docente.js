(function(){
var isDoc=/teacher\.html/i.test(location.pathname)||document.body.classList.contains("docente");
if(isDoc) document.body.classList.add("docente","en");
else document.body.classList.add("en");
var lang="en";
var TERMS={
"Cap. 0":"system · naming · institution",
"Cap. 1":"name · city · magazine",
"Cap. 2":"role · research · composition",
"Cap. 3":"real / image / written garment",
"Cap. 4":"clothing ≠ fashion · institutions",
"Cap. 5":"make · deliver · pay",
"Cap. 6":"interpreter, not designer",
"Cap. 7":"editorial · ads · celebrity · e-com · runway",
"Cap. 8":"who · magazine · season · thesis · credit",
"Cap. 9":"fad ≠ trend · filter · till",
"Cap. 10":"NY · London · Milan · Paris",
"Cap. 11":"victim or interpreter",
"Cap. 12":"Wintour cuts · Coddington builds",
"Cap. 13":"brief · Knight · brow",
"Cap. 14":"cover = institution",
"Cap. 15":"show ≠ calendar",
"Cap. 16":"name · pose · thesis",
"Cap. 17":"Vogue certifies · i-D documents",
"Cap. 18":"which lever",
"Cap. 19":"object · image · institution",
"Cap. T":"three authors"
};
var tr=document.getElementById("tr");
if(tr){
 tr.onclick=function(){
  lang=lang==="en"?"it":"en";
  document.body.classList.toggle("en",lang==="en");
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
if(!isDoc){
 box.innerHTML='<div class="lab">Note</div><p>'+(TERMS[key]||"")+'</p>';
 return;
}
var txt="";
if(rec) txt=typeof rec==="string"?rec:(lang==="it"?(rec.it||rec.en):(rec.en||rec.it));
box.innerHTML='<div class="lab">'+(lang==="it"?"Da leggere":"Read")+'</div>'+(txt?paras(txt):"");
}
setInterval(paint,300);
paint();
})();
