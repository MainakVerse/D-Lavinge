import { useState } from 'react';

const chapters = [
  { id: 'hero', label: 'El Edificio' },
  { id: 'facade', label: 'La Fachada' },
  { id: 'gallery', label: 'Salon' },
  { id: 'works', label: 'Las Obras' },
  { id: 'staircase', label: 'El Descenso' },
  { id: 'second-gallery', label: 'Mansarde' },
];

export default function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const scrollToSection = (id: string) => {
    setIsMenuOpen(false);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-[9000] px-6 md:px-8 py-6 flex items-center justify-between">
      <div className="font-display text-xl tracking-tight text-[#D4AF37]">
        D&apos;LAVIGNE
      </div>

      <div className="hidden md:flex items-center gap-8">
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => scrollToSection(chapter.id)}
            className="relative font-sans text-sm text-[#e8e4df] hover:text-[#D4AF37] transition-colors group"
            data-testid={`nav-link-${chapter.id}`}
          >
            <span className="small-caps text-xs">{chapter.label}</span>
            <span className="absolute bottom-0 left-0 w-0 h-[1px] bg-[#D4AF37] group-hover:w-full transition-all duration-500" />
          </button>
        ))}
      </div>

      <button
        onClick={() => setIsMenuOpen((open) => !open)}
        className="md:hidden relative z-[9100] w-8 h-8 flex flex-col items-center justify-center gap-[6px]"
        aria-label={isMenuOpen ? 'Close menu' : 'Open menu'}
        aria-expanded={isMenuOpen}
        data-testid="button-mobile-menu-toggle"
      >
        <span
          className="block w-6 h-[1px] bg-[#D4AF37] transition-transform duration-300"
          style={
            isMenuOpen
              ? { transform: 'translateY(3.5px) rotate(45deg)' }
              : undefined
          }
        />
        <span
          className="block w-6 h-[1px] bg-[#D4AF37] transition-transform duration-300"
          style={
            isMenuOpen
              ? { transform: 'translateY(-3.5px) rotate(-45deg)' }
              : undefined
          }
        />
      </button>

      <div
        className={`md:hidden fixed inset-0 z-[9050] flex flex-col items-center justify-center gap-8 bg-[#0a1628] transition-opacity duration-300 ${
          isMenuOpen
            ? 'opacity-100 pointer-events-auto'
            : 'opacity-0 pointer-events-none'
        }`}
      >
        {chapters.map((chapter) => (
          <button
            key={chapter.id}
            onClick={() => scrollToSection(chapter.id)}
            className="font-display text-2xl text-[#e8e4df] hover:text-[#D4AF37] transition-colors"
            data-testid={`nav-link-mobile-${chapter.id}`}
          >
            <span className="small-caps">{chapter.label}</span>
          </button>
        ))}
      </div>
    </nav>
  );
}
