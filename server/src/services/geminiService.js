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
 * Genera un desafío técnico de active recall según el tema y su tipo.
 *
 * @param {Object} topic
 * @param {string} topic.title - Nombre del tema (ej. 'Node.js Event Loop', 'React Re-renders')
 * @param {string} topic.type - 'theory' o 'practice'
 * @param {string} [topic.category='hard_skill']
 * @returns {Promise<string>} Texto del desafío técnico
 */
export async function generateHardSkillChallenge(topic) {
  const isTheory = topic.type === 'theory';

  const systemInstruction = isTheory
    ? `Eres un Staff Software Engineer y entrevistador técnico implacable para roles Fullstack Senior.
Tu objetivo es formular un reto de Active Recall conceptual profundo sobre "${topic.title}".
REGLAS ESTRICTAS:
- NO hagas preguntas de memoria básica, definiciones de diccionario ni sintaxis trivial.
- Formula una pregunta incisiva sobre arquitectura interna, protocolos, concurrencia, gestión de memoria, orden de fases de ejecución o análisis crítico de trade-offs.
- Plantea un dilema técnico que obligue al candidato a justificar el "por qué" y explicar qué sucede bajo el capó.
- Sé conciso, directo y desafiante (máximo 2 párrafos).`
    : `Eres un Staff Software Engineer y entrevistador técnico implacable para roles Fullstack Senior.
Tu objetivo es plantear un escenario de ingeniería realista y desafiante sobre "${topic.title}".
REGLAS ESTRICTAS:
- NO plantees un ejercicio de algoritmos de juguete ni sintaxis de tutorial.
- Plantea un escenario real de producción: cuello de botella de rendimiento, diseño de arquitectura de componentes React, optimización de queries/índices en MongoDB, o gestión de flujos asíncronos y backpressure en Node.js.
- Exige que el candidato plantee o escriba la solución técnica explicando sus trade-offs (latencia vs memoria, legibilidad vs complejidad, consistencia vs disponibilidad).
- Sé directo, específico y desafiante (máximo 2 o 3 párrafos).`;

  const prompt = `Tema: ${topic.title}
Tipo: ${topic.type}
Genera el desafío técnico ahora:`;

  const client = getClient();
  if (!client) {
    // Modo offline / fallback determinista en ausencia de API Key
    return isTheory
      ? `[Desafío Teórico - ${topic.title}]: Explica detalladamente los trade-offs de arquitectura interna, concurrencia y comportamiento bajo alta carga asociados a "${topic.title}". ¿Qué sucede bajo el capó y qué consecuencias tiene en producción tomar la decisión equivocada? Justifica tu razonamiento.`
      : `[Desafío Práctico - ${topic.title}]: En un sistema con alto tráfico que experimenta degradación de rendimiento y consumo excesivo de recursos con "${topic.title}", ¿cómo diseñarías o refactorizarías la solución para resolver el cuello de botella? Especifica código o arquitectura y analiza los trade-offs involucrados.`;
  }

  const response = await client.models.generateContent({
    model: DEFAULT_MODEL,
    contents: prompt,
    config: {
      systemInstruction,
      temperature: 0.4,
    },
  });

  return (response.text || '').trim();
}

/**
 * Evalúa la solución técnica del usuario con criterio de Senior Evaluator.
 *
 * @param {Object} params
 * @param {Object} params.topic - Objeto del tópico
 * @param {string} params.challenge - Texto del desafío presentado
 * @param {string} params.userSolution - Respuesta o código redactado por el usuario
 * @returns {Promise<{ score: number, feedback: string, missingTradeoffs: string[], strengths: string[] }>}
 */
export async function evaluateHardSkillSolution({ topic, challenge, userSolution }) {
  if (!userSolution || !userSolution.trim()) {
    return {
      score: 1,
      feedback: 'No se proporcionó ninguna solución técnica para evaluar.',
      missingTradeoffs: ['No se presentó análisis ni justificación técnica.'],
      strengths: [],
    };
  }

  const systemInstruction = `Eres un Evaluador Técnico Principal / Staff Engineer evaluando a un aspirante Fullstack Senior.
Tu tono es directo, profesional, riguroso y sin condescendencia.

CRITERIOS DE CALIFICACIÓN (Escala 1 a 5):
- Score 1: Respuesta incorrecta, superficial, confunde conceptos clave o evasiva.
- Score 2: Respuesta con noción vaga pero plagada de imprecisiones técnicas graves o falta total de fundamentación interna.
- Score 3: Respuesta funcional correcta básica, pero sin análisis de trade-offs, sin contemplar casos de borde ni cómo escala.
- Score 4: Respuesta sólida, demuestra entendimiento profundo de la arquitectura interna y menciona trade-offs esenciales con claridad.
- Score 5: Respuesta sobresaliente de nivel Staff/Principal Engineer: justificación precisa del "por qué", análisis cuantitativo/cualitativo de trade-offs, impacto en producción y claridad ejemplar.

DEBES RESPONDER EXCLUSIVAMENTE CON UN OBJETO JSON VÁLIDO (sin bloques de markdown adicionales ni texto previo o posterior) con la siguiente estructura exacta:
{
  "score": <número entero entre 1 y 5>,
  "feedback": "<análisis técnico directo y conciso explicando aciertos y debilidades>",
  "missingTradeoffs": ["<tradeoff o punto ciego no considerado>", "<otro si aplica>"],
  "strengths": ["<fortaleza técnica destacable identificada>", "<otra si aplica>"]
}`;

  const prompt = `TEMA: ${topic?.title || 'General'}
TIPO: ${topic?.type || 'practice'}
DESAFÍO PLANTEADO:
${challenge}

SOLUCIÓN PROPUESTA POR EL CANDIDATO:
${userSolution}

Evalúa la respuesta y devuelve el JSON estricto:`;

  const client = getClient();
  if (!client) {
    // Fallback heurístico offline para entornos sin GEMINI_API_KEY
    const wordCount = userSolution.trim().split(/\s+/).length;
    const hasTradeoffs = /trade-off|tradeoff|desventaja|ventaja|latencia|memoria|rendimiento|concurrencia|escalab/i.test(userSolution);

    let score = 3;
    if (wordCount < 15) {
      score = 2;
    } else if (hasTradeoffs && wordCount > 40) {
      score = 4;
    }

    return {
      score,
      feedback: hasTradeoffs
        ? 'Respuesta estructurada que identifica trade-offs clave de la solución propuesta.'
        : 'Solución comprensible pero carece de un análisis profundo de trade-offs e impacto en producción.',
      missingTradeoffs: hasTradeoffs ? [] : ['Análisis de degradación bajo alta carga o límites de memoria'],
      strengths: ['Comprensión inicial de la problemática planteada'],
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
      score: Math.max(1, Math.min(5, Math.round(Number(parsed.score) || 3))),
      feedback: String(parsed.feedback || 'Evaluación completada.'),
      missingTradeoffs: Array.isArray(parsed.missingTradeoffs) ? parsed.missingTradeoffs : [],
      strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
    };
  } catch {
    // Si la respuesta no es JSON válido directamente, extraer bloque JSON si viene envuelto
    const match = text.match(/\{[\s\S]*\}/);
    if (match) {
      try {
        const parsed = JSON.parse(match[0]);
        return {
          score: Math.max(1, Math.min(5, Math.round(Number(parsed.score) || 3))),
          feedback: String(parsed.feedback || 'Evaluación completada.'),
          missingTradeoffs: Array.isArray(parsed.missingTradeoffs) ? parsed.missingTradeoffs : [],
          strengths: Array.isArray(parsed.strengths) ? parsed.strengths : [],
        };
      } catch {
        // Fallback si falló el parseo
      }
    }

    return {
      score: 3,
      feedback: text || 'Evaluación procesada con formato libre.',
      missingTradeoffs: ['Formato de salida no estructurado'],
      strengths: [],
    };
  }
}
