'use client';

import { useEffect, useRef, useState, type ReactNode } from 'react';
import { ArrowLeft, ArrowRight } from 'lucide-react';

export default function HorizontalGallery({ children, label, className = '' }: { children: ReactNode; label: string; className?: string }) {
  const track = useRef<HTMLDivElement>(null);
  const drag = useRef({ x: 0, left: 0, active: false, moved: false });
  const [position, setPosition] = useState({ start: true, end: true, progress: 0 });
  function sync() {
    const el = track.current;
    if (!el) return;
    const max = el.scrollWidth - el.clientWidth;
    setPosition({ start: el.scrollLeft < 3, end: el.scrollLeft >= max - 3, progress: max > 0 ? el.scrollLeft / max : 1 });
  }
  useEffect(() => {
    const el = track.current;
    if (!el) return;
    const observer = new ResizeObserver(sync);
    observer.observe(el);
    sync();
    return () => observer.disconnect();
  }, []);
  function move(direction: number) {
    const el = track.current;
    if (!el) return;
    const first = el.firstElementChild as HTMLElement | null;
    const step = (first?.getBoundingClientRect().width || el.clientWidth) + parseFloat(getComputedStyle(el).columnGap || '0');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches || el.closest('.motion-paused');
    el.scrollBy({ left: direction * step, behavior: reduced ? 'auto' : 'smooth' });
  }
  return <div className={`horizontal-gallery ${className}`}>
    <div className="horizontal-gallery-controls">
      <div className="gallery-progress" role="progressbar" aria-label={`Przewinięcie: ${label}`} aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(position.progress * 100)}><span style={{ transform: `translateX(${position.progress * 300}%)` }}/></div>
      <div className="gallery-controls"><button type="button" onClick={() => move(-1)} disabled={position.start} aria-label={`Poprzednie: ${label}`}><ArrowLeft size={20}/></button><button type="button" onClick={() => move(1)} disabled={position.end} aria-label={`Następne: ${label}`}><ArrowRight size={20}/></button></div>
    </div>
    <div className="horizontal-gallery-track" ref={track} role="region" aria-roledescription="karuzela" aria-label={label} tabIndex={0} onScroll={sync}
      onKeyDown={event => { if (event.target === event.currentTarget && ['ArrowLeft', 'ArrowRight'].includes(event.key)) { event.preventDefault(); move(event.key === 'ArrowRight' ? 1 : -1); } }}
      onPointerDown={event => { if (event.pointerType !== 'mouse' || event.button !== 0) return; drag.current = { x: event.clientX, left: event.currentTarget.scrollLeft, active: true, moved: false }; }}
      onPointerMove={event => { const state = drag.current; if (!state.active) return; const delta = event.clientX - state.x; if (Math.abs(delta) > 6) { state.moved = true; event.currentTarget.setPointerCapture(event.pointerId); event.currentTarget.classList.add('is-dragging'); } if (state.moved) event.currentTarget.scrollLeft = state.left - delta; }}
      onPointerUp={event => { drag.current.active = false; event.currentTarget.classList.remove('is-dragging'); if (event.currentTarget.hasPointerCapture(event.pointerId)) event.currentTarget.releasePointerCapture(event.pointerId); }}
      onPointerCancel={event => { drag.current.active = false; event.currentTarget.classList.remove('is-dragging'); }}
      onPointerLeave={() => { if (!drag.current.moved) drag.current.active = false; }}
      onClickCapture={event => { if (drag.current.moved) { event.preventDefault(); event.stopPropagation(); drag.current.moved = false; } }}
      onDragStart={event => event.preventDefault()}
    >{children}</div>
  </div>;
}
