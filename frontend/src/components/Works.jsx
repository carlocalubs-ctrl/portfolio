import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Badge } from './ui/badge';
import { FolderOpen, ExternalLink } from 'lucide-react';
import { portfolioData } from '../mockData';

export const Works = () => {
  const { projects } = portfolioData;

  return (
    <section id="works" className="relative py-20 bg-slate-900/60 backdrop-blur-[2px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Previous Works
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            A showcase of automation projects and integrations I've delivered
          </p>
        </div>

        {/* Projects Grid */}
        <div className="max-w-4xl mx-auto">
          {projects[0].status === 'placeholder' ? (
            <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
              <CardHeader className="text-center py-16">
                <div className="w-20 h-20 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-6">
                  <FolderOpen className="w-10 h-10 text-teal-400" />
                </div>
                <CardTitle className="text-2xl text-white mb-4">
                  Projects Coming Soon
                </CardTitle>
                <CardDescription className="text-slate-400 text-lg">
                  Exciting project case studies and portfolio pieces will be added here.
                  Check back soon to see my latest work!
                </CardDescription>
              </CardHeader>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {projects.map((project) => (
                <Card
                  key={project.id}
                  className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm group cursor-pointer"
                >
                  <CardHeader>
                    <div className="flex items-start justify-between mb-4">
                      <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all">
                        <FolderOpen className="w-6 h-6 text-teal-400" />
                      </div>
                      <ExternalLink className="w-5 h-5 text-slate-500 group-hover:text-teal-400 transition-colors" />
                    </div>
                    <CardTitle className="text-xl text-white group-hover:text-teal-400 transition-colors mb-2">
                      {project.title}
                    </CardTitle>
                    <CardDescription className="text-slate-400">
                      {project.description}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2">
                      <Badge variant="secondary" className="bg-slate-700/50 text-slate-300 border-slate-600">
                        {project.category}
                      </Badge>
                      {project.technologies.map((tech, idx) => (
                        <Badge
                          key={idx}
                          variant="outline"
                          className="border-teal-500/30 text-teal-400"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  );
};
