
import React, { useState, useEffect, useRef } from 'react';
import ReactDOM from 'react-dom/client';
import { 
  Play, 
  Pause, 
  Image as ImageIcon,
  Music as MusicIcon,
  Cpu,
  Waves,
  Layers,
  Upload,
  X,
  Zap,
  Activity,
  Globe,
  Terminal,
  Fingerprint,
  Mic,
  ChevronRight,
  Database,
  ShieldCheck,
  MousePointer2,
  Box,
  Target,
  Repeat,
  Code2,
  Cpu as CpuIcon,
  Server,
  Cloud,
  PieChart,
  Crosshair,
  BarChart,
  Scan,
  Info,
  Compass,
  ArrowRightLeft,
  Navigation,
  Wind,
  Settings,
  Shield
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

// --- Sub-Component: Implementation Audit ---
const ImplementationAudit = () => {
  const channels = [
    { name: '信号采集 / Web Audio API', value: 94, status: 'Optimal', icon: Mic },
    { name: '几何计算 / WebGL 2.0 Engine', value: 88, status: 'Accelerated', icon: CpuIcon },
    { name: '状态机 / React Fiber Logic', value: 99, status: 'Synchronized', icon: Zap },
    { name: '资产分发 / Cloud DNA Cache', value: 72, status: 'Active', icon: Cloud }
  ];

  return (
    <div className="bg-slate-950 p-10 rounded-[2.5rem] font-sans text-white h-full border border-slate-800 shadow-2xl relative overflow-hidden group">
      <div className="flex items-center gap-3 mb-8 border-b border-slate-800 pb-4">
        <Database size={16} className="text-teal-500" />
        <span className="text-[11px] font-black uppercase tracking-widest text-slate-400">实现渠道分析 // Channel Audit</span>
      </div>
      <div className="space-y-6">
        {channels.map((ch, i) => (
          <div key={i} className="space-y-2 group/item">
            <div className="flex justify-between items-center text-[10px] font-bold">
               <div className="flex items-center gap-2">
                 <ch.icon size={12} className="text-slate-500 group-hover/item:text-teal-500 transition-colors" />
                 <span className="uppercase tracking-tight">{ch.name}</span>
               </div>
               <span className="text-teal-500 font-mono">{ch.status}</span>
            </div>
            <div className="h-1 w-full bg-slate-900 rounded-full overflow-hidden">
               <div className="h-full bg-teal-500/80 transition-all duration-1000 ease-out" style={{ width: `${ch.value}%` }}></div>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 pt-6 border-t border-slate-900 flex justify-between items-center">
         <div className="flex flex-col">
            <span className="text-[8px] font-black text-slate-500 uppercase">System Integrity</span>
            <span className="text-lg font-black text-teal-500 tracking-tighter">99.8% STABLE</span>
         </div>
         <ShieldCheck className="text-slate-800 group-hover:text-teal-900/40 transition-colors" size={32} />
      </div>
    </div>
  );
};

// --- Sub-Component: Code Showcase ---
const CodeShowcase = () => {
  const codeLines = [
    "function renderDisplacementField(freqData, time) {",
    "  const particles = this.gpu.instance(MAX_PARTICLES);",
    "  particles.onUpdate((p, idx) => {",
    "    const noise = perlin.octave(p.x * 0.1, p.y * 0.15, time);",
    "    const audioPulse = freqData[idx % 256] * ENERGY_BIAS;",
    "    p.y += (noise * 40) - audioPulse;",
    "    p.alpha = clamp(1.0 - (abs(p.y - MID_Y) / MID_Y), 0.1, 0.9);",
    "  });",
    "  return particles.draw(BlendMode.SCREEN);",
    "}"
  ];

  return (
    <div className="bg-slate-900 p-10 rounded-[2.5rem] border border-slate-800 h-full flex flex-col font-mono text-[11px] leading-relaxed shadow-sm">
      <div className="flex justify-between items-center mb-6">
        <div className="flex items-center gap-2">
          <Code2 size={16} className="text-teal-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">核心算法展示 // Kernel.js</span>
        </div>
        <div className="flex gap-1.5">
           <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
           <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
           <div className="w-2.5 h-2.5 rounded-full bg-slate-800"></div>
        </div>
      </div>
      <div className="flex-1 overflow-hidden space-y-1">
        {codeLines.map((line, i) => (
          <div key={i} className="flex gap-6 hover:bg-slate-800/50 transition-colors">
            <span className="text-slate-700 w-4 text-right select-none">{(i + 1).toString().padStart(2, '0')}</span>
            <span className="text-slate-400 font-medium whitespace-pre">{line}</span>
          </div>
        ))}
      </div>
      <div className="mt-6 flex items-center gap-3 text-slate-600 border-t border-slate-800 pt-4 italic">
        <Terminal size={12} />
        <span>Compiled successfully. No syntax warnings.</span>
      </div>
    </div>
  );
};

// --- Sub-Component: Chromatic Analysis ---
const ChromaticAnalysis = ({ config }: { config: VisualizerConfig }) => {
  const palettes = {
    color: ['#14b8a6', '#fbbf24', '#334155', '#f8fafc'],
    ink: ['#0f172a', '#334155', '#94a3b8', '#f1f5f9'],
    neon: ['#00f2ff', '#ff0070', '#7000ff', '#0f172a'],
    glass: ['#ffffff66', '#ffffff33', '#00000011', '#ffffff99']
  };
  const activePalette = palettes[config.style] || palettes.color;

  return (
    <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] space-y-8 h-full shadow-sm">
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <PieChart size={14} className="text-teal-500" />
          <span className="text-[10px] font-black uppercase tracking-widest text-slate-900">视觉色谱解析 / Chromatic</span>
        </div>
      </div>
      <div className="space-y-4">
        {activePalette.map((color, i) => (
          <div key={i} className="flex items-center gap-4">
            <div className="w-12 h-6 rounded-md shadow-inner" style={{ backgroundColor: color }}></div>
            <div className="flex-1 flex justify-between items-end border-b border-slate-50 pb-1">
              <span className="text-[9px] font-mono text-slate-400 uppercase">{color}</span>
              <span className="text-[10px] font-bold text-slate-900">{(80 - i * 15 + Math.random() * 5).toFixed(1)}%</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// --- Sub-Component: Material Forge ---
const MaterialForge = ({ currentStyle, setStyle }: { currentStyle: string, setStyle: (s: any) => void }) => {
  const styles = [
    { id: 'color', name: '履彩 DNA', desc: '基于色散原理', icon: Box },
    { id: 'ink', name: '水墨 场域', desc: '单色灰度映射', icon: Fingerprint },
    { id: 'neon', name: '霓虹 矩阵', desc: '高亮电子扰动', icon: Zap },
    { id: 'glass', name: '琉璃 映射', desc: '物理材质仿真', icon: Layers }
  ];

  return (
    <div className="grid grid-cols-2 gap-4 h-full">
      {styles.map(s => (
        <button
          key={s.id}
          onClick={() => setStyle(s.id)}
          className={`p-6 rounded-[2.5rem] border transition-all text-left flex flex-col justify-between group relative overflow-hidden ${
            currentStyle === s.id ? 'bg-slate-900 border-slate-900 text-white shadow-xl' : 'bg-white border-slate-100 text-slate-900 hover:border-teal-500'
          }`}
        >
          <div className="z-10">
            <h5 className="text-[10px] font-black uppercase tracking-widest mb-1">{s.name}</h5>
            <p className={`text-[8px] font-medium leading-tight ${currentStyle === s.id ? 'text-slate-400' : 'text-slate-300'}`}>{s.desc}</p>
          </div>
          <div className={`mt-4 w-10 h-10 rounded-xl flex items-center justify-center transition-all ${currentStyle === s.id ? 'bg-teal-500 text-white' : 'bg-slate-50 text-slate-300 group-hover:bg-teal-50 group-hover:text-teal-500'}`}>
            <s.icon size={20} />
          </div>
        </button>
      ))}
    </div>
  );
};

// --- Diagnostic Report Modal ---
const DetailReport = ({ isOpen, onClose, config }: { isOpen: boolean, onClose: () => void, config: VisualizerConfig }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 overflow-hidden">
      <div className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500" onClick={onClose} />
      <div className="relative w-full max-w-5xl h-full max-h-[85vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 border border-slate-200">
        <div className="px-12 py-10 border-b border-slate-100 flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Diagnostic</span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">RES-AUDIT-2024.v3</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">联觉映射深度审计报告</h2>
          </div>
          <button onClick={onClose} className="p-3 rounded-full hover:bg-slate-100 transition-colors border border-slate-100">
            <X size={24} className="text-slate-400" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto px-12 py-12 space-y-12">
           <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
             <ImplementationAudit />
             <div className="space-y-8">
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                   <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Wind size={14}/> 流场分析</h4>
                   <div className="text-5xl font-black text-slate-900 mb-2">{config.flow}%</div>
                   <p className="text-xs text-slate-500">当前动力学算法在当前媒介下的向量对齐度为 0.941，表现极佳。</p>
                </div>
                <div className="p-8 bg-slate-50 rounded-[2.5rem] border border-slate-100">
                   <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest mb-6 flex items-center gap-2"><Layers size={14}/> 粒子堆叠</h4>
                   <div className="text-5xl font-black text-slate-900 mb-2">{config.inkDensity}X</div>
                   <p className="text-xs text-slate-500">高维采样空间内，粒子的重合率与声频增益呈正相关分布。</p>
                </div>
             </div>
           </div>
        </div>
        <div className="p-10 border-t border-slate-100 flex justify-end">
          <button onClick={onClose} className="px-10 py-3 bg-slate-900 text-white font-black text-[11px] uppercase tracking-widest rounded-full hover:bg-teal-600 transition-all">关闭诊断</button>
        </div>
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
      ctx.fillStyle = '#0f172a';
      ctx.fillRect(0, 0, width, height);

      // Background Grid
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.02)';
      ctx.lineWidth = 1;
      for(let x=0; x<width; x+=50) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, height); ctx.stroke(); }
      for(let y=0; y<height; y+=50) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(width, y); ctx.stroke(); }

      ctx.globalCompositeOperation = 'screen';
      const rows = 40;
      const cols = Math.max(1, Math.floor(60 * (config.inkDensity / 5)));
      const spacingX = width / cols;
      const spacingY = height / rows;

      let imgData: Uint8ClampedArray | null = null;
      if (config.customImage) {
        const hCanvas = hiddenCanvasRef.current;
        if (hCanvas.width !== cols || hCanvas.height !== rows) { hCanvas.width = cols; hCanvas.height = rows; }
        const hCtx = hCanvas.getContext('2d');
        if (hCtx) { hCtx.drawImage(config.customImage, 0, 0, cols, rows); imgData = hCtx.getImageData(0, 0, cols, rows).data; }
      }

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

          let color;
          if (imgData) {
            const i = (y * cols + x) * 4; color = `rgb(${imgData[i]}, ${imgData[i+1]}, ${imgData[i+2]})`;
          } else if (config.style === 'ink') {
             const grey = Math.floor(220 * Math.max(0, 1 - distToCenter)); color = `rgb(${grey},${grey},${grey})`;
          } else if (config.style === 'neon') {
             color = (x + y) % 2 === 0 ? '#00f2ff' : '#ff0070';
          } else if (config.style === 'glass') {
             color = `rgba(255, 255, 255, ${0.4 * (1 - distToCenter)})`;
          } else {
            color = x % 5 === 0 ? '#14b8a6' : x % 3 === 0 ? '#fbbf24' : '#334155';
          }

          ctx.fillStyle = color;
          ctx.globalAlpha = Math.max(0, (1 - distToCenter) * (config.exposure / 100));
          ctx.beginPath();
          if (config.style === 'neon') ctx.fillRect(xPos - size/2, finalY - size/2, size, size);
          else { ctx.arc(xPos, finalY, size, 0, Math.PI * 2); ctx.fill(); }
        }
      }

      ctx.globalCompositeOperation = 'source-over'; ctx.globalAlpha = 1;
      animationId = requestAnimationFrame(render);
    };
    render();
    return () => cancelAnimationFrame(animationId);
  }, [config, mousePos]);

  return (
    <div onMouseMove={handleMouseMove} onMouseLeave={() => setMousePos({ x: -1000, y: -1000 })} className="relative w-full aspect-video md:aspect-[21/9] overflow-hidden rounded-[3rem] bg-slate-900 border-[8px] border-white shadow-2xl cursor-crosshair group">
      <canvas ref={canvasRef} className="w-full h-full block" />
      <div className="absolute inset-0 pointer-events-none p-10 flex flex-col justify-between">
        <div className="flex justify-between items-start">
           <div className="space-y-2">
              <div className="flex items-center gap-4">
                <div className="h-[1px] w-12 bg-teal-500"></div>
                <span className="text-white/40 text-[9px] font-mono tracking-[0.5em] uppercase italic">System.Active // Interactive_Render</span>
              </div>
           </div>
           <div className="px-3 py-1 bg-white/10 backdrop-blur-md rounded border border-white/5 text-teal-400 font-black text-[9px] uppercase tracking-widest">
             Status: Optimal_Sync
           </div>
        </div>
        <div className="flex justify-between items-end">
           <div className="space-y-2">
             <h2 className="text-white text-5xl font-black italic tracking-tighter opacity-80 uppercase">{config.style}_FIELD</h2>
             <div className="flex items-center gap-3">
               <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
               <span className="text-teal-400/60 text-[8px] font-black uppercase tracking-[0.4em]">Algorithm: REALTIME_DISPLACEMENT</span>
             </div>
           </div>
        </div>
      </div>
    </div>
  );
};

// --- Main App Component ---
const App: React.FC = () => {
  const [config, setConfig] = useState<VisualizerConfig>({
    particleSize: 40, exposure: 75, flow: 65, inkDensity: 7,
    isAudioPlaying: true, style: 'color', customImage: null, analyser: null
  });

  const [fps, setFps] = useState(60);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const [fileNames, setFileNames] = useState({ audio: '', image: '' });

  useEffect(() => {
    const interval = setInterval(() => setFps(prev => 59.6 + Math.random() * 0.4), 1500);
    return () => clearInterval(interval);
  }, []);

  const updateConfig = (key: keyof VisualizerConfig, val: any) => setConfig(prev => ({ ...prev, [key]: val }));

  const handleUpload = (type: 'image' | 'audio', e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]; if (!file) return;
    setFileNames(p => ({ ...p, [type]: file.name }));
    if (type === 'image') {
      const reader = new FileReader(); reader.onload = (ev) => {
        const img = new Image(); img.onload = () => updateConfig('customImage', img); img.src = ev.target?.result as string;
      }; reader.readAsDataURL(file);
    } else {
      setupAudio(file);
    }
  };

  const setupAudio = async (file: File) => {
    if (!audioContextRef.current) audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
    const ctx = audioContextRef.current; const arrayBuffer = await file.arrayBuffer(); const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
    const analyser = ctx.createAnalyser(); analyser.fftSize = 256;
    if (sourceNodeRef.current) sourceNodeRef.current.stop();
    const source = ctx.createBufferSource(); source.buffer = audioBuffer; source.loop = true; source.connect(analyser); analyser.connect(ctx.destination);
    source.start(0); sourceNodeRef.current = source;
    updateConfig('analyser', analyser); updateConfig('isAudioPlaying', true);
  };

  return (
    <div className="min-h-screen relative bg-slate-50 pb-24 font-sans selection:bg-teal-500 overflow-x-hidden">
      
      <DetailReport isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} config={config} />

      {/* Background Accents */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none opacity-[0.03] z-0">
        <div className="absolute top-1/4 left-10 w-px h-64 bg-slate-900"></div>
        <div className="absolute top-1/3 right-20 w-px h-96 bg-slate-900"></div>
        <div className="absolute bottom-10 left-1/2 w-64 h-px bg-slate-900"></div>
      </div>

      <div className="max-w-[1360px] mx-auto px-8 lg:px-16 py-16 lg:py-24 space-y-32 relative z-10">
        
        {/* --- Header with Precise HUD Layout (60% Width Center) --- */}
        <header className="relative flex flex-col gap-12 border-b border-slate-100 pb-20">
          
          <div className="flex flex-col lg:flex-row gap-16 justify-between items-start">
            <div className="space-y-12 relative flex-1">
              <div className="flex items-center gap-6">
                <div className="flex items-center gap-3">
                  <span className="text-[10px] font-black uppercase tracking-[0.6em] text-slate-300">Resonance.Lab // experimental</span>
                  <div className="h-px w-12 bg-teal-500"></div>
                </div>
                <div className="flex items-center gap-2 px-3 py-1 border border-slate-100 rounded-full">
                  <Target size={10} className="text-teal-500" />
                  <span className="text-[8px] font-black uppercase tracking-widest text-slate-400">Node_ID: 08-24</span>
                </div>
              </div>

              <div className="relative inline-block">
                <div className="absolute -top-6 -left-6 w-8 h-8 border-t-[1.5px] border-l-[1.5px] border-slate-200"></div>
                <div className="absolute -bottom-6 -right-6 w-8 h-8 border-b-[1.5px] border-r-[1.5px] border-slate-200"></div>
                <h1 className="text-[8rem] lg:text-[10rem] font-black text-slate-900 tracking-tighter leading-[0.8] uppercase">
                  声影<br/><span className="title-stroke">共鸣.</span>
                </h1>
              </div>
            </div>

            {/* --- HUD Control Center --- */}
            <div className="flex flex-col gap-[8px] relative min-w-[640px] font-mono">
              
              {/* [Upper Functional Area]: 8px Spacing */}
              <div className="w-full flex justify-between items-start px-2 h-[64px]">
                {/* Left side: FFT_REALTIME_STREAM + SPATIAL_LOCK */}
                <div className="flex flex-col gap-[8px] text-left">
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                      <Wind size={10} className="text-teal-500" /> FFT_REALTIME_STREAM
                    </div>
                    <div className="w-24 h-4 bg-slate-100 rounded flex items-end gap-[1px] p-[2px] border border-slate-50">
                      {[0.4, 0.7, 0.5, 0.9, 0.6, 0.3, 0.8, 0.4].map((h, i) => (
                        <div key={i} className="flex-1 bg-teal-500/30 rounded-t-[1px]" style={{ height: `${h * 100}%` }}></div>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col gap-[4px]">
                    <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                      <Compass size={10} className="text-teal-500" /> SPATIAL_LOCK
                    </div>
                    <div className="flex gap-4 text-[9px] font-black">
                      <span className="text-slate-400">X: <span className="text-slate-900">322.04</span></span>
                      <span className="text-slate-400">Y: <span className="text-slate-900">112.98</span></span>
                    </div>
                  </div>
                </div>

                {/* Right side: VECTOR_SYNC */}
                <div className="flex flex-col gap-[4px] items-end">
                   <div className="flex items-center gap-2 text-[8px] font-black text-slate-400 uppercase tracking-widest">
                      VECTOR_SYNC <Navigation size={10} className="text-teal-500" />
                   </div>
                   <div className="flex gap-4 text-[9px] font-black">
                      <span className="text-slate-400">L: <span className="text-slate-900">0.941</span></span>
                      <span className="text-slate-400">R: <span className="text-slate-900">0.962</span></span>
                   </div>
                </div>
              </div>

              {/* [Middle Core Area]: Centered, 60% Width, Large FPS */}
              <div className="w-[60%] mx-auto bg-white/40 backdrop-blur-md border border-white rounded-xl p-8 flex flex-col items-center justify-center relative shadow-sm z-10 overflow-visible">
                <div className="flex items-center gap-2 text-[10px] font-black text-slate-300 uppercase tracking-widest mb-1">
                  <Activity size={12} className="text-teal-500" /> FPS_STATUS
                </div>
                {/* Numerics 3x bigger than text */}
                <div className="text-[120px] font-black text-slate-900 tracking-tighter tabular-nums leading-none">
                  {fps.toFixed(1)}
                </div>
                <div className="text-[10px] font-black text-slate-300 uppercase tracking-widest mt-2">
                  LATENCY_COMPENSATED: -2MS
                </div>

                {/* [Floating Module]: ACTIVE_ENGINE - Shifted far right to avoid occlusion */}
                <div className="absolute -right-32 top-1/2 -translate-y-1/2 w-48 bg-slate-900 p-5 rounded-xl border border-white/10 shadow-2xl flex items-center justify-between group transition-all hover:bg-teal-600 cursor-pointer z-30">
                   <div className="flex flex-col gap-[4px]">
                      <span className="text-[10px] font-black text-white uppercase tracking-widest">ACTIVE_ENGINE</span>
                      <span className="text-[8px] text-teal-400 font-bold group-hover:text-white/80">CORE: 0x82C2</span>
                   </div>
                   <Zap size={24} className="text-teal-400 group-hover:text-white animate-pulse shrink-0" />
                </div>
              </div>

              {/* [Lower Functional Area]: Protocols & Integrity (Right aligned) */}
              <div className="w-full flex justify-end px-2">
                <div className="grid grid-cols-2 gap-x-[24px] gap-y-[8px] text-right">
                   <div className="flex flex-col gap-[4px]">
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">GLOBAL_PROTOCOL</span>
                      <span className="text-[10px] font-black text-slate-400">REV 3.11</span>
                   </div>
                   <div className="flex flex-col gap-[4px]">
                      <span className="text-[8px] font-black text-teal-500/50 uppercase tracking-widest">INTEGRITY_CHECK</span>
                      <div className="flex items-center gap-2 justify-end">
                        <span className="text-[10px] font-black text-teal-500/50">OK</span>
                        <div className="flex gap-[2px]">
                           {[1,0,1].map((b,i) => <div key={i} className={`w-1.5 h-1.5 rounded-full ${b ? 'bg-teal-500/40' : 'bg-slate-200'}`}></div>)}
                        </div>
                      </div>
                   </div>
                   <div className="flex flex-col gap-[4px]">
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">ALLOCATION</span>
                      <span className="text-[10px] font-black text-slate-400">1024.0MB</span>
                   </div>
                   <div className="flex flex-col gap-[4px]">
                      <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">SYSTEM_BUS</span>
                      <span className="text-[10px] font-black text-slate-400">SYNC_ACTIVE</span>
                   </div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Interface Grid */}
        <main className="space-y-16">
          <Visualizer config={config} />
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 bg-white p-12 rounded-[3.5rem] border border-slate-100 shadow-sm space-y-12">
              <div className="flex justify-between items-center">
                <h3 className="text-2xl font-black text-slate-900 uppercase">参数场域调控 / Parameters</h3>
                <div className="flex items-center gap-2 text-teal-600 text-[11px] font-black uppercase"><MousePointer2 size={14}/> 鼠标扰动激活</div>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-16 border-y border-slate-50 py-12">
                <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400"><span>动力流场强度</span><span>{config.flow}%</span></div>
                  <input type="range" className="w-full" value={config.flow} onChange={e => updateConfig('flow', parseInt(e.target.value))} />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between text-[10px] font-black uppercase tracking-widest text-slate-400"><span>粒子堆叠精度</span><span>{config.inkDensity}</span></div>
                  <input type="range" min="1" max="10" step="0.5" className="w-full" value={config.inkDensity} onChange={e => updateConfig('inkDensity', parseFloat(e.target.value))} />
                </div>
              </div>
              <div className="flex flex-col md:flex-row items-center gap-10">
                 <button onClick={() => updateConfig('isAudioPlaying', !config.isAudioPlaying)} className="w-24 h-24 rounded-[2.5rem] bg-slate-900 text-white flex items-center justify-center hover:bg-teal-600 transition-all shadow-xl active:scale-95">
                   {config.isAudioPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-1" />}
                 </button>
                 <div className="text-sm text-slate-500 font-medium leading-relaxed max-w-sm">
                    <div className="flex items-center gap-2 text-slate-900 font-black mb-1 uppercase tracking-tighter"><Zap size={14} className="text-teal-500" />渲染引擎活跃 / ACTIVE_ENGINE</div>
                    WebGL 矢量位移场演算中。每一个像素微粒均根据音频信号与拓扑算法实时更新位置。
                 </div>
              </div>
            </div>
            
            <div className="lg:col-span-4 flex flex-col gap-6">
               <MaterialForge currentStyle={config.style} setStyle={s => updateConfig('style', s)} />
               {['image', 'audio'].map(t => (
                 <label key={t} className="bg-white p-8 rounded-[2.5rem] border border-slate-100 flex items-center gap-6 cursor-pointer hover:border-teal-500 transition-all group">
                   <input type="file" accept={t === 'image' ? 'image/*' : 'audio/*'} className="hidden" onChange={e => handleUpload(t as any, e)} />
                   <div className="w-12 h-12 rounded-2xl bg-slate-50 text-slate-300 flex items-center justify-center group-hover:text-teal-500 group-hover:bg-teal-50 transition-all"><Upload size={20} /></div>
                   <div className="flex-1 min-w-0">
                     <span className="text-[10px] font-black uppercase text-slate-900 block tracking-widest">注入{t === 'image' ? '视觉DNA' : '韵律核心'}</span>
                     <p className="text-[9px] text-slate-300 truncate font-mono uppercase">{(fileNames as any)[t] || 'Initial_Wait'}</p>
                   </div>
                 </label>
               ))}
            </div>
          </div>
        </main>

        {/* Analytic Sections Grid */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-10">
           <ChromaticAnalysis config={config} />
           <div className="bg-white border border-slate-100 p-10 rounded-[2.5rem] h-full flex flex-col justify-between group hover:border-teal-500 transition-all shadow-sm">
              <div className="space-y-6">
                <div className="flex items-center gap-3"><Repeat size={24} className="text-teal-500" /><h4 className="text-xl font-black uppercase text-slate-900">联觉协同矩阵</h4></div>
                <p className="text-[11px] text-slate-400 uppercase tracking-widest leading-relaxed">系统实时监测音频振幅与粒子位移轨迹的重合度。当前耦合系数：0.982。</p>
                <button onClick={() => setIsReportOpen(true)} className="flex items-center gap-2 text-[10px] font-black text-teal-600 uppercase tracking-widest group-hover:translate-x-1 transition-transform">查看映射审计 <ArrowRightLeft size={12}/></button>
              </div>
           </div>
           <ImplementationAudit />
        </section>

        {/* Code & Algorithm Section */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
           <div className="lg:col-span-8"><CodeShowcase /></div>
           <div className="lg:col-span-4 bg-slate-100 p-10 rounded-[2.5rem] flex flex-col justify-between">
              <div className="space-y-4">
                 <h4 className="text-[11px] font-black text-slate-400 uppercase tracking-widest">System Build Notes</h4>
                 <div className="h-px bg-slate-200 w-full"></div>
                 <p className="text-sm font-medium text-slate-600 leading-relaxed italic">"此实验旨在通过高频采样与即时渲染，模糊物理声音与数字化视觉之间的边界。"</p>
              </div>
              <div className="flex items-center gap-4 pt-10 border-t border-slate-200">
                 <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-sm"><Settings size={18} className="text-slate-900" /></div>
                 <span className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Environment_Ready // V3.1.0</span>
              </div>
           </div>
        </section>

        {/* Complex Footer Restoration */}
        <footer className="pt-40 flex flex-col gap-24 border-t border-slate-100 relative">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-16">
            <div className="space-y-8 flex-1">
              <h3 className="text-7xl lg:text-[10rem] font-black tracking-tighter text-slate-900 leading-[0.8] uppercase">
                数字化视听<br/><span className="title-stroke">实验计划.</span>
              </h3>
              <p className="max-w-2xl text-slate-400 font-medium leading-relaxed text-xl italic">探索媒介、技术与感知力之间的融合边界。重构数字化背景下的多重感官叙事。</p>
            </div>
            <div className="flex items-center gap-4 bg-white px-8 py-4 rounded-full border border-slate-100 shadow-sm text-[11px] font-black uppercase tracking-widest text-slate-900">
              <Globe size={18} className="text-teal-500" /> SYNC_NODE: EAST_ASIA-C01
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12 border-b border-slate-200 pb-16">
            <div className="flex flex-col gap-4">
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Institution</p>
                <p className="text-3xl font-black text-slate-900">景德镇陶瓷大学</p>
              </div>
              <div className="space-y-1">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Department</p>
                <p className="text-xl font-light text-slate-400 tracking-[0.2em] uppercase">23艺术与科技1班</p>
              </div>
            </div>

            <div className="hidden lg:block w-px h-24 bg-slate-200"></div>

            <div className="flex flex-col items-end relative min-w-[300px]">
              <span className="absolute -top-6 right-0 text-[10px] font-black text-slate-400 tracking-[0.5em] uppercase">LEAD_DESIGNER</span>
              <div className="flex items-start gap-6">
                <span className="text-[10px] font-bold text-slate-400 mt-2 flex flex-col leading-tight select-none text-right">
                  <span>作</span>
                  <span>者</span>
                  <span>：</span>
                </span>
                <div className="flex flex-col items-start">
                   <span className="text-7xl lg:text-8xl font-black text-slate-700 leading-none tracking-tighter">李季源</span>
                   <span className="text-2xl lg:text-3xl font-light text-slate-400 tracking-tight font-sans">Li Jiyuan</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12">
            <div className="flex flex-col gap-6 flex-1">
              <div className="flex gap-12 text-[11px] font-black uppercase tracking-[0.4em] text-slate-300">
                {['Github', 'Behance', 'Instagram', 'Laboratory'].map(l => <button key={l} className="hover:text-teal-500 transition-colors">{l}</button>)}
              </div>
              <p className="text-[10px] font-black text-slate-200 uppercase tracking-[0.4em]">© 2024 RESONANCE EXPERIMENTAL POSTER // POWERED BY WEGL & SYNESTHESIA ENGINE</p>
            </div>
            <div className="bg-white p-8 rounded-[3rem] border border-slate-100 flex items-center gap-10 shadow-sm group hover:border-teal-500 transition-all">
               <div className="text-right font-black uppercase">
                 <span className="text-[12px] text-slate-900 block tracking-widest">Mobile_Link</span>
                 <span className="text-[9px] text-slate-300">扫码直达本交互页面</span>
               </div>
               <div className="w-24 h-24 bg-slate-50 p-2 rounded-2xl border border-slate-200 overflow-hidden flex items-center justify-center">
                  <img src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(window.location.href)}&margin=1`} alt="QR" className="w-full h-full grayscale group-hover:grayscale-0 transition-all duration-700" />
               </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

// --- Rendering ---
const root = document.getElementById('root');
if (root) ReactDOM.createRoot(root).render(<App />);
