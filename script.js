/* --- Script block 0 --- */
(function(){var r=document.documentElement,tg=document.getElementById("tg"),mn=document.getElementById("mn"),nv=document.getElementById("nv");
tg.addEventListener("click",function(){var c=r.getAttribute("data-theme");var dark=c?c==="dark":window.matchMedia("(prefers-color-scheme: dark)").matches;r.setAttribute("data-theme",dark?"light":"dark")});
mn.addEventListener("click",function(){var o=nv.classList.toggle("open");mn.setAttribute("aria-expanded",o?"true":"false")});
nv.addEventListener("click",function(e){if(e.target.tagName==="A"){nv.classList.remove("open");mn.setAttribute("aria-expanded","false")}});
})();

/* --- Script block 1 --- */
(function(){try{document.querySelectorAll('main table').forEach(function(t){if(t.closest('.scroll'))return;var d=document.createElement('div');d.className='scroll';d.setAttribute('role','region');d.setAttribute('aria-label','টেবিল (স্ক্রল করুন)');t.parentNode.insertBefore(d,t);d.appendChild(t);});}catch(e){}})();
