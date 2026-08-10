export default function Footer() {
  return (
    <footer className="relative bg-[#e8e4df] text-[#0a1628] py-24 px-8">
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-[#D4AF37]" />
      
      <div className="container mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-16 mb-16">
          <div>
            <h3 className="font-display text-2xl mb-6 text-[#D4AF37]">Navigation</h3>
            <ul className="space-y-3">
              <li>
                <a href="#hero" className="font-sans text-sm hover:text-[#D4AF37] transition-colors">
                  El Edificio
                </a>
              </li>
              <li>
                <a href="#facade" className="font-sans text-sm hover:text-[#D4AF37] transition-colors">
                  La Fachada
                </a>
              </li>
              <li>
                <a href="#gallery" className="font-sans text-sm hover:text-[#D4AF37] transition-colors">
                  Salon d&apos;Exposition
                </a>
              </li>
              <li>
                <a href="#works" className="font-sans text-sm hover:text-[#D4AF37] transition-colors">
                  Las Obras
                </a>
              </li>
              <li>
                <a href="#staircase" className="font-sans text-sm hover:text-[#D4AF37] transition-colors">
                  El Descenso
                </a>
              </li>
              <li>
                <a href="#second-gallery" className="font-sans text-sm hover:text-[#D4AF37] transition-colors">
                  Mansarde Nocturne
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-display text-2xl mb-6 text-[#D4AF37]">Contact</h3>
            <div className="font-sans text-sm space-y-2">
              <p>D&apos;LAVIGNE GALERIE</p>
              <p>14 Rue de la Solitude</p>
              <p>75014 París, France</p>
              <p className="mt-4">contact@dlavigne.paris</p>
              <p>+33 1 45 67 89 00</p>
            </div>
          </div>
        </div>

        <div className="border-t border-[#D4AF37]/30 pt-8">
          <p className="font-display text-sm text-center italic">
            14 Rue de la Solitude, 75014 París. Solo con cita previa.
          </p>
        </div>
      </div>
    </footer>
  );
}
