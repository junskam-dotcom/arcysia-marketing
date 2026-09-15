export type IndustryOption = {
  value: string;
  label: string;
  icon: string;
};

export type CommunicationNeed = {
  value: string;
  label: string;
};

export type IndustryCard = {
  id: string;
  industry: string;
  goal: string;
  name: string;
  message: string;
  hint: string;
  topic: string;
  format: string;
  hook: string;
  screenText: string;
  cta: string;
  visual: string;
  goals: string[];
  matchedNeed?: string;
};

type IndustrySeed = {
  label: string;
  icon: string;
  focus: string;
  process: string;
  proof: string;
  scene: string;
  action: string;
};

export const communicationNeeds: CommunicationNeed[] = [
  { value: 'idea', label: 'Pomysłu na publikację' },
  { value: 'clients', label: 'Większej liczby klientów' },
  { value: 'offer', label: 'Pokazania oferty' },
  { value: 'trust', label: 'Zbudowania zaufania' },
  { value: 'standout', label: 'Wyróżnienia się na tle konkurencji' },
  { value: 'behind', label: 'Pokazania kulis i procesu' },
  { value: 'engagement', label: 'Większej liczby komentarzy i zapisów' },
  { value: 'sales', label: 'Treści sprzedażowych' },
  { value: 'reel', label: 'Pomysłu na rolkę' },
  { value: 'organize', label: 'Uporządkowania komunikacji' },
];

const allGoals = communicationNeeds.map(need => need.value);

const seeds: IndustrySeed[] = [
  { label: 'Agencja eventowa', icon: '✦', focus: 'scenariusz wydarzenia i doświadczenie gościa', process: 'brief, harmonogram, dostawcy i plan B', proof: 'realizacja, która trzyma się planu mimo zmian', scene: 'tablicę produkcyjną, identyfikatory i backstage', action: 'zapytanie o termin, liczbę gości i zakres produkcji' },
  { label: 'Agencja marketingowa', icon: '↗', focus: 'kierunek marki i codzienna komunikacja', process: 'brief, strategię, kreację i publikację', proof: 'decyzje kreatywne opisane przez cel klienta', scene: 'moodboard, plan treści i fragment pracy zespołu', action: 'rozmowę o wyzwaniu marki' },
  { label: 'Agencja PR', icon: '◎', focus: 'relacje, reputację i kontekst marki', process: 'research, media, komunikaty i koordynację', proof: 'przemyślane stanowisko w ważnym momencie', scene: 'notatki prasowe, monitoring i przygotowanie do wywiadu', action: 'konsultację sytuacji komunikacyjnej' },
  { label: 'Architekt wnętrz', icon: '⌂', focus: 'funkcję, światło i charakter przestrzeni', process: 'brief, układ funkcjonalny, materiały i nadzór', proof: 'decyzję projektową, która rozwiązuje realny problem', scene: 'rzuty, próbki materiałów i fragment nadzoru', action: 'rozmowę o przestrzeni i potrzebach' },
  { label: 'Bar', icon: '◌', focus: 'kartę, atmosferę i doświadczenie gościa', process: 'selekcję składników, przygotowanie i obsługę', proof: 'autorski napój opisany przez smak i okazję', scene: 'bar, lód, szkło i przygotowanie serwisu', action: 'rezerwację stolika lub wizytę' },
  { label: 'Barber', icon: '✂', focus: 'konsultację, cięcie i pielęgnację', process: 'rozmowę, dobór kształtu, strzyżenie i stylizację', proof: 'metamorfozę dopasowaną do włosów i trybu życia', scene: 'stanowisko, narzędzia i detal wykończenia', action: 'rezerwację terminu' },
  { label: 'Biuro projektowe', icon: '▦', focus: 'projekt, zakres i odpowiedzialność zespołu', process: 'brief, koncepcję, dokumentację i przekazanie', proof: 'rozwiązanie, które łączy estetykę z funkcją', scene: 'plansze, szkice, makiety i konsultacje', action: 'rozmowę o nowym projekcie' },
  { label: 'Branża beauty', icon: '✧', focus: 'potrzebę klientki, bezpieczeństwo i efekt', process: 'konsultację, zabieg, zalecenia i opiekę', proof: 'rezultat pokazany z kontekstem i czasem', scene: 'przygotowane stanowisko, produkty i detale higieny', action: 'konsultację przed wizytą' },
  { label: 'Catering', icon: '◒', focus: 'menu, logistykę i wygodę gospodarza', process: 'ustalenia, zakupy, przygotowanie, transport i serwis', proof: 'menu dopasowane do liczby osób i okazji', scene: 'przygotowanie półmisków, pakowanie i wydawkę', action: 'zapytanie o datę, liczbę gości i menu' },
  { label: 'Cukiernia', icon: '●', focus: 'smak, dekorację i okazję', process: 'zamówienie, recepturę, dekorowanie i odbiór', proof: 'tort, który pasuje do historii klienta', scene: 'krem, dekoracje, pudełko i poranny wypiek', action: 'zamówienie wypieku' },
  { label: 'Dietetyk', icon: '＋', focus: 'realne nawyki zamiast krótkiej diety', process: 'wywiad, analizę, plan i korekty', proof: 'małą zmianę, którą da się utrzymać', scene: 'jadłospis, zakupy i przygotowanie prostego posiłku', action: 'konsultację dopasowaną do celu' },
  { label: 'Edukacja', icon: '⌁', focus: 'wiedzę, która prowadzi do zrozumienia', process: 'diagnozę, plan zajęć, ćwiczenia i informację zwrotną', proof: 'moment, w którym uczeń zaczyna stosować wiedzę', scene: 'materiały, tablicę i fragment pracy uczestników', action: 'zapis na zajęcia lub rozmowę' },
  { label: 'E-commerce', icon: '□', focus: 'produkt, wybór i doświadczenie zakupowe', process: 'selekcję, prezentację, zamówienie i obsługę', proof: 'produkt pokazany w użyciu, nie tylko na packshocie', scene: 'pakowanie, detal produktu i moment otwarcia paczki', action: 'sprawdzenie wariantów i zamówienie' },
  { label: 'Firma B2B', icon: '▱', focus: 'wpływ rozwiązania na biznes klienta', process: 'brief, decyzje, wdrożenie i raportowanie', proof: 'problem biznesowy przełożony na konkretny zakres', scene: 'spotkanie, dokumentację i pracę zespołu', action: 'rozmowę o projekcie' },
  { label: 'Firma budowlana', icon: '⌂', focus: 'bezpieczeństwo, etapy prac i efekt końcowy', process: 'wycenę, harmonogram, wykonanie i odbiór', proof: 'zmianę na budowie opisaną konkretnym etapem', scene: 'materiały, zabezpieczenia i pracę ekipy', action: 'zapytanie o zakres i termin' },
  { label: 'Firma meblarska', icon: '▤', focus: 'funkcjonalność, materiał i wykonanie', process: 'pomiar, projekt, produkcję i montaż', proof: 'zabudowę dopasowaną do codziennego użycia', scene: 'próbki, fronty, warsztat i montaż', action: 'wycenę mebla na wymiar' },
  { label: 'Firma remontowa', icon: '⚒', focus: 'porządek, termin i jakość wykonania', process: 'zakres, zabezpieczenie, etapy i odbiór', proof: 'remont pokazany od przygotowania do efektu', scene: 'narzędzia, zabezpieczenia i kolejne warstwy pracy', action: 'rozmowę o remoncie' },
  { label: 'Fotograf', icon: '◉', focus: 'kadr, emocję i świadomy sposób pracy', process: 'konsultację, przygotowanie, sesję i selekcję', proof: 'zdjęcie opisane decyzją, nie tylko efektem', scene: 'aparat, światło, wybór kadrów i backstage', action: 'zapytanie o sesję' },
  { label: 'Fryzjer', icon: '✂', focus: 'konsultację, cięcie i pielęgnację', process: 'diagnozę włosów, dobór, wykonanie i zalecenia', proof: 'zmianę dopasowaną do codziennego układania', scene: 'stanowisko, pasma, produkty i finalną stylizację', action: 'rezerwację wizyty' },
  { label: 'Gastronomia', icon: '◒', focus: 'smak, jakość i doświadczenie przy stole', process: 'sezon, przygotowanie, serwis i dbałość o gościa', proof: 'danie opisane składnikiem i historią', scene: 'kuchnię, wydawkę, stół i zespół', action: 'rezerwację lub wizytę' },
  { label: 'Hotel', icon: '▥', focus: 'pobyt, wygodę i lokalny kontekst', process: 'rezerwację, przygotowanie pokoju i opiekę nad gościem', proof: 'detal, który wpływa na cały pobyt', scene: 'pokój, śniadanie, recepcję i okolicę', action: 'sprawdzenie dostępności' },
  { label: 'Kancelaria prawna', icon: '§', focus: 'jasność, poufność i konsekwencje decyzji', process: 'analizę, rekomendację, dokumenty i dalsze kroki', proof: 'złożony temat wyjaśniony bez żargonu', scene: 'pracę nad dokumentem, notatki i rozmowę', action: 'konsultację prawną' },
  { label: 'Kawiarnia', icon: '☕', focus: 'kawę, rytuał i lokalną atmosferę', process: 'ziarno, przygotowanie, obsługę i codzienny rytm', proof: 'smak opisany przez pochodzenie i sposób parzenia', scene: 'młynek, ekspres, filiżankę i ludzi przy stoliku', action: 'odwiedziny lub zamówienie' },
  { label: 'Kosmetolog', icon: '✧', focus: 'diagnozę skóry, bezpieczeństwo i plan pielęgnacji', process: 'konsultację, zabieg, zalecenia i obserwację', proof: 'zmianę pokazaną z właściwym kontekstem', scene: 'konsultację, produkty i przygotowanie gabinetu', action: 'konsultację skóry' },
  { label: 'Kwiaciarnia', icon: '❋', focus: 'sezonowe kwiaty, kompozycję i okazję', process: 'zamówienie, dobór, przygotowanie i odbiór', proof: 'bukiet dopasowany do osoby lub wydarzenia', scene: 'świeże kwiaty, pracę nad kompozycją i pakowanie', action: 'zamówienie bukietu' },
  { label: 'Lekarz lub klinika', icon: '＋', focus: 'informację, bezpieczeństwo i drogę pacjenta', process: 'konsultację, diagnozę, plan i kontrolę', proof: 'wyjaśnienie procesu bez obietnic i skrótów', scene: 'gabinet, przygotowanie i edukację pacjenta', action: 'umówienie konsultacji' },
  { label: 'Lokalny biznes', icon: '⌖', focus: 'miejsce, ludzi i powód, żeby wrócić', process: 'codzienną obsługę, ofertę i relację z okolicą', proof: 'historię miejsca lub klienta z sąsiedztwa', scene: 'wejście, zespół, produkt i lokalny detal', action: 'wizytę, wiadomość lub rezerwację' },
  { label: 'Marka biżuteryjna', icon: '◇', focus: 'detal, znaczenie i sposób noszenia', process: 'projekt, materiał, wykonanie i pakowanie', proof: 'przedmiot pokazany w konkretnej historii', scene: 'teksturę, zapięcie, pudełko i stylizację', action: 'obejrzenie kolekcji' },
  { label: 'Marka osobista', icon: '✦', focus: 'doświadczenie, punkt widzenia i decyzje', process: 'pracę, naukę, rozmowy i codzienne wybory', proof: 'wniosek z projektu opisany własnym głosem', scene: 'notatki, spotkanie, narzędzia i zwykły dzień pracy', action: 'rozmowę o współpracy' },
  { label: 'Marka odzieżowa', icon: '◇', focus: 'kroju, materiale i sposobie noszenia', process: 'projekt, odszycie, przymiarki i wysyłkę', proof: 'ubranie pokazane w ruchu i w realnej stylizacji', scene: 'tkaninę, detale, przymiarkę i pakowanie', action: 'sprawdzenie rozmiarów i kolekcji' },
  { label: 'Nieruchomości', icon: '⌂', focus: 'lokalizacji, funkcji i bezpiecznej decyzji', process: 'analizę potrzeb, prezentację, formalności i finalizację', proof: 'nieruchomość opisaną faktami i kontekstem', scene: 'wnętrze, okolicę, dokumenty i prezentację', action: 'umówienie prezentacji' },
  { label: 'Piekarnia', icon: '◒', focus: 'świeżego pieczywa, składników i poranka', process: 'wyrabianie, fermentację, wypiek i ekspozycję', proof: 'bochenek pokazany przez strukturę i smak', scene: 'mąkę, dłonie, piec i poranną ladę', action: 'wizytę po świeże pieczywo' },
  { label: 'Psycholog lub terapeuta', icon: '○', focus: 'bezpiecznej relacji, psychoedukacji i procesu', process: 'pierwszego kontaktu, rozmowy, celów i podsumowania', proof: 'temat wyjaśniony z uważnością i granicami', scene: 'gabinet, materiały i neutralne kadry atmosfery', action: 'pierwszą konsultację' },
  { label: 'Restauracja', icon: '◒', focus: 'dania, składników i doświadczenia gościa', process: 'menu, przygotowanie, serwis i sezonowość', proof: 'danie opisane przez smak, składnik i decyzję kuchni', scene: 'kuchnię, talerz, serwis i stół', action: 'rezerwację stolika' },
  { label: 'Rękodzieło', icon: '✋', focus: 'materiału, procesu i osobistego charakteru', process: 'wybór materiałów, wykonanie, kontrolę i pakowanie', proof: 'przedmiot z historią powstania', scene: 'dłonie, narzędzia, fakturę i paczkę', action: 'zamówienie lub wybór wzoru' },
  { label: 'Salon kosmetyczny', icon: '✧', focus: 'usługi, komfortu i efektu wizyty', process: 'rezerwację, przygotowanie, wykonanie i zalecenia', proof: 'rezultat pokazany bez filtrów i z kontekstem', scene: 'salon, stanowisko, produkty i detale obsługi', action: 'rezerwację terminu' },
  { label: 'Sklep internetowy', icon: '□', focus: 'wyboru produktu, zakupu i obsługi', process: 'prezentację, zamówienie, pakowanie i kontakt po zakupie', proof: 'produkt pokazany w użyciu i w skali', scene: 'karton, produkt, detal i moment otwarcia', action: 'sprawdzenie dostępności' },
  { label: 'Społeczność kobiet', icon: '◌', focus: 'spotkania, relacje i rozwój uczestniczek', process: 'temat, zapisy, moderację i follow-up', proof: 'historię uczestniczki lub wniosek ze spotkania', scene: 'krąg rozmowy, notatki i przygotowania', action: 'dołączenie do spotkania' },
  { label: 'Szkoła lub placówka edukacyjna', icon: '⌁', focus: 'bezpiecznego środowiska i postępów uczniów', process: 'program, zajęcia, komunikację i podsumowanie', proof: 'konkretną umiejętność zdobytą przez ucznia', scene: 'salę, materiały, nauczyciela i pracę grupy', action: 'zapis lub rozmowę rekrutacyjną' },
  { label: 'Trener personalny', icon: '↗', focus: 'celu, techniki i regularności bez presji', process: 'diagnozę, plan, trening i korekty', proof: 'postęp opisany zachowaniem lub nawykiem', scene: 'ćwiczenie, przygotowanie i notatkę treningową', action: 'konsultację treningową' },
  { label: 'Usługi', icon: '＋', focus: 'problemu klienta i jasnego zakresu pomocy', process: 'rozmowę, plan, realizację i podsumowanie', proof: 'konkretną zmianę po wykonaniu usługi', scene: 'narzędzia, przygotowanie i kolejne etapy', action: 'zapytanie o zakres i termin' },
  { label: 'Wedding planner', icon: '◇', focus: 'historii pary, harmonogramu i spokoju w dniu ślubu', process: 'koncepcję, dostawców, scenariusz i koordynację', proof: 'decyzję, która ułatwia parze przeżycie dnia', scene: 'moodboard, harmonogram, dekoracje i backstage', action: 'rozmowę o wizji uroczystości' },
  { label: 'Inna branża', icon: '＋', focus: 'najważniejszej potrzeby odbiorcy i konkretnego rozwiązania', process: 'poznanie sytuacji, przygotowanie i realizację', proof: 'zmianę opisaną przez punkt wyjścia i efekt', scene: 'narzędzia pracy, produkt lub miejsce obsługi', action: 'rozmowę o projekcie' },
];

export const industryOptions: IndustryOption[] = seeds
  .filter(seed => seed.label !== 'Inna branża')
  .map(seed => ({ value: seed.label, label: seed.label, icon: seed.icon }))
  .sort((a, b) => a.label.localeCompare(b.label, 'pl'));

const cardAngles = [
  { name: 'Od kuchni', format: 'Rolka zza kulis', goal: 'behind' },
  { name: 'Wybór bez zgadywania', format: 'Karuzela edukacyjna', goal: 'offer' },
  { name: 'Historia jednej realizacji', format: 'Case study', goal: 'trust' },
  { name: 'Pytanie, które wraca', format: 'Karuzela FAQ', goal: 'engagement' },
  { name: 'Jedna decyzja, duża różnica', format: 'Rolka mówiona', goal: 'standout' },
];

function buildCard(seed: IndustrySeed, index: number): IndustryCard {
  const angle = cardAngles[index];
  const content = [
    {
      message: `Pokaż ${seed.process}, żeby odbiorca zobaczył, co dzieje się, zanim otrzyma gotową realizację.`,
      hint: `Nagraj trzy krótkie momenty: przygotowanie, decyzję i etap końcowy. Zostaw naturalny dźwięk pracy.`,
      topic: `Od przygotowań do realizacji. Pokaż: ${seed.process}.`,
      hook: 'Co robimy, zanim zobaczysz gotowy efekt?',
      screen: 'Zobacz, co dzieje się przed efektem.',
      cta: 'Chcesz wiedzieć, jak wyglądałoby to u Ciebie? Napisz do nas.',
      visual: `Detal procesu: ${seed.scene}.`,
    },
    {
      message: `Pokaż dwa warianty oferty i wyjaśnij, kiedy wybrać każdy z nich. Oprzyj porównanie o to, co oferujesz: ${seed.focus}.`,
      hint: 'Zbuduj trzy slajdy według kryterium, sytuacji i rekomendacji. Odpowiedz na jedno realne pytanie zakupowe.',
      topic: `Dwa warianty, dwie potrzeby — porównanie oferty. Branża: ${seed.label}.`,
      hook: 'Nie wiesz, od czego zacząć? Zacznij od tego jednego kryterium.',
      screen: 'Wybór dopasowany do Twojej sytuacji.',
      cta: 'Zapisz porównanie. Jeśli nadal się wahasz, opisz nam, czego potrzebujesz.',
      visual: `Zestaw dwa warianty obok siebie i podpisz różnice. Pokaż detale: ${seed.scene}.`,
    },
    {
      message: 'Opowiedz o jednej realizacji: z czym przyszedł klient, co zaproponowaliście i co otrzymał. Użyj tylko potwierdzonych informacji.',
      hint: 'Nie ograniczaj się do zdjęcia końcowego. Dodaj jedno zdanie o wyzwaniu i jedną decyzję, która miała znaczenie.',
      topic: `Od potrzeby do efektu: ${seed.focus}.`,
      hook: 'Ten efekt zaczął się od jednego konkretnego problemu.',
      screen: 'Problem. Decyzja. Efekt.',
      cta: 'Masz podobną sytuację? Napisz, czego potrzebujesz.',
      visual: `Trzy kadry tej samej realizacji: przed, w trakcie i po.`,
    },
    {
      message: 'Wybierz jedno pytanie, które wraca przed zamówieniem lub pierwszą wizytą. Wyjaśnij, co warto przygotować i jak wygląda następny krok.',
      hint: 'Zbierz pytania z wiadomości i rozmów. Jedna karta powinna odpowiadać na jedno pytanie, bez ogólników.',
      topic: `Pierwszy kontakt: o co zapytać i co przygotować? Branża: ${seed.label}.`,
      hook: 'Zanim napiszesz lub zarezerwujesz, sprawdź te trzy rzeczy.',
      screen: 'Najczęstsze pytanie, konkretna odpowiedź.',
      cta: 'Zostaw swoje pytanie w komentarzu albo wiadomości.',
      visual: `Umieść pytanie na pierwszym slajdzie, a odpowiedź na kolejnych. W tle pokaż: ${seed.scene}.`,
    },
    {
      message: 'Wybierz jedną decyzję dotyczącą produktu lub obsługi. Wyjaśnij, dlaczego robicie coś właśnie tak i co zyskuje na tym klient.',
      hint: 'Wybierz detal, który zwykle pozostaje niewidoczny. Powiedz, co zmienia dla odbiorcy i dlaczego go pilnujesz.',
      topic: `Dlaczego robimy to właśnie tak? Branża: ${seed.label}.`,
      hook: 'To mały detal, ale właśnie on zmienia doświadczenie odbiorcy.',
      screen: 'Wyróżnik, który ma znaczenie.',
      cta: 'Na co Ty zwracasz uwagę przy wyborze? Daj znać w komentarzu.',
      visual: `Zbliżenie na detal: ${seed.scene}.`,
    },
  ][index];

  return {
    id: `${seed.label.toLowerCase().replace(/[^a-z0-9ąćęłńóśźż]+/gi, '-')}-${index + 1}`,
    industry: seed.label,
    goal: angle.goal,
    name: `${seed.label} — ${angle.name}`,
    message: content.message,
    hint: content.hint,
    topic: content.topic,
    format: angle.format,
    hook: content.hook,
    screenText: content.screen,
    cta: content.cta,
    visual: content.visual,
    goals: allGoals,
  };
}

export const industryCards: IndustryCard[] = seeds.flatMap(seed => cardAngles.map((_, index) => buildCard(seed, index)));

const universalSeeds: Record<'services' | 'products' | 'personal' | 'local', IndustrySeed> = {
  services: { label: 'Uniwersalne usługi', icon: '＋', focus: 'problemu klienta i zakresu pomocy', process: 'rozmowę, przygotowanie, realizację i podsumowanie', proof: 'konkretną zmianę po wykonaniu usługi', scene: 'narzędzia, notatki i kolejne etapy pracy', action: 'zapytanie o zakres i termin' },
  products: { label: 'Uniwersalne produkty', icon: '□', focus: 'zastosowania, jakości i wyboru produktu', process: 'projekt, wykonanie, pakowanie i dostawę', proof: 'produkt pokazany w realnym użyciu', scene: 'detal produktu, pakowanie i moment otwarcia', action: 'sprawdzenie wariantów i zamówienie' },
  personal: { label: 'Uniwersalna marka osobista', icon: '✦', focus: 'doświadczenia, decyzji i punktu widzenia', process: 'codzienną pracę, naukę i rozmowy z klientami', proof: 'wniosek wyciągnięty z konkretnego projektu', scene: 'notatki, spotkanie i zwykły dzień pracy', action: 'rozmowę o współpracy' },
  local: { label: 'Uniwersalny lokalny biznes', icon: '⌖', focus: 'miejsca, ludzi i powodu do wizyty', process: 'przygotowanie miejsca, obsługę i codzienny rytm', proof: 'historię klienta lub lokalnego kontekstu', scene: 'wejście, zespół, produkt i okolicę', action: 'wizytę, wiadomość lub rezerwację' },
};

export const universalCards = Object.fromEntries(
  Object.entries(universalSeeds).map(([key, seed]) => [key, cardAngles.map((_, index) => buildCard(seed, index))]),
) as Record<keyof typeof universalSeeds, IndustryCard[]>;

function stableStart(value: string) {
  return [...value].reduce((total, character) => total + character.charCodeAt(0), 0);
}

export function getCardsForSelection(industry: string, need: string, customKind: keyof typeof universalSeeds = 'services') {
  const custom = industry === 'Inna branża' || industry === 'Nie widzę swojej branży';
  const pool = custom ? universalCards[customKind] : industryCards.filter(card => card.industry === industry);
  const start = stableStart(`${industry}-${need}`) % pool.length;
  return [0, 1, 2].map(offset => ({ ...pool[(start + offset) % pool.length], industry: custom ? industry : pool[(start + offset) % pool.length].industry, matchedNeed: need }));
}

export const preparedCardCount = industryCards.length;
