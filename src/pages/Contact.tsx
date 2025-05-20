
import React, { useState } from 'react';
import Layout from '@/components/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';

const Contact: React.FC = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // In a real app, you would send the data to a server here
    toast({
      title: "Message Sent",
      description: "We'll get back to you as soon as possible.",
    });
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      subject: '',
      message: '',
    });
  };

  return (
    <Layout>
      <div className="bg-gray-100 py-8">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-serif font-medium">Contact Us</h1>
          <p className="text-gray-600 mt-2">
            We'd love to hear from you
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          {/* Contact information */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-serif mb-6">Get in Touch</h2>
            <p className="text-gray-600 mb-8">
              Whether you have a question about our products, services, or anything else, our team is ready to answer all your questions.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Phone size={18} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Phone</h3>
                  <p className="text-gray-600 mt-1">+123 456 7890</p>
                  <p className="text-gray-600">+123 456 7891</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Mail size={18} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Email</h3>
                  <p className="text-gray-600 mt-1">info@hafsagold.com</p>
                  <p className="text-gray-600">support@hafsagold.com</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <MapPin size={18} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Location</h3>
                  <p className="text-gray-600 mt-1">
                    123 Gold Avenue<br />
                    Luxury District, City<br />
                    Country, 12345
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="w-10 h-10 rounded-full bg-gold/10 flex items-center justify-center text-gold shrink-0">
                  <Clock size={18} />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-gray-900">Business Hours</h3>
                  <p className="text-gray-600 mt-1">
                    Monday - Friday: 9:00 AM - 8:00 PM<br />
                    Saturday: 10:00 AM - 6:00 PM<br />
                    Sunday: Closed
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact form */}
          <div className="lg:col-span-3">
            <div className="bg-white p-8 rounded-lg shadow-sm border border-gray-100">
              <h2 className="text-2xl font-serif mb-6">Send a Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Name *
                    </label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                      Email Address *
                    </label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                      Phone Number
                    </label>
                    <Input
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full"
                    />
                  </div>
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject *
                    </label>
                    <Input
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleInputChange}
                      required
                      className="w-full"
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Your Message *
                  </label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    required
                    className="w-full min-h-[150px]"
                  />
                </div>
                
                <Button type="submit" className="bg-gold hover:bg-gold-dark text-black w-full sm:w-auto">
                  Send Message
                </Button>
              </form>
            </div>
          </div>
        </div>
        
        <div className="mt-12">
          <h2 className="text-2xl font-serif mb-6">Find Us</h2>
          <div className="aspect-[16/9] w-full rounded-lg overflow-hidden border border-gray-200">
            {/* Replace with an actual map component in a production app */}
            <iframe 
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14008.115265342486!2d77.20688171984224!3d28.613172591556485!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390ce2b9575f4eb7%3A0x7f6ae208975b0c1!2sConnaught%20Place%2C%20New%20Delhi%2C%20Delhi%2C%20India!5e0!3m2!1sen!2sus!4v1673642124973!5m2!1sen!2sus" 
              width="100%" 
              height="100%" 
              style={{ border: 0 }} 
              allowFullScreen={true} 
              loading="lazy" 
              referrerPolicy="no-referrer-when-downgrade"
              title="Hafsa Gold Location"
            ></iframe>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Contact;
