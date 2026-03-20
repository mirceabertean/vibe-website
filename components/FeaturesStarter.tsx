'use client';

import { useEffect, useRef, useState } from 'react';

function FeatureCard({
  image,
  emoji,
  title,
  description,
  delay,
}: {
  image: string;
  emoji: string;
  title: string;
  description: string;
  delay: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.2 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="bg-white rounded-3xl shadow-sm border border-gray-100 overflow-hidden transition-all duration-300 hover:shadow-xl hover:scale-[1.02] cursor-pointer"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateY(0)' : 'translateY(40px)',
        transition: `opacity 0.7s ease-out ${delay}ms, transform 0.7s ease-out ${delay}ms, box-shadow 0.3s, scale 0.3s`,
      }}
    >
      {/* Imagine sus — 40% înălțime */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
      </div>

      {/* Text jos — 60% înălțime */}
      <div className="p-8">
        <div className="text-4xl mb-4">{emoji}</div>
        <h3 className="text-2xl font-bold text-gray-900 mb-3">{title}</h3>
        <p className="text-gray-600 leading-relaxed">{description}</p>
      </div>
    </div>
  );
}

export default function FeaturesStarter() {
  return (
    <section
      className="py-20 px-6 relative" id="features"
      style={{
        backgroundImage: "url('/photo-1447933601403-0c6688de566e.avif')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-black/20" />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* TITLU SECTIUNE */}
        <div className="text-center mb-12">
          <h2 className="text-5xl font-bold text-white mb-4">
            De ce Vibe Coffee?
          </h2>
          <p className="text-xl text-white font-bold">
            Experiență unică, ingrediente premium, atmosferă perfectă
          </p>
        </div>

        {/* BENTO GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

          {/* Card mare stânga — centrat vertical față de cele 2 carduri dreapta */}
          <div className="md:row-span-2 flex items-center">
            <FeatureCard
              image="https://images.unsplash.com/photo-1541167760496-1628856ab772?w=800&auto=format&fit=crop"
              emoji="☕"
              title="Cafea de Specialitate"
              description="Boabe selectate din cele mai bune regiuni ale lumii, prăjite artizanal și preparate cu pasiune de baristele noștri. Fiecare ceașcă e o experiență unică."
              delay={0}
            />
          </div>

          {/* Card mic sus dreapta */}
          <FeatureCard
            image="https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=800&auto=format&fit=crop"
            emoji="🥐"
            title="Patiserie Artizanală"
            description="Croissante, tarte și dulciuri preparate zilnic din ingrediente naturale și locale."
            delay={200}
          />

          {/* Card mic jos dreapta */}
          <FeatureCard
            image="https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800&auto=format&fit=crop"
            emoji="🎵"
            title="Ambient Relaxant"
            description="Muzică atent selectată, lumină caldă și scaune confortabile — locul perfect pentru studiu sau o pauză bine meritată."
            delay={400}
          />

        </div>
      </div>
    </section>
  );
}
