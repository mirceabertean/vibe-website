/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

'use client';

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;
  const top = el.getBoundingClientRect().top + window.scrollY - 80;
  window.scrollTo({ top, behavior: 'smooth' });
}

export default function HeroStarter() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Video background */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover"
      >
        <source src="/istockphoto-1083268132-640_adpp_is.mp4" type="video/mp4" />
      </video>

      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black/30" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        {/* TITLU PRINCIPAL */}
        <h1
          className="text-6xl sm:text-8xl md:text-9xl font-bold mb-6 drop-shadow-[0_6px_24px_rgba(0,0,0,1)]"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.5s both',
          }}
        >
          Simte aroma.<br />Trăiește momentul.
        </h1>

        {/* SUBTITLU */}
        <p
          className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)]"
          style={{
            animation: 'fadeInUp 0.8s ease-out 0.8s both',
          }}
        >
          Vibe Caffè — unde timpul stă în loc.
        </p>

        {/* BUTOANE CTA */}
        <div
          className="flex flex-col sm:flex-row gap-4 justify-center"
          style={{
            animation: 'fadeInUp 0.8s ease-out 1.1s both',
          }}
        >
          {/* Buton primary */}
          <button
            onClick={() => scrollToSection('meniu')}
            className="inline-block px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          >
            Vezi Meniul
          </button>

          {/* Buton secondary */}
          <button
            onClick={() => scrollToSection('locatie')}
            className="inline-block px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          >
            Vizitează-ne
          </button>

          {/* Buton rezervari */}
          <button
            onClick={() => scrollToSection('rezervari')}
            className="inline-block px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          >
            Rezervări
          </button>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <a
        href="#footer"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-white hover:text-white/70 transition-colors animate-bounce"
        aria-label="Scroll în jos"
        style={{
          animation: 'fadeInUp 0.8s ease-out 1.5s both, bounce 1s infinite 2.3s',
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="36"
          height="36"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          strokeWidth={2}
        >
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </a>

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        @keyframes bounce {
          0%, 100% { transform: translateX(-50%) translateY(0); }
          50% { transform: translateX(-50%) translateY(-10px); }
        }
      `}</style>
    </section>
  );
}
