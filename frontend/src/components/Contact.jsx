import { useState } from 'react';
import axios from 'axios';
import { toast } from 'sonner';

export const Contact = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', message: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await axios.post('/api/send-email', formData);
      if (response.data.status === 'success') {
        toast.success('Message sent!');
        setFormData({ name: '', email: '', subject: '', message: '' });
      }
    } catch (error) {
      toast.error('Error sending message.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-slate-800 rounded">
      <input type="text" name="name" placeholder="Name" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="block w-full mb-2 p-2 bg-slate-900 text-white" />
      <input type="email" name="email" placeholder="Email" value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})} className="block w-full mb-2 p-2 bg-slate-900 text-white" />
      <input type="text" name="subject" placeholder="Subject" value={formData.subject} onChange={(e) => setFormData({...formData, subject: e.target.value})} className="block w-full mb-2 p-2 bg-slate-900 text-white" />
      <textarea name="message" placeholder="Message" value={formData.message} onChange={(e) => setFormData({...formData, message: e.target.value})} className="block w-full mb-2 p-2 bg-slate-900 text-white" />
      <button type="submit" disabled={isSubmitting} className="w-full p-2 bg-teal-500 text-white">
        {isSubmitting ? 'Sending...' : 'Send'}
      </button>
    </form>
  );
};
