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
        backgroundImage: "url('https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1920&auto=format&fit=crop')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay semi-transparent */}
      <div className="absolute inset-0 bg-black/50" />

      <div className="relative z-10 max-w-4xl mx-auto px-6 text-center text-white">
        {/* TITLU PRINCIPAL */}
        <h1 className="text-5xl md:text-7xl font-bold mb-6 drop-shadow-[0_2px_8px_rgba(0,0,0,0.8)]">
          Simte aroma.<br />Trăiește momentul.
        </h1>

        {/* SUBTITLU */}
        <p className="text-xl md:text-2xl mb-8 text-white/90 drop-shadow-[0_2px_6px_rgba(0,0,0,0.8)]">
          Vibe Caffè — unde timpul stă în loc.
        </p>

        {/* BUTON CTA */}
        <a
          href="#contact"
          className="inline-block px-8 py-4 bg-white text-amber-900 font-semibold rounded-lg hover:bg-amber-50 transition-colors"
        >
          Începe acum
        </a>
      </div>
    </section>
  );
}

