(function(){
var WM=function(f){return "https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(f)+"?width=1400";};
var US=function(id){return "https://images.unsplash.com/"+id+"?auto=format&fit=crop&w=1400&q=70";};
var IMG={milano:WM("Milan_Fashion_Week_2.jpg"), milano2:WM("Fashion_Week_Milano_2013.jpg"), armani:WM("Chiara_Ferragni_-_Giorgio_Armani_Show_-_Milan_Fashion_Week_-_23_Sept._2013.jpg"), run:US("photo-1509631179647-0177331693ae"), street:US("photo-1483985988355-763728e1935b"), edit:US("photo-1469334031218-e382a71b716b"), look:US("photo-1529139574466-a303027c1d8b"), rack:US("photo-1558171813-4c088753af8f"), mag:US("photo-1544441893-675973e31985"), mood:US("photo-1558769132-cb1aea458c5e"), model:US("photo-1515886657613-9f3515b0c78f")};
function hero(src){return '<div class="hero"><img alt="" src="'+src+'" onerror="this.src=\''+IMG.run+'\'"></div>';}
function refs(a){return '<div class="refs">'+a.map(function(s){return '<img alt="" src="'+s+'" onerror="this.style.display=\'none\'">';}).join("")+'</div>';}
var slides=[].concat(window.P0(hero,refs,IMG),window.P1(hero,refs,IMG),window.P2(hero,refs,IMG),window.P3(hero,refs,IMG));
var deck=document.getElementById("deck"),toc=document.getElementById("toc");
slides.forEach(function(s,n){
  var el=document.createElement("section");
  el.className="slide";
  el.innerHTML='<div class="pad" style="padding-bottom:0"><div class="k">'+s.k+'</div><h2 class="it">'+s.it+'</h2><h2 class="en">'+s.en+'</h2></div>'+s.html;
  deck.appendChild(el);
  var b=document.createElement("button");
  b.innerHTML="<small>"+s.k+"</small>"+s.it;
  b.onclick=function(){goTo(n);document.getElementById("home").classList.add("hide");startPad();};
  toc.appendChild(b);
});
var els=[].slice.call(document.querySelectorAll(".slide")),n=els.length,i=0,en=false,voiceOn=false,sndOn=true,musicOn=true,actx=null,pad=null,tInt=null,left=0;
function talk(){return slides[i].talk;}
function ctx(){actx=actx||new(window.AudioContext||window.webkitAudioContext)();if(actx.state==="suspended")actx.resume();return actx;}
function tone(f){if(!sndOn)return;try{var c=ctx(),o=c.createOscillator(),a=c.createGain();o.frequency.value=f;a.gain.value=.03;o.connect(a);a.connect(c.destination);o.start();a.gain.exponentialRampToValueAtTime(.001,c.currentTime+.12);o.stop(c.currentTime+.14);}catch(e){}}
function startPad(){if(pad||!musicOn)return;try{var c=ctx(),master=c.createGain();master.gain.value=0.0001;master.connect(c.destination);master.gain.linearRampToValueAtTime(0.09,c.currentTime+1.2);var beat=60/108,nodes=[];var pg=c.createGain();pg.gain.value=0.035;pg.connect(master);[110,165,220].forEach(function(fq,k){var o=c.createOscillator();o.type=k===1?"triangle":"sine";o.frequency.value=fq;o.connect(pg);o.start();nodes.push(o);});function kick(t){var o=c.createOscillator(),g=c.createGain();o.frequency.setValueAtTime(88,t);o.frequency.exponentialRampToValueAtTime(40,t+.16);g.gain.setValueAtTime(.45,t);g.gain.exponentialRampToValueAtTime(.001,t+.2);o.connect(g);g.connect(master);o.start(t);o.stop(t+.22);}function hat(t){var o=c.createOscillator(),g=c.createGain(),f=c.createBiquadFilter();o.type="square";o.frequency.value=6800;f.type="highpass";f.frequency.value=5500;g.gain.setValueAtTime(.025,t);g.gain.exponentialRampToValueAtTime(.001,t+.04);o.connect(f);f.connect(g);g.connect(master);o.start(t);o.stop(t+.05);}function sched(from){for(var x=0;x<32;x++){var t=from+x*beat;kick(t);if(x%2)hat(t);}}sched(c.currentTime+.05);var iv=setInterval(function(){if(!pad||!musicOn){clearInterval(iv);return;}sched(c.currentTime+.05);},32*beat*1000);pad={g:master,nodes:nodes,iv:iv};}catch(e){}}
function stopPad(){if(!pad)return;try{if(pad.iv)clearInterval(pad.iv);pad.g.gain.linearRampToValueAtTime(.0001,ctx().currentTime+.4);}catch(e){}pad=null;}
function speak(){if(!voiceOn||!speechSynthesis)return;speechSynthesis.cancel();var u=new SpeechSynthesisUtterance(talk());u.lang="en-GB";u.rate=.95;speechSynthesis.speak(u);}
function render(){els.forEach(function(s,k){s.classList.toggle("on",k===i)});document.getElementById("counter").textContent=(i+1)+" / "+n;document.getElementById("subtxt").textContent=talk();if(voiceOn)speak();}
function goTo(x){i=Math.max(0,Math.min(n-1,x));render();}
function go(d){goTo(i+d);tone(d>0?440:320);}
document.getElementById("startBtn").onclick=function(){document.getElementById("home").classList.add("hide");els[0].classList.add("on");startPad();tone(520);};
document.getElementById("homeBtn").onclick=function(){document.getElementById("home").classList.remove("hide");document.getElementById("help").classList.add("hide");};
document.getElementById("helpBtn").onclick=function(){document.getElementById("help").classList.remove("hide");};
document.getElementById("helpClose").onclick=function(){document.getElementById("help").classList.add("hide");};
document.getElementById("tr").onclick=function(){en=!en;document.body.classList.toggle("en",en);this.classList.toggle("on",en);this.textContent=en?"Traduttore ON":"Traduttore LIVE";};
document.getElementById("voice").onclick=function(){voiceOn=!voiceOn;this.classList.toggle("on",voiceOn);if(voiceOn)speak();else if(speechSynthesis)speechSynthesis.cancel();};
document.getElementById("snd").onclick=function(){sndOn=!sndOn;this.classList.toggle("on",sndOn);};
document.getElementById("music").onclick=function(){musicOn=!musicOn;this.classList.toggle("on",musicOn);this.textContent=musicOn?"Musica":"Musica off";if(musicOn)startPad();else stopPad();};
document.getElementById("prev").onclick=function(){go(-1)};
document.getElementById("next").onclick=function(){go(1)};
document.getElementById("fs").onclick=function(){if(!document.fullscreenElement)document.documentElement.requestFullscreen().catch(function(){});else document.exitFullscreen();};
document.addEventListener("keydown",function(e){if(e.key==="ArrowRight"||e.key===" "){e.preventDefault();go(1)}if(e.key==="ArrowLeft")go(-1);});
document.addEventListener("click",function(){var a=document.getElementById("t25");if(!a||a._ok)return;a._ok=1;var b=document.getElementById("t3"),c=document.getElementById("tstop");function fmt(s){return Math.floor(s/60)+":"+("0"+(s%60)).slice(-2)}function tick(){left--;document.getElementById("timer").textContent=fmt(Math.max(0,left));if(left<=0){clearInterval(tInt);document.getElementById("timer").textContent="TEMPO";}}a.onclick=function(){clearInterval(tInt);left=1500;tInt=setInterval(tick,1000)};b.onclick=function(){clearInterval(tInt);left=180;tInt=setInterval(tick,1000)};c.onclick=function(){clearInterval(tInt);document.getElementById("timer").textContent="";};},true);
document.addEventListener("submit",function(e){if(e.target.id!=="quiz")return;e.preventDefault();var ok=0;["q1","q2","q3","q4","q5","q6","q7","q8"].forEach(function(nm){var nodes=document.querySelectorAll("input[name="+nm+"]");var sel=[].filter.call(nodes,function(x){return x.checked})[0];[].forEach.call(nodes,function(inp){inp.parentElement.classList.remove("good","bad");if(inp.value==="1")inp.parentElement.classList.add("good");if(sel===inp&&inp.value!=="1")inp.parentElement.classList.add("bad");});if(sel&&sel.value==="1")ok++;});document.getElementById("result").style.display="block";document.getElementById("result").textContent=ok+"/8";},true);
render();
})();
