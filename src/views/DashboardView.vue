<template>
  <div class="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-pink-50 py-8">
    <div class="max-w-7xl mx-auto px-4 sm:px-6">
      <!-- Header premium -->
      <div class="mb-8">
        <div class="flex items-center gap-4 mb-3">
          <div class="w-14 h-14 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
            <span class="text-3xl">📊</span>
          </div>
          <div>
            <h1 class="text-3xl font-bold bg-gradient-to-r from-violet-600 to-purple-600 bg-clip-text text-transparent">
              Wellness Analytics
            </h1>
            <p class="text-gray-600">Team wellness insights and trends</p>
          </div>
        </div>
      </div>

      <div v-if="!isManager" class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 p-8 text-center">
        <div class="text-6xl mb-4">🔒</div>
        <p class="text-gray-700 text-lg font-medium">Manager permissions required to view this dashboard</p>
      </div>

      <template v-else>
        <!-- Cards de statistiques modernes -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <!-- Total Participants -->
          <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg shadow-purple-100/50 p-6 hover:shadow-xl transition-all group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Total Team</h3>
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-100 to-blue-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-2xl">👥</span>
              </div>
            </div>
            <p class="text-4xl font-bold bg-gradient-to-r from-blue-600 to-blue-500 bg-clip-text text-transparent mb-2">
              {{ stats.totalParticipants }}
            </p>
            <p class="text-sm text-gray-600">Active participants</p>
          </div>

          <!-- Total Posts -->
          <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg shadow-purple-100/50 p-6 hover:shadow-xl transition-all group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Activity</h3>
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-2xl">💬</span>
              </div>
            </div>
            <p class="text-4xl font-bold bg-gradient-to-r from-green-600 to-green-500 bg-clip-text text-transparent mb-2">
              {{ stats.totalPosts }}
            </p>
            <p class="text-sm text-gray-600">Posts last 30 days</p>
          </div>

          <!-- Average Mood -->
          <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg shadow-purple-100/50 p-6 hover:shadow-xl transition-all group">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-semibold text-gray-600 uppercase tracking-wide">Team Mood</h3>
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-amber-100 to-amber-200 flex items-center justify-center group-hover:scale-110 transition-transform">
                <span class="text-2xl">{{ getAverageMoodEmoji() }}</span>
              </div>
            </div>
            <p class="text-4xl font-bold bg-gradient-to-r from-amber-600 to-amber-500 bg-clip-text text-transparent mb-2">
              {{ stats.averageMood.toFixed(1) }}/5
            </p>
            <div class="flex items-center text-sm">
              <span :class="[
                'font-semibold',
                stats.weeklyChange >= 0 ? 'text-green-600' : 'text-red-600'
              ]">
                {{ stats.weeklyChange >= 0 ? '↑' : '↓' }} {{ Math.abs(stats.weeklyChange).toFixed(1) }}%
              </span>
              <span class="text-gray-600 ml-2">vs last week</span>
            </div>
          </div>
        </div>
        
        <!-- Secondary stats -->
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <!-- Participation Rate -->
          <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg shadow-purple-100/50 p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-900">Participation Rate</h3>
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-purple-100 to-purple-200 flex items-center justify-center">
                <span class="text-2xl">📈</span>
              </div>
            </div>
            <div class="mb-4">
              <p class="text-3xl font-bold bg-gradient-to-r from-purple-600 to-purple-500 bg-clip-text text-transparent">
                {{ stats.participationRate.toFixed(0) }}%
              </p>
              <p class="text-sm text-gray-600 mt-1">Active this week</p>
            </div>
            <!-- Progress bar -->
            <div class="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                class="h-full bg-gradient-to-r from-violet-500 to-purple-500 rounded-full transition-all duration-500"
                :style="{ width: stats.participationRate + '%' }"
              ></div>
            </div>
          </div>
          
          <!-- Top Tags -->
          <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg shadow-purple-100/50 p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-lg font-bold text-gray-900">Top Topics</h3>
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-pink-100 to-pink-200 flex items-center justify-center">
                <span class="text-2xl">🏷️</span>
              </div>
            </div>
            <div class="flex flex-wrap gap-2">
              <span class="px-4 py-2 bg-gradient-to-r from-blue-100 to-blue-200 text-blue-800 rounded-full text-sm font-semibold">
                💼 Workload
              </span>
              <span class="px-4 py-2 bg-gradient-to-r from-green-100 to-green-200 text-green-800 rounded-full text-sm font-semibold">
                👥 Team
              </span>
              <span class="px-4 py-2 bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800 rounded-full text-sm font-semibold">
                ⚖️ Balance
              </span>
              <span class="px-4 py-2 bg-gradient-to-r from-purple-100 to-purple-200 text-purple-800 rounded-full text-sm font-semibold">
                👔 Leadership
              </span>
              <span class="px-4 py-2 bg-gradient-to-r from-pink-100 to-pink-200 text-pink-800 rounded-full text-sm font-semibold">
                🏢 Environment
              </span>
            </div>
          </div>
        </div>

        <!-- Charts section -->
        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <!-- Mood Distribution -->
          <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg shadow-purple-100/50 p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                <span class="text-xl">📊</span>
              </div>
              <h2 class="text-xl font-bold text-gray-900">Mood Distribution</h2>
            </div>
            <canvas ref="moodChartCanvas"></canvas>
          </div>

          <!-- Trend Chart -->
          <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg shadow-purple-100/50 p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                <span class="text-xl">📈</span>
              </div>
              <h2 class="text-xl font-bold text-gray-900">7-Day Trend</h2>
            </div>
            <canvas ref="trendChartCanvas"></canvas>
          </div>
        </div>

        <!-- Department Analytics Table -->
        <div class="bg-white/60 backdrop-blur-xl rounded-3xl border border-white/40 shadow-lg shadow-purple-100/50 overflow-hidden">
          <div class="p-8">
            <div class="flex items-center gap-3 mb-6">
              <div class="w-12 h-12 rounded-2xl bg-gradient-to-br from-violet-500 to-purple-500 flex items-center justify-center shadow-lg">
                <span class="text-xl">🏢</span>
              </div>
              <h2 class="text-xl font-bold text-gray-900">Department Breakdown</h2>
            </div>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b-2 border-purple-100">
                    <th class="text-left py-4 px-4 font-bold text-gray-700">Department</th>
                    <th class="text-left py-4 px-4 font-bold text-gray-700">Team Size</th>
                    <th class="text-left py-4 px-4 font-bold text-gray-700">Avg Mood</th>
                    <th class="text-left py-4 px-4 font-bold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="service in services"
                    :key="service.id"
                    class="border-b border-purple-50 hover:bg-purple-50/30 transition"
                  >
                    <td class="py-4 px-4 font-semibold text-gray-900">{{ service.name }}</td>
                    <td class="py-4 px-4 text-gray-700">
                      <span class="px-3 py-1 bg-purple-100/50 rounded-lg font-medium">
                        {{ service.participant_count }} people
                      </span>
                    </td>
                    <td class="py-4 px-4">
                      <div class="flex items-center gap-3">
                        <span class="text-3xl">{{ getServiceMoodEmoji(service.mood_average) }}</span>
                        <span class="text-lg font-bold text-gray-900">{{ service.mood_average.toFixed(1) }}/5</span>
                      </div>
                    </td>
                    <td class="py-4 px-4">
                      <span
                        :class="[
                          'inline-flex items-center px-4 py-2 rounded-2xl text-sm font-semibold shadow-sm',
                          service.mood_average >= 4 
                            ? 'bg-gradient-to-r from-green-100 to-green-200 text-green-800' :
                          service.mood_average >= 3 
                            ? 'bg-gradient-to-r from-amber-100 to-amber-200 text-amber-800' :
                          'bg-gradient-to-r from-red-100 to-red-200 text-red-800'
                        ]"
                      >
                        {{ service.mood_average >= 4 ? '✨ Excellent' : service.mood_average >= 3 ? '👍 Good' : '⚠️ Needs Support' }}
                      </span>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, nextTick } from 'vue';
import { Chart, registerables } from 'chart.js';
import { supabase } from '../lib/supabase';
import { isManager } from '../lib/auth';
import type { Database } from '../lib/database.types';

Chart.register(...registerables);

type Service = Database['public']['Tables']['services']['Row'];

const services = ref<Service[]>([]);
const stats = ref({
  totalParticipants: 0,
  totalPosts: 0,
  averageMood: 0,
  participationRate: 0,
  weeklyChange: 0,
});

const moodChartCanvas = ref<HTMLCanvasElement | null>(null);
const trendChartCanvas = ref<HTMLCanvasElement | null>(null);

function getAverageMoodEmoji(): string {
  const avg = stats.value.averageMood;
  if (avg >= 4.5) return '😄';
  if (avg >= 3.5) return '😊';
  if (avg >= 2.5) return '😐';
  if (avg >= 1.5) return '😟';
  return '😢';
}

function getServiceMoodEmoji(mood: number): string {
  if (mood >= 4.5) return '😄';
  if (mood >= 3.5) return '😊';
  if (mood >= 2.5) return '😐';
  if (mood >= 1.5) return '😟';
  return '😢';
}

async function loadData() {
  const { data: servicesData } = await supabase
    .from('services')
    .select('*')
    .order('mood_average', { ascending: false });

  if (servicesData) {
    services.value = servicesData;
  }

  const { count: postsCount } = await supabase
    .from('posts')
    .select('*', { count: 'exact', head: true })
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  const { data: moodsData } = await supabase
    .from('posts')
    .select('mood')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  const { data: participantsData } = await supabase
    .from('profiles')
    .select('id');

  stats.value.totalPosts = postsCount || 0;
  stats.value.totalParticipants = participantsData?.length || 0;

  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const { data: activeUsers } = await supabase
    .from('posts')
    .select('user_id')
    .gte('created_at', oneWeekAgo.toISOString())
    .order('user_id');

  if (activeUsers && participantsData) {
    const uniqueActiveUsers = new Set(activeUsers.map(user => user.user_id)).size;
    stats.value.participationRate = (uniqueActiveUsers / participantsData.length) * 100;
  }

  const twoWeeksAgo = new Date();
  twoWeeksAgo.setDate(twoWeeksAgo.getDate() - 14);
  
  const { data: lastWeekMoods } = await supabase
    .from('posts')
    .select('mood')
    .gte('created_at', oneWeekAgo.toISOString());
    
  const { data: previousWeekMoods } = await supabase
    .from('posts')
    .select('mood')
    .gte('created_at', twoWeeksAgo.toISOString())
    .lt('created_at', oneWeekAgo.toISOString());

  if (moodsData && moodsData.length > 0) {
    const moodScores = moodsData.map((p: any) => {
      switch (p.mood) {
        case 'very_happy': return 5;
        case 'happy': return 4;
        case 'neutral': return 3;
        case 'sad': return 2;
        case 'very_sad': return 1;
        default: return 3;
      }
    });
    stats.value.averageMood = moodScores.reduce((a, b) => a + b, 0) / moodScores.length;
    
    if (lastWeekMoods && previousWeekMoods && previousWeekMoods.length > 0) {
      const lastWeekScores = lastWeekMoods.map((p: any) => {
        switch (p.mood) {
          case 'very_happy': return 5;
          case 'happy': return 4;
          case 'neutral': return 3;
          case 'sad': return 2;
          case 'very_sad': return 1;
          default: return 3;
        }
      });
      
      const previousWeekScores = previousWeekMoods.map((p: any) => {
        switch (p.mood) {
          case 'very_happy': return 5;
          case 'happy': return 4;
          case 'neutral': return 3;
          case 'sad': return 2;
          case 'very_sad': return 1;
          default: return 3;
        }
      });
      
      const lastWeekAvg = lastWeekScores.reduce((a, b) => a + b, 0) / lastWeekScores.length;
      const previousWeekAvg = previousWeekScores.reduce((a, b) => a + b, 0) / previousWeekScores.length;
      
      if (previousWeekAvg > 0) {
        stats.value.weeklyChange = ((lastWeekAvg - previousWeekAvg) / previousWeekAvg) * 100;
      }
    }
  }

  await nextTick();
  await createMoodChart(moodsData || []);
  await createTrendChart();
}

async function createMoodChart(moodsData: any[]) {
  if (!moodChartCanvas.value) return;

  const moodCounts = {
    very_happy: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    very_sad: 0,
  };

  moodsData.forEach(p => {
    if (p.mood in moodCounts) {
      moodCounts[p.mood as keyof typeof moodCounts]++;
    }
  });

  new Chart(moodChartCanvas.value, {
    type: 'doughnut',
    data: {
      labels: ['😄 Great', '😊 Good', '😐 Okay', '😟 Bad', '😢 Awful'],
      datasets: [{
        data: [
          moodCounts.very_happy,
          moodCounts.happy,
          moodCounts.neutral,
          moodCounts.sad,
          moodCounts.very_sad,
        ],
        backgroundColor: [
          '#10b981',
          '#3b82f6',
          '#f59e0b',
          '#f97316',
          '#ef4444',
        ],
        borderWidth: 0,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            padding: 15,
            font: {
              size: 13,
              weight: '600'
            }
          }
        },
      },
    },
  });
}

async function createTrendChart() {
  if (!trendChartCanvas.value) return;

  const days = 7;
  const labels = [];
  const data = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    labels.push(date.toLocaleDateString('en-US', { weekday: 'short' }));

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data: dayMoods } = await supabase
      .from('posts')
      .select('mood')
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString());

    if (dayMoods && dayMoods.length > 0) {
      const moodScores = dayMoods.map((p: any) => {
        switch (p.mood) {
          case 'very_happy': return 5;
          case 'happy': return 4;
          case 'neutral': return 3;
          case 'sad': return 2;
          case 'very_sad': return 1;
          default: return 3;
        }
      });
      data.push(moodScores.reduce((a, b) => a + b, 0) / moodScores.length);
    } else {
      data.push(0);
    }
  }

  new Chart(trendChartCanvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Average Mood',
        data,
        borderColor: '#8b5cf6',
        backgroundColor: 'rgba(139, 92, 246, 0.1)',
        tension: 0.4,
        fill: true,
        borderWidth: 3,
        pointBackgroundColor: '#8b5cf6',
        pointBorderColor: '#fff',
        pointBorderWidth: 2,
        pointRadius: 5,
        pointHoverRadius: 7,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1,
            font: {
              weight: '600'
            }
          },
          grid: {
            color: 'rgba(139, 92, 246, 0.1)'
          }
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            font: {
              weight: '600'
            }
          }
        }
      },
      plugins: {
        legend: {
          display: false,
        },
      },
    },
  });
}

onMounted(async () => {
  if (isManager.value) {
    await supabase.rpc('update_service_analytics');
    await nextTick();
    await loadData();
  }
});
</script>
