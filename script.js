/* --- Script block 0 --- */
(function(){var r=document.documentElement,tg=document.getElementById("tg"),mn=document.getElementById("mn"),nv=document.getElementById("nv");
tg.addEventListener("click",function(){var c=r.getAttribute("data-theme");var dark=c?c==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;r.setAttribute("data-theme",dark?"light":"dark")});
mn.addEventListener("click",function(){var o=nv.classList.toggle("open");mn.setAttribute("aria-expanded",o?"true":"false")});
nv.addEventListener("click",function(e){if(e.target.tagName==="A"){nv.classList.remove("open");mn.setAttribute("aria-expanded","false")}});
})();

/* --- Script block 1 --- */
(function(){try{document.querySelectorAll('main table').forEach(function(t){if(t.closest('.scroll'))return;var d=document.createElement('div');d.className='scroll';d.setAttribute('role','region');d.setAttribute('aria-label','টেবিল (স্ক্রল করুন)');t.parentNode.insertBefore(d,t);d.appendChild(t);});}catch(e){}})();

/* --- Script block 2 --- */
(function(){function c(){var b=a.contentDocument||(a.contentWindow&&a.contentWindow.document);if(b){var d=b.createElement('script');d.innerHTML="window.__CF$cv$params={r:'a5e1ca765af4b42c',t:'MTc5NTI4NjA5MQ=='};var l=window.parent.location,o;try{o=new URL(l.origin).origin}catch(e){try{o=new URL(new URL(l.href).origin).origin}catch(e){o=''}}var u='/cdn-cgi/challenge-platform/scripts/jsd/main.js?ray=a5e1ca765af4b42c',a=document.createElement('script');a.src=o?new URL(u,o).href:u;document.getElementsByTagName('head')[0].appendChild(a);";b.getElementsByTagName('head')[0].appendChild(d)}}if(document.body){var a=document.createElement('iframe');a.height=1;a.width=1;a.style.position='absolute';a.style.top=0;a.style.left=0;a.style.border='none';a.style.visibility='hidden';document.body.appendChild(a);if('loading'!==document.readyState)c();else if(window.addEventListener)document.addEventListener('DOMContentLoaded',c);else{var e=document.onreadystatechange||function(){};document.onreadystatechange=function(b){e(b);'loading'!==document.readyState&&(document.onreadystatechange=e,c())}}}})();

/* --- Script block 3 --- */
(function(){
var sp=document.getElementById("sp"),sq=document.getElementById("sq"),sr=document.getElementById("sr"),sn=document.getElementById("sn"),sb=document.getElementById("sb"),sx=document.getElementById("sx");
if(!sp||!sb)return;
var D={"০":"0","১":"1","২":"2","৩":"3","৪":"4","৫":"5","৬":"6","৭":"7","৮":"8","৯":"9","ূ":"ু","ী":"ি"};
function clean(t){return (t||"").normalize("NFC").replace(/[\u200c\u200d]/g,"").replace(/\s+/g," ")}
function nm(t){var o="";for(var i=0;i<t.length;i++){var c=t.charAt(i);o+=D[c]||c.toLowerCase()}return o}
var idx=null,last=-1,on=-1;
function eraOf(el){var sec=el.closest("section.era");if(!sec)return "";var h=sec.querySelector("h2");var id=sec.id;return id==="anc"?"প্রাচীন যুগ":id==="med"?"মধ্যযুগ":id==="mod"?"আধুনিক যুগ":(h?clean(h.textContent):"")}
function build(){
 idx=[];var pend=[];
 var els=document.querySelectorAll("main article[id], main section[id]");
 for(var i=0;i<els.length;i++){
  var el=els[i],isSec=el.tagName==="SECTION",h=el.querySelector(isSec?"h2":"h3")||el.querySelector("h2,h3,h4");
  var title=clean(h?h.textContent:"").replace(/^★\s*/,"");
  if(!title)continue;
  var text=isSec?title:btext(el);
  var tag=isSec?"অংশ":(function(){var e=eraOf(el);var bm=el.querySelector(".birthmeta");return e})();
  var ent={id:el.id,title:title,tn:nm(title),text:text,tx:nm(text),tag:tag,sec:isSec,order:i};
  if(/^original-scan-author-/.test(el.id)){pend.push(ent)}else idx.push(ent);
 }
 pend.forEach(function(o){
  var m=null;for(var j=0;j<idx.length;j++){if(!idx[j].sec&&(idx[j].tn===o.tn||idx[j].tn.indexOf(o.tn)>-1||o.tn.indexOf(idx[j].tn)>-1)){m=idx[j];break}}
  if(m){m.text+=" "+o.text;m.tx+=" "+o.tx}else idx.push(o);
 });
}
var BLK={P:1,LI:1,TD:1,TH:1,DIV:1,H1:1,H2:1,H3:1,H4:1,H5:1,UL:1,TR:1,ARTICLE:1,SECTION:1,SUMMARY:1,DETAILS:1};
function blk(n){while(n&&!BLK[n.tagName])n=n.parentElement;return n}
function btext(el){
 var w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT,null),o="",pb=null,n;
 while(n=w.nextNode()){
  var pt=n.parentElement;if(pt&&(pt.tagName==="SCRIPT"||pt.tagName==="STYLE"))continue;
  var b=blk(pt);if(pb&&b!==pb&&o&&o.charAt(o.length-1)!==" ")o+=" ";pb=b;o+=n.nodeValue;
 }
 return clean(o);
}
function esc(s){return s.replace(/[&<>"]/g,function(c){return {"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;"}[c]})}
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
 if(!idx)build();
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
 if(!tot){sn.textContent="“"+sq.value.trim()+"” এর জন্য কিছু পাওয়া যায়নি। অন্য বানানে চেষ্টা করুন।";return}
 sn.textContent=tot+"টি ফল"+(tot>40?" (প্রথম ৪০টি দেখানো হচ্ছে)":"");
 var html="";
 res.forEach(function(r){
  var e=r.e,sn2="";
  if(!e.sec){
   var pos=-1;for(var k=0;k<terms.length&&pos<0;k++){var p=e.tx.indexOf(terms[k]);if(p>-1)pos=p}
   var from=Math.max(0,pos-35),to=Math.min(e.text.length,pos+95);
   if(r.inT&&pos<0)from=0;
   if(from>0){var sp1=e.text.indexOf(" ",from);if(sp1>-1&&sp1<pos)from=sp1+1}
   if(to<e.text.length){var sp2=e.text.indexOf(" ",to);if(sp2>-1&&sp2<to+25)to=sp2}
   var seg=e.text.slice(from,to),segn=e.tx.slice(from,to);
   sn2='<span class="ss">'+(from>0?"… ":"")+hl(seg,segn,terms)+(to<e.text.length?" …":"")+"</span>";
  }
  html+='<li><a href="#'+e.id+'" data-id="'+e.id+'"><span class="st">'+hl(e.title,e.tn,terms)+"</span>"+(e.tag?'<span class="sg">'+esc(e.tag)+"</span>":"")+sn2+"</a></li>";
 });
 sr.innerHTML=html;
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
function go(id){
 var el=document.getElementById(id);closeP();if(!el)return;
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
sr.addEventListener("click",function(e){var a=e.target.closest("a[data-id]");if(a){e.preventDefault();go(a.getAttribute("data-id"))}});
function mark(n){var as=sr.querySelectorAll("a");if(!as.length)return;if(on>-1)as[on].classList.remove("on");on=(n+as.length)%as.length;as[on].classList.add("on");as[on].scrollIntoView({block:"nearest"})}
document.addEventListener("keydown",function(e){
 var t=e.target,typing=t&&(t.tagName==="INPUT"||t.tagName==="TEXTAREA"||t.isContentEditable);
 if(e.key==="Escape"&&sp.classList.contains("open")){closeP();sb.focus();return}
 if(e.key==="/"&&!typing&&!e.ctrlKey&&!e.metaKey&&!e.altKey){e.preventDefault();openP();return}
 if((e.ctrlKey||e.metaKey)&&e.key.toLowerCase()==="k"){e.preventDefault();openP();return}
 if(!sp.classList.contains("open"))return;
 if(e.key==="ArrowDown"){e.preventDefault();mark(on+1)}
 else if(e.key==="ArrowUp"){e.preventDefault();mark(on<0?-1:on-1)}
 else if(e.key==="Enter"&&t===sq){var as=sr.querySelectorAll("a");var a=as[on>-1?on:0];if(a){e.preventDefault();go(a.getAttribute("data-id"))}}
});
})();