import React, { useState, useEffect } from 'react';
import { Plane as Plant, CloudSun, Sprout, Database, Users, BarChart3, ChevronRight, Globe, Camera, Upload, AlertCircle, Check, Droplets, Leaf } from 'lucide-react';
import { AuthModal } from './components/AuthModal';
import { supabase } from './lib/supabase';

function FeatureCard({ icon: Icon, title, description }: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 border border-green-100 hover:border-green-200">
      <div className="h-12 w-12 bg-gradient-to-br from-green-100 to-green-50 rounded-lg flex items-center justify-center mb-4">
        <Icon className="h-6 w-6 text-green-600" />
      </div>
      <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}

function DemoSection() {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [showResults, setShowResults] = useState(false);

  const handleAnalyze = () => {
    setIsAnalyzing(true);
    setTimeout(() => {
      setIsAnalyzing(false);
      setShowResults(true);
    }, 2000);
  };

  return (
    <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-8 shadow-xl border border-green-100">
      <h3 className="text-2xl font-semibold mb-6 text-gray-800">Live Demo: Crop Analysis</h3>
      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="aspect-video bg-gray-100 rounded-lg overflow-hidden relative">
            <img
              src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=800&q=80"
              alt="Maize crop"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-black/50 px-4 py-2 rounded-full text-white flex items-center">
                <Camera className="h-5 w-5 mr-2" />
                Sample Crop Image
              </div>
            </div>
          </div>
          <button
            onClick={handleAnalyze}
            className="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center justify-center"
            disabled={isAnalyzing}
          >
            {isAnalyzing ? (
              <>
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                Analyzing...
              </>
            ) : (
              <>
                <Upload className="h-5 w-5 mr-2" />
                Analyze Crop
              </>
            )}
          </button>
        </div>
        
        <div className={`space-y-4 transition-opacity duration-300 ${showResults ? 'opacity-100' : 'opacity-0'}`}>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 flex items-start">
            <AlertCircle className="h-5 w-5 text-yellow-600 mt-0.5 mr-2 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-800">Early Drought Stress Detected</h4>
              <p className="text-yellow-700 text-sm">AI analysis shows signs of water stress in your maize crop.</p>
            </div>
          </div>
          
          <div className="space-y-3">
            <h4 className="font-semibold text-gray-800">AI Recommendations:</h4>
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Leaf className="h-5 w-5 text-green-600 mr-2" />
                <span className="font-medium text-green-800">Switch to Drought-Resistant Sorghum</span>
              </div>
              <p className="text-green-700 text-sm ml-7">Estimated yield increase: 25%</p>
            </div>
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <div className="flex items-center mb-2">
                <Droplets className="h-5 w-5 text-blue-600 mr-2" />
                <span className="font-medium text-blue-800">Optimize Irrigation</span>
              </div>
              <p className="text-blue-700 text-sm ml-7">Reduce water usage by 20% (2,000L savings)</p>
            </div>
          </div>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-4">
            <div className="flex items-center mb-2">
              <Check className="h-5 w-5 text-green-600 mr-2" />
              <span className="font-medium text-green-800">Carbon Credits Available</span>
            </div>
            <p className="text-green-700 text-sm ml-7">Earn 10 credits ($50 value) by implementing these changes</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    // Check current session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleAuthClick = () => {
    setIsAuthModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Hero Section */}
      <div className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16 text-center">
          <div className="inline-flex items-center bg-green-50 border border-green-200 rounded-full px-4 py-1.5 mb-8">
            <span className="relative flex h-3 w-3 mr-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
            </span>
            <span className="text-green-800 text-sm font-medium">AI-Powered Farming Assistant</span>
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            FarmEdge <span className="text-green-600">AI</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Boosting crop yields while fighting climate change—one small farm at a time.
          </p>
          <div className="flex justify-center gap-4">
            <button
              onClick={handleAuthClick}
              className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors flex items-center"
            >
              {user ? 'Dashboard' : 'Get Started'}
              <ChevronRight className="ml-2 h-5 w-5" />
            </button>
            <button className="border-2 border-green-600 text-green-600 px-8 py-3 rounded-lg font-semibold hover:bg-green-50 transition-colors">
              Learn More
            </button>
          </div>
        </div>
        
        {/* Background Pattern */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6TTI0IDQ4YzMuMzEgMCA2IDIuNjkgNiA2cy0yLjY5IDYtNiA2LTYtMi42OS02LTYgMi42OS02IDYtNnptMC0xMmMzLjMxIDAgNiAyLjY5IDYgNnMtMi42OSA2LTYgNi02LTIuNjktNi02IDIuNjktNiA2LTZ6IiBzdHJva2U9IiMwRDk0ODgiIHN0cm9rZS13aWR0aD0iMiIvPjwvZz48L3N2Zz4=')] opacity-5"></div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-green-900 to-green-800 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">30%</div>
              <div className="text-green-200">Increase in Crop Yields</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">50K+</div>
              <div className="text-green-200">Farmers Supported</div>
            </div>
            <div className="bg-white/5 backdrop-blur-sm rounded-lg p-6">
              <div className="text-4xl font-bold mb-2">25%</div>
              <div className="text-green-200">Carbon Footprint Reduction</div>
            </div>
          </div>
        </div>
      </div>

      {/* Demo Section */}
      <div className="py-20 bg-gradient-to-b from-white to-green-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-4 text-gray-900">
            See FarmEdge AI in Action
          </h2>
          <p className="text-gray-600 text-center mb-12 max-w-2xl mx-auto">
            Experience how our AI analyzes crop health and provides actionable recommendations in real-time.
          </p>
          <DemoSection />
        </div>
      </div>

      {/* Features Section */}
      <div className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center mb-12 text-gray-900">
            Empowering Farmers with AI-Driven Solutions
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={CloudSun}
              title="AI Climate Advisor"
              description="Real-time weather predictions and crop recommendations using satellite data and advanced AI models."
            />
            <FeatureCard
              icon={Plant}
              title="Precision Farming"
              description="Smart monitoring of soil health and crop conditions using IoT sensors and computer vision."
            />
            <FeatureCard
              icon={Database}
              title="Carbon Credits"
              description="Earn and trade carbon credits for sustainable farming practices through our blockchain marketplace."
            />
            <FeatureCard
              icon={Globe}
              title="Local Language Support"
              description="Access farming advice in your local language through our intelligent chatbot."
            />
            <FeatureCard
              icon={Users}
              title="Community Knowledge"
              description="Share and learn from other farmers' experiences in our gamified social platform."
            />
            <FeatureCard
              icon={BarChart3}
              title="Impact Tracking"
              description="Monitor your farm's performance and environmental impact with detailed analytics."
            />
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gradient-to-b from-green-50 to-green-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4 text-gray-900">
            Ready to Transform Your Farm?
          </h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers who are already using FarmEdge AI to improve yields
            and fight climate change.
          </p>
          <button
            onClick={handleAuthClick}
            className="bg-green-600 text-white px-8 py-3 rounded-lg font-semibold hover:bg-green-700 transition-colors"
          >
            Start Your Free Trial
          </button>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-semibold mb-4">FarmEdge AI</h3>
              <p className="text-gray-400">
                Empowering smallholder farmers with AI-driven climate-smart solutions.
              </p>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Features</h3>
              <ul className="space-y-2 text-gray-400">
                <li>AI Climate Advisor</li>
                <li>Precision Farming</li>
                <li>Carbon Credits</li>
                <li>Community Hub</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Blog</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-semibold mb-4">Connect</h3>
              <ul className="space-y-2 text-gray-400">
                <li>Twitter</li>
                <li>LinkedIn</li>
                <li>Facebook</li>
                <li>Instagram</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-12 pt-8 text-center text-gray-400">
            <p>© 2025 FarmEdge AI. All rights reserved.</p>
          </div>
        </div>
      </footer>

      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
      />
    </div>
  );
}

export default App;