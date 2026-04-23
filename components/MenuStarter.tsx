'use client';

import { useState } from 'react';
import { menuData, type MenuCategory } from '@/lib/menu-data';

type Category = MenuCategory;

export default function MenuStarter() {
  const [activeCategory, setActiveCategory] = useState<Category>('Espresso');
  const categories = Object.keys(menuData) as Category[];

  return (
    <section
      className="py-20 px-6 relative" id="meniu"
      style={{
        backgroundImage: "url('https://images.unsplash.com/photo-1600093463592-8e36ae95ef56?w=1920&auto=format&fit=crop')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundAttachment: 'fixed',
      }}
    >
      <div className="absolute inset-0 bg-white/10" />
      <div className="relative z-10 max-w-6xl mx-auto">

        {/* TITLU */}
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4 drop-shadow-[0_6px_24px_rgba(0,0,0,1)]">Meniul Nostru</h2>
          <p className="text-xl font-bold text-white drop-shadow-[0_4px_16px_rgba(0,0,0,1)]">Preparate cu pasiune, servite cu zâmbet</p>
        </div>

        {/* TAB-URI CATEGORII */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-6 py-3 rounded-full font-semibold transition-all duration-300 ${
                activeCategory === cat
                  ? 'bg-amber-600 text-white shadow-lg scale-105'
                  : 'bg-gray-100 text-gray-600 hover:bg-amber-100 hover:text-amber-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* GRID PRODUSE */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {menuData[activeCategory].map((item, index) => (
            <div
              key={item.name}
              className="bg-white rounded-2xl overflow-hidden border border-white/20 hover:shadow-xl hover:scale-[1.02] transition-all duration-300"
              style={{
                animation: `fadeInUp 0.5s ease-out ${index * 80}ms both`,
              }}
            >
              {/* Imagine */}
              <div className="relative h-52 overflow-hidden rounded-t-2xl">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300 brightness-110"
                />
              </div>

              {/* Text */}
              <div className="p-5 bg-transparent">
                <div className="flex justify-between items-start mb-2">
                  <h3 className="text-lg font-bold text-gray-900">{item.name}</h3>
                  <span className="text-amber-600 font-bold text-lg">{item.price} RON</span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed">{item.description}</p>
              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </section>
  );
}
