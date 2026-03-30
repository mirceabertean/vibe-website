'use client';

import { useState } from 'react';

function genereazaOre(start: number, closeHour: number): string[] {
  const ore: string[] = [];
  for (let h = start; h < closeHour; h++) {
    ore.push(`${String(h).padStart(2, '0')}:00`);
    ore.push(`${String(h).padStart(2, '0')}:30`);
  }
  return ore;
}

function getOreDisponibile(dateStr: string): string[] {
  if (!dateStr) return genereazaOre(7, 21);
  const data = parseDataLocala(dateStr);
  const zi = data.getDay();
  const esteWeekend = zi === 0 || zi === 6;
  const ore = esteWeekend ? genereazaOre(8, 22) : genereazaOre(7, 21);

  const now = new Date();
  const esteAzi = dateStr === toLocalDateStr(now);
  if (!esteAzi) return ore;

  const minuteAcum = now.getHours() * 60 + now.getMinutes();
  return ore.filter((ora) => {
    const [h, m] = ora.split(':').map(Number);
    return h * 60 + m > minuteAcum;
  });
}

function parseDataLocala(dateStr: string): Date {
  const [y, m, d] = dateStr.split('-').map(Number);
  return new Date(y, m - 1, d);
}

function toLocalDateStr(date: Date): string {
  const y = date.getFullYear();
  const m = String(date.getMonth() + 1).padStart(2, '0');
  const d = String(date.getDate()).padStart(2, '0');
  return `${y}-${m}-${d}`;
}

const zileSaptamana = ['Lu', 'Ma', 'Mi', 'Jo', 'Vi', 'Sâ', 'Du'];

function getCalendarDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const days: (Date | null)[] = [];

  // Luni = 0, Duminică = 6
  let startDay = firstDay.getDay() - 1;
  if (startDay < 0) startDay = 6;

  for (let i = 0; i < startDay; i++) {
    days.push(null);
  }

  for (let d = 1; d <= lastDay.getDate(); d++) {
    days.push(new Date(year, month, d));
  }

  return days;
}

function genereazaCaptcha() {
  const a = Math.floor(Math.random() * 9) + 1;
  const b = Math.floor(Math.random() * 9) + 1;
  return { a, b, raspuns: a + b };
}

export default function RezervariForm() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    nume: '',
    email: '',
    telefon: '',
    persoane: 2,
    data: '',
    ora: '',
  });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');
  const [captcha, setCaptcha] = useState(genereazaCaptcha);
  const [captchaInput, setCaptchaInput] = useState('');
  const [honeypot, setHoneypot] = useState('');

  const today = new Date();
  today.setHours(0, 0, 0, 0);
  const maxDate = new Date();
  maxDate.setMonth(maxDate.getMonth() + 6);

  const [calendarMonth, setCalendarMonth] = useState(today.getMonth());
  const [calendarYear, setCalendarYear] = useState(today.getFullYear());

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (honeypot) return; // bot detectat
    if (parseInt(captchaInput) !== captcha.raspuns) {
      setError('Răspuns incorect la întrebarea de verificare.');
      setCaptcha(genereazaCaptcha());
      setCaptchaInput('');
      return;
    }
    setLoading(true);
    setError('');

    try {
      const offset = -new Date().getTimezoneOffset();
      const semn = offset >= 0 ? '+' : '-';
      const ore = String(Math.floor(Math.abs(offset) / 60)).padStart(2, '0');
      const minute = String(Math.abs(offset) % 60).padStart(2, '0');
      const data_ora = `${formData.data}T${formData.ora}:00${semn}${ore}:${minute}`;

      const res = await fetch('/api/rezervari', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          nume: formData.nume,
          email: formData.email,
          telefon: formData.telefon,
          persoane: formData.persoane,
          data_ora,
        }),
      });

      const result = await res.json();

      if (!res.ok) {
        throw new Error(result.error || 'Eroare la trimitere');
      }

      setSuccess(true);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'A apărut o eroare');
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setStep(1);
    setSuccess(false);
    setError('');
    setFormData({ nume: '', email: '', telefon: '', persoane: 2, data: '', ora: '' });
    setCalendarMonth(today.getMonth());
    setCalendarYear(today.getFullYear());
  };

  const selectDate = (dateStr: string) => {
    setFormData({ ...formData, data: dateStr });
    setStep(2);
    setTimeout(() => {
      const el = document.getElementById('rezervari');
      if (el) {
        const y = el.getBoundingClientRect().top + window.scrollY - 80;
        window.scrollTo({ top: y, behavior: 'smooth' });
      }
    }, 50);
  };


  // Navigare calendar
  const canGoPrev = calendarYear > today.getFullYear() || calendarMonth > today.getMonth();
  const canGoNext = new Date(calendarYear, calendarMonth + 1, 1) <= maxDate;

  const goToPrevMonth = () => {
    if (!canGoPrev) return;
    if (calendarMonth === 0) {
      setCalendarMonth(11);
      setCalendarYear(calendarYear - 1);
    } else {
      setCalendarMonth(calendarMonth - 1);
    }
  };

  const goToNextMonth = () => {
    if (!canGoNext) return;
    if (calendarMonth === 11) {
      setCalendarMonth(0);
      setCalendarYear(calendarYear + 1);
    } else {
      setCalendarMonth(calendarMonth + 1);
    }
  };

  const calendarDays = getCalendarDays(calendarYear, calendarMonth);
  const monthName = new Date(calendarYear, calendarMonth).toLocaleDateString('ro-RO', { month: 'long', year: 'numeric' });

  return (
    <section id="rezervari" className="relative py-20 px-6 bg-[#C9B69C]">
      <div className="max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-[#3D2B1F] mb-4">
          Rezervă o masă
        </h2>
        <p className="text-center text-[#6B5344] mb-6">Completează în 3 pași simpli</p>

        {/* Progress bar */}
        {!success && (
          <div className="flex items-center justify-center gap-2 mb-8">
            {[{ n: 1, label: 'Data' }, { n: 2, label: 'Ora' }, { n: 3, label: 'Detalii' }].map(({ n, label }) => (
              <div key={n} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                    step === n ? 'bg-teal-600 text-white scale-110' : step > n ? 'bg-green-600 text-white' : 'bg-[#C4B5A6] text-white/70'
                  }`}>
                    {step > n ? '✓' : n}
                  </div>
                  <span className="text-xs text-[#6B5344] mt-1">{label}</span>
                </div>
                {n < 3 && <div className={`w-16 h-1 rounded-full mb-5 transition-all duration-300 ${step > n ? 'bg-green-600' : 'bg-[#C4B5A6]'}`} />}
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-50 border border-red-300 text-red-700 rounded-2xl p-4 mb-6 text-center">
            {error}
          </div>
        )}

        {/* Succes */}
        {success ? (
          <div className="bg-white rounded-3xl shadow-lg p-8 sm:p-12 text-center border border-[#D4C5B5]">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-bold text-[#3D2B1F] mb-4">Rezervare confirmată!</h3>
            <div className="bg-[#F5F0EB] rounded-2xl p-6 mb-8 text-left space-y-2">
              <p className="text-[#6B5344]"><span className="font-semibold text-[#3D2B1F]">Nume:</span> {formData.nume}</p>
              <p className="text-[#6B5344]"><span className="font-semibold text-[#3D2B1F]">Data:</span> {parseDataLocala(formData.data).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="text-[#6B5344]"><span className="font-semibold text-[#3D2B1F]">Ora:</span> {formData.ora}</p>
              <p className="text-[#6B5344]"><span className="font-semibold text-[#3D2B1F]">Persoane:</span> {formData.persoane}</p>
            </div>
            <p className="text-[#6B5344] mb-8">Te așteptăm cu drag la Vibe Caffè!</p>
            <button
              onClick={resetForm}
              className="px-8 py-3 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105"
            >
              Fă o nouă rezervare
            </button>
          </div>
        ) : (
          <div className="bg-white rounded-3xl shadow-lg p-4 sm:p-6 border border-[#D4C5B5]">

            {/* STEP 1 — Alege data */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-bold text-[#3D2B1F] mb-4">📅 Alege data</h3>
                <div className="border border-[#D4C5B5] rounded-2xl p-4 bg-[#F5F0EB]">
                  {/* Header calendar */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={goToPrevMonth}
                      disabled={!canGoPrev}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B5344] hover:bg-[#D4C5B5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      ←
                    </button>
                    <span className="font-bold text-[#3D2B1F] capitalize">{monthName}</span>
                    <button
                      type="button"
                      onClick={goToNextMonth}
                      disabled={!canGoNext}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-[#6B5344] hover:bg-[#D4C5B5] disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      →
                    </button>
                  </div>

                  {/* Zilele săptămânii */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {zileSaptamana.map((zi) => (
                      <div key={zi} className="text-center text-xs font-semibold text-[#6B5344] py-1">
                        {zi}
                      </div>
                    ))}
                  </div>

                  {/* Zilele lunii */}
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, i) => {
                      if (!day) {
                        return <div key={`empty-${i}`} />;
                      }

                      const dateStr = toLocalDateStr(day);
                      const isPast = day < today;
                      const isTooFar = day > maxDate;
                      const isDisabled = isPast || isTooFar;
                      const isSelected = formData.data === dateStr;
                      const isToday = dateStr === toLocalDateStr(today);

                      return (
                        <button
                          key={dateStr}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => selectDate(dateStr)}
                          className={`w-full py-2 rounded-xl border-2 flex items-center justify-center text-sm font-bold transition-all duration-200 ${
                            isSelected
                              ? 'border-teal-600 bg-teal-600 text-white font-bold'
                              : isToday
                                ? 'border-[#D4C5B5] bg-[#F5F0EB] text-teal-600 font-bold hover:border-teal-500'
                                : isDisabled
                                  ? 'border-[#E8DFD5] text-[#C4B5A6] cursor-not-allowed bg-transparent'
                                  : 'border-[#D4C5B5] text-[#3D2B1F] hover:border-teal-500 bg-[#F5F0EB]'
                          }`}
                        >
                          {day.getDate()}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>
            )}

            {/* STEP 2 — Alege ora */}
            {step === 2 && (
              <div>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-xl font-bold text-[#3D2B1F]">⏰ Alege ora</h3>
                  <p className="text-sm text-[#6B5344]">
                    {parseDataLocala(formData.data).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })}
                  </p>
                </div>
                <div className="grid grid-cols-4 sm:grid-cols-5 md:grid-cols-7 gap-2">
                  {getOreDisponibile(formData.data).map((ora: string) => (
                    <button
                      key={ora}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, ora });
                        setStep(3);
                      }}
                      className={`py-2 px-2 rounded-xl border-2 text-sm font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md ${
                        formData.ora === ora
                          ? 'border-teal-500 bg-teal-50 text-teal-700'
                          : 'border-[#D4C5B5] text-[#3D2B1F] hover:border-teal-500 bg-[#F5F0EB]'
                      }`}
                    >
                      {ora}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-6 text-sm text-[#6B5344] hover:text-teal-600 transition-colors"
                >
                  ← Schimbă data
                </button>
              </div>
            )}

            {/* STEP 3 — Detalii */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold text-[#3D2B1F] mb-2">📝 Completează detaliile</h3>
                <p className="text-sm text-[#6B5344] mb-6">
                  {parseDataLocala(formData.data).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })} la {formData.ora}
                </p>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="nume" className="block text-sm font-semibold text-[#6B5344] mb-2">
                      Nume complet *
                    </label>
                    <input
                      type="text"
                      id="nume"
                      name="nume"
                      required
                      value={formData.nume}
                      onChange={handleChange}
                      placeholder="Ion Popescu"
                      className="w-full px-4 py-3 bg-[#F5F0EB] border border-[#D4C5B5] rounded-xl text-[#3D2B1F] placeholder-[#A89888] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-[#6B5344] mb-2">
                        Email *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="ion@mail.com"
                        className="w-full px-4 py-3 bg-[#F5F0EB] border border-[#D4C5B5] rounded-xl text-[#3D2B1F] placeholder-[#A89888] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefon" className="block text-sm font-semibold text-[#6B5344] mb-2">
                        Telefon *
                      </label>
                      <input
                        type="tel"
                        id="telefon"
                        name="telefon"
                        required
                        value={formData.telefon}
                        onChange={handleChange}
                        placeholder="0721 234 567"
                        className="w-full px-4 py-3 bg-[#F5F0EB] border border-[#D4C5B5] rounded-xl text-[#3D2B1F] placeholder-[#A89888] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="persoane" className="block text-sm font-semibold text-[#6B5344] mb-2">
                      Număr persoane
                    </label>
                    <select
                      id="persoane"
                      name="persoane"
                      value={formData.persoane}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-[#F5F0EB] border border-[#D4C5B5] rounded-xl text-[#3D2B1F] placeholder-[#A89888] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n} className="bg-white text-[#3D2B1F]">
                          {n} {n === 1 ? 'persoană' : 'persoane'}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* Honeypot — ascuns pentru utilizatori, vizibil pentru boți */}
                  <input
                    type="text"
                    name="website"
                    value={honeypot}
                    onChange={(e) => setHoneypot(e.target.value)}
                    tabIndex={-1}
                    aria-hidden="true"
                    className="hidden"
                  />

                  {/* Captcha */}
                  <div>
                    <label className="block text-sm font-semibold text-[#6B5344] mb-2">
                      Verificare: cât face {captcha.a} + {captcha.b}? *
                    </label>
                    <input
                      type="number"
                      value={captchaInput}
                      onChange={(e) => setCaptchaInput(e.target.value)}
                      placeholder="Răspuns"
                      required
                      className="w-32 px-4 py-3 bg-[#F5F0EB] border border-[#D4C5B5] rounded-xl text-[#3D2B1F] placeholder-[#A89888] focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Se trimite...' : 'Confirmă rezervarea'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-4 text-sm text-[#6B5344] hover:text-teal-600 transition-colors"
                >
                  ← Schimbă ora
                </button>
              </form>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
