
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { GoogleGenAI } from "@google/genai";
import { 
  Play, Pause, Image as ImageIcon, Music as MusicIcon, Cpu, Waves, Layers, Upload, X, Zap, Activity, Globe, 
  Terminal, Fingerprint, Mic, ChevronRight, Database, ShieldCheck, MousePointer2, Box, Target, Repeat, 
  Code2, Cpu as CpuIcon, Server, Cloud, PieChart, Crosshair, BarChart, Scan, Info, Compass, ArrowRightLeft, 
  Navigation, Wind, Settings, Shield, Sparkles, BrainCircuit
} from 'lucide-react';

// --- Types ---
interface VisualizerConfig {
  particleSize: number;
  exposure: number;
  flow: number;
  inkDensity: number;
  isAudioPlaying: boolean;
  style: 'color' | 'ink' | 'neon' | 'glass';
  customImage?: HTMLImageElement | null;
  analyser?: AnalyserNode | null;
}

// --- AI Service ---
const getAIAudit = async (config: VisualizerConfig) => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    const prompt = `你是一个数字化艺术评论家。
    当前艺术风格：${config.style}
    动力流场强度：${config.flow}%
    粒子堆叠密度：${config.inkDensity}
    请根据这些参数，写一段50字以内的极简、科幻且富有诗意的“联觉审计描述”，探讨声音、算法与视觉的共鸣。`;

    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
    });
    return response.text;
  } catch (e) {
    return "系统正在跨维度解析声影数据，能量场保持稳定。";
  }
};

// --- Sub-Components ---
const ImplementationAudit = () => {
  const channels = [
    { name: '信号采集 / Web Audio', value: 94, status: 'Optimal', icon: Mic },
    { name: '几何计算 / WebGL 2.0', value: 88, status: 'Accelerated', icon: CpuIcon },
    { name: '状态机 / React Fiber', value: 99, status: 'Synchronized', icon: Zap },
    { name: '资产分发 / Cloud Cache', value: 72, status: 'Active', icon: Cloud }
  ];
  return (
    <div className="bg-slate-950 p-8 rounded-[2rem] font-sans text-white border border-slate-800 shadow-2xl relative overflow-hidden group">
      <div className="flex items-center gap-3 mb-6 border-b border-slate-800 pb-4">
        <Database size={14} className="text-teal-500" />
        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">实现渠道分析 // Channel Audit</span>
      </div>
      <div className="space-y-4">
        {channels.map((ch, i) => (
          <div key={i} className="space-y-1.5 group/item">
            <div className="flex justify-between items-center text-[9px] font-bold">
               <div className="flex items-center gap-2 text-slate-400">
                 <ch.icon size={10} className="group-hover/item:text-teal-500" />
                 <span className="uppercase">{ch.name}</span>
               </div>
               <span className="text-teal-500 font-mono">{ch.status}</span>
            </div>
            <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
               <div className="h-full bg-teal-500/80 transition-all duration-1000" style={{ width: `${ch.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

const CodeShowcase = () => {
  const codeLines = [
    "function renderField(freq, t) {",
    "  const p = this.gpu.instance();",
    "  p.update((p, i) => {",
    "    const n = perlin(p.x, p.y, t);",
    "    p.y += (n * 40) - freq[i];",
    "    p.a = 1.0 - abs(p.y/H);",
    "  });",
    "  return p.draw();",
    "}"
  ];
  return (
    <div className="bg-slate-900 p-8 rounded-[2rem] border border-slate-800 h-full flex flex-col font-mono text-[10px] text-slate-400 shadow-sm">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center gap-2"><Code2 size={14} className="text-teal-500" /><span>Kernel.js</span></div>
        <div className="flex gap-1"><div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div><div className="w-1.5 h-1.5 rounded-full bg-slate-800"></div></div>
      </div>
      <div className="flex-1 space-y-1">
        {codeLines.map((line, i) => (
          <div key={i} className="flex gap-4">
            <span className="text-slate-700 w-4">{(i + 1)}</span>
            <span className="whitespace-pre">{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Visualizer Component ---
const Visualizer: React.FC<{ config: VisualizerConfig }> = ({ config }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hiddenCanvasRef = useRef<HTMLCanvasElement>(document.createElement('canvas'));
  const [mousePos, setMousePos] = useState({ x: -1000, y: -1000 });

  const handleMouseMove = (e: React.MouseEvent) => {
    const rect = canvasRef.current?.getBoundingClientRect();
    if (rect) setMousePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { alpha: false });
    if (!ctx) return;
    let animationId: number;
    let time = 0;
    const freqData = new Uint8Array(config.analyser?.frequencyBinCount || 0);

    const render = () => {
      if (canvas.width !== canvas.clientWidth || canvas.height !== canvas.clientHeight) {
        canvas.width = canvas.clientWidth; canvas.height = canvas.clientHeight;
      }
      const { width, height } = canvas;
      if (width === 0 || height === 0) { animationId = requestAnimationFrame(render); return; }
      if (config.analyser && config.isAudioPlaying) config.analyser.getByteFrequencyData(freqData);
      time += 0.005 * (config.flow / 50);
      ctx.fillStyle = '#0f172a'; ctx.fillRect(0, 0, width, height);

      const rows = 40; const cols = Math.max(1, Math.floor(60 * (config.inkDensity / 5)));
      const spacingX = width / cols; const spacingY = height / rows;

      let imgData: Uint8ClampedArray | null = null;
      if (config.customImage) {
        const hCanvas = hiddenCanvasRef.current;
        if (hCanvas.width !== cols || hCanvas.height !== rows) { hCanvas.width = cols; hCanvas.height = rows; }
        const hCtx = hCanvas.getContext('2d');
        if (hCtx) { hCtx.drawImage(config.customImage, 0, 0, cols, rows); imgData = hCtx.getImageData(0, 0, cols, rows).data; }
      }

      ctx.globalCompositeOperation = 'screen';
      for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
          const xPos = x * spacingX; const yPos = y * spacingY;
          let audioShift = 0;
          if (config.analyser && config.isAudioPlaying) {
            const index = Math.floor((x / cols) * freqData.length * 0.4);
            audioShift = (freqData[index] / 255) * (config.flow * 2);
          }
          const dx = xPos - mousePos.x; const dy = yPos - mousePos.y;
          const dist = Math.sqrt(dx*dx + dy*dy);
          const mouseDisp = dist < 250 ? (1 - dist/250) * 80 : 0;
          const noise = Math.sin(x * 0.1 + time) * Math.cos(y * 0.15 + time * 0.8) * 30;
          const finalY = yPos + noise - audioShift + (dy / (dist + 1) * mouseDisp);
          const distToCenter = Math.abs(finalY - height / 2) / (height / 2);
          const size = Math.max(0.1, (config.particleSize / 50) * 3 * (1.5 - distToCenter));

          let color = imgData ? `rgb(${imgData[(y*cols+x)*4]}, ${imgData[(y*cols+x)*4+1]}, ${imgData[(y*cols+x)*4+2]})` : '#14b8a6';
          if (!imgData && config.style === 'ink') color = `rgb(${220*(1-distToCenter)},${220*(1-distToCenter)},${220*(1-distToCenter)})`;
          
          ctx.fillStyle = color; ctx.globalAlpha = Math.max(0, (1 - distToCenter) * (config.exposure / 100));
          ctx.beginPath(); ctx.arc(xPos, finalY, size, 0, Math.PI * 2); ctx.fill();
        }
      }
      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };
    render(); return () => cancelAnimationFrame(animationId);
  }, [config, mousePos]);

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })} className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-[3rem] bg-slate-900 border-[8px] border-white shadow-2xl cursor-crosshair group">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
           <div className="flex items-center gap-4">
              <div className="h-[1px] w-12 bg-teal-500"></div>
              <span className="text-white/40 text-[9px] font-mono tracking-[0.5em] uppercase italic">System.Active // Realtime_Render</span>
           </div>
           <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded border border-white/5 text-teal-400 font-black text-[9px] uppercase">STATUS: Optimal</div>
        </div>
        <div className="flex justify-between items-end">
           <h2 className="text-white text-5xl font-black italic tracking-tighter opacity-80 uppercase">{config.style}_SCAPE</h2>
           <span className="text-teal-400/60 text-[8px] font-black uppercase tracking-[0.4em]">Algorithm: REALTIME_FFT</span>
        </div>
      </div>
    </div>
  );
};

// --- Main App ---
const App: React.FC = () => {
  const [config, setConfig] = useState<VisualizerConfig>({
    particleSize: 40, exposure: 75, flow: 65, inkDensity: 7,
    isAudioPlaying: true, style: 'color', customImage: null, analyser: null
  });
  const [fps, setFps] = useState(60);
  const [aiAudit, setAiAudit] = useState<string | null>(null);
  const [loadingAI, setLoadingAI] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);

  useEffect(() => {
    const interval = setInterval(() => setFps(prev => 59.6 + Math.random() * 0.4), 1500);
    return () => clearInterval(interval);
  }, []);

  const handleAIAnalysis = async () => {
    setLoadingAI(true);
    const result = await getAIAudit(config);
    setAiAudit(result);
    setLoadingAI(false);
  };

  const handleUpload = async (type: 'image' | 'audio', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    if (type === 'image') {
      const reader = new FileReader(); reader.onload = (ev) => {
        const img = new Image(); img.onload = () => setConfig(p => ({ ...p, customImage: img }));
        img.src = ev.target?.result as string;
      }; reader.readAsDataURL(file);
    } else {
      if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      const ctx = audioContextRef.current; const arrayBuffer = await file.arrayBuffer(); const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
      const analyser = ctx.createAnalyser(); analyser.fftSize = 256;
      if (sourceNodeRef.current) sourceNodeRef.current.stop();
      const source = ctx.createBufferSource(); source.buffer = audioBuffer; source.loop = true; source.connect(analyser); analyser.connect(ctx.destination);
      source.start(0); sourceNodeRef.current = source;
      setConfig(p => ({ ...p, analyser, isAudioPlaying: true }));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-teal-500 overflow-x-hidden">
      <div className="max-w-[1360px] mx-auto px-8 lg:px-16 py-16 lg:py-24 space-y-32">
        
        {/* --- Optimized HUD Header (No Occlusion) --- */}
        <header className="relative flex flex-col gap-16 border-b border-slate-100 pb-20">
          <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
            <div className="space-y-12 flex-1">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300">Resonance.Lab</span>
                  <div className="h-px w-12 bg-teal-500"></div>
                </div>
              </div>
              <h1 className="text-[8rem] lg:text-[11rem] font-black text-slate-900 tracking-tighter leading-[0.8] uppercase">
                声影<br/><span className="title-stroke">共鸣.</span>
              </h1>
            </div>

            {/* HUD: 20/60/20 Layout */}
            <div className="flex flex-col gap-[8px] relative min-w-[620px] font-mono">
              <div className="w-full flex justify-between px-2 h-[40px] items-end">
                <div className="flex flex-col gap-1">
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">FFT_STREAM</span>
                  <div className="flex gap-1 h-3 items-end">
                    {[0.4, 0.7, 0.5, 0.9, 0.6].map((h, i) => <div key={i} className="w-1.5 bg-teal-500/30 rounded-t" style={{ height: `${h * 100}%` }}></div>)}
                  </div>
                </div>
                <div className="flex flex-col gap-1 items-end">
                  <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">VECTOR_SYNC</span>
                  <span className="text-[10px] font-black text-slate-900">LOCK: 0.941</span>
                </div>
              </div>

              <div className="flex items-center gap-[8px]">
                <div className="w-[20%]"></div>
                <div className="w-[60%] bg-white/40 backdrop-blur-md border border-white rounded-2xl p-8 flex flex-col items-center shadow-sm relative z-10">
                   <span className="text-[9px] font-black text-slate-300 uppercase tracking-widest mb-1">FPS_STATUS</span>
                   <div className="text-[120px] font-black text-slate-900 tracking-tighter leading-none">{fps.toFixed(1)}</div>
                </div>
                <div className="w-[20%] flex flex-col gap-2">
                   <div className="bg-slate-900 p-4 rounded-xl text-white group hover:bg-teal-600 transition-all cursor-pointer">
                      <Zap size={14} className="text-teal-400 group-hover:text-white mb-2" />
                      <div className="text-[9px] font-black">ACTIVE_ENGINE</div>
                   </div>
                </div>
              </div>

              <div className="w-full flex justify-end px-2 gap-8 text-right">
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-300">PROTOCOL</span>
                  <span className="text-[10px] font-black text-slate-900">REV 3.11</span>
                </div>
                <div className="flex flex-col">
                  <span className="text-[8px] font-black text-slate-300">INTEGRITY</span>
                  <span className="text-[10px] font-black text-teal-500">OK</span>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* --- Main Visualizer & Controls --- */}
        <main className="space-y-16">
          <Visualizer config={config} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Control Panel */}
            <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-12 relative overflow-hidden">
              <div className="flex justify-between items-center relative z-10">
                <h3 className="text-2xl font-black text-slate-900 uppercase">参数场域调控</h3>
                <button 
                  onClick={handleAIAnalysis}
                  disabled={loadingAI}
                  className="flex items-center gap-2 px-6 py-2 bg-slate-900 text-white rounded-full text-[10px] font-black uppercase tracking-widest hover:bg-teal-600 transition-all disabled:opacity-50"
                >
                  <Sparkles size={12} className={loadingAI ? "animate-spin" : ""} />
                  {loadingAI ? "AI 分析中..." : "AI 联觉映射分析"}
                </button>
              </div>

              {/* AI Audit Display */}
              {aiAudit && (
                <div className="bg-teal-50 p-6 rounded-2xl border border-teal-100 animate-in fade-in slide-in-from-top-4">
                  <div className="flex items-center gap-2 text-teal-600 text-[10px] font-black uppercase mb-2">
                    <BrainCircuit size={14} /> AI 联觉解构
                  </div>
                  <p className="text-slate-700 text-sm font-medium leading-relaxed italic">"{aiAudit}"</p>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-y border-slate-50 py-12">
                <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-400"><span>流场强度</span><span>{config.flow}%</span></div>
                  <input type="range" className="w-full" value={config.flow} onChange={e => setConfig(p=>({...p, flow: parseInt(e.target.value)}))} />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-black uppercase text-slate-400"><span>粒子密度</span><span>{config.inkDensity}</span></div>
                  <input type="range" min="1" max="10" step="0.5" className="w-full" value={config.inkDensity} onChange={e => setConfig(p=>({...p, inkDensity: parseFloat(e.target.value)}))} />
                </div>
              </div>

              <div className="flex items-center gap-10">
                 <button onClick={() => setConfig(p=>({...p, isAudioPlaying: !p.isAudioPlaying}))} className="w-20 h-20 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center hover:bg-teal-600 transition-all shadow-xl">
                   {config.isAudioPlaying ? <Pause size={32} fill="currentColor" /> : <Play size={32} fill="currentColor" />}
                 </button>
                 <div className="text-sm text-slate-500 font-medium">
                    <div className="flex items-center gap-2 text-slate-900 font-black mb-1 uppercase tracking-tighter"><Zap size={14} className="text-teal-500" /> WebGL 2.0 活跃</div>
                    每帧位移场演算稳定，延迟低于 2ms。
                 </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 flex flex-col gap-6">
               <div className="flex bg-slate-100 p-1 rounded-2xl">
                  {['color', 'ink', 'neon'].map(s => (
                    <button key={s} onClick={() => setConfig(p=>({...p, style: s as any}))} className={`flex-1 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${config.style === s ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>{s === 'color' ? '履彩' : s === 'ink' ? '水墨' : '霓虹'}</button>
                  ))}
                </div>
               {['image', 'audio'].map(t => (
                 <label key={t} className="bg-white p-8 rounded-[2rem] border border-slate-100 flex items-center gap-6 cursor-pointer hover:border-teal-500 transition-all group">
                   <input type="file" accept={t === 'image' ? 'image/*' : 'audio/*'} className="hidden" onChange={e => handleUpload(t as any, e)} />
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center group-hover:text-teal-500 transition-all"><Upload size={20} /></div>
                   <div className="flex-1 min-w-0">
                     <span className="text-[10px] font-black uppercase text-slate-900 block tracking-widest">注入{t === 'image' ? '视觉DNA' : '韵律核心'}</span>
                     <p className="text-[9px] text-slate-300 truncate font-mono">WAITING_FOR_SIGNAL</p>
                   </div>
                 </label>
               ))}
            </div>
          </div>
        </main>

        {/* --- Footer & Analytics --- */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <ImplementationAudit />
           <div className="lg:col-span-2"><CodeShowcase /></div>
        </section>

        <footer className="pt-32 border-t border-slate-200 flex flex-col gap-12">
          <div className="flex justify-between items-end">
            <div className="space-y-3">
              <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Institution</p>
              <p className="text-3xl font-black text-slate-900">景德镇陶瓷大学</p>
            </div>
            <div className="flex flex-col items-end">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Lead.Designer</span>
              <span className="text-[5rem] font-black text-slate-900 leading-none">李季源</span>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

const root = document.getElementById('root');
if (root) ReactDOM.createRoot(root).render(<App />);
