/**
 * 🎯 HERO STARTER - Versiunea simplă pentru cursanți
 *
 * Aceasta este versiunea MINIMALISTĂ de la care plecăm în curs.
 * Fără animații, fără video, fără JavaScript complex.
 * Doar HTML + Tailwind CSS = fundația de bază.
 */

export default function HeroStarter() {
  return (
    <section
      className="relative min-h-screen flex items-center justify-center"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1447933601403-0c6688de566e?w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black/20" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        {/* TITLU PRINCIPAL */}
        <h1 className="text-[3.5rem] md:text-[5.25rem] font-bold mb-6 drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
          Simte aroma.<br />Trăiește momentul.
        </h1>

        {/* SUBTITLU */}
        <p className="text-[1.375rem] md:text-[1.75rem] font-bold mb-8 text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">
          Vibe Caffè — unde timpul stă în loc.
        </p>

        {/* BUTOANE CTA */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          {/* Buton primary */}
          <a
            href="#meniu"
            className="inline-block px-8 py-4 bg-amber-700 text-white font-semibold rounded-full transition-all duration-300 hover:scale-105 hover:bg-amber-800 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          >
            Vezi Meniul
          </a>

          {/* Buton secondary */}
          <a
            href="#contact"
            className="inline-block px-8 py-4 bg-transparent text-white font-semibold rounded-full border-2 border-white transition-all duration-300 hover:scale-105 hover:bg-white/10 hover:shadow-[0_8px_24px_rgba(0,0,0,0.4)]"
          >
            Vizitează-ne
          </a>
        </div>
      </div>

      {/* SCROLL INDICATOR */}
      <a
        href="#footer"
        className="absolute bottom-10 left-1/2 -translate-x-1/2 text-amber-500 hover:text-amber-400 transition-colors animate-bounce"
        aria-label="Scroll în jos"
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
    </section>
  );
}

