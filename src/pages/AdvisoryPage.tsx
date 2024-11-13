import React, { useState } from 'react';
import { ChevronRight } from 'lucide-react';
import { ApplicationForm } from '../components/ApplicationForm';

export default function AdvisoryPage() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  const faqs = [
    {
      question: "What is the Empath Advisory Initiative?",
      answer: "The Empath Advisory Initiative recognizes that therapists are the true experts in mental healthcare. Unlike traditional tech companies, we're putting the power back in therapists' hands by inviting you to directly shape our platform's development. As an advisor, you'll help build tools that enhance—never replace—the therapeutic relationship, while earning equity for your expertise."
    },
    {
      question: "How is Empath different from other therapy 'apps'?",
      answer: "We believe that meaningful mental health solutions can only be built with therapists, not for them. Instead of disrupting therapy, we're empowering therapists with tools they actually want and need. While other platforms focus on session management or in-session tools, we recognize that the real opportunity to support both therapists and clients lies in the time between sessions. Think of it this way: if each client's life is like a TV show, traditional therapy only lets you watch one episode every two weeks. Empath helps you stay connected to your client's full story, providing insights into what happens between sessions. That's why we're offering equity—because if therapists help build it, they should own it."
    },
    {
      question: "How is the equity allocated?",
      answer: "Equity (0.5% to 5%) is distributed on a milestone-based vesting schedule. Advisors earn portions of their equity as they complete feedback cycles or achieve specific milestones over a 1-2 year period."
    },
    {
      question: "What are the requirements for joining?",
      answer: "Participants must use Empath with at least one client for a minimum of a month, provide structured feedback, and maintain ethical standards in data usage and client relationships."
    },
    {
      question: "How much time will I need to commit?",
      answer: "The commitment is flexible, with most feedback sessions taking around 30 minutes, a minimum time commitment of 2 hours per month is expected. Quarterly reviews and feedback sessions are required to fulfill vesting milestones."
    }
  ];

  const benefits = [
    "Direct influence over mental health technology",
    "Build tools that enhance your practice, not replace it",
    "Earn ownership through equity (0.5% to 5%)",
    "Join a community of forward-thinking therapists"
  ];

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Join us in <span className="text-blue-600">Building</span> Empath<br />
              Shape the future of <span className="text-blue-600">Menthal Health</span> 
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              You're the expert in mental health care. Let's build technology that actually serves your practice, <br />
              while earning ownership in what you help create.
            </p>
            <button
              onClick={() => setIsFormOpen(true)}
              className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors inline-flex items-center"
            >
              Apply Now
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Join Our Advisory Board?</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {benefits.map((benefit, index) => (
              <div key={index} className="p-6 rounded-xl bg-white shadow-lg">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mb-4">
                  <span className="text-blue-600 font-bold">{index + 1}</span>
                </div>
                <p className="text-lg font-medium text-gray-800">{benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">From Advisor to Owner</h2>
          <div className="max-w-3xl mx-auto space-y-12">
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Express Interest</h3>
                <p className="text-gray-600">
                  Apply to join the initiative and begin using Empath with your clients.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Provide Feedback</h3>
                <p className="text-gray-600">
                  Share your insights and suggestions to help refine Empath's features and functionality.
                </p>
              </div>
            </div>
            <div className="flex items-start space-x-4">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-semibold">3</span>
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2">Join Advisory Board</h3>
                <p className="text-gray-600">
                  Based on your contributions, receive an equity stake and continue shaping Empath's future.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Frequently Asked Questions</h2>
          <div className="max-w-3xl mx-auto grid gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-white p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold mb-3">{faq.question}</h3>
                <p className="text-gray-600">{faq.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Form Modal */}
      <ApplicationForm isOpen={isFormOpen} onClose={() => setIsFormOpen(false)} />
    </div>
  );
}