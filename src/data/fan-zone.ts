import type { QuizQuestion } from '../types';

export const FAN_QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 1,
    prompt: 'Cuando empieza el fin de semana, ¿cuál es tu plan ideal?',
    options: [
      { text: 'Salir de compras o a un brunch luminoso con amigos', trait: 'Energía radiante y carisma pop', memberId: 'nayeon' },
      { text: 'Quedarme en casa viendo maratones de series y películas acogedoras', trait: 'Introvertida cálida y observadora', memberId: 'mina' },
      { text: 'Aprender una nueva coreografía o ir a una clase de baile intenso', trait: 'Pasión por la danza y disciplina férrea', memberId: 'momo' },
      { text: 'Cocinar o liderar una reunión familiar cuidando cada detalle', trait: 'Liderazgo protector y espíritu maternal', memberId: 'jihyo' },
    ],
  },
  {
    id: 2,
    prompt: '¿Qué género musical resuena más con tu estado de ánimo diario?',
    options: [
      { text: 'Synthwave retro de los 80 con líneas de bajo magnéticas', trait: 'Sofisticación y misterio nocturno', memberId: 'chaeyoung' },
      { text: 'Baladas vocales profundas con cuerdas orquestales', trait: 'Sensibilidad y calma serena', memberId: 'tzuyu' },
      { text: 'Bubblegum pop explosivo que levanta el ánimo al instante', trait: 'Chispa alegre y ternura natural', memberId: 'sana' },
      { text: 'City pop o rock alternativo con toques melancólicos', trait: 'Independencia y carisma auténtico', memberId: 'jeongyeon' },
    ],
  },
  {
    id: 3,
    prompt: 'Si pudieras elegir tu superpoder en el universo TWICE, ¿cuál sería?',
    options: [
      { text: 'Controlar el tiempo para revivir los momentos más hermosos', trait: 'Nostalgia y conexión profunda', memberId: 'dahyun' },
      { text: 'Invisibilidad para moverme con elegancia sin ser descubierta', trait: 'Misterio y gracia etérea', memberId: 'mina' },
      { text: 'Telequinesis para ordenar todo a mi alrededor sin esfuerzo', trait: 'Pragmatismo y humor espontáneo', memberId: 'jeongyeon' },
      { text: 'Un rayo de energía que contagie risa a quien lo reciba', trait: 'Alegría magnética inagotable', memberId: 'sana' },
    ],
  },
  {
    id: 4,
    prompt: '¿Qué estética visual define mejor tu estilo personal?',
    options: [
      { text: 'Elegancia minimalista en blanco y negro con detalles dorados', trait: 'Clasicismo y distinción visual', memberId: 'tzuyu' },
      { text: 'Y2K urbano con colores neón, transparencias y accesorios pop', trait: 'Creatividad audaz y vanguardia', memberId: 'chaeyoung' },
      { text: 'Tonos pastel románticos, tejidos suaves y encanto vintage', trait: 'Dulzura icónica y luminosidad', memberId: 'nayeon' },
      { text: 'Sporty chic elegante, cómodo pero con presencia arrolladora', trait: 'Fuerza escénica e intensidad', memberId: 'jihyo' },
    ],
  },
  {
    id: 5,
    prompt: '¿Qué frase define mejor tu filosofía de vida?',
    options: [
      { text: 'One in a million: cada uno de nosotros brilla con luz única.', trait: 'Inclusividad y orgullo de ser tú misma', memberId: 'dahyun' },
      { text: 'Bailar hasta que el cuerpo recuerde lo que las palabras olvidan.', trait: 'Perseverancia y expresión pura', memberId: 'momo' },
      { text: 'El esfuerzo constante es la verdadera magia de cualquier sueño.', trait: 'Constancia inquebrantable', memberId: 'jihyo' },
      { text: 'La belleza de los detalles sencillos supera cualquier exceso.', trait: 'Quiet luxury y paz interior', memberId: 'mina' },
    ],
  },
];
