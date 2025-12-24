
import React, { useState, useEffect, useRef } from 'react';
import { VisualizerConfig } from './types';
import Visualizer from './components/Visualizer';
import { 
  Palette, 
  Play, 
  Pause, 
  Image as ImageIcon,
  Music as MusicIcon,
  Cpu,
  ChevronRight,
  Sparkles,
  Waves,
  Heart,
  Layers,
  Code,
  Upload,
  X,
  ArrowUpRight,
  Mic,
  Fingerprint,
  Monitor,
  Maximize2,
  Zap,
  BarChart3,
  TrendingUp,
  Clock,
  Terminal,
  Activity,
  Globe,
  QrCode
} from 'lucide-react';

const DetailReport = ({ isOpen, onClose, config }: { isOpen: boolean, onClose: () => void, config: VisualizerConfig }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 lg:p-12 overflow-hidden">
      <div 
        className="absolute inset-0 bg-slate-950/80 backdrop-blur-xl animate-in fade-in duration-500" 
        onClick={onClose}
      />
      <div className="relative w-full max-w-5xl h-full max-h-[85vh] bg-white rounded-[2rem] shadow-2xl overflow-hidden flex flex-col animate-in zoom-in-95 duration-500 border border-slate-200">
        <div className="px-12 py-10 border-b border-slate-100 flex justify-between items-start">
          <div className="space-y-2">
            <div className="flex items-center gap-3">
              <span className="bg-teal-500 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase tracking-tighter">Diagnostic</span>
              <span className="text-[10px] font-medium text-slate-400 uppercase tracking-widest">RES-AUDIT-2024.v3</span>
            </div>
            <h2 className="text-4xl font-black text-slate-900 tracking-tighter">联觉映射深度审计报告</h2>
            <p className="text-xs text-slate-500 font-medium max-w-md">基于快速傅里叶变换 (FFT) 与 GPU 实例化渲染的跨媒介动力学分析。</p>
          </div>
          <button onClick={onClose} className="p-3 rounded-full hover:bg-slate-100 transition-colors border border-slate-100">
            <X size={24} className="text-slate-400" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto custom-scrollbar px-12 py-12 space-y-20">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-8 bg-slate-50 rounded-3xl space-y-6">
              <div className="flex items-center gap-3 text-teal-600">
                <Activity size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">频谱采样密度</span>
              </div>
              <div className="space-y-2">
                <div className="text-5xl font-black text-slate-900 tracking-tighter">256<span className="text-xl text-slate-400 font-medium ml-1">bins</span></div>
                <div className="h-1 w-full bg-slate-200 rounded-full overflow-hidden">
                   <div className="h-full bg-teal-500 w-[78%]"></div>
                </div>
              </div>
              <p className="text-[11px] text-slate-500 leading-relaxed font-medium">捕获 20Hz 至 22kHz 范围内的音频振幅变化，并通过非线性插值算法实现平滑过渡。</p>
            </div>
            
            <div className="p-8 bg-slate-50 rounded-3xl space-y-6">
              <div className="flex items-center gap-3 text-teal-600">
                <Cpu size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">渲染流水线负载</span>
              </div>
              <div className="text-5xl font-black text-slate-900 tracking-tighter">14.2<span className="text-xl text-slate-400 font-medium ml-1">ms</span></div>
              <div className="flex items-center gap-2">
                 <span className="w-2 h-2 rounded-full bg-teal-500 animate-pulse"></span>
                 <span className="text-[10px] font-bold text-slate-400 uppercase">GPU 加速模式已开启</span>
              </div>
            </div>

            <div className="p-8 bg-slate-900 text-white rounded-3xl space-y-6 shadow-xl">
              <div className="flex items-center gap-3 text-teal-400">
                <Fingerprint size={18} />
                <span className="text-[10px] font-black uppercase tracking-widest">DNA 匹配率</span>
              </div>
              <div className="text-5xl font-black tracking-tighter">{config.customImage ? '94.2%' : 'BASE'}</div>
              <p className="text-[11px] text-slate-400 leading-relaxed font-medium">视觉算法已成功注入输入媒介的色彩指纹信息，并根据音频脉冲进行实时偏移。</p>
            </div>
          </div>

          <div className="space-y-10">
            <div className="flex items-center gap-6">
              <h3 className="text-sm font-black uppercase tracking-[0.2em] text-slate-400">逻辑演进 / Process Flow</h3>
              <div className="h-px flex-1 bg-slate-100"></div>
            </div>
            <div className="flex flex-col md:flex-row items-center justify-between gap-6 py-6 border-y border-slate-50">
               {['Audio Core', 'FFT Transform', 'Dynamic Field', 'Pixel DNA', 'Final Output'].map((step, idx) => (
                 <React.Fragment key={idx}>
                   <div className="flex flex-col items-center gap-2">
                      <div className="w-12 h-12 rounded-2xl bg-slate-900 text-teal-400 flex items-center justify-center font-bold">{idx+1}</div>
                      <span className="text-[10px] font-black uppercase text-slate-900">{step}</span>
                   </div>
                   {idx < 4 && <ChevronRight className="hidden md:block text-slate-200" size={16} />}
                 </React.Fragment>
               ))}
            </div>
          </div>
        </div>

        <div className="px-12 py-8 bg-slate-50 flex flex-col md:flex-row justify-between items-center border-t border-slate-100">
          <div className="flex items-center gap-4 text-slate-400 mb-4 md:mb-0">
             <Terminal size={14} />
             <span className="text-[10px] font-bold uppercase tracking-wider">SYS_CHECK_SUCCESS // DATA_STREAM_VALID</span>
          </div>
          <button 
            onClick={onClose}
            className="px-12 py-3 bg-slate-900 text-white font-black text-xs uppercase tracking-widest rounded-full hover:bg-teal-600 transition-all shadow-lg hover:shadow-teal-500/20"
          >
            结束审计并返回控制台
          </button>
        </div>
      </div>
    </div>
  );
};

const App: React.FC = () => {
  const [config, setConfig] = useState<VisualizerConfig>({
    particleSize: 40,
    exposure: 75,
    flow: 65,
    inkDensity: 7,
    isAudioPlaying: true,
    style: 'color',
    customImage: null,
    analyser: null
  });

  const [fps, setFps] = useState(60);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const audioContextRef = useRef<AudioContext | null>(null);
  const sourceNodeRef = useRef<AudioBufferSourceNode | null>(null);
  const [audioFileName, setAudioFileName] = useState<string | null>(null);
  const [imageFileName, setImageFileName] = useState<string | null>(null);
  const [qrCodeUrl, setQrCodeUrl] = useState<string>('');

  useEffect(() => {
    const interval = setInterval(() => {
      setFps(prev => 59.6 + Math.random() * 0.4);
    }, 1500);
    
    // 清洗 URL：处理在沙盒环境中可能出现的 'blob:' 前缀
    let currentUrl = window.location.href;
    if (currentUrl.startsWith('blob:')) {
      currentUrl = currentUrl.replace('blob:', '');
    }
    
    // 生成更高清晰度的二维码链接，并移除可能干扰识别的本地前缀
    const finalUrl = currentUrl.split('?')[0]; // 移除查询参数，保持链接简洁
    setQrCodeUrl(`https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=${encodeURIComponent(finalUrl)}&ecc=M&margin=1`);
    
    return () => clearInterval(interval);
  }, []);

  const updateConfig = (key: keyof VisualizerConfig, val: any) => {
    setConfig(prev => ({ ...prev, [key]: val }));
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFileName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        const img = new Image();
        img.onload = () => {
          updateConfig('customImage', img);
        };
        img.src = (event.target?.result as string) || '';
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAudioUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAudioFileName(file.name);
      if (!audioContextRef.current) {
        audioContextRef.current = new (window.AudioContext || (window as any).webkitAudioContext)();
      }
      const ctx = audioContextRef.current;
      if (ctx) {
        const arrayBuffer = await file.arrayBuffer();
        const audioBuffer = await ctx.decodeAudioData(arrayBuffer);
        
        const analyser = ctx.createAnalyser();
        analyser.fftSize = 256;
        updateConfig('analyser', analyser);

        if (sourceNodeRef.current) {
          sourceNodeRef.current.stop();
        }

        const source = ctx.createBufferSource();
        source.buffer = audioBuffer;
        source.loop = true;
        source.connect(analyser);
        analyser.connect(ctx.destination);
        source.start(0);
        sourceNodeRef.current = source;
        updateConfig('isAudioPlaying', true);
      }
    }
  };

  const clearImage = () => {
    updateConfig('customImage', null);
    setImageFileName(null);
  };

  const clearAudio = () => {
    if (sourceNodeRef.current) {
      sourceNodeRef.current.stop();
      sourceNodeRef.current = null;
    }
    updateConfig('analyser', null);
    setAudioFileName(null);
  };

  useEffect(() => {
    if (audioContextRef.current) {
      if (config.isAudioPlaying) {
        audioContextRef.current.resume();
      } else {
        audioContextRef.current.suspend();
      }
    }
  }, [config.isAudioPlaying]);

  return (
    <div className="min-h-screen relative selection:bg-teal-500 selection:text-white pb-24 overflow-x-hidden">
      <DetailReport isOpen={isReportOpen} onClose={() => setIsReportOpen(false)} config={config} />
      
      <div className="max-w-[1300px] mx-auto px-6 lg:px-12 py-16 lg:py-32 space-y-32">
        
        {/* --- Header --- */}
        <header className="relative flex flex-col lg:flex-row gap-20 items-end lg:items-center">
          <div className="flex-1 space-y-12">
            <div className="inline-flex flex-col gap-1">
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-slate-400">Project.Resonance</span>
              <div className="h-0.5 w-1/2 bg-teal-500"></div>
            </div>
            
            <div className="space-y-2">
              <h1 className="hero-title text-[9rem] lg:text-[14rem] font-black text-slate-900 -ml-2 lg:-ml-4">
                声影<br/>
                <span className="title-stroke">共鸣.</span>
              </h1>
              <div className="flex flex-col md:flex-row md:items-end gap-10 mt-12">
                <p className="max-w-md text-xl font-medium text-slate-500 leading-tight">
                   "将不可见的音频波动转化为可感知的数字风景，重构联觉体验的算法叙事。"
                </p>
                <div className="flex flex-col gap-2 border-l border-slate-200 pl-8">
                   <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">System.Build</span>
                   <span className="text-2xl font-black">v3.1.0_PATCH</span>
                </div>
              </div>
            </div>
          </div>

          <div className="w-full lg:w-72 shrink-0 space-y-4">
            <div className="glass-card p-10 rounded-[2.5rem] border-slate-200 space-y-10">
               <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest">FPS_Status</span>
                    <div className="text-4xl font-bold tracking-tighter">{fps.toFixed(1)}</div>
                  </div>
                  <div className="w-10 h-10 rounded-full border border-slate-200 flex items-center justify-center text-teal-500">
                    <Activity size={18} />
                  </div>
               </div>
               <div className="space-y-2">
                 <div className="flex justify-between text-[9px] font-black uppercase text-slate-400">
                    <span>Latency</span>
                    <span>Ultra Low</span>
                 </div>
                 <div className="h-0.5 w-full bg-slate-100 rounded-full">
                    <div className="h-full bg-slate-900 w-[94%]"></div>
                 </div>
               </div>
               <div className="pt-4 border-t border-slate-100 grid grid-cols-2 gap-4">
                  <div>
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Buffer</span>
                    <p className="text-xs font-bold uppercase">1024_S</p>
                  </div>
                  <div>
                    <span className="text-[8px] font-black text-slate-300 uppercase tracking-widest">Engine</span>
                    <p className="text-xs font-bold uppercase">WebGL_2</p>
                  </div>
               </div>
            </div>
          </div>
        </header>

        {/* --- Main Section --- */}
        <main className="space-y-16">
          <div className="relative">
            <Visualizer config={config} />
            <div className="absolute -top-4 -left-4 w-12 h-12 border-t-2 border-l-2 border-slate-900 pointer-events-none"></div>
            <div className="absolute -bottom-4 -right-4 w-12 h-12 border-b-2 border-r-2 border-slate-900 pointer-events-none"></div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            <div className="lg:col-span-8 glass-card p-10 lg:p-12 rounded-[3rem] bg-white/50 space-y-12">
              <div className="flex flex-col md:flex-row justify-between md:items-center gap-8">
                <div className="space-y-1">
                  <h3 className="text-2xl font-black text-slate-900">参数场域调控</h3>
                  <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Dynamics & Physics Parameters</p>
                </div>
                <div className="flex bg-slate-100 p-1 rounded-2xl">
                  <button onClick={() => updateConfig('style', 'color')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${config.style === 'color' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>履彩模式</button>
                  <button onClick={() => updateConfig('style', 'ink')} className={`px-8 py-3 rounded-xl text-[10px] font-black uppercase transition-all ${config.style === 'ink' ? 'bg-white shadow-sm text-slate-900' : 'text-slate-400'}`}>水墨模式</button>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-10 pb-8 border-b border-slate-100">
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <Waves size={16} className="text-teal-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">动力流场强度</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{config.flow}%</span>
                  </div>
                  <input type="range" className="w-full" value={config.flow} onChange={(e) => updateConfig('flow', parseInt(e.target.value))} />
                </div>
                <div className="space-y-6">
                  <div className="flex justify-between items-end">
                    <div className="flex items-center gap-3">
                      <Layers size={16} className="text-teal-500" />
                      <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-900">粒子堆叠精度</span>
                    </div>
                    <span className="text-[10px] font-bold text-slate-400">{config.inkDensity}</span>
                  </div>
                  <input type="range" min="1" max="10" step="0.5" className="w-full" value={config.inkDensity} onChange={(e) => updateConfig('inkDensity', parseFloat(e.target.value))} />
                </div>
              </div>

              <div className="flex flex-col md:flex-row items-center gap-10">
                 <button onClick={() => updateConfig('isAudioPlaying', !config.isAudioPlaying)} className="w-24 h-24 rounded-[2rem] bg-slate-900 text-white flex items-center justify-center hover:bg-teal-600 transition-all shadow-2xl shrink-0 active:scale-90">
                   {config.isAudioPlaying ? <Pause size={36} fill="currentColor" /> : <Play size={36} fill="currentColor" className="ml-2" />}
                 </button>
                 <div className="space-y-2">
                    <div className="flex items-center gap-2">
                       <Zap size={14} className="text-teal-500" />
                       <span className="text-[16px] font-black text-slate-900">实时渲染引擎状态</span>
                    </div>
                    <p className="text-sm text-slate-500 font-normal leading-relaxed max-w-sm">
                      当前采用 WebGL 2.0 后端，支持每帧千万级粒子的位移演算。建议使用高性能 GPU 获取最佳流体体验。
                    </p>
                 </div>
              </div>
            </div>

            <div className="lg:col-span-4 flex flex-col gap-6">
               <div className="flex-1 glass-card p-8 rounded-[2.5rem] bg-white flex flex-col gap-6 group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-slate-900">
                      <ImageIcon size={18} />
                      <span className="text-[11px] font-black uppercase tracking-widest">视觉 DNA 注入</span>
                    </div>
                    {imageFileName && <button onClick={clearImage} className="text-slate-300 hover:text-red-500 transition-colors"><X size={16} /></button>}
                  </div>
                  <label className="flex-1 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center p-6 hover:border-teal-400 hover:bg-teal-50/30 transition-all cursor-pointer">
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                    {imageFileName ? (
                      <div className="text-center space-y-2">
                         <p className="text-xs font-black text-slate-900 truncate max-w-[180px]">{imageFileName}</p>
                         <p className="text-[9px] font-black text-teal-600 uppercase">采样就绪 / DNA_ACTIVE</p>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="text-slate-300 group-hover:text-teal-400 mb-4 transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">注入色彩媒介</span>
                      </>
                    )}
                  </label>
               </div>
               <div className="flex-1 glass-card p-8 rounded-[2.5rem] bg-white flex flex-col gap-6 group">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3 text-slate-900">
                      <MusicIcon size={18} />
                      <span className="text-[11px] font-black uppercase tracking-widest">韵律核心注入</span>
                    </div>
                    {audioFileName && <button onClick={clearAudio} className="text-slate-300 hover:text-red-500 transition-colors"><X size={16} /></button>}
                  </div>
                  <label className="flex-1 border-2 border-dashed border-slate-100 rounded-3xl flex flex-col items-center justify-center p-6 hover:border-teal-400 hover:bg-teal-50/30 transition-all cursor-pointer">
                    <input type="file" accept="audio/*" className="hidden" onChange={handleAudioUpload} />
                    {audioFileName ? (
                      <div className="text-center space-y-2">
                         <p className="text-xs font-black text-slate-900 truncate max-w-[180px]">{audioFileName}</p>
                         <p className="text-[9px] font-black text-teal-600 uppercase">频谱就绪 / FFT_READY</p>
                      </div>
                    ) : (
                      <>
                        <Upload size={24} className="text-slate-300 group-hover:text-teal-400 mb-4 transition-colors" />
                        <span className="text-[10px] font-black uppercase tracking-widest text-slate-400">注入音频信号</span>
                      </>
                    )}
                  </label>
               </div>
            </div>
          </div>
        </main>

        {/* --- System Anatomy --- */}
        <section className="space-y-16">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10">
             <div className="space-y-4">
               <h2 className="text-6xl font-black tracking-tighter text-slate-900 uppercase">系统解构 / System Anatomy</h2>
               <p className="text-lg text-slate-500 font-medium max-w-xl">
                 探究算法底层的逻辑链条，了解声波如何通过傅里叶变换重塑视觉空间的拓扑结构。
               </p>
             </div>
             <div className="flex items-center gap-4 text-slate-300 text-[10px] font-black uppercase tracking-[0.5em]">
                Logic-Link // Analysis
             </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
            {[
              { id: '01', title: '频谱分析与捕获', desc: '利用 Web Audio API 实时监听音频信号的频率能量分布。', icon: Mic },
              { id: '02', title: '向量场位移驱动', desc: '每一个像素微粒均根据低频强度实时改变其在向量场中的动力位置。', icon: Cpu },
              { id: '03', title: '感官联觉渲染', desc: '实现图像色彩数据与声频振幅的深度耦合，达成视听一体的感官体验。', icon: Fingerprint }
            ].map((item, idx) => (
              <div key={idx} className="group p-12 bg-white rounded-[3rem] border border-slate-100 hover:border-teal-500 transition-all duration-700 space-y-12">
                <div className="flex justify-between items-start">
                  <div className="w-16 h-16 rounded-3xl bg-slate-50 flex items-center justify-center text-slate-900 group-hover:bg-teal-500 group-hover:text-white transition-all shadow-sm">
                    <item.icon size={28} />
                  </div>
                  <span className="text-5xl font-black text-slate-100 group-hover:text-teal-100 transition-all">{item.id}.</span>
                </div>
                <div className="space-y-6">
                  <h4 className="text-2xl font-black text-slate-900 uppercase">{item.title}</h4>
                  <p className="text-sm text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
                <button onClick={() => setIsReportOpen(true)} className="flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] text-teal-600 group-hover:translate-x-2 transition-transform">
                  查看详情审计报告 <ChevronRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </section>

        {/* --- Footer --- */}
        <footer className="pt-32 border-t border-slate-200 flex flex-col gap-24">
          <div className="flex flex-col md:flex-row justify-between items-start gap-10">
            <div className="space-y-6 flex-1">
              <h3 className="text-[4rem] font-black tracking-tighter text-slate-900 leading-[1.1]">
                数字化视听实验计划.
              </h3>
              <p className="max-w-xl text-slate-400 font-medium leading-relaxed text-lg">
                探索在计算美学背景下，媒介、技术与感知力之间的融合边界。
                本实验由“声影实验室”发起并执行。
              </p>
            </div>
            <div className="shrink-0 pt-4 flex flex-col items-end gap-6">
              <div className="flex items-center gap-4 bg-white px-8 py-3 rounded-full border border-slate-200 text-[10px] font-black uppercase shadow-sm group hover:border-teal-500 transition-all">
                <Globe size={16} className="text-teal-500 group-hover:rotate-12 transition-transform" /> 
                <span className="tracking-widest">同步节点: EAST_ASIA-C01 / ACTIVE</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row justify-between items-end gap-16 border-b border-slate-100 pb-20">
            <div className="flex flex-wrap gap-20">
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Institution</p>
                <p className="text-2xl font-black text-slate-900">景德镇陶瓷大学</p>
              </div>
              <div className="space-y-3">
                <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.3em]">Department</p>
                <p className="text-2xl font-black text-slate-900">23艺术与科技1班</p>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <span className="text-[11px] font-black text-slate-400 uppercase tracking-[0.4em]">Lead.Designer</span>
              <div className="flex items-baseline gap-4">
                <span className="text-[4.5rem] font-black text-slate-900 leading-none">李季源</span>
                <span className="text-4xl font-normal text-slate-300 tracking-tight">Li Jiyuan</span>
              </div>
            </div>
          </div>

          {/* Bottom Area with QR Code */}
          <div className="flex flex-col lg:flex-row justify-between items-center lg:items-end gap-12 pt-4">
            <div className="flex flex-col gap-8 flex-1">
              <div className="flex flex-col md:flex-row items-center gap-10 text-[10px] font-black uppercase tracking-widest text-slate-400">
                <div className="flex gap-10">
                  {['Github', 'Behance', 'Instagram'].map(link => (
                    <button key={link} className="hover:text-teal-600 transition-colors">{link}</button>
                  ))}
                </div>
                <div className="space-y-1 text-center md:text-left">
                  <p className="text-slate-300">© 2024 声影共鸣实验海报 // 基于开源算法与数字化视听架构</p>
                  <p>All Design & Algorithm Rights Reserved for JCU_ArtTech Lab.</p>
                </div>
              </div>
            </div>

            {/* QR Code Section - Enhanced for scan reliability and sandbox environment */}
            <div className="shrink-0 flex items-center gap-8 p-6 bg-slate-50 rounded-[2rem] border border-slate-100 group hover:border-teal-500 transition-all shadow-sm">
               <div className="flex flex-col items-end gap-1">
                  <span className="text-[10px] font-black text-slate-900 uppercase tracking-[0.2em]">Mobile_Link</span>
                  <span className="text-[8px] font-bold text-slate-400 uppercase tracking-widest">扫码直达本页面</span>
               </div>
               <div className="relative w-32 h-32 bg-white p-3 rounded-2xl border border-slate-200 overflow-hidden group-hover:shadow-2xl transition-all flex items-center justify-center">
                  {qrCodeUrl ? (
                    <img 
                      src={qrCodeUrl} 
                      alt="Scan to open" 
                      className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-700 p-1"
                    />
                  ) : (
                    <div className="w-full h-full bg-slate-100 animate-pulse rounded-lg"></div>
                  )}
                  <div className="absolute inset-0 border-2 border-teal-500/0 group-hover:border-teal-500/20 rounded-2xl pointer-events-none"></div>
               </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default App;
