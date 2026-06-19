import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { portfolioData } from '../mockData';

export const Testimonials = () => {
  const { testimonials } = portfolioData;
  const featured = testimonials.find((t) => t.featured);
  const regular = testimonials.filter((t) => !t.featured);

  return (
    <section id="testimonials" className="relative py-20 bg-slate-950/60 backdrop-blur-[2px]">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Client Testimonials
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            What clients say about working with me
          </p>
        </div>

        {/* Featured Testimonial */}
        {featured && (
          <div className="max-w-6xl mx-auto mb-12">
            <Card
              data-testid="testimonial-featured-card"
              className="overflow-hidden bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 backdrop-blur-sm"
            >
              <div className="grid grid-cols-1 md:grid-cols-2">
                {/* Left: Full Photo */}
                <div className="relative bg-slate-900 min-h-[400px] md:min-h-[520px]">
                  <img
                    src={featured.fullImage || featured.avatar}
                    alt={`John Carlo with ${featured.name}`}
                    className="absolute inset-0 w-full h-full object-cover"
                  />
                  {/* Soft right-edge gradient to blend into card */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-transparent to-slate-800/40 md:to-slate-800/60 pointer-events-none"></div>

                  {/* "Featured" Badge */}
                  <div className="absolute top-4 left-4 bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-3 py-1 rounded-full text-xs font-semibold shadow-lg flex items-center gap-1">
                    <Star className="w-3 h-3 fill-white" />
                    Featured Testimonial
                  </div>
                </div>

                {/* Right: Text Content */}
                <CardContent className="p-8 md:p-10 flex flex-col justify-center">
                  {/* Initials bubble + Quote icon row */}
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 rounded-full bg-gradient-to-br from-teal-500/30 to-emerald-500/30 border-2 border-teal-500/40 flex items-center justify-center text-teal-300 font-bold text-lg flex-shrink-0">
                      {featured.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center">
                      <Quote className="w-6 h-6 text-teal-400" />
                    </div>
                  </div>

                  {/* Rating */}
                  <div className="flex gap-1 mb-4">
                    {[...Array(featured.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-5 h-5 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  {/* Quote */}
                  <p className="text-slate-200 text-lg leading-relaxed italic mb-6">
                    &ldquo;{featured.content}&rdquo;
                  </p>

                  {/* Author Details */}
                  <div className="border-t border-slate-700 pt-5">
                    <div className="font-semibold text-white text-xl mb-1">
                      {featured.name}
                    </div>
                    <div className="text-sm text-teal-400 font-medium">
                      {featured.position}
                    </div>
                    <div className="text-sm text-slate-500">
                      {featured.company}
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          </div>
        )}

        {/* Regular Testimonials Grid */}
        {regular.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
            {regular.map((testimonial) => (
              <Card
                key={testimonial.id}
                data-testid={`testimonial-card-${testimonial.id}`}
                className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 backdrop-blur-sm group"
              >
                <CardContent className="pt-6">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all">
                    <Quote className="w-6 h-6 text-teal-400" />
                  </div>

                  <div className="flex gap-1 mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star
                        key={i}
                        className="w-4 h-4 fill-yellow-400 text-yellow-400"
                      />
                    ))}
                  </div>

                  <p className="text-slate-300 mb-6 leading-relaxed italic">
                    &ldquo;{testimonial.content}&rdquo;
                  </p>

                  <div className="border-t border-slate-700 pt-4 flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/30 to-emerald-500/30 flex items-center justify-center text-teal-300 font-semibold flex-shrink-0">
                      {testimonial.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-semibold text-white mb-0.5 truncate">{testimonial.name}</div>
                      <div className="text-sm text-teal-400 truncate">{testimonial.position}</div>
                      <div className="text-xs text-slate-500 truncate">{testimonial.company}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};
