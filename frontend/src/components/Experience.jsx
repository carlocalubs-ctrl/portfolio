import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Badge } from './ui/badge';
import { Briefcase, Calendar } from 'lucide-react';
import { portfolioData } from '../mockData';

export const Experience = () => {
  const { experience } = portfolioData;

  return (
    <section id="experience" className="relative py-20 bg-slate-950/60 backdrop-blur-[2px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Work Experience
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            A proven track record in customer service excellence and business process optimization
          </p>
        </div>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-0.5 h-full bg-gradient-to-b from-teal-500 to-emerald-500"></div>

            {experience.map((job, index) => (
              <div
                key={job.id}
                className={`relative mb-12 ${index % 2 === 0 ? 'md:pr-1/2' : 'md:pl-1/2'}`}
              >
                <div className={`md:w-1/2 ${index % 2 === 0 ? 'md:ml-auto md:pl-12' : 'md:pr-12'}`}>
                  <Card className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 backdrop-blur-sm">
                    <CardHeader>
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                          <Briefcase className="w-6 h-6 text-teal-400" />
                        </div>
                        <Badge variant="outline" className="border-teal-500/50 text-teal-400">
                          <Calendar className="w-3 h-3 mr-1" />
                          {job.period}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl text-white mb-2">
                        {job.title}
                      </CardTitle>
                      <div className="text-teal-400 font-medium mb-1">{job.company}</div>
                      <div className="text-sm text-slate-400 mb-3">Client: {job.client}</div>
                      <p className="text-slate-300 text-sm leading-relaxed">
                        {job.description}
                      </p>
                    </CardHeader>
                    <CardContent>
                      <h4 className="text-sm font-semibold text-slate-300 mb-3">Key Responsibilities:</h4>
                      <ul className="space-y-2">
                        {job.responsibilities.map((resp, idx) => (
                          <li key={idx} className="text-sm text-slate-400 pl-4 relative before:content-[''] before:absolute before:left-0 before:top-2 before:w-1.5 before:h-1.5 before:bg-teal-400 before:rounded-full">
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>
                </div>

                {/* Timeline Dot */}
                <div className="hidden md:block absolute left-1/2 top-8 transform -translate-x-1/2 w-4 h-4 rounded-full bg-teal-500 border-4 border-slate-950"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
