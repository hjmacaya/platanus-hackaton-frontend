import React from 'react';
import { Button } from "@/components/ui/button";
import { CheckCircle } from "lucide-react";

const CTASection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-edu-blue to-tech-purple">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
            Transform Your Grading Process Today
          </h2>
          <p className="mt-4 text-xl text-white/90">
            Join thousands of educators saving time and providing better feedback with AI-powered grading.
          </p>
          
          <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">Free</h3>
              <p className="text-white/80 text-sm mb-4">Perfect for trying out the platform</p>
              <p className="text-3xl font-bold text-white mb-6">$0<span className="text-lg font-normal text-white/70">/month</span></p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-white/90">Up to 50 tests per month</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-white/90">Basic analytics</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-white/90">Email support</span>
                </div>
              </div>
              
              <Button className="w-full bg-white text-edu-blue hover:bg-white/90">
                Sign Up Free
              </Button>
            </div>
            
            <div className="bg-white rounded-lg p-6 border border-white/20 shadow-lg relative">
              <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-tech-purple text-white text-xs font-bold py-1 px-3 rounded-full">
                Most Popular
              </div>
              <h3 className="text-xl font-bold text-dark-text mb-3">Pro</h3>
              <p className="text-gray-600 text-sm mb-4">For individual educators</p>
              <p className="text-3xl font-bold text-dark-text mb-6">$29<span className="text-lg font-normal text-gray-500">/month</span></p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-edu-blue flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-gray-600">Unlimited tests</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-edu-blue flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-gray-600">Advanced analytics</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-edu-blue flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-gray-600">Priority support</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-edu-blue flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-gray-600">LMS integrations</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-edu-blue flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-gray-600">Custom feedback templates</span>
                </div>
              </div>
              
              <Button className="w-full bg-tech-purple text-white hover:bg-tech-purple/90">
                Start 14-Day Free Trial
              </Button>
            </div>
            
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6 border border-white/20">
              <h3 className="text-xl font-bold text-white mb-3">Enterprise</h3>
              <p className="text-white/80 text-sm mb-4">For schools and districts</p>
              <p className="text-3xl font-bold text-white mb-6">Custom<span className="text-lg font-normal text-white/70"> pricing</span></p>
              
              <div className="space-y-3 mb-6">
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-white/90">Everything in Pro</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-white/90">School-wide analytics</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-white/90">Admin dashboard</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-white/90">API access</span>
                </div>
                <div className="flex items-start">
                  <CheckCircle className="h-5 w-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="ml-2 text-sm text-white/90">Dedicated support</span>
                </div>
              </div>
              
              <Button className="w-full bg-white text-edu-blue hover:bg-white/90">
                Contact Sales
              </Button>
            </div>
          </div>
          
          <p className="mt-8 text-sm text-white/80">
            All plans come with a 14-day money-back guarantee. No credit card required for free plan.
          </p>
        </div>
      </div>
    </section>
  );
};

export default CTASection;