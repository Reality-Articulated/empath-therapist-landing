import React, { useState, useEffect } from 'react';
import { X, CheckCircle, AlertCircle, Loader2 } from 'lucide-react';
import emailjs from '@emailjs/browser';
import toast, { Toaster } from 'react-hot-toast';
import { motion, AnimatePresence } from 'framer-motion';

interface ApplicationFormProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ApplicationForm({ isOpen, onClose }: ApplicationFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    practice: '',
    experience: '',
    clients: '',
    motivation: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Reset form when closed
  useEffect(() => {
    if (!isOpen) {
      setTimeout(() => {
        setCurrentStep(1);
        setErrors({});
      }, 300);
    }
  }, [isOpen]);

  const validateStep = (step: number) => {
    const newErrors: Record<string, string> = {};
    
    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Name is required";
      if (!formData.email.trim()) {
        newErrors.email = "Email is required";
      } else if (!/^\S+@\S+\.\S+$/.test(formData.email)) {
        newErrors.email = "Please enter a valid email";
      }
      if (!formData.practice.trim()) newErrors.practice = "Practice information is required";
    } else if (step === 2) {
      if (!formData.experience) newErrors.experience = "Please select your experience";
      if (!formData.clients) {
        newErrors.clients = "Number of clients is required";
      } else if (parseInt(formData.clients) < 1) {
        newErrors.clients = "Please enter a valid number";
      }
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(currentStep + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(currentStep - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateStep(currentStep)) return;
    
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
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => {
        const newErrors = {...prev};
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  if (!isOpen) return null;

  const modalVariants = {
    hidden: { opacity: 0, scale: 0.95 },
    visible: { 
      opacity: 1, 
      scale: 1,
      transition: { 
        type: "spring",
        damping: 25,
        stiffness: 500
      }
    },
    exit: { 
      opacity: 0, 
      scale: 0.95,
      transition: { duration: 0.2 }
    }
  };

  const stepVariants = {
    hidden: { opacity: 0, x: 50 },
    visible: { 
      opacity: 1, 
      x: 0,
      transition: { duration: 0.3 }
    },
    exit: { 
      opacity: 0, 
      x: -50,
      transition: { duration: 0.3 }
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div 
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <Toaster position="top-center" />
          <motion.div 
            className="bg-white rounded-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden shadow-2xl"
            variants={modalVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            <div className="p-6 border-b relative bg-gradient-to-r from-blue-50 to-indigo-50">
              <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-700">
                Join Empath's Advisory Initiative
              </h2>
              <p className="text-gray-600 mt-1">
                Help shape the future of therapy tools
              </p>
              <motion.button
                onClick={onClose}
                className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 bg-white rounded-full p-1 hover:bg-gray-100 transition-colors"
                disabled={isSubmitting}
                whileHover={{ rotate: 180 }}
                transition={{ duration: 0.3 }}
              >
                <X className="w-5 h-5" />
              </motion.button>
              
              {/* Progress indicator */}
              <div className="mt-6 flex items-center">
                <div className={`h-1 rounded-full flex-grow ${currentStep >= 1 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center mx-2 ${currentStep >= 1 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  1
                </div>
                <div className={`h-1 rounded-full flex-grow ${currentStep >= 2 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
                <div className={`h-6 w-6 rounded-full flex items-center justify-center mx-2 ${currentStep >= 2 ? 'bg-blue-500 text-white' : 'bg-gray-200 text-gray-500'}`}>
                  2
                </div>
                <div className={`h-1 rounded-full flex-grow ${currentStep >= 3 ? 'bg-blue-500' : 'bg-gray-200'}`}></div>
              </div>
            </div>

            <div className="p-6 overflow-y-auto max-h-[calc(90vh-150px)]">
              <AnimatePresence mode="wait">
                {currentStep === 1 && (
                  <motion.div 
                    key="step1"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-medium text-gray-800">Personal Information</h3>
                    
                    <div>
                      <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        placeholder="Dr. Jane Smith"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.name ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        value={formData.name}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.name && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" /> {errors.name}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Professional Email
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="jane.smith@practice.com"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.email ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        value={formData.email}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.email && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="practice" className="block text-sm font-medium text-gray-700 mb-1">
                        Practice Name/Location
                      </label>
                      <input
                        type="text"
                        id="practice"
                        name="practice"
                        placeholder="Wellness Therapy Center, San Francisco"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.practice ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        value={formData.practice}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.practice && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" /> {errors.practice}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 2 && (
                  <motion.div 
                    key="step2"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-4"
                  >
                    <h3 className="text-lg font-medium text-gray-800">Professional Details</h3>
                    
                    <div>
                      <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">
                        Years of Experience
                      </label>
                      <select
                        id="experience"
                        name="experience"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.experience ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
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
                      {errors.experience && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" /> {errors.experience}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="clients" className="block text-sm font-medium text-gray-700 mb-1">
                        Number of Active Clients
                      </label>
                      <input
                        type="number"
                        id="clients"
                        name="clients"
                        min="1"
                        placeholder="15"
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.clients ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        value={formData.clients}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.clients && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" /> {errors.clients}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="motivation" className="block text-sm font-medium text-gray-700 mb-1">
                        Why do you want to join the Advisory Initiative?
                      </label>
                      <textarea
                        id="motivation"
                        name="motivation"
                        rows={4}
                        placeholder="I'm interested in joining because..."
                        className={`w-full px-4 py-2.5 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-colors ${errors.motivation ? 'border-red-500 bg-red-50' : 'border-gray-300'}`}
                        value={formData.motivation}
                        onChange={handleChange}
                        disabled={isSubmitting}
                      />
                      {errors.motivation && (
                        <p className="mt-1 text-sm text-red-600 flex items-center">
                          <AlertCircle size={14} className="mr-1" /> {errors.motivation}
                        </p>
                      )}
                    </div>
                  </motion.div>
                )}

                {currentStep === 3 && (
                  <motion.div 
                    key="step3"
                    variants={stepVariants}
                    initial="hidden"
                    animate="visible"
                    exit="exit"
                    className="space-y-6"
                  >
                    <div className="text-center py-6">
                      <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <h3 className="text-xl font-semibold text-gray-800 mb-2">Review Your Application</h3>
                      <p className="text-gray-600">Please review your information before submitting</p>
                    </div>
                    
                    <div className="bg-gray-50 p-4 rounded-lg space-y-3">
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-500">Full Name:</div>
                        <div className="text-sm font-medium">{formData.name}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-500">Email:</div>
                        <div className="text-sm font-medium">{formData.email}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-500">Practice:</div>
                        <div className="text-sm font-medium">{formData.practice}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-500">Experience:</div>
                        <div className="text-sm font-medium">{formData.experience}</div>
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div className="text-sm text-gray-500">Active Clients:</div>
                        <div className="text-sm font-medium">{formData.clients}</div>
                      </div>
                      <div className="pt-2">
                        <div className="text-sm text-gray-500 mb-1">Motivation:</div>
                        <div className="text-sm bg-white p-3 rounded border border-gray-200">{formData.motivation}</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <div className="p-6 border-t bg-gray-50 flex items-center justify-between">
              {currentStep > 1 ? (
                <motion.button
                  type="button"
                  onClick={prevStep}
                  className="px-5 py-2.5 border border-gray-300 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors flex items-center"
                  disabled={isSubmitting}
                  whileHover={{ x: -3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Back
                </motion.button>
              ) : (
                <div></div>
              )}
              
              {currentStep < 3 ? (
                <motion.button
                  type="button"
                  onClick={nextStep}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md hover:shadow-blue-200 transition-all flex items-center"
                  disabled={isSubmitting}
                  whileHover={{ x: 3 }}
                  whileTap={{ scale: 0.98 }}
                >
                  Continue
                </motion.button>
              ) : (
                <motion.button
                  type="button"
                  onClick={handleSubmit}
                  className="px-5 py-2.5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:shadow-md hover:shadow-blue-200 transition-all flex items-center"
                  disabled={isSubmitting}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    'Submit Application'
                  )}
                </motion.button>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}