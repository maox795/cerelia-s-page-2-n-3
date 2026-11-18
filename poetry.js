const previews = [
  'https://audio-ssl.itunes.apple.com/itunes-AudioPreview221/v4/08/e0/77/08e0778e-3e8f-6ccb-6258-49300fd44ca1/mzaf_17781302718440258187.plus.aac.p.m4a',
  'chunxi-audio.mp3',
  'https://audio-ssl.itunes.apple.com/itunes-AudioPreview116/v4/8d/2b/c5/8d2bc53f-1746-1338-96c2-243ab6f1a53a/mzaf_8136784296067975032.plus.aac.p.m4a'
];
const audio = new Audio();
const records = [...document.querySelectorAll('.vinyl')];
let selected = -1;
function pauseRecord(){audio.pause();records.forEach(r=>{r.classList.remove('playing');r.setAttribute('aria-pressed','false')})}
records.forEach((record,i)=>record.addEventListener('click',()=>{
  if(selected===i&&!audio.paused){pauseRecord();return}
  pauseRecord();selected=i;
  audio.src=previews[i];audio.volume=.65;
  audio.play().then(()=>{record.classList.add('playing');record.setAttribute('aria-pressed','true')}).catch(()=>{});
}));
audio.addEventListener('ended',pauseRecord);
const observer = new IntersectionObserver(entries=>entries.forEach(entry=>{
  if(entry.isIntersecting){entry.target.classList.add('visible')}
  if(!entry.isIntersecting&&entry.target.contains(records[selected]))pauseRecord();
}),{threshold:.35});
document.querySelectorAll('.poem-section').forEach(section=>observer.observe(section));
document.querySelector('.one').classList.add('visible');
