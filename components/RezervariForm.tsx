'use client';

import { useState } from 'react';

const oreDisponibile = [
  '10:00', '10:30', '11:00', '11:30', '12:00', '12:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30', '18:00', '18:30',
  '19:00', '19:30', '20:00', '20:30', '21:00', '21:30', '22:00',
];

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
    setLoading(true);
    setError('');

    try {
      const data_ora = `${formData.data}T${formData.ora}:00`;

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
  };

  // Următoarele 14 zile (butoane rapide)
  const getNextDays = () => {
    const days = [];
    for (let i = 0; i < 14; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push({
        value: date.toISOString().split('T')[0],
        label: date.toLocaleDateString('ro-RO', { weekday: 'short', day: 'numeric', month: 'short' }),
        isToday: i === 0,
      });
    }
    return days;
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
    <section id="rezervari" className="relative py-20 px-6">
      {/* Background imagine */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-fixed"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&auto=format&fit=crop')" }}
      />
      <div className="absolute inset-0 bg-slate-900/30" />
      <div className="relative max-w-2xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center text-white mb-4 drop-shadow-lg">
          Rezervă o masă
        </h2>
        <p className="text-center text-teal-200 mb-8">
          Completează în 3 pași simpli
        </p>

        {/* Progress bar */}
        {!success && (
          <div className="flex items-center justify-center gap-2 mb-12">
            {[
              { n: 1, label: 'Data' },
              { n: 2, label: 'Ora' },
              { n: 3, label: 'Detalii' },
            ].map(({ n, label }) => (
              <div key={n} className="flex items-center gap-2">
                <div className="flex flex-col items-center">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      step === n
                        ? 'bg-teal-500 text-white scale-110'
                        : step > n
                          ? 'bg-green-500 text-white'
                          : 'bg-white/20 text-white/50'
                    }`}
                  >
                    {step > n ? '✓' : n}
                  </div>
                  <span className="text-xs text-teal-300 mt-1">{label}</span>
                </div>
                {n < 3 && (
                  <div
                    className={`w-16 h-1 rounded-full transition-all duration-300 mb-5 ${
                      step > n ? 'bg-green-500' : 'bg-white/20'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        )}

        {error && (
          <div className="bg-red-500/20 border border-red-400/30 text-red-200 rounded-2xl p-4 mb-6 text-center">
            {error}
          </div>
        )}

        {/* Succes */}
        {success ? (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg p-8 sm:p-12 text-center border border-white/20">
            <div className="text-6xl mb-6">🎉</div>
            <h3 className="text-2xl font-bold text-white mb-4">Rezervare confirmată!</h3>
            <div className="bg-white/10 rounded-2xl p-6 mb-8 text-left space-y-2">
              <p className="text-teal-100"><span className="font-semibold text-white">Nume:</span> {formData.nume}</p>
              <p className="text-teal-100"><span className="font-semibold text-white">Data:</span> {new Date(formData.data).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' })}</p>
              <p className="text-teal-100"><span className="font-semibold text-white">Ora:</span> {formData.ora}</p>
              <p className="text-teal-100"><span className="font-semibold text-white">Persoane:</span> {formData.persoane}</p>
            </div>
            <p className="text-teal-200 mb-8">Te așteptăm cu drag la Vibe Caffè!</p>
            <button
              onClick={resetForm}
              className="px-8 py-3 bg-orange-500 hover:bg-orange-600 text-white font-bold rounded-full transition-all duration-300 hover:scale-105"
            >
              Fă o nouă rezervare
            </button>
          </div>
        ) : (
          <div className="bg-white/10 backdrop-blur-xl rounded-3xl shadow-lg p-5 sm:p-8 border border-white/20">

            {/* STEP 1 — Alege data */}
            {step === 1 && (
              <div>
                <h3 className="text-xl font-bold text-white mb-6">📅 Alege data</h3>

                {/* Butoane rapide */}
                <p className="text-sm font-semibold text-teal-200 mb-3">Următoarele zile:</p>
                <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
                  {getNextDays().map((day) => (
                    <button
                      key={day.value}
                      type="button"
                      onClick={() => selectDate(day.value)}
                      className={`flex-shrink-0 px-4 py-3 rounded-xl border-2 text-center transition-all duration-200 hover:scale-105 hover:shadow-md ${
                        formData.data === day.value
                          ? 'border-orange-400 bg-orange-400/20'
                          : 'border-white/20 hover:border-orange-400'
                      }`}
                    >
                      <div className="text-sm font-bold text-white whitespace-nowrap">{day.label}</div>
                      {day.isToday && (
                        <div className="text-xs text-orange-400 font-semibold mt-1">Azi</div>
                      )}
                    </button>
                  ))}
                </div>

                {/* Calendar lunar */}
                <p className="text-sm font-semibold text-teal-200 mb-3">Sau alege din calendar:</p>
                <div className="border border-white/20 rounded-2xl p-4 bg-white/5">
                  {/* Header calendar */}
                  <div className="flex items-center justify-between mb-4">
                    <button
                      type="button"
                      onClick={goToPrevMonth}
                      disabled={!canGoPrev}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      ←
                    </button>
                    <span className="font-bold text-white capitalize">{monthName}</span>
                    <button
                      type="button"
                      onClick={goToNextMonth}
                      disabled={!canGoNext}
                      className="w-9 h-9 rounded-full flex items-center justify-center text-white/70 hover:bg-white/10 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
                    >
                      →
                    </button>
                  </div>

                  {/* Zilele săptămânii */}
                  <div className="grid grid-cols-7 gap-1 mb-2">
                    {zileSaptamana.map((zi) => (
                      <div key={zi} className="text-center text-xs font-semibold text-teal-300 py-1">
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

                      const dateStr = day.toISOString().split('T')[0];
                      const isPast = day < today;
                      const isTooFar = day > maxDate;
                      const isDisabled = isPast || isTooFar;
                      const isSelected = formData.data === dateStr;
                      const isToday = dateStr === today.toISOString().split('T')[0];

                      return (
                        <button
                          key={dateStr}
                          type="button"
                          disabled={isDisabled}
                          onClick={() => selectDate(dateStr)}
                          className={`w-full aspect-square rounded-xl flex items-center justify-center text-sm font-medium transition-all duration-200 ${
                            isSelected
                              ? 'bg-orange-500 text-white font-bold'
                              : isToday
                                ? 'bg-teal-600/30 text-teal-200 font-bold hover:bg-teal-600/40'
                                : isDisabled
                                  ? 'text-white/20 cursor-not-allowed'
                                  : 'text-white/80 hover:bg-white/10'
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
                <h3 className="text-xl font-bold text-white mb-2">⏰ Alege ora</h3>
                <p className="text-sm text-teal-300 mb-6">
                  {new Date(formData.data).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })}
                </p>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-3">
                  {oreDisponibile.map((ora) => (
                    <button
                      key={ora}
                      type="button"
                      onClick={() => {
                        setFormData({ ...formData, ora });
                        setStep(3);
                      }}
                      className={`py-3 px-4 rounded-xl border-2 font-semibold transition-all duration-200 hover:scale-105 hover:shadow-md ${
                        formData.ora === ora
                          ? 'border-orange-400 bg-orange-400/20 text-orange-400'
                          : 'border-white/20 text-white/80 hover:border-orange-400'
                      }`}
                    >
                      {ora}
                    </button>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="mt-6 text-sm text-teal-300 hover:text-orange-400 transition-colors"
                >
                  ← Schimbă data
                </button>
              </div>
            )}

            {/* STEP 3 — Detalii */}
            {step === 3 && (
              <form onSubmit={handleSubmit}>
                <h3 className="text-xl font-bold text-white mb-2">📝 Completează detaliile</h3>
                <p className="text-sm text-teal-300 mb-6">
                  {new Date(formData.data).toLocaleDateString('ro-RO', { weekday: 'long', day: 'numeric', month: 'long' })} la {formData.ora}
                </p>

                <div className="space-y-5">
                  <div>
                    <label htmlFor="nume" className="block text-sm font-semibold text-teal-200 mb-2">
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
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label htmlFor="email" className="block text-sm font-semibold text-teal-200 mb-2">
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
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      />
                    </div>

                    <div>
                      <label htmlFor="telefon" className="block text-sm font-semibold text-teal-200 mb-2">
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
                        className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="persoane" className="block text-sm font-semibold text-teal-200 mb-2">
                      Număr persoane
                    </label>
                    <select
                      id="persoane"
                      name="persoane"
                      value={formData.persoane}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none transition-all"
                    >
                      {Array.from({ length: 12 }, (_, i) => i + 1).map((n) => (
                        <option key={n} value={n} className="bg-[#6b6b6b] text-white">
                          {n} {n === 1 ? 'persoană' : 'persoane'}
                        </option>
                      ))}
                    </select>
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="w-full py-4 bg-gray-700 hover:bg-gray-800 text-white font-bold text-lg rounded-full transition-all duration-300 hover:scale-[1.02] hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Se trimite...' : 'Confirmă rezervarea'}
                  </button>
                </div>

                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="mt-4 text-sm text-teal-300 hover:text-orange-400 transition-colors"
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
