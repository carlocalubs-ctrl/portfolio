import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Headset, Bot, Plug, Database, Check } from 'lucide-react';
import { portfolioData } from '../mockData';

const iconMap = {
  headset: Headset,
  bot: Bot,
  plug: Plug,
  database: Database
};

export const Services = () => {
  const { services } = portfolioData;

  return (
    <section id="services" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Services I Offer
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Comprehensive solutions to streamline your business operations and enhance customer experiences
          </p>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => {
            const IconComponent = iconMap[service.icon];
            return (
              <Card
                key={service.id}
                className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 hover:transform hover:scale-105 backdrop-blur-sm group"
              >
                <CardHeader>
                  <div className="w-14 h-14 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all">
                    <IconComponent className="w-7 h-7 text-teal-400" />
                  </div>
                  <CardTitle className="text-xl text-white group-hover:text-teal-400 transition-colors">
                    {service.title}
                  </CardTitle>
                  <CardDescription className="text-slate-400">
                    {service.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center text-sm text-slate-300">
                        <Check className="w-4 h-4 text-teal-400 mr-2 flex-shrink-0" />
                        {feature}
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Skills Section */}
        <div className="mt-20 max-w-4xl mx-auto">
          <h3 className="text-2xl font-bold text-center mb-10 text-white">
            Automation Tools Expertise
          </h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {portfolioData.skills
              .filter(skill => skill.category === 'Automation')
              .map((skill, index) => (
                <div
                  key={index}
                  className="bg-slate-800/50 backdrop-blur-sm border border-slate-700 rounded-lg p-6 text-center hover:border-teal-500/50 transition-all duration-300"
                >
                  <div className="text-3xl font-bold text-teal-400 mb-2">{skill.level}%</div>
                  <div className="text-slate-300 font-medium">{skill.name}</div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
};
