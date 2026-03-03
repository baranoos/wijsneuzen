import type { QuizQuestion } from "./borden-data"

/**
 * Extended quiz questions per bord (5+ vragen per locatie)
 * Used by /quiz/[id] pages for the full per-location quiz
 */
export const quizQuestionsPerBord: Record<number, QuizQuestion[]> = {
  // ── Bord 1: Het Ontstaan van het Dorp ────────────────────
  1: [
    {
      question: "Naar wie is de naam Philippine vernoemd?",
      hint: "Het was een vorst over Vlaanderen",
      options: [
        { id: "A", text: "Jeronimus Laureyn" },
        { id: "B", text: "Filips de Schone" },
        { id: "C", text: "Prins Maurits" },
        { id: "D", text: "Willem van Oranje" },
      ],
      correctAnswer: "B",
      explanation:
        "Philippine is vernoemd naar Filips de Schone, de toenmalige vorst over Vlaanderen. Jeronimus Laureyn noemde zijn zesde polder de Saint Philippinepolder ter ere van hem.",
    },
    {
      question: "In welk jaar kreeg Jeronimus Laureyn toestemming om de polder aan te leggen?",
      hint: "Het was aan het begin van de 16e eeuw",
      options: [
        { id: "A", text: "1488" },
        { id: "B", text: "1505" },
        { id: "C", text: "1568" },
        { id: "D", text: "1600" },
      ],
      correctAnswer: "B",
      explanation:
        "In 1505 kreeg Jeronimus Laureyn toestemming om een nieuwe polder aan te leggen. Dit was zijn zesde polder, die hij de Saint Philippinepolder noemde.",
    },
    {
      question: "Wat was het beroep van Jeronimus Laureyn?",
      hint: "Hij had een belangrijke bestuurlijke functie",
      options: [
        { id: "A", text: "Visser en handelaar" },
        { id: "B", text: "Rentmeester van de Koning" },
        { id: "C", text: "Bisschop van Watervliet" },
        { id: "D", text: "Admiraal van de vloot" },
      ],
      correctAnswer: "B",
      explanation:
        "Jeronimus Laureyn was Rentmeester van de Koning en Heer van Watervliet. Hij stichtte meerdere polders in de regio.",
    },
    {
      question: "Met welke stad wilde Jeronimus Philippine laten concurreren?",
      hint: "Een heel beroemde Belgische havenstad",
      options: [
        { id: "A", text: "Brugge" },
        { id: "B", text: "Gent" },
        { id: "C", text: "Antwerpen" },
        { id: "D", text: "Rotterdam" },
      ],
      correctAnswer: "C",
      explanation:
        "Jeronimus had grote plannen om van Philippine een belangrijke havenstad te maken die kon concurreren met Antwerpen. Dit plan is door diverse omstandigheden nooit gelukt.",
    },
    {
      question: "Waarom is het plan om Philippine een grote havenstad te maken mislukt?",
      hint: "Er waren meerdere oorzaken",
      options: [
        { id: "A", text: "Een grote brand verwoestte de stad" },
        { id: "B", text: "Het vroege overlijden van Jeronimus en de Tachtigjarige Oorlog" },
        { id: "C", text: "De koning verbood verdere bouw" },
        { id: "D", text: "Er was geen water in de buurt" },
      ],
      correctAnswer: "B",
      explanation:
        "Het plan mislukte door het vroege overlijden van Jeronimus Laureijn, de Tachtigjarige Oorlog, verzanding van de Braakman en doordat schepen later dieper water nodig hadden na de ontdekking van Amerika.",
    },
    {
      question: "Welke stad stichtte Jeronimus Laureyn naast Philippine?",
      hint: "Deze stad ligt nabij Philippine",
      options: [
        { id: "A", text: "Hulst" },
        { id: "B", text: "Terneuzen" },
        { id: "C", text: "Watervliet" },
        { id: "D", text: "Sluis" },
      ],
      correctAnswer: "C",
      explanation:
        "Jeronimus stichtte ook Watervliet, waar hij een kerk liet bouwen ter ere van de 'sterre der hemel' na zijn redding uit een storm op de Braakman.",
    },
  ],

  // ── Bord 2: Water ────────────────────────────────────────
  2: [
    {
      question: "In welk jaar werd de Braakman definitief afgedamd?",
      hint: "Het was in de jaren '50 van de vorige eeuw",
      options: [
        { id: "A", text: "1900" },
        { id: "B", text: "1933" },
        { id: "C", text: "1952" },
        { id: "D", text: "1968" },
      ],
      correctAnswer: "C",
      explanation:
        "In 1952 werd de Braakman definitief afgedamd. Dit betekende het einde voor de haven van Philippine — de haven werd gedempt en de vloot kon niet meer uitvaren.",
    },
    {
      question: "Hoeveel dorpen verdwenen onder water na de Doorbraak van Nieuwersluis?",
      hint: "Het waren er meer dan vijf",
      options: [
        { id: "A", text: "Drie dorpen" },
        { id: "B", text: "Vijf dorpen" },
        { id: "C", text: "Zeven dorpen" },
        { id: "D", text: "Tien dorpen" },
      ],
      correctAnswer: "C",
      explanation:
        "Na de Doorbraak van Nieuwersluis in 1488 verdwenen in slechts vier jaar tijd zeven dorpen volledig onder water, waaronder Vremdijke en Willemskerke.",
    },
    {
      question: "Wanneer werd het Philippinekanaal gegraven?",
      hint: "Het was rond de eeuwwisseling",
      options: [
        { id: "A", text: "1850" },
        { id: "B", text: "1875" },
        { id: "C", text: "1900" },
        { id: "D", text: "1920" },
      ],
      correctAnswer: "C",
      explanation:
        "In 1900 werd het Philippinekanaal gegraven door de Braakman om zo de Westerschelde en de Noordzee te bereiken, omdat de verzanding van de haven niet meer tegen te houden was.",
    },
    {
      question: "Wat deden de vissers nadat de Braakman werd afgedamd?",
      hint: "Ze moesten ander werk zoeken",
      options: [
        { id: "A", text: "Ze verhuisden naar Yerseke" },
        { id: "B", text: "Ze werden omgeschoold voor fabrieken en fruitteelt" },
        { id: "C", text: "Ze begonnen mosselrestaurants" },
        { id: "D", text: "Ze gingen werken op de Westerschelde" },
      ],
      correctAnswer: "B",
      explanation:
        "Na de afdamming werden de vissers omgeschoold om te werken in fabrieken en in de fruitteelt. Dit is nog te zien aan de fruitbedrijven richting IJzendijke.",
    },
    {
      question: "Welke straatnamen in Philippine herinneren nog aan de haventijd?",
      hint: "Ze verwijzen naar de haven en de visserij",
      options: [
        { id: "A", text: "Kerkstraat en Marktplein" },
        { id: "B", text: "Havenstraat en Visserslaan" },
        { id: "C", text: "Mosselweg en Braakmanstraat" },
        { id: "D", text: "Waterstraat en Dijklaan" },
      ],
      correctAnswer: "B",
      explanation:
        "Vandaag de dag herinneren de straatnamen Havenstraat en Visserslaan, samen met de Spuikom en het Philippinekanaal, nog aan de rijke maritieme geschiedenis.",
    },
    {
      question: "Wat vond een inwoner recentelijk in zijn achtertuin?",
      hint: "Het was een overblijfsel uit het militaire verleden",
      options: [
        { id: "A", text: "Een kanonskogel" },
        { id: "B", text: "Een volledige vestingmuur (stenen beer)" },
        { id: "C", text: "Een oud anker" },
        { id: "D", text: "Resten van een schip" },
      ],
      correctAnswer: "B",
      explanation:
        "Een inwoner vond onlangs een volledige vestingmuur (een stenen beer) uit het midden van de 18e eeuw in zijn achtertuin — een tastbare herinnering aan het militaire verleden.",
    },
  ],

  // ── Bord 3: Spaanse Linies ──────────────────────────────
  3: [
    {
      question: "Wat was 'inundatie' als verdedigingsmethode?",
      hint: "Het had te maken met het Nederlandse waterlandschap",
      options: [
        { id: "A", text: "Het bouwen van hoge stenen muren" },
        { id: "B", text: "Het onder water zetten van land" },
        { id: "C", text: "Het graven van ondergrondse tunnels" },
        { id: "D", text: "Het plaatsen van kanonnen op heuvels" },
      ],
      correctAnswer: "B",
      explanation:
        "Inundatie betekent het onder water zetten van land. Door dijken open te steken kon men grote stukken grond laten overstromen, waardoor het gebied onbegaanbaar werd voor vijandelijke legers.",
    },
    {
      question: "Tussen welke jaren werden de Staats-Spaanse linies aangelegd?",
      hint: "Het begon tijdens de Tachtigjarige Oorlog",
      options: [
        { id: "A", text: "1500 en 1700" },
        { id: "B", text: "1568 en 1794" },
        { id: "C", text: "1600 en 1800" },
        { id: "D", text: "1488 en 1648" },
      ],
      correctAnswer: "B",
      explanation:
        "De Staats-Spaanse linies werden tussen 1568 en 1794 aangelegd in Zeeuws-Vlaanderen en net over de grens in België.",
    },
    {
      question: "Waarom werden de forten van aarde gemaakt in plaats van steen?",
      hint: "Denk aan de voordelen tijdens een oorlog",
      options: [
        { id: "A", text: "Steen was niet beschikbaar in de regio" },
        { id: "B", text: "Aarden wallen waren goedkoper, sneller te bouwen en vingen kanonskogels beter op" },
        { id: "C", text: "De grond was te zacht voor stenen funderingen" },
        { id: "D", text: "De koning verbood het gebruik van steen" },
      ],
      correctAnswer: "B",
      explanation:
        "Aarden wallen waren goedkoper, sneller te bouwen en konden de stalen kanonskogels beter opvangen dan stenen muren. Daardoor waren ze ideaal voor langdurige oorlogen.",
    },
    {
      question: "Wat waren 'scheurbroeken'?",
      hint: "Ze stonden op de muur (steenbeer) en maakten het moeilijk om eroverheen te klimmen",
      options: [
        { id: "A", text: "Speciale uniformen van soldaten" },
        { id: "B", text: "Stalen pennen met scherpe dwarsstukken op muren" },
        { id: "C", text: "Loopgraven langs de verdedigingslinies" },
        { id: "D", text: "Houten palissades rondom het fort" },
      ],
      correctAnswer: "B",
      explanation:
        "Scheurbroeken waren stalen pennen met zeer scherpe dwarsstukken die op de muur (steenbeer) stonden. Ze maakten het bijna onmogelijk om over de muur te klimmen.",
    },
    {
      question: "Welke steden waren belangrijk voor de verdedigingslinies?",
      hint: "Het waren steden in Zeeuws-Vlaanderen",
      options: [
        { id: "A", text: "Amsterdam, Rotterdam en Den Haag" },
        { id: "B", text: "Sluis, Hulst en Aardenburg" },
        { id: "C", text: "Middelburg, Goes en Vlissingen" },
        { id: "D", text: "Brugge, Gent en Antwerpen" },
      ],
      correctAnswer: "B",
      explanation:
        "Steden zoals Sluis, Hulst en Aardenburg waren belangrijk voor handel en veiligheid. Rondom deze steden werden forten en schansen gebouwd om wegen, dijken en toegangsroutes te bewaken.",
    },
    {
      question: "De linies vormden niet alleen een militaire grens, maar ook een...?",
      hint: "Er was een verschil in geloof tussen noord en zuid",
      options: [
        { id: "A", text: "Economische en taalkundige scheiding" },
        { id: "B", text: "Religieuze en politieke scheiding" },
        { id: "C", text: "Natuurlijke en geologische grens" },
        { id: "D", text: "Culturele en artistieke scheiding" },
      ],
      correctAnswer: "B",
      explanation:
        "De linies vormden ook een religieuze en politieke scheiding. In het noorden leefden vooral protestanten, terwijl het zuiden katholiek bleef.",
    },
  ],

  // ── Bord 4: Prins Maurits ──────────────────────────────
  4: [
    {
      question: "In welk jaar landde Prins Maurits met zijn leger bij Philippine?",
      hint: "Deze tocht leidde tot de beroemde Slag bij Nieuwpoort",
      options: [
        { id: "A", text: "1568" },
        { id: "B", text: "1588" },
        { id: "C", text: "1600" },
        { id: "D", text: "1633" },
      ],
      correctAnswer: "C",
      explanation:
        "In juni 1600 landde Prins Maurits met zijn enorme leger bij Philippine. Deze tocht leidde uiteindelijk tot de beroemde Slag bij Nieuwpoort.",
    },
    {
      question: "Wie was de vader van Prins Maurits?",
      hint: "Hij werd vermoord in Delft",
      options: [
        { id: "A", text: "Filips de Schone" },
        { id: "B", text: "Willem van Oranje" },
        { id: "C", text: "Frederik Hendrik" },
        { id: "D", text: "Prins Bernhard" },
      ],
      correctAnswer: "B",
      explanation:
        "Prins Maurits' vader was Willem van Oranje, die op 10 juli 1584 in Delft werd vermoord door Balthasar Gerards.",
    },
    {
      question: "Wat was het Mauritsfort?",
      hint: "Het was een militair bouwwerk bij Philippine",
      options: [
        { id: "A", text: "Een paleis waar Maurits woonde" },
        { id: "B", text: "Een vierkant fort met bastions en een diepe gracht" },
        { id: "C", text: "Een kerk gewijd aan Maurits" },
        { id: "D", text: "Een handelspost aan de Braakman" },
      ],
      correctAnswer: "B",
      explanation:
        "Het Mauritsfort was een vierkant fort met bastions op de hoeken en een diepe gracht eromheen, gebouwd in 1588 om de Spanjaarden in Philippine in de gaten te houden en de scheepvaart op de Braakman te controleren.",
    },
    {
      question: "Waarom verloor het Mauritsfort uiteindelijk zijn functie?",
      hint: "Er veranderde iets in 1633",
      options: [
        { id: "A", text: "Het werd verwoest door een aardbeving" },
        { id: "B", text: "Philippine werd ook Staats, waardoor het fort overbodig werd" },
        { id: "C", text: "Het werd omgebouwd tot woonhuis" },
        { id: "D", text: "De Tachtigjarige Oorlog eindigde" },
      ],
      correctAnswer: "B",
      explanation:
        "In 1633 veroverden de Staatse troepen Philippine zelf. Omdat Philippine nu ook in Staatse handen was, was het Mauritsfort tegenover niet meer nodig. Het verloor zijn functie en verdween langzaam in het landschap.",
    },
    {
      question: "Naar welke slag was Prins Maurits op weg toen hij bij Philippine landde?",
      hint: "De slag vond plaats in het huidige België",
      options: [
        { id: "A", text: "Slag bij Heiligerlee" },
        { id: "B", text: "Slag bij Nieuwpoort" },
        { id: "C", text: "Slag bij Waterloo" },
        { id: "D", text: "Slag om de Schelde" },
      ],
      correctAnswer: "B",
      explanation:
        "Prins Maurits landde bij Philippine voor zijn reis naar Duinkerke, die uiteindelijk leidde tot de bekende Slag bij Nieuwpoort.",
    },
    {
      question: "Welk buurtschap bij Philippine is vernoemd naar het fort?",
      hint: "Het draagt de naam van de prins",
      options: [
        { id: "A", text: "Oranjepolder" },
        { id: "B", text: "Mauritsfort" },
        { id: "C", text: "Nassaudorp" },
        { id: "D", text: "Willemshaven" },
      ],
      correctAnswer: "B",
      explanation:
        "Vlakbij Philippine ligt nog steeds het buurtschapje 'Mauritsfort', vernoemd naar de prins en zijn verdedigingswerk.",
    },
  ],

  // ── Bord 5: De Vesting van Philippine ───────────────────
  5: [
    {
      question: "Hoe heette de Spaanse schans van Philippine oorspronkelijk?",
      hint: "Het had een 'koninklijke' bijnaam",
      options: [
        { id: "A", text: "Het Mauritsfort" },
        { id: "B", text: "Het Kasteel of Hoog Philippine" },
        { id: "C", text: "Fort Zelandia" },
        { id: "D", text: "De Braakmanschans" },
      ],
      correctAnswer: "B",
      explanation:
        "De versterkte Spaanse schans in Philippine stond bekend als het 'Kasteel' of 'Hoog Philippine'. Het begon als driehoekige verdedigingspost en werd later uitgebreid.",
    },
    {
      question: "Wie veroverde Philippine in 1633 op de Spanjaarden?",
      hint: "Hij was een lid van het huis Nassau",
      options: [
        { id: "A", text: "Prins Maurits" },
        { id: "B", text: "Frederik Hendrik" },
        { id: "C", text: "Willem Frederik van Nassau Dietz" },
        { id: "D", text: "Johan de Witt" },
      ],
      correctAnswer: "C",
      explanation:
        "In 1633 slaagde Willem Frederik van Nassau Dietz erin om Philippine in te nemen, waarmee het een Staatse/Zeeuwse vesting werd.",
    },
    {
      question: "Welke namen kregen de bastions van de vesting?",
      hint: "Ze verwezen naar gebieden",
      options: [
        { id: "A", text: "Noord, Zuid, Oost en West" },
        { id: "B", text: "Zelandia en Castilië" },
        { id: "C", text: "Oranje en Nassau" },
        { id: "D", text: "Leeuw en Adelaar" },
      ],
      correctAnswer: "B",
      explanation:
        "De vesting kreeg 4 bastions met namen zoals 'Zelandia' en 'Castilië', een verwijzing naar zowel de Nederlandse als de Spaanse oorsprong.",
    },
    {
      question: "In welk jaar werd Philippine ingenomen door het Franse leger?",
      hint: "Het was in de 18e eeuw",
      options: [
        { id: "A", text: "1700" },
        { id: "B", text: "1747" },
        { id: "C", text: "1789" },
        { id: "D", text: "1805" },
      ],
      correctAnswer: "B",
      explanation:
        "In 1747 werd Philippine ingenomen door het Franse leger, dat in 1749 weer vertrok. Na 1751 werden schanssstenen in de zijden van de vesting ingebouwd.",
    },
    {
      question: "Wanneer verloor Philippine officieel zijn vestingfunctie?",
      hint: "Het was in het begin van de 19e eeuw",
      options: [
        { id: "A", text: "1747" },
        { id: "B", text: "1805" },
        { id: "C", text: "1816" },
        { id: "D", text: "1952" },
      ],
      correctAnswer: "C",
      explanation:
        "In 1805 werd besloten dat de vestingfunctie definitief kon verdwijnen, en in 1816 werd dit officieel bekrachtigd.",
    },
    {
      question: "Wat is het verschil tussen Hoog-Philippine en Laag-Philippine?",
      hint: "Het heeft te maken met de historische structuur",
      options: [
        { id: "A", text: "Hoog-Philippine lag op een heuvel, Laag-Philippine in het dal" },
        { id: "B", text: "Hoog-Philippine was het oorspronkelijke fort, Laag-Philippine de uitgebreide vesting" },
        { id: "C", text: "Hoog-Philippine was voor de rijken, Laag-Philippine voor de armen" },
        { id: "D", text: "Het verschil is de waterstand bij vloed en eb" },
      ],
      correctAnswer: "B",
      explanation:
        "Hoog-Philippine was het oorspronkelijke Spaanse fort, en Laag-Philippine werd later deel van de uitgebreide vesting. Dit onderscheid is in de structuur van het landschap nog altijd te herkennen.",
    },
  ],
}

/**
 * Get quiz questions for a specific bord/location
 */
export function getQuizQuestionsForBord(bordId: number): QuizQuestion[] {
  return quizQuestionsPerBord[bordId] ?? []
}
