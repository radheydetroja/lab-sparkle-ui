// Sample compound data for the chemistry lab

export interface Compound {
  id: string;
  name: string;
  symbol: string;
  category: string;
  rarity: 'common' | 'uncommon' | 'rare' | 'epic' | 'legendary';
  description: string;
  mw: string;
  points: number;
  uses: string[];
  discovered: boolean;
  synthesisHint?: string;
}

export interface Reaction {
  id: string;
  inputs: string[];
  output: string;
  name: string;
  description: string;
}

export interface Achievement {
  id: string;
  name: string;
  description: string;
  requirement: string;
  points: number;
  icon: string;
}

export const compounds: Compound[] = [
  // Basic Elements
  {
    id: 'h',
    name: 'Hydrogen',
    symbol: 'H',
    category: 'Element',
    rarity: 'common',
    description: 'The lightest and most abundant element in the universe',
    mw: '1.008g/mol',
    points: 0,
    uses: ['Fuel cells', 'Rocket fuel', 'Industrial processes'],
    discovered: true
  },
  {
    id: 'o',
    name: 'Oxygen',
    symbol: 'O',
    category: 'Element',
    rarity: 'common',
    description: 'Essential for combustion and respiration',
    mw: '15.999g/mol',
    points: 0,
    uses: ['Breathing', 'Steel production', 'Medical applications'],
    discovered: true
  },
  {
    id: 'c',
    name: 'Carbon',
    symbol: 'C',
    category: 'Element',
    rarity: 'common',
    description: 'The backbone of all organic molecules',
    mw: '12.011g/mol',
    points: 0,
    uses: ['Diamonds', 'Graphite', 'Carbon fiber', 'Plastics'],
    discovered: true
  },
  {
    id: 'na',
    name: 'Sodium',
    symbol: 'Na',
    category: 'Element',
    rarity: 'common',
    description: 'Highly reactive alkali metal',
    mw: '22.99g/mol',
    points: 0,
    uses: ['Table salt', 'Soap production', 'Street lights'],
    discovered: true
  },
  {
    id: 'cl',
    name: 'Chlorine',
    symbol: 'Cl',
    category: 'Element',
    rarity: 'common',
    description: 'Toxic halogen gas used for disinfection',
    mw: '35.453g/mol',
    points: 0,
    uses: ['Water purification', 'Bleach', 'PVC production'],
    discovered: true
  },
  {
    id: 's',
    name: 'Sulfur',
    symbol: 'S',
    category: 'Element',
    rarity: 'common',
    description: 'Yellow nonmetal essential for proteins',
    mw: '32.065g/mol',
    points: 0,
    uses: ['Sulfuric acid', 'Fertilizers', 'Rubber vulcanization'],
    discovered: true
  },
  {
    id: 'n',
    name: 'Nitrogen',
    symbol: 'N',
    category: 'Element',
    rarity: 'common',
    description: 'Inert gas making up 78% of Earth\'s atmosphere',
    mw: '14.007g/mol',
    points: 0,
    uses: ['Fertilizers', 'Explosives', 'Food preservation'],
    discovered: true
  },
  {
    id: 'ca',
    name: 'Calcium',
    symbol: 'Ca',
    category: 'Element',
    rarity: 'common',
    description: 'Essential alkaline earth metal for bones',
    mw: '40.078g/mol',
    points: 0,
    uses: ['Bones and teeth', 'Cement', 'Steel production'],
    discovered: true
  },
  // Compounds
  {
    id: 'h2o',
    name: 'Water',
    symbol: 'H₂O',
    category: 'Mineral',
    rarity: 'common',
    description: 'Universal solvent essential for all life',
    mw: '18.015g/mol',
    points: 10,
    uses: ['Drinking', 'Cleaning', 'Industrial processes', 'Agriculture'],
    discovered: false,
    synthesisHint: 'Combine hydrogen and oxygen'
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    symbol: 'CO₂',
    category: 'Gas',
    rarity: 'common',
    description: 'Greenhouse gas produced by combustion',
    mw: '44.01g/mol',
    points: 15,
    uses: ['Fire extinguishers', 'Carbonated drinks', 'Dry ice'],
    discovered: false,
    synthesisHint: 'Combine carbon and oxygen'
  },
  {
    id: 'nacl',
    name: 'Sodium Chloride',
    symbol: 'NaCl',
    category: 'Salt',
    rarity: 'common',
    description: 'Common table salt essential for life',
    mw: '58.443g/mol',
    points: 20,
    uses: ['Food seasoning', 'De-icing roads', 'Chemical production'],
    discovered: false,
    synthesisHint: 'Combine sodium and chlorine'
  },
  {
    id: 'hcl',
    name: 'Hydrochloric Acid',
    symbol: 'HCl',
    category: 'Acid',
    rarity: 'uncommon',
    description: 'Strong acid found in stomach',
    mw: '36.461g/mol',
    points: 25,
    uses: ['Steel pickling', 'pH control', 'Food processing'],
    discovered: false,
    synthesisHint: 'Combine hydrogen and chlorine'
  },
  {
    id: 'naoh',
    name: 'Sodium Hydroxide',
    symbol: 'NaOH',
    category: 'Base',
    rarity: 'uncommon',
    description: 'Caustic soda - strong base',
    mw: '39.997g/mol',
    points: 25,
    uses: ['Soap making', 'Paper production', 'Drain cleaners'],
    discovered: false,
    synthesisHint: 'React sodium with water'
  },
  {
    id: 'h2so4',
    name: 'Sulfuric Acid',
    symbol: 'H₂SO₄',
    category: 'Acid',
    rarity: 'rare',
    description: 'King of chemicals - most produced industrial chemical',
    mw: '98.079g/mol',
    points: 40,
    uses: ['Car batteries', 'Fertilizer production', 'Metal processing'],
    discovered: false,
    synthesisHint: 'Complex multi-step synthesis from sulfur'
  },
  {
    id: 'h2co3',
    name: 'Carbonic Acid',
    symbol: 'H₂CO₃',
    category: 'Acid',
    rarity: 'uncommon',
    description: 'Weak acid that makes soda fizzy',
    mw: '62.025g/mol',
    points: 35,
    uses: ['Carbonated beverages', 'Natural water systems'],
    discovered: false,
    synthesisHint: 'Dissolve CO₂ in water'
  },
  {
    id: 'na2co3',
    name: 'Sodium Carbonate',
    symbol: 'Na₂CO₃',
    category: 'Salt',
    rarity: 'uncommon',
    description: 'Washing soda for cleaning',
    mw: '105.988g/mol',
    points: 30,
    uses: ['Glass making', 'Water softening', 'Cleaning products'],
    discovered: false,
    synthesisHint: 'Neutralize carbonic acid with base'
  },
  {
    id: 'cao',
    name: 'Calcium Oxide',
    symbol: 'CaO',
    category: 'Base',
    rarity: 'uncommon',
    description: 'Quicklime - highly reactive base',
    mw: '56.077g/mol',
    points: 25,
    uses: ['Cement production', 'Steel making', 'Water treatment'],
    discovered: false,
    synthesisHint: 'Combine calcium and oxygen'
  },
  {
    id: 'nh3',
    name: 'Ammonia',
    symbol: 'NH₃',
    category: 'Base',
    rarity: 'uncommon',
    description: 'Pungent gas essential for fertilizers',
    mw: '17.031g/mol',
    points: 30,
    uses: ['Fertilizers', 'Cleaning products', 'Refrigeration'],
    discovered: false,
    synthesisHint: 'Combine nitrogen and hydrogen'
  },
  {
    id: 'ch4',
    name: 'Methane',
    symbol: 'CH₄',
    category: 'Organic',
    rarity: 'common',
    description: 'Simplest hydrocarbon and natural gas',
    mw: '16.043g/mol',
    points: 20,
    uses: ['Natural gas', 'Heating', 'Chemical feedstock'],
    discovered: false,
    synthesisHint: 'Combine carbon and hydrogen'
  },
  {
    id: 'c2h4',
    name: 'Ethylene',
    symbol: 'C₂H₄',
    category: 'Organic',
    rarity: 'uncommon',
    description: 'Plant hormone and plastic precursor',
    mw: '28.054g/mol',
    points: 35,
    uses: ['Plastic production', 'Fruit ripening', 'Welding'],
    discovered: false,
    synthesisHint: 'Advanced carbon-hydrogen synthesis'
  },
  {
    id: 'c2h2',
    name: 'Acetylene',
    symbol: 'C₂H₂',
    category: 'Organic',
    rarity: 'rare',
    description: 'Highly flammable welding gas',
    mw: '26.038g/mol',
    points: 45,
    uses: ['Welding', 'Metal cutting', 'Chemical synthesis'],
    discovered: false,
    synthesisHint: 'Combine carbon with hydrogen or other organics'
  },
  {
    id: 'c2h6o',
    name: 'Ethanol',
    symbol: 'C₂H₆O',
    category: 'Organic',
    rarity: 'uncommon',
    description: 'Drinking alcohol and biofuel',
    mw: '46.069g/mol',
    points: 35,
    uses: ['Alcoholic beverages', 'Fuel', 'Antiseptic', 'Solvent'],
    discovered: false,
    synthesisHint: 'Combine carbon with hydrogen or other organics'
  },
  {
    id: 'c6h12o6',
    name: 'Glucose',
    symbol: 'C₆H₁₂O₆',
    category: 'Organic',
    rarity: 'epic',
    description: 'Essential sugar for energy production',
    mw: '180.156g/mol',
    points: 100,
    uses: ['Food energy', 'Diabetes treatment', 'Fermentation'],
    discovered: false,
    synthesisHint: 'Combine carbon with hydrogen or other organics'
  },
  {
    id: 'p',
    name: 'Phosphorus',
    symbol: 'P',
    category: 'Element',
    rarity: 'common',
    description: 'Essential element for DNA and bones',
    mw: '30.974g/mol',
    points: 0,
    uses: ['Fertilizers', 'DNA', 'Bones', 'Matches'],
    discovered: true
  },
  {
    id: 'k',
    name: 'Potassium',
    symbol: 'K',
    category: 'Element',
    rarity: 'common',
    description: 'Alkali metal essential for nerve function',
    mw: '39.098g/mol',
    points: 0,
    uses: ['Fertilizers', 'Nerve function', 'Soap production'],
    discovered: true
  },
  {
    id: 'mg',
    name: 'Magnesium',
    symbol: 'Mg',
    category: 'Element',
    rarity: 'common',
    description: 'Light metal essential for chlorophyll',
    mw: '24.305g/mol',
    points: 0,
    uses: ['Alloys', 'Fireworks', 'Chlorophyll', 'Medicine'],
    discovered: true
  },
  {
    id: 'hno3',
    name: 'Nitric Acid',
    symbol: 'HNO₃',
    category: 'Acid',
    rarity: 'rare',
    description: 'Strong acid used in explosives',
    mw: '63.012g/mol',
    points: 50,
    uses: ['Explosives', 'Fertilizers', 'Metal etching'],
    discovered: false,
    synthesisHint: 'Complex multi-step synthesis from nitrogen'
  },
  {
    id: 'h3po4',
    name: 'Phosphoric Acid',
    symbol: 'H₃PO₄',
    category: 'Acid',
    rarity: 'rare',
    description: 'Acid used in soft drinks and fertilizers',
    mw: '97.994g/mol',
    points: 45,
    uses: ['Soft drinks', 'Fertilizers', 'Rust removal'],
    discovered: false,
    synthesisHint: 'Complex multi-step synthesis from phosphorus'
  },
  {
    id: 'koh',
    name: 'Potassium Hydroxide',
    symbol: 'KOH',
    category: 'Base',
    rarity: 'uncommon',
    description: 'Strong base used in soap making',
    mw: '56.106g/mol',
    points: 30,
    uses: ['Soap making', 'Batteries', 'Chemical production'],
    discovered: false,
    synthesisHint: 'React potassium with water'
  },
  {
    id: 'mgoh2',
    name: 'Magnesium Hydroxide',
    symbol: 'Mg(OH)₂',
    category: 'Base',
    rarity: 'uncommon',
    description: 'Milk of magnesia - antacid',
    mw: '58.319g/mol',
    points: 25,
    uses: ['Antacid', 'Laxative', 'Fire retardant'],
    discovered: false,
    synthesisHint: 'React magnesium with water'
  },
  {
    id: 'kcl',
    name: 'Potassium Chloride',
    symbol: 'KCl',
    category: 'Salt',
    rarity: 'common',
    description: 'Salt substitute and fertilizer',
    mw: '74.551g/mol',
    points: 20,
    uses: ['Salt substitute', 'Fertilizer', 'Medical treatment'],
    discovered: false,
    synthesisHint: 'Combine potassium and chlorine'
  },
  {
    id: 'mgcl2',
    name: 'Magnesium Chloride',
    symbol: 'MgCl₂',
    category: 'Salt',
    rarity: 'common',
    description: 'De-icing salt and supplement',
    mw: '95.211g/mol',
    points: 25,
    uses: ['De-icing', 'Supplement', 'Cement production'],
    discovered: false,
    synthesisHint: 'Combine magnesium and chlorine'
  },
  {
    id: 'cacl2',
    name: 'Calcium Chloride',
    symbol: 'CaCl₂',
    category: 'Salt',
    rarity: 'common',
    description: 'De-icing agent and desiccant',
    mw: '110.984g/mol',
    points: 25,
    uses: ['De-icing roads', 'Drying agent', 'Food additive'],
    discovered: false,
    synthesisHint: 'Combine calcium and chlorine'
  },
  {
    id: 'so2',
    name: 'Sulfur Dioxide',
    symbol: 'SO₂',
    category: 'Gas',
    rarity: 'uncommon',
    description: 'Acid rain precursor and food preservative',
    mw: '64.066g/mol',
    points: 30,
    uses: ['Wine making', 'Food preservation', 'Bleaching'],
    discovered: false,
    synthesisHint: 'Burn sulfur in oxygen'
  },
  {
    id: 'so3',
    name: 'Sulfur Trioxide',
    symbol: 'SO₃',
    category: 'Gas',
    rarity: 'rare',
    description: 'Highly reactive sulfuric acid precursor',
    mw: '80.066g/mol',
    points: 40,
    uses: ['Sulfuric acid production', 'Sulfonation reactions'],
    discovered: false,
    synthesisHint: 'Oxidize sulfur dioxide'
  },
  {
    id: 'no',
    name: 'Nitrogen Oxide',
    symbol: 'NO',
    category: 'Gas',
    rarity: 'uncommon',
    description: 'Intermediate in nitric acid production',
    mw: '30.006g/mol',
    points: 25,
    uses: ['Nitric acid production', 'Signaling molecule'],
    discovered: false,
    synthesisHint: 'Combine nitrogen and oxygen'
  },
  {
    id: 'co',
    name: 'Carbon Monoxide',
    symbol: 'CO',
    category: 'Gas',
    rarity: 'uncommon',
    description: 'Toxic gas from incomplete combustion',
    mw: '28.010g/mol',
    points: 25,
    uses: ['Steel production', 'Chemical synthesis'],
    discovered: false,
    synthesisHint: 'Incomplete combustion of carbon'
  },
  {
    id: 'p2o5',
    name: 'Phosphorus Pentoxide',
    symbol: 'P₂O₅',
    category: 'Oxide',
    rarity: 'rare',
    description: 'Powerful dehydrating agent',
    mw: '141.944g/mol',
    points: 40,
    uses: ['Drying agent', 'Phosphoric acid production'],
    discovered: false,
    synthesisHint: 'Burn phosphorus in excess oxygen'
  },
  {
    id: 'mgo',
    name: 'Magnesium Oxide',
    symbol: 'MgO',
    category: 'Oxide',
    rarity: 'uncommon',
    description: 'Refractory material and antacid',
    mw: '40.304g/mol',
    points: 25,
    uses: ['Refractory bricks', 'Antacid', 'Supplements'],
    discovered: false,
    synthesisHint: 'Burn magnesium in oxygen'
  },
  {
    id: 'k2o',
    name: 'Potassium Oxide',
    symbol: 'K₂O',
    category: 'Oxide',
    rarity: 'uncommon',
    description: 'Basic oxide used in glass',
    mw: '94.196g/mol',
    points: 30,
    uses: ['Glass production', 'Ceramics', 'Fertilizers'],
    discovered: false,
    synthesisHint: 'Burn potassium in oxygen'
  }
];

export const reactions: Reaction[] = [
  // Basic formations
  {
    id: 'water',
    inputs: ['h', 'h', 'o'],
    output: 'h2o',
    name: 'Water Formation',
    description: 'H + H + O → H₂O'
  },
  {
    id: 'salt',
    inputs: ['na', 'cl'],
    output: 'nacl',
    name: 'Salt Formation',
    description: 'Na + Cl → NaCl'
  },
  {
    id: 'co2',
    inputs: ['c', 'o', 'o'],
    output: 'co2',
    name: 'Carbon Dioxide Formation',
    description: 'C + O + O → CO₂'
  },
  {
    id: 'co',
    inputs: ['c', 'o'],
    output: 'co',
    name: 'Carbon Monoxide Formation',
    description: 'C + O → CO'
  },
  {
    id: 'hcl',
    inputs: ['h', 'cl'],
    output: 'hcl',
    name: 'Hydrochloric Acid Formation',
    description: 'H + Cl → HCl'
  },
  {
    id: 'cao',
    inputs: ['ca', 'o'],
    output: 'cao',
    name: 'Quicklime Formation',
    description: 'Ca + O → CaO'
  },
  {
    id: 'mgo',
    inputs: ['mg', 'o'],
    output: 'mgo',
    name: 'Magnesium Oxide Formation',
    description: 'Mg + O → MgO'
  },
  {
    id: 'k2o',
    inputs: ['k', 'k', 'o'],
    output: 'k2o',
    name: 'Potassium Oxide Formation',
    description: '2K + O → K₂O'
  },
  {
    id: 'naoh',
    inputs: ['na', 'h2o'],
    output: 'naoh',
    name: 'Sodium Hydroxide Formation',
    description: 'Na + H₂O → NaOH + H'
  },
  {
    id: 'koh',
    inputs: ['k', 'h2o'],
    output: 'koh',
    name: 'Potassium Hydroxide Formation',
    description: 'K + H₂O → KOH + H'
  },
  {
    id: 'mgoh2',
    inputs: ['mg', 'h2o', 'h2o'],
    output: 'mgoh2',
    name: 'Magnesium Hydroxide Formation',
    description: 'Mg + 2H₂O → Mg(OH)₂ + H₂'
  },
  {
    id: 'kcl',
    inputs: ['k', 'cl'],
    output: 'kcl',
    name: 'Potassium Chloride Formation',
    description: 'K + Cl → KCl'
  },
  {
    id: 'mgcl2',
    inputs: ['mg', 'cl', 'cl'],
    output: 'mgcl2',
    name: 'Magnesium Chloride Formation',
    description: 'Mg + 2Cl → MgCl₂'
  },
  {
    id: 'cacl2',
    inputs: ['ca', 'cl', 'cl'],
    output: 'cacl2',
    name: 'Calcium Chloride Formation',
    description: 'Ca + 2Cl → CaCl₂'
  },
  {
    id: 'nh3',
    inputs: ['n', 'h', 'h', 'h'],
    output: 'nh3',
    name: 'Ammonia Synthesis',
    description: 'N + 3H → NH₃'
  },
  {
    id: 'ch4',
    inputs: ['c', 'h', 'h', 'h', 'h'],
    output: 'ch4',
    name: 'Methane Formation',
    description: 'C + 4H → CH₄'
  },
  {
    id: 'so2',
    inputs: ['s', 'o', 'o'],
    output: 'so2',
    name: 'Sulfur Dioxide Formation',
    description: 'S + 2O → SO₂'
  },
  {
    id: 'so3',
    inputs: ['so2', 'o'],
    output: 'so3',
    name: 'Sulfur Trioxide Formation',
    description: 'SO₂ + O → SO₃'
  },
  {
    id: 'no',
    inputs: ['n', 'o'],
    output: 'no',
    name: 'Nitrogen Oxide Formation',
    description: 'N + O → NO'
  },
  {
    id: 'p2o5',
    inputs: ['p', 'p', 'o', 'o', 'o', 'o', 'o'],
    output: 'p2o5',
    name: 'Phosphorus Pentoxide Formation',
    description: '2P + 5O → P₂O₅'
  },
  {
    id: 'h2so4',
    inputs: ['so3', 'h2o'],
    output: 'h2so4',
    name: 'Sulfuric Acid Formation',
    description: 'SO₃ + H₂O → H₂SO₄'
  },
  {
    id: 'hno3',
    inputs: ['no', 'h2o', 'o'],
    output: 'hno3',
    name: 'Nitric Acid Formation',
    description: 'NO + H₂O + O → HNO₃'
  },
  {
    id: 'h3po4',
    inputs: ['p2o5', 'h2o', 'h2o', 'h2o'],
    output: 'h3po4',
    name: 'Phosphoric Acid Formation',
    description: 'P₂O₅ + 3H₂O → 2H₃PO₄'
  },
  {
    id: 'h2co3',
    inputs: ['co2', 'h2o'],
    output: 'h2co3',
    name: 'Carbonic Acid Formation',
    description: 'CO₂ + H₂O → H₂CO₃'
  },
  {
    id: 'na2co3',
    inputs: ['h2co3', 'naoh', 'naoh'],
    output: 'na2co3',
    name: 'Sodium Carbonate Formation',
    description: 'H₂CO₃ + 2NaOH → Na₂CO₃ + 2H₂O'
  },
  {
    id: 'c2h2',
    inputs: ['co', 'h', 'h'],
    output: 'c2h2',
    name: 'Acetylene Formation',
    description: 'CO + 2H → C₂H₂'
  },
  {
    id: 'c2h4',
    inputs: ['c2h2', 'h', 'h'],
    output: 'c2h4',
    name: 'Ethylene Formation',
    description: 'C₂H₂ + 2H → C₂H₄'
  },
  {
    id: 'c2h6o',
    inputs: ['c2h4', 'h2o'],
    output: 'c2h6o',
    name: 'Ethanol Formation',
    description: 'C₂H₄ + H₂O → C₂H₆O'
  },
  {
    id: 'c6h12o6',
    inputs: ['co2', 'co2', 'co2', 'co2', 'co2', 'co2', 'h2o', 'h2o', 'h2o', 'h2o', 'h2o', 'h2o'],
    output: 'c6h12o6',
    name: 'Glucose Synthesis (Photosynthesis)',
    description: '6CO₂ + 6H₂O → C₆H₁₂O₆ + 6O₂'
  }
];

export const achievements: Achievement[] = [
  {
    id: 'first_discovery',
    name: 'First Discovery',
    description: 'Discover your first compound',
    requirement: 'Discover 1 compound',
    points: 10,
    icon: '🔬'
  },
  {
    id: 'element_master',
    name: 'Element Master',
    description: 'Discover all basic elements',
    requirement: 'Discover all 11 elements',
    points: 50,
    icon: '⚛️'
  },
  {
    id: 'acid_master',
    name: 'Acid Master',
    description: 'Discover all acids',
    requirement: 'Discover all 5 acid compounds',
    points: 100,
    icon: '🧪'
  },
  {
    id: 'base_master',
    name: 'Base Master',
    description: 'Discover all bases',
    requirement: 'Discover all 5 base compounds',
    points: 100,
    icon: '🧼'
  },
  {
    id: 'salt_master',
    name: 'Salt Master',
    description: 'Discover all salts',
    requirement: 'Discover all 6 salt compounds',
    points: 100,
    icon: '🧂'
  },
  {
    id: 'organic_master',
    name: 'Organic Master',
    description: 'Discover all organic compounds',
    requirement: 'Discover all 6 organic compounds',
    points: 150,
    icon: '🧬'
  },
  {
    id: 'gas_master',
    name: 'Gas Master',
    description: 'Discover all gases',
    requirement: 'Discover all 6 gas compounds',
    points: 100,
    icon: '💨'
  },
  {
    id: 'reaction_novice',
    name: 'Reaction Novice',
    description: 'Complete 5 successful reactions',
    requirement: 'Complete 5 reactions',
    points: 50,
    icon: '⚗️'
  },
  {
    id: 'reaction_expert',
    name: 'Reaction Expert',
    description: 'Complete 15 successful reactions',
    requirement: 'Complete 15 reactions',
    points: 150,
    icon: '🔥'
  },
  {
    id: 'reaction_master',
    name: 'Reaction Master',
    description: 'Complete all reactions in the lab',
    requirement: 'Complete all 29 reactions',
    points: 300,
    icon: '💫'
  },
  {
    id: 'compound_collector',
    name: 'Compound Collector',
    description: 'Discover all compounds',
    requirement: 'Discover all compounds',
    points: 500,
    icon: '🏆'
  },
  {
    id: 'chemistry_legend',
    name: 'Chemistry Legend',
    description: 'Master of all chemistry achievements',
    requirement: 'Unlock all other achievements',
    points: 1000,
    icon: '👑'
  }
];