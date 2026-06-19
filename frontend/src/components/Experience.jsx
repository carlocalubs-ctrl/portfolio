import { useState } from 'react';
import { Badge } from './ui/badge';
import { Briefcase, Calendar, MapPin, ChevronDown, Sparkles, Building2 } from 'lucide-react';
import { portfolioData } from '../mockData';
import { ScrollReveal } from '../hooks/useScrollReveal';

export const Experience = () => {
  const { experience } = portfolioData;
  // Open all cards by default (first one) so users see the responsibilities
  const [expandedId, setExpandedId] = useState(experience[0]?.id);

  const isCurrentRole = (period) => /present/i.test(period);

  return (
    <section
      id="experience"
      className="relative py-24 bg-slate-950/60 backdrop-blur-[2px] overflow-hidden"
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <ScrollReveal>
          <div className="max-w-4xl mx-auto mb-16">
          <div className="flex items-center gap-3 mb-4 justify-center">
            <span className="inline-block w-8 h-[2px] bg-teal-400"></span>
            <span className="text-teal-400 text-sm font-semibold uppercase tracking-widest">
              Career
            </span>
            <span className="inline-block w-8 h-[2px] bg-teal-400"></span>
          </div>
          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold text-center mb-4 tracking-tight">
            <span className="bg-gradient-to-r from-white via-slate-100 to-slate-400 bg-clip-text text-transparent">
              Work
            </span>{' '}
            <span className="bg-gradient-to-r from-teal-300 to-emerald-300 bg-clip-text text-transparent italic">
              Experience
            </span>
          </h2>
          <p className="text-lg text-slate-400 text-center max-w-2xl mx-auto">
            A proven track record across customer service, business process, and AI automation
          </p>
          </div>
        </ScrollReveal>

        {/* Experience Cards - Vertical stacked with vertical timeline rail */}
        <div className="max-w-5xl mx-auto relative">
          {/* Vertical rail */}
          <div className="absolute left-4 sm:left-8 top-4 bottom-4 w-px bg-gradient-to-b from-teal-500/50 via-teal-500/20 to-transparent hidden sm:block" />

          <div className="space-y-6 sm:space-y-8">
            {experience.map((job, index) => {
              const isExpanded = expandedId === job.id;
              const current = isCurrentRole(job.period);

              return (
                <ScrollReveal key={job.id} delay={index * 100}>
                <div
                  data-testid={`experience-card-${job.id}`}
                  className="relative sm:pl-20"
                >
                  {/* Timeline dot */}
                  <div className="absolute left-0 top-6 hidden sm:block z-10">
                    <div className="relative">
                      {current && (
                        <div className="absolute inset-0 rounded-full bg-emerald-400 animate-ping opacity-60"></div>
                      )}
                      <div
                        className={`relative w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                          current
                            ? 'bg-gradient-to-br from-emerald-400 to-teal-500 border-emerald-300 shadow-lg shadow-emerald-500/40'
                            : 'bg-slate-800 border-teal-500/50'
                        }`}
                      >
                        <Briefcase
                          className={`w-3.5 h-3.5 ${current ? 'text-white' : 'text-teal-400'}`}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Card */}
                  <div
                    className={`group relative bg-gradient-to-br from-slate-800/70 to-slate-900/70 border ${
                      current
                        ? 'border-emerald-500/40 shadow-lg shadow-emerald-500/10'
                        : 'border-slate-700/60'
                    } hover:border-teal-500/50 rounded-2xl overflow-hidden transition-all duration-300 backdrop-blur-sm`}
                  >
                    {/* Hover gradient accent */}
                    <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-teal-400/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>

                    {/* Header - Always visible */}
                    <button
                      onClick={() => setExpandedId(isExpanded ? null : job.id)}
                      className="w-full text-left p-6 sm:p-8 flex flex-col sm:flex-row sm:items-start gap-4 cursor-pointer"
                      data-testid={`experience-toggle-${job.id}`}
                      aria-expanded={isExpanded}
                    >
                      {/* Index number for mobile */}
                      <div className="sm:hidden">
                        <div className="inline-flex items-center gap-2">
                          <div className={`w-8 h-8 rounded-full flex items-center justify-center border-2 ${
                            current
                              ? 'bg-gradient-to-br from-emerald-400 to-teal-500 border-emerald-300'
                              : 'bg-slate-800 border-teal-500/50'
                          }`}>
                            <Briefcase className={`w-3.5 h-3.5 ${current ? 'text-white' : 'text-teal-400'}`} />
                          </div>
                          {current && (
                            <span className="text-xs text-emerald-300 font-semibold uppercase tracking-wider">Current</span>
                          )}
                        </div>
                      </div>

                      <div className="flex-1 min-w-0">
                        {/* Period badge + Current indicator */}
                        <div className="flex flex-wrap items-center gap-2 mb-3">
                          <Badge
                            variant="outline"
                            className={`${
                              current
                                ? 'border-emerald-500/50 text-emerald-300 bg-emerald-500/10'
                                : 'border-teal-500/30 text-teal-400'
                            } text-xs px-2.5 py-0.5`}
                          >
                            <Calendar className="w-3 h-3 mr-1" />
                            {job.period}
                          </Badge>
                          {current && (
                            <Badge className="bg-emerald-500/15 text-emerald-300 border-emerald-500/30 text-xs px-2.5 py-0.5 hidden sm:inline-flex">
                              <Sparkles className="w-3 h-3 mr-1" />
                              Current Role
                            </Badge>
                          )}
                          <span className="text-xs font-mono text-slate-500 ml-auto hidden sm:inline">
                            / {String(index + 1).padStart(2, '0')}
                          </span>
                        </div>

                        {/* Title */}
                        <h3 className="text-xl sm:text-2xl font-bold text-white group-hover:text-teal-300 transition-colors leading-tight mb-2">
                          {job.title}
                        </h3>

                        {/* Company + Client info */}
                        <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm mb-3">
                          <div className="flex items-center gap-1.5 text-teal-400 font-semibold">
                            <Building2 className="w-3.5 h-3.5" />
                            {job.company}
                          </div>
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <MapPin className="w-3.5 h-3.5" />
                            {job.client}
                          </div>
                        </div>

                        {/* Short description */}
                        <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
                          {job.description}
                        </p>
                      </div>

                      {/* Expand chevron */}
                      <div className="flex-shrink-0 self-start sm:self-center">
                        <div
                          className={`w-10 h-10 rounded-full bg-slate-800/80 border border-slate-700 flex items-center justify-center group-hover:bg-teal-500/20 group-hover:border-teal-500/50 transition-all ${
                            isExpanded ? 'bg-teal-500/20 border-teal-500/50' : ''
                          }`}
                        >
                          <ChevronDown
                            className={`w-5 h-5 text-teal-400 transition-transform duration-300 ${
                              isExpanded ? 'rotate-180' : ''
                            }`}
                          />
                        </div>
                      </div>
                    </button>

                    {/* Expandable Responsibilities */}
                    <div
                      className={`overflow-hidden transition-all duration-500 ease-in-out ${
                        isExpanded ? 'max-h-[2000px] opacity-100' : 'max-h-0 opacity-0'
                      }`}
                    >
                      <div className="px-6 sm:px-8 pb-6 sm:pb-8 pt-2 border-t border-slate-700/50">
                        <h4 className="text-xs font-semibold text-teal-400 uppercase tracking-wider mb-4 mt-4 flex items-center gap-2">
                          <span className="inline-block w-6 h-px bg-teal-400"></span>
                          Key Responsibilities & Achievements
                        </h4>
                        <ul className="grid grid-cols-1 md:grid-cols-2 gap-3">
                          {job.responsibilities.map((resp, idx) => (
                            <li
                              key={idx}
                              className="flex items-start gap-3 text-sm text-slate-300 group/item"
                            >
                              <div className="flex-shrink-0 mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-400 group-hover/item:bg-emerald-300 group-hover/item:scale-150 transition-all"></div>
                              <span className="leading-relaxed group-hover/item:text-white transition-colors">
                                {resp}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
                </ScrollReveal>
              );
            })}
          </div>
        </div>

        {/* Bottom stats / accent */}
        <ScrollReveal delay={200}>
          <div className="max-w-3xl mx-auto mt-16 grid grid-cols-3 gap-4 pt-8 border-t border-slate-800">
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-teal-300 to-emerald-400 bg-clip-text text-transparent">
              {experience.length}+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Roles Held</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-teal-300 to-emerald-400 bg-clip-text text-transparent">
              4+
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Years Experience</div>
          </div>
          <div className="text-center">
            <div className="text-3xl sm:text-4xl font-bold bg-gradient-to-br from-teal-300 to-emerald-400 bg-clip-text text-transparent">
              3
            </div>
            <div className="text-xs sm:text-sm text-slate-400 mt-1">Industries</div>
          </div>
        </div>
        </ScrollReveal>
      </div>
    </section>
  );
};
