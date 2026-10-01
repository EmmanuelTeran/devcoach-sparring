import { GoogleGenAI } from '@google/genai';

const DEFAULT_MODEL = 'gemini-2.5-flash';

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
}

/**
 * Roles arquetípicos de sparring para consultoría técnica
 */
export const SPARRING_ROLES = [
  {
    roleId: 'demanding_pm',
    roleName: 'Product Manager orientado a Costos & Deadlines',
    avatar: '💼',
    attitude: 'Impaciente, preocupado por los plazos de entrega y costos en la nube. Quiere recortar tiempo a cualquier costo.',
  },
  {
    roleId: 'skeptical_tech_lead',
    roleName: 'Tech Lead Escéptico & Purista',
    avatar: '🛡️',
    attitude: 'Desconfía de la complejidad accidental, exige garantías de alta disponibilidad y cuestiona cualquier dependencia externa.',
  },
  {
    roleId: 'non_technical_client',
    roleName: 'Director de Negocio / Cliente No Técnico',
    avatar: '👔',
    attitude: 'Le interesan las ventas, los clientes finales y no entiende de infraestructura técnica. Pregunta por qué no usar lo más barato e inmediato.',
  },
];

/**
 * Inicia el escenario de consultoría conflictivo para un topic dado.
 *
 * @param {Object} topic - Mongoose topic doc o datos del tema
 * @returns {Promise<{ role: string, avatar: string, scenario: string, initialQuestion: string }>}
 */
export async function startSoftSkillSparring(topic) {
  // Seleccionar un rol apropiado
  const selectedRole = SPARRING_ROLES[Math.floor(Math.random() * SPARRING_ROLES.length)];

  const systemInstruction = `Eres un actor de rol simulando a un stakeholder en una consultoría técnica de software.
Tu personaje actual: "${selectedRole.roleName}" (${selectedRole.attitude}).
El tema técnico en discusión es: "${topic.title}".

OBJETIVO:
Plantea un dilema o exigencia conflictiva y realista de negocio o proyecto relacionada con "${topic.title}".
Por ejemplo:
- Exigir una fecha de entrega imposible salteándose pruebas o mitigación de fallos.
- Exigir usar una base de datos o arquitectura inadecuada por ser más barata o "porque la leí en internet".
- Presionar para ignorar la latencia o la consistencia eventual para salir ya a producción.

REGLAS:
- Mantén el personaje en todo momento.
- Plantea el contexto en 1 o 2 oraciones, seguido de tu pregunta o reclamo directo y desafiante.
- Sé asertivo, incisivo y escéptico.
- Devuelve la respuesta en formato JSON estricto con:
{
  "scenario": "<breve descripción del contexto del conflicto>",
  "initialQuestion": "<tu pregunta o planteo desafiante>"
}`;

  const prompt = `Tema: ${topic.title}
Tipo: ${topic.type}
Rol asumido: ${selectedRole.roleName}

Genera el escenario inicial y tu primera pregunta:`;

  const client = getClient();
  if (!client) {
    return {
      role: selectedRole.roleName,
      avatar: selectedRole.avatar,
      scenario: `El cliente necesita lanzar la funcionalidad asociada a "${topic.title}" esta misma semana y cuestiona la arquitectura propuesta por considerarla excesivamente cara y lenta de implementar.`,
      initialQuestion: `No entiendo por qué planteas tanta infraestructura para "${topic.title}". ¿Por qué no usamos la solución más barata e inmediata y salimos a producción mañana sin tantas complicaciones?`,
    };
  }

  try {
    const response = await client.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.6,
        responseMimeType: 'application/json',
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return {
      role: selectedRole.roleName,
      avatar: selectedRole.avatar,
      scenario: parsed.scenario || `Conflicto sobre ${topic.title}`,
      initialQuestion:
        parsed.initialQuestion ||
        `¿Por qué debemos invertir tanto tiempo y dinero en ${topic.title} cuando podríamos lanzar una solución rápida?`,
    };
  } catch (error) {
    console.error('Error starting soft skill sparring with Gemini:', error);
    return {
      role: selectedRole.roleName,
      avatar: selectedRole.avatar,
      scenario: `El cliente cuestiona la viabilidad de la propuesta técnica de ${topic.title}.`,
      initialQuestion: `¿Qué garantías de negocio y estabilidad me das para convencerme de no recortar el alcance de ${topic.title}?`,
    };
  }
}

/**
 * Procesa la respuesta del usuario en el sparring (turno intermedio o veredicto final).
 *
 * @param {Object} params
 * @param {Object} params.topic - Tópico evaluado
 * @param {Array<{ speaker: string, text: string }>} params.conversationHistory - Historial de mensajes
 * @param {string} params.userAudioTranscript - Transcripción del mensaje del usuario
 * @param {string} [params.role] - Rol activo del stakeholder
 * @returns {Promise<{ isFinalTurn: boolean, reply?: string, role?: string, evaluation?: { score: number, feedback: string, businessClarity: string, tradeOffDefense: string, assertivenessScore: number, missingTradeoffs: string[], strengths: string[] } }>}
 */
export async function replySoftSkillSparring({
  topic,
  conversationHistory = [],
  userAudioTranscript,
  role = 'Stakeholder del Cliente',
}) {
  const userTurnsCount = conversationHistory.filter((m) => m.speaker === 'user').length + 1;
  const isFinalTurn = userTurnsCount >= 3;

  const client = getClient();

  if (!isFinalTurn) {
    // Turno intermedio (turno 1 o 2 de usuario): Réplica escéptica del stakeholder
    const systemInstruction = `Eres un stakeholder escéptico ("${role}") discutiendo la decisión técnica de "${topic?.title || 'Arquitectura'}".
Estás interactuando con un Ingeniero de Software que intenta convencerte.
Tu objetivo es cuestionar su respuesta previa con escepticismo técnico o financiero ("¿Y si falla?", "¿Por qué no otra alternativa más económica?", "¿Cómo justificas los tiempos ante la dirección?").
REGLAS:
- Responde en 2 a 4 oraciones concisas en primera persona manteniendo tu rol.
- Sé incisivo, busca huecos en su razonamiento o presiona sobre los trade-offs que no haya justificado con métricas o impacto de negocio.`;

    const formattedHistory = conversationHistory
      .map((m) => `${m.speaker === 'user' ? 'Ingeniero' : role}: ${m.text}`)
      .join('\n');

    const prompt = `Historial de la conversación:
${formattedHistory}
Ingeniero (última respuesta por voz): ${userAudioTranscript}

Responde como ${role} con una contrapregunta escéptica:`;

    if (!client) {
      return {
        isFinalTurn: false,
        role,
        reply: `Entiendo lo que dices sobre la arquitectura, pero sigues sin aclararme qué pasa si la demanda se triplica el próximo mes. ¿Qué garantías de costo y disponibilidad real me das frente a una solución más simple?`,
      };
    }

    const response = await client.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        systemInstruction,
        temperature: 0.7,
      },
    });

    return {
      isFinalTurn: false,
      role,
      reply: (response.text || '').trim(),
    };
  }

  // Turno final (3er turno de usuario): Evaluación formal y veredicto
  const systemInstruction = `Eres un Evaluador Senior de Habilidades de Consultoría Técnica, Comunicación y Liderazgo de Ingeniería.
Acabas de presenciar un sparring de consultoría técnica entre un Ingeniero y un Stakeholder ("${role}") sobre "${topic?.title || 'Arquitectura'}".

EVALÚA AL INGENIERO EN ESTAS 3 DIMENSIONES:
1. Claridad de Negocio (Business Clarity): ¿Explicó el impacto en ROI, costos, riesgos o usuarios finales sin caer en jerga incomprensible?
2. Defensa de Trade-Offs (Trade-Off Defense): ¿Justificó con honestidad qué se sacrifica (latencia, costo, tiempo, complejidad) y por qué vale la pena?
3. Asertividad y Manejo de Presión (Assertiveness): ¿Mantuvo la postura técnica con empatía profesional sin someterse a caprichos riesgosos ni ser confrontativo grosero?

CRITERIOS DE SCORE GLOBAL (1 a 5):
- 1: Se doblegó ante el cliente aceptando deuda técnica crítica sin alertar, o fue agresivo/evasivo.
- 2: Explicación puramente técnica abstracta; no conectó con las preocupaciones de negocio del cliente.
- 3: Respuesta decente con argumentos válidos, pero débil en trade-offs o justificación cuantitativa.
- 4: Buena defensa: equilibró necesidades de negocio, explicó riesgos con solvencia y fue asertivo.
- 5: Excelente consultoría Staff/Principal: liderazgo claro, empatía de negocio impecable, trade-offs transparentes y propuesta de solución viable.

DEBES RESPONDER EXCLUSIVAMENTE CON UN OBJETO JSON VÁLIDO con esta estructura exacta:
{
  "score": <número entero de 1 a 5>,
  "feedback": "<síntesis general del desempeño en consultoría>",
  "businessClarity": "<evaluación específica de cómo tradujo la técnica a valor de negocio>",
  "tradeOffDefense": "<evaluación de la defensa y balance de compromisos técnicos>",
  "assertivenessScore": <número entero de 1 a 5>,
  "missingTradeoffs": ["<tradeoff o riesgo que no mencionó>", "<otro si aplica>"],
  "strengths": ["<punto fuerte de su argumentación>", "<otro si aplica>"]
}`;

  const allHistory = [
    ...conversationHistory,
    { speaker: 'user', text: userAudioTranscript },
  ];

  const conversationText = allHistory
    .map((m) => `${m.speaker === 'user' ? 'Ingeniero' : role}: ${m.text}`)
    .join('\n');

  const prompt = `Conversación completa mantenida:
${conversationText}

Emite el veredicto en formato JSON estricto:`;

  if (!client) {
    return {
      isFinalTurn: true,
      role,
      evaluation: {
        score: 4,
        feedback:
          'Defendiste la posición técnica con calma y asertividad. Tradujiste conceptos complejos en beneficios claros de estabilidad y control de costos para el cliente.',
        businessClarity: 'Excelente traducción de métricas técnicas a impacto directo en el negocio.',
        tradeOffDefense: 'Se argumentó correctamente la relación entre tiempo de desarrollo y resiliencia.',
        assertivenessScore: 4,
        missingTradeoffs: ['No se cuantificó el impacto exacto en dólares o SLAs'],
        strengths: ['Firmeza ante la presión de fechas sin ser confrontativo', 'Lenguaje comprensible'],
      },
    };
  }

  const response = await client.models.generateContent({
    model: DEFAULT_MODEL,
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.2,
      responseMimeType: 'application/json',
    },
  });

  const text = (response.text || '').trim();

  try {
    const parsed = JSON.parse(text);
    return {
      isFinalTurn: true,
      role,
      evaluation: {
        score: Math.max(1, Math.min(5, Math.round(Number(parsed.score) || 3))),
        feedback: String(parsed.feedback || 'Evaluación de sparring completada.'),
        businessClarity: String(parsed.businessClarity || 'Nivel de claridad adecuado.'),
        tradeOffDefense: String(parsed.tradeOffDefense || 'Defensa de compromisos evaluada.'),
        assertivenessScore: Math.max(1, Math.min(5, Math.round(Number(parsed.assertivenessScore) || 3))),
        missingTradeoffs: Array.isArray(parsed.missingTradeoffs) ? parsed.missingTradeoffs : [],
        strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
      },
    };
  } catch {
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        return {
          isFinalTurn: true,
          role,
          evaluation: {
            score: Math.max(1, Math.min(5, Math.round(Number(parsed.score) || 3))),
            feedback: String(parsed.feedback || 'Evaluación de sparring completada.'),
            businessClarity: String(parsed.businessClarity || 'Nivel de claridad adecuado.'),
            tradeOffDefense: String(parsed.tradeOffDefense || 'Defensa de compromisos evaluada.'),
            assertivenessScore: Math.max(1, Math.min(5, Math.round(Number(parsed.assertivenessScore) || 3))),
            missingTradeoffs: Array.isArray(parsed.missingTradeoffs) ? parsed.missingTradeoffs : [],
            strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
          },
        };
      } catch {
        // Fallback
      }
    }

    return {
      isFinalTurn: true,
      role,
      evaluation: {
        score: 3,
        feedback: text || 'Veredicto generado.',
        businessClarity: 'Comunicación funcional con áreas de oportunidad.',
        tradeOffDefense: 'Mención de compromisos aceptable.',
        assertivenessScore: 3,
        missingTradeoffs: [],
        strengths: [],
      },
    };
  }
}
