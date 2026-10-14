/** قائمة «شركات الخبر والدمام» كما وردت: الاسم، وعلامة الأولوية للمظلَّل بالأخضر. الأرقام هي ترتيبها في القائمة الأصلية. */
const P = "*";
const RAW: string[] = [
  `Saudi Aramco (Ithraa)${P}`, `Aramco Digital${P}`, `ASMO (Aramco DHL logistics)${P}`, `Aramco Trading${P}`, `Aramco Ventures Company${P}`, `Saudi Aramco Power Company${P}`, `Valvoline by Aramco${P}`, `شركة الأداء المميز للكيماويات${P}`, `Makeen industries by Aramco${P}`, `Waed company by Aramco${P}`,
  "DHL Khobar", "EXTRA group", "Baker Hughes", "Halliburton", "Sipchem", "Weatherford", "Arabian Drilling", "Wood", "Worley", "Parsons",
  "JGC international", "Siemens", "ABB (Dammam second industrial city)", "AMCO company", "Emerson", "Honeywell", "Air products", "Yokogawa", "Schlumberger (SLB)", "Tamimi Industrial Services",
  "Electrical Industries", "Redtag (Retail)", "Rawabi Electric", "Saudi Tarbreed", "Al Waleed Investment group", "Jal International", "GCC LAB", "GCCIA هيئة الربط الخليجي", "Aims International", "Go Tech",
  "Estidama environmental solutions", "Gulf International Bank", "King Fahad Causeway Authority", "Dammam Airports Company (DACO)", `Alola Airlines by Aramco${P}`, "Saudi Ports Company (PIF Company)", "Tihamah Power Generation Company Limited", "East Gas Company", "EEIC company (Eaton Arabia)", "Shell Saudi Arabia",
  "Energy Projects Support Company Ltd", "GAS Arabian Services Company", "Saipem", "Sinopec Saudi Arabia", "Saraco", "SNC Lavalin", "Rawabi Holding", "GS Engineering and Construction", "Tenaris", "Air Liquide",
  "Jacobs Engineering", "Wier Engineering Services", "Alkhorayef Petroleum", "Global Suhaimi", "Aspen Tech", `Dhahran Techno Valley Holding${P}`, `Amaad Company Dhahran${P}`, "Rosen Dhahran Valley", "NESR Oil and Gas", "Taqa International",
  "Aviva Dhahran Valley", "ERAM for oil and gas", `Lab7 by Aramco${P}`, "WESCOSA Westinghouse", "General Electric (GESAT)", "NGC Energy", "APICORP (energy investments)", "INMA energy", "Kents Engineering", "Tecnicas Reunidas (engineering in oil and gas)",
  "National Water Company (NWC)", "I energy company", "Gulf Energy (gulfenergysa.com)", "AtkinsRéalis", "Ecolab", "McDermott", "Fluor", "Flowserve", "Linde SIGAS", "Technip FMC",
  "Cameron", "Bechtel Construction", "Eaton Arabia", "Aecom Arabia Ltd", "Engie Solutions", "Petrofac", "Subsea 7", `Nabors Industries${P}`, "Chevron Philips chemicals", "Sumitomo Corporation",
  "Mitsubishi Power Saudi Arabia", "Hitachi Energy", "Northrop-Grumman (NGMSA)", "Technip Energies", "Rosen", "BASF Saudi Arabia", "National Oilwell Varco (NOV) oil field equipment", "Solvay", "Dow Chemicals Khobar", "East Pipes Integrated Company",
  "Veolia", "Rockwell Automation Saudi", "Petrolink Services", "EIA Energy", "Pall Manufacturing and Services Center", "ATCO limited", "United Fuel Company (ENOC)", "Weir Group", "SEPCO Electric Power", "Dresser Rand",
  "KCA DEUTAG", "Doosan", `Novel${P}`, "QST Tamasuk", "Napesco", "ADNOC Saudi office", "ITS Arabia Parker Wellbore", "REDA Gulf for Energy Factory", "Saudi Diesel Equipment Company", "Oilfields supply center Saudi Arabia",
  "Waha Electric Supply Company Saudi Arabia", "Al Khorayef Petroleum", "Legrand Saudi Electric Industries", "Al Rushaid Petroleum Investments", "Point Eight Power Company Arabia", "Madaniyah company for specialized minerals", "PETROBLEND OILFIELD SUPPLIES", "Al Hoty Stanger Ltd Co", "OILFIELD SUPPLIES & SERVICE", "Oilfields supply center Saudi Arabia (UAE company in Saudi)",
  `Sanad Drilling (Aramco JV)${P}`, `Arabian Reg Manufacturing Company (Aramco JV)${P}`, "Hajr Power Generation Company", "Integrated Energy Solutions Company", "Schenker Global Projects / Oil & Gas", "Nesma Infrastructure and Technology Company", "Takween Advanced Industries", `ARO Drilling (Aramco JV)${P}`, "Inkan Holding (National oil and gas)", "Dynamic Energy",
  "Al Rushaid Technologies (Energy)", "Shelf Drilling", "Saudi Global Energy", "NBTC (Energy)", "ADES Advanced Energy Systems", "ACES Subsidiary Sumitomo Corp", "Central Mining Company for Investment", "Ingress Group", `Jana Marines Services Company${P}`, "System Shield Company",
  "NOMAC (Khobar office)", "Eneract Engineering Solutions", "Accell Saudi Arabia (Energy Solutions)", "Saudi Archirodon Limited", "Sawafi Borets", "Advanced Metal Company for Mining (AMCO)", "Seah Gulf Special Steel Industries", "Gulf Baas Company", "Magnetic Control Factory", "Gulf Cryo",
  "Saudi Drill Company", `Energy City Development Company${P}`, `Energy City Operating Company (SPARK Utilities)${P}`, `Energy City Logistics Company (SPARK Logistics)${P}`, "National Lithium Company", "We Energy", "Fortune Engineering & Energy Services Saudi", "Global Energy Trading Company", "Energy Box Trading", "Rawabi Energy",
  "Rawabi Archer (oil drilling)", "Rawabi Oil and Gas", "Musanadah (Facilities Management)", "Alaat at SPARK (PIF Company)", "Al Uqair Development Company (PIF Company)", "The Rig (PIF company)", "Vision Invest (Al Muhaideb Group)", "SAMANA energy", "Smart Meter Energy Company", "Woodlands Energy Services",
  `Aramco Lubricants and Retail Company${P}`, "GE DNV", "Gulf Energy Integrated Services", "Blue Hydrogen Company", "Arabian Qudra (Solar Energy)", "PCPC (Aramco JV)", "Element (Testing and Inspection company)", "Future Achievement", "Applus Velosi", "Wel Tec (oil and gas services company)",
  "Gulf Chemicals and industrial oils", "Emerson (manufacturing hub at SPARK)", "Procter and Gamble (Tide factory)", "ArcelorMittal", "Tenaris Saudi Arabia (energy piping industry)", "Henkel Industrial Company", "Olayan Kimberly Clark Saudi Arabia", "Endress And Hauser Arabia", "Mantech Systems Company", "Acciona Agua",
  "Kent (British Engineering)", "Marafiq (Jubail commute from Khobar)", "Tally Gulf ERP", "SLFE (Engineering Consulting)", "Aanbeeb Industrial Services", "Castrol Oil Lubricants Company", "Keller Company Limited", "SLB MI Swaco (drilling equipment)", "Wilhelmsen Ships Service Barwil Agencies for Shipping", "Trikkin company",
  "Valaris drilling company", "Intech process automation", "ENPRO (Energy Project Support Company)", "Bechtel Energies", "APEX Energy Consulting", "Saudi Transformers Company", "Saudi Power Transformers Company", `Plan Digital${P}`, "Electrical Industries Company (EIC)", "SEHA Dussur at SPARK",
  "TIEPCO (The International Electrical Products Company)", "Bawan (United Transformers Electric Company - Utec)", "Air Liquide", "Pauwels Transformers NV", "GSL Global Scientific Laboratories", "Legrand Saudi Electric Industries Co.", "National Solar Systems Co.", "Welspun Middle East Pipes LLC.", "Electronic And Electrical Industries Corporation", "Saudi Total Petroleum Products",
  "Technical Marine Contracting Company", "AtkinsRéalis", "Jones Engineering", "SAP KSA Software Services Co. (Khobar)", "Henry Harvin Saudi Arabia", "Huawei (oil and gas office in Khobar)", "Enerco Energy", "Saudi Arabian Chevron", "NMDC Energy", "Biochem",
];

export type Company = { rank: number; name: string; priority: boolean };
export const COMPANIES: Company[] = RAW.map((r, i) => ({ rank: i + 1, name: r.replace(/\*$/, ""), priority: r.endsWith(P) }));

/** مفتاح مقارنة الأسماء: بلا أقواس ولا رموز ولا لواحق المنشآت، لنكتشف المكرر ونطابق الملفات المستوردة. */
export function nameKey(s: string): string {
  return s
    .toLowerCase()
    .replace(/\([^)]*\)/g, " ")
    .replace(/[^\p{L}\p{N}\s]/gu, " ")
    .replace(/\b(company|co|ltd|limited|llc|saudi arabia|saudi|arabia|ksa|the)\b/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
