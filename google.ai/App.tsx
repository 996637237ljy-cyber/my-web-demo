import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI, generateImage } from './services/gemini';
import { DEPLOYMENT_STEPS } from './app-config';
import StepCard from './components/StepCard';
import { Message } from './types';

const App: React.FC = () => {
  const [tab, setTab] = useState<'chat' | 'draw' | 'guide'>('chat');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 检查 API KEY
  const isKeyMissing = !process.env.API_KEY || process.env.API_KEY === 'undefined' || process.env.API_KEY === '';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  useEffect(() => {
    if (isKeyMissing) setTab('guide');
  }, [isKeyMissing]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    if (isKeyMissing) {
      setError("⚠️ 系统尚未激活：请在 Vercel 环境变量中配置 API_KEY。");
      setTab('guide');
      return;
    }

    const userMsg = input;
    setInput('');
    setError(null);
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    try {
      if (tab === 'chat') {
        const res = await chatWithAI(userMsg);
        setMessages(prev => [...prev, { role: 'ai', content: res, type: 'text' }]);
      } else {
        const url = await generateImage(userMsg);
        setMessages(prev => [...prev, { role: 'ai', content: url, type: 'image' }]);
      }
    } catch (err: any) {
      setError(err.message || "请求出错了，请稍后再试。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1D1D1F]">
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-500 to-purple-500 z-50"></div>

      <div className="max-w-3xl mx-auto h-screen flex flex-col p-4 md:p-8">
        <header className="flex items-center justify-between mb-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-black rounded-xl flex items-center justify-center text-white font-bold shadow-lg">A</div>
            <h1 className="font-black text-lg tracking-tight">AI WORKSHOP</h1>
          </div>
          <nav className="flex bg-white p-1 rounded-2xl shadow-sm border border-slate-100">
            {(['chat', 'draw', 'guide'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-5 py-2 rounded-xl text-xs font-bold transition-all ${
                  tab === t ? 'bg-black text-white shadow-md' : 'text-slate-400 hover:bg-slate-50'
                }`}
              >
                {t === 'chat' ? '对话' : t === 'draw' ? '绘图' : '指南'}
              </button>
            ))}
          </nav>
        </header>

        <main ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar space-y-6 pb-32">
          {tab === 'guide' ? (
            <div className="space-y-6 animate-fade">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm">
                <h2 className="text-xl font-black mb-2">🚀 部署上线指南</h2>
                <p className="text-slate-500 text-sm">如果你看到这个界面，说明网页已成功运行。接下来只需一步即可激活 AI 功能：</p>
              </div>
              {DEPLOYMENT_STEPS.map(step => (
                <StepCard key={step.id} step={step as any} isActive={true} onSelect={() => {}} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {messages.length === 0 && !loading && (
                <div className="py-20 text-center opacity-30">
                  <span className="text-6xl block mb-4">✨</span>
                  <p className="text-sm font-bold tracking-widest text-slate-400 uppercase">等待指令...</p>
                </div>
              )}
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade`}>
                  <div className={`max-w-[85%] p-5 rounded-[1.5rem] shadow-sm ${
                    msg.role === 'user' ? 'bg-black text-white' : 'bg-white border border-slate-100'
                  }`}>
                    {msg.type === 'image' ? <img src={msg.content} className="rounded-lg w-full" /> : <p className="text-sm font-medium leading-relaxed">{msg.content}</p>}
                  </div>
                </div>
              ))}
              {loading && <div className="p-4 bg-slate-100 rounded-2xl w-fit animate-pulse text-xs font-bold text-slate-400">AI 正在响应...</div>}
              {error && <div className="p-4 bg-red-50 text-red-500 rounded-2xl text-xs font-bold border border-red-100">{error}</div>}
            </div>
          )}
        </main>

        {tab !== 'guide' && (
          <footer className="fixed bottom-8 left-4 right-4 max-w-3xl mx-auto">
            <div className="bg-white/80 backdrop-blur-xl p-2 rounded-[2.5rem] flex items-center gap-2 shadow-2xl border border-white">
              <input
                type="text"
                value={input}
                onChange={e => setInput(e.target.value)}
                onKeyDown={e => e.key === 'Enter' && handleSend()}
                placeholder="在此输入..."
                className="flex-1 px-6 py-4 outline-none text-sm font-medium"
              />
              <button onClick={handleSend} className="bg-black text-white px-8 py-4 rounded-[2rem] text-sm font-bold hover:scale-105 active:scale-95 transition-transform">
                发送
              </button>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;
