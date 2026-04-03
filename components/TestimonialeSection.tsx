'use client';

import { useState, useEffect, useRef } from 'react';

const recenzii = [
  {
    nume: 'Andrei M.',
    rating: 5,
    text: 'Cel mai bun espresso din campus! Vin zilnic înainte de cursuri și mereu plec cu energia necesară. Staff-ul e super friendly.',
    data: 'Martie 2025',
    avatar: 'A',
  },
  {
    nume: 'Elena P.',
    rating: 5,
    text: 'Atmosfera e incredibilă — perfectă pentru studiat sau întâlniri cu colegii. Cold brew-ul lor e de altă lume.',
    data: 'Februarie 2025',
    avatar: 'E',
  },
  {
    nume: 'Radu T.',
    rating: 5,
    text: 'Am rezervat pentru aniversarea grupei și totul a fost impecabil. Prețuri ok pentru ce primești. Recomand cu drag!',
    data: 'Ianuarie 2025',
    avatar: 'R',
  },
  {
    nume: 'Maria C.',
    rating: 5,
    text: 'Turmeric latte-ul e preferatul meu! Și prăjiturile sunt făcute în casă — se simte diferența. Locul meu preferat de pe campus.',
    data: 'Martie 2025',
    avatar: 'M',
  },
  {
    nume: 'Bogdan S.',
    rating: 4,
    text: 'Vibe super plăcut, muzică bună, Wi-Fi rapid. Ideal când ai de lucrat la proiecte. Uneori e prea aglomerat, dar merită așteptatul.',
    data: 'Aprilie 2025',
    avatar: 'B',
  },
  {
    nume: 'Ioana D.',
    rating: 5,
    text: 'Am descoperit Vibe Caffè în primul an și de atunci e baza mea de operațiuni. Cafeaua de specialitate e la nivel de specialty shop din centru!',
    data: 'Februarie 2025',
    avatar: 'I',
  },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-4 h-4 ${star <= rating ? 'text-amber-400' : 'text-gray-300'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

function RecenzieCard({ recenzie, index }: { recenzie: typeof recenzii[0]; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.15 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${index * 100}ms` }}
      className={`transition-all duration-700 ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
    >
      <div className="bg-white rounded-3xl p-6 shadow-md hover:shadow-xl border border-[#D4C5B5] transition-shadow duration-300 flex flex-col gap-4 h-full">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-teal-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
              {recenzie.avatar}
            </div>
            <div>
              <p className="font-semibold text-[#3D2B1F] text-sm">{recenzie.nume}</p>
              <p className="text-[#A89888] text-xs">{recenzie.data}</p>
            </div>
          </div>
          <StarRating rating={recenzie.rating} />
        </div>
        <p className="text-[#6B5344] text-sm leading-relaxed flex-1">"{recenzie.text}"</p>
        <div className="flex items-center gap-1.5 text-xs text-teal-600 font-medium">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Client verificat
        </div>
      </div>
    </div>
  );
}

export default function TestimonialeSection() {
  const titleRef = useRef<HTMLDivElement>(null);
  const [titleVisible, setTitleVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setTitleVisible(true); },
      { threshold: 0.2 }
    );
    if (titleRef.current) observer.observe(titleRef.current);
    return () => observer.disconnect();
  }, []);

  const ratingMediu = (recenzii.reduce((acc, r) => acc + r.rating, 0) / recenzii.length).toFixed(1);

  return (
    <section id="recenzii" className="py-20 px-6 bg-[#C9B69C]">
      <div className="max-w-7xl mx-auto">

        {/* Header */}
        <div
          ref={titleRef}
          className={`text-center mb-14 transition-all duration-700 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
        >
          <p className="text-teal-700 font-semibold text-sm uppercase tracking-widest mb-3">Ce spun clienții</p>
          <h2 className="text-4xl md:text-5xl font-bold text-[#3D2B1F] mb-4">Recenzii</h2>
          <p className="text-[#6B5344] text-lg max-w-xl mx-auto">
            Peste 5.000 de studenți au ales Vibe Caffè. Iată ce spun ei.
          </p>

          {/* Rating sumar */}
          <div className="inline-flex items-center gap-3 mt-6 bg-white rounded-2xl px-6 py-3 shadow-sm border border-[#D4C5B5]">
            <span className="text-4xl font-bold text-[#3D2B1F]">{ratingMediu}</span>
            <div className="flex flex-col items-start gap-1">
              <StarRating rating={5} />
              <span className="text-[#A89888] text-xs">{recenzii.length} recenzii</span>
            </div>
          </div>
        </div>

        {/* Grid recenzii */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {recenzii.map((recenzie, index) => (
            <RecenzieCard key={index} recenzie={recenzie} index={index} />
          ))}
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-700 delay-500 ${titleVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}>
          <a
            href="/recenzii"
            className="inline-flex items-center gap-2 px-8 py-4 bg-teal-600 hover:bg-teal-700 text-white font-bold rounded-full transition-all duration-300 hover:scale-105 shadow-lg"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Lasă o recenzie
          </a>
        </div>

      </div>
    </section>
  );
}
