import React from 'react';
import { Link } from 'react-router-dom';
import howitworks from '../../public/howitworks.png';

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
              Get a complete understanding of your clients' well-being between sessions
              with our innovative platform combining mobile tracking and therapist dashboard.
            </p>
            <div className="flex justify-center space-x-4">
              <a href="#demo" className="px-8 py-4 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
                Request Demo
              </a>
              <Link to="/advisory" className="px-8 py-4 bg-white text-blue-600 rounded-lg border-2 border-blue-600 hover:bg-blue-50 transition-colors">
                Join Advisory Board
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20">
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
            <a 
              href="#demo" 
              className="px-8 py-4 bg-white text-blue-600 rounded-lg hover:bg-gray-100 transition-colors inline-flex items-center"
            >
              Schedule a Demo
              <ChevronRight className="ml-2 w-5 h-5" />
            </a>
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