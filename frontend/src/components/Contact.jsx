import { useState } from 'react';

import { Button } from './ui/button';

import { Input } from './ui/input';

import { Textarea } from './ui/textarea';

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from './ui/card';

import { Mail, Phone, Linkedin, Send, CheckCircle2, Calendar, MessageSquare, Video, Clock, ArrowUpRight } from 'lucide-react';

import { portfolioData } from '../mockData';

import { toast } from 'sonner';

import axios from 'axios';

import { ScrollReveal } from '../hooks/useScrollReveal';



const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;

const API = `${BACKEND_URL}/api`;



export const Contact = () => {

  const { email, phone, linkedin, calendly } = portfolioData;

  const [activeTab, setActiveTab] = useState('message'); // 'message' | 'call'

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



  const validateForm = () => {

    if (!formData.name.trim()) {

      return 'Please enter your name';

    }

    if (!formData.email.trim()) {

      return 'Please enter your email address';

    }

    // Basic email regex

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(formData.email.trim())) {

      return 'Please enter a valid email address (e.g., name@example.com)';

    }

    if (!formData.subject.trim()) {

      return 'Please enter a subject';

    }

    if (!formData.message.trim()) {

      return 'Please enter your message';

    }

    if (formData.message.trim().length < 10) {

      return `Your message is too short. Please write at least 10 characters (currently ${formData.message.trim().length}).`;

    }

    if (formData.message.trim().length > 2000) {

      return 'Your message is too long. Please keep it under 2000 characters.';

    }

    return null;

  };



  const handleSubmit = async (e) => {

    e.preventDefault();



    // Client-side validation first

    const validationError = validateForm();

    if (validationError) {

      toast.error(validationError);

      return;

    }



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

        toast.error('Unexpected response from server. Please try again.');

      }

    } catch (error) {

      console.error('Contact form error:', error);

      

      let errorMsg = 'Could not send your message. Please try again in a moment.';

      

      if (error.code === 'ECONNABORTED') {

        errorMsg = 'Request timed out. Please check your internet connection and try again.';

      } else if (error.response) {

        // Server responded with error status

        const status = error.response.status;

        const detail = error.response.data?.detail;

        

        if (status === 422 && Array.isArray(detail)) {

          // FastAPI validation errors

          const firstErr = detail[0];

          const field = firstErr.loc?.[firstErr.loc.length - 1] || 'field';

          errorMsg = `${field}: ${firstErr.msg}`;

        } else if (typeof detail === 'string') {

          errorMsg = detail;

        } else if (status === 429) {

          errorMsg = 'Too many requests. Please wait a moment and try again.';

        } else if (status >= 500) {

          errorMsg = 'Server error. Please try again later.';

        }

      } else if (error.request) {

        errorMsg = 'Cannot reach the server. Please check your internet connection.';

      }

      

      toast.error(errorMsg);

    } finally {

      setIsSubmitting(false);

    }

  };



  return (

    <section id="contact" className="relative py-20 bg-slate-900/60 backdrop-blur-[2px]">

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}

        <ScrollReveal>

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

        </ScrollReveal>



        <div className="max-w-6xl mx-auto">

          <div className="flex flex-col lg:flex-row gap-8 items-stretch">

            {/* Contact Info — Takes 1/3 on desktop */}

            <ScrollReveal direction="right" delay={100} className="lg:w-1/3 lg:flex-shrink-0">

            <Card className="h-full bg-slate-800/50 border-slate-700 backdrop-blur-sm flex flex-col">

              <CardHeader className="pb-4">

                <CardTitle className="text-white text-xl flex items-center gap-2">

                  <span className="inline-block w-1.5 h-6 bg-gradient-to-b from-teal-400 to-emerald-400 rounded-full"></span>

                  Contact Information

                </CardTitle>

                <CardDescription className="text-slate-400">

                  Feel free to reach out through any channel

                </CardDescription>

              </CardHeader>

              <CardContent className="flex-1 flex flex-col space-y-4">

                <a

                  href={`mailto:${email}`}

                  data-testid="contact-info-email"

                  className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors group p-3 -m-3 rounded-lg hover:bg-slate-900/30"

                >

                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/20 flex items-center justify-center group-hover:from-teal-500/30 group-hover:to-emerald-500/30 group-hover:border-teal-400/40 transition-all flex-shrink-0">

                    <Mail className="w-5 h-5 text-teal-400" />

                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Email</div>

                    <div className="text-sm font-medium truncate">{email}</div>

                  </div>

                </a>



                <a

                  href={`tel:${phone}`}

                  data-testid="contact-info-phone"

                  className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors group p-3 -m-3 rounded-lg hover:bg-slate-900/30"

                >

                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/20 flex items-center justify-center group-hover:from-teal-500/30 group-hover:to-emerald-500/30 group-hover:border-teal-400/40 transition-all flex-shrink-0">

                    <Phone className="w-5 h-5 text-teal-400" />

                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Phone</div>

                    <div className="text-sm font-medium">{phone}</div>

                  </div>

                </a>



                <a

                  href={calendly}

                  target="_blank"

                  rel="noopener noreferrer"

                  data-testid="contact-info-calendly"

                  className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors group p-3 -m-3 rounded-lg hover:bg-slate-900/30"

                >

                  <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/20 flex items-center justify-center group-hover:from-teal-500/30 group-hover:to-emerald-500/30 group-hover:border-teal-400/40 transition-all flex-shrink-0">

                    <Calendar className="w-5 h-5 text-teal-400" />

                  </div>

                  <div className="min-w-0 flex-1">

                    <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">Schedule</div>

                    <div className="text-sm font-medium">Book a Free Call</div>

                  </div>

                </a>



                {linkedin && (

                  <a

                    href={linkedin}

                    target="_blank"

                    rel="noopener noreferrer"

                    className="flex items-center gap-3 text-slate-300 hover:text-teal-400 transition-colors group p-3 -m-3 rounded-lg hover:bg-slate-900/30"

                  >

                    <div className="w-11 h-11 rounded-lg bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/20 flex items-center justify-center group-hover:from-teal-500/30 group-hover:to-emerald-500/30 group-hover:border-teal-400/40 transition-all flex-shrink-0">

                      <Linkedin className="w-5 h-5 text-teal-400" />

                    </div>

                    <div className="min-w-0 flex-1">

                      <div className="text-xs text-slate-500 mb-0.5 uppercase tracking-wider">LinkedIn</div>

                      <div className="text-sm font-medium">Connect with me</div>

                    </div>

                  </a>

                )}



                {/* Availability indicator at bottom */}

                <div className="mt-auto pt-6 border-t border-slate-700/60">

                  <div className="flex items-center gap-2.5">

                    <span className="relative flex h-2.5 w-2.5">

                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-60"></span>

                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-400"></span>

                    </span>

                    <div>

                      <div className="text-xs text-emerald-300 font-semibold">Available for Projects</div>

                      <div className="text-xs text-slate-500">Usually responds within 24 hours</div>

                    </div>

                  </div>

                </div>

              </CardContent>

            </Card>

            </ScrollReveal>



            {/* Contact Form / Booking Tabs — Takes 2/3 on desktop */}

            <ScrollReveal direction="left" delay={200} className="lg:flex-1">

            <Card className="h-full bg-slate-800/50 border-slate-700 backdrop-blur-sm overflow-hidden flex flex-col">

                {/* Tab Switcher */}

                <div className="border-b border-slate-700 grid grid-cols-2">

                  <button

                    onClick={() => setActiveTab('message')}

                    data-testid="tab-send-message"

                    className={`relative px-4 py-4 text-sm font-medium transition-all flex items-center justify-center gap-2 ${

                      activeTab === 'message'

                        ? 'text-white bg-slate-800/60'

                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'

                    }`}

                  >

                    <MessageSquare className="w-4 h-4" />

                    <span>Send Message</span>

                    {activeTab === 'message' && (

                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400"></span>

                    )}

                  </button>

                  <button

                    onClick={() => setActiveTab('call')}

                    data-testid="tab-book-call"

                    className={`relative px-4 py-4 text-sm font-medium transition-all flex items-center justify-center gap-2 ${

                      activeTab === 'call'

                        ? 'text-white bg-slate-800/60'

                        : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/30'

                    }`}

                  >

                    <Calendar className="w-4 h-4" />

                    <span>Book a Call</span>

                    {activeTab === 'call' && (

                      <span className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-teal-400 to-emerald-400"></span>

                    )}

                  </button>

                </div>



                {/* Send Message Tab */}

                {activeTab === 'message' && (

                  <>

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

                            <div className="flex items-center justify-between mb-2">

                              <label className="text-sm font-medium text-slate-300">

                                Message *

                              </label>

                              <span className={`text-xs ${formData.message.trim().length < 10 ? 'text-amber-400' : 'text-slate-500'}`}>

                                {formData.message.trim().length}/2000 {formData.message.trim().length < 10 && `(min 10)`}

                              </span>

                            </div>

                            <Textarea

                              name="message"

                              value={formData.message}

                              onChange={handleChange}

                              required

                              rows={5}

                              maxLength={2000}

                              placeholder="Tell me about your project or inquiry... (minimum 10 characters)"

                              className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 focus:border-teal-500 resize-none"

                            />

                          </div>



                          <Button

                            type="submit"

                            disabled={isSubmitting}

                            data-testid="send-message-submit"

                            className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium py-6 group disabled:opacity-50 disabled:cursor-not-allowed"

                          >

                            {isSubmitting ? 'Sending...' : 'Send Message'}

                            <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />

                          </Button>

                        </form>

                      )}

                    </CardContent>

                  </>

                )}



                {/* Book a Call Tab */}

                {activeTab === 'call' && (

                  <>

                    <CardHeader>

                      <CardTitle className="text-white">Schedule a Call</CardTitle>

                      <CardDescription className="text-slate-400">

                        Pick a time that works best for you — I&apos;ll meet you on video.

                      </CardDescription>

                    </CardHeader>

                    <CardContent>

                      <div className="text-center py-6">

                        {/* Visual elements */}

                        <div className="relative inline-block mb-6">

                          <div className="absolute -inset-4 bg-gradient-to-r from-teal-500/20 to-emerald-500/20 rounded-full blur-2xl"></div>

                          <div className="relative w-20 h-20 rounded-2xl bg-gradient-to-br from-teal-500/20 to-emerald-500/20 border border-teal-500/30 flex items-center justify-center">

                            <Calendar className="w-10 h-10 text-teal-400" />

                          </div>

                        </div>



                        <h3 className="text-2xl font-bold text-white mb-3">

                          Let&apos;s Talk on a Quick Call

                        </h3>

                        <p className="text-slate-400 mb-6 max-w-md mx-auto leading-relaxed">

                          Book a free 30-minute discovery call to discuss your automation needs, ideas, or any project you have in mind.

                        </p>



                        {/* Benefits grid */}

                        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-lg mx-auto">

                          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-900/40 border border-slate-700">

                            <Clock className="w-5 h-5 text-teal-400" />

                            <span className="text-xs text-slate-300">30 Minutes</span>

                          </div>

                          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-900/40 border border-slate-700">

                            <Video className="w-5 h-5 text-teal-400" />

                            <span className="text-xs text-slate-300">Video Call</span>

                          </div>

                          <div className="flex flex-col items-center gap-2 p-3 rounded-lg bg-slate-900/40 border border-slate-700">

                            <CheckCircle2 className="w-5 h-5 text-teal-400" />

                            <span className="text-xs text-slate-300">100% Free</span>

                          </div>

                        </div>



                        {/* Calendly button */}

                        <a

                          href={calendly}

                          target="_blank"

                          rel="noopener noreferrer"

                          data-testid="book-call-calendly"

                          className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-teal-500 to-emerald-500 hover:from-teal-600 hover:to-emerald-600 text-white font-medium px-8 py-4 rounded-lg transition-all duration-300 group shadow-lg shadow-teal-500/20"

                        >

                          <Calendar className="w-5 h-5" />

                          <span>Book on Calendly</span>

                          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />

                        </a>



                        <p className="text-xs text-slate-500 mt-4">

                          Opens calendly.com in a new tab

                        </p>

                      </div>

                    </CardContent>

                  </>

                )}

              </Card>

            </ScrollReveal>

          </div>

        </div>

      </div>

    </section>

  );

}; 

