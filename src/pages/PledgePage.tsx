import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

export default function PledgePage() {
    const [showPledge, setShowPledge] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="relative h-screen flex flex-col items-center justify-center text-center">
        <div className="absolute inset-0 z-0">
          <img
            src="/images/earth.jpg"
            alt="Earth from space"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/50" />
        </div>
        
        <div className="relative z-10 max-w-4xl mx-auto px-4">
          <div className="mb-8">
            <span className="inline-block p-2 border border-white/20 rounded-full mb-4">
              <img 
                src="/empath-logo.png"
                alt="Empath Logo"
                className="w-20 h-20"
              />
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6">
            Privacy.
          </h1>
          <h1 className="text-5xl md:text-7xl text-gray-400 font-bold mb-6">
            Our commitment to you
          </h1>
          {/* <p className="text-xl md:text-2xl text-gray-300 mb-12">
            We believe your personal journey should remain exactly that - personal.
          </p> */}
          <div className="h-[144px] flex items-center justify-center">
            {!showPledge ? (
              <button 
                className="px-8 py-4 border border-white/20 rounded-full hover:bg-white/10 transition-colors"
                onClick={() => setShowPledge(true)}
              >
                Read our pledge
              </button>
            ) : (
              <div className="animate-fade-in space-y-4 text-lg bg-white/5 p-6 rounded-xl border border-white/10">
                <p className="animate-slide-up font-medium text-gray-300">
                  We believe that privacy is a right, not a privilege. Because of this, we built Empath from the ground-up with privacy as a core tenet.
                </p>
                <p className="animate-slide-up animation-delay-200 font-medium text-gray-300">
                  We are a privacy-first company. This should be a given. Our commitment is to you, and we value your trust above all else.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content Sections */}
      <div className="max-w-4xl mx-auto px-4 py-24">
        <div className="space-y-24">
          {/* Summary Section */}
          <section>
            <h2 className="text-2xl text-gray-400 mb-12">Here's a summary...</h2>
            <div className="space-y-12">
              <div className="flex gap-6">
                <span className="text-2xl text-gray-500">1</span>
                <h3 className="text-4xl font-light">We cannot read your data</h3>
              </div>
              
              <div className="flex gap-6">
                <span className="text-2xl text-gray-500">2</span>
                <h3 className="text-4xl font-light">We will never train AI on your data</h3>
              </div>
              
              <div className="flex gap-6">
                <span className="text-2xl text-gray-500">3</span>
                <h3 className="text-4xl font-light">You control who sees your data</h3>
              </div>
            </div>
          </section>

          {/* Personal Privacy Section */}
          <section className="space-y-16">
            <div>
              <h2 className="text-5xl font-light mb-6">Personal means private</h2>
              <p className="text-xl text-gray-400 font-light max-w-3xl">
                All of your personal data is secured using InformationVault, Empath's military-grade, quantum-resistant encryption technology.
              </p>
            </div>

            <div>
              <h2 className="text-5xl font-light mb-6">You decide who has access</h2>
              <p className="text-xl text-gray-400 font-light max-w-3xl mb-12">
                By default, your data remains completely private and inaccessible to others. But if you choose to connect Empath with your therapist, you will have the power to selectively share insights with them. You can revoke access at any time, ensuring your privacy preferences are always respected.
              </p>
            </div>

            {/* New Wearables Section */}
            <div>
              <h2 className="text-5xl font-light mb-6">Integrations with Wearables</h2>
              <div className="space-y-8">
                <p className="text-xl text-gray-400 font-light max-w-3xl">
                  Our integrations with wearables allow us to gather insights like steps, energy expenditure, and sleep patterns to identify holistic patterns and help you become self-aware in a meaningful way. All data remains encrypted and private.
                </p>
                
                <div className="grid grid-cols-3 gap-8">
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-medium mb-3">Data Collection</h3>
                    <p className="text-gray-400">
                      We only collect the data you explicitly allow through your device settings
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-medium mb-3">Data Storage</h3>
                    <p className="text-gray-400">
                      All wearable data is encrypted and stored with the same military-grade protection
                    </p>
                  </div>
                  
                  <div className="bg-white/5 p-6 rounded-xl border border-white/10">
                    <h3 className="text-xl font-medium mb-3">Your Control</h3>
                    <p className="text-gray-400">
                      Disconnect or modify your device connections at any time through settings
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* AI Rules Section - Fixed alignment */}
          <section>
            <h2 className="text-5xl font-light mb-24">The rules we're following for building Empath</h2>
            <div className="space-y-20">
              {[
                {
                  number: "1",
                  title: "Good AI is ethical",
                  description: "AI should be designed to respect human rights, diversity, and the individuals that use it. We're prioritizing humans; not robots."
                },
                {
                  number: "2",
                  title: "Good AI is human-first",
                  description: "AI should help humans; not robots. AI is revolutionary, but it should never be used in place of humans."
                },
                {
                  number: "3",
                  title: "Good AI is trustworthy",
                  description: "AI should be built to respect its user's privacy. We have never and will never sell your data."
                },
                {
                  number: "4",
                  title: "Good AI is accessible",
                  description: "No one on this big blue marble is the same. We're building AI for everyone."
                },
                {
                  number: "5",
                  title: "Good AI is quality",
                  description: "Who isn't sick of those terrible, robotic-sounding things we see every. single. day? We certainly are."
                },
                {
                  number: "6",
                  title: "Good AI is useful",
                  description: "What's the point of AI if it can't help you? AI should be solving real problems, in a meaningful, effective way."
                },
                {
                  number: "7",
                  title: "Good AI is innovative",
                  description: "What's the point in just re-creating the wheel? We've got to be pushing the boundaries of what's possible."
                },
                {
                  number: "8",
                  title: "Good AI is delightful",
                  description: "We're seeing terribly-built 'AI features' everywhere now. Interacting with AI should be a delightful experience."
                },
                {
                  number: "9",
                  title: "Good AI is honest",
                  description: "AI should be transparent, and honest about what it can and can't do."
                },
                {
                  number: "10",
                  title: "Good AI is modern",
                  description: "A lot of ultra-modern LLMs are stuck on old training data. AI should be able to help you based on the world today."
                }
              ].map((item, index) => (
                <div key={index} className="grid grid-cols-[2fr,3fr] gap-8 items-start">
                  <div className="flex gap-4 items-baseline">
                    <span className="text-2xl text-gray-500 font-light">{item.number}</span>
                    <h3 className="text-4xl font-light">{item.title}</h3>
                  </div>
                  <p className="text-xl text-gray-400 font-light text-right">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </section>

          {/* Existing Privacy Principles Section */}
          <section>
            <h2 className="text-3xl font-bold mb-8">Our Privacy Principles</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300">
                Your privacy is fundamental to our mission. We collect only what's necessary
                to provide you with a meaningful experience, and we never sell your data.
              </p>
              {/* Add more content sections as needed */}
            </div>
          </section>

          <section>
            <h2 className="text-3xl font-bold mb-8">Data Collection & Usage</h2>
            <div className="prose prose-invert max-w-none">
              <p className="text-lg text-gray-300">
                We are transparent about the data we collect and how we use it. Your data
                is encrypted and stored securely, and you have full control over it.
              </p>
              {/* Add more content sections as needed */}
            </div>
          </section>

          {/* Add this at the end of your content sections, right after the Data Collection & Usage section */}
          <section className="mt-24 text-center">
            <h2 className="text-3xl font-bold mb-8">Want to know more?</h2>
            <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
              Review our detailed privacy policy for comprehensive information on how we handle your data.
            </p>
            <Link 
              to="/privacy" 
              className="inline-block px-8 py-4 bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full transition-colors"
            >
              Read Full Privacy Policy
            </Link>
          </section>
        </div>
      </div>
    </div>
  );
}
