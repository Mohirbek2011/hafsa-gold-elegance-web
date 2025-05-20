
import React from 'react';

const testimonials = [
  {
    id: 1,
    quote: "The craftsmanship of my Hafsa Gold ring is exceptional. I receive compliments wherever I go.",
    name: "Sarah Johnson",
    title: "Loyal Customer",
  },
  {
    id: 2,
    quote: "Their attention to detail is unmatched. My wedding jewelry was perfect in every way.",
    name: "Michael Chang",
    title: "Satisfied Client",
  },
  {
    id: 3,
    quote: "As someone who appreciates quality, I can say Hafsa Gold delivers excellence with every piece.",
    name: "Amira Hassan",
    title: "Repeat Customer",
  },
];

const TestimonialsSection: React.FC = () => {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-serif font-medium text-center mb-4">What Our Clients Say</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          We pride ourselves on creating jewelry that becomes part of your story and leaves a lasting impression.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div key={testimonial.id} className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <div className="mb-4 text-gold">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-xl">★</span>
                ))}
              </div>
              <blockquote className="text-gray-700 mb-6">
                "{testimonial.quote}"
              </blockquote>
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center text-gold font-medium">
                  {testimonial.name.charAt(0)}
                </div>
                <div className="ml-3">
                  <p className="font-medium text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-500">{testimonial.title}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
