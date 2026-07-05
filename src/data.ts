export type Operator = 'Google' | 'Amazon' | 'Microsoft' | 'Meta';

export interface Site {
  name: string;
  operator: Operator;
  loc: string;
  lat: number;
  lng: number;
  /** Estimated million liters of direct water use / year. */
  ml: number;
  note: string;
}

export const COMPANY_COLORS: Record<Operator, string> = {
  Google: 'oklch(0.58 0.13 250)',
  Amazon: 'oklch(0.62 0.13 55)',
  Microsoft: 'oklch(0.58 0.13 165)',
  Meta: 'oklch(0.58 0.13 300)',
};

// Curated estimates. ml = estimated million liters of direct water / year.
export const SITES: Site[] = [
  { name: 'The Dalles', operator: 'Google', loc: 'Oregon, USA', lat: 45.60, lng: -121.18, ml: 1700, note: 'A river-cooled campus whose water permits drew a multi-year legal fight before figures were disclosed.' },
  { name: 'Council Bluffs', operator: 'Google', loc: 'Iowa, USA', lat: 41.26, lng: -95.86, ml: 3600, note: 'One of Google’s largest U.S. campuses, in a humid-continental farm belt.' },
  { name: 'Mesa', operator: 'Google', loc: 'Arizona, USA', lat: 33.42, lng: -111.74, ml: 1900, note: 'Sited in the drought-stressed Phoenix metro, where cooling water is especially contentious.' },
  { name: 'St. Ghislain', operator: 'Google', loc: 'Hainaut, Belgium', lat: 50.45, lng: 3.82, ml: 1000, note: 'Uses recycled greywater from a nearby industrial canal for much of its cooling.' },
  { name: 'Hamina', operator: 'Google', loc: 'Kymenlaakso, Finland', lat: 60.57, lng: 27.20, ml: 250, note: 'Cooled largely by cold Baltic seawater, sharply cutting freshwater draw.' },
  { name: 'Eemshaven', operator: 'Google', loc: 'Groningen, Netherlands', lat: 53.44, lng: 6.83, ml: 600, note: 'Coastal site in a temperate climate; drew scrutiny over drinking-water use during dry summers.' },
  { name: 'Jurong West', operator: 'Google', loc: 'Singapore', lat: 1.33, lng: 103.70, ml: 1300, note: 'Hot, humid climate raises cooling demand; Singapore imports much of its water.' },
  { name: 'Changhua', operator: 'Google', loc: 'Changhua, Taiwan', lat: 24.07, lng: 120.54, ml: 1100, note: 'Located in a region that has faced serious agricultural-drought competition for water.' },
  { name: 'Quilicura', operator: 'Google', loc: 'Santiago, Chile', lat: -33.37, lng: -70.73, ml: 1000, note: 'A flashpoint for water activism during Chile’s prolonged central-valley drought.' },
  { name: 'Data Center Alley', operator: 'Amazon', loc: 'Loudoun County, Virginia, USA', lat: 39.04, lng: -77.49, ml: 4200, note: 'The world’s densest cluster of data centers, carrying enormous aggregate cooling load.' },
  { name: 'Dublin', operator: 'Amazon', loc: 'Dublin, Ireland', lat: 53.32, lng: -6.38, ml: 800, note: 'Part of a cluster so large it has strained the national grid and local resources.' },
  { name: 'Cape Town', operator: 'Amazon', loc: 'Western Cape, South Africa', lat: -33.93, lng: 18.42, ml: 700, note: 'In a city that came within weeks of “Day Zero” water shutoff in 2018.' },
  { name: 'West Des Moines', operator: 'Microsoft', loc: 'Iowa, USA', lat: 41.58, lng: -93.71, ml: 2300, note: 'Reportedly drew a large share of the surrounding town’s water while training frontier AI models.' },
  { name: 'San Antonio', operator: 'Microsoft', loc: 'Texas, USA', lat: 29.42, lng: -98.49, ml: 1100, note: 'Sited in a semi-arid region reliant on stressed aquifers.' },
  { name: 'Goodyear', operator: 'Microsoft', loc: 'Arizona, USA', lat: 33.44, lng: -112.36, ml: 1400, note: 'A Phoenix-area campus using air cooling for much of the year to limit water use.' },
  { name: 'Quincy', operator: 'Microsoft', loc: 'Washington, USA', lat: 47.23, lng: -119.85, ml: 1500, note: 'An early hyperscale hub drawn by cheap hydropower and a dry climate.' },
  { name: 'Dublin', operator: 'Microsoft', loc: 'Dublin, Ireland', lat: 53.35, lng: -6.26, ml: 900, note: 'One of Microsoft’s largest European regions, in a mild, wet climate.' },
  { name: 'Prineville', operator: 'Meta', loc: 'Oregon, USA', lat: 44.30, lng: -120.83, ml: 1600, note: 'Meta’s first custom data center; uses outside-air and evaporative cooling in a high desert.' },
  { name: 'Los Lunas', operator: 'Meta', loc: 'New Mexico, USA', lat: 34.81, lng: -106.73, ml: 1200, note: 'A large campus in an arid state; Meta has pledged water-restoration projects here.' },
  { name: 'Mesa', operator: 'Meta', loc: 'Arizona, USA', lat: 33.38, lng: -111.68, ml: 900, note: 'Designed for a closed-loop system that reuses cooling water many times over.' },
  { name: 'Fort Worth', operator: 'Meta', loc: 'Texas, USA', lat: 32.76, lng: -97.33, ml: 1300, note: 'A sprawling North Texas campus in a fast-growing, water-stressed metro.' },
  { name: 'Odense', operator: 'Meta', loc: 'Odense, Denmark', lat: 55.40, lng: 10.39, ml: 300, note: 'Recovers waste heat to warm thousands of nearby homes, and uses efficient cooling.' },
];
