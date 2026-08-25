'use client';

import { useState } from 'react';
import './globals.css';

export default function Home() {
  const [prompt, setPrompt] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isLoginView, setIsLoginView] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [user, setUser] = useState<{ email: string; name: string } | null>(null);
  const [showWelcomeIntro, setShowWelcomeIntro] = useState(false);

  const handleAskAI = async () => {
    if (!prompt.trim()) return;
    setLoading(true);
    setResponse('');
    
    const apiKey = 'AQ.Ab8RN6Ka1ALsDZeJMin2glATXL9GUoKablCPi9IS6L5TWgWluA';
    
    try {
      const res = await fetch(
        `https://generativelanguage.googleapis.com/v1beta/models/gemini-3.6-flash:generateContent?key=${apiKey}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            contents: [{ parts: [{ text: `Đóng vai siêu trí tuệ AI và chuyên gia giáo dục, hãy phân tích vấn đề học tập này và lập chiến lược tối ưu bằng tiếng Việt: ${prompt}` }] }],
          }),
        }
      );

      const data = await res.json();
      if (data.candidates && data.candidates[0]?.content?.parts[0]?.text) {
        setResponse(data.candidates[0].content.parts[0].text);
      } else {
        setResponse('Không thể phân tích dữ liệu.');
      }
    } catch (error: any) {
      setResponse('Lỗi kết nối: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleAuthSubmit = () => {
    if (!email.trim()) return;
    const username = email.split('@')[0];
    setUser({ email, name: username });
    setShowAuthModal(false);
    setShowWelcomeIntro(true);
  };

  return (
    <div className="min-h-screen bg-[#0b0f19] text-gray-100 font-sans selection:bg-cyan-500 selection:text-black relative">
      
      {showWelcomeIntro && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-gradient-to-b from-gray-900 to-black border border-cyan-500/50 w-full max-w-lg rounded-3xl p-8 shadow-2xl space-y-6 text-center relative">
            <div className="w-16 h-16 bg-cyan-500/10 border border-cyan-500/30 text-cyan-400 rounded-2xl flex items-center justify-center mx-auto text-3xl shadow-lg shadow-cyan-500/20">
              🚀
            </div>
            <div className="space-y-2">
              <span className="text-xs uppercase tracking-widest text-cyan-400 font-bold">Xác thực thành công</span>
              <h2 className="text-2xl font-black text-white">Chào mừng, {user?.name} đến với ZEROTUHOC!</h2>
              <p className="text-sm text-gray-400 leading-relaxed pt-2">
                Hệ thống đã mở khóa toàn bộ kho tàng AI Engine, công cụ giải bài và kho tài nguyên vận dụng cao tốc độ cao.
              </p>
            </div>
            <button
              onClick={() => setShowWelcomeIntro(false)}
              className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded-2xl text-sm shadow-lg shadow-cyan-500/20 transition-all"
            >
              Bắt đầu Trải nghiệm Ngay
            </button>
          </div>
        </div>
      )}

      <header className="sticky top-0 z-40 bg-[#0b0f19]/80 backdrop-blur-md border-b border-gray-800 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black flex items-center justify-center font-black text-xl shadow-lg shadow-cyan-500/20">
            ⚡
          </div>
          <span className="font-black text-xl tracking-wider bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            ZEROTUHOC
          </span>
        </div>

        <div>
          {user ? (
            <div className="flex items-center gap-3 bg-gray-900/90 border border-gray-800 px-4 py-1.5 rounded-2xl">
              <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-cyan-500 to-blue-600 text-black font-black flex items-center justify-center text-sm">
                {user.name.charAt(0).toUpperCase()}
              </div>
              <div className="text-left hidden sm:block">
                <p className="text-xs font-bold text-white leading-tight">{user.name}</p>
                <p className="text-[10px] text-cyan-400 font-mono">Thành viên Pro</p>
              </div>
              <button onClick={() => setUser(null)} className="ml-2 text-xs text-gray-500 hover:text-red-400">✕</button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button onClick={() => { setIsLoginView(true); setShowAuthModal(true); }} className="px-4 py-2 text-sm font-semibold text-gray-300 hover:text-cyan-400">Đăng nhập</button>
              <button onClick={() => { setIsLoginView(false); setShowAuthModal(true); }} className="px-5 py-2 text-sm font-bold bg-cyan-500 hover:bg-cyan-400 text-black rounded-xl shadow-lg shadow-cyan-500/20">Đăng ký</button>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-12 space-y-12">
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-400 text-xs font-semibold">
            <span>🔥</span> HỆ THỐNG HỌC TẬP & CÔNG NGHỆ THẾ HỆ MỚI
          </div>
          <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white">
            Làm chủ tri thức <span className="text-cyan-400">tốc độ cao</span>
          </h1>
          <p className="text-gray-400 max-w-lg mx-auto text-sm md:text-base">
            Nền tảng tự học tích hợp trợ lý AI thông minh, tìm phương pháp học chuyên sâu, kho đề thi và công cụ tối ưu miễn phí.
          </p>
        </div>

        <div className="max-w-2xl mx-auto bg-gray-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-cyan-900/40 p-6 md:p-8 space-y-6 relative">
          <div className="text-center space-y-2">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-cyan-950 text-cyan-400 text-xs font-semibold border border-cyan-800/50">
              🎯 AI Trợ Lý Tìm Phương Pháp Học
            </span>
            <h2 className="text-xl font-bold text-white">Bạn đang gặp khó khăn gì trong việc học?</h2>
          </div>

          <div className="space-y-4">
            <textarea
              rows={3}
              className="w-full p-4 rounded-2xl bg-black/50 border border-gray-800 text-sm focus:outline-none focus:ring-2 focus:ring-cyan-500 text-white placeholder:text-gray-600 resize-none"
              placeholder="Ví dụ: Tớ học trước quên sau, hay mất tập trung khi học Toán..."
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
            />
            <button
              onClick={handleAskAI}
              disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 text-black font-extrabold rounded-2xl text-sm shadow-lg shadow-cyan-500/20"
            >
              {loading ? 'Đang phân tích...' : '⚡ Phân tích & Gợi ý phương pháp'}
            </button>
          </div>

          {response && (
            <div className="p-5 bg-black/60 border border-cyan-900/50 rounded-2xl space-y-2">
              <h3 className="text-xs font-bold text-cyan-400 uppercase tracking-widest">Phương pháp tối ưu từ AI:</h3>
              <div className="text-sm text-gray-200 whitespace-pre-wrap font-mono">{response}</div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-bold text-white px-2">Danh mục chuyên sâu</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {[
              { title: 'Tìm PP học', desc: 'Trợ lý AI phân tích phương pháp...', icon: '🎯' },
              { title: 'Vận dụng cao', desc: 'Hệ thống bài tập đỉnh cao...', icon: '🚀' },
              { title: 'Tài liệu Pro', desc: 'Kho tàng mã nguồn & đề thi', icon: '📂' },
              { title: 'Công cụ nhanh', desc: 'Tra cứu thông số tức thì', icon: '⚡' },
              { title: 'Luyện đề ảo', desc: 'Mô phỏng phòng thi thực chiến', icon: '📝' },
              { title: 'Trò chơi trí tuệ', desc: 'Cờ vua, giải mã logic...', icon: '🧩' },
            ].map((item, idx) => (
              <div key={idx} className="bg-gray-900/50 p-5 rounded-2xl border border-gray-800/80 hover:border-cyan-500/50 transition-all cursor-pointer space-y-2">
                <span className="text-2xl">{item.icon}</span>
                <h4 className="font-bold text-white text-sm">{item.title}</h4>
                <p className="text-xs text-gray-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </main>

      {showAuthModal && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-gray-900 w-full max-w-sm rounded-3xl p-6 shadow-2xl space-y-6 relative border border-gray-800">
            <button onClick={() => setShowAuthModal(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">✕</button>

            <div className="text-center space-y-1">
              <h2 className="text-xl font-black text-white">{isLoginView ? 'Truy cập Zerotuhoc' : 'Khởi tạo tài khoản'}</h2>
            </div>

            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Tài khoản Email</label>
                <input type="email" className="w-full p-3 rounded-xl bg-black/60 border border-gray-800 text-sm text-white focus:outline-none focus:border-cyan-500" placeholder="nhap@email.com" value={email} onChange={(e) => setEmail(e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-300">Mật khẩu</label>
                <input type="password" className="w-full p-3 rounded-xl bg-black/60 border border-gray-800 text-sm text-white focus:outline-none focus:border-cyan-500" placeholder="••••••••" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <button onClick={handleAuthSubmit} className="w-full py-3.5 bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold rounded-xl text-sm shadow-lg shadow-cyan-500/20">
                {isLoginView ? 'Xác thực Đăng nhập' : 'Hoàn tất Đăng ký'}
              </button>
            </div>
            
            <div className="text-center text-xs text-gray-400">
              <button onClick={() => setIsLoginView(!isLoginView)} className="font-bold text-cyan-400 hover:underline">
                {isLoginView ? 'Chưa có tài khoản? Đăng ký ngay' : 'Đã có tài khoản? Đăng nhập'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
