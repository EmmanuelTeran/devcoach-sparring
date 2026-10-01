import React, { useState, useEffect } from 'react';
import {
  Brain,
  Sparkles,
  Send,
  Loader2,
  Calendar,
  CheckCircle2,
  AlertTriangle,
  Award,
  RefreshCw,
  Code2,
  FileQuestion,
} from 'lucide-react';

const API_BASE = 'http://localhost:5000/api';

export function HardSkillTrainer() {
  const [topics, setTopics] = useState([]);
  const [selectedTopicId, setSelectedTopicId] = useState('');
  const [loadingTopics, setLoadingTopics] = useState(false);
  const [loadingChallenge, setLoadingChallenge] = useState(false);
  const [challengeData, setChallengeData] = useState(null);
  const [userSolution, setUserSolution] = useState('');
  const [evaluating, setEvaluating] = useState(false);
  const [evaluationResult, setEvaluationResult] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  // Cargar cola de temas pendientes
  const fetchDueTopics = async () => {
    setLoadingTopics(true);
    setErrorMessage('');
    try {
      const res = await fetch(`${API_BASE}/topics/due`);
      if (!res.ok) throw new Error('Error al cargar temas pendientes');
      const data = await res.json();
      setTopics(data);
      if (data.length > 0 && !selectedTopicId) {
        setSelectedTopicId(data[0]._id);
      }
    } catch (err) {
      console.error(err);
      setErrorMessage('No se pudieron obtener temas pendientes. Asegúrate de que el servidor esté activo.');
    } finally {
      setLoadingTopics(false);
    }
  };

  useEffect(() => {
    fetchDueTopics();
  }, []);

  // Generar desafío técnico con Gemini
  const handleGenerateChallenge = async (overrideTopicId) => {
    const topicIdToUse = overrideTopicId || selectedTopicId;
    if (!topicIdToUse) {
      setErrorMessage('Por favor selecciona un tema primero.');
      return;
    }

    setLoadingChallenge(true);
    setErrorMessage('');
    setEvaluationResult(null);
    setUserSolution('');

    try {
      const res = await fetch(`${API_BASE}/practice/hard-skill/generate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topicId: topicIdToUse }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Fallo al generar el desafío.');
      }

      const data = await res.json();
      setChallengeData(data);
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error al conectar con el servicio de IA.');
    } finally {
      setLoadingChallenge(false);
    }
  };

  // Evaluar solución
  const handleEvaluateSolution = async () => {
    if (!challengeData) return;
    if (!userSolution.trim()) {
      setErrorMessage('Escribe tu solución o explicación técnica antes de evaluar.');
      return;
    }

    setEvaluating(true);
    setErrorMessage('');

    try {
      const res = await fetch(`${API_BASE}/practice/hard-skill/evaluate`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          topicId: challengeData.topicId,
          challenge: challengeData.challenge,
          userSolution,
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.error || 'Error al procesar la evaluación.');
      }

      const result = await res.json();
      setEvaluationResult(result);
      // Refrescar lista de temas pendientes
      fetchDueTopics();
    } catch (err) {
      console.error(err);
      setErrorMessage(err.message || 'Error al contactar al evaluador.');
    } finally {
      setEvaluating(false);
    }
  };

  const getScoreBadge = (score) => {
    if (score >= 4) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
          <Award className="w-4 h-4" />
          Score {score}/5 - Nivel Senior Sólido
        </span>
      );
    }
    if (score === 3) {
      return (
        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-amber-500/20 text-amber-400 border border-amber-500/30">
          <AlertTriangle className="w-4 h-4" />
          Score 3/5 - Aprobado con Brechas
        </span>
      );
    }
    return (
      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-semibold bg-rose-500/20 text-rose-400 border border-rose-500/30">
        <AlertTriangle className="w-4 h-4" />
        Score {score}/5 - Requiere Repaso Urgente
      </span>
    );
  };

  return (
    <section className="w-full max-w-4xl mx-auto my-6 text-left" id="hard-skills-section">
      {/* Selector & Barra de Control */}
      <div className="bg-slate-900/80 border border-slate-800 rounded-2xl p-6 shadow-xl backdrop-blur mb-6">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Brain className="w-5 h-5 text-indigo-400" />
              <h2 className="text-xl font-bold text-white tracking-tight">
                Módulo Hard Skills: Active Recall
              </h2>
            </div>
            <p className="text-xs text-slate-400">
              Desafíos técnicos incisivos sobre arquitectura interna, trade-offs y escenarios reales fullstack.
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <select
              id="topic-selector"
              value={selectedTopicId}
              onChange={(e) => setSelectedTopicId(e.target.value)}
              className="bg-slate-800 text-slate-200 text-sm rounded-lg px-3 py-2 border border-slate-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 min-w-[200px]"
            >
              {topics.length === 0 ? (
                <option value="">(Sin temas pendientes en cola)</option>
              ) : (
                topics.map((t) => (
                  <option key={t._id} value={t._id}>
                    {t.title} ({t.type === 'theory' ? 'Teoría' : 'Práctica'})
                  </option>
                ))
              )}
            </select>

            <button
              id="btn-load-priority"
              onClick={() => {
                if (topics.length > 0) {
                  setSelectedTopicId(topics[0]._id);
                  handleGenerateChallenge(topics[0]._id);
                } else {
                  handleGenerateChallenge();
                }
              }}
              disabled={loadingTopics || loadingChallenge}
              className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 disabled:opacity-50 text-white text-sm font-medium px-4 py-2 rounded-lg transition-all shadow-md hover:shadow-indigo-500/25 active:scale-95"
            >
              {loadingChallenge ? (
                <Loader2 className="w-4 h-4 animate-spin" />
              ) : (
                <Sparkles className="w-4 h-4" />
              )}
              <span>{challengeData ? 'Nuevo Reto' : 'Cargar tema prioritario'}</span>
            </button>

            <button
              id="btn-refresh-due"
              onClick={fetchDueTopics}
              disabled={loadingTopics}
              title="Refrescar cola"
              className="p-2 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 border border-slate-700 transition"
            >
              <RefreshCw className={`w-4 h-4 ${loadingTopics ? 'animate-spin' : ''}`} />
            </button>
          </div>
        </div>

        {errorMessage && (
          <div className="mt-4 p-3 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs flex items-center gap-2">
            <AlertTriangle className="w-4 h-4 flex-shrink-0" />
            <span>{errorMessage}</span>
          </div>
        )}
      </div>

      {/* Visualizador del Desafío */}
      {challengeData && (
        <div className="space-y-6">
          <div
            id="challenge-card"
            className="bg-slate-900 border border-indigo-500/30 rounded-2xl p-6 shadow-xl relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 transform translate-x-4 -translate-y-4 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex items-center justify-between gap-4 mb-4">
              <div className="flex items-center gap-2">
                <FileQuestion className="w-5 h-5 text-indigo-400" />
                <span className="text-xs font-semibold uppercase tracking-wider text-indigo-400">
                  {challengeData.type === 'theory' ? 'Desafío Teórico Senior' : 'Escenario Práctico Senior'}
                </span>
              </div>
              <span className="text-xs font-mono text-slate-400 bg-slate-800/80 px-2.5 py-1 rounded-md border border-slate-700">
                {challengeData.title}
              </span>
            </div>

            <div
              id="challenge-text"
              className="text-slate-100 text-sm sm:text-base leading-relaxed whitespace-pre-line font-medium"
            >
              {challengeData.challenge}
            </div>
          </div>

          {/* Área de Redacción Técnica */}
          <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 shadow-xl">
            <div className="flex items-center justify-between mb-3">
              <label
                htmlFor="user-solution-input"
                className="text-sm font-semibold text-slate-200 flex items-center gap-2"
              >
                <Code2 className="w-4 h-4 text-purple-400" />
                <span>Tu Solución Técnica o Justificación de Arquitectura</span>
              </label>
              <span className="text-xs text-slate-400">Tipografía monoespaciada para código y razonamiento</span>
            </div>

            <textarea
              id="user-solution-input"
              rows={8}
              value={userSolution}
              onChange={(e) => setUserSolution(e.target.value)}
              placeholder="Explica el funcionamiento interno, secuencia de eventos, y analiza los trade-offs (ej. latencia, consumo de memoria, escalabilidad) de tu solución..."
              className="w-full bg-slate-950 text-slate-200 font-mono text-sm rounded-xl p-4 border border-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-transparent transition-all placeholder:text-slate-600 resize-y"
            />

            <div className="mt-4 flex justify-end">
              <button
                id="btn-evaluate-solution"
                onClick={handleEvaluateSolution}
                disabled={evaluating || !userSolution.trim()}
                className="inline-flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 disabled:opacity-50 text-white font-medium px-6 py-2.5 rounded-xl shadow-lg hover:shadow-indigo-500/25 transition-all active:scale-95 text-sm"
              >
                {evaluating ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Senior Evaluator Analizando...</span>
                  </>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Evaluar Solución</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Panel de Resultados / Feedback del Evaluador Senior */}
          {evaluationResult && (
            <div
              id="evaluation-results-panel"
              className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-2xl space-y-5 animate-in fade-in slide-in-from-bottom-4 duration-300"
            >
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-800">
                <div>
                  <h3 className="text-lg font-bold text-white mb-1">Dictamen del Senior Evaluator</h3>
                  <p className="text-xs text-slate-400">
                    Evaluación deliberada sin sesgo ni condescendencia
                  </p>
                </div>
                <div id="score-badge-container">
                  {getScoreBadge(evaluationResult.score)}
                </div>
              </div>

              {/* Feedback central */}
              <div>
                <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
                  Retroalimentación Técnica
                </h4>
                <div
                  id="evaluation-feedback-text"
                  className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 text-slate-200 text-sm leading-relaxed"
                >
                  {evaluationResult.feedback}
                </div>
              </div>

              {/* Fortalezas y Puntos Ciegos / Trade-offs */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Fortalezas */}
                <div className="p-4 rounded-xl bg-emerald-950/20 border border-emerald-500/20">
                  <div className="flex items-center gap-2 mb-2 text-emerald-400 font-semibold text-xs uppercase tracking-wider">
                    <CheckCircle2 className="w-4 h-4" />
                    <span>Fortalezas Identificadas</span>
                  </div>
                  {evaluationResult.strengths && evaluationResult.strengths.length > 0 ? (
                    <ul id="evaluation-strengths-list" className="space-y-1 text-xs text-slate-300">
                      {evaluationResult.strengths.map((str, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-emerald-400 font-bold">•</span>
                          <span>{str}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 italic">No se destacaron puntos sobresalientes.</p>
                  )}
                </div>

                {/* Puntos ciegos / Trade-offs omitidos */}
                <div className="p-4 rounded-xl bg-amber-950/20 border border-amber-500/20">
                  <div className="flex items-center gap-2 mb-2 text-amber-400 font-semibold text-xs uppercase tracking-wider">
                    <AlertTriangle className="w-4 h-4" />
                    <span>Puntos Ciegos / Trade-offs Omitidos</span>
                  </div>
                  {evaluationResult.missingTradeoffs && evaluationResult.missingTradeoffs.length > 0 ? (
                    <ul id="evaluation-missing-tradeoffs-list" className="space-y-1 text-xs text-slate-300">
                      {evaluationResult.missingTradeoffs.map((item, idx) => (
                        <li key={idx} className="flex items-start gap-1.5">
                          <span className="text-amber-400 font-bold">•</span>
                          <span>{item}</span>
                        </li>
                      ))}
                    </ul>
                  ) : (
                    <p className="text-xs text-slate-400 italic">Análisis completo sin omisiones evidentes.</p>
                  )}
                </div>
              </div>

              {/* Próximo repaso programado (SRS) */}
              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400">
                <div className="flex items-center gap-2">
                  <Calendar className="w-4 h-4 text-indigo-400" />
                  <span>
                    Próximo Repaso SRS:{' '}
                    <strong id="next-review-date" className="text-indigo-300 font-mono">
                      {evaluationResult.nextReviewAt
                        ? new Date(evaluationResult.nextReviewAt).toLocaleDateString('es-ES', {
                            weekday: 'short',
                            year: 'numeric',
                            month: 'short',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })
                        : 'Programado'}
                    </strong>
                  </span>
                </div>
                <div className="font-mono text-slate-400">
                  Etapa SRS: <span className="text-slate-200">{evaluationResult.srsStage ?? 1}</span> | Intervalo:{' '}
                  <span className="text-slate-200">{evaluationResult.intervalDays ?? 1}d</span>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}
