
(function(){
var sp=document.getElementById("sp"),sq=document.getElementById("sq"),sr=document.getElementById("sr"),sn=document.getElementById("sn"),sb=document.getElementById("sb"),sx=document.getElementById("sx");
if(!sp||!sb)return;
var D={"০":"0","১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","ূ":"ু","ী":"ি"};
function clean(t){return(t||"").normalize("NFC").replace(/[\u200c\u200d]/g,"").replace(/\s+/g," ")}
function nm(t){var o="";for(var i=0;i<t.length;i++){var c=t.charAt(i);o+=D[c]||c.toLowerCase()}return o}
var idx=null,last=-1,on=-1,currentPage=location.pathname.split("/").pop()||"index.html";
function loadIndex(cb){
 if(idx){cb();return}
 var x=new XMLHttpRequest();
 x.open("GET","search-index.json",true);
 x.onload=function(){
  try{
   var data=JSON.parse(x.responseText);
   idx=data.map(function(e){
    return{id:e.id,title:e.title,tn:nm(e.title),text:e.text||"",tx:nm(e.text||""),tag:e.label||"",page:e.page||"index.html",sec:e.is_section||false,order:0}
   });
  }catch(err){idx=[]}
  cb();
 };
 x.onerror=function(){idx=[];cb()};
 x.send();
}
function esc(s){return s.replace(/[&<>\""]/g,function(c){return{"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
function hl(raw,norm,terms){
 var iv=[];
 terms.forEach(function(t){var p=0;while((p=norm.indexOf(t,p))>-1){iv.push([p,p+t.length]);p+=t.length}});
 iv.sort(function(a,b){return a[0]-b[0]});
 var m=[];iv.forEach(function(x){if(m.length&&x[0]<=m[m.length-1][1])m[m.length-1][1]=Math.max(m[m.length-1][1],x[1]);else m.push(x.slice())});
 var o="",p=0;m.forEach(function(x){o+=esc(raw.slice(p,x[0]))+"<mark>"+esc(raw.slice(x[0],x[1]))+"</mark>";p=x[1]});
 return o+esc(raw.slice(p));
}
function run(){
 var q=nm(clean(sq.value)).trim();
 sr.innerHTML="";on=-1;
 if(!q){sn.textContent="লেখকের নাম, বইয়ের নাম বা সাল লিখে খুঁজুন।";return}
 loadIndex(function(){
  var terms=q.split(" ").filter(Boolean),res=[];
  idx.forEach(function(e){
   var inT=terms.every(function(t){return e.tn.indexOf(t)>-1});
   var inX=inT||terms.every(function(t){return e.tx.indexOf(t)>-1});
   if(!inX)return;
   var sc=inT?(e.tn.indexOf(terms[0])===0?4:3):1;
   if(e.sec)sc+=0.5;
   res.push({e:e,sc:sc,inT:inT});
  });
  res.sort(function(a,b){return b.sc-a.sc||a.e.order-b.e.order});
  var tot=res.length;res=res.slice(0,40);
  if(!tot){sn.textContent="\""+sq.value.trim()+"\" এর জন্য কিছু পাওয়া যায়নি। অন্য বানানে চেষ্টা করুন।";return}
  sn.textContent=tot+"টি ফল"+(tot>40?" (প্রথম ৪০টি দেখানো হচ্ছে)":"");
  var html="";
  res.forEach(function(r){
   var e=r.e,sn2="",isSamePage=(e.page===currentPage);
   var pos=-1;for(var k=0;k<terms.length&&pos<0;k++){var p=e.tx.indexOf(terms[k]);if(p>-1)pos=p}
   var from=Math.max(0,pos-35),to=Math.min(e.text.length,pos+95);
   if(r.inT&&pos<0)from=0;
   if(from>0){var sp1=e.text.indexOf(" ",from);if(sp1>-1&&sp1<pos)from=sp1+1}
   if(to<e.text.length){var sp2=e.text.indexOf(" ",to);if(sp2>-1&&sp2<to+25)to=sp2}
   var seg=e.text.slice(from,to),segn=e.tx.slice(from,to);
   sn2='<span class="ss">'+(from>0?"… ":"")+hl(seg,segn,terms)+(to<e.text.length?" …":"")+"</span>";
   var href=isSamePage?"#"+e.id:e.page+"#"+e.id;
   var pageTag=e.tag?'<span class="sg">'+esc(e.tag)+"</span>":"";
   html+='<li><a href="'+href+'" data-id="'+e.id+'" data-page="'+e.page+'"><span class="st">'+hl(e.title,e.tn,terms)+"</span>"+pageTag+sn2+"</a></li>";
  });
  sr.innerHTML=html;
 });
}
function openP(){
 sp.classList.add("open");sp.setAttribute("aria-hidden","false");sb.setAttribute("aria-expanded","true");
 document.documentElement.style.overflow="hidden";
 setTimeout(function(){sq.focus();sq.select()},30);
}
function closeP(){
 sp.classList.remove("open");sp.setAttribute("aria-hidden","true");sb.setAttribute("aria-expanded","false");
 document.documentElement.style.overflow="";
}
function go(id,page){
 closeP();
 if(page&&page!==currentPage){
  window.location.href=page+"#"+id;
  return;
 }
 var el=document.getElementById(id);if(!el)return;
 var d=el.closest("details");while(d){d.open=true;d=d.parentElement&&d.parentElement.closest("details")}
 setTimeout(function(){
  el.scrollIntoView({behavior:"smooth",block:"start"});
  if(history.replaceState)history.replaceState(null,"","#"+id);
  el.classList.remove("sflash");void el.offsetWidth;el.classList.add("sflash");
 },30);
}
sb.addEventListener("click",function(){sp.classList.contains("open")?closeP():openP()});
sx.addEventListener("click",function(){if(sq.value){sq.value="";run();sq.focus()}else closeP()});
sp.addEventListener("click",function(e){if(e.target===sp)closeP()});
sq.addEventListener("input",run);
sr.addEventListener("click",function(e){
 var a=e.target.closest("a[data-id]");
 if(a){
  e.preventDefault();
  go(a.getAttribute("data-id"),a.getAttribute("data-page"));
 }
});
function mark(n){var as=sr.querySelectorAll("a");if(!as.length)return;if(on>-1)as[on].classList.remove("on");on=(n+as.length)%as.length;as[on].classList.add("on");as[on].scrollIntoView({block:"nearest"})}
document.addEventListener("keydown",function(e){
 var t=e.target,typing=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable);
 if(e.key==="Escape"&&sp.classList.contains("open")){closeP();sb.focus();return}
 if(e.key==="/"&&!typing&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();openP();return}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openP();return}
 if(!sp.classList.contains("open"))return;
 if(e.key==="ArrowDown"){e.preventDefault();mark(on+1)}
 else if(e.key==="ArrowUp"){e.preventDefault();mark(on<0?-1:on-1)}
 else if(e.key==="Enter"&&t===sq){var as=sr.querySelectorAll("a");var a=as[on>-1?on:0];if(a){e.preventDefault();go(a.getAttribute("data-id"),a.getAttribute("data-page"))}}
});
})();
