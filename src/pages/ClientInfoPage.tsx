import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronDown, CheckCircle, Shield, Clock, Calendar, Mic, Smartphone, Brain, Ban, Info } from 'lucide-react';
import logo from '../../public/empath-logo.png';

const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8 } }
};

const staggerContainer = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.2 }
  }
};

// FAQ Accordion Item Component
const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-gray-200 last:border-b-0">
      <button
        className="w-full py-4 flex justify-between items-center text-left text-lg font-medium text-gray-700 hover:text-[#1281dd] transition"
        onClick={() => setIsOpen(!isOpen)}
      >
        {question}
        <ChevronDown className={`w-5 h-5 text-[#1281dd] transition-transform ${isOpen ? 'transform rotate-180' : ''}`} />
      </button>
      {isOpen && (
        <div className="pb-6 pt-2 text-gray-600 pr-6">
          {answer}
        </div>
      )}
    </div>
  );
};

export default function ClientInfoPage() {
  return (
    <div className="flex-grow overflow-hidden">
      {/* Logo in top left corner */}
      <div className="absolute top-4 left-4 z-10">
        <motion.img 
          src={logo} 
          alt="Empath Logo" 
          className="w-12 h-12"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
        />
      </div>
      
      {/* 1. Hero Section */}
      <motion.section
        className="bg-gradient-to-b from-blue-50 via-teal-50/30 to-white pt-12 pb-16 relative"
        initial="hidden"
        animate="visible"
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            variants={fadeIn}
            className="text-center mb-8"
          >
            <h1 className="text-4xl md:text-5xl font-bold mb-3 bg-clip-text text-transparent bg-gradient-to-br from-blue-600 to-teal-500 animate-gradient-x">
            Make 70 minutes of therapy progress <br /> in a 50-minute session
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
            Empath frees up 15–20 extra minutes every session — so you can spend more time healing, growing, and making real breakthroughs, without paying a penny more.
            </p>
          </motion.div>

          {/* Video Section */}
          <motion.div
            variants={fadeIn}
            className="max-w-3xl mx-auto rounded-xl overflow-hidden shadow-lg mb-10 aspect-video bg-gray-100"
          >
            {/* Replace with your actual video embed */}
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              <p>Empath Explainer Video</p>
              {/* Actual video embed would go here */}
              {/* <iframe 
                width="100%" 
                height="100%" 
                src="your-video-url-here" 
                title="Empath Explainer Video" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
              ></iframe> */}
            </div>
          </motion.div>

          {/* Value Proposition Banner */}
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 mb-8 border border-teal-100 shadow-sm"
          >
            <div className="text-center">              <p className="text-gray-700 mt-1">
                Reclaim the <span className="font-bold">~20 minutes</span> spent recapping in every session. <br />More therapy value, same therapy bill.
              </p>
            </div>
          </motion.div>

          {/* CTAs */}
          <motion.div
            variants={fadeIn}
            className="flex flex-col sm:flex-row justify-center gap-4 mb-6"
          >
            <a
              href="https://apps.apple.com/us/app/myempath/id6472873287"
              className="px-6 py-4 bg-[#1281dd] text-white rounded-full hover:shadow-lg shadow-md transition-all duration-300 transform font-semibold text-center text-lg"
            >
              Download the Empath App
            </a>
            <a
              href="tel:+18776528626"
              className="px-6 py-4 bg-white text-[#1281dd] rounded-full shadow-md hover:shadow-lg border border-[#1281dd]/20 transition-all duration-300 font-semibold text-center text-lg"
            >
              Just Call to Journal
            </a>
          </motion.div>
          
          {/* Privacy Banner */}
          <motion.div
            variants={fadeIn}
            className="max-w-3xl mx-auto bg-white rounded-lg shadow-sm border border-teal-100 p-3 flex items-center"
          >
            <Shield className="text-teal-600 w-5 h-5 mr-2 flex-shrink-0" />
            <p className="text-sm text-gray-600">
              <span className="font-medium">HIPAA-grade privacy:</span> Your therapist sees your entries only before your appointment—not in real-time.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 2. The Math - Value Comparison */}
      <motion.section
        className="py-12 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto text-center"
          >
            <h2 className="text-3xl font-bold mb-8 text-gray-800">
              Here's exactly what you get:
            </h2>

            {/* Session comparison visualization */}
            <div className="bg-gray-50 p-6 rounded-xl mb-8">
              <div className="flex flex-col md:flex-row items-center justify-center gap-8">
                <div className="flex flex-col items-center w-full md:w-80">
                  <div className="text-gray-700 mb-2 font-medium">Without Empath</div>
                  <div className="w-full h-16 flex overflow-hidden rounded-lg">
                    <div className="w-[50%] bg-gray-300 flex items-center justify-center text-xs text-gray-700 font-medium px-2">
                      20 min of "how was your week?"
                    </div>
                    <div className="w-[50%] bg-teal-900 flex items-center justify-center text-xs text-white font-medium">
                      ~30 min: Real progress
                    </div>
                  </div>
                </div>
                
                <div className="text-xl font-bold text-gray-400">vs</div>
                
                <div className="flex flex-col items-center w-full md:w-80">
                  <div className="text-[#1281dd] mb-2 font-medium">With Empath</div>
                  <div className="w-full h-16 flex overflow-hidden rounded-lg">
                    <div className="w-[11%] bg-gray-300 flex items-center justify-center text-xs text-gray-700 font-medium px-2">
                      5 min catch -up
                    </div>
                    <div className="w-[89%] bg-[#1281dd] flex items-center justify-center text-xs text-white font-medium">
                      ~45 min: Real breakthroughs
                    </div>
                  </div>
                </div>
              </div>
              <p className="text-center mt-6 text-gray-700 font-medium">
                That's <span className="text-[#1281dd] font-bold">125% more productive therapy time</span> from the same session.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 mb-8">
              <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-5">
                <div className="text-2xl font-bold text-[#1281dd] mb-2 flex items-center justify-center">
                  Save +$600
                  <div className="relative group ml-2">
                    <Info className="w-4 h-4 text-gray-400" />
                    <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 w-64 p-2 bg-gray-800 text-white text-xs rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none z-10">
                      Based on saving 15-20 min per session at the U.S. average $175/50-min private-pay rate. Your exact value scales with your therapist's fee.
                    </div>
                  </div>
                </div>
                <p className="text-gray-600">Value of therapy time reclaimed over 10 sessions</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-5">
                <div className="text-2xl font-bold text-[#1281dd] mb-2 text-center">3x Faster</div>
                <p className="text-gray-600">Progress through therapy goals and breakthroughs</p>
              </div>
              
              <div className="bg-white rounded-xl shadow-sm border border-teal-100 p-5">
                <div className="text-2xl font-bold text-[#1281dd] mb-2 text-center">Zero Prep</div>
                <p className="text-gray-600">Just speak or text as thoughts occur</p>
              </div>
            </div>

          </motion.div>
        </div>
      </motion.section>

      {/* 3. Micro-story */}
      <motion.section
        className="py-12 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-8 text-gray-800"
          >
            A Thursday meltdown shouldn't fade by Tuesday afternoon.
          </motion.h2>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto bg-white rounded-xl shadow-md p-6"
          >
            <div className="space-y-6">
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-blue-100 p-2 rounded-full mr-4">
                  <Calendar className="text-blue-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-blue-700 mb-1">Thu – 9 PM: Snap at your partner</h3>
                  <p className="text-gray-600">
                    Anger, shame, racing heart. <span className="italic text-gray-500">Four days pass...</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-purple-100 p-2 rounded-full mr-4">
                  <Brain className="text-purple-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-purple-700 mb-1">Sun – 11 PM: Anxious spiral</h3>
                  <p className="text-gray-600">
                    Looping thoughts keep you awake. <span className="italic text-gray-500">Memory starts to blur...</span>
                  </p>
                </div>
              </div>
              
              <div className="flex items-start">
                <div className="flex-shrink-0 bg-teal-100 p-2 rounded-full mr-4">
                  <Clock className="text-teal-600 w-6 h-6" />
                </div>
                <div>
                  <h3 className="font-bold text-teal-700 mb-1">Tue – 1 PM: Therapy starts</h3>
                  <p className="text-gray-600">
                    You grasp for details; only a vague story surfaces.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="mt-6 p-4 bg-gray-50 rounded-lg">
              <p className="text-center text-gray-700">
                <span className="font-medium">Insight hits in real life, not on your calendar.</span><br />
                <span className="italic">Capture it with Empath — so Tuesday feels as clear as Thursday night.</span>
              </p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 4. How Empath Works */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            How Empath Works
          </motion.h2>
          
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-blue-400">
              <div className="text-blue-500 font-bold text-xl mb-3 flex items-center">
                <span className="bg-blue-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-blue-700">1</span>
                Capture the moment when it happens
              </div>
              <p className="text-gray-600 mb-4">
                Speak, type, or let your Apple Watch share sleep & heart-rate.
              </p>
              <div className="flex justify-center gap-3 mt-4">
                <div className="p-2 bg-blue-50 rounded-full">
                  <Mic className="w-5 h-5 text-blue-600" />
                </div>
                <div className="p-2 bg-blue-50 rounded-full">
                  <Smartphone className="w-5 h-5 text-blue-600" />
                </div>
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-teal-400">
              <div className="text-teal-500 font-bold text-xl mb-3 flex items-center">
                <span className="bg-teal-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-teal-700">2</span>
                We distill the noise
              </div>
              <p className="text-gray-600">
              Our encrypted AI turns raw entries into a 3-minute digest only your therapist sees before you meet.
              </p>
              <div className="text-xs text-gray-500 mt-3 italic">
                Not a live feed—your therapist reviews just before your session
              </div>
            </motion.div>
            
            <motion.div variants={fadeIn} className="bg-white rounded-xl shadow-md p-6 border-t-4 border-purple-400">
              <div className="text-purple-500 font-bold text-xl mb-3 flex items-center">
                <span className="bg-purple-100 w-8 h-8 rounded-full flex items-center justify-center mr-2 text-purple-700">3</span>
                Walk in 100 % understood
              </div>
              <p className="text-gray-600">
                Your session opens on breakthroughs—not "So, how was your week?"
              </p>
            </motion.div>
          </div>
          
          <motion.p 
            variants={fadeIn}
            className="text-center text-sm italic text-gray-500 mt-6 max-w-3xl mx-auto"
          >
            *No Watch? No problem—voice & text work on any phone.
          </motion.p>
        </div>
      </motion.section>

      {/* 5. Why You'll Feel the Difference */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Why You'll Feel the Difference
          </motion.h2>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6"
          >
            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">More therapy value</span> – 15-20 extra productive minutes each session.</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">Feel fully heard</span> – even the 2 a.m. thoughts you forget to mention.</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">Deeper breakthroughs, faster</span> – therapist dives straight into patterns.</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">No extra homework</span> – a quick voice note is enough.</p>
            </div>
            
            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">HIPAA-grade privacy</span> – your data is encrypted and seen only by your therapist.</p>
            </div>

            <div className="flex items-start">
              <div className="flex-shrink-0 text-[#00B9B0] mr-3">
                <CheckCircle className="w-6 h-6 flex-shrink-0 mt-1" />
              </div>
              <p className="text-gray-700"><span className="font-semibold">Double your progress</span> – by transforming catch-up time into breakthrough time.</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 6. Choose Your Lane */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Choose Your Lane
          </motion.h2>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-4xl mx-auto grid md:grid-cols-2 gap-8"
          >
            <div className="bg-gradient-to-br from-teal-50 to-blue-50 rounded-2xl p-6 shadow-md border border-teal-100">
              <h3 className="text-2xl font-bold text-teal-700 mb-6 text-center">Download the App</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-[#00B9B0] w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <span>Mood check-ins & journals</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#00B9B0] w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <span>Health-data sync</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-[#00B9B0] w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <span>Insight dashboards</span>
                </li>
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-indigo-50 rounded-2xl p-6 shadow-md border border-purple-100">
              <h3 className="text-2xl font-bold text-purple-700 mb-6 text-center">Call to Journal</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <CheckCircle className="text-purple-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <span>No downloads</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-purple-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <span>Dial +1 877 652 8626 anytime</span>
                </li>
                <li className="flex items-start">
                  <CheckCircle className="text-purple-500 w-5 h-5 mr-3 flex-shrink-0 mt-1" />
                  <span>Perfect for walks & commutes</span>
                </li>
              </ul>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* 7. Therapists Love It */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
      </motion.section>

      {/* 8. Security & Privacy */}
      <motion.section
        className="py-16 bg-white"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Security & Privacy
          </motion.h2>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto"
          >
            <ul className="space-y-4">
              <li className="flex items-start">
                <Shield className="text-[#00B9B0] w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">End-to-end encryption (AES-256 in transit & at rest)</p>
              </li>
              <li className="flex items-start">
                <Shield className="text-[#00B9B0] w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">HIPAA-ready infrastructure & BAA with providers</p>
              </li>
              <li className="flex items-start">
                <Ban className="text-[#00B9B0] w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">Data <strong>never</strong> sold or used for ads</p>
              </li>
              <li className="flex items-start">
                <CheckCircle className="text-[#00B9B0] w-6 h-6 mr-3 flex-shrink-0 mt-1" />
                <p className="text-gray-700">You can delete your entries at any time</p>
              </li>
            </ul>
          </motion.div>
        </div>
      </motion.section>

      {/* 9. FAQ */}
      <motion.section
        className="py-16 bg-gray-50"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={staggerContainer}
      >
        <div className="container mx-auto px-4">
          <motion.h2 
            variants={fadeIn}
            className="text-3xl font-bold text-center mb-12 text-gray-800"
          >
            Frequently Asked Questions
          </motion.h2>
          
          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto bg-white rounded-2xl p-6 shadow-md divide-y divide-gray-100"
          >
            <FAQItem 
              question="Do I have to download an app?" 
              answer="No. You can journal by phone call or text instead. Just dial +1 877 652 8626 anytime to share your thoughts, and we'll make sure they get to your therapist before your next session."
            />
            <FAQItem 
              question="Will my therapist see everything I log?" 
              answer="No. On the app you will have the option to share/un-share entries with your therapist. Your therapist will only see the entries you share."
            />
            <FAQItem 
              question="When does my therapist see my entries?" 
              answer="Your therapist receives a digest of your entries just before your scheduled session. This timing ensures they have the most up-to-date information without creating expectations of mid-week responses."
            />
            <FAQItem 
              question="Will my therapist message me mid-week?" 
              answer="No. Empath is preparation for your sessions, not a live chat platform. This boundary ensures your therapist maintains their professional capacity and prevents burnout."
            />
            <FAQItem 
              question="Does Empath replace therapy?" 
              answer="No. It simply makes the therapy you already value more efficient. Empath helps you capture your experiences more accurately and helps your therapist understand your week better, but it's not a substitute for the therapeutic relationship."
            />
            <FAQItem 
              question="How is this different from other mental health apps?" 
              answer="Unlike general wellness apps, Empath is designed specifically to enhance your existing therapy relationship. We don't provide therapy ourselves—we enhance the therapy you're already getting by improving the information flow between sessions."
            />
            <FAQItem 
              question="Is it really secure?" 
              answer="Yes. We meet or exceed HIPAA requirements and work under a signed BAA with your therapist. Your data is encrypted end-to-end, and we never sell or share your information with third parties."
            />
            <FAQItem 
              question="How much does it cost?" 
              answer="Empath is free to clients through their therapists."
            />
          </motion.div>

          <motion.div 
            variants={fadeIn}
            className="max-w-3xl mx-auto mt-6 p-4 bg-white rounded-lg border border-red-100 flex"
          >
            <Ban className="w-5 h-5 text-red-500 mr-2 flex-shrink-0 mt-1" />
            <p className="text-sm text-gray-700">
              <span className="font-medium text-red-600">Important:</span> Empath is not emergency monitoring or a replacement for therapy. If you're experiencing a crisis, please contact emergency services or a crisis hotline immediately.
            </p>
          </motion.div>
        </div>
      </motion.section>

      {/* 10. Citations */}
      <motion.section
        className="py-8 bg-gray-100 text-xs text-gray-500"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        variants={fadeIn}
      >
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <h3 className="font-medium mb-2">Sources:</h3>
            <ul className="space-y-1">
              <li>• Average US therapy cost $100-$200/session (Healthline; Medical News Today).</li>
              <li>• Physicians spend ~16-20% of work time on admin (Int. J. Health Services study, Psychiatry Advisor).</li>
              <li>• Journaling interventions linked to improved mental-health outcomes (Systematic review, PMC 2022).</li>
            </ul>
          </div>
        </div>
      </motion.section>

      {/* Fixed bottom CTA on mobile */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-3 flex gap-2 z-50">
        <a
          href="https://apps.apple.com/us/app/myempath/id6472873287"
          className="flex-1 px-3 py-2 bg-[#1281dd] text-white rounded-full text-sm font-medium text-center"
        >
          Download App
        </a>
        <a
          href="tel:+18776528626"
          className="flex-1 px-3 py-2 bg-white text-[#1281dd] rounded-full border border-[#1281dd]/20 text-sm font-medium text-center"
        >
          Call to Journal
        </a>
      </div>
    </div>
  );
} 