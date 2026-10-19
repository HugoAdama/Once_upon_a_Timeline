export interface KillingPart {
  id: string;
  phrase: string;
  member: string;
  song: string;
  releaseTitle: string;
  note: string;
  searchQuery: string;
}

export const KILLING_PARTS: KillingPart[] = [
  {
    id: 'kp-shy-shy-shy',
    phrase: 'Shy Shy Shy',
    member: 'Sana',
    song: 'CHEER UP',
    releaseTitle: 'PAGE TWO',
    note: 'El fenómeno cultural que viralizó a TWICE en toda Asia y el mundo.',
    searchQuery: 'CHEER UP',
  },
  {
    id: 'kp-risky-wiggy',
    phrase: 'Risky risky wiggy wiggy',
    member: 'Chaeyoung',
    song: "I CAN'T STOP ME",
    releaseTitle: 'Eyes wide open',
    note: 'El verso de rap retro-synthwave más icónico de la era Eyes Wide Open.',
    searchQuery: "I CAN'T STOP ME",
  },
  {
    id: 'kp-fancy-you',
    phrase: 'Fancy You!',
    member: 'TWICE',
    song: 'FANCY',
    releaseTitle: 'FANCY YOU',
    note: 'El punto de inflexión sonoro y estilístico hacia un concepto glam electropop.',
    searchQuery: 'FANCY',
  },
  {
    id: 'kp-bb-cream',
    phrase: 'BB Cream papapa',
    member: 'TWICE',
    song: 'LIKEY',
    releaseTitle: 'twicetagram',
    note: 'El himno pop de las redes sociales y el dance break legendario de Momo.',
    searchQuery: 'LIKEY',
  },
  {
    id: 'kp-ring-a-ling',
    phrase: 'Ring a ling, ding dong',
    member: 'Momo & Chaeyoung',
    song: 'Feel Special',
    releaseTitle: 'Feel Special',
    note: 'El emotivo himno de resiliencia y amor dedicado entre las 9 integrantes.',
    searchQuery: 'Feel Special',
  },
  {
    id: 'kp-oh-boy',
    phrase: 'Oh boy, I know I know',
    member: 'Nayeon',
    song: 'The Feels',
    releaseTitle: 'The Feels',
    note: 'El primer sencillo oficial íntegramente en inglés que conquistó Billboard Hot 100.',
    searchQuery: 'The Feels',
  },
  {
    id: 'kp-na-na-na',
    phrase: "Just like TT (I'm like TT)",
    member: 'TWICE',
    song: 'TT',
    releaseTitle: 'TWICEcoaster : LANE 1',
    note: 'La pose con los dedos en forma de lágrimas más imitada del pop mundial.',
    searchQuery: 'TT',
  },
  {
    id: 'kp-21-29',
    phrase: '21:29 (Para ONCE)',
    member: 'TWICE (Letra de las 9)',
    song: '21:29',
    releaseTitle: 'Feel Special',
    note: 'La carta de amor en forma de canción escrita conjuntamente por las nueve integrantes.',
    searchQuery: '21:29',
  },
];
