import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [formStatus, setFormStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setFormStatus('submitting');
    
    // Simulate form submission
    setTimeout(() => {
      setFormStatus('success');
      setFormData({
        name: '',
        email: '',
        subject: '',
        message: '',
      });
    }, 1500);
  };
  
  return (
    <div className="min-h-screen py-16 pt-32 bg-background">
      <div className="container-custom">
        <h1 className="text-3xl md:text-4xl font-serif mb-6">Contact Us</h1>
        <p className="text-gray-600 max-w-3xl mb-12">
          Have questions about our products, orders, or need styling advice? Our customer service team is here to help.
        </p>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Contact Information */}
          <div>
            <div className="bg-white p-6 mb-6">
              <h2 className="text-xl font-serif mb-4">Contact Information</h2>
              
              <div className="space-y-4">
                <div className="flex items-start">
                  <Mail className="w-5 h-5 mt-1 mr-3 text-accent" />
                  <div>
                    <p className="font-medium">Email</p>
                    <a href="mailto:support@aston.com" className="text-gray-600 hover:text-accent">
                      support@aston.com
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Phone className="w-5 h-5 mt-1 mr-3 text-accent" />
                  <div>
                    <p className="font-medium">Phone</p>
                    <a href="tel:+18001234567" className="text-gray-600 hover:text-accent">
                      +1 (800) 123-4567
                    </a>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <MapPin className="w-5 h-5 mt-1 mr-3 text-accent" />
                  <div>
                    <p className="font-medium">Address</p>
                    <address className="text-gray-600 not-italic">
                      123 Fashion Avenue<br />
                      New York, NY 10001<br />
                      United States
                    </address>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <Clock className="w-5 h-5 mt-1 mr-3 text-accent" />
                  <div>
                    <p className="font-medium">Business Hours</p>
                    <p className="text-gray-600">
                      Monday - Friday: 9am - 6pm<br />
                      Saturday: 10am - 4pm<br />
                      Sunday: Closed
                    </p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* FAQ Section */}
            <div className="bg-white p-6">
              <h2 className="text-xl font-serif mb-4">Frequently Asked Questions</h2>
              
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-1">What is your return policy?</h3>
                  <p className="text-sm text-gray-600">
                    We offer a 30-day return policy for all unworn items in original condition with tags attached.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">How long does shipping take?</h3>
                  <p className="text-sm text-gray-600">
                    Standard shipping takes 3-5 business days. Express shipping is available for 1-2 business day delivery.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">Do you ship internationally?</h3>
                  <p className="text-sm text-gray-600">
                    Yes, we ship to most countries worldwide. International shipping typically takes 7-14 business days.
                  </p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-1">How can I track my order?</h3>
                  <p className="text-sm text-gray-600">
                    Once your order ships, you'll receive a confirmation email with a tracking number and link.
                  </p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Contact Form */}
          <div className="lg:col-span-2">
            <div className="bg-white p-6">
              <h2 className="text-xl font-serif mb-6">Send Us a Message</h2>
              
              {formStatus === 'success' ? (
                <div className="bg-success/10 border border-success/30 text-success p-4 mb-6">
                  <p className="font-medium">Message Sent Successfully!</p>
                  <p className="text-sm mt-1">Thank you for contacting us. We'll get back to you shortly.</p>
                </div>
              ) : formStatus === 'error' ? (
                <div className="bg-error/10 border border-error/30 text-error p-4 mb-6">
                  <p className="font-medium">Error Sending Message</p>
                  <p className="text-sm mt-1">Please try again or contact us directly via phone or email.</p>
                </div>
              ) : null}
              
              <form onSubmit={handleSubmit}>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                      Your Name <span className="text-error">*</span>
                    </label>
                    <input
                      id="name"
                      name="name"
                      type="text"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="John Doe"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                      Email Address <span className="text-error">*</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="input"
                      placeholder="john.doe@example.com"
                    />
                  </div>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="subject" className="block text-sm font-medium mb-2">
                    Subject <span className="text-error">*</span>
                  </label>
                  <select
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleChange}
                    required
                    className="input"
                  >
                    <option value="">Select a subject</option>
                    <option value="order">Order Inquiry</option>
                    <option value="product">Product Information</option>
                    <option value="return">Returns & Exchanges</option>
                    <option value="shipping">Shipping & Delivery</option>
                    <option value="other">Other</option>
                  </select>
                </div>
                
                <div className="mb-6">
                  <label htmlFor="message" className="block text-sm font-medium mb-2">
                    Message <span className="text-error">*</span>
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    className="input"
                    placeholder="How can we help you?"
                  ></textarea>
                </div>
                
                <button
                  type="submit"
                  disabled={formStatus === 'submitting'}
                  className="btn btn-primary w-full md:w-auto"
                >
                  {formStatus === 'submitting' ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white\" xmlns="http://www.w3.org/2000/svg\" fill="none\" viewBox="0 0 24 24">
                        <circle className="opacity-25\" cx="12\" cy="12\" r="10\" stroke="currentColor\" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </>
                  ) : (
                    'Send Message'
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;