
import React, { useState, useRef, useEffect } from 'react';
import { chatWithAI, generateImage } from './services/gemini';
import { DEPLOYMENT_STEPS } from './constants';
import StepCard from './components/StepCard';

const App: React.FC = () => {
  const [tab, setTab] = useState<'chat' | 'draw' | 'guide'>('chat');
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  // 关键：检测环境变量。在本地环境下 process.env.API_KEY 可能不可用，但在 Vercel 部署后会生效
  const isKeyMissing = !process.env.API_KEY || process.env.API_KEY === 'undefined' || process.env.API_KEY === '';

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, loading]);

  // 如果没有配置 Key，默认显示教程页
  useEffect(() => {
    if (isKeyMissing) {
      setTab('guide');
    }
  }, [isKeyMissing]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    if (isKeyMissing) {
      setError("🛑 部署未激活：请先在 Vercel 后台配置 API_KEY，然后重新发布。");
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
      console.error(err);
      setError(err.message || "请求失败，可能是 API Key 过期或网络不稳定。");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-screen max-w-4xl mx-auto px-4 py-4 md:py-8 bg-transparent">
      {/* 顶部醒目提示 */}
      {isKeyMissing && (
        <div className="mb-4 p-4 bg-indigo-600 text-white rounded-3xl shadow-xl flex items-center justify-between animate-bounce">
          <div className="flex items-center gap-3">
            <span className="text-2xl">💡</span>
            <p className="text-xs md:text-sm font-black">最后一步：配置 API Key 即可点亮你的 AI 空间！</p>
          </div>
          <button onClick={() => setTab('guide')} className="bg-white text-indigo-600 px-4 py-1.5 rounded-full text-xs font-black hover:bg-opacity-90">去配置</button>
        </div>
      )}

      {/* 导航头 */}
      <header className="glass-card p-4 rounded-[2.5rem] flex flex-col md:flex-row items-center justify-between gap-4 mb-6 transition-all duration-500 hover:shadow-2xl">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 bg-gradient-to-br from-indigo-500 to-purple-600 rounded-2xl flex items-center justify-center text-white text-2xl font-black shadow-lg transform -rotate-3 hover:rotate-0 transition-transform">
            AI
          </div>
          <div>
            <h1 className="text-xl font-black text-slate-800 tracking-tight">灵感实验室</h1>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
              <span className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">Global Live v2.5</span>
            </div>
          </div>
        </div>

        <nav className="flex bg-slate-100/80 p-1.5 rounded-[1.5rem] border border-slate-200/50">
          {(['chat', 'draw', 'guide'] as const).map(t => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-6 py-2.5 rounded-2xl text-xs font-black transition-all duration-300 ${
                tab === t ? 'bg-white text-indigo-600 shadow-md scale-105' : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              {t === 'chat' ? '智能对话' : t === 'draw' ? 'AI 绘图' : '部署指南'}
            </button>
          ))}
        </nav>
      </header>

      {/* 内容主体 */}
      <main ref={scrollRef} className="flex-1 overflow-y-auto mb-6 px-2 custom-scrollbar space-y-6">
        {tab === 'guide' ? (
          <div className="max-w-2xl mx-auto space-y-6 animate-fade pb-10">
            <div className="text-center py-8">
              <div className="inline-flex items-center justify-center w-20 h-20 bg-indigo-50 rounded-[2.5rem] mb-6 shadow-inner">
                <span className="text-4xl">🚀</span>
              </div>
              <h2 className="text-2xl font-black text-slate-800">5 分钟上线你的 AI 网页</h2>
              <p className="text-slate-500 text-sm mt-2 font-medium">配置完成后，全球用户都能通过你的链接访问</p>
            </div>
            {DEPLOYMENT_STEPS.map(step => (
              <StepCard key={step.id} step={step as any} isActive={true} onSelect={() => {}} />
            ))}
            <div className="p-8 bg-slate-900 rounded-[2.5rem] text-white shadow-2xl mt-10 group overflow-hidden relative">
               <div className="absolute top-0 right-0 p-4 opacity-10 text-8xl group-hover:scale-110 transition-transform">✨</div>
               <h4 className="font-black text-xl mb-3 relative z-10">🎉 恭喜！你离成功只差一次 Redeploy</h4>
               <p className="text-slate-400 text-sm leading-relaxed relative z-10">
                 在 Vercel 环境设置里添加完 <b>API_KEY</b> 后，记得去 <b>Deployments</b> 点击 <b>Redeploy</b>。搞定后刷新本页，AI 就会立刻苏醒！
               </p>
            </div>
          </div>
        ) : (
          <div className="flex flex-col space-y-6 pb-4">
            {messages.length === 0 && (
              <div className="h-full flex flex-col items-center justify-center text-center py-24 animate-fade opacity-50">
                <div className="w-24 h-24 bg-slate-50 rounded-full flex items-center justify-center text-5xl mb-8 shadow-inner grayscale">🛸</div>
                <h3 className="font-black text-2xl text-slate-400">准备好开始创作了吗？</h3>
              </div>
            )}
            
            {messages.map((msg, i) => (
              <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade`}>
                <div className={`max-w-[88%] p-6 rounded-[2.5rem] shadow-sm transition-all hover:shadow-md ${
                  msg.role === 'user' 
                    ? 'bg-indigo-600 text-white rounded-br-none' 
                    : 'bg-white border border-slate-100 text-slate-800 rounded-bl-none glass-card'
                }`}>
                  {msg.type === 'image' ? (
                    <div className="space-y-3">
                      <img src={msg.content} className="rounded-2xl w-full h-auto shadow-xl" alt="AI 画作" />
                      <p className="text-[10px] font-bold opacity-50 text-right">GEN-IMAGE-STABLE</p>
                    </div>
                  ) : (
                    <p className="text-[15px] leading-relaxed font-medium whitespace-pre-wrap">{msg.content}</p>
                  )}
                </div>
              </div>
            ))}
            
            {loading && (
              <div className="flex justify-start animate-pulse">
                <div className="bg-slate-100 px-6 py-4 rounded-[2rem] rounded-bl-none text-[11px] font-black text-slate-400 tracking-tighter">
                  GENAI PROCESS...
                </div>
              </div>
            )}
            
            {error && (
              <div className="p-5 bg-red-50 text-red-600 rounded-[2rem] text-xs font-bold border border-red-100 flex items-center gap-3 animate-headShake">
                <span className="text-xl">⚠️</span>
                <span>{error}</span>
              </div>
            )}
          </div>
        )}
      </main>

      {/* 底部输入框 */}
      {tab !== 'guide' && (
        <footer className="glass-card p-2 rounded-[3rem] flex items-center gap-2 shadow-2xl relative">
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && handleSend()}
            placeholder={tab === 'chat' ? "问我任何问题..." : "输入关键词，我来为你画图..."}
            className="flex-1 bg-transparent px-8 py-5 outline-none text-[15px] font-bold text-slate-700 placeholder-slate-300"
          />
          <button
            onClick={handleSend}
            disabled={loading || !input.trim()}
            className="bg-indigo-600 text-white w-14 h-14 rounded-full flex items-center justify-center hover:bg-indigo-700 transition-all active:scale-90 disabled:opacity-10 shadow-xl group"
          >
            {loading ? (
              <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            ) : (
              <svg className="w-6 h-6 transform group-hover:rotate-12 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            )}
          </button>
        </footer>
      )}
    </div>
  );
};

export default App;
