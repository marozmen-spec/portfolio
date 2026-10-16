(()=>{
 const backdrop=document.createElement('div');backdrop.className='network-backdrop';backdrop.setAttribute('aria-hidden','true');const canvas=document.createElement('canvas');backdrop.append(canvas);document.body.prepend(backdrop);const ctx=canvas.getContext('2d');if(!ctx){backdrop.remove();return}
 const route=document.createElement('div');route.className='network-route';route.setAttribute('aria-hidden','true');document.querySelector('main').prepend(route);
 const status=document.createElement('div');status.className='network-status';status.innerHTML='<i aria-hidden="true"></i>ПРОДУКТ · ПАРТНЁРЫ · КОМАНДА · РЕЗУЛЬТАТ';document.querySelector('.hero-top').after(status);
 const button=document.createElement('button');button.type='button';button.className='network-mode';button.setAttribute('aria-label','Приостановить движение фоновой сети');button.setAttribute('aria-pressed','false');button.textContent='Сеть: движение ⏸';document.body.append(button);
 const reduced=matchMedia('(prefers-reduced-motion: reduce)');let paused=reduced.matches,w=0,h=0,points=[],edges=[],frame=0,last=0,time=0;let seed=71;function rand(){seed=(seed*16807)%2147483647;return(seed-1)/2147483646}
 function resize(){w=innerWidth;h=innerHeight;const ratio=Math.min(devicePixelRatio||1,2);canvas.width=Math.round(w*ratio);canvas.height=Math.round(h*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);seed=71;const count=w<600?22:42;points=Array.from({length:count},(_,i)=>({x:rand()*w,y:rand()*h,phase:rand()*Math.PI*2,r:i%8===0?3:1.6}));edges=[];points.forEach((p,i)=>{const nearest=points.map((q,j)=>({j,d:Math.hypot(p.x-q.x,p.y-q.y)})).filter(n=>n.j!==i).sort((a,b)=>a.d-b.d).slice(0,2);nearest.forEach(n=>{if(n.j>i)edges.push([i,n.j,rand()])})});draw()}
 // Decorative synthetic streams, not portfolio metrics or live collected data.
 function drawData(){
  const mobile=w<600,band=mobile?48:Math.min(165,w*.13),columns=mobile?4:10;
  ctx.save();ctx.textBaseline='top';
  for(let i=0;i<columns;i++){
   const side=i%2,slot=Math.floor(i/2),x=side?w-18-slot*(band/(columns/2)):12+slot*(band/(columns/2));
   const speed=9+(i%4)*4,cycle=h+360,head=((time*speed+i*137)%cycle)-180;
   ctx.font=`${i%3===0?10:8}px monospace`;
   for(let j=0;j<15;j++){
    const y=head-j*17;if(y<-20||y>h+20)continue;
    const alpha=(1-j/16)*(mobile?.15:.21),digit=(i*37+j*13+Math.floor(time*.8))%10;
    ctx.fillStyle=`rgba(167,190,126,${alpha})`;ctx.fillText(String(digit),x,y);
   }
  }
  const labels=['01 / SIGNAL','SYNC · 001','DATA / 010','FLOW · 101'];
  for(let i=0;i<(mobile?2:4);i++){
   const side=i%2,x=side?w-band+8:12,y=(h*(.18+i*.21)+time*(i%2?3:-3)+h)%h;
   ctx.font='8px monospace';ctx.fillStyle='rgba(182,201,148,.23)';ctx.fillText(labels[i],x,y);
   ctx.strokeStyle='rgba(160,188,119,.18)';ctx.lineWidth=.7;ctx.beginPath();
   const width=mobile?28:65;for(let k=0;k<14;k++){const px=x+k*width/13,py=y+30-Math.sin(k*.9+time*.3+i)*6-k*.45;k?ctx.lineTo(px,py):ctx.moveTo(px,py)}ctx.stroke();
   for(let k=0;k<6;k++){const height=6+Math.abs(Math.sin(k+i+time*.15))*13;ctx.fillStyle=`rgba(167,190,126,${.08+k*.012})`;ctx.fillRect(x+k*7,y+55-height,4,height)}
  }
  // Fine data packets along the upper/lower edges leave the reading area quiet.
  ctx.font='8px monospace';for(let i=0;i<(mobile?3:8);i++){const x=(i*w/(mobile?3:8)+time*5)%(w+100)-50;ctx.fillStyle='rgba(165,189,125,.13)';ctx.fillText(((i*719+Math.floor(time))%10000).toString().padStart(4,'0'),x,i%2? h-25:18)}
  ctx.restore();
 }
 function draw(){ctx.clearRect(0,0,w,h);drawData();const pos=points.map(p=>({x:p.x+Math.sin(time*.15+p.phase)*10,y:p.y+Math.cos(time*.12+p.phase)*8}));ctx.lineWidth=.65;edges.forEach(([a,b,phase])=>{const p=pos[a],q=pos[b];ctx.strokeStyle='rgba(155,181,116,.18)';ctx.beginPath();ctx.moveTo(p.x,p.y);ctx.lineTo(q.x,q.y);ctx.stroke();const t=(time*.055+phase)%1,x=p.x+(q.x-p.x)*t,y=p.y+(q.y-p.y)*t;const glow=ctx.createRadialGradient(x,y,0,x,y,10);glow.addColorStop(0,'rgba(208,227,167,.48)');glow.addColorStop(1,'rgba(208,227,167,0)');ctx.fillStyle=glow;ctx.fillRect(x-10,y-10,20,20);ctx.fillStyle='rgba(215,232,180,.7)';ctx.beginPath();ctx.arc(x,y,1.4,0,Math.PI*2);ctx.fill()});pos.forEach((p,i)=>{ctx.fillStyle=i%8===0?'rgba(207,224,172,.55)':'rgba(151,177,112,.35)';ctx.beginPath();ctx.arc(p.x,p.y,points[i].r,0,Math.PI*2);ctx.fill()})}
 function tick(now){frame=0;if(paused||document.hidden)return;if(now-last>32){time+=Math.min((now-last)/1000,.05);last=now;draw()}frame=requestAnimationFrame(tick)}
 function sync(){document.body.classList.toggle('network-paused',paused);button.textContent=paused?'Сеть: движение ▶':'Сеть: движение ⏸';button.setAttribute('aria-pressed',String(paused));button.setAttribute('aria-label',paused?'Включить движение фоновой сети':'Приостановить движение фоновой сети');if(frame)cancelAnimationFrame(frame);frame=0;draw();if(!paused&&!document.hidden){last=performance.now();frame=requestAnimationFrame(tick)}}
 button.addEventListener('click',()=>{paused=!paused;sync()});reduced.addEventListener('change',e=>{paused=e.matches;sync()});document.addEventListener('visibilitychange',sync);let resizeFrame;addEventListener('resize',()=>{cancelAnimationFrame(resizeFrame);resizeFrame=requestAnimationFrame(resize)});resize();sync();
})();
