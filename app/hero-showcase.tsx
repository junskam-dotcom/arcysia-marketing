'use client';
import { useEffect, useRef, useState } from 'react';
import { Play, ArrowUpRight, X } from 'lucide-react';
import { Dialog, DialogTrigger, DialogContent, DialogTitle, DialogDescription, DialogClose } from '@/components/ui/dialog';
import { reels } from './portfolio-data';
const featured = [{ id: 17, label: 'LIFESTYLE' }, { id: 13, label: 'POLKA PILATES' }, { id: 19, label: 'FIRMA STOLARSKA' }];
const path = (id: number, ext: string) => `media/reel-${String(id).padStart(2,'0')}.${ext}`;
function FeaturedFilm({ id, label, motion }: { id: number; label: string; motion: boolean }) {
  const [open,setOpen] = useState(false);
  const [visible,setVisible] = useState(false);
  const [failed,setFailed] = useState(false);
  const box = useRef<HTMLDivElement>(null);
  const video = useRef<HTMLVideoElement>(null);
  const item = reels.find(item=>item.id===id)!;
  useEffect(()=>{const observer=new IntersectionObserver(([entry])=>setVisible(entry.isIntersecting),{threshold:.15});if(box.current)observer.observe(box.current);return()=>observer.disconnect();},[]);
  useEffect(()=>{const el=video.current;if(!el)return;if(motion&&visible&&!open)el.play().catch(()=>{});else el.pause();},[motion,visible,open]);
  return <div className="hero-film" ref={box}><Dialog open={open} onOpenChange={value=>{setOpen(value);setFailed(false);}}><DialogTrigger className="hero-film-trigger" aria-label={`Obejrzyj: ${item.title}`}><span className="hero-film-frame"><img src={path(id,'jpg')} alt="" width={360} height={640}/>{motion&&visible&&!open&&<video ref={video} src={path(id,'mp4')} poster={path(id,'jpg')} autoPlay muted loop playsInline preload="metadata" aria-hidden="true"/>}<span className="hero-film-play"><Play size={20} fill="currentColor"/></span></span><span className="hero-film-label">{label}<ArrowUpRight size={15}/></span></DialogTrigger><DialogContent className="media-dialog" showCloseButton={false}><div className="dialog-heading"><div><DialogTitle>{item.title}</DialogTitle><DialogDescription>{item.note}</DialogDescription></div><DialogClose className="close-dialog" aria-label="Zamknij film"><X size={22}/></DialogClose></div>{open&&<video className="full-video" src={path(id,'mp4')} poster={path(id,'jpg')} autoPlay controls playsInline onError={()=>setFailed(true)}/>} {failed&&<p className="media-error">Nie udało się odtworzyć filmu. <a href={path(id,'mp4')}>Otwórz plik wideo</a>.</p>}</DialogContent></Dialog></div>;
}
export default function HeroShowcase({motion}:{motion:boolean}) {return <div className="hero-films" aria-label="Wybrane rolki z portfolio">{featured.map(item=><FeaturedFilm key={item.id} {...item} motion={motion}/>)}</div>;}
