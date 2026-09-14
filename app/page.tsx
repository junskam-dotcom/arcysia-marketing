'use client';
import { useEffect, useState } from 'react';
import { ArrowDown, ArrowUpRight, ArrowRight, Pause, Play, Mail } from 'lucide-react';
import { Accordion, AccordionItem, AccordionTrigger, AccordionContent } from '@/components/ui/accordion';
import { marketingServices, marketingWays, steps, faq } from './offer-data';
import PortfolioGallery from './portfolio-gallery';
import HeroShowcase from './hero-showcase';
import IndustryCardSelector from './industry-card-selector';

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
    <a href="#portfolio" className="skip-link">Przejdź do portfolio</a>
    <header className="site-header"><a className="wordmark" href="#poczatek" aria-label="Arcysia Marketing — początek">arcysia<small>MARKETING</small></a><nav aria-label="Nawigacja główna"><a href="#portfolio">Portfolio</a><a href="#marketing">Oferta</a><a href="#pomysly-dla-branzy">Pomysły dla branży</a><a href="#o-mnie">O mnie</a><a href="#kontakt">Kontakt</a></nav><button className="motion-toggle" onClick={()=>setMotion(!motion)} aria-pressed={!motion} aria-label={motion?'Wstrzymaj animacje':'Włącz animacje'} title={motion?'Wstrzymaj animacje':'Włącz animacje'}>{motion?<Pause size={17}/>:<Play size={17}/>}</button></header>
    <main id="poczatek">
      <section className="hero showcase-hero section-pad" aria-labelledby="hero-title">
        <div className="hero-eyebrow"><span>ARCYSIA / PORTFOLIO MARKETINGOWE</span><span>OBRAZ · SŁOWO · RUCH</span></div>
        <div className="showcase-layout"><div className="showcase-copy"><h1 id="hero-title">TREŚCI,<br/>KTÓRE <em>żyją.</em></h1><div className="hero-person"><img src="/media/marcelina-junska-portrait.png" width={1080} height={1350} alt="Marcelina Juńska" fetchPriority="high"/><span>Cześć, jestem Marcelina.<small>Arcysia Marketing</small></span></div><p>Pomagam markom mówić własnym głosem, wyglądać profesjonalnie i przyciągać uwagę, która nie kończy się na lajku.</p><div className="intro-actions"><a className="button button-orange" href="#portfolio">Zobacz moje prace <ArrowDown size={19}/></a><a className="showcase-offer-link" href="#marketing">Poznaj ofertę <ArrowUpRight size={19}/></a></div></div><HeroShowcase motion={motion}/></div>
      </section>
      <PortfolioGallery motion={motion}/>
      <section id="marketing" className="marketing-section section-pad" aria-labelledby="marketing-title">
        <div className="section-heading reveal"><span className="eyebrow">02 / OFERTA MARKETINGOWA</span><h2 id="marketing-title">Od pomysłu na markę<br/>do codziennej <em>komunikacji.</em></h2><p className="section-lead">Zaczynasz od zera, potrzebujesz odświeżenia wizerunku lub wsparcia w social mediach? Dopasujemy zakres współpracy do etapu, na którym jest Twoja marka.</p></div>
        <div className="services-grid">{marketingServices.map((service,index)=><article className="service-card" key={service.title}><span className="service-index">{String(index+1).padStart(2,'0')}</span><h3>{service.title}</h3><p>{service.description}</p><Accordion className="service-accordion"><AccordionItem value="scope"><AccordionTrigger aria-label={`Zobacz zakres: ${service.title}`}>Zakres i rezultat</AccordionTrigger><AccordionContent className="service-details"><ul>{service.scope.map(item=><li key={item}>{item}</li>)}</ul><div className="service-result"><span>REZULTAT</span><p>{service.result}</p></div>{service.note&&<p className="service-note">{service.note}</p>}</AccordionContent></AccordionItem></Accordion></article>)}</div>
        <div className="ways-block"><div className="small-heading"><span className="eyebrow">ZAKRES DOPASOWANY DO CIEBIE</span><h3>Trzy sposoby współpracy.</h3></div><div className="ways-grid">{marketingWays.map((way,index)=><article key={way.title}><span className="way-index">0{index+1}</span><h4>{way.title}</h4><p>{way.description}</p></article>)}</div><p className="terms-note">Zakres, termin i wycenę ustalam indywidualnie. Przed rozpoczęciem współpracy określamy materiały do przygotowania, liczbę poprawek i sposób przekazania gotowych plików.</p></div>
      </section>
      <IndustryCardSelector />
      <section className="about-section section-pad marketing-about" id="o-mnie" aria-labelledby="about-title"><figure className="about-photo"><img src="/media/marcelina-junska-portrait.png" width={1080} height={1350} alt="Marcelina Juńska, twórczyni Arcysia Marketing" loading="lazy"/></figure><div className="about-copy"><span className="eyebrow">04 / O MNIE</span><h2 id="about-title">Marcelina<br/><em>Juńska.</em></h2><p>Łączę kreatywność z organizacją. Tworzę komunikację marek — od kierunku wizualnego i strategii po posty, rolki i codzienne social media. Jako freelancerka współpracuję z agencją UX oraz markami z branży beauty i meblarskiej. Dbam o pomysł, plan i szczegóły, które składają się na gotową realizację.</p><div className="about-events"><h3>Za kreatywnością stoi dobry plan.</h3><p>Mam ponad trzyletnie doświadczenie w projektach marketingowych i eventowych. Pracowałam przy konferencjach w całej Polsce, w tym w S&P Partners — Pharma Agency. Organizacja wydarzeń to drugi obszar mojej pracy, który prezentuję w osobnym portfolio.</p><a href="https://marcelina-junska-eventy.arcysia.chatgpt.site" className="about-events-link">Poznaj moje portfolio eventowe <ArrowUpRight size={19}/></a></div></div></section>
      <section className="process-section section-pad" id="wspolpraca" aria-labelledby="process-title"><div className="section-heading reveal"><span className="eyebrow">05 / OD ROZMOWY DO REALIZACJI</span><h2 id="process-title">Jak wygląda <em>współpraca.</em></h2></div><ol className="steps-grid">{steps.map((step,index)=><li key={step.title}><span className="step-number">0{index+1}</span><h3>{step.title}</h3><p>{step.description}</p></li>)}</ol><div className="faq-layout"><div className="small-heading"><span className="eyebrow">FAQ</span><h3>Warto wiedzieć.</h3></div><Accordion className="faq-accordion">{faq.map((item,index)=><AccordionItem key={item.question} value={`faq-${index}`}><AccordionTrigger>{item.question}</AccordionTrigger><AccordionContent><p>{item.answer}</p></AccordionContent></AccordionItem>)}</Accordion></div></section>
      <section className="contact-section section-pad" id="kontakt" aria-labelledby="contact-title"><div><span className="eyebrow">06 / KONTAKT</span><h2 id="contact-title">Opowiedz mi,<br/>co <em>planujesz.</em></h2><p className="contact-lead">Nowa marka, odświeżenie wizerunku, a może wsparcie w social mediach? Napisz kilka słów o swoim pomyśle.</p>{contactEmail?<div className="contact-links"><a className="button button-orange" href={`mailto:${contactEmail}`}>Napisz do mnie <Mail size={21}/></a><a className="email-address" href={`mailto:${contactEmail}`}>{contactEmail}</a></div>:<p className="contact-status">Adres e-mail do kontaktu pojawi się tutaj wkrótce.</p>}</div><aside className="contact-brief"><span className="eyebrow">DO PRZYGOTOWANIA WYCENY</span><h3>Kilka słów<br/>na dobry początek.</h3><ul><li>Co planujesz i jaki jest Twój cel?</li><li>Jaki zakres wsparcia Cię interesuje?</li><li>Jaki termin i budżet bierzesz pod uwagę?</li><li>Gdzie chcesz publikować swoje materiały?</li></ul></aside></section>
    </main>
    <footer><a className="footer-wordmark" href="#poczatek" aria-label="Arcysia — wróć do początku">arcysia</a><div className="footer-bottom"><p>© 2026 Marcelina Juńska · Arcysia Marketing</p><span>POSTY · ROLKI · KOMUNIKACJA</span><a href="#poczatek">Do góry <ArrowUpRight size={18}/></a></div></footer>
  </div>;
}
