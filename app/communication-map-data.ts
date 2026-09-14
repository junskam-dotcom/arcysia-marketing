export type MapCategory = 'speak' | 'dontSkip' | 'show' | 'emotion' | 'sell';

export type MapAnswers = {
  type?: string;
  audience?: string;
  goal?: string;
  problem?: string;
  content?: string;
  tone?: string;
};

export type RecommendationItem = {
  industry: string;
  brandType: string;
  goals: string[];
  problem: string;
  category: MapCategory;
  recommendation: string;
  topic: string;
  format: string;
};

export type ContentIdea = {
  label: 'Rolka' | 'Karuzela' | 'Treść sprzedażowa';
  title: string;
  format: string;
};

type RawRecommendation = Omit<RecommendationItem, 'industry' | 'brandType' | 'goals' | 'problem' | 'category'>;

type ProfileRules = {
  types: string[];
  audiences: string[];
  goals: string[];
  problems: string[];
  content: string[];
  tones: string[];
};

type RecommendationProfile = {
  key: string;
  name: string;
  industry: string;
  brandType: string;
  goals: string[];
  problem: string;
  rules: ProfileRules;
  summary: string;
  recommendations: Record<MapCategory, RawRecommendation[]>;
  ideas: ContentIdea[];
};

export const communicationQuestions = [
  {
    id: 'type',
    prompt: 'Czym zajmuje się Twoja marka?',
    options: [
      { value: 'service', label: 'Usługi' },
      { value: 'product', label: 'Produkty' },
      { value: 'personal', label: 'Marka osobista' },
      { value: 'local', label: 'Lokalny biznes' },
      { value: 'ecommerce', label: 'Sklep internetowy' },
      { value: 'unknown', label: 'Jeszcze nie wiem' },
    ],
  },
  {
    id: 'audience',
    prompt: 'Do kogo przede wszystkim mówisz?',
    options: [
      { value: 'new', label: 'Do osób, które dopiero mnie poznają' },
      { value: 'interested', label: 'Do osób zainteresowanych ofertą' },
      { value: 'clients', label: 'Do obecnych klientów' },
      { value: 'companies', label: 'Do firm' },
      { value: 'women', label: 'Do kobiet' },
      { value: 'community', label: 'Do konkretnej lokalnej społeczności' },
    ],
  },
  {
    id: 'goal',
    prompt: 'Co chcesz osiągnąć dzięki komunikacji?',
    options: [
      { value: 'awareness', label: 'Zwiększyć rozpoznawalność' },
      { value: 'leads', label: 'Zdobywać więcej zapytań' },
      { value: 'sales', label: 'Sprzedawać produkty lub usługi' },
      { value: 'expert', label: 'Budować ekspercki wizerunek' },
      { value: 'results', label: 'Pokazywać realizacje' },
      { value: 'trust', label: 'Zbudować zaufanie do marki' },
    ],
  },
  {
    id: 'problem',
    prompt: 'Co jest dziś największym problemem?',
    options: [
      { value: 'no_topics', label: 'Nie wiem, o czym publikować' },
      { value: 'no_plan', label: 'Publikuję bez konkretnego planu' },
      { value: 'few_inquiries', label: 'Mam mało zapytań' },
      { value: 'inconsistent', label: 'Moja marka wygląda niespójnie' },
      { value: 'not_offer', label: 'Nie pokazuję wystarczająco swojej oferty' },
      { value: 'no_materials', label: 'Nie mam materiałów do publikacji' },
    ],
  },
  {
    id: 'content',
    prompt: 'Co możesz pokazywać w swoich treściach?',
    options: [
      { value: 'self', label: 'Siebie i swoją wiedzę' },
      { value: 'products', label: 'Produkty' },
      { value: 'results', label: 'Realizacje' },
      { value: 'process', label: 'Proces pracy' },
      { value: 'team', label: 'Zespół i kulisy' },
      { value: 'reviews', label: 'Opinie klientów' },
      { value: 'few_materials', label: 'Mam niewiele materiałów' },
    ],
  },
  {
    id: 'tone',
    prompt: 'Jak chcesz, żeby odbiorcy odbierali Twoją markę?',
    options: [
      { value: 'expert', label: 'Jako ekspercką' },
      { value: 'premium', label: 'Jako premium' },
      { value: 'human', label: 'Jako bliską i ludzką' },
      { value: 'specific', label: 'Jako konkretną i skuteczną' },
      { value: 'creative', label: 'Jako kreatywną' },
      { value: 'trust', label: 'Jako godną zaufania' },
    ],
  },
] as const;

const item = (recommendation: string, topic: string, format: string): RawRecommendation => ({ recommendation, topic, format });

const makeProfile = (profile: Omit<RecommendationProfile, 'recommendations'> & { recommendations: Record<MapCategory, RawRecommendation[]> }): RecommendationProfile => profile;

export const communicationProfiles: RecommendationProfile[] = [
  makeProfile({
    key: 'personal', name: 'Marka osobista', industry: 'Marka osobista', brandType: 'Marka osobista',
    goals: ['rozpoznawalność', 'eksperckość', 'zaufanie'], problem: 'trudno przełożyć wiedzę na regularne treści',
    rules: { types: ['personal'], audiences: ['new', 'interested'], goals: ['expert', 'awareness', 'trust'], problems: ['no_topics', 'no_plan', 'inconsistent'], content: ['self', 'process'], tones: ['expert', 'human', 'creative'] },
    summary: 'Twoja marka powinna komunikować wiedzę, punkt widzenia, proces i osobę, która stoi za decyzjami.',
    recommendations: {
      speak: [item('o swoim sposobie myślenia i decyzjach, które pomagają klientom ruszyć dalej', 'Jak podejmuję decyzje w projekcie?', 'Rolka mówiona'), item('o pytaniach i problemach, które najczęściej wracają w rozmowach', '3 pytania, które słyszę przed startem współpracy', 'Karuzela'), item('o doświadczeniu bez tworzenia dystansu eksperta nieomylnego', 'Czego nauczył mnie ostatni projekt?', 'Post osobisty')],
      dontSkip: [item('dla kogo jest Twoja wiedza i w jakiej sytuacji realnie pomaga', 'Dla kogo jest moja oferta?', 'Karuzela'), item('jak wygląda współpraca od pierwszej rozmowy do efektu', '4 kroki wspólnego projektu', 'Karuzela'), item('granice, wartości i standardy, które porządkują markę', 'Na czym nie oszczędzam w pracy?', 'Post tekstowy')],
      show: [item('siebie w naturalnych sytuacjach, nie tylko gotowy rezultat', 'Dzień pracy między strategią a realizacją', 'Rolka zza kulis'), item('fragmenty procesu: notatki, decyzje, poprawki i wybór kierunku', 'Od briefu do jednej konkretnej decyzji', 'Stories'), item('efekty współpracy wraz z kontekstem, bez obietnic bez pokrycia', 'Co zmieniło się po uporządkowaniu komunikacji?', 'Case study')],
      emotion: [item('spokój wynikający z jasnego planu', 'Jak zdejmuję chaos z projektu?', 'Rolka edukacyjna'), item('bliskość i ludzką perspektywę', 'Co warto wiedzieć o mnie przed współpracą?', 'Post osobisty'), item('pewność, że za marką stoi konkretna osoba', 'Poznaj mój sposób pracy', 'Stories')],
      sell: [item('odpowiedzi na pytania, które blokują decyzję o kontakcie', 'Czy ta współpraca jest dla mnie?', 'Karuzela FAQ'), item('jasne przedstawienie zakresu i kolejnego kroku', 'Co otrzymujesz po konsultacji?', 'Post ofertowy'), item('zaproszenie do rozmowy o konkretnym problemie', 'Opowiedz mi, z czym dziś przychodzisz', 'Rolka z CTA')],
    },
    ideas: [{ label: 'Rolka', title: '3 rzeczy, które warto uporządkować przed publikowaniem', format: 'Rolka mówiona' }, { label: 'Karuzela', title: 'Jak wygląda współpraca krok po kroku?', format: 'Karuzela edukacyjna' }, { label: 'Treść sprzedażowa', title: 'Dla kogo jest moja usługa i jaki problem rozwiązuję?', format: 'Post ofertowy' }],
  }),
  makeProfile({
    key: 'service', name: 'Firma usługowa', industry: 'Usługi', brandType: 'Firma usługowa',
    goals: ['zapytania', 'sprzedaż', 'zaufanie'], problem: 'oferta jest dobra, ale odbiorca nie widzi kolejnego kroku',
    rules: { types: ['service', 'unknown'], audiences: ['interested', 'clients'], goals: ['leads', 'sales', 'trust'], problems: ['few_inquiries', 'not_offer', 'no_plan'], content: ['process', 'results', 'self'], tones: ['specific', 'trust'] },
    summary: 'Twoja marka powinna komunikować problem klienta, sposób pracy, efekt i prostą drogę do kontaktu.',
    recommendations: {
      speak: [item('o problemach, z którymi klienci przychodzą do Ciebie najczęściej', 'Co naprawdę blokuje klienta przed decyzją?', 'Rolka edukacyjna'), item('o różnicy między popularnym rozwiązaniem a rozwiązaniem dopasowanym', 'Kiedy standardowa usługa nie wystarcza?', 'Karuzela porównawcza'), item('o tym, jak wygląda Twoja metoda pracy i dlaczego działa', 'Mój proces w 4 krokach', 'Rolka zza kulis')],
      dontSkip: [item('dla kogo jest usługa, a dla kogo nie będzie właściwym wyborem', 'Czy ta usługa jest dla Ciebie?', 'Karuzela'), item('co klient otrzymuje na końcu i jak mierzycie gotowość do odbioru', 'Co wychodzi z naszej współpracy?', 'Post ofertowy'), item('warunki, zakres i odpowiedzialność po obu stronach', 'Co ustalamy przed startem?', 'Karuzela FAQ')],
      show: [item('fragmenty procesu, które budują zaufanie przed zakupem', 'Tak wygląda praca nad Twoim projektem', 'Rolka zza kulis'), item('realizacje z krótkim opisem sytuacji wyjściowej i rozwiązania', 'Problem, decyzja, efekt', 'Case study'), item('osobę lub zespół, który odpowiada za jakość usługi', 'Kto stoi za realizacją?', 'Rolka wizerunkowa')],
      emotion: [item('spokój, bo klient wie, co wydarzy się dalej', 'Co dzieje się po wysłaniu zapytania?', 'Karuzela'), item('pewność wyboru opartą na konkretach', '5 faktów przed decyzją', 'Post edukacyjny'), item('poczucie zaopiekowania bez obiecywania nierealnych efektów', 'Jak dbamy o komunikację w projekcie?', 'Stories')],
      sell: [item('odpowiedzi na obiekcje i pytania z pierwszej rozmowy', 'Najczęstsze pytania o usługę', 'Karuzela FAQ'), item('pokazanie wariantów i sytuacji, w których każdy z nich ma sens', 'Który zakres współpracy wybrać?', 'Post ofertowy'), item('wezwanie do konsultacji z jednym konkretnym tematem', 'Napisz, czego potrzebujesz', 'Rolka z CTA')],
    },
    ideas: [{ label: 'Rolka', title: '3 rzeczy, które klient powinien wiedzieć przed rozpoczęciem współpracy', format: 'Rolka mówiona' }, { label: 'Karuzela', title: 'Jak wygląda współpraca krok po kroku?', format: 'Karuzela edukacyjna' }, { label: 'Treść sprzedażowa', title: 'Dla kogo jest moja usługa i jaki problem rozwiązuję?', format: 'Post ofertowy' }],
  }),
  makeProfile({
    key: 'ecommerce', name: 'Sklep internetowy', industry: 'E-commerce', brandType: 'Sklep internetowy',
    goals: ['sprzedaż', 'rozpoznawalność', 'zaufanie'], problem: 'produkt jest widoczny, ale komunikacja nie pomaga w wyborze',
    rules: { types: ['product', 'ecommerce'], audiences: ['interested', 'clients', 'women'], goals: ['sales', 'awareness', 'trust'], problems: ['few_inquiries', 'not_offer', 'no_materials'], content: ['products', 'process', 'reviews'], tones: ['premium', 'specific', 'trust'] },
    summary: 'Twoja marka powinna komunikować użyteczność produktu, jego charakter, dowody jakości i prosty powód zakupu.',
    recommendations: {
      speak: [item('o sytuacjach, w których produkt realnie ułatwia życie', 'Kiedy ten produkt przydaje się najbardziej?', 'Rolka produktowa'), item('o różnicach między wariantami i kryteriach dobrego wyboru', 'Który wariant wybrać?', 'Karuzela porównawcza'), item('o materiale, wykonaniu i decyzjach stojących za produktem', 'Co kryje się za produktem?', 'Post edukacyjny')],
      dontSkip: [item('dla kogo produkt jest przeznaczony i jak go używać', 'Dla kogo powstała ta kolekcja?', 'Karuzela'), item('dostawie, zwrotach, pielęgnacji i innych pytaniach przed zakupem', 'Co warto wiedzieć przed zamówieniem?', 'Karuzela FAQ'), item('dowodach jakości: opiniach, detalach, powtarzalności i obsłudze', 'Po czym poznasz dobrą jakość?', 'Post edukacyjny')],
      show: [item('produkt w użyciu, w skali i w kontekście codzienności', 'Produkt w prawdziwym dniu', 'Rolka demonstracyjna'), item('detale, faktury i sposób pakowania', 'Z bliska: materiał i wykończenie', 'Rolka detali'), item('opinie i reakcje klientów z konkretnym kontekstem', 'Co klienci zauważają po zakupie?', 'Karuzela z opiniami')],
      emotion: [item('chęć posiadania bez presji i sztucznego niedoboru', 'Co sprawia, że ten produkt zostaje na dłużej?', 'Post wizerunkowy'), item('pewność, że wybór będzie dopasowany', 'Jak dobrać produkt do swojej sytuacji?', 'Karuzela'), item('przyjemność kontaktu z marką od paczki po użytkowanie', 'Od zamówienia do pierwszego użycia', 'Rolka unboxing')],
      sell: [item('porównania, które skracają drogę do decyzji', '3 różnice między wariantami', 'Karuzela porównawcza'), item('prezentacja kolekcji z jasnym zastosowaniem każdego produktu', 'Zobacz, co pasuje do Twoich potrzeb', 'Rolka produktowa'), item('konkretne wezwanie do obejrzenia produktu lub zakupu', 'Sprawdź dostępne warianty', 'Post sprzedażowy')],
    },
    ideas: [{ label: 'Rolka', title: 'Produkt w użyciu: 3 sytuacje, w których robi różnicę', format: 'Rolka demonstracyjna' }, { label: 'Karuzela', title: 'Jak wybrać właściwy wariant produktu?', format: 'Karuzela porównawcza' }, { label: 'Treść sprzedażowa', title: 'Co otrzymujesz po zamówieniu i dlaczego warto zacząć od tego produktu?', format: 'Post sprzedażowy' }],
  }),
  makeProfile({
    key: 'beauty', name: 'Beauty', industry: 'Beauty', brandType: 'Marka beauty',
    goals: ['zaufanie', 'sprzedaż', 'rozpoznawalność'], problem: 'odbiorca potrzebuje więcej spokoju i konkretów przed wizytą',
    rules: { types: ['service', 'local'], audiences: ['women', 'community', 'interested'], goals: ['trust', 'sales', 'awareness'], problems: ['few_inquiries', 'not_offer'], content: ['process', 'results', 'self'], tones: ['premium', 'human', 'trust'] },
    summary: 'Twoja marka powinna komunikować bezpieczeństwo, doświadczenie, przebieg wizyty i efekt dopasowany do osoby.',
    recommendations: {
      speak: [item('o potrzebach skóry, włosów lub ciała bez zawstydzania odbiorcy', 'Z jakim problemem możesz przyjść?', 'Rolka edukacyjna'), item('o przygotowaniu, pielęgnacji i realistycznych efektach', 'Co zrobić przed i po zabiegu?', 'Karuzela'), item('o wiedzy specjalistycznej przełożonej na prosty język', 'Jedno pojęcie beauty wyjaśnione prosto', 'Rolka mówiona')],
      dontSkip: [item('dla kogo jest zabieg i kiedy warto wybrać inną drogę', 'Czy ten zabieg jest dla mnie?', 'Karuzela FAQ'), item('przebieg wizyty, przeciwwskazania i zalecenia po zabiegu', 'Wizyta krok po kroku', 'Karuzela'), item('osobę specjalistki oraz standard opieki', 'Kto będzie się Tobą zajmować?', 'Rolka wizerunkowa')],
      show: [item('gabinet, przygotowanie stanowiska i higienę pracy', 'Zobacz gabinet przed pierwszą wizytą', 'Rolka zza kulis'), item('fragmenty procesu i detale bez epatowania zabiegiem', 'Jak wygląda przygotowanie do zabiegu?', 'Rolka detali'), item('efekty z opisem kontekstu i czasu, który był potrzebny', 'Rezultat po określonym czasie', 'Karuzela edukacyjna')],
      emotion: [item('spokój i bezpieczeństwo przed pierwszym kontaktem', 'Co czeka Cię na miejscu?', 'Rolka informacyjna'), item('troskę i poczucie indywidualnego podejścia', 'Jak dobieramy rozwiązanie?', 'Post osobisty'), item('premium rozumiane jako jakość doświadczenia, nie obietnica bez końca', 'Detale, które budują jakość wizyty', 'Rolka estetyczna')],
      sell: [item('rekomendacje zabiegów dopasowane do konkretnych potrzeb', 'Od czego zacząć przy tym problemie?', 'Karuzela'), item('odpowiedzi na pytania o przebieg i przygotowanie', 'Najczęstsze pytania przed wizytą', 'Rolka FAQ'), item('zaproszenie do konsultacji lub rezerwacji', 'Umów konsultację i poznaj właściwy kierunek', 'Post z CTA')],
    },
    ideas: [{ label: 'Rolka', title: 'Co warto wiedzieć przed pierwszą wizytą?', format: 'Rolka edukacyjna' }, { label: 'Karuzela', title: 'Zabieg krok po kroku: przygotowanie, przebieg, zalecenia', format: 'Karuzela informacyjna' }, { label: 'Treść sprzedażowa', title: 'Dla kogo jest ten zabieg i kiedy zacząć od konsultacji?', format: 'Post z CTA' }],
  }),
  makeProfile({
    key: 'expert', name: 'Kancelaria lub firma ekspercka', industry: 'Prawo i usługi eksperckie', brandType: 'Kancelaria lub firma ekspercka',
    goals: ['eksperckość', 'zaufanie', 'zapytania'], problem: 'trudno mówić o złożonych tematach jasno i bez nadmiernego żargonu',
    rules: { types: ['personal', 'service'], audiences: ['companies', 'interested'], goals: ['expert', 'trust', 'leads'], problems: ['no_plan', 'no_topics', 'inconsistent'], content: ['self', 'process', 'results'], tones: ['expert', 'specific', 'trust'] },
    summary: 'Twoja marka powinna komunikować kompetencje, konsekwencje decyzji, proces i język, który daje odbiorcy orientację.',
    recommendations: {
      speak: [item('o problemach i decyzjach, które wymagają fachowego spojrzenia', 'Kiedy warto skonsultować sprawę?', 'Rolka mówiona'), item('o ryzyku, konsekwencjach i możliwych scenariuszach', '3 pytania przed ważną decyzją', 'Karuzela'), item('o złożonych pojęciach prostym, odpowiedzialnym językiem', 'Jedno pojęcie wyjaśnione bez żargonu', 'Post edukacyjny')],
      dontSkip: [item('zakresie odpowiedzialności i granicach usługi', 'Co obejmuje konsultacja?', 'Karuzela'), item('procesie, dokumentach i informacjach potrzebnych do startu', 'Jak przygotować się do pierwszej rozmowy?', 'Karuzela FAQ'), item('doświadczeniu pokazanym przez sposób pracy, bez niepotwierdzonych obietnic', 'Jak pracuję nad sprawą?', 'Rolka zza kulis')],
      show: [item('tok myślenia i sposób porządkowania informacji', 'Od faktów do kolejnych kroków', 'Rolka edukacyjna'), item('fragmenty procesu z zachowaniem poufności danych', 'Jak przygotowuję analizę?', 'Stories'), item('anonimowe scenariusze i wnioski, zamiast fikcyjnych wyników', 'Czego uczy ten typ sprawy?', 'Karuzela')],
      emotion: [item('kompetencję bez onieśmielania odbiorcy', 'Możesz zapytać o to wprost', 'Post osobisty'), item('spokój, bo kolejne kroki są nazwane', 'Co wydarzy się po rozmowie?', 'Karuzela'), item('zaufanie budowane przez precyzję i dyskrecję', 'Jak dbam o poufność?', 'Rolka informacyjna')],
      sell: [item('treści odpowiadające na pytania przed pierwszym kontaktem', 'Czy potrzebujesz konsultacji?', 'Karuzela FAQ'), item('jasne opisanie zakresu i sytuacji, w których pomagasz', 'Kiedy zgłosić się do mnie?', 'Post ofertowy'), item('wezwanie do rozmowy o faktach, nie do impulsywnego zakupu', 'Opowiedz o swojej sytuacji', 'Rolka z CTA')],
    },
    ideas: [{ label: 'Rolka', title: '3 pytania, które warto zadać przed ważną decyzją', format: 'Rolka mówiona' }, { label: 'Karuzela', title: 'Jak przygotować się do pierwszej rozmowy?', format: 'Karuzela edukacyjna' }, { label: 'Treść sprzedażowa', title: 'Kiedy warto skonsultować swoją sytuację?', format: 'Post ofertowy' }],
  }),
  makeProfile({
    key: 'interiors', name: 'Wnętrza i meble', industry: 'Wnętrza i meble na wymiar', brandType: 'Firma wnętrzarska',
    goals: ['realizacje', 'zapytania', 'sprzedaż'], problem: 'realizacje są dobre, ale odbiorca nie widzi całego procesu i zakresu',
    rules: { types: ['service', 'local', 'product'], audiences: ['interested', 'community'], goals: ['results', 'leads', 'sales'], problems: ['not_offer', 'no_materials', 'few_inquiries'], content: ['results', 'process', 'team'], tones: ['premium', 'specific', 'trust'] },
    summary: 'Twoja marka powinna komunikować funkcję, detal, proces realizacji i pewność, że projekt jest dobrze prowadzony.',
    recommendations: {
      speak: [item('o problemach funkcjonalnych, które rozwiązuje dobrze zaprojektowana przestrzeń', 'Co zmienia zabudowa na wymiar?', 'Rolka edukacyjna'), item('o materiałach, układzie i decyzjach dopasowanych do wnętrza', 'Jak wybrać rozwiązanie do małej przestrzeni?', 'Karuzela'), item('o przebiegu realizacji od pomiaru do montażu', 'Od pomiaru do gotowego wnętrza', 'Rolka procesowa')],
      dontSkip: [item('pomiarze, projekcie, produkcji, montażu i zakresie odpowiedzialności', 'Co obejmuje realizacja?', 'Karuzela'), item('materiałach, terminach ustalanych indywidualnie i przygotowaniu do wyceny', 'Co przygotować przed rozmową?', 'Karuzela FAQ'), item('detalach, które pokazują jakość wykonania', 'Na co zwrócić uwagę przy odbiorze?', 'Post edukacyjny')],
      show: [item('przed i po oraz zmianę funkcji, nie tylko estetykę', 'Ta sama przestrzeń, więcej możliwości', 'Karuzela przed i po'), item('detale frontów, uchwytów, oświetlenia i wykończeń', 'Przyjrzyj się bliżej jednemu detalowi', 'Rolka detali'), item('zespół, produkcję i montaż jako część obietnicy marki', 'Kto tworzy tę realizację?', 'Rolka zza kulis')],
      emotion: [item('porządek i ulgę po dobrze zaplanowanej decyzji', 'Miejsce, w którym łatwiej żyć', 'Rolka wizerunkowa'), item('dumę z dopracowanego wnętrza', 'Detal, który zmienia całość', 'Post estetyczny'), item('pewność, że projekt jest prowadzony od początku do końca', 'Jak pilnujemy kolejnych etapów?', 'Karuzela')],
      sell: [item('realizacje opisane przez problem, decyzję i efekt', 'Od pustej ściany do funkcjonalnej zabudowy', 'Case study'), item('odpowiedzi o pomiar, wycenę i zakres prac', 'Jak przygotować się do wyceny?', 'Karuzela FAQ'), item('zaproszenie do rozmowy o konkretnej przestrzeni', 'Wyślij wymiary i opowiedz o potrzebach', 'Post z CTA')],
    },
    ideas: [{ label: 'Rolka', title: '3 detale, które zmieniają odbiór zabudowy', format: 'Rolka detali' }, { label: 'Karuzela', title: 'Od pomiaru do montażu: jak wygląda realizacja?', format: 'Karuzela procesowa' }, { label: 'Treść sprzedażowa', title: 'Opowiedz o swojej przestrzeni i przygotuj się do wyceny', format: 'Post z CTA' }],
  }),
  makeProfile({
    key: 'local', name: 'Lokalny biznes', industry: 'Lokalny biznes', brandType: 'Lokalny biznes',
    goals: ['rozpoznawalność', 'zapytania', 'zaufanie'], problem: 'lokalna oferta nie jest wystarczająco widoczna w codziennym feedzie',
    rules: { types: ['local'], audiences: ['community', 'women', 'clients'], goals: ['awareness', 'leads', 'trust'], problems: ['few_inquiries', 'no_materials', 'no_topics'], content: ['team', 'products', 'process'], tones: ['human', 'trust', 'creative'] },
    summary: 'Twoja marka powinna komunikować miejsce, ludzi, lokalny kontekst i powód, żeby odbiorca wrócił właśnie do Ciebie.',
    recommendations: {
      speak: [item('o tym, co wyróżnia miejsce i jaką potrzebę zaspokaja na co dzień', 'Po co warto odwiedzić nas właśnie dziś?', 'Rolka lokalna'), item('o ludziach, historii i lokalnym kontekście marki', 'Poznaj osoby stojące za miejscem', 'Post wizerunkowy'), item('o ofercie osadzonej w realnych sytuacjach odbiorców', 'Co wybierają nasi klienci?', 'Karuzela')],
      dontSkip: [item('lokalizacji, godzinach, sposobie rezerwacji i aktualnej ofercie', 'Najważniejsze informacje przed wizytą', 'Karuzela informacyjna'), item('atmosferze oraz szczegółach, które tworzą doświadczenie', 'Co czeka Cię na miejscu?', 'Rolka zza kulis'), item('regularnym przypominaniu o sobie w rytmie lokalnego życia', 'Co nowego w tym tygodniu?', 'Stories')],
      show: [item('miejsce w ruchu: wejście, obsługę, przygotowanie i detale', 'Zajrzyj do nas przed otwarciem', 'Rolka zza kulis'), item('zespół i relacje z lokalną społecznością', 'Kto dziś jest na miejscu?', 'Rolka wizerunkowa'), item('produkty lub usługi w realnym użyciu', 'Tak wygląda wybór na miejscu', 'Rolka demonstracyjna')],
      emotion: [item('bliskość i poczucie, że marka zna swoich odbiorców', 'Miejsce, do którego chce się wracać', 'Post osobisty'), item('ciepło i gościnność bez udawania', 'Mały detal, który robi różnicę', 'Rolka estetyczna'), item('zaufanie budowane regularną obecnością', 'Jesteśmy tu także poza sezonem', 'Stories')],
      sell: [item('lokalne rekomendacje i propozycje dopasowane do okazji', 'Co wybrać na ten weekend?', 'Karuzela'), item('jasne informacje ułatwiające wizytę lub rezerwację', 'Jak do nas trafić i co zarezerwować?', 'Rolka informacyjna'), item('zaproszenie do konkretnego działania tu i teraz', 'Wpadnij, napisz lub zarezerwuj miejsce', 'Post z CTA')],
    },
    ideas: [{ label: 'Rolka', title: 'Zajrzyj do nas przed otwarciem: 3 rzeczy, których nie widać z ulicy', format: 'Rolka zza kulis' }, { label: 'Karuzela', title: 'Najważniejsze informacje przed pierwszą wizytą', format: 'Karuzela informacyjna' }, { label: 'Treść sprzedażowa', title: 'Co możesz zrobić dziś: odwiedzić, napisać lub zarezerwować', format: 'Post z CTA' }],
  }),
  makeProfile({
    key: 'b2b', name: 'Firma B2B', industry: 'B2B', brandType: 'Firma B2B',
    goals: ['zapytania', 'eksperckość', 'zaufanie'], problem: 'komunikacja pokazuje usługę, ale nie pokazuje wpływu na biznes klienta',
    rules: { types: ['service', 'product'], audiences: ['companies'], goals: ['leads', 'expert', 'trust'], problems: ['no_plan', 'not_offer', 'few_inquiries'], content: ['process', 'team', 'results'], tones: ['specific', 'expert'] },
    summary: 'Twoja marka powinna komunikować wpływ na biznes, sposób współpracy, odpowiedzialność i dowody jakości.',
    recommendations: {
      speak: [item('o problemach biznesowych, które można rozwiązać konkretnym działaniem', 'Co kosztuje firmę brak tej decyzji?', 'Rolka ekspercka'), item('o kryteriach wyboru partnera i ryzykach po drodze', '5 pytań przed wyborem wykonawcy', 'Karuzela'), item('o doświadczeniu zespołu przełożonym na proces i decyzje', 'Jak pracujemy nad projektem B2B?', 'Rolka procesowa')],
      dontSkip: [item('zakresie, odpowiedzialności, etapach i informacjach potrzebnych do startu', 'Co ustalamy przed podpisaniem?', 'Karuzela'), item('wpływie rozwiązania na codzienną pracę klienta', 'Co zmienia się po wdrożeniu?', 'Case study'), item('osobach, które będą prowadzić projekt po Twojej stronie', 'Kto odpowiada za realizację?', 'Post zespołowy')],
      show: [item('proces decyzyjny, dokumentację i sposób pilnowania jakości', 'Od briefu do rekomendacji', 'Rolka zza kulis'), item('zespół i podział odpowiedzialności', 'Kto robi co w projekcie?', 'Karuzela'), item('rezultat opisany przez sytuację wyjściową i zmianę', 'Problem biznesowy i rozwiązanie', 'Case study')],
      emotion: [item('przewidywalność i poczucie kontroli nad projektem', 'Jak wygląda raportowanie?', 'Karuzela'), item('kompetencję pokazaną przez konkretne decyzje', 'Jedna decyzja, która zmieniła projekt', 'Post ekspercki'), item('partnerstwo zamiast sprzedażowego nacisku', 'Jak wygląda dobra współpraca B2B?', 'Rolka mówiona')],
      sell: [item('case studies, które pokazują sposób myślenia i zakres pracy', 'Co było wyzwaniem, a co rozwiązaniem?', 'Case study'), item('ofertę opisaną językiem potrzeb firmy klienta', 'W którym momencie potrzebujesz wsparcia?', 'Karuzela ofertowa'), item('wezwanie do rozmowy discovery z jasno określonym tematem', 'Umów rozmowę o swoim projekcie', 'Post z CTA')],
    },
    ideas: [{ label: 'Rolka', title: '3 pytania przed wyborem partnera do projektu B2B', format: 'Rolka ekspercka' }, { label: 'Karuzela', title: 'Jak wygląda współpraca i podział odpowiedzialności?', format: 'Karuzela procesowa' }, { label: 'Treść sprzedażowa', title: 'Opowiedz o projekcie, a ustalimy właściwy zakres wsparcia', format: 'Post ofertowy' }],
  }),
];

export const mapCategories: Array<{ key: MapCategory; title: string }> = [
  { key: 'speak', title: 'O czym mówić?' },
  { key: 'dontSkip', title: 'Czego nie pomijać?' },
  { key: 'show', title: 'Co pokazywać?' },
  { key: 'emotion', title: 'Jakie emocje budować?' },
  { key: 'sell', title: 'Jakie treści prowadzą do sprzedaży?' },
];

export const goalFocus: Record<string, string> = {
  awareness: 'Zacznij od treści, które pomagają nowym osobom szybko zrozumieć, czym zajmuje się marka.',
  leads: 'Każdy główny temat połącz z prostym kolejnym krokiem: pytaniem, konsultacją albo wyceną.',
  sales: 'Pokazuj użycie, różnice i powody wyboru, aby odbiorca mógł przejść od zainteresowania do decyzji.',
  expert: 'Buduj autorytet przez jasne wyjaśnienia, własny punkt widzenia i przykłady procesu.',
  results: 'Opowiadaj o realizacjach przez problem, decyzję i efekt, żeby sama galeria nie była pozbawiona kontekstu.',
  trust: 'Regularnie pokazuj proces, ludzi i zasady pracy, bo zaufanie rośnie z powtarzalnych dowodów.',
};

export function buildCommunicationMap(answers: MapAnswers) {
  const scored = communicationProfiles.map(profile => {
    const match = (values: string[], answer: string | undefined, points: number) => answer && values.includes(answer) ? points : 0;
    const score = match(profile.rules.types, answers.type, 8)
      + match(profile.rules.audiences, answers.audience, 2)
      + match(profile.rules.goals, answers.goal, 3)
      + match(profile.rules.problems, answers.problem, 2)
      + match(profile.rules.content, answers.content, 1)
      + match(profile.rules.tones, answers.tone, 1);
    return { profile, score };
  }).sort((a, b) => b.score - a.score);
  const selected = scored[0].profile;
  const recommendations = Object.fromEntries(mapCategories.map(category => [
    category.key,
    selected.recommendations[category.key].map(recommendation => ({
      ...recommendation,
      industry: selected.industry,
      brandType: selected.brandType,
      goals: selected.goals,
      problem: selected.problem,
      category: category.key,
    })),
  ])) as Record<MapCategory, RecommendationItem[]>;
  return { profile: selected, recommendations, focus: goalFocus[answers.goal ?? ''] ?? 'Zacznij od jednego spójnego tematu i rozwijaj go w kilku formatach.', answers };
}
