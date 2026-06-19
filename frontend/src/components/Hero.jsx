import { Button } from './ui/button';
import { ArrowRight, Download, Zap, Bot } from 'lucide-react';
import { portfolioData } from '../mockData';

export const Hero = () => {
  const { hero, profileVideo } = portfolioData;

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Soft gradient overlay - lets background animation show */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-900/40 via-transparent to-slate-900/40 pointer-events-none"></div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Badge */}
          <div className="flex justify-center mb-8">
            <div className="inline-flex items-center px-4 py-2 rounded-full bg-slate-800/50 backdrop-blur-sm border border-teal-500/20">
              <span className="w-2 h-2 bg-teal-400 rounded-full mr-2 animate-pulse"></span>
              <span className="text-sm text-slate-300">Available for Projects</span>
            </div>
          </div>

          {/* Main Content - Two Column Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Text Content */}
            <div className="text-center lg:text-left">
              {/* Main Title */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold mb-6 leading-[1.05] tracking-tight">
                <span className="bg-gradient-to-r from-white via-slate-100 to-slate-300 bg-clip-text text-transparent">
                  John Carlo R.
                </span>
                <br />
                <span className="bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300 bg-clip-text text-transparent">
                  Calubiran
                </span>
              </h1>

              {/* Subtitle */}
              <div className="text-2xl sm:text-3xl lg:text-4xl font-semibold mb-6">
                <span className="bg-gradient-to-r from-teal-400 to-emerald-400 bg-clip-text text-transparent">
                  {hero.subtitle}
                </span>
              </div>

              {/* Description */}
              <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                {hero.description}
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row items-center lg:items-start gap-4 mb-12">
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
              <div className="grid grid-cols-3 gap-6 pt-8 border-t border-slate-800">
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

            {/* Right Column - Profile Video */}
            <div className="flex justify-center lg:justify-end">
              <div className="relative animate-float cursor-hover-target">
                {/* Soft Glow Behind Video */}
                <div className="absolute inset-0 bg-gradient-to-r from-teal-500/20 via-emerald-500/20 to-cyan-500/20 blur-3xl animate-pulse-glow rounded-3xl"></div>

                {/* Rounded Square Container with Animated Border */}
                <div className="relative w-[20rem] h-[20rem] sm:w-[24rem] sm:h-[24rem] lg:w-[30rem] lg:h-[30rem]">
                  {/* Animated Gradient Border (rounded square) */}
                  <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-teal-500 via-emerald-500 to-cyan-500 bg-[length:300%_300%]" style={{ animation: 'borderRotate 6s ease infinite' }}></div>
                  
                  {/* Inner background to make border visible */}
                  <div className="absolute inset-0 rounded-3xl bg-slate-900 z-0"></div>
                  
                  {/* Video Container - Rounded square, shows full video */}
                  <div className="absolute inset-[4px] rounded-3xl overflow-hidden bg-slate-900 z-10 flex items-center justify-center">
                    <video
                      src={profileVideo}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain animate-scale-in"
                      style={{ 
                        mixBlendMode: 'screen',
                        filter: 'contrast(1.15) brightness(1.05) saturate(1.1)'
                      }}
                    />
                  </div>

                  {/* Decorative Rotating Ring (subtle) */}
                  <div className="absolute -inset-4 rounded-3xl border-2 border-dashed border-teal-500/20 animate-spin pointer-events-none" style={{ animationDuration: '25s' }}></div>
                </div>

                {/* Floating Badge - Top */}
                <div className="absolute -top-3 -right-3 sm:-right-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg animate-bounce flex items-center gap-1 z-20" style={{ animationDuration: '3s' }}>
                  <Zap className="w-3 h-3" /> Automation Expert
                </div>

                {/* Floating Badge - Bottom */}
                <div className="absolute -bottom-3 -left-3 sm:-left-4 bg-slate-800 border border-teal-500/30 text-teal-400 px-3 py-1.5 rounded-full text-xs font-semibold shadow-lg animate-float flex items-center gap-1 z-20" style={{ animationDuration: '4s', animationDelay: '1s' }}>
                  <Bot className="w-3 h-3" /> AI Specialist
                </div>
              </div>
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
