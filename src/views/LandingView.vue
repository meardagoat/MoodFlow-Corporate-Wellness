<template>
  <div class="min-h-screen bg-white">
    <!-- Navigation moderne -->
    <nav class="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-gray-100">
      <div class="max-w-7xl mx-auto px-6 py-4">
        <div class="flex items-center justify-between">
          <!-- Logo -->
          <div class="flex items-center gap-3">
            <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
              <span class="text-white font-bold text-lg">M</span>
            </div>
            <span class="text-2xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              MoodFlow
            </span>
          </div>

          <!-- Navigation desktop -->
          <div class="hidden md:flex items-center gap-8">
            <a href="#features" class="text-gray-700 hover:text-purple-600 font-medium transition">Features</a>
            <a href="#benefits" class="text-gray-700 hover:text-purple-600 font-medium transition">Benefits</a>
            <a href="#pricing" class="text-gray-700 hover:text-purple-600 font-medium transition">Pricing</a>
            <a href="#contact" class="text-gray-700 hover:text-purple-600 font-medium transition">Contact</a>
          </div>

          <!-- CTA buttons -->
          <div class="flex items-center gap-3">
            <button 
              @click="goToLogin"
              class="hidden sm:block px-5 py-2.5 text-gray-700 font-semibold hover:text-purple-600 transition"
            >
              Sign In
            </button>
            <button 
              @click="goToRegister"
              class="px-6 py-2.5 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
            >
              Get Started
            </button>
          </div>
        </div>
      </div>
    </nav>

    <!-- Hero Section - Design moderne et épuré -->
    <section class="pt-32 pb-20 px-6 relative overflow-hidden">
      <!-- Background elements -->
      <div class="absolute top-20 right-0 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl"></div>
      <div class="absolute bottom-0 left-0 w-96 h-96 bg-violet-200/30 rounded-full blur-3xl"></div>
      
      <div class="max-w-7xl mx-auto relative z-10">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <!-- Content gauche -->
          <div class="space-y-8">
            <div class="inline-block px-4 py-2 bg-purple-100/50 rounded-full">
              <span class="text-purple-700 font-semibold text-sm">✨ Corporate Wellness Platform</span>
            </div>
            
            <h1 class="text-5xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">
              Mental wellness
              <span class="block bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                for your team
              </span>
            </h1>
            
            <p class="text-xl text-gray-600 leading-relaxed">
              Create a healthier, happier workplace with anonymous mood tracking, 
              peer support, and actionable insights for managers.
            </p>

            <div class="flex flex-col sm:flex-row gap-4 pt-4">
              <button 
                @click="goToRegister"
                class="px-8 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-lg"
              >
                Start Free Trial
              </button>
              <button 
                @click="scrollToDemo"
                class="px-8 py-4 bg-white border-2 border-gray-200 text-gray-900 font-bold rounded-2xl hover:border-purple-300 transition-all text-lg"
              >
                Watch Demo
              </button>
            </div>

            <!-- Social proof -->
            <div class="flex items-center gap-6 pt-8">
              <div class="flex -space-x-3">
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-white"></div>
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-white"></div>
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-white"></div>
                <div class="w-12 h-12 rounded-full bg-gradient-to-br from-pink-400 to-pink-600 border-2 border-white"></div>
              </div>
              <div>
                <p class="font-bold text-gray-900">500+ companies</p>
                <p class="text-sm text-gray-600">trust MoodFlow</p>
              </div>
            </div>
          </div>

          <!-- Visual droite - Illustration moderne -->
          <div class="relative">
            <div class="relative w-full aspect-square">
              <!-- Card empilées avec effet 3D -->
              <div class="absolute inset-0 flex items-center justify-center">
                <div class="relative w-80 h-80">
                  <!-- Card 3 (arrière) -->
                  <div class="absolute inset-0 bg-gradient-to-br from-pink-100 to-pink-200 rounded-3xl shadow-xl transform rotate-6 scale-95"></div>
                  
                  <!-- Card 2 (milieu) -->
                  <div class="absolute inset-0 bg-gradient-to-br from-purple-100 to-purple-200 rounded-3xl shadow-2xl transform -rotate-3 scale-98">
                    <div class="p-8 flex flex-col justify-center h-full">
                      <div class="text-6xl mb-4">😊</div>
                      <p class="text-2xl font-bold text-purple-900">Team Mood</p>
                      <p class="text-purple-700 mt-2">Tracking wellness daily</p>
                    </div>
                  </div>
                  
                  <!-- Card 1 (avant) -->
                  <div class="absolute inset-0 bg-white rounded-3xl shadow-2xl transform hover:scale-105 transition-transform">
                    <div class="p-8 flex flex-col justify-between h-full">
                      <div>
                        <div class="flex items-center gap-3 mb-6">
                          <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                            <span class="text-2xl">💭</span>
                          </div>
                          <div>
                            <p class="font-bold text-gray-900">Anonymous</p>
                            <p class="text-sm text-gray-600">Feel safe to share</p>
                          </div>
                        </div>
                        
                        <!-- Mood selector mini -->
                        <div class="flex gap-2 mb-6">
                          <div class="flex-1 h-16 bg-gradient-to-br from-green-100 to-green-200 rounded-2xl flex items-center justify-center">
                            <span class="text-3xl">😄</span>
                          </div>
                          <div class="flex-1 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center">
                            <span class="text-3xl">😊</span>
                          </div>
                          <div class="flex-1 h-16 bg-gradient-to-br from-gray-100 to-gray-200 rounded-2xl flex items-center justify-center">
                            <span class="text-3xl">😐</span>
                          </div>
                        </div>
                      </div>
                      
                      <div class="space-y-3">
                        <div class="h-3 bg-purple-100 rounded-full overflow-hidden">
                          <div class="h-full w-4/5 bg-gradient-to-r from-violet-500 to-purple-500 rounded-full"></div>
                        </div>
                        <p class="text-sm text-gray-600">80% team participation</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section id="features" class="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Everything you need for
            <span class="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              team wellness
            </span>
          </h2>
          <p class="text-xl text-gray-600">Simple tools that make a real difference</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8">
          <!-- Feature 1 -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all group">
            <div class="w-16 h-16 bg-gradient-to-br from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <span class="text-3xl">📊</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Mood Tracking</h3>
            <p class="text-gray-600 leading-relaxed">
              Track your team's emotional wellbeing with simple, daily check-ins. 
              Identify trends and take action before issues escalate.
            </p>
          </div>

          <!-- Feature 2 -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all group">
            <div class="w-16 h-16 bg-gradient-to-br from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <span class="text-3xl">🔒</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Anonymous & Safe</h3>
            <p class="text-gray-600 leading-relaxed">
              Complete privacy with anonymous posting. Your team can share 
              openly without fear of judgment or repercussions.
            </p>
          </div>

          <!-- Feature 3 -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all group">
            <div class="w-16 h-16 bg-gradient-to-br from-green-500 to-green-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <span class="text-3xl">💬</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Peer Support</h3>
            <p class="text-gray-600 leading-relaxed">
              Connect with colleagues who understand. Share experiences, 
              offer support, and build a stronger team culture.
            </p>
          </div>

          <!-- Feature 4 -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all group">
            <div class="w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <span class="text-3xl">📈</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Manager Insights</h3>
            <p class="text-gray-600 leading-relaxed">
              Get actionable analytics on team wellness. Identify patterns, 
              measure impact, and make data-driven decisions.
            </p>
          </div>

          <!-- Feature 5 -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all group">
            <div class="w-16 h-16 bg-gradient-to-br from-pink-500 to-pink-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <span class="text-3xl">🏷️</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Smart Tags</h3>
            <p class="text-gray-600 leading-relaxed">
              Categorize moods with tags like workload, team spirit, and 
              work-life balance for deeper insights.
            </p>
          </div>

          <!-- Feature 6 -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all group">
            <div class="w-16 h-16 bg-gradient-to-br from-violet-500 to-violet-600 rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform shadow-lg">
              <span class="text-3xl">⚡</span>
            </div>
            <h3 class="text-2xl font-bold text-gray-900 mb-4">Real-time Feed</h3>
            <p class="text-gray-600 leading-relaxed">
              Stay connected with your team's pulse. See recent moods, 
              react with empathy, and start conversations.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Benefits Section -->
    <section id="benefits" class="py-24 px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16 items-center">
          <!-- Image/Visual -->
          <div class="relative">
            <div class="bg-gradient-to-br from-violet-100 to-purple-100 rounded-3xl p-12 shadow-2xl">
              <div class="space-y-4">
                <div class="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-lg">
                  <div class="w-12 h-12 bg-gradient-to-br from-green-400 to-green-500 rounded-xl flex items-center justify-center">
                    <span class="text-2xl">😄</span>
                  </div>
                  <div class="flex-1">
                    <div class="h-2 bg-green-200 rounded-full overflow-hidden">
                      <div class="h-full w-4/5 bg-gradient-to-r from-green-400 to-green-500 rounded-full"></div>
                    </div>
                  </div>
                  <span class="font-bold text-gray-900">80%</span>
                </div>

                <div class="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-lg">
                  <div class="w-12 h-12 bg-gradient-to-br from-blue-400 to-blue-500 rounded-xl flex items-center justify-center">
                    <span class="text-2xl">😊</span>
                  </div>
                  <div class="flex-1">
                    <div class="h-2 bg-blue-200 rounded-full overflow-hidden">
                      <div class="h-full w-3/5 bg-gradient-to-r from-blue-400 to-blue-500 rounded-full"></div>
                    </div>
                  </div>
                  <span class="font-bold text-gray-900">60%</span>
                </div>

                <div class="flex items-center gap-4 bg-white rounded-2xl p-4 shadow-lg">
                  <div class="w-12 h-12 bg-gradient-to-br from-purple-400 to-purple-500 rounded-xl flex items-center justify-center">
                    <span class="text-2xl">😐</span>
                  </div>
                  <div class="flex-1">
                    <div class="h-2 bg-purple-200 rounded-full overflow-hidden">
                      <div class="h-full w-2/5 bg-gradient-to-r from-purple-400 to-purple-500 rounded-full"></div>
                    </div>
                  </div>
                  <span class="font-bold text-gray-900">40%</span>
                </div>
              </div>
            </div>
          </div>

          <!-- Content -->
          <div class="space-y-8">
            <h2 class="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              Why companies choose
              <span class="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
                MoodFlow
              </span>
            </h2>

            <div class="space-y-6">
              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-green-100 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Reduce Burnout</h3>
                  <p class="text-gray-600">Identify warning signs early and take proactive steps to support your team.</p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-blue-100 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Improve Retention</h3>
                  <p class="text-gray-600">Employees who feel heard and supported are more likely to stay.</p>
                </div>
              </div>

              <div class="flex gap-4">
                <div class="flex-shrink-0 w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                  </svg>
                </div>
                <div>
                  <h3 class="text-xl font-bold text-gray-900 mb-2">Boost Productivity</h3>
                  <p class="text-gray-600">Happy teams are productive teams. Create a culture of wellness and watch performance soar.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Pricing Section -->
    <section id="pricing" class="py-24 px-6 bg-gradient-to-b from-gray-50 to-white">
      <div class="max-w-7xl mx-auto">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Simple, transparent
            <span class="bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              pricing
            </span>
          </h2>
          <p class="text-xl text-gray-600">Choose the plan that fits your team size</p>
        </div>

        <div class="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <!-- Starter -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Starter</h3>
            <p class="text-gray-600 mb-6">For small teams</p>
            <div class="mb-6">
              <span class="text-5xl font-bold text-gray-900">$49</span>
              <span class="text-gray-600">/month</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Up to 50 users</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Anonymous mood tracking</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Basic analytics</span>
              </li>
            </ul>
            <button class="w-full px-6 py-3 border-2 border-gray-200 text-gray-900 font-bold rounded-2xl hover:border-purple-300 transition-all">
              Get Started
            </button>
          </div>

          <!-- Pro (Featured) -->
          <div class="bg-gradient-to-br from-violet-500 to-purple-500 rounded-3xl p-8 shadow-2xl transform scale-105 relative">
            <div class="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-amber-400 text-amber-900 font-bold text-sm rounded-full">
              POPULAR
            </div>
            <h3 class="text-2xl font-bold text-white mb-2">Pro</h3>
            <p class="text-purple-100 mb-6">For growing teams</p>
            <div class="mb-6">
              <span class="text-5xl font-bold text-white">$149</span>
              <span class="text-purple-100">/month</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-white">Up to 200 users</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-white">All Starter features</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-white">Advanced analytics</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-white">Priority support</span>
              </li>
            </ul>
            <button class="w-full px-6 py-3 bg-white text-purple-600 font-bold rounded-2xl hover:shadow-xl transition-all">
              Get Started
            </button>
          </div>

          <!-- Enterprise -->
          <div class="bg-white rounded-3xl p-8 shadow-lg hover:shadow-xl transition-all">
            <h3 class="text-2xl font-bold text-gray-900 mb-2">Enterprise</h3>
            <p class="text-gray-600 mb-6">For large organizations</p>
            <div class="mb-6">
              <span class="text-5xl font-bold text-gray-900">Custom</span>
            </div>
            <ul class="space-y-3 mb-8">
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Unlimited users</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">All Pro features</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Custom integrations</span>
              </li>
              <li class="flex items-center gap-3">
                <svg class="w-5 h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                </svg>
                <span class="text-gray-700">Dedicated support</span>
              </li>
            </ul>
            <button 
              @click="scrollToContact"
              class="w-full px-6 py-3 border-2 border-gray-200 text-gray-900 font-bold rounded-2xl hover:border-purple-300 transition-all"
            >
              Contact Sales
            </button>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-24 px-6 bg-gradient-to-br from-violet-500 to-purple-500 relative overflow-hidden">
      <div class="absolute inset-0 opacity-10">
        <div class="absolute top-0 left-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        <div class="absolute bottom-0 right-1/4 w-96 h-96 bg-white rounded-full blur-3xl"></div>
      </div>
      
      <div class="max-w-4xl mx-auto text-center relative z-10">
        <h2 class="text-4xl md:text-5xl font-bold text-white mb-6">
          Ready to transform your workplace?
        </h2>
        <p class="text-xl text-purple-100 mb-8">
          Join hundreds of companies creating happier, healthier teams with MoodFlow
        </p>
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            @click="goToRegister"
            class="px-8 py-4 bg-white text-purple-600 font-bold rounded-2xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 text-lg"
          >
            Start Free Trial
          </button>
          <button 
            @click="scrollToContact"
            class="px-8 py-4 bg-purple-600 text-white font-bold rounded-2xl border-2 border-white/30 hover:bg-purple-700 transition-all text-lg"
          >
            Schedule Demo
          </button>
        </div>
      </div>
    </section>

    <!-- Contact Section -->
    <section id="contact" class="py-24 px-6 bg-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-2 gap-16">
          <!-- Contact info -->
          <div class="space-y-8">
            <div>
              <h2 class="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
                Get in touch
              </h2>
              <p class="text-xl text-gray-600">
                Have questions? We'd love to hear from you.
              </p>
            </div>

            <div class="space-y-6">
              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-gray-900 mb-1">Email</p>
                  <a href="mailto:hello@moodflow.app" class="text-purple-600 hover:text-purple-700">
                    hello@moodflow.app
                  </a>
                </div>
              </div>

              <div class="flex items-start gap-4">
                <div class="w-12 h-12 bg-purple-100 rounded-2xl flex items-center justify-center flex-shrink-0">
                  <svg class="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"></path>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                  </svg>
                </div>
                <div>
                  <p class="font-bold text-gray-900 mb-1">Location</p>
                  <p class="text-gray-600">Paris, France</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Contact form -->
          <div class="bg-gray-50 rounded-3xl p-8">
            <form @submit.prevent="handleContact" class="space-y-6">
              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-2">Name</label>
                <input 
                  v-model="contactForm.name"
                  type="text" 
                  required
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-2">Email</label>
                <input 
                  v-model="contactForm.email"
                  type="email" 
                  required
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                  placeholder="your@email.com"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-2">Company</label>
                <input 
                  v-model="contactForm.company"
                  type="text" 
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition"
                  placeholder="Your company"
                />
              </div>

              <div>
                <label class="block text-sm font-semibold text-gray-900 mb-2">Message</label>
                <textarea 
                  v-model="contactForm.message"
                  rows="4" 
                  required
                  class="w-full px-4 py-3 bg-white border border-gray-200 rounded-2xl focus:outline-none focus:ring-2 focus:ring-purple-400 transition resize-none"
                  placeholder="Tell us about your needs"
                ></textarea>
              </div>

              <button 
                type="submit"
                class="w-full px-6 py-4 bg-gradient-to-r from-violet-500 to-purple-500 text-white font-bold rounded-2xl shadow-lg hover:shadow-xl transition-all hover:scale-105"
              >
                Send Message
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="py-12 px-6 bg-gray-900 text-white">
      <div class="max-w-7xl mx-auto">
        <div class="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div class="flex items-center gap-3 mb-4">
              <div class="w-10 h-10 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center">
                <span class="text-white font-bold text-lg">M</span>
              </div>
              <span class="text-xl font-bold">MoodFlow</span>
            </div>
            <p class="text-gray-400">
              Making workplaces happier, one mood at a time.
            </p>
          </div>

          <div>
            <h4 class="font-bold mb-4">Product</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#features" class="hover:text-white transition">Features</a></li>
              <li><a href="#pricing" class="hover:text-white transition">Pricing</a></li>
              <li><a href="#" class="hover:text-white transition">Security</a></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-4">Company</h4>
            <ul class="space-y-2 text-gray-400">
              <li><router-link to="/about" class="hover:text-white transition">About</router-link></li>
              <li><router-link to="/contact" class="hover:text-white transition">Contact</router-link></li>
              <li><router-link to="/privacy" class="hover:text-white transition">Privacy</router-link></li>
            </ul>
          </div>

          <div>
            <h4 class="font-bold mb-4">Resources</h4>
            <ul class="space-y-2 text-gray-400">
              <li><a href="#" class="hover:text-white transition">Blog</a></li>
              <li><a href="#" class="hover:text-white transition">Help Center</a></li>
              <li><a href="#" class="hover:text-white transition">API Docs</a></li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p class="text-gray-400 text-sm">
            © 2025 MoodFlow. All rights reserved.
          </p>
          <div class="flex gap-6">
            <a href="#" class="text-gray-400 hover:text-white transition">Twitter</a>
            <a href="#" class="text-gray-400 hover:text-white transition">LinkedIn</a>
            <a href="#" class="text-gray-400 hover:text-white transition">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter();

const contactForm = ref({
  name: '',
  email: '',
  company: '',
  message: ''
});

function goToRegister() {
  router.push('/register');
}

function goToLogin() {
  router.push('/login');
}

function scrollToFeatures() {
  document.getElementById('features')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToDemo() {
  // Implement demo scroll/modal
  document.getElementById('benefits')?.scrollIntoView({ behavior: 'smooth' });
}

function scrollToContact() {
  document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' });
}

function handleContact() {
  alert('Thank you for your message! We\'ll get back to you soon.');
  contactForm.value = {
    name: '',
    email: '',
    company: '',
    message: ''
  };
}
</script>

<style scoped>
html {
  scroll-behavior: smooth;
}
</style>
