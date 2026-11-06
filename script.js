const $=id=>document.getElementById(id);
const metrics = [
  [
    "5+",
    "партнёров в среднем за неделю",
    "Обучал работе с платформой и показывал, как зарегистрировать клиента у застройщика через платформу."
  ],
  [
    "8+",
    "регионов на сопровождении",
    "Состав регионов менялся. Консультировал партнёров и координировал их вопросы с управляющей компанией."
  ],
  [
    "До 2 часов",
    "на решение вопросов в зоне ответственности",
    "Разбирал входящие обращения по продукту и помогал решать спорные ситуации."
  ]
];
$('numbers').innerHTML=metrics.map(([n,t,d])=>`<div><strong>${n}</strong><span>${t}</span><p class="metric-detail">${d}</p></div>`).join('');
const skills = [
  [
    "Внедрение продуктов",
    "Запуск продукта у партнёров и помощь с освоением рабочих сценариев."
  ],
  [
    "Развитие партнёрской сети",
    "Подключение брокеров и агентств, сопровождение на старте."
  ],
  [
    "Партнёрский опыт",
    "Уточнение потребностей партнёров, сбор обратной связи и разбор спорных ситуаций."
  ],
  [
    "Обучение пользователей",
    "Объяснение рабочих сценариев простым языком: личное обучение, презентации и вебинары."
  ],
  [
    "Аналитика",
    "Анализ воронок и активности партнёров, поиск причин затруднений."
  ],
  [
    "Взаимодействие команд",
    "Координация работы партнёров, внутренних команд и управляющей компании."
  ]
];
$('expertise').innerHTML=skills.map(([n,t],i)=>`<article class="expertise-card"><span class="card-index">0${i+1} ↗</span><img class="skill-object" src="assets/spatial/${['implementation','network','experience','learning','analytics','collaboration'][i]}.svg" alt="" aria-hidden="true" loading="lazy"><h3>${n}</h3><p>${t}</p></article>`).join('');
const jobs=[['март 2026 — настоящее время','Самолет Плюс','Территориальный менеджер внедрения продуктов','Сопровождение партнёров, обучение и презентации, анализ потребностей, развитие регионов, координация взаимодействия с управляющей компанией.'],['октябрь 2024 — март 2026','Домбук Плюс','Старший менеджер по работе с партнёрами','Развитие платформы через брокеров и агентства, подключение новых компаний, сопровождение, воронки, CRM, обратная связь, решение спорных ситуаций.'],['2022 — 2024','Самолет','Менеджер агентского отдела','Развитие агентского направления, обучение партнёров и аналитика.'],['2020 — 2022','Самолет','Старший менеджер отдела продаж','Продажи новостроек и работа с клиентами. Личные результаты: 7–20 сделок в месяц, входил в ТОП-10 менеджеров по продажам.'],['2018 — 2020','ПИК','Менеджер отдела продаж','Продажи новостроек, презентации проектов, работа с клиентами.']];
const career = [];
for (const [date, company, title, description] of jobs) {
  if (career.at(-1)?.company !== company) career.push({ company, roles: [] });
  career.at(-1).roles.push({ date, title, description });
}
$('timeline').innerHTML = career.map(({company, roles}) => {
  const first = roles[0];
  const date = roles.length === 1 ? first.date : roles.at(-1).date.split(' — ')[0] + ' — ' + first.date.split(' — ')[1];
  const details = roles.map(role => {
    const period = roles.length > 1 ? '<p class="career-period">' + role.date + '</p>' : '';
    return period + '<h4>' + role.title + '</h4><p>' + role.description + '</p>';
  }).join('');
  return '<article class="job"><time>' + date + '</time><div><h3>' + company + '</h3>' + details + '</div></article>';
}).join('');
const tools = [
  [
    "CRM и партнёрские системы",
    "amoCRM, Topnlab, STeam — работа с партнёрами и отслеживание этапов воронки."
  ],
  [
    "Аналитика",
    "Superset, Excel — анализ активности партнёров и данных по воронкам."
  ],
  [
    "Совместная работа",
    "Nextcloud — хранение и обмен рабочими материалами."
  ],
  [
    "AI для подготовки материалов",
    "ChatGPT — черновики инструкций для партнёров. Например, из рабочих заметок можно собрать пошаговую памятку по регистрации клиента у застройщика и сверить её с правилами платформы перед отправкой."
  ]
];
$('tools').innerHTML=tools.map(([n,t])=>`<div class="tool-row"><h3>${n}</h3><p>${t}</p></div>`).join('');
$('year').textContent=new Date().getFullYear();
if('IntersectionObserver' in window&&!matchMedia('(prefers-reduced-motion: reduce)').matches){const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.08});document.querySelectorAll('main>section:not(.hero)').forEach(el=>{el.classList.add('reveal');observer.observe(el)})}
