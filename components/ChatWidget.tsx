'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  time: string;
}

const STORAGE_KEY = 'vibecaffe_chat';
const MAX_STORED = 20;

const INITIAL_MESSAGE: Message = {
  role: 'assistant',
  content: 'Bună! Ce pot să-ți pregătesc azi de la Vibe Caffè?',
  time: '',
};

function getTime(): string {
  return new Date().toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit', hour12: false });
}

const INITIAL_QUICK_REPLIES = ['Ce mai e bun?', 'Surprinde-mă', 'Vreau să rezerv', 'Când sunteți deschis?'];

function renderContent(text: string): React.ReactNode {
  const linkRegex = /\[([^\]]+)\]\(([^)]+)\)/g;
  const result: React.ReactNode[] = [];
  let lastIndex = 0;
  let match: RegExpExecArray | null;

  while ((match = linkRegex.exec(text)) !== null) {
    if (match.index > lastIndex) {
      result.push(text.slice(lastIndex, match.index));
    }
    result.push(
      <a
        key={match.index}
        href={match[2]}
        className="underline font-semibold hover:opacity-75 transition-opacity"
      >
        {match[1]}
      </a>
    );
    lastIndex = match.index + match[0].length;
  }

  if (lastIndex < text.length) {
    result.push(text.slice(lastIndex));
  }

  return result.length > 0 ? <>{result}</> : text;
}

function getContextualSuggestions(lastBotMsg: string): string[] {
  const msg = lastBotMsg.toLowerCase();

  if (
    msg.includes('espresso') || msg.includes('latte') || msg.includes('cappuccino') ||
    msg.includes('cafea') || msg.includes('meniu') || msg.includes('specialty') ||
    msg.includes('recomand')
  ) {
    return ['Ceva vegan?', 'Ce dulce mai aveți?', 'Ceva rece?'];
  }
  if (msg.includes('rezerv')) {
    return ['Vreau să rezerv', 'Câte locuri aveți?'];
  }
  if (msg.includes('vegan') || msg.includes('ovăz') || msg.includes('plant')) {
    return ['Cel mai bun vegan', 'Ceva rece vegan', 'Ce dulce mai aveți?'];
  }
  if (
    msg.includes('dulce') || msg.includes('patiserie') || msg.includes('croissant') ||
    msg.includes('brownie') || msg.includes('cheesecake') || msg.includes('ecler')
  ) {
    return ['Ceva vegan?', 'Ceva rece?', 'Surprinde-mă'];
  }
  if (msg.includes('program') || msg.includes('deschis') || msg.includes('închis') || msg.includes('orar')) {
    return ['Unde vă găsim?', 'Vreau să rezerv'];
  }

  return ['Ce mai e bun?', 'Surprinde-mă', 'Vreau să rezerv'];
}

interface CtaAction {
  label: string;
  onClick: () => void;
}

function getCtaActions(message: string): CtaAction[] {
  const msg = message.toLowerCase();
  const actions: CtaAction[] = [];

  if (msg.includes('rezerv')) {
    actions.push({
      label: 'Rezervă o masă →',
      onClick: () => { window.location.href = '/rezervari'; },
    });
  }
  if (
    msg.includes('meniu') || msg.includes('espresso') || msg.includes('cappuccino') ||
    msg.includes('latte') || msg.includes('cold brew') || msg.includes('patiserie')
  ) {
    actions.push({
      label: 'Vezi meniul →',
      onClick: () => {
        const el = document.getElementById('meniu');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.location.href = '/#meniu';
      },
    });
  }
  if (
    msg.includes('locați') || msg.includes('adres') || msg.includes('piezișa') ||
    msg.includes('cluj') || msg.includes('hartă') || msg.includes('găsim')
  ) {
    actions.push({
      label: 'Găsește-ne →',
      onClick: () => {
        const el = document.getElementById('locatie');
        if (el) el.scrollIntoView({ behavior: 'smooth' });
        else window.location.href = '/#locatie';
      },
    });
  }

  return actions.slice(0, 2);
}

export default function ChatWidget() {
  const [isOpen, setIsOpen] = useState(false);
  const [chatVisible, setChatVisible] = useState(false);
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);
  const [showSuggestions, setShowSuggestions] = useState(true);
  const [userTyped, setUserTyped] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isOpenRef = useRef(isOpen);

  useEffect(() => { isOpenRef.current = isOpen; }, [isOpen]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as Message[];
        if (Array.isArray(parsed) && parsed.length > 0) setMessages(parsed);
      }
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(messages.slice(-MAX_STORED)));
    } catch {}
  }, [messages]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => setChatVisible(true), 20);
      return () => clearTimeout(t);
    } else {
      setChatVisible(false);
    }
  }, [isOpen]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, loading]);

  useEffect(() => {
    if (isOpen) {
      const t = setTimeout(() => inputRef.current?.focus(), 300);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleOpen = () => {
    setIsOpen(true);
    setUnreadCount(0);
  };

  const handleReset = () => {
    setMessages([{ ...INITIAL_MESSAGE, time: getTime() }]);
    setShowSuggestions(true);
    setUserTyped(false);
    try { localStorage.removeItem(STORAGE_KEY); } catch {}
  };

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMessage: Message = { role: 'user', content: trimmed, time: getTime() };
    const updatedMessages = [...messages, userMessage];

    setMessages(updatedMessages);
    setInput('');
    setLoading(true);
    setShowSuggestions(false);
    setUserTyped(false);

    try {
      const now = new Date();
      const localTime = now.toLocaleTimeString('ro-RO', { hour: '2-digit', minute: '2-digit', hour12: false });
      const localDay = now.toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' });

      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: updatedMessages, localTime, localDay }),
      });

      if (!res.ok || !res.body) throw new Error('Stream error');

      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      const botTime = getTime();
      let fullContent = '';
      let buffer = '';

      setMessages(prev => [...prev, { role: 'assistant', content: '', time: botTime }]);
      setLoading(false);

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        buffer += decoder.decode(value, { stream: true });
        const lines = buffer.split('\n');
        buffer = lines.pop() ?? '';

        for (const line of lines) {
          if (!line.startsWith('data: ')) continue;
          const data = line.slice(6).trim();
          if (!data) continue;

          try {
            const parsed = JSON.parse(data);
            if (parsed.type === 'content_block_delta' && parsed.delta?.type === 'text_delta') {
              fullContent += parsed.delta.text;
              const captured = fullContent;
              setMessages(prev => {
                const updated = [...prev];
                updated[updated.length - 1] = { role: 'assistant', content: captured, time: botTime };
                return updated;
              });
            }
          } catch {}
        }
      }

      setShowSuggestions(true);
      if (!isOpenRef.current) setUnreadCount(prev => prev + 1);

    } catch {
      setMessages(prev => [...prev, {
        role: 'assistant',
        content: 'Nu am putut răspunde acum. Mai încearcă o dată sau sună-ne la 0740 000 000.',
        time: getTime(),
      }]);
      setLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  };

  const lastBotContent = [...messages].reverse().find(m => m.role === 'assistant')?.content ?? '';
  const suggestions = getContextualSuggestions(lastBotContent);
  const ctaActions = getCtaActions(lastBotContent);

  return (
    <>
      {/* ── Buton flotant ───────────────────────────────────── */}
      <button
        onClick={isOpen ? () => setIsOpen(false) : handleOpen}
        aria-label={isOpen ? 'Închide chat' : 'Deschide chat'}
        className={`fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-[#3D2314] hover:bg-[#2C1508] text-white shadow-lg hover:shadow-xl transition-all duration-300 flex items-center justify-center hover:scale-110 ${!isOpen ? 'animate-pulse' : ''}`}
      >
        {unreadCount > 0 && !isOpen && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-bold">
            {unreadCount}
          </span>
        )}
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
          </svg>
        )}
      </button>

      {/* ── Fereastra chat ───────────────────────────────────── */}
      {isOpen && (
        <div
          className={`
            fixed z-50 bg-white flex flex-col overflow-hidden
            border border-gray-100 shadow-2xl
            transition-all duration-300 ease-out
            ${chatVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}
            inset-0 rounded-none
            sm:inset-auto sm:bottom-24 sm:right-6 sm:w-[370px] sm:max-h-[600px] sm:rounded-2xl
          `}
        >
          {/* Header */}
          <div className="bg-[#3D2314] px-5 py-4 flex items-center gap-3 flex-shrink-0">
            <div className="w-9 h-9 rounded-full bg-[#2C1508] flex items-center justify-center text-lg flex-shrink-0">
              ☕
            </div>
            <div className="flex-1 min-w-0">
              <p className="font-bold text-white text-sm" style={{ fontFamily: 'var(--font-heading)' }}>
                Barista Vibe Caffè
              </p>
              <p className="text-white/70 text-xs">Întreabă-mă orice</p>
            </div>
            <button
              onClick={handleReset}
              title="Conversație nouă"
              className="w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[#2C1508] transition-colors flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
            </button>
            {/* Buton închide vizibil pe mobile */}
            <button
              onClick={() => setIsOpen(false)}
              className="sm:hidden w-8 h-8 rounded-full flex items-center justify-center text-white/70 hover:text-white hover:bg-[#2C1508] transition-colors flex-shrink-0"
              aria-label="Închide chat"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Mesaje */}
          <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3 bg-gray-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex items-end gap-2 ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                {msg.role === 'assistant' && (
                  <div className="w-6 h-6 rounded-full bg-[#F5EDE6] flex items-center justify-center text-xs flex-shrink-0 mb-4">
                    ☕
                  </div>
                )}

                <div className={`flex flex-col gap-1 max-w-[78%] ${msg.role === 'user' ? 'items-end' : 'items-start'}`}>
                  <div
                    className={`px-4 py-2.5 rounded-2xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-[#3D2314] text-white rounded-br-sm'
                        : 'bg-white text-gray-800 shadow-sm border border-gray-100 rounded-bl-sm'
                    }`}
                  >
                    {msg.content
                      ? renderContent(msg.content)
                      : <span className="inline-block w-1.5 h-4 bg-[#3D2314] rounded-sm animate-pulse" />
                    }
                  </div>

                  {/* CTA buttons */}
                  {msg.role === 'assistant' &&
                    i === messages.length - 1 &&
                    msg.content &&
                    ctaActions.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-0.5">
                        {ctaActions.map((action) => (
                          <button
                            key={action.label}
                            onClick={action.onClick}
                            className="text-xs px-3 py-1.5 rounded-full bg-[#3D2314] text-white hover:bg-[#2C1508] transition-colors font-medium"
                          >
                            {action.label}
                          </button>
                        ))}
                      </div>
                    )}

                  {msg.time && (
                    <span className="text-[10px] text-gray-400">{msg.time}</span>
                  )}
                </div>
              </div>
            ))}

            {/* Typing indicator */}
            {loading && (
              <div className="flex items-end gap-2 justify-start">
                <div className="w-6 h-6 rounded-full bg-[#F5EDE6] flex items-center justify-center text-xs flex-shrink-0">
                  ☕
                </div>
                <div className="bg-white border border-gray-100 shadow-sm px-4 py-3 rounded-2xl rounded-bl-sm">
                  <div className="flex gap-1 items-center">
                    <span className="w-2 h-2 bg-[#3D2314] rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <span className="w-2 h-2 bg-[#3D2314] rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <span className="w-2 h-2 bg-[#3D2314] rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Quick replies inițiale */}
          {messages.length === 1 && !userTyped && !loading && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-1.5 flex-shrink-0">
              {INITIAL_QUICK_REPLIES.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-[#3D2314] text-white hover:bg-[#2C1508] transition-colors font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Sugestii contextuale */}
          {messages.length > 1 && showSuggestions && !loading && !userTyped && (
            <div className="px-4 py-2 bg-gray-50 border-t border-gray-100 flex flex-wrap gap-1.5 flex-shrink-0">
              {suggestions.map((q) => (
                <button
                  key={q}
                  onClick={() => sendMessage(q)}
                  className="text-xs px-3 py-1.5 rounded-full bg-white text-[#3D2314] hover:bg-[#F5EDE6] transition-colors border border-[#3D2314]/40 font-medium"
                >
                  {q}
                </button>
              ))}
            </div>
          )}

          {/* Input */}
          <div className="px-4 py-3 bg-white border-t border-gray-100 flex gap-2 items-center flex-shrink-0">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => { setInput(e.target.value); if (e.target.value) setUserTyped(true); }}
              onKeyDown={handleKeyDown}
              placeholder="Scrie un mesaj..."
              disabled={loading}
              className="flex-1 text-sm px-4 py-2 rounded-full border border-gray-200 focus:outline-none focus:border-[#3D2314] bg-gray-50 disabled:opacity-60"
            />
            <button
              onClick={() => sendMessage(input)}
              disabled={!input.trim() || loading}
              aria-label="Trimite mesaj"
              className="w-9 h-9 rounded-full bg-[#3D2314] hover:bg-[#2C1508] text-white flex items-center justify-center transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex-shrink-0"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
}
