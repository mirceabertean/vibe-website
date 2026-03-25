'use client';

import { useState, useEffect } from 'react';

interface Rezervare {
  id: number;
  nume: string;
  email: string;
  telefon: string;
  persoane: number;
  data_ora: string;
  status: string;
  created_at: string;
}

export default function AdminPage() {
  const [rezervari, setRezervari] = useState<Rezervare[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState<number | null>(null);
  const [cautare, setCautare] = useState('');
  const [filtruStatus, setFiltruStatus] = useState<string>('toate');

  const fetchRezervari = async () => {
    const res = await fetch('/api/rezervari');
    const { data } = await res.json();
    setRezervari(data || []);
    setLoading(false);
  };

  useEffect(() => {
    fetchRezervari();
  }, []);

  const schimbaStatus = async (id: number, status: string) => {
    setActionLoading(id);
    await fetch('/api/rezervari', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    });
    await fetchRezervari();
    setActionLoading(null);
  };

  const sterge = async (id: number) => {
    if (!confirm('Sigur vrei să ștergi această rezervare?')) return;
    setActionLoading(id);
    await fetch('/api/rezervari', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });
    await fetchRezervari();
    setActionLoading(null);
  };

  const formatData = (iso: string) =>
    new Date(iso).toLocaleDateString('ro-RO', {
      weekday: 'short',
      day: 'numeric',
      month: 'short',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });

  const statusColor = (status: string) => {
    if (status === 'confirmată') return 'bg-green-500/20 text-green-300 border border-green-400/30';
    if (status === 'anulată') return 'bg-red-500/20 text-red-300 border border-red-400/30';
    return 'bg-yellow-500/20 text-yellow-300 border border-yellow-400/30';
  };

  const filtrate = rezervari.filter((r) => {
    const matchNume = r.nume.toLowerCase().includes(cautare.toLowerCase());
    const matchStatus = filtruStatus === 'toate' || r.status === filtruStatus;
    return matchNume && matchStatus;
  });

  const contor = {
    toate: rezervari.length,
    'în așteptare': rezervari.filter((r) => r.status === 'în așteptare').length,
    'confirmată': rezervari.filter((r) => r.status === 'confirmată').length,
    'anulată': rezervari.filter((r) => r.status === 'anulată').length,
  };

  const Actiuni = ({ r }: { r: Rezervare }) =>
    actionLoading === r.id ? (
      <span className="text-teal-300 text-xs">...</span>
    ) : (
      <div className="flex gap-2">
        {r.status !== 'confirmată' && (
          <button
            onClick={() => schimbaStatus(r.id, 'confirmată')}
            className="px-3 py-1.5 bg-green-500/20 hover:bg-green-500/40 text-green-300 border border-green-400/30 rounded-lg text-xs font-semibold transition-all hover:scale-105"
          >
            Confirmă
          </button>
        )}
        {r.status !== 'anulată' && (
          <button
            onClick={() => schimbaStatus(r.id, 'anulată')}
            className="px-3 py-1.5 bg-orange-500/20 hover:bg-orange-500/40 text-orange-300 border border-orange-400/30 rounded-lg text-xs font-semibold transition-all hover:scale-105"
          >
            Anulează
          </button>
        )}
        <button
          onClick={() => sterge(r.id)}
          className="px-3 py-1.5 bg-red-500/20 hover:bg-red-500/40 text-red-300 border border-red-400/30 rounded-lg text-xs font-semibold transition-all hover:scale-105"
        >
          Șterge
        </button>
      </div>
    );

  return (
    <div className="relative min-h-screen">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=1920&auto=format&fit=crop')" }}
      />
      <div className="fixed inset-0 bg-slate-900/70" />

      <div className="relative py-10 px-4">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-3xl font-bold text-white drop-shadow-lg">Rezervări</h1>
              <p className="text-teal-300 text-sm mt-1">Panou administrare</p>
            </div>
            <button
              onClick={() => { setLoading(true); fetchRezervari(); }}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 backdrop-blur-sm text-white border border-white/20 rounded-xl transition-all text-sm"
            >
              Reîncarcă
            </button>
          </div>

          {/* Filtre și căutare */}
          <div className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <input
                type="text"
                placeholder="Caută după nume..."
                value={cautare}
                onChange={(e) => setCautare(e.target.value)}
                className="px-4 py-2 bg-white/10 border border-white/20 rounded-xl text-white placeholder-white/40 text-sm focus:ring-2 focus:ring-teal-500 focus:border-teal-500 outline-none flex-1"
              />
              <div className="flex gap-2 flex-wrap">
                {(['toate', 'în așteptare', 'confirmată', 'anulată'] as const).map((s) => (
                  <button
                    key={s}
                    onClick={() => setFiltruStatus(s)}
                    className={`px-3 py-2 rounded-xl text-xs font-semibold transition-all ${
                      filtruStatus === s
                        ? 'bg-teal-500 text-white'
                        : 'bg-white/10 border border-white/20 text-white/70 hover:bg-white/20'
                    }`}
                  >
                    {s.charAt(0).toUpperCase() + s.slice(1)} ({contor[s]})
                  </button>
                ))}
              </div>
            </div>
          </div>

          {loading ? (
            <p className="text-teal-200 text-center py-20">Se încarcă...</p>
          ) : filtrate.length === 0 ? (
            <p className="text-teal-200 text-center py-20">
              {rezervari.length === 0 ? 'Nu există rezervări.' : 'Niciun rezultat pentru filtrele selectate.'}
            </p>
          ) : (
            <>
              {/* Tabel desktop */}
              <div className="hidden md:block bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 overflow-hidden">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-white/10 text-left text-teal-300 uppercase text-xs">
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Nume</th>
                      <th className="px-4 py-3">Contact</th>
                      <th className="px-4 py-3">Pers.</th>
                      <th className="px-4 py-3">Data & Ora</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3">Acțiuni</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filtrate.map((r) => (
                      <tr key={r.id} className="border-t border-white/5 hover:bg-white/5 transition-colors">
                        <td className="px-4 py-3 text-white/40">{r.id}</td>
                        <td className="px-4 py-3 font-medium text-white">{r.nume}</td>
                        <td className="px-4 py-3 text-white/70">
                          <div>{r.email}</div>
                          <div className="text-xs text-white/40">{r.telefon}</div>
                        </td>
                        <td className="px-4 py-3 text-center text-white/80">{r.persoane}</td>
                        <td className="px-4 py-3 text-white/80">{formatData(r.data_ora)}</td>
                        <td className="px-4 py-3">
                          <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(r.status)}`}>
                            {r.status}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <Actiuni r={r} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Carduri mobil */}
              <div className="md:hidden space-y-4">
                {filtrate.map((r) => (
                  <div key={r.id} className="bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20 p-5">
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h3 className="font-bold text-white text-lg">{r.nume}</h3>
                        <p className="text-white/50 text-xs">#{r.id}</p>
                      </div>
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${statusColor(r.status)}`}>
                        {r.status}
                      </span>
                    </div>

                    <div className="space-y-2 mb-4 text-sm">
                      <div className="flex justify-between">
                        <span className="text-teal-300">Data & Ora</span>
                        <span className="text-white/80">{formatData(r.data_ora)}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-teal-300">Persoane</span>
                        <span className="text-white/80">{r.persoane}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-teal-300">Email</span>
                        <span className="text-white/80">{r.email}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-teal-300">Telefon</span>
                        <span className="text-white/80">{r.telefon}</span>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-white/10">
                      <Actiuni r={r} />
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
