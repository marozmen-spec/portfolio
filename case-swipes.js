// Independent case reveals: touch swipe, mouse drag and keyboard button.
const caseData=[
 ['Рост активности партнёрской сети','200 → 500+','Рост активной партнёрской базы с 200 до 500+ партнёров.'],
 ['Рост количества сделок','6 500+ → 12 000+','Рост сделок с 6 500+ в 2024 году до 12 000+ в 2025 году — +85%.'],
 ['Активация новых партнёров','~43%','Конверсия новых партнёров в первую сделку — около 43%. Подключение 40+ новых компаний в месяц, около 480+ компаний в год.'],
 ['Масштабирование по регионам','27 регионов','Партнёрская сеть охватывает 27 регионов присутствия.'],
 ['Система обучения партнёров','40+ вебинаров','40+ вебинаров и 300+ участников в месяц.'],
 ['Скорость сопровождения','до 2 часов','Личный SLA по входящим вопросам в моём контуре — до 2 часов. Снижение числа входящих обращений примерно на 20%.']
];
const caseList=document.getElementById('case-list');
caseList.innerHTML=caseData.map(([title,value,description],i)=>`<article class="swipe-case" data-open="false" aria-label="${title}"><div class="case-reveal" id="case-reveal-${i}" inert><span class="case-reveal-label">РЕЗУЛЬТАТ / 0${i+1}</span><strong>${value}</strong><p>${description}</p><button class="case-reset" type="button" aria-label="Вернуться к теме: ${title}">← К теме</button></div><div class="case-cover"><span class="case-bubble" aria-hidden="true">${['↗','↗','◎','◉','≋','◷'][i]}</span><div class="case-cover-copy"><span class="case-number">КЕЙС / 0${i+1}</span><h3>${title}</h3><span class="case-gesture">Смахните влево, чтобы увидеть результат</span></div><button class="case-unlock" type="button" aria-expanded="false" aria-controls="case-reveal-${i}" aria-label="Показать результат: ${title}">←</button></div></article>`).join('');
caseList.querySelectorAll('.swipe-case').forEach(card=>{
 const cover=card.querySelector('.case-cover'),unlock=card.querySelector('.case-unlock'),panel=card.querySelector('.case-reveal');let startX=0,startY=0,dragging=false,swiping=false,dx=0;
 function reveal(open){card.dataset.open=String(open);cover.style.removeProperty('--drag-x');unlock.setAttribute('aria-expanded',String(open));panel.inert=!open;cover.inert=open;if(open)card.querySelector('.case-reset').focus({preventScroll:true});else unlock.focus({preventScroll:true});}
 unlock.addEventListener('click',()=>reveal(true));card.querySelector('.case-reset').addEventListener('click',()=>reveal(false));
 cover.addEventListener('pointerdown',e=>{if(e.button!==0||e.target.closest('button'))return;startX=e.clientX;startY=e.clientY;dx=0;dragging=true;swiping=false;cover.setPointerCapture(e.pointerId)});
 cover.addEventListener('pointermove',e=>{if(!dragging)return;dx=e.clientX-startX;const dy=e.clientY-startY;if(!swiping&&Math.abs(dy)>Math.abs(dx)&&Math.abs(dy)>12){dragging=false;return}if(Math.abs(dx)>10)swiping=true;if(swiping){card.classList.add('dragging');cover.style.setProperty('--drag-x',`${Math.max(-card.clientWidth,Math.min(0,dx))}px`)}});
 function end(){if(!dragging)return;dragging=false;card.classList.remove('dragging');if(swiping&&dx<-Math.min(80,card.clientWidth*.2))reveal(true);else cover.style.removeProperty('--drag-x');}
 cover.addEventListener('pointerup',end);cover.addEventListener('pointercancel',()=>{dragging=false;card.classList.remove('dragging');cover.style.removeProperty('--drag-x')});
 card.addEventListener('keydown',e=>{if(e.key==='Escape'&&card.dataset.open==='true'){e.preventDefault();reveal(false)}});
});
