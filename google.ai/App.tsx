
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI, generateImage } from './services/gemini';
import { DEPLOYMENT_STEPS } from './constants';
import StepCard from './components/StepCard';
import { Message } from './types';

const App: React.FC = () => {
  const [tab, setTab] = useState<'chat' | 'draw' | 'guide'>('chat');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

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
      setError("⚠️ 系统尚未激活：请在 Vercel 环境变量中配置 API_KEY 后重新部署。");
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

  const clearChat = () => {
    if (window.confirm('确定要清空所有对话吗？')) {
      setMessages([]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F8F9FA] text-[#1D1D1F] font-sans">
      {/* 顶部环境装饰 */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 z-50"></div>

      <div className="max-w-3xl mx-auto h-screen flex flex-col p-4 md:p-8 relative">
        {/* 导航与状态 */}
        <header className="flex flex-col sm:flex-row items-center justify-between gap-6 mb-10">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-black rounded-2xl flex items-center justify-center text-white text-xl font-black shadow-xl transform -rotate-3 transition-transform hover:rotate-0">
              A
            </div>
            <div>
              <h1 className="text-xl font-black tracking-tight">AI 创作工坊</h1>
              <div className="flex items-center gap-2">
                <span className={`w-2 h-2 rounded-full ${isKeyMissing ? 'bg-amber-400 animate-pulse' : 'bg-emerald-500'}`}></span>
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">
                  {isKeyMissing ? '等待激活' : '系统在线'}
                </span>
              </div>
            </div>
          </div>

          <nav className="flex bg-white p-1.5 rounded-[1.5rem] shadow-sm border border-slate-100">
            {(['chat', 'draw', 'guide'] as const).map(t => (
              <button
                key={t}
                onClick={() => setTab(t)}
                className={`px-6 py-2.5 rounded-xl text-xs font-black transition-all duration-300 ${
                  tab === t ? 'bg-black text-white shadow-lg' : 'text-slate-400 hover:text-slate-600 hover:bg-slate-50'
                }`}
              >
                {t === 'chat' ? '智能对话' : t === 'draw' ? '创意绘图' : '部署指南'}
              </button>
            ))}
          </nav>
        </header>

        {/* 核心内容区 */}
        <main ref={scrollRef} className="flex-1 overflow-y-auto custom-scrollbar px-1 space-y-6 pb-28">
          {tab === 'guide' ? (
            <div className="space-y-6 animate-fade">
              <div className="bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm mb-6">
                <h2 className="text-2xl font-black mb-4 flex items-center gap-3">
                  <span className="text-3xl">🌍</span> 分享给全世界
                </h2>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  只需完成以下三个简单的配置步骤，你就能拥有一个永久在线的个人 AI 网页。
                </p>
              </div>
              {DEPLOYMENT_STEPS.map(step => (
                <StepCard key={step.id} step={step as any} isActive={true} onSelect={() => {}} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {messages.length === 0 && !loading && (
                <div className="py-24 text-center opacity-40 animate-fade">
                  <div className="w-24 h-24 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 shadow-inner">
                    <span className="text-5xl">🎨</span>
                  </div>
                  <h3 className="text-sm font-black text-slate-400 tracking-[0.3em] uppercase">准备好开始了吗？</h3>
                </div>
              )}
              
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade`}>
                  <div className={`max-w-[88%] p-6 rounded-[2rem] shadow-sm transition-all hover:shadow-md ${
                    msg.role === 'user' 
                      ? 'bg-black text-white rounded-br-none' 
                      : 'bg-white border border-slate-100 text-[#333] rounded-bl-none'
                  }`}>
                    {msg.type === 'image' ? (
                      <div className="space-y-4">
                        <img src={msg.content} className="rounded-2xl w-full h-auto shadow-xl border-4 border-white" alt="AI Generated" />
                        <a href={msg.content} download="ai-art.png" className="block text-[10px] text-right font-bold text-indigo-500 uppercase hover:underline">下载原图</a>
                      </div>
                    ) : (
                      <p className="text-[15px] leading-relaxed font-medium whitespace-pre-wrap">{msg.content}</p>
                    )}
                  </div>
                </div>
              ))}
              
              {loading && (
                <div className="flex justify-start pl-2">
                  <div className="flex gap-1.5 p-4 bg-slate-100 rounded-2xl rounded-bl-none">
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0s' }}></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-1.5 h-1.5 bg-slate-300 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              )}
              
              {error && (
                <div className="p-5 bg-red-50 text-red-500 rounded-2xl text-[13px] font-bold border border-red-100 flex items-center gap-4 animate-fade">
                  <span className="text-lg">❌</span> {error}
                </div>
              )}
            </div>
          )}
        </main>

        {/* 底部浮动控制栏 */}
        {tab !== 'guide' && (
          <footer className="fixed bottom-8 left-4 right-4 max-w-3xl mx-auto z-40">
            <div className="flex items-center gap-3">
              <button 
                onClick={clearChat}
                className="w-14 h-14 bg-white border border-slate-100 rounded-full flex items-center justify-center text-slate-400 hover:text-red-500 transition-colors shadow-lg hover:shadow-xl active:scale-90"
                title="清空对话"
              >
                <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
              
              <div className="flex-1 bg-white/90 backdrop-blur-xl p-2 rounded-[3rem] flex items-center gap-2 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.12)] border border-white/50">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && handleSend()}
                  placeholder={tab === 'chat' ? "发送一条消息..." : "描述你想画的画面..."}
                  className="flex-1 bg-transparent px-6 py-4 outline-none text-[15px] font-bold text-slate-700 placeholder-slate-300"
                />
                <button
                  onClick={handleSend}
                  disabled={loading || !input.trim()}
                  className="bg-black text-white w-14 h-14 rounded-full flex items-center justify-center hover:scale-105 transition-all active:scale-95 disabled:opacity-10 shadow-lg"
                >
                  <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>
          </footer>
        )}
      </div>
    </div>
  );
};

export default App;
