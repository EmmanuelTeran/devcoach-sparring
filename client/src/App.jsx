import React, { useEffect, useState } from 'react';
import { Terminal, Activity, ShieldCheck, Brain, MessageSquare } from 'lucide-react';
import { HardSkillTrainer } from './components/HardSkillTrainer';
import { SoftSkillTrainer } from './components/SoftSkillTrainer';

export function App() {
  const [healthStatus, setHealthStatus] = useState('checking...');
  const [activeTab, setActiveTab] = useState('hard-skills');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setHealthStatus(data.status))
      .catch(() => setHealthStatus('offline / standalone'));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center space-x-3">
          <Terminal className="w-7 h-7 text-indigo-400" />
          <h1 className="text-xl font-bold tracking-tight bg-gradient-to-r from-indigo-400 via-purple-300 to-pink-400 bg-clip-text text-transparent">
            DevCoach Sparring
          </h1>
        </div>
        <div className="flex items-center space-x-2 text-xs font-mono px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700">
          <Activity className="w-3.5 h-3.5 text-emerald-400 animate-pulse" />
          <span>API: {healthStatus}</span>
        </div>
      </header>

      <main className="flex-1 max-w-5xl mx-auto w-full p-6 sm:p-8 flex flex-col items-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-4">
          <ShieldCheck className="w-4 h-4" />
          <span>Entrenador Personal Fullstack (Hard & Soft Skills)</span>
        </div>

        <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight mb-2 text-white text-center">
          Eleva tu criterio técnico y defensa arquitectónica
        </h2>

        <p className="text-slate-400 text-sm sm:text-base max-w-xl text-center mb-6">
          Práctica deliberada con Active Recall y Sparring por voz para defender decisiones ante Tech Leads y Clientes.
        </p>

        {/* Selector de Pestañas */}
        <div className="flex items-center gap-2 p-1.5 bg-slate-900 border border-slate-800 rounded-xl mb-6 shadow-lg">
          <button
            id="tab-hard-skills"
            onClick={() => setActiveTab('hard-skills')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'hard-skills'
                ? 'bg-indigo-600 text-white shadow-md shadow-indigo-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <Brain className="w-4 h-4" />
            <span>Hard Skills (Active Recall)</span>
          </button>

          <button
            id="tab-soft-skills"
            onClick={() => setActiveTab('soft-skills')}
            className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-medium transition-all ${
              activeTab === 'soft-skills'
                ? 'bg-purple-600 text-white shadow-md shadow-purple-500/25'
                : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
            }`}
          >
            <MessageSquare className="w-4 h-4" />
            <span>Soft Skills (Voz & Consultoría)</span>
          </button>
        </div>

        {/* Contenido Dinámico según la pestaña activa */}
        {activeTab === 'hard-skills' && <HardSkillTrainer />}
        {activeTab === 'soft-skills' && <SoftSkillTrainer />}
      </main>

      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-600">
        DevCoach Sparring &copy; 2026
      </footer>
    </div>
  );
}

export default App;


