'use client';

import { useState, useRef, useEffect } from 'react';

function StarPicker({ value, onChange }: { value: number; onChange: (v: number) => void }) {
  const [hovered, setHovered] = useState(0);

  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => (
        <button
          key={star}
          type="button"
          onClick={() => onChange(star)}
          onMouseEnter={() => setHovered(star)}
          onMouseLeave={() => setHovered(0)}
          className="transition-transform duration-150 hover:scale-110"
          aria-label={`${star} stele`}
        >
          <svg
            className={`w-9 h-9 transition-colors duration-150 ${
              star <= (hovered || value) ? 'text-amber-400' : 'text-[#C4B5A6]'
            }`}
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
          </svg>
        </button>
      ))}
    </div>
  );
}

const labelRating: Record<number, string> = {
  1: 'Dezamăgitor',
  2: 'Sub așteptări',
  3: 'Ok',
  4: 'Foarte bun',
  5: 'Excelent!',
};

export default function LasaRecenzieSection() {
  const [rating, setRating] = useState(0);
  const [nume, setNume] = useState('');
  const [text, setText] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const sectionRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError('');

    if (rating === 0) {
      setError('Te rugăm să selectezi un rating.');
      return;
    }
    if (nume.trim().length < 2) {
      setError('Te rugăm să introduci numele tău.');
      return;
    }
    if (text.trim().length < 10) {
      setError('Recenzia trebuie să aibă cel puțin 10 caractere.');
      return;
    }

    setLoading(true);
    try {
      const res = await fetch('/api/recenzii', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nume: nume.trim(), rating, text: text.trim() }),
      });

      if (!res.ok) throw new Error();
      setSuccess(true);
    } catch {
      setError('A apărut o eroare. Încearcă din nou.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <section id="lasa-recenzie" className="relative py-20 px-6 bg-[#C9B69C]">
      <div
        ref={sectionRef}
        className={`max-w-2xl mx-auto transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
      >
        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#3D2B1F] mb-4">
          Lasă o recenzie
        </h2>
        <p className="text-center text-[#6B5344] mb-10">
          Experiența ta ne ajută să ne îmbunătățim și îi ajută pe alți studenți să ne descopere.
        </p>

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 rounded-2xl p-4 mb-6 text-center">
            {error}
          </div>
        )}

        {success ? (
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 text-center border border-[#D4C5B5]">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-bold text-[#3D2B1F] mb-4">Mulțumim pentru recenzie!</h3>
            <div className="bg-[#F5F0EB] rounded-2xl p-6 mb-8 text-left space-y-2">
              <p className="text-[#6B5344]"><span className="font-semibold text-[#3D2B1F]">Nume:</span> {nume}</p>
              <p className="text-[#6B5344]"><span className="font-semibold text-[#3D2B1F]">Rating:</span> {'★'.repeat(rating)}{'☆'.repeat(5 - rating)}</p>
              <p className="text-[#6B5344]"><span className="font-semibold text-[#3D2B1F]">Recenzie:</span> {text}</p>
            </div>
            <p className="text-[#6B5344] mb-8">Recenzia ta va fi publicată după verificare.</p>
            <button
              onClick={() => { setSuccess(false); setRating(0); setNume(''); setText(''); }}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105"
            >
              Scrie altă recenzie
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border border-[#D4C5B5]">
            <form onSubmit={handleSubmit} className="space-y-5">

              {/* Rating */}
              <div>
                <label className="block text-sm font-semibold text-[#6B5344] mb-2">
                  Rating *
                </label>
                <StarPicker value={rating} onChange={setRating} />
                {rating > 0 && (
                  <p className="text-sm font-medium text-teal-600 mt-1">{labelRating[rating]}</p>
                )}
              </div>

              {/* Nume */}
              <div>
                <label htmlFor="recenzie-nume" className="block text-sm font-semibold text-[#6B5344] mb-2">
                  Numele tău *
                </label>
                <input
                  id="recenzie-nume"
                  type="text"
                  value={nume}
                  onChange={(e) => setNume(e.target.value)}
                  placeholder="Ex: Andrei M."
                  maxLength={60}
                  className="w-full px-4 py-3 bg-[#F5F0EB] border border-[#D4C5B5] rounded-xl text-[#3D2B1F] placeholder-[#A89888] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                />
              </div>

              {/* Text */}
              <div>
                <label htmlFor="recenzie-text" className="block text-sm font-semibold text-[#6B5344] mb-2">
                  Recenzia ta *
                </label>
                <textarea
                  id="recenzie-text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Cum a fost experiența ta la Vibe Caffè?"
                  rows={4}
                  maxLength={500}
                  className="w-full px-4 py-3 bg-[#F5F0EB] border border-[#D4C5B5] rounded-xl text-[#3D2B1F] placeholder-[#A89888] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all resize-none"
                />
                <p className="text-xs text-[#A89888] text-right mt-1">{text.length}/500</p>
              </div>

              {/* Submit */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-teal-600 hover:bg-teal-700 disabled:opacity-50 disabled:cursor-not-allowed text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg flex items-center justify-center gap-2"
              >
                {loading ? (
                  <>
                    <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                    </svg>
                    Se trimite...
                  </>
                ) : (
                  'Trimite recenzia'
                )}
              </button>

            </form>
          </div>
        )}
      </div>
    </section>
  );
}
