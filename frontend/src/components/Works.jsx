import { useState, useEffect } from 'react';
import { Card, CardContent } from './ui/card';
import { Badge } from './ui/badge';
import { Button } from './ui/button';
import { FolderOpen, PlayCircle, X, ZoomIn, ExternalLink } from 'lucide-react';
import { portfolioData } from '../mockData';

export const Works = () => {
  const { projects } = portfolioData;
  const [lightboxImage, setLightboxImage] = useState(null);
  const [videoProject, setVideoProject] = useState(null);

  // Close on ESC key
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

  // Lock body scroll when modal is open
  useEffect(() => {
    if (lightboxImage || videoProject) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [lightboxImage, videoProject]);

  return (
    <section id="works" className="relative py-20 bg-slate-900/60 backdrop-blur-[2px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Featured Projects
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Real-world automation workflows I&apos;ve built and deployed
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
          {projects.map((project) => (
            <Card
              key={project.id}
              data-testid={`project-card-${project.id}`}
              className="group bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 backdrop-blur-sm overflow-hidden flex flex-col"
            >
              {/* Thumbnail with Zoom */}
              <div
                className="relative aspect-[4/3] overflow-hidden bg-slate-900 cursor-zoom-in"
                onClick={() => setLightboxImage(project)}
                data-testid={`project-thumbnail-${project.id}`}
              >
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                  loading="lazy"
                />
                {/* Hover overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 via-slate-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                  <div className="flex items-center gap-2 text-white text-sm font-medium bg-teal-500/80 backdrop-blur px-4 py-2 rounded-full">
                    <ZoomIn className="w-4 h-4" /> Click to expand
                  </div>
                </div>
                {/* Category badge */}
                <div className="absolute top-3 left-3">
                  <Badge className="bg-slate-900/80 backdrop-blur text-teal-400 border border-teal-500/30">
                    {project.category}
                  </Badge>
                </div>
                {/* Live indicator */}
                {project.status === 'live' && (
                  <div className="absolute top-3 right-3 flex items-center gap-1.5 bg-slate-900/80 backdrop-blur px-2 py-1 rounded-full">
                    <span className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-pulse"></span>
                    <span className="text-xs text-emerald-400 font-medium">Live</span>
                  </div>
                )}
              </div>

              <CardContent className="p-5 flex-1 flex flex-col">
                <h3 className="text-lg font-semibold text-white mb-2 group-hover:text-teal-400 transition-colors line-clamp-2">
                  {project.title}
                </h3>
                <p className="text-sm text-slate-400 mb-4 flex-1 line-clamp-3">
                  {project.description}
                </p>

                {/* Tech stack tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.technologies.slice(0, 4).map((tech, idx) => (
                    <Badge
                      key={idx}
                      variant="outline"
                      className="border-slate-600 text-slate-300 text-xs bg-slate-900/40"
                    >
                      {tech}
                    </Badge>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 mt-auto">
                  {project.video ? (
                    <Button
                      onClick={() => setVideoProject(project)}
                      data-testid={`project-watch-demo-${project.id}`}
                      className="flex-1 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white text-sm h-9"
                    >
                      <PlayCircle className="w-4 h-4 mr-2" />
                      Watch Demo
                    </Button>
                  ) : (
                    <Button
                      onClick={() => setLightboxImage(project)}
                      data-testid={`project-view-${project.id}`}
                      variant="outline"
                      className="flex-1 border-slate-700 text-slate-300 hover:bg-slate-800 hover:text-white text-sm h-9"
                    >
                      <FolderOpen className="w-4 h-4 mr-2" />
                      View Workflow
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>

      {/* Image Lightbox */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
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

      {/* Video Player Modal */}
      {videoProject && (
        <div
          className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-md flex items-center justify-center p-4 sm:p-8 animate-in fade-in duration-200"
          onClick={() => setVideoProject(null)}
          data-testid="video-modal-overlay"
        >
          <button
            onClick={() => setVideoProject(null)}
            className="absolute top-4 right-4 sm:top-6 sm:right-6 w-11 h-11 rounded-full bg-slate-800 hover:bg-slate-700 border border-slate-700 flex items-center justify-center text-white transition-colors z-10"
            data-testid="video-modal-close"
            aria-label="Close video"
          >
            <X className="w-5 h-5" />
          </button>

          <div
            className="relative max-w-6xl w-full"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-slate-900 rounded-lg overflow-hidden shadow-2xl border border-slate-700">
              <video
                src={videoProject.video}
                controls
                autoPlay
                className="w-full h-auto max-h-[75vh] bg-black"
                data-testid="video-player"
              >
                Your browser does not support the video tag.
              </video>
              <div className="p-5 border-t border-slate-800">
                <h3 className="text-white text-xl font-semibold mb-1">
                  {videoProject.title}
                </h3>
                <p className="text-slate-400 text-sm">{videoProject.category}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
