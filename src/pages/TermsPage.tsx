import React from 'react';
import { motion } from 'framer-motion';
import { ArrowUp, ChevronLeft, FileText, Scale } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function TermsPage() {
  const [showScrollTop, setShowScrollTop] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.scrollTo(0, 0);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="relative min-h-screen bg-gradient-to-b from-slate-50 to-white pt-16 pb-24">
      {/* Background decorative elements */}
      <div className="absolute top-0 left-0 w-full h-40 bg-gradient-to-b from-blue-50 to-transparent opacity-70"></div>
      <div className="absolute top-0 right-0 w-32 h-32 md:w-64 md:h-64 bg-blue-100 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl opacity-30"></div>
      <div className="absolute bottom-0 left-0 w-32 h-32 md:w-64 md:h-64 bg-indigo-100 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl opacity-30"></div>
      
      <div className="container max-w-4xl mx-auto px-4 relative">
        {/* Back button */}
        <div className="mb-8">
          <Link 
            to="/pledge" 
            className="inline-flex items-center text-blue-700 hover:text-blue-800 transition-colors"
          >
            <ChevronLeft size={16} className="mr-1" />
            <span>Back to Our Privacy Pledge</span>
          </Link>
        </div>

        {/* Document header */}
        <motion.div 
          className="mb-12"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="flex items-center justify-center mb-4">
            <div className="bg-blue-100 p-3 rounded-full">
              <Scale className="w-10 h-10 text-blue-600" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-3 text-center text-gray-900">Terms & Conditions</h1>
          <p className="text-center text-gray-700 max-w-xl mx-auto mb-2">MyEmpath Application</p>
          <p className="text-center text-gray-500 mb-4">Last updated: January 15th 2025 (v1.0)</p>
          <div className="flex justify-center items-center space-x-4">
            <span className="text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">Official Document</span>
            <span className="text-xs px-2 py-1 bg-gray-100 text-gray-700 rounded-full flex items-center">
              <FileText size={12} className="mr-1" />
              PDF Available
            </span>
          </div>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8">
          {/* Sticky Table of Contents on larger screens */}
          <motion.aside 
            className="md:w-64 md:sticky md:top-24 md:self-start mb-8 md:mb-0 bg-white rounded-xl shadow-md overflow-hidden"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="p-4 bg-gradient-to-r from-blue-600 to-indigo-700">
              <h2 className="text-lg font-semibold text-white">Table of Contents</h2>
            </div>
            <nav className="p-4">
              <ul className="space-y-2 text-sm">
                <li><a href="#purpose" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">1. Purpose of the Service</a></li>
                <li><a href="#eligibility" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">2. Eligibility</a></li>
                <li><a href="#crisis" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">3. Not a Crisis Service</a></li>
                <li><a href="#therapist" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">4. Therapist Engagement</a></li>
                <li><a href="#data" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">5. User Control & Data</a></li>
                <li><a href="#health" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">6. Health Data</a></li>
                <li><a href="#responsibilities" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">7. Your Responsibilities</a></li>
                <li><a href="#without-therapist" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">8. Use Without a Therapist</a></li>
                <li><a href="#prohibited" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">9. Prohibited Uses</a></li>
                <li><a href="#security" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">10. Account Security</a></li>
                <li><a href="#disclaimers" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">11. Disclaimers</a></li>
                <li><a href="#liability" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">12. Limitation of Liability</a></li>
                <li><a href="#changes" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">13. Changes to Terms</a></li>
                <li><a href="#contact" className="text-blue-600 hover:text-blue-800 transition-colors block py-1">14. Contact</a></li>
              </ul>
            </nav>
            
            {/* Print button */}
            <div className="p-4 pt-0">
              <button 
                onClick={() => window.print()} 
                className="w-full flex items-center justify-center gap-2 text-sm text-gray-600 hover:text-gray-800 py-2 border border-gray-200 rounded-md hover:bg-gray-50 transition-colors"
              >
                <FileText size={14} />
                Print Document
              </button>
            </div>
          </motion.aside>

          {/* Main content */}
          <motion.div 
            className="flex-1"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
          >
            <div className="prose prose-lg max-w-none bg-white rounded-xl shadow-md p-6 md:p-8 print:shadow-none">
              <div className="bg-blue-50 p-4 rounded-lg mb-8 print:bg-white">
                <p className="text-blue-700 font-medium mb-0">Welcome to Empath. These Terms & Conditions ("Terms") govern your use of the Empath mobile application, web services, and related offerings (collectively, the "Service"), operated by Reality Articulated Inc. ("Company", "we", "us", or "our").</p>
              </div>
              
              <p>By accessing or using Empath, you agree to be bound by these Terms. If you do not agree, please do not use the Service.</p>

              <div className="my-8 border-t border-gray-200"></div>

              <h2 id="purpose" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">1</span>
                Purpose of the Service
              </h2>
              <p>Empath is designed to help users articulate their thoughts, track mental health data, and—if connected to a therapist—enhance therapeutic care. It is not a replacement for therapy or medical advice.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="eligibility" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">2</span>
                Eligibility
              </h2>
              <p>You must be at least 13 years old to use the Service. If you are under 18, you must have parental or guardian consent.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="crisis" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">3</span>
                Not a Crisis or Emergency Service
              </h2>
              <div className="p-4 bg-yellow-50 border-l-4 border-yellow-500 rounded-md my-4 print:bg-white print:border print:border-yellow-300">
                <p className="mb-0">Empath's <strong>Call-2-Journal</strong> feature is a tool to record personal thoughts and reflections. It is <strong>not monitored</strong>, and <strong>not an emergency line</strong>.</p>
                <p className="mb-0">If you are experiencing a crisis or emergency, please contact emergency services or a local crisis line immediately.</p>
              </div>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="therapist" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">4</span>
                Therapist Engagement
              </h2>
              <p>If you are using Empath with a connected therapist:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>Your therapist <strong>does not</strong> review your data in real-time.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>Therapists typically review journal entries and health data <strong>right before scheduled sessions</strong>.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>The Service is intended to enhance—not replace—the work you and your therapist do together.</span>
                </li>
              </ul>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="data" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">5</span>
                User Control & Data Sharing
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>You retain full ownership of your journal entries and personal data.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span><strong>You can choose</strong> which journal entries are shared with your therapist.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>Health data is only accessed via Apple Health (with your explicit permission).</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span><strong>Only you and your therapist</strong> (if connected) can view your shared data.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>All data is <strong>encrypted</strong> in transit and at rest.</span>
                </li>
              </ul>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="health" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">6</span>
                Health Data
              </h2>
              <p>With your permission, Empath can access data from Apple Health to provide your therapist with a fuller picture of your wellbeing (e.g., sleep, exercise, steps). This data is encrypted and never sold or shared beyond your therapist connection.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="responsibilities" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">7</span>
                Your Responsibilities
              </h2>
              <p>To get the most from Empath:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>Regularly use the journaling features (text, voice, or Call-2-Journal).</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>Be honest and thoughtful in your reflections.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>Follow up with your therapist or mental health provider for support.</span>
                </li>
              </ul>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="without-therapist" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">8</span>
                Use Without a Therapist
              </h2>
              <p>You may use Empath independently for personal growth, clarity, or self-reflection. You are not required to connect with a therapist to use the app.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="prohibited" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">9</span>
                Prohibited Uses
              </h2>
              <p>You agree not to:</p>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>Use the Service for unlawful purposes.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>Share offensive, violent, or harmful content.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>Attempt to access or interfere with data not intended for you.</span>
                </li>
              </ul>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="security" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">10</span>
                Account Security
              </h2>
              <p>You are responsible for safeguarding your account login credentials. If you suspect unauthorized use, please notify us immediately.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="disclaimers" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">11</span>
                Disclaimers
              </h2>
              <ul className="space-y-2">
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>We make no guarantees about therapeutic outcomes.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>The Service does not diagnose or treat mental health conditions.</span>
                </li>
                <li className="flex items-start">
                  <span className="inline-flex items-center justify-center bg-blue-100 rounded-full w-5 h-5 mr-2 text-blue-700 text-xs mt-1 print:bg-gray-200">•</span>
                  <span>We are not responsible for any decisions you make based on content within the app.</span>
                </li>
              </ul>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="liability" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">12</span>
                Limitation of Liability
              </h2>
              <p>To the fullest extent permitted by law, Empath and its affiliates are not liable for any indirect, incidental, or consequential damages resulting from your use of the Service.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="changes" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">13</span>
                Changes to the Terms
              </h2>
              <p>We may update these Terms from time to time. When we do, we will notify you by updating the date at the top and, where appropriate, notify you via in-app messaging or email. Continued use of the Service after changes constitutes your acceptance.</p>

              <div className="my-8 border-t border-gray-100"></div>

              <h2 id="contact" className="flex items-center text-blue-700 scroll-mt-24">
                <span className="bg-blue-100 text-blue-700 rounded-full w-8 h-8 inline-flex items-center justify-center mr-2 flex-shrink-0 print:bg-gray-200">14</span>
                Contact
              </h2>
              <p>For questions or support, please contact:</p>
              <div className="p-4 bg-blue-50 rounded-lg mt-2 print:bg-white print:border print:border-blue-200">
                <p className="flex items-center mb-2">
                  <span className="text-blue-700 mr-2">📧</span>
                  <a href="mailto:karan@myempath.co" className="text-blue-600 hover:text-blue-800 transition-colors">karan@myempath.co</a>
                </p>
                <p className="flex items-center">
                  <span className="text-blue-700 mr-2">📞</span>
                  <span>480.295.9462</span>
                </p>
              </div>
            </div>
            
            {/* Document acknowledgment */}
            <div className="mt-10 bg-white rounded-xl shadow-md p-6 print:hidden">
              <h2 className="text-xl font-bold text-gray-900 mb-4">Acknowledgment</h2>
              <p className="text-gray-700 mb-6">
                By using the MyEmpath application, you acknowledge that you have read and understood these Terms & Conditions and agree to be bound by them.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/pledge"
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-center"
                >
                  Return to Our Privacy Pledge
                </Link>
                <button
                  onClick={() => window.print()}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors flex items-center justify-center gap-2"
                >
                  <FileText size={16} />
                  Print This Document
                </button>
              </div>
            </div>
            
            {/* Version history */}
            <div className="mt-6 text-xs text-gray-500 print:hidden">
              <p>Document Version: 1.0</p>
              <p>Previous Versions: None</p>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll to top button */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed bottom-6 right-6 bg-blue-600 text-white rounded-full p-3 shadow-lg hover:bg-blue-700 transition-colors z-50 print:hidden"
          onClick={scrollToTop}
          aria-label="Scroll to top"
        >
          <ArrowUp size={20} />
        </motion.button>
      )}
    </div>
  );
} 