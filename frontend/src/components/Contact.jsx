const handleSubmit = async (e) => {
    e.preventDefault();

    const validationError = validateForm();
    if (validationError) {
      toast.error(validationError);
      return;
    }

    setIsSubmitting(true);
    
    try {
      // Direkta sa /api/send-email, wala nang BACKEND_URL variable
      const response = await axios.post('/api/send-email', formData, {
        headers: { 'Content-Type': 'application/json' },
        timeout: 15000
      });
      
      if (response.data && response.data.status === 'success') {
        setIsSubmitted(true);
        toast.success('Message sent successfully!');
        setTimeout(() => {
          setFormData({ name: '', email: '', subject: '', message: '' });
          setIsSubmitted(false);
        }, 3000);
      } else {
        toast.error('Unexpected response from server.');
      }
    } catch (error) {
      console.error('Contact form error:', error);
      toast.error('Could not send your message. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };
