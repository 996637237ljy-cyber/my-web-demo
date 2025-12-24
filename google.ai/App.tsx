import React, { useState, useEffect, useRef } from 'react';
import { GoogleGenAI } from "@google/genai";

const App: React.FC = () => {
  const [fps, setFps] = useState(59.9);
  const [active, setActive] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [report, setReport] = useState<string>("");
  const [mousePos, setMousePos] = useState({ x: 322.04, y: 112.98 });

  // 模拟 FPS 波动
  useEffect(() => {
    const interval = setInterval(() => {
      setFps(+(59 + Math.random()).toFixed(1));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  // 追踪鼠标位置
  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePos({
      x: +(e.clientX / 2).toFixed(2),
      y: +(e.clientY / 2).toFixed(2)
    });
  };

  const runAnalysis = async () => {
    if (!process.env.API_KEY || process.env.API_KEY === 'undefined') {
      alert("请先在 Vercel 环境变量中设置 API_KEY");
      return;
    }
    setAnalyzing(true);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const response = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `当前系统参数：FPS ${fps}, 坐标 X:${mousePos.x} Y:${mousePos.y}。请以一个名为“声影共鸣实验室”的超级AI身份，生成一段简短、晦涩且极具科技感的系统运行报告（中文）。`,
      });
      setReport(response.text || "系统同步异常。");
      setActive(true);
    } catch (err) {
      setReport("核心连接失败：鉴权协议错误。");
    } finally {
      setAnalyzing(false);
    }
  };

  return (
    <div 
      onMouseMove={handleMouseMove}
      className="min-h-screen bg-[#F8F9FA] text-[#0A0A0A] font-['Inter',sans-serif] p-6 md:p-12 overflow-hidden flex flex-col justify-between"
    >
      {/* 顶部状态栏 */}
      <header className="flex justify-between items-start">
        <div className="space-y-1">
          <div className="flex items-center gap-4">
            <h2 className="text-[10px] font-black tracking-[0.3em] text-slate-300 uppercase">
              RESONANCE.LAB // EXPERIMENTAL
            </h2>
            <div className="h-[1px] w-8 bg-slate-200"></div>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse"></div>
              <span className="text-[10px] font-bold text-slate-400">NODE_ID: 08-24</span>
            </div>
          </div>
        </div>

        <div className="flex gap-12 text-[9px] font-bold text-slate-400">
          <div className="space-y-1">
            <div className="flex items-center gap-2">
              <span className="text-cyan-500">≋</span> FFT_REALTIME_STREAM
            </div>
            <div className="flex gap-[2px]">
              {[0.4, 0.7, 0.5, 0.9, 0.6, 0.3, 0.8].map((h, i) => (
                <div key={i} className="w-2 bg-slate-200" style={{ height: `${h * 10}px` }}></div>
              ))}
            </div>
          </div>
          <div className="space-y-1">
            <div>∅ SPATIAL_LOCK</div>
            <div className="text-black tabular-nums">X: {mousePos.x}  Y: {mousePos.y}</div>
          </div>
          <div className="space-y-1 text-right">
            <div className="flex items-center justify-end gap-1 uppercase">VECTOR_SYNC <span className="text-cyan-500">▽</span></div>
            <div className="text-black">L: 0.941  R: 0.962</div>
          </div>
        </div>
      </header>

      {/* 核心视觉区域 */}
      <main className="flex-1 flex items-center justify-between">
        <div className="relative">
          <div className="text-[120px] md:text-[180px] leading-none font-black tracking-tighter flex flex-col">
            <span className="z-10">声影</span>
            <span className="text-transparent stroke-text" style={{ WebkitTextStroke: '1px #0A0A0A' }}>共鸣</span>
          </div>
          <div className="absolute -left-4 -top-4 w-12 h-12 border-l border-t border-slate-300"></div>
          <div className="absolute -right-4 -bottom-4 w-12 h-12 border-r border-b border-slate-300"></div>
          <div className="absolute right-0 bottom-0 text-[10px] font-bold text-slate-300 tracking-[0.5em] rotate-90 origin-bottom-right translate-y-4">
            PROTOTYPE
          </div>
        </div>

        <div className="flex flex-col items-end gap-8">
          <div className="bg-white/50 backdrop-blur-md border border-slate-100 p-12 rounded-[2rem] shadow-sm flex flex-col items-center relative">
             <div className="absolute top-6 flex items-center gap-2 text-[10px] font-black tracking-widest text-cyan-500">
               <span className="animate-pulse">⚡</span> FPS_STATUS
             </div>
             <div className="text-[120px] font-black tracking-tighter tabular-nums leading-none my-4">
               {fps}
             </div>
             <div className="text-[10px] font-bold text-slate-300 tracking-widest uppercase">
               LATENCY_COMPENSATED: -2MS
             </div>

             {/* 浮动引擎开关 */}
             <button 
                onClick={runAnalysis}
                disabled={analyzing}
                className={`absolute -right-12 top-1/2 -translate-y-1/2 group flex items-center gap-4 bg-[#0A0A0A] text-white p-4 pl-8 rounded-2xl shadow-2xl transition-all active:scale-95 ${analyzing ? 'opacity-50' : 'hover:pr-12'}`}
             >
                <div className="text-left">
                  <div className="text-[10px] font-black tracking-widest uppercase">Active_Engine</div>
                  <div className="text-[8px] font-mono text-cyan-400 opacity-70">CORE: 0x82C2</div>
                </div>
                <div className={`w-10 h-10 rounded-xl flex items-center justify-center border border-white/20 ${active ? 'bg-cyan-500' : ''}`}>
                  {analyzing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <span className="text-xl">⚡</span>
                  )}
                </div>
             </button>
          </div>

          {/* AI 报告区域 */}
          {report && (
            <div className="max-w-md bg-white border border-slate-100 p-6 rounded-2xl animate-fade shadow-sm">
              <p className="text-xs font-mono leading-relaxed text-slate-600 italic">
                {report}
              </p>
            </div>
          )}
        </div>
      </main>

      {/* 底部装饰栏 */}
      <footer className="w-full">
        <div className="bg-[#0A0A0A] h-48 rounded-[2.5rem] overflow-hidden relative flex items-center px-12">
          <div className="absolute inset-0 opacity-20" 
               style={{backgroundImage: 'radial-gradient(#FFF 1px, transparent 0)', backgroundSize: '24px 24px'}}></div>
          
          <div className="flex justify-between items-center w-full relative z-10 text-white/40 font-mono text-[9px] tracking-widest">
            <div className="flex items-center gap-6">
               <div className="h-[1px] w-12 bg-white/20"></div>
               <span>SYSTEM.ACTIVE // INTERACTIVE_RENDER</span>
            </div>
            <div className="flex gap-12">
              <div className="flex flex-col gap-1">
                <span className="text-white/20 uppercase">Global_Protocol</span>
                <span className="text-white">REV 3.11</span>
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-white/20 uppercase">Allocation</span>
                <span className="text-white">1024.0MB</span>
              </div>
            </div>
            <div className="bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 px-4 py-2 rounded-lg font-black uppercase">
              Status: Optimal_Sync
            </div>
          </div>
        </div>
      </footer>

      <style>{`
        .stroke-text { -webkit-text-stroke: 2px #0A0A0A; }
        @media (max-width: 768px) {
          .stroke-text { -webkit-text-stroke: 1px #0A0A0A; }
        }
      `}</style>
    </div>
  );
};

export default App;
