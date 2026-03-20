export default function AboutStarter() {
  return (
    <section className="py-20 px-6 bg-white" id="despre">
      <div className="max-w-6xl mx-auto">

        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">

          {/* Imagine */}
          <div className="relative">
            <img
              src="https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1200&auto=format&fit=crop"
              alt="Interiorul Vibe Caffè"
              className="rounded-3xl w-full h-[500px] object-cover shadow-xl"
            />
            {/* Badge suprapus */}
            <div className="absolute -bottom-6 -right-6 bg-amber-700 text-white rounded-2xl px-6 py-4 shadow-lg">
              <p className="text-3xl font-bold">2019</p>
              <p className="text-sm">De când suntem aici</p>
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="text-amber-700 font-semibold text-lg mb-3 uppercase tracking-wider">
              Povestea noastră
            </p>
            <h2 className="text-5xl font-bold text-gray-900 mb-8">
              Mai mult decât o cafea
            </h2>

            <div className="space-y-6 text-gray-600 text-lg leading-relaxed">
              <p>
                Vibe Caffè s-a născut în 2019 dintr-o idee simplă: studenții merită un loc unde cafeaua e bună, prețurile sunt corecte și atmosfera te face să vrei să rămâi. Am deschis prima noastră locație chiar în inima campusului, la doi pași de amfiteatre și bibliotecă.
              </p>
              <p>
                Credem că o cafea bună poate schimba o zi întreagă. De aceea lucrăm doar cu boabe de specialitate, prăjite artizanal de parteneri locali, și ne pregătim baristele să trateze fiecare ceașcă ca pe o operă de artă.
              </p>
              <p>
                Astăzi, Vibe Caffè e mai mult decât o cafenea — e locul unde se nasc prietenii, se termină proiectele de la miezul nopții și se celebrează fiecare examen trecut. Te așteptăm!
              </p>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-6 mt-10 pt-10 border-t border-gray-100">
              <div>
                <p className="text-4xl font-bold text-amber-700">5k+</p>
                <p className="text-gray-500 text-sm mt-1">Studenți mulțumiți</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-amber-700">12+</p>
                <p className="text-gray-500 text-sm mt-1">Sortimente de cafea</p>
              </div>
              <div>
                <p className="text-4xl font-bold text-amber-700">4.9★</p>
                <p className="text-gray-500 text-sm mt-1">Rating Google</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
