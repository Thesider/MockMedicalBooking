import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Users, Clock, Shield } from 'lucide-react';
import MainLayout from '../layouts/MainLayout';

const HomePage: React.FC = () => {
  const features = [
    {
      icon: Calendar,
      title: 'Easy Booking',
      description: 'Schedule appointments with just a few clicks'
    },
    {
      icon: Users,
      title: 'Expert Doctors',
      description: 'Access to qualified healthcare professionals'
    },
    {
      icon: Clock,
      title: 'Flexible Hours',
      description: 'Extended hours to fit your schedule'
    },
    {
      icon: Shield,
      title: 'Secure & Private',
      description: 'Your health information is protected'
    }
  ];

  return (
    <MainLayout>
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-blue-600 via-blue-700 to-blue-800 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight mb-6">
                Your Health, <br />
                <span className="text-blue-200">Our Priority</span>
              </h1>
              <p className="text-xl text-blue-100 mb-8 leading-relaxed">
                Book appointments with top doctors, manage your healthcare journey, 
                and get the care you deserve with our modern medical platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  to="/appointment"
                  className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 text-center"
                >
                  Book Appointment
                </Link>
                <Link
                  to="/check-in"
                  className="border border-white text-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition-colors duration-200 text-center"
                >
                  Check In
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="https://images.pexels.com/photos/40568/medical-appointment-doctor-healthcare-40568.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Healthcare"
                className="rounded-lg shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Why Choose MediCare?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              We're committed to providing you with the best healthcare experience through innovation and care.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="text-center p-8 rounded-lg hover:shadow-lg transition-shadow duration-300 border border-gray-100"
                >
                  <div className="bg-blue-100 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-gray-900 mb-4">
              Trusted by Thousands
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-blue-600 mb-2">50K+</div>
              <div className="text-gray-600 text-lg">Happy Patients</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-green-600 mb-2">200+</div>
              <div className="text-gray-600 text-lg">Expert Doctors</div>
            </div>
            <div className="text-center">
              <div className="text-4xl lg:text-5xl font-bold text-orange-600 mb-2">24/7</div>
              <div className="text-gray-600 text-lg">Emergency Care</div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-6">
            Ready to Get Started?
          </h2>
          <p className="text-xl text-blue-100 mb-8">
            Join thousands of satisfied patients who trust MediCare for their healthcare needs.
          </p>
          <Link
            to="/appointment"
            className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-blue-50 transition-colors duration-200 inline-block"
          >
            Book Your First Appointment
          </Link>
        </div>
      </section>
    </MainLayout>
  );
};

export default HomePage;