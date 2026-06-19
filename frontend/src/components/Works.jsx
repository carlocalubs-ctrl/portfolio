import { useState, useEffect } from 'react';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { PlayCircle, X, ZoomIn, ArrowUpRight, Code2 } from 'lucide-react';
import { portfolioData } from '../mockData';
import { ScrollReveal } from '../hooks/useScrollReveal';

export const Works = () => {
  const { projects } = portfolioData;
  const [lightboxImage, setLightboxImage] = useState(null);
  const [videoProject, setVideoProject] = useState(null);
  const [activeFilter, setActiveFilter] = useState('All');

  // Build unique category list
  const categories = ['All', ...new Set(projects.map((p) => p.category))];
  const filteredProjects =
    activeFilter === 'All'
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  // Close on ESC
  useEffect(() => {
    const handleKey = (e) => {
      if (e.key === 'Escape') {
        setLightboxImage(null);
        setVideoProject(null);
      }
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, []);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = lightboxImage || videoProject ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxImage, videoProject]);

  return (
    <section id="works" className="relative py-24 bg-slate-900/60 backdrop-blur-[2px] overflow-hidden">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <span className="inline-block w-8 h-[2px] bg-teal-400"></span>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
              Portfolio
            </span>
            <span className="inline-block w-8 h-[2px] bg-teal-400"></span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Featured
            </span>{' '}
            <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent italic">
              Projects
            </span>
          </h2>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto">
            Real-world automation workflows I&apos;ve built and deployed for clients
          </p>
          </div>
        </ScrollReveal>

        {/* Category Filter Tabs */}
        <ScrollReveal delay={100}>
        <div className="flex flex-wrap items-center justify-center gap-2 mb-16">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveFilter(cat)}
              data-testid={`filter-${cat.toLowerCase().replace(/\s/g, '-')}`}
              className={`px-4 py-2 text-sm font-medium rounded-full transition-all duration-300 ${
                activeFilter === cat
                  ? 'bg-gradient-to-r from-teal-500 to-emerald-500 text-white shadow-lg shadow-teal-500/20'
                  : 'bg-slate-800/50 text-slate-400 border border-slate-700 hover:border-teal-500/50 hover:text-teal-300'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
        </ScrollReveal>

        {/* Alternating Zigzag Layout */}
        <div className="max-w-7xl mx-auto space-y-20 sm:space-y-32">
          {filteredProjects.map((project, index) => {
            const isReversed = index % 2 === 1;
            return (
              <ScrollReveal
                key={project.id}
                delay={50}
                direction={isReversed ? 'left' : 'right'}
                distance={40}
              >
              <div
                data-testid={`project-row-${project.id}`}
                className={`grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center ${
                  isReversed ? 'lg:[direction:rtl]' : ''
                }`}
              >
                {/* Image Side */}
                <div
                  className="lg:col-span-7 [direction:ltr] group cursor-zoom-in relative"
                  onClick={() => setLightboxImage(project)}
                  data-testid={`project-thumbnail-${project.id}`}
                >
                  {/* Decorative number */}
                  <div className="absolute -top-8 -left-2 lg:-left-4 text-[8rem] lg:text-[10rem] font-bold text-teal-500/10 leading-none pointer-events-none select-none z-0">
                    {String(index + 1).padStart(2, '0')}
                  </div>

                  {/* Image container */}
                  <div className="relative rounded-2xl overflow-hidden border border-slate-700/50 group-hover:border-teal-500/50 transition-all duration-500 bg-slate-900 shadow-2xl shadow-black/40 z-10">
                    {/* Glow on hover */}
                    <div className="absolute -inset-1 bg-gradient-to-r from-teal-500/0 via-emerald-500/30 to-cyan-500/0 blur-2xl opacity-0 group-hover:opacity-60 transition-opacity duration-500 pointer-events-none"></div>

                    <div className="relative aspect-[16/10] overflow-hidden">
                      <img
                        src={project.image}
                        alt={project.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        loading="lazy"
                      />
                      {/* Dark overlay on hover */}
                      <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

                      {/* Zoom indicator */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-center gap-2 text-white text-sm font-medium bg-teal-500/90 backdrop-blur px-4 py-2 rounded-full opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                        <ZoomIn className="w-4 h-4" /> View workflow
                      </div>

                      {/* Status badges */}
                      <div className="absolute top-4 left-4 flex flex-col gap-2">
                        <Badge className="bg-slate-900/80 backdrop-blur text-teal-300 border border-teal-500/30 px-3 py-1">
                          {project.category}
                        </Badge>
                      </div>
                      {project.status === 'live' && (
                        <div className="absolute top-4 right-4 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur px-2.5 py-1 rounded-full border border-emerald-500/30">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400"></span>
                          </span>
                          <span className="text-xs text-emerald-300 font-medium">Live</span>
                        </div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Content Side */}
                <div className="lg:col-span-5 [direction:ltr]">
                  {/* Project number tag */}
                  <div className="flex items-center gap-2 mb-3">
                    <span className="text-xs font-mono text-teal-400">
                      / Project {String(index + 1).padStart(2, '0')}
                    </span>
                    <span className="flex-1 h-px bg-gradient-to-r from-teal-500/40 to-transparent"></span>
                  </div>

                  {/* Title */}
                  <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-white mb-4 leading-tight">
                    {project.title}
                  </h3>

                  {/* Description */}
                  <p className="text-slate-400 text-base lg:text-lg leading-relaxed mb-6">
                    {project.description}
                  </p>

                  {/* Tech stack */}
                  <div className="mb-8">
                    <div className="flex items-center gap-2 mb-3 text-xs text-slate-500 uppercase tracking-wider font-semibold">
                      <Code2 className="w-3.5 h-3.5" />
                      <span>Tech Stack</span>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.technologies.map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-3 py-1 text-xs text-slate-300 bg-slate-800/70 border border-slate-700 rounded-md hover:border-teal-500/50 hover:text-teal-300 transition-colors"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="flex flex-wrap items-center gap-3">
                    {project.video ? (
                      <Button
                        onClick={() => setVideoProject(project)}
                        data-testid={`project-watch-demo-${project.id}`}
                        className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium px-6 group"
                      >
                        <PlayCircle className="w-4 h-4 mr-2" />
                        Watch Demo
                        <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Button>
                    ) : (
                      <Button
                        onClick={() => setLightboxImage(project)}
                        data-testid={`project-view-${project.id}`}
                        className="bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium px-6 group"
                      >
                        <ZoomIn className="w-4 h-4 mr-2" />
                        View Workflow
                        <ArrowUpRight className="w-4 h-4 ml-1 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </Button>
                    )}
                  </div>
                </div>
              </div>
              </ScrollReveal>
            );
          })}

          {filteredProjects.length === 0 && (
            <div className="text-center py-16">
              <p className="text-slate-400 text-lg">No projects in this category yet.</p>
            </div>
          )}
        </div>
      </div>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8"
          onClick={() => setLightboxImage(null)}
          data-testid="lightbox-overlay"
        >
          <button
            onClick={() => setLightboxImage(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white transition-colors z-10"
            data-testid="lightbox-close"
            aria-label="Close lightbox"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative max-w-7xl w-full max-h-full"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage.image}
              alt={lightboxImage.title}
              className="w-full h-auto max-h-[80vh] object-contain rounded-lg shadow-2xl"
            />
            <div className="mt-4 text-center">
              <h3 className="text-white text-xl font-semibold mb-1">
                {lightboxImage.title}
              </h3>
              <p className="text-slate-400 text-sm">{lightboxImage.category}</p>
            </div>
          </div>
        </div>
      )}

      {/* Video Modal */}
      {videoProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-2 sm:p-4 md:p-6"
          onClick={() => setVideoProject(null)}
          data-testid="video-modal-overlay"
        >
          <button
            onClick={() => setVideoProject(null)}
            className="absolute top-3 right-3 sm:top-5 sm:right-5 w-10 h-10 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white transition-colors z-20"
            data-testid="video-modal-close"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative w-full h-full flex flex-col items-center justify-center max-w-6xl mx-auto"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="w-full max-h-full bg-slate-900 rounded-lg overflow-hidden shadow-2xl border border-slate-700 flex flex-col">
              <div className="relative w-full bg-black flex items-center justify-center" style={{ maxHeight: 'calc(100vh - 180px)' }}>
                <video
                  src={videoProject.video}
                  controls
                  autoPlay
                  playsInline
                  className="w-full h-auto max-h-[calc(100vh-180px)] object-contain"
                  data-testid="video-player"
                >
                  Your browser does not support the video tag.
                </video>
              </div>
              <div className="p-4 sm:p-5 border-t border-slate-800 flex-shrink-0">
                <h3 className="text-white text-base sm:text-lg font-semibold mb-1 truncate">
                  {videoProject.title}
                </h3>
                <p className="text-slate-400 text-xs sm:text-sm">{videoProject.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
