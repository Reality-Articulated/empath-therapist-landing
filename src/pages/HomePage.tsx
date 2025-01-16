import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import howitworks from '../../public/howitworks.png';
import whyitworks from '../../public/whyitworks.png';

import { 
  Brain, 
  Clock, 
  TrendingUp, 
  Shield, 
  Smartphone, 
  LineChart, 
  Heart,
  ChevronRight 
} from 'lucide-react';

export default function HomePage() {
  const [showCalendar, setShowCalendar] = useState(false);

  const features = [
    {
      icon: Clock,
      title: "3-Minute Client Review",
      description: "Quick, comprehensive insights into client progress between sessions."
    },
    {
      icon: Smartphone,
      title: "Client Mobile App",
      description: "Easy logging of mood, activities, and thoughts with voice or text entries."
    },
    {
      icon: LineChart,
      title: "Health Integration",
      description: "Seamless connection with popular wearables for sleep and activity data."
    },
    {
      icon: Heart,
      title: "Deeper Connection",
      description: "Build stronger therapeutic relationships with data-driven insights."
    }
  ];

  return (
    <div className="flex-grow">
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-50 to-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-5xl font-bold text-gray-900 mb-6">
              Make Every Client Feel Like
              <br />
              <span className="text-blue-600">They are Your Only Client</span>
            </h1>
            <p className="text-xl text-gray-600 mb-8">
              Get a deeper understanding of your clients' life experiences between sessions
              with Empath, combining mobile tracking and therapist dashboard.
            </p>
            <div className="flex justify-center space-x-4">
              <button 
                onClick={() => setShowCalendar(true)}
                className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Book a Demo Call
              </button>
              <Link to="/advisory" className="px-8 py-4 bg-white text-blue-600 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                Join Advisory Board
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Calendar Modal */}
      {showCalendar && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg p-4 w-full max-w-4xl">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-2xl font-bold">Schedule a Demo</h2>
              <button 
                onClick={() => setShowCalendar(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>
            </div>
            <iframe 
              src="https://calendar.google.com/calendar/appointments/schedules/AcZssZ3ciL9GVqgrLt07RkxMMYq-0szLXts_yaQ6M7oa0l6Egx-c1gM_1ayZa6kBmPgtXZZgZDs69oxz?gv=true" 
              style={{ border: 0 }} 
              width="100%" 
              height="600" 
              frameBorder="0"
            />
          </div>
        </div>
      )}

      {/* Why Empath Works */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">Why Empath Works</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={whyitworks} 
                alt="Empath System Diagram"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div>
                <h3 className="text-2xl font-semibold mb-4 text-gray-600">The Perfect Balance of Technology and Human Connection</h3>
                <p className="text-gray-600 mb-8">
                  Empath enhances therapy through a three-part system that maintains the essential human connection while leveraging technology:
                </p>
                <div className="space-y-6">
                  <div>
                    <p className="mb-2">
                      <span className="text-blue-600 font-bold text-lg">Perception: </span>
                      <span className="text-gray-600 ml-2">
                        Through our client mobile app, we capture the clients' experiences, moods, and behaviors.
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <span className="text-blue-600 font-bold text-lg">Cognition: </span>
                      <span className="text-gray-600 ml-2">
                        Our therapist dashboard transforms raw data into meaningful insights, helping you understand deeper patterns and trends.
                      </span>
                    </p>
                  </div>
                  <div>
                    <p className="mb-2">
                      <span className="text-blue-600 font-bold text-lg">Action: </span>
                      <span className="text-gray-600 ml-2">
                        The actual therapy session remains purely human, where you use these insights to provide more informed and effective care.
                      </span>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* The Challenge Analogy */}
      <section className="py-24 bg-gradient-to-br from-blue-50 via-white to-blue-50">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-gray-800 to-gray-600">
                If Understanding Your Client Was Like<br/>Understanding a TV Show...
              </h2>
              <div className="relative py-12 my-8">
                <div className="absolute inset-0 bg-blue-100 transform -skew-y-2 w-screen left-1/2 -translate-x-1/2"></div>
                <div className="relative max-w-3xl mx-auto">
                  <p className="text-3xl font-bold text-gray-800 mb-6">
                    Imagine watching "Game of Thrones"<br/>
                    based on just the 1st episode of every season.
                  </p>
                  <p className="text-xl text-gray-600">
                    Just like seeing your client for 1 hour every week or two.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-6 flex items-center text-gray-700">
                  <span className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center mr-3">
                    <span className="text-gray-500">👥</span>
                  </span>
                  Existing Solutions:
                </h3>
                <ul className="space-y-4 text-gray-600">
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-gray-500 text-sm">1</span>
                    </span>
                    <p>Will find a streaming platform for you to watch it</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-gray-500 text-sm">2</span>
                    </span>
                    <p>Will schedule the best time for you to watch those episodes</p>
                  </li>
                  <li className="flex items-start">
                    <span className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-3 mt-1">
                      <span className="text-gray-500 text-sm">3</span>
                    </span>
                    <p>Closest competitors will also give you summaries of the same episodes</p>
                  </li>
                </ul>
              </div>

              <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-8 rounded-2xl shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                <h3 className="text-xl font-semibold mb-6 flex items-center text-white">
                  <span className="w-10 h-10 bg-blue-500 bg-opacity-30 rounded-full flex items-center justify-center mr-3">
                    <span>✨</span>
                  </span>
                  The Empath Difference:
                </h3>
                <p className="text-xl text-white leading-relaxed">
                  We give you recaps of the other 9 episodes that were missed
                </p>
                <div className="mt-6 pt-6 border-t border-blue-400 border-opacity-30">
                  <p className="text-blue-100 text-sm italic">
                    Because understanding the full story matters
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Why Therapists Choose Empath</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <div key={index} className="p-6 rounded-xl bg-white shadow-lg hover:shadow-xl transition-shadow">
                <feature.icon className="w-12 h-12 text-blue-600 mb-4" />
                <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                <p className="text-gray-600">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-16">How Empath Works</h2>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <img 
                src={howitworks} 
                alt="Empath Dashboard Flow Diagram"
                className="rounded-lg shadow-xl"
              />
            </div>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">1</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Client Data Collection</h3>
                  <p className="text-gray-600">
                    Clients use our mobile app to log daily experiences, moods, and activities.
                    Wearable integration provides additional health insights.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">2</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">AI-Powered Analysis</h3>
                  <p className="text-gray-600">
                    Our system analyzes patterns and trends, generating meaningful insights
                    about client well-being and progress.
                  </p>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <div className="flex-shrink-0 w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">3</span>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">Therapist Dashboard</h3>
                  <p className="text-gray-600">
                    Access organized summaries and visualizations of client data,
                    enabling more informed and effective therapy sessions.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Practice?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join innovative therapists using Empath to provide better care through data-driven insights.
          </p>
          <div className="flex justify-center space-x-4">
            <button 
              onClick={() => setShowCalendar(true)}
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Schedule a Demo
              <ChevronRight className="ml-2 w-5 h-5" />
            </button>
            <Link 
              to="/advisory" 
              className="px-8 py-4 bg-transparent border-2 border-white text-white rounded-lg hover:bg-white hover:text-blue-600 transition-colors"
            >
              Learn About Advisory Program
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}