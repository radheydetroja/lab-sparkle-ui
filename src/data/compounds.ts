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
    id: 'naoh',
    inputs: ['na', 'h2o'],
    output: 'naoh',
    name: 'Sodium Hydroxide Formation',
    description: 'Na + H₂O → NaOH + H'
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
    id: 'h2so4',
    inputs: ['so3', 'h2o'],
    output: 'h2so4',
    name: 'Sulfuric Acid Formation',
    description: 'SO₃ + H₂O → H₂SO₄'
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
    id: 'c2h4',
    inputs: ['c', 'c', 'h', 'h', 'h', 'h'],
    output: 'c2h4',
    name: 'Ethylene Formation',
    description: 'Advanced organic synthesis'
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
    requirement: 'Discover all 8 elements',
    points: 50,
    icon: '⚛️'
  },
  {
    id: 'acid_master',
    name: 'Acid Master',
    description: 'Discover all acids',
    requirement: 'Discover all acid compounds',
    points: 75,
    icon: '🧪'
  },
  {
    id: 'reaction_expert',
    name: 'Reaction Expert',
    description: 'Complete 10 successful reactions',
    requirement: 'Complete 10 reactions',
    points: 100,
    icon: '⚗️'
  },
  {
    id: 'compound_collector',
    name: 'Compound Collector',
    description: 'Discover all compounds',
    requirement: 'Discover all compounds',
    points: 200,
    icon: '🏆'
  }
];