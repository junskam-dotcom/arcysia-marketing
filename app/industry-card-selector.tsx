'use client';

import { useMemo, useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw, Search, Sparkles } from 'lucide-react';
import {
  communicationNeeds,
  getCardsForSelection,
  industryOptions,
  preparedCardCount,
  type IndustryCard,
} from './industry-content-data';

import HorizontalGallery from './horizontal-gallery';

type Step = 'industry' | 'need' | 'cards';
type CustomKind = 'services' | 'products' | 'personal' | 'local';

function CardDetails({ card, industry, needLabel }: { card: IndustryCard; industry: string; needLabel: string }) {
  return <div className="industry-card-details">
    <div className="industry-card-details-top"><span className="industry-card-tag">{card.format}</span><span className="industry-card-fit">{industry} · {needLabel}</span></div>
    <h4>{card.name}</h4>
    <p className="industry-card-message">{card.message}</p>
    <dl className="industry-card-fields">
      <div><dt>Wskazówka</dt><dd>{card.hint}</dd></div>
      <div><dt>Temat publikacji</dt><dd>{card.topic}</dd></div>
      <div><dt>Początek publikacji</dt><dd>{card.hook}</dd></div>
      <div><dt>Tekst na ekran</dt><dd>„{card.screenText}”</dd></div>
      <div><dt>Zachęta do działania</dt><dd>{card.cta}</dd></div>
      <div><dt>Ujęcia lub grafika</dt><dd>{card.visual}</dd></div>
    </dl>
  </div>;
}

export default function IndustryCardSelector() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState<Step>('industry');
  const [query, setQuery] = useState('');
  const [industry, setIndustry] = useState('');
  const [customIndustry, setCustomIndustry] = useState('');
  const [customKind, setCustomKind] = useState<CustomKind>('services');
  const [need, setNeed] = useState('');
  const [selectedCard, setSelectedCard] = useState<string | null>(null);

  const filteredIndustries = useMemo(() => {
    const normalized = query.trim().toLocaleLowerCase('pl');
    if (!normalized) return industryOptions;
    return industryOptions.filter(option => option.label.toLocaleLowerCase('pl').includes(normalized));
  }, [query]);

  const displayIndustry = customIndustry.trim() || industry || 'Twoja branża';
  const needLabel = communicationNeeds.find(option => option.value === need)?.label || '';
  const cards = industry && need ? getCardsForSelection(industry, need, customKind) : [];

  function start() {
    setStarted(true);
    setStep('industry');
    setIndustry('');
    setCustomIndustry('');
    setCustomKind('services');
    setNeed('');
    setSelectedCard(null);
    setQuery('');
  }

  function chooseIndustry(value: string) {
    setIndustry(value);
    setCustomIndustry(value === 'Inna branża' || value === 'Nie widzę swojej branży' ? customIndustry : '');
    setSelectedCard(null);
    setStep('need');
  }

  function chooseNeed(value: string) {
    setNeed(value);
    setSelectedCard(null);
    setStep('cards');
  }

  function back() {
    if (step === 'need') setStep('industry');
    else if (step === 'cards') setStep('need');
    else setStarted(false);
  }

  function reset() {
    start();
  }

  return <section className="industry-tool-section section-pad" id="pomysly-dla-branzy" aria-labelledby="industry-tool-title">
    <div className="industry-tool-intro reveal">
      <span className="eyebrow">03 / POMYSŁY DOPASOWANE DO TWOJEJ MARKI</span>
      <h2 id="industry-tool-title">Wybierz branżę.<br/><em>Znajdź swój kierunek.</em></h2>
      <p>Zobacz, jak łączę temat publikacji z potrzebą marki. Wybierz branżę i cel, a potem odkryj pomysł z bazy: z początkiem tekstu, formatem i propozycją ujęć.</p>
      <span className="industry-tool-subtitle">{preparedCardCount} pomysłów na posty, rolki i karuzele</span>
    </div>

    {!started && <div className="industry-tool-start">
      <div><span className="industry-tool-icon"><Sparkles size={21}/></span><h3>Znajdź pomysł, który pasuje do Twojej pracy.</h3><p>Wybierz branżę, wskaż, czego potrzebujesz, i odkryj jedną z trzech kart.</p></div>
      <button className="button button-orange" type="button" onClick={start}>Wybierz branżę <ArrowRight size={19}/></button>
    </div>}

    {started && <div className="industry-tool-flow" aria-live="polite">
      <div className="industry-tool-progress"><span className={step === 'industry' ? 'is-current' : 'is-done'}>01 <b>Branża</b></span><i/><span className={step === 'need' ? 'is-current' : step === 'cards' ? 'is-done' : ''}>02 <b>Potrzeba</b></span><i/><span className={step === 'cards' ? 'is-current' : ''}>03 <b>Karta</b></span></div>

      {step === 'industry' && <div className="industry-step-card">
        <div className="industry-step-heading"><div><span className="eyebrow">KROK 01</span><h3>W jakiej branży działasz?</h3><p>Kliknij swoją branżę lub znajdź ją po nazwie.</p></div><span className="industry-count">{industryOptions.length} branż</span></div>
        <label className="industry-search"><Search size={18}/><span className="sr-only">Szukaj branży</span><input value={query} onChange={event => setQuery(event.target.value)} placeholder="Zacznij wpisywać swoją branżę…" type="search" /></label>
        <div className="industry-grid" role="list" aria-label="Lista branż">
          {filteredIndustries.map(option => <button className={`industry-tile${industry === option.value ? ' is-selected' : ''}`} key={option.value} type="button" onClick={() => chooseIndustry(option.value)}><span className="industry-tile-symbol" aria-hidden="true">{option.icon}</span><span>{option.label}</span><ArrowRight size={16}/></button>)}
          {filteredIndustries.length === 0 && <button className="industry-tile industry-tile-custom" type="button" onClick={() => chooseIndustry('Nie widzę swojej branży')}><span className="industry-tile-symbol" aria-hidden="true">＋</span><span>Nie widzę swojej branży — wpisz ją samodzielnie.</span><ArrowRight size={16}/></button>}
        </div>
        <button className="industry-custom-option" type="button" onClick={() => chooseIndustry('Inna branża')}><span>＋</span> Inna branża</button>
      </div>}

      {step === 'need' && <div className="industry-step-card">
        <div className="industry-step-heading"><div><span className="eyebrow">KROK 02</span><h3>Czego dziś potrzebuje Twoja marka?</h3><p>Wybierz jeden cel, żeby karty były użyteczne w Twojej sytuacji.</p></div><span className="industry-selected-pill">{industry}</span></div>
        {(industry === 'Inna branża' || industry === 'Nie widzę swojej branży') && <div className="custom-industry-fields"><label>Wpisz swoją branżę<input value={customIndustry} onChange={event => setCustomIndustry(event.target.value)} placeholder="np. studio jogi" /></label><div><span className="custom-kind-label">Najbliższy typ działalności</span><div className="custom-kind-options">{([['services', 'Usługi'], ['products', 'Produkty'], ['personal', 'Marka osobista'], ['local', 'Lokalny biznes']] as const).map(([value, label]) => <button type="button" className={customKind === value ? 'is-selected' : ''} key={value} onClick={() => setCustomKind(value)}>{label}</button>)}</div></div></div>}
        <div className="need-grid" role="list" aria-label="Potrzeby komunikacyjne">{communicationNeeds.map(option => <button className={`need-tile${need === option.value ? ' is-selected' : ''}`} key={option.value} type="button" onClick={() => chooseNeed(option.value)}><span>{option.label}</span><ArrowRight size={16}/></button>)}</div>
        <button className="flow-back" type="button" onClick={back}><ArrowLeft size={17}/> Wróć do branż</button>
      </div>}

      {step === 'cards' && <div className="industry-step-card cards-step-card">
        <div className="industry-step-heading"><div><span className="eyebrow">KROK 03</span><h3>Wybierz jedną z trzech kart.</h3><p>Każda karta jest dopasowana do branży <strong>{displayIndustry}</strong> i potrzeby <strong>{needLabel.toLowerCase()}</strong>. Kliknij, aby ją odkryć.</p></div><span className="industry-selected-pill">{needLabel}</span></div>
        <HorizontalGallery label="Pomysły dla branży" className="idea-gallery">{cards.map((card, index) => <button className={`covered-card${selectedCard === card.id ? ' is-open' : ''}`} key={card.id} type="button" onClick={() => setSelectedCard(card.id)} aria-expanded={selectedCard === card.id}><span className="covered-card-number">0{index + 1}</span>{selectedCard === card.id ? <CardDetails card={card} industry={displayIndustry} needLabel={needLabel}/> : <span className="covered-card-closed"><span className="covered-card-lock">✦</span><strong>Karta do odkrycia</strong><small>Kliknij, aby zobaczyć pomysł</small></span>}</button>)}</HorizontalGallery>
        {selectedCard && <div className="selected-card-note"><span>Wybrana karta</span><p>Chcesz zobaczyć, jak można przełożyć to na Twoją markę? Napisz do mnie.</p><a className="button button-orange" href="#kontakt">Zapytaj o realizację <ArrowRight size={18}/></a></div>}
        <div className="flow-footer"><button className="flow-back" type="button" onClick={back}><ArrowLeft size={17}/> Zmień potrzebę</button><button className="flow-reset" type="button" onClick={reset}><RotateCcw size={16}/> Zacznij od nowa</button></div>
      </div>}
    </div>}
    <a className="industry-contact-link" href="#kontakt">Masz pomysł? Porozmawiajmy o jego realizacji.</a>
  </section>;
}
