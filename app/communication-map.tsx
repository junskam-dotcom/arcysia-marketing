'use client';

import { useState } from 'react';
import { ArrowLeft, ArrowRight, RotateCcw } from 'lucide-react';
import {
  buildCommunicationMap,
  communicationQuestions,
  mapCategories,
  type MapAnswers,
  type RecommendationItem,
} from './communication-map-data';

type CommunicationMapResult = ReturnType<typeof buildCommunicationMap>;

function RecommendationList({ items }: { items: RecommendationItem[] }) {
  return <ul className="map-recommendations">{items.map(item => <li key={item.recommendation}><strong>{item.recommendation}</strong><span>{item.topic}</span><small>{item.format}</small></li>)}</ul>;
}

export default function CommunicationMap() {
  const [started, setStarted] = useState(false);
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<MapAnswers>({});
  const [result, setResult] = useState<CommunicationMapResult | null>(null);
  const question = communicationQuestions[step];
  const questionId = question?.id as keyof MapAnswers | undefined;
  const selectedAnswer = questionId ? answers[questionId] : undefined;

function startQuiz() {
  setStarted(true);
  setStep(0);
  setAnswers({});
  setResult(null);
}

  function chooseAnswer(value: string) {
    if (!questionId) return;
    setAnswers(current => ({ ...current, [questionId]: value }));
  }

  function goNext() {
    if (!selectedAnswer) return;
    if (step === communicationQuestions.length - 1) {
      setResult(buildCommunicationMap(answers));
      return;
    }
    setStep(current => current + 1);
  }

  function goBack() {
    if (step === 0) {
      setStarted(false);
      return;
    }
    setStep(current => current - 1);
  }

  function resetQuiz() {
    setAnswers({});
    setStep(0);
    setResult(null);
    setStarted(true);
  }

  return <section className="communication-map-section section-pad" id="mapa-komunikacji" aria-labelledby="communication-map-title">
    <div className="communication-map-intro reveal">
      <span className="eyebrow">03 / NARZĘDZIE DLA TWOJEJ MARKI</span>
      <h2 id="communication-map-title">Mapa komunikacji <em>marki.</em></h2>
      <p>Nie każda marka potrzebuje mówić o wszystkim. Odpowiedz na kilka pytań i sprawdź, jakie treści powinny stać się podstawą Twojej komunikacji.</p>
      <span className="communication-map-subtitle">Zobacz, co mówić, co pokazywać i jak budować zaufanie do swojej marki.</span>
    </div>

    {!started && !result && <div className="map-start-card">
      <div><span className="map-card-index">01</span><h3>Zacznij od kierunku.</h3><p>Quiz zajmuje kilka chwil. Na końcu dostaniesz ręcznie opracowaną mapę z tematami, formatami i pomysłami na pierwszy krok.</p></div>
      <button className="button button-dark" type="button" onClick={startQuiz}>Stwórz moją mapę <ArrowRight size={19}/></button>
    </div>}

    {started && !result && question && <div className="map-quiz-card" aria-live="polite">
      <div className="map-progress-head"><span>Pytanie {step + 1} z {communicationQuestions.length}</span><span>{Math.round(((step + 1) / communicationQuestions.length) * 100)}%</span></div>
      <progress className="map-progress" value={step + 1} max={communicationQuestions.length} aria-label={`Postęp quizu: pytanie ${step + 1} z ${communicationQuestions.length}`}/>
      <div className="communication-map-step" key={question.id}>
        <h3>{question.prompt}</h3>
        <div className="map-options" role="radiogroup" aria-label={question.prompt}>
          {question.options.map(option => <button key={option.value} type="button" role="radio" aria-checked={selectedAnswer === option.value} className={`map-option${selectedAnswer === option.value ? ' is-selected' : ''}`} onClick={() => chooseAnswer(option.value)}><span className="map-option-marker" aria-hidden="true">{selectedAnswer === option.value ? '✓' : ''}</span><span>{option.label}</span></button>)}
        </div>
      </div>
      <div className="map-quiz-actions"><button className="map-back-button" type="button" onClick={goBack}><ArrowLeft size={17}/> Wstecz</button><button className="button button-orange" type="button" onClick={goNext} disabled={!selectedAnswer}>{step === communicationQuestions.length - 1 ? 'Zobacz moją mapę' : 'Dalej'} <ArrowRight size={18}/></button></div>
    </div>}

    {result && <div className="map-result-card" aria-live="polite">
      <div className="map-result-head"><div><span className="eyebrow">TWOJA MAPA KOMUNIKACJI</span><h3>{result.profile.name}</h3><p>Na podstawie Twoich odpowiedzi przygotowałam kierunek, który pomoże Ci tworzyć bardziej spójne i celowe treści.</p></div><span className="map-result-type">{result.profile.industry}</span></div>
      <p className="map-focus-line">{result.profile.summary}</p>
      <p className="map-focus-detail">{result.focus}</p>
      <div className="map-result-grid">{mapCategories.map(category => <article className="map-result-block" key={category.key}><span className="map-block-number">{String(mapCategories.indexOf(category) + 1).padStart(2, '0')}</span><h4>{category.title}</h4><RecommendationList items={result.recommendations[category.key]}/></article>)}</div>
      <div className="map-ideas"><div className="map-ideas-heading"><span className="eyebrow">OD CZEGO MOŻESZ ZACZĄĆ?</span><h4>Trzy pierwsze tematy.</h4></div><div className="map-ideas-grid">{result.profile.ideas.map(idea => <article key={idea.label}><span>{idea.label}</span><h5>{idea.title}</h5><small>{idea.format}</small></article>)}</div></div>
      <div className="map-result-cta"><p>Dobra komunikacja zaczyna się od kierunku. Jeśli chcesz, mogę pomóc Ci przełożyć tę mapę na konkretny plan i gotowe materiały.</p><div><a className="button button-dark" href="#kontakt">Porozmawiajmy o mojej marce <ArrowRight size={18}/></a><button className="map-reset-button" type="button" onClick={resetQuiz}><RotateCcw size={16}/> Stwórz kolejną mapę</button></div></div>
    </div>}
  </section>;
}
