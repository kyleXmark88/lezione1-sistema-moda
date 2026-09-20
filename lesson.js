(function(){
var WM=function(f){return "https://commons.wikimedia.org/wiki/Special:FilePath/"+encodeURIComponent(f)+"?width=1400";};
var US=function(id){return "https://images.unsplash.com/"+id+"?auto=format&fit=crop&w=1400&q=70";};
var IMG={milano:WM("Milan_Fashion_Week_2.jpg"), milano2:WM("Fashion_Week_Milano_2013.jpg"), armani:WM("Chiara_Ferragni_-_Giorgio_Armani_Show_-_Milan_Fashion_Week_-_23_Sept._2013.jpg"), run:US("photo-1509631179647-0177331693ae"), street:US("photo-1483985988355-763728e1935b"), edit:US("photo-1469334031218-e382a71b716b"), look:US("photo-1529139574466-a303027c1d8b"), rack:US("photo-1558171813-4c088753af8f"), mag:US("photo-1544441893-675973e31985"), mood:US("photo-1558769132-cb1aea458c5e"), model:US("photo-1515886657613-9f3515b0c78f")};
function hero(src){return '<div class="hero"><img alt="" src="'+src+'" onerror="this.src=\''+IMG.run+'\'"></div>';}
function refs(a){return '<div class="refs">'+a.map(function(s){return '<img alt="" src="'+s+'" onerror="this.style.display=\'none\'">';}).join("")+'</div>';}
var slides=window.LESSON_SLIDES;
if(!slides){
 slides=[];
}
})();
