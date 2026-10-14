export type MapView = "americas" | "central" | "south" | "europe" | "africa";
export type Topic = "spanish" | "neighbors" | "water";

export type StudyPlace = {
  id: string;
  spanish: string;
  english: string;
  topic: Topic;
  region: MapView;
  group: string;
  point: readonly [number, number];
  clue: string;
  nationality?: readonly [string, string];
  aliases?: readonly string[];
  nationalityAliases?: readonly [readonly string[], readonly string[]];
  note?: string;
};

// The teacher's checklist is the scope. Puerto Rico is included as a
// Spanish-speaking territory; the neighboring places are a separate topic.
export const studyPlaces: readonly StudyPlace[] = [
  { id: "COL", spanish: "Colombia", english: "Colombia", topic: "spanish", region: "south", group: "South America", point: [-73, 4], clue: "Northwestern South America, just below Panamá; west of Venezuela.", nationality: ["colombiano", "colombiana"] },
  { id: "MEX", spanish: "México", english: "Mexico", topic: "spanish", region: "americas", group: "North America", point: [-102, 24], clue: "South of the United States; north of Guatemala and Belice.", nationality: ["mexicano", "mexicana"], aliases: ["Méjico"], nationalityAliases: [["mejicano"], ["mejicana"]] },
  { id: "GTM", spanish: "Guatemala", english: "Guatemala", topic: "spanish", region: "central", group: "Central America", point: [-90.3, 15.6], clue: "Just south of México. Belice is to its northeast; El Salvador is to its southeast.", nationality: ["guatemalteco", "guatemalteca"] },
  { id: "SLV", spanish: "El Salvador", english: "El Salvador", topic: "spanish", region: "central", group: "Central America", point: [-88.9, 13.75], clue: "The small Pacific-side country below Guatemala and Honduras.", nationality: ["salvadoreño", "salvadoreña"] },
  { id: "HND", spanish: "Honduras", english: "Honduras", topic: "spanish", region: "central", group: "Central America", point: [-86.5, 14.8], clue: "East of Guatemala and north of Nicaragua, with a long Caribbean coast.", nationality: ["hondureño", "hondureña"] },
  { id: "NIC", spanish: "Nicaragua", english: "Nicaragua", topic: "spanish", region: "central", group: "Central America", point: [-85, 12.7], clue: "Between Honduras and Costa Rica.", nationality: ["nicaragüense", "nicaragüense"], note: "Remember the -ense ending and keep the ü." },
  { id: "CRI", spanish: "Costa Rica", english: "Costa Rica", topic: "spanish", region: "central", group: "Central America", point: [-84.2, 9.8], clue: "Between Nicaragua and Panamá.", nationality: ["costarricense", "costarricense"], note: "Remember the double r and the -ense ending." },
  { id: "PAN", spanish: "Panamá", english: "Panama", topic: "spanish", region: "central", group: "Central America", point: [-80, 8.5], clue: "The narrow link between Costa Rica and Colombia.", nationality: ["panameño", "panameña"] },
  { id: "CUB", spanish: "Cuba", english: "Cuba", topic: "spanish", region: "central", group: "Caribbean", point: [-79.9, 22], clue: "The long Caribbean island south of Florida and north of Jamaica.", nationality: ["cubano", "cubana"] },
  { id: "DOM", spanish: "República Dominicana", english: "Dominican Republic", topic: "spanish", region: "central", group: "Caribbean", point: [-70.2, 18.9], clue: "The eastern part of Hispaniola; Haití occupies the western part.", nationality: ["dominicano", "dominicana"], note: "Do not confuse República Dominicana with Dominica." },
  { id: "PRI", spanish: "Puerto Rico", english: "Puerto Rico", topic: "spanish", region: "central", group: "Caribbean", point: [-66.45, 18.2], clue: "The island east of República Dominicana.", nationality: ["puertorriqueño", "puertorriqueña"], nationalityAliases: [["portorriqueño"], ["portorriqueña"]], note: "A U.S. territory, included in the Spanish-speaking world." },
  { id: "VEN", spanish: "Venezuela", english: "Venezuela", topic: "spanish", region: "south", group: "South America", point: [-65.8, 7.6], clue: "On South America's northern coast, east of Colombia and west of Guyana.", nationality: ["venezolano", "venezolana"] },
  { id: "ECU", spanish: "Ecuador", english: "Ecuador", topic: "spanish", region: "south", group: "South America", point: [-78.3, -1.4], clue: "On the Pacific coast, between Colombia and Perú.", nationality: ["ecuatoriano", "ecuatoriana"] },
  { id: "PER", spanish: "Perú", english: "Peru", topic: "spanish", region: "south", group: "South America", point: [-74.5, -9.5], clue: "South of Ecuador, on the Pacific coast; west of Bolivia and Brasil.", nationality: ["peruano", "peruana"] },
  { id: "BOL", spanish: "Bolivia", english: "Bolivia", topic: "spanish", region: "south", group: "South America", point: [-64.8, -17], clue: "Landlocked, east of Perú, north of Argentina and Paraguay.", nationality: ["boliviano", "boliviana"] },
  { id: "CHL", spanish: "Chile", english: "Chile", topic: "spanish", region: "south", group: "South America", point: [-71, -30], clue: "The long, narrow Pacific-side country west of Argentina.", nationality: ["chileno", "chilena"] },
  { id: "ARG", spanish: "Argentina", english: "Argentina", topic: "spanish", region: "south", group: "South America", point: [-64, -35], clue: "East of Chile, south of Bolivia and Paraguay.", nationality: ["argentino", "argentina"] },
  { id: "PRY", spanish: "Paraguay", english: "Paraguay", topic: "spanish", region: "south", group: "South America", point: [-58.2, -23.3], clue: "Landlocked, between Bolivia, Brasil and Argentina.", nationality: ["paraguayo", "paraguaya"] },
  { id: "URY", spanish: "Uruguay", english: "Uruguay", topic: "spanish", region: "south", group: "South America", point: [-56, -32.8], clue: "The small Atlantic-side country between Argentina and Brasil.", nationality: ["uruguayo", "uruguaya"] },
  { id: "ESP", spanish: "España", english: "Spain", topic: "spanish", region: "europe", group: "Europe & Africa", point: [-3.8, 40], clue: "On the Iberian Peninsula, east of Portugal, south of Francia, north of Marruecos.", nationality: ["español", "española"] },
  { id: "GNQ", spanish: "Guinea Ecuatorial", english: "Equatorial Guinea", topic: "spanish", region: "africa", group: "Europe & Africa", point: [10.4, 1.7], clue: "On Africa's Atlantic coast, south of Camerún and north of Gabón; also includes islands.", nationality: ["ecuatoguineano", "ecuatoguineana"], note: "Do not confuse it with Guinea or Guinea-Bisáu." },
  { id: "BLZ", spanish: "Belice", english: "Belize", topic: "neighbors", region: "central", group: "Nearby places", point: [-88.7, 17.2], clue: "On the Caribbean coast, east of Guatemala and south of México." },
  { id: "BRA", spanish: "Brasil", english: "Brazil", topic: "neighbors", region: "south", group: "Nearby places", point: [-52, -12], clue: "The large country in eastern South America. Its main language is Portuguese." },
  { id: "JAM", spanish: "Jamaica", english: "Jamaica", topic: "neighbors", region: "central", group: "Nearby places", point: [-77.3, 18.1], clue: "The island south of Cuba and west of Hispaniola." },
  { id: "GUY", spanish: "Guyana", english: "Guyana", topic: "neighbors", region: "south", group: "Nearby places", point: [-58.8, 5.1], clue: "East of Venezuela, west of Surinam, on South America's northern coast." },
  { id: "SUR", spanish: "Surinam", english: "Suriname", topic: "neighbors", region: "south", group: "Nearby places", point: [-55.9, 4], clue: "Between Guyana and Guayana Francesa.", aliases: ["Suriname"] },
  { id: "GUF", spanish: "Guayana Francesa", english: "French Guiana", topic: "neighbors", region: "south", group: "Nearby places", point: [-53.2, 4.1], clue: "East of Surinam, north of Brasil.", note: "A French overseas territory, not an independent country." },
  { id: "PRT", spanish: "Portugal", english: "Portugal", topic: "neighbors", region: "europe", group: "Nearby places", point: [-8, 39.8], clue: "The Atlantic-side country west of España." },
  { id: "FRA", spanish: "Francia", english: "France", topic: "neighbors", region: "europe", group: "Nearby places", point: [2, 46.5], clue: "Northeast of España, across the Pyrenees." },
  { id: "MAR", spanish: "Marruecos", english: "Morocco", topic: "neighbors", region: "europe", group: "Nearby places", point: [-6.8, 32], clue: "In northwestern Africa, across the Strait of Gibraltar from España." },
  { id: "USA", spanish: "Estados Unidos", english: "United States", topic: "neighbors", region: "americas", group: "Nearby places", point: [-99, 38], clue: "North of México. Miami is in southeastern Florida.", aliases: ["los Estados Unidos", "Estados Unidos de América", "EE. UU."] },
  { id: "MIA", spanish: "Miami", english: "Miami", topic: "neighbors", region: "central", group: "Nearby places", point: [-80.19, 25.76], clue: "A city on Florida's southeastern coast, north of Cuba.", note: "A city in the United States, not a country." },
  { id: "CAR", spanish: "mar Caribe", english: "Caribbean Sea", topic: "water", region: "central", group: "Seas & oceans", point: [-75, 15], clue: "South of Cuba, Hispaniola and Puerto Rico; east of Central America.", aliases: ["Caribe", "el mar Caribe"] },
  { id: "MED", spanish: "mar Mediterráneo", english: "Mediterranean Sea", topic: "water", region: "europe", group: "Seas & oceans", point: [5, 39], clue: "Between southern Europe and northern Africa; east of the Strait of Gibraltar.", aliases: ["Mediterráneo", "el mar Mediterráneo"] },
  { id: "ATL", spanish: "océano Atlántico", english: "Atlantic Ocean", topic: "water", region: "americas", group: "Seas & oceans", point: [-40, 15], clue: "East of the Americas and west of Europe and Africa.", aliases: ["Atlántico", "el océano Atlántico"] },
  { id: "PAC", spanish: "océano Pacífico", english: "Pacific Ocean", topic: "water", region: "americas", group: "Seas & oceans", point: [-110, -9], clue: "West of México, Central America and South America.", aliases: ["Pacífico", "el océano Pacífico"] },
  { id: "GOM", spanish: "golfo de México", english: "Gulf of Mexico", topic: "water", region: "central", group: "Seas & oceans", point: [-91, 25], clue: "Between eastern México, the southern United States and Cuba.", aliases: ["el golfo de México"] },
];

export const spanishPlaces = studyPlaces.filter((place) => place.topic === "spanish");
export const placeById = new Map(studyPlaces.map((place) => [place.id, place]));
export const topicLabels: Record<Topic, string> = {
  spanish: "Spanish-speaking places",
  neighbors: "Neighbors & Miami",
  water: "Seas & oceans",
};

export const mapViews: { id: MapView; label: string; bounds: readonly [number, number, number, number] }[] = [
  { id: "americas", label: "Americas", bounds: [-125, -58, -29, 48] },
  { id: "central", label: "Central & Caribbean", bounds: [-99, 6, -61, 29] },
  { id: "south", label: "South America", bounds: [-88, -57, -30, 14] },
  { id: "europe", label: "Spain & N. Africa", bounds: [-14, 26, 13, 52] },
  { id: "africa", label: "Equatorial Guinea", bounds: [5, -1.5, 13, 6] },
];

export const studySources = [
  { label: "RAE · names & nationalities", url: "https://www.rae.es/dpd/ayuda/paises-y-capitales-con-sus-gentilicios" },
  { label: "Instituto Cervantes · Spanish-speaking world", url: "https://cvc.cervantes.es/lengua/anuario/anuario_22/informes_ic/cuadros.htm" },
  { label: "Natural Earth · map outlines (public domain)", url: "https://www.naturalearthdata.com/" },
];
