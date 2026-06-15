import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Textarea } from './ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';
import { Mail, Phone, Linkedin, Send, CheckCircle2 } from 'lucide-react';
import { portfolioData } from '../mockData';
import { toast } from 'sonner';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

export const Contact = () => {
  const { email, phone, linkedin } = portfolioData;
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await axios.post(`${API}/contact`, formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000
      });
      
      if (response.data && response.data.success) {
        setIsSubmitted(true);
        toast.success(response.data.message || 'Message sent successfully!');
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setIsSubmitted(false);
        }, 3000);
      } else {
        toast.error('Unexpected response. Please try again.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      
      let errorMsg = 'Failed to send message. Please try again.';
      if (error.response) {
        // Server responded with error
        if (error.response.data && error.response.data.detail) {
          if (Array.isArray(error.response.data.detail)) {
            // Validation errors from FastAPI
            const firstErr = error.response.data.detail[0];
            errorMsg = firstErr.msg || errorMsg;
          } else {
            errorMsg = error.response.data.detail;
          }
        }
      } else if (error.request) {
        // Request made but no response
        errorMsg = 'Network error. Please check your connection.';
      }
      
      toast.error(errorMsg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 bg-slate-900">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-4xl sm:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-white to-slate-300 bg-clip-text text-transparent">
              Get In Touch
            </span>
          </h2>
          <p className="text-lg text-slate-400">
            Let's discuss how I can help automate and optimize your business processes
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Contact Info */}
            <div className="space-y-6">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Contact Information</CardTitle>
                  <CardDescription className="text-slate-400">
                    Feel free to reach out through any channel
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <a
                    href={`mailto:${email}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all">
                      <Mail className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Email</div>
                      <div className="text-sm font-medium">{email}</div>
                    </div>
                  </a>

                  <a
                    href={`tel:${phone}`}
                    className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors group"
                  >
                    <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all">
                      <Phone className="w-5 h-5 text-teal-400" />
                    </div>
                    <div>
                      <div className="text-xs text-slate-500 mb-1">Phone</div>
                      <div className="text-sm font-medium">{phone}</div>
                    </div>
                  </a>

                  {linkedin && (
                    <a
                      href={linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors group"
                    >
                      <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center group-hover:from-teal-500/30 group-hover:to-emerald-500/30 transition-all">
                        <Linkedin className="w-5 h-5 text-teal-400" />
                      </div>
                      <div>
                        <div className="text-xs text-slate-500 mb-1">LinkedIn</div>
                        <div className="text-sm font-medium">Connect with me</div>
                      </div>
                    </a>
                  )}
                </CardContent>
              </Card>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <Card className="bg-slate-800/50 border-slate-700 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-white">Send a Message</CardTitle>
                  <CardDescription className="text-slate-400">
                    Fill out the form and I'll get back to you within 24 hours
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {isSubmitted ? (
                    <div className="py-12 text-center">
                      <div className="w-16 h-16 rounded-full bg-gradient-to-br from-teal-500/20 to-emerald-500/20 flex items-center justify-center mx-auto mb-4">
                        <CheckCircle2 className="w-8 h-8 text-teal-400" />
                      </div>
                      <h3 className="text-xl font-semibold text-white mb-2">Message Sent!</h3>
                      <p className="text-slate-400">Thank you for reaching out. I'll respond soon.</p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit} className="space-y-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <label className="text-sm font-medium text-slate-300 mb-2 block">
                            Name *
                          </label>
                          <Input
                            type="text"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            required
                            placeholder="Your name"
                            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500"
                          />
                        </div>
                        <div>
                          <label className="text-sm font-medium text-slate-300 mb-2 block">
                            Email *
                          </label>
                          <Input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                            placeholder="your.email@example.com"
                            className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-2 block">
                          Subject *
                        </label>
                        <Input
                          type="text"
                          name="subject"
                          value={formData.subject}
                          onChange={handleChange}
                          required
                          placeholder="What's this about?"
                          className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500"
                        />
                      </div>

                      <div>
                        <label className="text-sm font-medium text-slate-300 mb-2 block">
                          Message *
                        </label>
                        <Textarea
                          name="message"
                          value={formData.message}
                          onChange={handleChange}
                          required
                          rows={5}
                          placeholder="Tell me about your project or inquiry..."
                          className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500 resize-none"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium py-6 group disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? 'Sending...' : 'Send Message'}
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
