import { Button } from './ui/button';
import { ArrowRight, Download } from 'lucide-react';
import { portfolioData } from '../mockData';

export const Hero = () => {
  const { hero } = portfolioData;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-0 -left-4 w-72 h-72 bg-teal-500 rounded-full mix-blend-multiply filter blur-xl animate-blob"></div>
          <div className="absolute top-0 -right-4 w-72 h-72 bg-emerald-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-2000"></div>
          <div className="absolute -bottom-8 left-20 w-72 h-72 bg-cyan-500 rounded-full mix-blend-multiply filter blur-xl animate-blob animation-delay-4000"></div>
        </div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Badge */}
          <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-teal-500/20 mb-8">
            <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>
            <span className="text-sm text-slate-300">Available for Projects</span>
          </div>

          {/* Main Title */}
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              {hero.title}
            </span>
          </h1>

          {/* Subtitle */}
          <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
            <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
              {hero.subtitle}
            </span>
          </div>

          {/* Description */}
          <p className="text-lg sm:text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            {hero.description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button
              size="lg"
              onClick={() => scrollToSection('contact')}
              className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium px-8 py-6 text-lg group"
            >
              Let's Work Together
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => scrollToSection('works')}
              className="border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white px-8 py-6 text-lg"
            >
              View My Work
            </Button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-16 pt-8 border-t border-slate-800">
            <div>
              <div className="text-3xl font-bold text-teal-400 mb-2">4+</div>
              <div className="text-sm text-slate-400">Years Experience</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-emerald-400 mb-2">4</div>
              <div className="text-sm text-slate-400">Automation Tools</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-cyan-400 mb-2">100%</div>
              <div className="text-sm text-slate-400">Client Satisfaction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-slate-600 rounded-full flex items-start justify-center p-2">
          <div className="w-1 h-2 bg-teal-400 rounded-full"></div>
        </div>
      </div>
    </section>
  );
};
