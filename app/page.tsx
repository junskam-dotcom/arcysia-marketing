'use client';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, Pause, Play, Mail } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { marketingServices, marketingWays, eventServices, experiences, steps, faq } from './offer-data';
import PortfolioGallery from './portfolio-gallery';

// The owner will supply a dedicated contact address later.
const contactEmail: string | null = null;

export default function Home() {
  const [motion,setMotion]=useState(true);
  useEffect(()=>{
    const preference=window.matchMedia('(prefers-reduced-motion: reduce)');
    const update=()=>setMotion(!preference.matches);update();preference.addEventListener('change',update);
    return()=>preference.removeEventListener('change',update);
  },[]);
  useEffect(()=>{
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add('is-visible');observer.unobserve(entry.target);}}),{threshold:.06});
    document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));return()=>observer.disconnect();
  },[]);
  return <div className={motion?'site':'site motion-paused'}>
    <a href="#marketing" className="skip-link">Przejdź do oferty</a>
    <header className="site-header"><a className="wordmark" href="#poczatek" aria-label="Arcysia Marketing — początek">arcysia<small>MARKETING & EVENTY</small></a><nav aria-label="Nawigacja główna"><a href="#marketing">Marketing</a><a href="#eventy">Eventy</a><a href="#o-mnie">O mnie</a><a href="#kontakt">Kontakt</a></nav><button className="motion-toggle" onClick={()=>setMotion(!motion)} aria-pressed={!motion} aria-label={motion?'Wstrzymaj animacje':'Włącz animacje'} title={motion?'Wstrzymaj animacje':'Włącz animacje'}>{motion?<Pause size={17}/>:<Play size={17}/>}</button></header>
    <main id="poczatek">
      <section className="hero section-pad" aria-labelledby="hero-title">
        <div className="hero-eyebrow"><span>MARCELINA JUŃSKA</span><span>MARKETING + EVENTY</span></div>
        <div className="intro-grid"><h1 id="hero-title">Twoja marka.<br/>Dobry plan.<br/><em>Moja realizacja.</em></h1><div className="intro-copy"><p>Cześć, jestem Marcelina. Pomagam markom tworzyć spójną komunikację i organizować wydarzenia. Od strategii i identyfikacji wizualnej, przez social media, po spotkania, konferencje i kameralne wyjazdy.</p><div className="intro-actions"><a className="button button-orange" href="#marketing">Marketing i portfolio <ArrowDown size={19}/></a><a className="button button-lime" href="#eventy">Eventy i organizacja <ArrowDown size={19}/></a></div></div></div>
        <div className="area-choices"><a className="area-card area-marketing" href="#marketing"><span className="area-index">01 / MARKA I KOMUNIKACJA</span><h2>Marketing</h2><p>Wizerunek, strategia i treści, które pokazują charakter Twojej marki.</p><ArrowUpRight className="area-arrow" aria-hidden="true"/></a><a className="area-card area-events" href="#eventy"><span className="area-index">02 / LUDZIE I DOŚWIADCZENIA</span><h2>Eventy</h2><p>Koncepcja, przygotowania i koordynacja wydarzeń — z dbałością o szczegóły.</p><ArrowUpRight className="area-arrow" aria-hidden="true"/></a></div>
      </section>
      <section id="marketing" className="marketing-section section-pad" aria-labelledby="marketing-title">
        <div className="section-heading reveal"><span className="eyebrow">01 / MARKETING I PORTFOLIO</span><h2 id="marketing-title">Od pomysłu na markę<br/>do codziennej <em>komunikacji.</em></h2><p className="section-lead">Zaczynasz od zera, potrzebujesz odświeżenia wizerunku lub wsparcia w social mediach? Dopasujemy zakres współpracy do etapu, na którym jest Twoja marka.</p></div>
        <div className="services-grid">{marketingServices.map((service,index)=><article className="service-card" key={service.title}><span className="service-index">{String(index+1).padStart(2,'0')}</span><h3>{service.title}</h3><p>{service.description}</p><Accordion className="service-accordion"><AccordionItem value="scope"><AccordionTrigger aria-label={`Zobacz zakres: ${service.title}`}>Zakres i rezultat</AccordionTrigger><AccordionContent className="service-details"><ul>{service.scope.map(item=><li key={item}>{item}</li>)}</ul><div className="service-result"><span>REZULTAT</span><p>{service.result}</p></div>{service.note&&<p className="service-note">{service.note}</p>}</AccordionContent></AccordionItem></Accordion></article>)}</div>
        <div className="ways-block"><div className="small-heading"><span className="eyebrow">ZAKRES DOPASOWANY DO CIEBIE</span><h3>Trzy sposoby współpracy.</h3></div><div className="ways-grid">{marketingWays.map((way,index)=><article key={way.title}><span className="way-index">0{index+1}</span><h4>{way.title}</h4><p>{way.description}</p></article>)}</div><p className="terms-note">Zakres, termin i wycenę ustalam indywidualnie. Przed rozpoczęciem współpracy określamy materiały do przygotowania, liczbę poprawek i sposób przekazania gotowych plików.</p></div>
      </section>
      <PortfolioGallery motion={motion}/>
      <section className="events-section section-pad" id="eventy" aria-labelledby="events-title">
        <div className="section-heading reveal"><span className="eyebrow">03 / EVENTY I ORGANIZACJA</span><h2 id="events-title">Od pierwszego pomysłu<br/>do ostatniego <em>punktu programu.</em></h2><p className="section-lead">Pomagam organizować konferencje, spotkania i kameralne wyjazdy. Dbam o koncepcję, harmonogram, budżet, współpracę z partnerami i przebieg wydarzenia.</p></div>
        <div className="events-offer">{eventServices.map((service,index)=><article className="event-service" key={service.title}><span className="event-index">0{index+1}</span><h3>{service.title}</h3><p>{service.description}</p></article>)}</div>
        <div className="event-ways"><h3>Ty wybierasz, gdzie<br/>potrzebujesz wsparcia.</h3><ul><li><span>01</span>Organizacja od początku do końca.</li><li><span>02</span>Wsparcie wybranego etapu.</li><li><span>03</span>Koordynacja w dniu wydarzenia.</li></ul></div>
      </section>
      <section className="experience-section section-pad" id="doswiadczenie" aria-labelledby="experience-title">
        <div className="section-heading reveal"><span className="eyebrow">04 / DOŚWIADCZENIE EVENTOWE</span><h2 id="experience-title">Doświadczenie,<br/>na którym możesz się <em>oprzeć.</em></h2></div>
        <div className="stats-grid"><div><strong>3<span>+</span></strong><p>lata doświadczenia w projektach eventowych i marketingowych</p></div><div><strong>40<span>+</span></strong><p>zrealizowanych konferencji i wydarzeń</p></div><div><strong><small>do</small> 600</strong><p>uczestników w realizowanych projektach</p></div></div>
        <p className="stats-context">Doświadczenie obejmuje również projekty realizowane w ramach pracy agencyjnej.</p>
        <div className="experience-list">{experiences.map((experience,index)=><article key={experience.title}><div className="experience-label"><span>0{index+1}</span><span>{experience.context}</span></div><div><h3>{experience.title}</h3><p>{experience.description}</p></div></article>)}</div>
      </section>
      <section className="about-section section-pad" id="o-mnie" aria-labelledby="about-title"><div className="about-identity"><span className="eyebrow">05 / O MNIE</span><h2 id="about-title">Marcelina<br/><em>Juńska.</em></h2><span className="about-signature">Arcysia Marketing</span></div><div className="about-copy reveal"><span className="about-mark" aria-hidden="true">m<span>+</span>e</span><p>Jestem Marcelina Juńska. Łączę kreatywność z organizacją: tworzę komunikację marek i koordynuję wydarzenia. Mam ponad trzyletnie doświadczenie w projektach eventowych i marketingowych. Pracowałam przy konferencjach w całej Polsce, a jako freelancerka współpracuję z agencją UX oraz marką z branży beauty i meblarskiej. Dbam o pomysł, plan i szczegóły, które składają się na gotową realizację.</p></div></section>
      <section className="process-section section-pad" id="wspolpraca" aria-labelledby="process-title"><div className="section-heading reveal"><span className="eyebrow">06 / OD ROZMOWY DO REALIZACJI</span><h2 id="process-title">Jak wygląda <em>współpraca.</em></h2></div><ol className="steps-grid">{steps.map((step,index)=><li key={step.title}><span className="step-number">0{index+1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol><div className="faq-layout"><div className="small-heading"><span className="eyebrow">FAQ</span><h3>Warto wiedzieć.</h3></div><Accordion className="faq-accordion">{faq.map((item,index)=><AccordionItem key={item.question} value={`faq-${index}`}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent><p>{item.answer}</p></AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section className="contact-section section-pad" id="kontakt" aria-labelledby="contact-title"><div><span className="eyebrow">07 / KONTAKT</span><h2 id="contact-title">Opowiedz mi,<br/>co <em>planujesz.</em></h2><p className="contact-lead">Marka, wydarzenie, a może wspólny projekt? Napisz kilka słów o swoim pomyśle.</p>{contactEmail?<div className="contact-links"><a className="button button-orange" href={`mailto:${contactEmail}`}>Napisz do mnie <Mail size={21}/></a><a className="email-address" href={`mailto:${contactEmail}`}>{contactEmail}</a></div>:<p className="contact-status">Adres e-mail do kontaktu pojawi się tutaj wkrótce.</p>}</div><aside className="contact-brief"><span className="eyebrow">DO PRZYGOTOWANIA WYCENY</span><h3>Kilka słów<br/>na dobry początek.</h3><ul><li>Co planujesz i jaki jest Twój cel?</li><li>Jaki zakres wsparcia Cię interesuje?</li><li>Jaki termin i budżet bierzesz pod uwagę?</li><li>Przy wydarzeniu: gdzie i dla ilu osób?</li></ul></aside></section>
    </main>
    <footer><a className="footer-wordmark" href="#poczatek" aria-label="Arcysia — wróć do początku">arcysia</a><div className="footer-bottom"><p>© 2026 Marcelina Juńska · Arcysia Marketing</p><span>MARKETING + EVENTY</span><a href="#poczatek">Do góry <ArrowUpRight size={18}/></a></div></footer>
  </div>;
}
