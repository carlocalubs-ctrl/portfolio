import { Card, CardContent } from './ui/card';
import { Star, Quote } from 'lucide-react';
import { portfolioData } from '../mockData';

export const Testimonials = () => {
  const { testimonials } = portfolioData;

  return (
    <section id="testimonials" className="py-20 bg-slate-950">
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

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <Card
              key={testimonial.id}
              className="bg-slate-800/50 border-slate-700 hover:border-teal-500/50 transition-all duration-300 backdrop-blur-sm group"
            >
              <CardContent className="pt-6">
                {/* Quote Icon */}
                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center mb-4 group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all">
                  <Quote className="w-6 h-6 text-teal-400" />
                </div>

                {/* Rating */}
                <div className="flex gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  ))}
                </div>

                {/* Content */}
                <p className="text-slate-300 mb-6 leading-relaxed italic">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="border-t border-slate-700 pt-4">
                  <div className="font-semibold text-white mb-1">{testimonial.name}</div>
                  <div className="text-sm text-teal-400">{testimonial.position}</div>
                  <div className="text-sm text-slate-500">{testimonial.company}</div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
