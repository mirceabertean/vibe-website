'use client';

import { useState } from 'react';

const menuData = {
  Espresso: [
    { name: 'Espresso', price: 12, description: 'Shot dublu de espresso intens', image: 'https://images.unsplash.com/photo-1510707577719-ae7c14805e3a?w=600&auto=format&fit=crop' },
    { name: 'Americano', price: 14, description: 'Espresso diluat cu apă caldă', image: 'https://images.unsplash.com/photo-1514432324607-a09d9b4aefdd?w=600&auto=format&fit=crop' },
    { name: 'Cappuccino', price: 16, description: 'Espresso cu lapte spumat', image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?w=600&auto=format&fit=crop' },
    { name: 'Flat White', price: 17, description: 'Microfoam mătăsos peste espresso', image: 'https://images.unsplash.com/photo-1570968915860-54d5c301fa9f?w=600&auto=format&fit=crop' },
    { name: 'Latte', price: 17, description: 'Espresso cu lapte abundant', image: 'https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=600&auto=format&fit=crop' },
  ],
  Specialty: [
    { name: 'Matcha Latte', price: 19, description: 'Ceai matcha japonez cu lapte cremos', image: 'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=600&auto=format&fit=crop' },
    { name: 'Turmeric Latte', price: 18, description: 'Lapte auriu cu turmeric și miere', image: '/photo-1669219695489-9163d12a2611.avif' },
    { name: 'Cortado', price: 16, description: 'Espresso cu lapte în proporții egale', image: 'https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=600&auto=format&fit=crop' },
    { name: 'Pour Over', price: 22, description: 'Cafea filtrată manual, aromă complexă', image: 'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=600&auto=format&fit=crop' },
    { name: 'Cold Brew Tonic', price: 21, description: 'Cold brew cu apă tonică și portocală', image: 'https://images.unsplash.com/photo-1558857563-b371033873b8?w=600&auto=format&fit=crop' },
  ],
  'Cold Brew': [
    { name: 'Cold Brew Classic', price: 18, description: 'Infuzie la rece 12 ore, intensă și lină', image: 'https://images.unsplash.com/photo-1497935586351-b67a49e012bf?w=600&auto=format&fit=crop' },
    { name: 'Cold Brew cu Lapte', price: 20, description: 'Cold brew cu lapte și sirop de vanilie', image: 'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=600&auto=format&fit=crop' },
    { name: 'Nitro Cold Brew', price: 22, description: 'Cold brew cu azot — cremă naturală', image: 'https://images.unsplash.com/photo-1551024506-0bccd828d307?w=600&auto=format&fit=crop' },
    { name: 'Iced Latte', price: 19, description: 'Espresso cu lapte rece și gheață', image: '/premium_photo-1663933534262-5de49eb4f59f.avif' },
    { name: 'Frappé Caramel', price: 21, description: 'Cafea blended cu caramel și frișcă', image: 'https://images.unsplash.com/photo-1464305795204-6f5bbfc7fb81?w=600&auto=format&fit=crop' },
  ],
  Patiserie: [
    { name: 'Croissant cu Unt', price: 12, description: 'Croissant frantuzesc, crocant și fraged', image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=600&auto=format&fit=crop' },
    { name: 'Pain au Chocolat', price: 14, description: 'Aluat foietaj cu ciocolată neagră', image: 'https://images.unsplash.com/photo-1549903072-7e6e0bedb7fb?w=600&auto=format&fit=crop' },
    { name: 'Cheesecake Vanilie', price: 18, description: 'Cheesecake cremos cu coulis de fructe', image: 'https://images.unsplash.com/photo-1533134242443-d4fd215305ad?w=600&auto=format&fit=crop' },
    { name: 'Brownie', price: 14, description: 'Brownie dens cu ciocolată și nuci', image: 'https://images.unsplash.com/photo-1550617931-e17a7b70dce2?w=600&auto=format&fit=crop' },
    { name: 'Tartă cu Fructe', price: 16, description: 'Cremă patisserie cu fructe de sezon', image: 'https://images.unsplash.com/photo-1508736375612-66c03035c629?w=600&auto=format&fit=crop' },
    { name: 'Muffin Afine', price: 12, description: 'Muffin pufos cu afine proaspete', image: 'https://images.unsplash.com/photo-1613119719948-d53865658a88?w=600&auto=format&fit=crop' },
  ],
};

type Category = keyof typeof menuData;

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
          <h2 className="text-5xl font-bold text-white mb-4 drop-shadow-[0_6px_24px_rgba(0,0,0,1)]">Meniul Nostru</h2>
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
