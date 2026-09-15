'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, X, Maximize2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { reels, posts, postGroups, reelPurposes, postPurposes, postIndustry } from './portfolio-data';
import HorizontalGallery from './horizontal-gallery';
const reelPath = (id: number, ext: string) => `media/reel-${String(id).padStart(2, '0')}.${ext}`;
const mixedReelOrder = [17, 13, 19, 1, 7, 15, 4, 10, 14, 2, 8, 18, 5, 16, 3, 9, 11, 6, 12];
const mixedReels = mixedReelOrder.map(id => reels.find(item => item.id === id)).filter((item): item is typeof reels[number] => Boolean(item));
function ProjectFacts({ industry, purpose, scope }: { industry:string;purpose:string;scope:string }) {
  return <dl className="project-facts"><div><dt>Marka / branża</dt><dd>{industry}</dd></div><div><dt>Cel materiału</dt><dd>{purpose}</dd></div><div><dt>Mój zakres</dt><dd>{scope}</dd></div></dl>;
}
function ReelCard({ item, motion }: { item: typeof reels[number]; motion: boolean }) {
  const [open, setOpen] = useState(false);
  const [preview, setPreview] = useState(false);
  const [error, setError] = useState(false);
  const scope = 'Przygotowanie materiału wideo do social mediów';
  return <article className="reel-item"><Dialog open={open} onOpenChange={value=>{setOpen(value);setPreview(false);setError(false);}}>
    <DialogTrigger className="reel-trigger" aria-label={`Odtwórz: ${item.title}`} onPointerEnter={()=>{if(motion && window.matchMedia('(hover: hover)').matches)setPreview(true);}} onPointerLeave={()=>setPreview(false)}>
      <span className="reel-top"><span>{item.category}</span><span>{String(item.id).padStart(2,'0')}</span></span>
      <span className="reel-image"><img src={reelPath(item.id,'jpg')} alt="" loading="lazy" width={360} height={640}/>{preview && motion && !open && <video src={reelPath(item.id,'mp4')} muted autoPlay loop playsInline aria-hidden="true" onError={()=>setPreview(false)}/>}<span className="play-disc"><Play size={22} fill="currentColor"/></span><span className="reel-watch">Obejrzyj rolkę</span></span>
      <span className="reel-title">{item.title}</span><span className="reel-note">{item.note}</span>
    </DialogTrigger>
    <ProjectFacts industry={item.category.toLocaleLowerCase('pl')} purpose={reelPurposes[item.id]} scope={scope}/>
    <DialogContent className="media-dialog" showCloseButton={false}>
      <div className="dialog-heading"><div><DialogTitle>{item.title}</DialogTitle><DialogDescription>{item.note}</DialogDescription></div><DialogClose className="close-dialog" aria-label="Zamknij film"><X size={22}/></DialogClose></div>
      {open && <video className="full-video" src={reelPath(item.id,'mp4')} poster={reelPath(item.id,'jpg')} autoPlay controls playsInline preload="metadata" onError={()=>setError(true)}/>}
      {error && <p className="media-error">Nie udało się odtworzyć filmu. <a href={reelPath(item.id,'mp4')}>Otwórz plik wideo</a>.</p>}
      <ProjectFacts industry={item.note} purpose={reelPurposes[item.id]} scope={scope}/>
    </DialogContent>
  </Dialog></article>;
}
function PostCard({ item }: { item: typeof posts[number] }) {
  return <article className="post-item"><Dialog>
    <DialogTrigger className="post-trigger" aria-label={`Powiększ grafikę: ${item.title}`}><span className="post-image"><img src={item.src} alt={item.alt} width={1080} height={item.id<=2?1440:1350} loading="lazy"/><span className="enlarge"><Maximize2 size={17}/><span>Powiększ</span></span></span><span className="post-title">{item.title}</span></DialogTrigger>
    <ProjectFacts industry={postIndustry(item.id)} purpose={postPurposes[item.id]} scope="Przygotowanie grafiki do social mediów"/>
    <DialogContent className="media-dialog image-dialog" showCloseButton={false}><div className="dialog-heading"><div><DialogTitle>{item.title}</DialogTitle><DialogDescription>{item.note} · projekt portfolio</DialogDescription></div><DialogClose className="close-dialog" aria-label="Zamknij grafikę"><X size={22}/></DialogClose></div><img className="full-image" src={item.src} alt={item.alt} width={1080} height={item.id<=2?1440:1350}/><ProjectFacts industry={postIndustry(item.id)} purpose={postPurposes[item.id]} scope="Przygotowanie grafiki do social mediów"/></DialogContent>
  </Dialog></article>;
}
export default function PortfolioGallery({motion}:{motion:boolean}) {
  return <section className="portfolio-section section-pad" id="portfolio" aria-labelledby="portfolio-title">
    <div className="section-heading reveal"><span className="eyebrow">01 / PORTFOLIO MARKETINGOWE</span><div className="heading-row"><h2 id="portfolio-title">Pomysły, które<br/>stały się <em>treścią.</em></h2><p>Rolki i grafiki dla marek z branży beauty, stolarskiej, biznesowej i nie tylko.</p></div></div>
    <div id="rolki" className="gallery-toolbar"><h3>Rolki i wideo <span>{mixedReels.length}</span></h3></div>
    <HorizontalGallery label="Rolki i wideo">{mixedReels.map(item=><ReelCard key={item.id} item={item} motion={motion}/>)}</HorizontalGallery>
    <p className="portfolio-note">Twoja marka ma głos. Ja pomagam go pokazać i usłyszeć.</p>
    <div id="posty" className="posts-heading"><h3>Grafiki i posty <span>{posts.length}</span></h3></div>
    {postGroups.map((group,index)=><div key={group.name} className="post-collection"><div className="collection-heading"><div><span className="eyebrow">SERIA {String(index+1).padStart(2,'0')}</span><h4>{group.name}</h4><p>{group.subtitle}</p></div><span className="collection-count">{group.ids.length} {group.ids.length<5?'prace':'prac'}</span></div><HorizontalGallery label={group.name}>{posts.filter(item=>group.ids.includes(item.id)).map(item=><PostCard key={item.id} item={item}/>)}</HorizontalGallery></div>)}
    <div className="portfolio-cta"><h3>Nie wiesz, od czego zacząć?<br/><em>Opowiedz mi o swojej marce.</em></h3><a className="button button-dark" href="#kontakt">Zapytaj o współpracę <ArrowRight size={20}/></a></div>
  </section>;
}
