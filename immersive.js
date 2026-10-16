const symbols=[['document',''],['growth',''],['people',''],['building',''],['handshake',''],['globe',''],['target','']];
function model(type){
 const primitives={
 document:'<i class="sheet s1"></i><i class="sheet s2"></i><i class="sheet s3"><b>✓</b></i>',
 growth:'<i class="rise r1"></i><i class="rise r2"></i><i class="rise r3"></i><i class="growth-arrow">↗</i>',
 people:'<i class="person p1"></i><i class="person p2"></i><i class="person p3"></i>',
 building:'<i class="tower t1"></i><i class="tower t2"></i><i class="tower t3"></i>',
 handshake:'<i class="link-ring l1"></i><i class="link-ring l2"></i>',
 globe:'<i class="sphere"></i><i class="orbit o1"></i><i class="orbit o2"></i><i class="orbit o3"></i>',
 target:'<i class="disc d1"></i><i class="disc d2"></i><i class="disc d3"></i><i class="dart">↗</i>',
 learning:'<i class="book-cover"></i><i class="book-page page-left"></i><i class="book-page page-right"></i><i class="book-spine"></i>',
 collaboration:'<i class="team-disc team-a"></i><i class="team-disc team-b"></i><i class="team-disc team-c"></i><i class="team-bridge bridge-a"></i><i class="team-bridge bridge-b"></i><i class="team-core"></i>',
 implementation:'<i class="product-panel panel-back"></i><i class="product-panel panel-front"><b>✓</b></i><i class="product-arrow">↗</i>',
 experience:'<i class="message-bubble bubble-back"></i><i class="message-bubble bubble-front"><b>•••</b></i>'};
 return `<span class="object-stage ${type}" aria-hidden="true"><span class="object-world">${primitives[type]||primitives.document}</span><span class="object-shadow"></span></span>`;
}
document.querySelectorAll('.number-grid>div').forEach((card,i)=>{const original=card.innerHTML;card.classList.add('metric-sculpture');card.innerHTML=`<div class="metric-static"><div class="metric-front">${model(symbols[i][0])}<div class="metric-copy">${original}</div></div></div>`;});
const types=['implementation','handshake','experience','learning','growth','collaboration'];
document.querySelectorAll('.expertise-card').forEach((card,i)=>{card.querySelector('.skill-object')?.remove();card.insertAdjacentHTML('afterbegin',model(types[i]));});
const numbers=document.querySelector('.numbers');numbers.insertAdjacentHTML('afterbegin','<div class="numbers-scenery" aria-hidden="true"><i class="grand-orbit a"></i><i class="grand-orbit b"></i><i class="grand-orbit c"></i><div class="horizon-grid"></div></div>');
document.querySelector('.hero').insertAdjacentHTML('afterbegin','<div class="hero-depth" aria-hidden="true"><i></i><i></i><i></i></div>');
document.querySelector('.cases').insertAdjacentHTML('afterbegin',`<div class="case-sculpture">${model('growth')}</div>`);
