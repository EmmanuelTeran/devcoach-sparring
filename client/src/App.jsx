import React, { useEffect, useState } from 'react';
import { Terminal, Activity, ShieldCheck } from 'lucide-react';

export function App() {
  const [healthStatus, setHealthStatus] = useState('checking...');

  useEffect(() => {
    fetch('http://localhost:5000/api/health')
      .then((res) => res.json())
      .then((data) => setHealthStatus(data.status))
      .catch(() => setHealthStatus('offline / standalone'));
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <header className="border-b border-slate-800 bg-slate-900/50 backdrop-blur px-6 py-4 flex items-center justify-between">
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

      <main className="flex-1 max-w-5xl mx-auto w-full p-8 flex flex-col justify-center items-center text-center">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium mb-6">
          <ShieldCheck className="w-4 h-4" />
          <span>Entrenador Personal Fullstack (Hard & Soft Skills)</span>
        </div>

        <h2 className="text-4xl sm:text-5xl font-extrabold tracking-tight mb-4 text-white max-w-2xl">
          Eleva tu criterio técnico y defensa arquitectónica
        </h2>

        <p className="text-slate-400 text-base sm:text-lg max-w-xl mb-8">
          Práctica deliberada con Active Recall y Sparring por voz para defender decisiones ante Tech Leads y Clientes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full max-w-2xl">
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 text-left">
            <h3 className="font-semibold text-indigo-300 mb-1">Hard Skills SRS</h3>
            <p className="text-xs text-slate-400">Repetición espaciada y desafíos prácticos de código y arquitectura.</p>
          </div>
          <div className="p-5 rounded-xl border border-slate-800 bg-slate-900/40 text-left">
            <h3 className="font-semibold text-purple-300 mb-1">Soft Skills Sparring</h3>
            <p className="text-xs text-slate-400">Simulación por voz en tiempo real refutando trade-offs con Gemini.</p>
          </div>
        </div>
      </main>

      <footer className="border-t border-slate-900 py-4 text-center text-xs text-slate-600">
        DevCoach Sparring &copy; 2026
      </footer>
    </div>
  );
}

export default App;
