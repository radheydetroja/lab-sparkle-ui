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
  {
    id: 'h',
    name: 'Hydrogen',
    symbol: 'H',
    category: 'Element',
    rarity: 'common',
    description: 'The lightest and most abundant element in the universe',
    mw: '1.008g/mol',
    points: 5,
    uses: ['Fuel cells', 'Ammonia production', 'Rocket fuel'],
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
    points: 5,
    uses: ['Breathing', 'Combustion', 'Steel production'],
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
    points: 5,
    uses: ['Organic chemistry', 'Diamond formation', 'Steel production'],
    discovered: true
  },
  {
    id: 'na',
    name: 'Sodium',
    symbol: 'Na',
    category: 'Element',
    rarity: 'common',
    description: 'Highly reactive alkali metal',
    mw: '22.990g/mol',
    points: 10,
    uses: ['Salt production', 'Soap making', 'Lighting'],
    discovered: true
  },
  {
    id: 'cl',
    name: 'Chlorine',
    symbol: 'Cl',
    category: 'Element',
    rarity: 'common',
    description: 'Toxic gas used in disinfection',
    mw: '35.453g/mol',
    points: 10,
    uses: ['Water purification', 'Bleach', 'PVC production'],
    discovered: true
  },
  {
    id: 's',
    name: 'Sulfur',
    symbol: 'S',
    category: 'Element',
    rarity: 'common',
    description: 'Yellow element essential for proteins',
    mw: '32.065g/mol',
    points: 10,
    uses: ['Sulfuric acid', 'Vulcanizing rubber', 'Gunpowder'],
    discovered: true
  },
  {
    id: 'n',
    name: 'Nitrogen',
    symbol: 'N',
    category: 'Element',
    rarity: 'common',
    description: 'Inert gas making up 78% of air',
    mw: '14.007g/mol',
    points: 10,
    uses: ['Fertilizers', 'Explosives', 'Food preservation'],
    discovered: true
  },
  {
    id: 'ca',
    name: 'Calcium',
    symbol: 'Ca',
    category: 'Element',
    rarity: 'common',
    description: 'Essential for bones and teeth',
    mw: '40.078g/mol',
    points: 10,
    uses: ['Bone formation', 'Cement', 'Steel production'],
    discovered: true
  },
  {
    id: 'h2o',
    name: 'Water',
    symbol: 'H₂O',
    category: 'Compound',
    rarity: 'common',
    description: 'Essential for all life',
    mw: '18.015g/mol',
    points: 15,
    uses: ['Drinking', 'Solvent', 'Chemical reactions'],
    discovered: false,
    synthesisHint: 'Combine 2H + O'
  },
  {
    id: 'nacl',
    name: 'Sodium Chloride',
    symbol: 'NaCl',
    category: 'Compound',
    rarity: 'common',
    description: 'Common table salt',
    mw: '58.443g/mol',
    points: 20,
    uses: ['Food seasoning', 'De-icing', 'Chemical production'],
    discovered: false,
    synthesisHint: 'Combine Na + Cl'
  },
  {
    id: 'co2',
    name: 'Carbon Dioxide',
    symbol: 'CO₂',
    category: 'Compound',
    rarity: 'common',
    description: 'Greenhouse gas and product of respiration',
    mw: '44.010g/mol',
    points: 20,
    uses: ['Photosynthesis', 'Fire extinguishers', 'Dry ice'],
    discovered: false,
    synthesisHint: 'Combine C + 2O'
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
    synthesisHint: 'Combine H + Cl'
  },
  {
    id: 'cao',
    name: 'Calcium Oxide',
    symbol: 'CaO',
    category: 'Base',
    rarity: 'uncommon',
    description: 'Quicklime, highly reactive base',
    mw: '56.077g/mol',
    points: 25,
    uses: ['Cement production', 'Steel making', 'Water treatment'],
    discovered: false,
    synthesisHint: 'Combine Ca + O'
  },
  {
    id: 'h2so4',
    name: 'Sulfuric Acid',
    symbol: 'H₂SO₄',
    category: 'Acid',
    rarity: 'rare',
    description: 'King of chemicals, highly corrosive',
    mw: '98.079g/mol',
    points: 50,
    uses: ['Battery acid', 'Chemical synthesis', 'Metal processing'],
    discovered: false,
    synthesisHint: 'Advanced synthesis required'
  }
];

export const reactions: Reaction[] = [
  {
    id: 'water',
    inputs: ['h', 'h', 'o'],
    output: 'h2o',
    name: 'Water Formation',
    description: 'Combine hydrogen and oxygen to form water'
  },
  {
    id: 'salt',
    inputs: ['na', 'cl'],
    output: 'nacl',
    name: 'Salt Formation',
    description: 'Combine sodium and chlorine to form salt'
  },
  {
    id: 'co2',
    inputs: ['c', 'o', 'o'],
    output: 'co2',
    name: 'Carbon Dioxide Formation',
    description: 'Combine carbon and oxygen to form CO₂'
  },
  {
    id: 'hcl',
    inputs: ['h', 'cl'],
    output: 'hcl',
    name: 'Hydrochloric Acid Formation',
    description: 'Combine hydrogen and chlorine to form HCl'
  },
  {
    id: 'cao',
    inputs: ['ca', 'o'],
    output: 'cao',
    name: 'Quicklime Formation',
    description: 'Combine calcium and oxygen to form quicklime'
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