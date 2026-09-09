'use client';

import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowLeft, ArrowRight, ArrowUpRight, Pause, Play, X, Maximize2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';

const reels = [
  { id: 1, title: 'Beauty w kadrze', category: 'BEAUTY', note: 'Rolka zabiegowa' },
  { id: 2, title: 'Z bliska', category: 'BEAUTY', note: 'Rolka zabiegowa' },
  { id: 3, title: 'Kwiaty przez całą dobę', category: 'LIFESTYLE', note: 'Prezentacja miejsca' },
  { id: 4, title: 'Ludzie. Marki. Spotkania.', category: 'WYDARZENIA', note: 'Biz4sis · partnerzy spotkania' },
  { id: 5, title: 'W centrum wydarzeń', category: 'WYDARZENIA', note: 'Relacja ze spotkania' },
  { id: 6, title: 'Spotkajmy się w Poznaniu', category: 'WYDARZENIA', note: 'Biz4sis · Poznań' },
  { id: 7, title: 'Głos eksperta', category: 'BIZNES', note: 'Wideo eksperckie' },
  { id: 8, title: 'Wiedza, którą warto dzielić', category: 'BIZNES', note: 'Wideo eksperckie' },
  { id: 9, title: 'Porozmawiajmy o biznesie', category: 'BIZNES', note: 'Wideo eksperckie' },
  { id: 10, title: 'Złap swój rytm', category: 'WELLNESS', note: 'Joga · wideo' },
  { id: 11, title: 'Od pierwszej sekundy', category: 'WIDEO', note: 'Rolka z animowaną typografią' },
  { id: 12, title: 'Razem znaczy więcej', category: 'WYDARZENIA', note: 'Biz4sis · społeczność' },
  { id: 13, title: 'Poznaj Polka Pilates', category: 'WELLNESS', note: 'Polka Pilates · relacja' },
  { id: 14, title: 'Wnętrza w ruchu', category: 'WNĘTRZA', note: 'Meble na wymiar · realizacja 01' },
  { id: 15, title: 'Bliżej detali', category: 'WNĘTRZA', note: 'Meble na wymiar · realizacja 02' },
  { id: 16, title: 'Przestrzeń z charakterem', category: 'WNĘTRZA', note: 'Meble na wymiar · realizacja 03' },
];
const posts = [
  { id: 1, title: 'Beauty, od pierwszego spojrzenia.', note: 'Grafika informacyjna · RF Double Tite', alt: 'Grafika porównująca skórę przed i tuż po zabiegu RF Double Tite', src: '/media/post-01.webp' },
  { id: 2, title: 'Letni glow. Wyrazisty przekaz.', note: 'Grafika promocyjna · Summer Glow z Nicole', alt: 'Archiwalna grafika Summer Glow z Nicole: 20 procent rabatu na zabiegi, promocja do 14 sierpnia 2026', src: '/media/post-02.webp' },
  { id: 3, title: 'Kuchnia na wymiar', note: 'Wnętrza · prezentacja realizacji', alt: 'Post Kuchnia na wymiar z granatową kuchnią w Poznaniu', src: '/media/post-03.webp' },
  { id: 4, title: 'Detal. Przyjrzyj się bliżej.', note: 'Wnętrza · detale mebli', alt: 'Post z detalem granatowych frontów i złotych uchwytów pokazanym na tablecie', src: '/media/post-04.webp' },
  { id: 5, title: 'Wymarzone od kuchni', note: 'Wnętrza · meble na wymiar', alt: 'Post z jasną kuchnią: pomiar, projekt, produkcja, montaż', src: '/media/post-05.webp' },
  { id: 6, title: 'Wymarzone. Wymierzone. Wykonane.', note: 'Wnętrza · prezentacja realizacji', alt: 'Post przedstawiający komodę i okrągłe lustro we wnętrzu', src: '/media/post-06.webp' },
  { id: 7, title: 'Patrz wyżej', note: 'Wnętrza · zabudowa do sufitu', alt: 'Post z jasną kuchnią i hasłem Patrz wyżej, zabudowa do sufitu', src: '/media/post-07.webp' },
  { id: 8, title: 'Więcej, niż myślisz', note: 'Wnętrza · funkcjonalna zabudowa', alt: 'Post Ile tu się zmieści? z białą szafą na wymiar', src: '/media/post-08.webp' },
  { id: 9, title: 'Za realizacją stoi pasja', note: 'Wnętrza · wizerunek współzałożyciela', alt: 'Post przedstawiający współzałożyciela Pawła Dolatę i hasło Za każdą realizacją stoi pasja', src: '/media/post-09.webp' },
  { id: 10, title: 'To też jest rozwój', note: 'Marka osobista · Marzena Tajsner', alt: 'Czarna grafika z cytatem o rozwoju i rezygnowaniu, podpisana Marzena Tajsner', src: '/media/post-10.webp' },
  { id: 11, title: 'Czas przedstawić się na nowo', note: 'Marka osobista · post wizerunkowy', alt: 'Post z portretem i przedstawieniem ról: adwokat, CEO, przedsiębiorca', src: '/media/post-11.webp' },
  { id: 12, title: 'Najdroższa decyzja? Odłożona.', note: 'Marka osobista · komunikacja ekspercka', alt: 'Post z portretem i refleksją o podejmowaniu decyzji przez CEO', src: '/media/post-12.webp' },
  { id: 13, title: 'Dwie perspektywy', note: 'Marka osobista · biznes i prawo', alt: 'Post z portretem i hasłem Biznes lubi odważne decyzje. Prawo — decyzje przemyślane', src: '/media/post-13.webp' },
  { id: 14, title: 'Nie od zera. Z doświadczeniem.', note: 'Marka osobista · nowy rozdział', alt: 'Post z portretem i hasłem Nie od zera, z doświadczeniem', src: '/media/post-14.webp' },
  { id: 15, title: 'Nowy adres marki', note: 'Tajsner · post informacyjny', alt: 'Post Tajsner o nowej lokalizacji przy ulicy Cichej 3 w Poznaniu, z mapą', src: '/media/post-15.webp' },
  { id: 16, title: 'Wcześniejsza spłata kredytu', note: 'Tajsner · post edukacyjny', alt: 'Projekt graficzny Tajsner dotyczący wcześniejszej spłaty kredytu', src: '/media/post-16.webp' },
  { id: 17, title: 'Zanim podpiszesz', note: 'Tajsner · post edukacyjny', alt: 'Projekt graficzny Tajsner Bank proponuje ugodę. Zadaj sobie 4 pytania, zanim podpiszesz', src: '/media/post-17.webp' },
  { id: 18, title: 'Warto znać swoje prawa', note: 'Tajsner · post o usługach kancelarii', alt: 'Post Tajsner Masz kredyt? Warto znać swoje prawa, z portretem kobiety rozmawiającej przez telefon', src: '/media/post-18.webp' },
];
const postGroups = [
  { name: 'Beauty', subtitle: 'Estetyka i komunikacja zabiegów', from: 1, to: 2 },
  { name: 'Wnętrza na wymiar', subtitle: 'Realizacje, detale i ludzie za marką', from: 3, to: 9 },
  { name: 'Marka osobista', subtitle: 'Marzena Tajsner · spójny wizerunek ekspercki', from: 10, to: 14 },
  { name: 'Kancelaria', subtitle: 'Tajsner · edukacja i komunikacja usług', from: 15, to: 18 },
];
const reelPath = (id: number, ext: string) => `/media/reel-${String(id).padStart(2, '0')}.${ext}`;

function Preview({ id, motion }: { id: number; motion: boolean }) {
  const video = useRef<HTMLVideoElement>(null);
  const [active, setActive] = useState(false);
  useEffect(() => { if (!motion) { video.current?.pause(); setActive(false); } }, [motion]);
  return <span className="reel-image" onPointerEnter={() => {
    if (!motion || window.matchMedia('(hover: none)').matches) return;
    setActive(true);
  }} onPointerLeave={() => { video.current?.pause(); setActive(false); }}>
    <img src={reelPath(id, 'jpg')} alt="" loading="lazy" width={360} height={640}/>
    {active && <video ref={video} src={reelPath(id, 'mp4')} muted autoPlay loop playsInline aria-hidden="true" onError={() => setActive(false)} />}
    <span className="play-disc"><Play size={22} fill="currentColor"/></span>
    <span className="reel-watch">OBEJRZYJ ROLKĘ <ArrowUpRight size={16}/></span>
  </span>;
}
function ReelCard({ item, motion }: { item: typeof reels[number]; motion: boolean }) {
  const [open, setOpen] = useState(false);
  const [error, setError] = useState(false);
  return <article className="reel-item">
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger className="reel-trigger" aria-label={`Odtwórz: ${item.title}`}>
        <span className="reel-top"><span className={item.category==='WYDARZENIA' ? 'event-category' : undefined}>{item.category}</span><span>{String(item.id).padStart(2,'0')} / {reels.length}</span></span>
        <Preview id={item.id} motion={motion && !open}/>
        <span className="reel-title">{item.title}<ArrowUpRight size={20}/></span>
        <span className="reel-note">{item.note}</span>
      </DialogTrigger>
      <DialogContent className="media-dialog" showCloseButton={false}>
        <div className="dialog-heading"><div><DialogTitle>{item.title}</DialogTitle><DialogDescription>{item.note}</DialogDescription></div><DialogClose className="close-dialog" aria-label="Zamknij film"><X size={22}/></DialogClose></div>
        {open && <video className="full-video" src={reelPath(item.id,'mp4')} poster={reelPath(item.id,'jpg')} autoPlay controls playsInline preload="metadata" onError={() => setError(true)}/>}
        {error && <p className="media-error">Nie udało się odtworzyć filmu. <a href={reelPath(item.id,'mp4')}>Otwórz plik wideo</a>.</p>}
      </DialogContent>
    </Dialog>
  </article>;
}
function PostCard({ item }: { item: typeof posts[number] }) {
  return <article className="post-item reveal"><Dialog>
    <DialogTrigger className="post-trigger" aria-label={`Powiększ grafikę: ${item.title}`}>
      <span className="post-image"><img src={item.src} alt={item.alt} width={1080} height={item.id<=2 ? 1440 : 1350} loading="lazy"/><span className="enlarge"><Maximize2 size={19}/> Powiększ</span></span>
      <span className="post-title">{item.title}<ArrowUpRight size={24}/></span><span className="post-note">{item.note}</span>
    </DialogTrigger>
    <DialogContent className="media-dialog image-dialog" showCloseButton={false}>
      <div className="dialog-heading"><div><DialogTitle>{item.title}</DialogTitle><DialogDescription>{item.note} · projekt portfolio</DialogDescription></div><DialogClose className="close-dialog" aria-label="Zamknij grafikę"><X size={22}/></DialogClose></div>
      <img className="full-image" src={item.src} alt={item.alt} width={1080} height={item.id<=2 ? 1440 : 1350}/>
    </DialogContent>
  </Dialog></article>;
}
export default function Home() {
  const [motion, setMotion] = useState(true);
  const [activeReel, setActiveReel] = useState(1);
  const track = useRef<HTMLDivElement>(null);
  const hero = useRef<HTMLElement>(null);
  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setMotion(!media.matches);
    update(); media.addEventListener('change',update);
    return () => media.removeEventListener('change',update);
  }, []);
  useEffect(() => {
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) {entry.target.classList.add('is-visible');observer.unobserve(entry.target);}
    }), {threshold: .08});
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const progress = motion ? Math.min(window.scrollY / Math.max(window.innerHeight,1),1.2) : 0;
        hero.current?.style.setProperty('--scroll', String(progress));
      });
    };
    window.addEventListener('scroll', update, {passive:true}); update();
    return () => { window.removeEventListener('scroll',update);cancelAnimationFrame(frame); };
  }, [motion]);
  function moveGallery(direction: number) {
    if (!track.current) return;
    const card = track.current.querySelector<HTMLElement>('.reel-item');
    track.current.scrollBy({left: direction*((card?.offsetWidth || 300)+24),behavior: motion ? 'smooth' : 'instant'});
  }
  return <main className={motion ? '' : 'motion-paused'}>
    <a href="#rolki" className="skip-link">Przejdź do realizacji</a>
    <header className="site-header"><a className="wordmark" href="#" aria-label="Arcysia Marketing — początek">arcysia<span>↗</span><small>MARKETING</small></a><nav aria-label="Nawigacja główna"><a href="#rolki">Rolki <sup>{reels.length}</sup></a><a href="#posty">Posty <sup>{posts.length}</sup></a><a href="#o-mnie">O mnie</a></nav><div className="header-end"><span className="header-name">Marcelina Juńska</span><button className="motion-toggle" onClick={() => setMotion(!motion)} aria-pressed={!motion} aria-label={motion ? 'Wstrzymaj animacje' : 'Włącz animacje'} title={motion ? 'Wstrzymaj animacje' : 'Włącz animacje'}>{motion ? <Pause size={16}/> : <Play size={16}/>}</button></div></header>
    <section ref={hero} className="hero" aria-labelledby="hero-title">
      <div className="hero-topline"><span>PORTFOLIO / SOCIAL MEDIA</span><span>MAŁY FORMAT. DUŻO CHARAKTERU.</span></div>
      <div className="hero-copy"><h1 id="hero-title">TREŚCI,<br/>KTÓRE <em>żyją.</em></h1><p>Jestem Marcelina. Tworzę posty i rolki,<br/>które pokazują marki z ich najlepszej strony.</p><a href="#rolki" className="pill-link">Zobacz moje prace <ArrowDown size={18}/></a></div>
      <div className="hero-collage" aria-label="Wybrane realizacje"><a href="#rolki" className="floating-card card-one"><img src="/media/reel-03.jpg" alt="Rolka dla kwiaciarni" width={360} height={640}/><span>KADR PO KADRZE <ArrowUpRight size={18}/></span></a><a href="#rolki" className="floating-card card-two"><img src="/media/reel-10.jpg" alt="Rolka o jodze" width={360} height={640}/><span><Play size={16} fill="currentColor"/> WŁĄCZ INSPIRACJĘ</span></a><a href="#rolki" className="floating-card card-three"><img src="/media/reel-13.jpg" alt="Rolka Polka Pilates" width={360} height={640}/><span>HISTORIE MAREK <ArrowUpRight size={18}/></span></a><span className="round-sticker" aria-hidden="true">made<br/><em>to move.</em> ↗</span></div>
      <div className="hero-bottom"><span>POSTY · ROLKI · CONTENT</span><a href="#rolki">Przewiń po więcej <ArrowDown size={15}/></a></div>
    </section>
    <div className="ticker" aria-hidden="true"><div className="ticker-track">{[0,1,2,3].map(i=><span key={i}>CONTENT Z CHARAKTEREM <b>✳</b> MARKI W RUCHU <b>✳</b> OD POMYSŁU DO KADRU <b>✳</b> </span>)}</div></div>
    <section className="reels-section" id="rolki" aria-labelledby="reels-title">
      <div className="section-heading reel-heading reveal"><div><span>01 / WIDEO</span><h2 id="reels-title">Zatrzymaj <em>scroll.</em></h2></div><p>Beauty, wnętrza, biznes i wydarzenia.<br/>Różne marki. Moje spojrzenie.</p></div>
      <div className="gallery-toolbar"><span>{reels.length} ROLEK · MOJE REALIZACJE</span><div className="gallery-controls"><span aria-live="polite">{String(activeReel).padStart(2,'0')} <span className="muted">/ {reels.length}</span></span><button onClick={() => moveGallery(-1)} aria-label="Poprzednie rolki" disabled={activeReel===1}><ArrowLeft size={21}/></button><button onClick={() => moveGallery(1)} aria-label="Następne rolki" disabled={activeReel===reels.length}><ArrowRight size={21}/></button></div></div>
      <div className="reels-track" ref={track} role="region" aria-label={`Galeria ${reels.length} rolek. Przewiń w bok, aby zobaczyć kolejne.`} tabIndex={0} onScroll={() => {
        const el = track.current;if (!el) return;
        const max = el.scrollWidth-el.clientWidth;
        const card=el.querySelector<HTMLElement>('.reel-item');
        setActiveReel(el.scrollLeft>=max-5 ? reels.length : Math.min(reels.length,Math.round(el.scrollLeft/((card?.offsetWidth || 300)+24))+1));
      }}>
        {reels.map(item=><ReelCard key={item.id} item={item} motion={motion}/>)}
      </div>
      <div className="gallery-bottom"><span>Każda marka ma swoją historię.</span><span>Przesuń, żeby odkryć kolejne <ArrowRight size={17}/></span></div>
    </section>
    <section className="statement" aria-label="Posty i rolki z charakterem"><p className="reveal">DOBRY CONTENT<br/>MA SWÓJ <span>charakter.</span><ArrowUpRight className="statement-arrow" aria-hidden="true"/></p><div><span>ARCYSIA MARKETING</span><span>OBRAZ. RUCH. EMOCJE.</span></div></section>
    <section id="posty" className="posts-section" aria-labelledby="posts-title"><div className="section-heading posts-heading reveal"><div><span>02 / GRAFIKI</span><h2 id="posts-title">Jeden kadr.<br/><em>Cała historia.</em></h2></div><p>Posty, które dopełniają<br/>wizualny świat marki.</p></div><div className="post-collections">{postGroups.map((group,index)=><div className="post-collection" key={group.name}><div className="collection-heading reveal"><div><span>SERIA {String(index+1).padStart(2,'0')}</span><h3>{group.name}</h3><p>{group.subtitle}</p></div><span className="collection-count">{String(group.to-group.from+1).padStart(2,'0')} PRAC</span></div><div className={`posts-grid ${index===0 ? 'beauty-grid' : 'collection-grid'}`}>{posts.filter(item=>item.id>=group.from && item.id<=group.to).map(item=><PostCard key={item.id} item={item}/>)}</div></div>)}</div></section>
    <section id="o-mnie" className="about-section"><div className="about-label"><span>03 / ZA KADREM</span><span className="asterisk" aria-hidden="true">✳</span></div><div className="reveal"><p className="about-intro">Cześć, jestem</p><h2>Marcelina<br/><em>Juńska.</em></h2><p className="about-text">Łączę obraz, słowo i ruch. Tworzę posty oraz rolki dla marek — od beauty i wellness po wnętrza, biznes i wydarzenia. Tutaj znajdziesz moje realizacje.</p><span className="about-signature">Arcysia Marketing ↗</span></div></section>
    <footer><a className="footer-wordmark" href="#" aria-label="Arcysia — do początku">arcysia<span>↗</span></a><div className="footer-bottom"><p>© 2026 Marcelina Juńska · Arcysia Marketing</p><span>POSTY. ROLKI. HISTORIE MAREK.</span><a href="#">Wracam do góry <ArrowUpRight size={18}/></a></div></footer>
  </main>;
}
