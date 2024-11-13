import React, { useState } from 'react';
import { X } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationForm({ isOpen, onClose }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    practice: '',
    experience: '',
    clients: '',
    motivation: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      await emailjs.send(
        'service_vxj3w0n', // Replace with your EmailJS service ID
        'template_7kwdlh8', // Replace with your EmailJS template ID
        {
          to_email: 'karan@myempath.co',
          from_name: formData.name,
          from_email: formData.email,
          practice: formData.practice,
          experience: formData.experience,
          clients: formData.clients,
          motivation: formData.motivation,
        },
        'RkdQiScnBEMQIBtNL' // Replace with your EmailJS public key
      );

      toast.success('Application submitted successfully!');
      onClose();
      setFormData({
        name: '',
        email: '',
        practice: '',
        experience: '',
        clients: '',
        motivation: '',
      });
    } catch (error) {
      toast.error('Failed to submit application. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Toaster position="top-center" />
      <div className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6 border-b relative">
          <h2 className="text-2xl font-bold text-gray-900">Apply to Join Empath's Advisory Initiative</h2>
          <button
            onClick={onClose}
            className="absolute right-6 top-6 text-gray-400 hover:text-gray-600"
            disabled={isSubmitting}
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="space-y-4">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name
              </label>
              <input
                type="text"
                id="name"
                name="name"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.name}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Professional Email
              </label>
              <input
                type="email"
                id="email"
                name="email"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="practice" className="block text-sm font-medium text-gray-700 mb-1">
                Practice Name/Location
              </label>
              <input
                type="text"
                id="practice"
                name="practice"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.practice}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                Years of Experience
              </label>
              <select
                id="experience"
                name="experience"
                required
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.experience}
                onChange={handleChange}
                disabled={isSubmitting}
              >
                <option value="">Select years of experience</option>
                <option value="0-2">0-2 years</option>
                <option value="3-5">3-5 years</option>
                <option value="6-10">6-10 years</option>
                <option value="10+">10+ years</option>
              </select>
            </div>

            <div>
              <label htmlFor="clients" className="block text-sm font-medium text-gray-700 mb-1">
                Number of Active Clients
              </label>
              <input
                type="number"
                id="clients"
                name="clients"
                required
                min="1"
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.clients}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>

            <div>
              <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
                Why do you want to join the Advisory Initiative?
              </label>
              <textarea
                id="motivation"
                name="motivation"
                required
                rows={4}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                value={formData.motivation}
                onChange={handleChange}
                disabled={isSubmitting}
              />
            </div>
          </div>

          <div className="flex items-center justify-end space-x-4 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2 border rounded-lg text-gray-600 hover:bg-gray-50 disabled:opacity-50"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:hover:bg-blue-600"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Submitting...' : 'Submit Application'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}