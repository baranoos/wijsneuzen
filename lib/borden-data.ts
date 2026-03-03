export interface QuizQuestion {
  question: string
  hint: string
  options: { id: string; text: string }[]
  correctAnswer: string
  explanation: string
}

export interface InformatieBord {
  id: number
  title: string
  subtitle: string
  heroImage: string
  historicImage: string
  modernImage: string
  content: {
    intro: string
    paragraphs: string[]
  }
  quiz: QuizQuestion
  quizQuestions: QuizQuestion[]
  historischWeetje: {
    title: string
    description: string
  }
}

export const bordenData: InformatieBord[] = [
  {
    id: 1,
    title: "Het Ontstaan van het Dorp",
    subtitle: "Van polder tot stad — het verhaal van Philippine",
    heroImage: "https://images.unsplash.com/photo-1590074072786-a66914d668f1?w=1200&q=80",
    historicImage: "https://images.unsplash.com/photo-1578301978018-3005759f48f7?w=600&q=80",
    modernImage: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=600&q=80",
    content: {
      intro: "In het jaar 1505 kreeg Jeronimus Laureyn, Rentmeester van de Koning en Heer van Watervliet, toestemming om een nieuwe polder aan te leggen. Dit was zijn zesde polder. Hij noemde deze polder de Saint Philippinepolder, naar Filips de Schone, de toenmalige vorst over Vlaanderen.",
      paragraphs: [
        "Jeronimus kreeg ook toestemming om in deze polder een gesloten stad te bouwen. Deze stad kreeg dezelfde naam als de polder: Philippine. Philippine was in die tijd nog afhankelijk van het nabijgelegen Watervliet, dat ook door Jeronimus was gesticht. Jeronimus was tijdens zijn aankomst in de Braakman rond 1500 in een vreselijke storm terechtgekomen. Hij beloofde de 'sterre der hemel' op de plaats waar ze behouden aan land zouden komen een stad met een kerk op te richten ter ere van haar. De kerk in Watervliet is door hem gesticht en voor de bouw van de stad kreeg hij toestemming om het noordoostelijke stuk van het Spaanse grondgebied droog te maken.",
        "Jeronimus had grote plannen. Hij wilde van Philippine een belangrijke havenstad maken voor het Graafschap Vlaanderen. De stad moest kunnen concurreren met Antwerpen. Dit plan is echter nooit gelukt. Dat kwam door het vroege overlijden van Jeronimus Laureijn, de Tachtigjarige Oorlog, verzanding van de Braakman en doordat schepen later dieper water nodig hadden na de ontdekking van Amerika.",
        "Zo is het dorp Philippine ontstaan en heeft het zijn naam gekregen, als eerbetoon aan Filips de Schone. Bij het octrooi voor de stad werden ook stadsrechten verleend.",
      ],
    },
    quiz: {
      question: "Naar wie is de naam Philippine vernoemd?",
      hint: "Het was een vorst over Vlaanderen",
      options: [
        { id: "A", text: "Jeronimus Laureyn" },
        { id: "B", text: "Filips de Schone" },
        { id: "C", text: "Prins Maurits" },
        { id: "D", text: "Willem van Oranje" },
      ],
      correctAnswer: "B",
      explanation: "Philippine is vernoemd naar Filips de Schone, de toenmalige vorst over Vlaanderen. Jeronimus Laureyn noemde zijn zesde polder de Saint Philippinepolder ter ere van hem.",
    },
    historischWeetje: {
      title: "De Droom van Jeronimus",
      description: "Jeronimus Laureyn wilde van Philippine een havenstad maken die kon concurreren met Antwerpen. Door zijn vroege overlijden, de Tachtigjarige Oorlog en de verzanding van de Braakman is dit plan nooit werkelijkheid geworden.",
    },
  },
  {
    id: 2,
    title: "Water",
    subtitle: "De haven, de Braakman & de natuurrampen",
    heroImage: "https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=1200&q=80",
    historicImage: "https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?w=600&q=80",
    modernImage: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=600&q=80",
    content: {
      intro: "Philippine is een uniek dorp in Zeeuws-Vlaanderen (vanaf 2003 gemeente Terneuzen) dat wereldwijd bekendstaat als het mosseldorp van Nederland. Hoewel het dorp geen eigen haven meer heeft, trekt het jaarlijks duizenden bezoekers die speciaal komen om mosselen te eten in de mosselrestaurants rondom het dorpsplein.",
      paragraphs: [
        "Tot 1952 lag Philippine direct aan het water via de Braakman. Door de jaren heen verzande de haven steeds meer en werd het noodzakelijk om de haven uit te baggeren. Ook door spuien vanuit een speciaal aangelegde spuikom kon de verzanding niet volledig worden voorkomen. Elke dag werd er samen gewerkt om de haven begaanbaar te houden door slik uit de haven in bakken te scheppen en deze buiten de haven te dumpen. Ondanks al hun werk konden ze de verzanding niet tegenhouden en werd het noodzakelijk om het Philippinekanaal (1900) te graven door de Braakman om zo de Westerschelde en de Noordzee te bereiken.",
        "In de 19e en begin 20e eeuw was Philippine een belangrijke haven voor de mosselvisserij en -handel. Op de kade stonden balen vol verse mosselen klaar voor de verkoop. In 1952 werd de Braakman definitief afgedamd. Dit betekende het einde voor de haven van Philippine; de haven werd gedempt en de vloot kon niet meer uitvaren. Vandaag de dag herinneren alleen de Spuikom, het Philippinekanaal en de straatnamen Havenstraat en Visserslaan nog aan deze tijd.",
        "In de 17e en 18e eeuw was Philippine meer dan een vissersdorp; het was een strategische vestingstad. Het dorp lag te midden van slikken en schorren en was omringd door wallen en grachten om de Spaanse Nederlanden te verdedigen. Sporen van dit militaire verleden komen nog steeds boven water; zo vond een inwoner onlangs een volledige vestingmuur (een stenen beer) uit het midden van de 18e eeuw in zijn achtertuin.",
        "Voordat Philippine het rustige dorp werd dat we nu kennen, was de omgeving het toneel van grote natuurrampen. In 1488 brak de Nieuwersluis door ten noorden van het huidige Philippine, waardoor de zee vrij spel kreeg. In slechts vier jaar tijd verdwenen zeven dorpen volledig onder water, waaronder Vremdijke en Willemskerke. Juist door deze overstromingen werd de Braakman een enorme zeearm, waardoor Philippine kon uitgroeien tot een havenstad met toegang tot de Noordzee.",
        "Na de afdamming van de Braakman hadden de vissers geen werk meer. Zij werden omgeschoold om te gaan werken in de fabrieken en in de fruitteelt. Dit is nog altijd te zien aan de rand van het dorp richting IJzendijke waar nog veel fruitbedrijven zijn gevestigd. Nu zie je heel veel mosselrestaurants en het beeld van een mossel centraal in het dorp.",
      ],
    },
    quiz: {
      question: "In welk jaar werd de Braakman definitief afgedamd?",
      hint: "Het was in de jaren '50 van de vorige eeuw",
      options: [
        { id: "A", text: "1900" },
        { id: "B", text: "1933" },
        { id: "C", text: "1952" },
        { id: "D", text: "1968" },
      ],
      correctAnswer: "C",
      explanation: "In 1952 werd de Braakman definitief afgedamd. Dit betekende het einde voor de haven van Philippine — de haven werd gedempt en de vloot kon niet meer uitvaren.",
    },
    historischWeetje: {
      title: "Zeven Verdronken Dorpen",
      description: "Na de Doorbraak van Nieuwersluis in 1488 verdwenen in slechts vier jaar tijd zeven dorpen volledig onder water, waaronder Vremdijke en Willemskerke. Deze ramp maakte de Braakman tot een enorme zeearm.",
    },
  },
  {
    id: 3,
    title: "Spaanse Linies",
    subtitle: "Verdedigingswerken door de eeuwen heen",
    heroImage: "https://images.unsplash.com/photo-1599946347371-68eb71b16afc?w=1200&q=80",
    historicImage: "https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?w=600&q=80",
    modernImage: "https://images.unsplash.com/photo-1551524164-687a55dd1126?w=600&q=80",
    content: {
      intro: "De Staats-Spaanse linies zijn een reeks verdedigingswerken die tussen 1568 en 1794 werden aangelegd in Zeeuws-Vlaanderen en net over de grens in België. Ze bestonden uit aarden forten, schansen, dijken, grachten en gebieden die men onder water kon zetten.",
      paragraphs: [
        "Tijdens de Tachtigjarige Oorlog vochten de Republiek der Zeven Verenigde Nederlanden tegen de Spaanse legers. De linies lagen precies in het frontgebied tussen deze twee landen. Steden zoals Sluis, Hulst en Aardenburg waren belangrijk voor handel en veiligheid. Daarom werden rondom deze steden forten en schansen gebouwd om wegen, dijken en toegangsroutes te bewaken.",
        "Een belangrijk onderdeel van de linies was het gebruik van inundatie: het onder water zetten van land. Door dijken open te steken kon men grote stukken grond laten overstromen. Dit maakte het gebied onbegaanbaar voor vijandelijke legers. Het waterlandschap werd zo een wapen dat hielp bij de verdediging.",
        "De forten waren meestal van aarde gemaakt. Aarden wallen waren goedkoper, sneller te bouwen en konden de stalen kanonskogels beter opvangen dan stenen muren. Daardoor waren ze ideaal voor langdurige oorlogen.",
        "De Staats-Spaanse linies vormden niet alleen een militaire grens, maar ook een religieuze en politieke scheiding. In het noorden leefden vooral protestanten, terwijl het zuiden katholiek bleef. Bij het nieuwe bos is ook een grote muur (steenbeer) waar scheurbroeken op stonden — stalen pennen met scherpe dwarsstukken die het vrijwel onmogelijk maakten om eroverheen te klimmen.",
      ],
    },
    quiz: {
      question: "Wat was 'inundatie' als verdedigingsmethode?",
      hint: "Het had te maken met het Nederlandse waterlandschap",
      options: [
        { id: "A", text: "Het bouwen van hoge stenen muren" },
        { id: "B", text: "Het onder water zetten van land" },
        { id: "C", text: "Het graven van ondergrondse tunnels" },
        { id: "D", text: "Het plaatsen van kanonnen op heuvels" },
      ],
      correctAnswer: "B",
      explanation: "Inundatie betekent het onder water zetten van land. Door dijken open te steken kon men grote stukken grond laten overstromen, waardoor het gebied onbegaanbaar werd voor vijandelijke legers.",
    },
    historischWeetje: {
      title: "De Scheurbroeken",
      description: "Bij het wandelbos staat nog een grote muur (steenbeer) waar vroeger scheurbroeken op stonden: stalen pennen met zeer scherpe dwarsstukken. Ze maakten het bijna onmogelijk om over de muur te klimmen, maar soms probeerden soldaten het toch.",
    },
  },
  {
    id: 4,
    title: "Prins Maurits",
    subtitle: "De landing bij Philippine & het Mauritsfort",
    heroImage: "https://images.unsplash.com/photo-1565008576549-57569a49371d?w=1200&q=80",
    historicImage: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
    modernImage: "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=600&q=80",
    content: {
      intro: "Stel je voor: het is juni in het jaar 1600. Je staat hier niet in een rustig wandelbos, maar midden in een oorlogsgebied. Aan de horizon zie je de masten van honderden schepen op de Braakman. Aan land stappen duizenden soldaten. Aan het hoofd van dit enorme leger staat Prins Maurits van Oranje-Nassau.",
      paragraphs: [
        "Prins Maurits werd geboren op 14 november 1567. Zijn vader Willem van Oranje werd vermoord op 10 juli 1584 in Delft door Balthasar Gerards. Maurits was Nederlands legeraanvoerder en stadhouder tijdens de Tachtigjarige Oorlog.",
        "Philippine was in die tijd een cruciale plek: een driehoekig Spaans fort, vernoemd naar de Spaanse koning Filips. De Staatse vloot met Prins Maurits landde hier voor één van zijn beroemdste tochten ooit — de reis naar Duinkerke. Die tocht zou uiteindelijk leiden tot de bekende Slag bij Nieuwpoort.",
        "Om de Spanjaarden dwars te zitten en de scheepvaart te beschermen, liet Maurits in 1588 al een stevig verdedigingswerk bouwen: het Mauritsfort. Het was een vierkant fort met bastions op de hoeken en een diepe gracht eromheen, bedoeld om de Spanjaarden in Philippine goed in de gaten te houden en de scheepvaart op de Braakman te controleren.",
        "In 1633 wisten de Staatse troepen onder leiding van Willem Frederik het fort Philippine te veroveren op de Spanjaarden. Omdat Philippine nu ook in Staatse handen was, verloor het Mauritsfort zijn functie. Het werd beschadigd door zware stormen en verdween langzaam in het landschap.",
        "Als je goed om je heen kijkt in dit gebied zie je de sporen van vroeger nog steeds: de buitenste wallen van het fort zijn nog herkenbaar, vlakbij ligt het buurtschapje 'Mauritsfort', en de mosselrestaurants herinneren aan de vissers die kwamen nadat de soldaten vertrokken.",
      ],
    },
    quiz: {
      question: "In welk jaar landde Prins Maurits met zijn leger bij Philippine?",
      hint: "Deze tocht leidde tot de beroemde Slag bij Nieuwpoort",
      options: [
        { id: "A", text: "1568" },
        { id: "B", text: "1588" },
        { id: "C", text: "1600" },
        { id: "D", text: "1633" },
      ],
      correctAnswer: "C",
      explanation: "In juni 1600 landde Prins Maurits met zijn enorme leger bij Philippine. Deze tocht leidde uiteindelijk tot de beroemde Slag bij Nieuwpoort.",
    },
    historischWeetje: {
      title: "Wist je dat...",
      description: "Er vandaag de dag nog steeds een Prins Maurits van Oranje-Nassau is? Hij is de zoon van Prinses Margriet. Hoewel hij nu niet meer in de loopgraven staat, draagt hij de naam van de man die Philippine en dit bos wereldberoemd maakte in de geschiedenisboeken.",
    },
  },
  {
    id: 5,
    title: "De Vesting van Philippine",
    subtitle: "Van Spaanse schans tot Zeeuwse vestingstad",
    heroImage: "https://images.unsplash.com/photo-1548625149-fc4a29cf7092?w=1200&q=80",
    historicImage: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=600&q=80",
    modernImage: "https://images.unsplash.com/photo-1438032005730-c779502df39b?w=600&q=80",
    content: {
      intro: "Tijdens de Tachtigjarige Oorlog speelde Philippine een opvallende rol. Het was toen een versterkte Spaanse schans die bekendstond als het 'Kasteel' of 'Hoog Philippine'. Deze schans begon als een driehoekige Spaanse verdedigingspost, maar werd later uitgebreid tot een grotere schans met 4 hoeken.",
      paragraphs: [
        "In 1633 slaagde Willem Frederik van Nassau Dietz erin om Philippine in te nemen, waarmee het een Staatse/Zeeuwse vesting werd. De schans werd uitgebouwd naar het Staatse ontwerp en kreeg 4 bastions met namen zoals 'Zelandia' en 'Castilië'. De vesting had aarden wallen en een natte gracht als extra verdediging, hetgeen een verovering extra moeilijk maakte.",
        "De ligging aan de Braakman maakte Philippine niet alleen militair belangrijk, maar legde ook de basis voor de latere mosselgeschiedenis van het gebied. De Braakman was eeuwenlang een cruciale waterverbinding voor handel en visserij.",
        "In de loop van de 19e eeuw verloor de vesting haar militaire waarde. In 1747 werd Philippine ingenomen door het Franse leger, dat in 1749 weer vertrok. Na 1751 werd zowel in de oostelijke als in de westelijke zijde een schanssteen ingebouwd. In 1805 werd besloten dat de vestingfunctie definitief kon verdwijnen en in 1816 werd dit officieel bekrachtigd.",
        "Daarna raakten de meeste verdedigingswerken in verval door werkverschaffing en vervening. Toch zijn er vandaag nog sporen zichtbaar. Oude grachten en delen van de wallen herinneren aan het militaire verleden. Het onderscheid tussen Hoog-Philippine, het oorspronkelijke fort, en Laag-Philippine, dat later deel werd van de uitgebreide vesting, is in de structuur van het landschap nog altijd te herkennen.",
      ],
    },
    quiz: {
      question: "Hoe heette de Spaanse schans van Philippine oorspronkelijk?",
      hint: "Het had een 'koninklijke' bijnaam",
      options: [
        { id: "A", text: "Het Mauritsfort" },
        { id: "B", text: "Het Kasteel of Hoog Philippine" },
        { id: "C", text: "Fort Zelandia" },
        { id: "D", text: "De Braakmanschans" },
      ],
      correctAnswer: "B",
      explanation: "De versterkte Spaanse schans in Philippine stond bekend als het 'Kasteel' of 'Hoog Philippine'. Het begon als driehoekige verdedigingspost en werd later uitgebreid tot een schans met 4 hoeken.",
    },
    historischWeetje: {
      title: "Hoog & Laag Philippine",
      description: "Het onderscheid tussen Hoog-Philippine (het oorspronkelijke fort) en Laag-Philippine (dat later deel werd van de uitgebreide vesting) is in de structuur van het landschap nog altijd te herkennen. De bastions kregen namen als 'Zelandia' en 'Castilië'.",
    },
  },
]

export function getBordById(id: number): InformatieBord | undefined {
  return bordenData.find((bord) => bord.id === id)
}

export function getAllBorden(): InformatieBord[] {
  return bordenData
}
