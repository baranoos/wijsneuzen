import { prisma } from "./prisma"

export interface PageSection {
  pageSlug: string
  sectionKey: string
  title: string
  content: string
}

// Default content for all pages - used as fallback and for seeding
export const defaultPageContent: PageSection[] = [
  // ── Homepage ─────────────────────────────────────────────
  {
    pageSlug: "home",
    sectionKey: "hero",
    title: "Historie Wandeltour Philippine",
    content:
      "Ontdek het rijke verleden van de mosselstad tijdens deze sfeervolle historische wandeling langs monumenten en verhalen.",
  },
  {
    pageSlug: "home",
    sectionKey: "hero-badge",
    title: "Historische Wandelroute",
    content: "",
  },
  {
    pageSlug: "home",
    sectionKey: "hero-intro",
    title: "Welkom bij het Digitaal Archeopad",
    content:
      "Welkom bij het Digitaal Archeopad in het Wandelbos van Philippine. Dit unieke dorp in Zeeuws-Vlaanderen, gesticht in 1505 door Jeronimus Laureyn en vernoemd naar Filips de Schone, kent een rijke geschiedenis van mosselvisserij, vestingwerken en de machtige Braakman. Ontdek het verleden via 5 informatieborden met QR-codes in het wandelbos.",
  },
  {
    pageSlug: "home",
    sectionKey: "hero-button",
    title: "Start de Wandeling",
    content: "/route",
  },
  {
    pageSlug: "home",
    sectionKey: "borden-overview",
    title: "Ontdek de Route",
    content:
      "Wandel door Philippine en stop bij elk informatiebord om de geschiedenis van deze bijzondere mosselstad te ontdekken. Elke locatie vertelt zijn eigen verhaal.",
  },
  {
    pageSlug: "home",
    sectionKey: "borden-badge",
    title: "5 Informatieborden",
    content: "",
  },
  {
    pageSlug: "home",
    sectionKey: "borden-button",
    title: "Bekijk volledige route",
    content: "/route",
  },
  {
    pageSlug: "home",
    sectionKey: "features",
    title: "Verken het verleden",
    content:
      "Wandel langs monumentale locaties en luister naar de verhalen die Philippine hebben gevormd. Van de oude haven tot de legendarische mosselcultuur.",
  },
  {
    pageSlug: "home",
    sectionKey: "feature-1",
    title: "Interactieve Route",
    content: "Volg de weg via je smartphone langs alle historische locaties.",
  },
  {
    pageSlug: "home",
    sectionKey: "feature-2",
    title: "Audio Gids",
    content: "Luister naar lokale vertellers die de geschiedenis tot leven brengen.",
  },
  {
    pageSlug: "home",
    sectionKey: "feature-3",
    title: "Historische Weetjes",
    content: "Leer meer over de rijke cultuur en het erfgoed van Philippine.",
  },
  {
    pageSlug: "home",
    sectionKey: "partners",
    title: "Onze Partners",
    content: "Dit project is mede mogelijk gemaakt door deze organisaties",
  },
  {
    pageSlug: "home",
    sectionKey: "route-preview",
    title: "De Route",
    content: "5 historische stops door Philippine",
  },

  // ── Route page ───────────────────────────────────────────
  {
    pageSlug: "route",
    sectionKey: "hero",
    title: "Digitaal Archeopad – Wandelbos Philippine",
    content:
      "Wandel door het wandelbos van Philippine en scan de QR-codes bij elk informatiebord. Ontdek het verhaal van dit bijzondere dorp aan de Braakman — van de stichting in 1505 tot de mosselcultuur van vandaag.",
  },
  {
    pageSlug: "route",
    sectionKey: "hero-credits",
    title: "Credits",
    content:
      "Dit Digitaal Archeopad is ontwikkeld door De Wijsneuzen (PWVO Terneuzen) in samenwerking met de Historics van Philippine en studenten van Scalda. Scan de QR-codes bij elk bord voor extra informatie en achtergrondverhalen.",
  },
  {
    pageSlug: "route",
    sectionKey: "hero-stats",
    title: "Wandelbos | ~45 min | 5 QR-borden",
    content: "",
  },
  {
    pageSlug: "route",
    sectionKey: "map",
    title: "De Wandelroute",
    content:
      "Volg de route van bord naar bord door het wandelbos. Klik op een bord om in te zoomen.",
  },

  // ── Wijsneuzen page ──────────────────────────────────────
  {
    pageSlug: "wijsneuzen",
    sectionKey: "hero",
    title: "Project Philippine",
    content:
      "A historical walking tour bridging the rich maritime past and the vibrant present of Philippine.",
  },
  {
    pageSlug: "wijsneuzen",
    sectionKey: "hero-button",
    title: "Explore the Tour",
    content: "/route",
  },
  {
    pageSlug: "wijsneuzen",
    sectionKey: "our-story",
    title: "Our Story",
    content: `<p>The 'De Wijsneuzen' initiative began as a passion project to preserve the unique coastal history of Philippine. What once was a bustling harbor for mussels is now a town of stories, and we aim to tell them through every step of this guided experience.</p>
<p>Through careful archival research and oral histories from local elders, we've mapped out a route that showcases the hidden gems and monumental shifts in our local landscape.</p>`,
  },
  {
    pageSlug: "wijsneuzen",
    sectionKey: "team",
    title: "The Creative Team",
    content: "",
  },
  {
    pageSlug: "wijsneuzen",
    sectionKey: "sponsors",
    title: "Our Partners",
    content: "",
  },
  {
    pageSlug: "wijsneuzen",
    sectionKey: "contact",
    title: "De Wijsneuzen",
    content:
      "Preserving the heritage of Philippine through interactive storytelling and community engagement.",
  },
  {
    pageSlug: "wijsneuzen",
    sectionKey: "contact-email",
    title: "Contact",
    content: "info@wijsneuzen-philippine.nl",
  },
  {
    pageSlug: "wijsneuzen",
    sectionKey: "contact-location",
    title: "Locatie",
    content: "Village Square, Philippine",
  },

  // ── Blog page ────────────────────────────────────────────
  {
    pageSlug: "blog",
    sectionKey: "hero",
    title: "Blog",
    content:
      "Verhalen, nieuws en ontdekkingen over de rijke geschiedenis van Philippine.",
  },

  // ── Quiz page ────────────────────────────────────────────
  {
    pageSlug: "quiz",
    sectionKey: "hero",
    title: "Historische Quiz: Philippine",
    content: "Test je kennis over de geschiedenis van Philippine.",
  },

  // ── Vrijwilligers page ───────────────────────────────────
  {
    pageSlug: "vrijwilligers",
    sectionKey: "hero",
    title: "Vrijwilligers Gezocht",
    content:
      "Help mee met het bewaren en delen van de geschiedenis van Philippine. Bekijk de openstaande vrijwilligersoproepen en meld je aan!",
  },
  {
    pageSlug: "vrijwilligers",
    sectionKey: "empty-state",
    title: "Geen vrijwilligersoproepen",
    content:
      "Er zijn momenteel geen openstaande vrijwilligersoproepen. Kom later terug voor nieuwe mogelijkheden!",
  },

  // ── Footer (global) ──────────────────────────────────────
  {
    pageSlug: "global",
    sectionKey: "footer-brand",
    title: "De Wijsneuzen",
    content:
      "Preserving the heritage of Philippine through interactive storytelling and community engagement.",
  },
  {
    pageSlug: "global",
    sectionKey: "footer-contact",
    title: "Contact",
    content: "info@wijsneuzen-philippine.nl | Village Square, Philippine",
  },
  {
    pageSlug: "global",
    sectionKey: "footer-copyright",
    title: "Copyright",
    content:
      "Project De Wijsneuzen. Alle rechten voorbehouden. Built with pride in Philippine.",
  },

  // ── Geschiedenis page ────────────────────────────────────
  {
    pageSlug: "geschiedenis",
    sectionKey: "hero",
    title: "Geschiedenis van Philippine",
    content: "Philippine is een dorp met een uniek karakter en een bewogen geschiedenis. Hoewel het tegenwoordig vooral bekendstaat als het mosseldorp van Nederland, begon het ooit als een strategische vesting aan de grens van water en land.",
  },
  {
    pageSlug: "geschiedenis",
    sectionKey: "intro",
    title: "De Oorsprong: Een Maria-stad",
    content: `<p>De geschiedenis van Philippine begint officieel in <strong>1505</strong>. In die tijd was het gebied nog grotendeels onderhevig aan de getijden van de Westerschelde. Jeronimus Laureyn, Rentmeester van de Koning en Heer van Watervliet, kreeg toestemming om een nieuwe polder aan te leggen — zijn zesde. Hij noemde deze polder de <em>Saint Philippinepolder</em>, naar Filips de Schone, de toenmalige vorst over Vlaanderen.</p>
<p>Jeronimus kreeg ook toestemming om in deze polder een gesloten stad te bouwen. Het stadje kreeg in <strong>1506</strong> al stadsrechten, wat onderstreept dat het vanaf het begin bedoeld was als een belangrijke plaats. Jeronimus was tijdens zijn aankomst in de Braakman rond 1500 in een vreselijke storm terechtgekomen. Hij beloofde de 'sterre der hemel' op de plaats waar ze behouden aan land zouden komen een stad met een kerk op te richten ter ere van haar.</p>
<p>Jeronimus had grote plannen: hij wilde van Philippine een belangrijke havenstad maken voor het Graafschap Vlaanderen, die kon concurreren met Antwerpen. Dit plan is echter nooit gelukt — door het vroege overlijden van Jeronimus, de Tachtigjarige Oorlog, verzanding van de Braakman en doordat schepen later dieper water nodig hadden na de ontdekking van Amerika.</p>`,
  },
  {
    pageSlug: "geschiedenis",
    sectionKey: "kasteel",
    title: "Vestingstad in de Tachtigjarige Oorlog",
    content: `<p>Vanwege de ligging aan de Braakman — een grote zeearm die destijds diep Zeeuws-Vlaanderen in liep — was Philippine militair zeer strategisch.</p>
<p>In <strong>1583</strong> namen Spaanse troepen de stad in en bouwden er een sterk fort, dat bekendstond als het <em>'Kasteel'</em> of <em>'Hoog Philippine'</em>. Het begon als een driehoekige Spaanse verdedigingspost, maar werd later uitgebreid tot een grotere schans met vier hoeken.</p>
<p>In juni <strong>1600</strong> landde Prins Maurits van Oranje-Nassau met duizenden soldaten bij Philippine, op weg naar de beroemde Slag bij Nieuwpoort. Om de Spanjaarden dwars te zitten liet hij al in 1588 het <em>Mauritsfort</em> bouwen — een vierkant fort met bastions en een diepe gracht.</p>
<p>Na een belegering door de Staatse troepen onder leiding van Willem Frederik kwam de stad in <strong>1633</strong> definitief in Nederlandse handen. De schans werd uitgebouwd naar het Staatse ontwerp en kreeg vier bastions met namen als 'Zelandia' en 'Castilië'. De vesting had aarden wallen en een natte gracht als extra verdediging.</p>
<p>Philippine werd een belangrijk onderdeel van de <strong>Staats-Spaanse Linies</strong> — de verdedigingslinie tegen de Spanjaarden. De vestingvorm is in het huidige stratenplan nog steeds herkenbaar aan de stervormige structuur en de omliggende wallen.</p>`,
  },
  {
    pageSlug: "geschiedenis",
    sectionKey: "mosselvisserij",
    title: "De Bloei van de Mosselvisserij",
    content: `<p>De meest iconische periode voor Philippine brak aan in de <strong>19e eeuw</strong>. Dankzij de verbinding met de Braakman had het dorp een directe haven aan open zee.</p>
<p>Rond <strong>1860</strong> begon de grootschalige mosselvisserij. Philippine beschikte over een eigen vissersvloot en mosselbanken. Op de kade stonden balen vol verse mosselen klaar voor de verkoop. Het dorp werd een internationaal knooppunt voor de handel.</p>
<p>Belgen kwamen massaal over de grens om de verse mosselen te eten, wat de basis legde voor de enorme concentratie aan restaurants die er vandaag de dag nog steeds is.</p>
<p><strong>Wist je dat?</strong> Philippine had de eerste mosselveiling van Nederland, nog voordat Yerseke die rol overnam.</p>`,
  },
  {
    pageSlug: "geschiedenis",
    sectionKey: "omgeving",
    title: "De Grote Verandering: Water en Landwinning",
    content: `<p>De 20e eeuw bracht ingrijpende geografische veranderingen die het lot van het dorp bepaalden.</p>
<p>Door de jaren heen werden steeds meer polders rondom het dorp drooggelegd, waardoor de haven steeds verder van de open zee kwam te liggen. Door verzanding werd het noodzakelijk om de haven uit te baggeren. Ondanks het graven van het <em>Philippinekanaal</em> in 1900 kon de verzanding niet worden gestopt.</p>
<p>De meest ingrijpende gebeurtenis was de <strong>afsluiting van de Braakman in 1952</strong>. Na watersnoodgevaarlijke situaties werd de Braakman afgedamd. Hierdoor verloor Philippine zijn directe verbinding met de zee en daarmee zijn functie als vissershaven. De haven werd gedempt en de vloot kon niet meer uitvaren.</p>
<p>Na de afdamming hadden de vissers geen werk meer. Zij werden omgeschoold om te werken in fabrieken en in de fruitteelt. Dit is nog altijd te zien aan de rand van het dorp richting IJzendijke, waar nog veel fruitbedrijven zijn gevestigd.</p>
<p>Het huidige <strong>wandelbos</strong> ligt op de plek waar ooit de Braakman tot diep in het land reikte. Langs het pad staan vijf informatieborden met QR-codes die je meenemen door de eeuwen heen.</p>`,
  },
  {
    pageSlug: "geschiedenis",
    sectionKey: "vandaag",
    title: "Philippine Vandaag: Gastronomisch Erfgoed",
    content: `<p>Hoewel de haven nu een 'droge' haven is — met een monument in de vorm van een mosselkotter — is de mosselcultuur sterker dan ooit.</p>
<p>Het dorp trekt jaarlijks <strong>tienduizenden bezoekers</strong>, voornamelijk uit België en Nederland, die komen voor de specifieke bereidingswijze van de mosselen in de restaurants rondom het dorpsplein.</p>
<p>Op het centrale plein staat het <strong>Mosselmonument</strong>: een grote koperen mossel, een eerbetoon aan het product dat het dorp wereldberoemd maakte. Vandaag de dag herinneren de straatnamen <em>Havenstraat</em> en <em>Visserslaan</em>, de Spuikom en het Philippinekanaal nog aan de rijke maritieme geschiedenis.</p>`,
  },
  {
    pageSlug: "geschiedenis",
    sectionKey: "timeline",
    title: "Tijdlijn",
    content: `<p>Van strategische vesting tot mosseldorp — de belangrijkste gebeurtenissen door de eeuwen heen.</p>`,
  },
  {
    pageSlug: "geschiedenis",
    sectionKey: "timeline-events",
    title: "Gebeurtenissen",
    content: `1488|Doorbraak van Nieuwersluis|Ten noorden van Philippine breekt de Nieuwersluis door. In vier jaar verdwijnen zeven dorpen onder water en de Braakman groeit uit tot een enorme zeearm.
1505|Stichting van Philippine|Jeronimus Laureyn krijgt toestemming om de Saint Philippinepolder aan te leggen, vernoemd naar Filips de Schone.
1506|Stadsrechten verleend|Philippine krijgt al een jaar na de stichting stadsrechten, een teken van het belang dat aan de nieuwe nederzetting wordt gehecht.
1583|Spaanse verovering|Spaanse troepen nemen Philippine in en bouwen een sterk driehoekig fort, bekendstaand als het 'Kasteel' of 'Hoog Philippine'.
1600|Landing Prins Maurits|Prins Maurits landt met duizenden soldaten bij Philippine op weg naar de beroemde Slag bij Nieuwpoort.
1633|Staatse verovering|Willem Frederik van Nassau Dietz verovert Philippine. Het wordt een Staatse vesting met vier bastions: Zelandia, Castilië en meer.
1747|Franse bezetting|Philippine wordt ingenomen door het Franse leger, dat in 1749 weer vertrekt.
1805|Einde vestingfunctie|Besloten wordt dat de vestingfunctie definitief kan verdwijnen. In 1816 wordt dit officieel bekrachtigd.
1860|Bloei mosselvisserij|De grootschalige mosselvisserij begint. Philippine krijgt een eigen vloot, mosselbanken en de eerste mosselveiling van Nederland.
1900|Philippinekanaal gegraven|Om de verzanding tegen te gaan wordt het Philippinekanaal gegraven door de Braakman naar de Westerschelde.
1952|Afsluiting Braakman|De Braakman wordt afgedamd. Philippine verliest zijn haven en directe verbinding met de zee.
2026|Digitaal Archeopad|De Wijsneuzen realiseren het Digitaal Archeopad in het wandelbos van Philippine.`,
  },
  {
    pageSlug: "geschiedenis",
    sectionKey: "image-1",
    title: "Historische kaart van Philippine",
    content: "https://images.unsplash.com/photo-1524661135-423995f22d0b?w=800&q=80",
  },
  {
    pageSlug: "geschiedenis",
    sectionKey: "image-2",
    title: "De oude haven en de Braakman",
    content: "https://images.unsplash.com/photo-1590074072786-a66914d668f1?w=800&q=80",
  },
  {
    pageSlug: "geschiedenis",
    sectionKey: "image-3",
    title: "Het wandelbos vandaag",
    content: "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&q=80",
  },

  // ── Het Project page ─────────────────────────────────────
  {
    pageSlug: "het-project",
    sectionKey: "hero",
    title: "Het Project",
    content: "De Historie Wandeltour Philippine is een initiatief om het verleden van Philippine tot leven te brengen.",
  },
  {
    pageSlug: "het-project",
    sectionKey: "project-info",
    title: "Over het project",
    content: "<p>Dit project is opgezet om de unieke geschiedenis van Philippine toegankelijk te maken voor bewoners en bezoekers. Via informatieborden, een website en een interactieve quiz maken we het verleden tastbaar.</p>",
  },
  {
    pageSlug: "het-project",
    sectionKey: "goals",
    title: "Doelstellingen",
    content: "<p>Ons doel is om de historische verhalen van Philippine te bewaren en door te geven aan toekomstige generaties.</p>",
  },

  // ── About / Over Ons page ────────────────────────────────
  {
    pageSlug: "about",
    sectionKey: "hero",
    title: "Over Ons",
    content: "Maak kennis met de mensen achter de Historie Wandeltour Philippine.",
  },
  {
    pageSlug: "about",
    sectionKey: "team",
    title: "Het Team",
    content: "<p>De Wijsneuzen is een groep enthousiaste vrijwilligers die zich inzetten voor het behoud van de lokale geschiedenis.</p>",
  },
  {
    pageSlug: "about",
    sectionKey: "mission",
    title: "Onze Missie",
    content: "<p>Wij geloven dat het kennen van je verleden de sleutel is tot een sterke gemeenschap. Daarom maken wij de geschiedenis van Philippine toegankelijk voor iedereen.</p>",
  },
]

/**
 * Get content for a specific page section, falling back to defaults
 */
export async function getPageContent(
  pageSlug: string,
  sectionKey: string
): Promise<{ title: string; content: string }> {
  try {
    const record = await prisma.pageContent.findUnique({
      where: { pageSlug_sectionKey: { pageSlug, sectionKey } },
    })

    if (record) {
      return { title: record.title, content: record.content }
    }
  } catch {
    // Database not available, use defaults
  }

  const def = defaultPageContent.find(
    (d) => d.pageSlug === pageSlug && d.sectionKey === sectionKey
  )

  return {
    title: def?.title ?? "",
    content: def?.content ?? "",
  }
}

/**
 * Get all content for a specific page
 */
export async function getPageContents(
  pageSlug: string
): Promise<Record<string, { title: string; content: string }>> {
  const result: Record<string, { title: string; content: string }> = {}

  // First fill with defaults
  for (const def of defaultPageContent.filter(
    (d) => d.pageSlug === pageSlug
  )) {
    result[def.sectionKey] = { title: def.title, content: def.content }
  }

  // Override with database values
  try {
    const records = await prisma.pageContent.findMany({
      where: { pageSlug },
    })

    for (const rec of records) {
      result[rec.sectionKey] = { title: rec.title, content: rec.content }
    }
  } catch {
    // Database not available, defaults already set
  }

  return result
}

/**
 * Get all page content for the admin dashboard
 */
export async function getAllPageContent(): Promise<PageSection[]> {
  const result = [...defaultPageContent]

  try {
    const records = await prisma.pageContent.findMany()

    for (const rec of records) {
      const idx = result.findIndex(
        (r) => r.pageSlug === rec.pageSlug && r.sectionKey === rec.sectionKey
      )
      if (idx >= 0) {
        result[idx] = {
          pageSlug: rec.pageSlug,
          sectionKey: rec.sectionKey,
          title: rec.title,
          content: rec.content,
        }
      } else {
        result.push({
          pageSlug: rec.pageSlug,
          sectionKey: rec.sectionKey,
          title: rec.title,
          content: rec.content,
        })
      }
    }
  } catch {
    // Return defaults
  }

  return result
}

/**
 * Update (upsert) a page section's content
 */
export async function updatePageContent(
  pageSlug: string,
  sectionKey: string,
  title: string,
  content: string
) {
  return prisma.pageContent.upsert({
    where: { pageSlug_sectionKey: { pageSlug, sectionKey } },
    update: { title, content },
    create: { pageSlug, sectionKey, title, content },
  })
}
