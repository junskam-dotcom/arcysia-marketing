'use client';
import { useState } from 'react';
import { ArrowLeft, ArrowRight, Play, X, Maximize2 } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { reels, posts, postGroups, reelPurposes, postPurposes, postIndustry } from './portfolio-data';
import HorizontalGallery from './horizontal-gallery';
const reelPath = (id: number, ext: string) => `media/reel-${String(id).padStart(2, '0')}.${ext}`;
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
function PortfolioCategory({name,items,graphics,motion}:{name:string;items:typeof reels;graphics:typeof posts;motion:boolean}) {
  const [open,setOpen]=useState(false);
  return <details className="portfolio-category" onToggle={event=>setOpen(event.currentTarget.open)}><summary><h3>{name}</h3><span>{items.length > 0 ? `${items.length} wideo` : ''}{items.length > 0 && graphics.length > 0 ? ' · ' : ''}{graphics.length > 0 ? `${graphics.length} grafik` : ''}</span><span className="category-chevron" aria-hidden="true">⌄</span></summary>{open && <div className="category-content">{items.length>0 && <><h4>Rolki i wideo</h4><HorizontalGallery label={`${name} — rolki`}>{items.map(item=><ReelCard key={item.id} item={item} motion={motion}/>)}</HorizontalGallery></>}{graphics.length>0 && <><h4>Grafiki i posty</h4><HorizontalGallery label={`${name} — grafiki`}>{graphics.map(item=><PostCard key={item.id} item={item}/>)}</HorizontalGallery></>}</div>}</details>;
}
export default function PortfolioGallery({motion}:{motion:boolean}) {
  return <section className="portfolio-section section-pad" id="portfolio" aria-labelledby="portfolio-title">
    <div className="section-heading reveal"><span className="eyebrow">01 / PORTFOLIO MARKETINGOWE</span><div className="heading-row"><h2 id="portfolio-title">Pomysły, które<br/>stały się <em>treścią.</em></h2><p>Rolki i grafiki dla marek z branży beauty, stolarskiej, biznesowej i nie tylko.</p></div></div>
    <p className="portfolio-note">Wybierz kategorię, żeby zobaczyć rolki i grafiki.</p>
    <div id="rolki" className="portfolio-categories">
    {[
      {name:'Biznes', category:'BIZNES', postIds:[]},
      {name:'Beauty', category:'BEAUTY', postIds:postGroups[0].ids},
      {name:'Firma stolarska', category:'FIRMA STOLARSKA', postIds:postGroups[1].ids},
      {name:'Marka osobista', category:'MARKA OSOBISTA', postIds:postGroups[2].ids},
      {name:'Kancelaria', category:'KANCELARIA', postIds:postGroups[3].ids},
      {name:'Lifestyle', category:'LIFESTYLE', postIds:[]},
      {name:'Wellness', category:'WELLNESS', postIds:[]},
      {name:'Wydarzenia', category:'WYDARZENIA', postIds:[]},
    ].map(group=><PortfolioCategory key={group.name} name={group.name} items={reels.filter(item=>item.category===group.category)} graphics={posts.filter(item=>group.postIds.includes(item.id))} motion={motion}/>)}
    </div>
    <span id="posty"/>
    <div className="portfolio-cta"><h3>Nie wiesz, od czego zacząć?<br/><em>Opowiedz mi o swojej marce.</em></h3><a className="button button-orange" href="#kontakt">Zapytaj o współpracę <ArrowRight size={20}/></a></div>
  </section>;
}
