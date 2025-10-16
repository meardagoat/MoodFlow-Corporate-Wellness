<template>
  <div class="min-h-screen gradient-bg-calm">
    <div class="max-w-7xl mx-auto px-4 py-6 sm:py-8">
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Manager Dashboard</h1>
        <p class="text-gray-600">Team wellness analytics and insights</p>
      </div>

      <div v-if="!isManager" class="bg-yellow-50 border border-yellow-200 rounded-xl p-6 mb-8">
        <p class="text-yellow-800">You need manager permissions to view this dashboard.</p>
      </div>

      <template v-else>
        <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-600">Total Participants</h3>
              <div class="text-2xl">👥</div>
            </div>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalParticipants }}</p>
            <p class="text-sm text-gray-500 mt-2">Across all departments</p>
          </div>

          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-600">Total Posts</h3>
              <div class="text-2xl">💬</div>
            </div>
            <p class="text-3xl font-bold text-gray-900">{{ stats.totalPosts }}</p>
            <p class="text-sm text-gray-500 mt-2">Last 30 days</p>
          </div>

          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-600">Average Mood</h3>
              <div class="text-2xl">{{ getAverageMoodEmoji() }}</div>
            </div>
            <p class="text-3xl font-bold text-gray-900">{{ stats.averageMood.toFixed(1) }}/5</p>
            <div class="flex items-center text-sm mt-2">
              <span :class="[stats.weeklyChange >= 0 ? 'text-green-600' : 'text-red-600']">
                {{ stats.weeklyChange >= 0 ? '↑' : '↓' }} {{ Math.abs(stats.weeklyChange).toFixed(1) }}%
              </span>
              <span class="text-gray-500 ml-2">vs last week</span>
            </div>
          </div>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-600">Participation Rate</h3>
              <div class="text-2xl">📊</div>
            </div>
            <p class="text-3xl font-bold text-gray-900">{{ stats.participationRate.toFixed(0) }}%</p>
            <p class="text-sm text-gray-500 mt-2">Active participants this week</p>
          </div>
          
          <div class="bg-white rounded-xl shadow p-6">
            <div class="flex items-center justify-between mb-4">
              <h3 class="text-sm font-medium text-gray-600">Mood Tags</h3>
              <div class="text-2xl">🏷️</div>
            </div>
            <div class="flex flex-wrap gap-2 mt-2">
              <span class="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">Workload</span>
              <span class="px-3 py-1 bg-green-100 text-green-800 rounded-full text-xs font-medium">Team Spirit</span>
              <span class="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-xs font-medium">Work-Life</span>
              <span class="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-xs font-medium">Management</span>
              <span class="px-3 py-1 bg-pink-100 text-pink-800 rounded-full text-xs font-medium">Environment</span>
            </div>
          </div>
        </div>

        <div class="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <div class="bg-white rounded-xl shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Mood Distribution</h2>
            <canvas ref="moodChartCanvas"></canvas>
          </div>

          <div class="bg-white rounded-xl shadow p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Mood Trend (7 Days)</h2>
            <canvas ref="trendChartCanvas"></canvas>
          </div>
        </div>

        <div class="bg-white rounded-xl shadow overflow-hidden">
          <div class="p-6">
            <h2 class="text-xl font-semibold text-gray-900 mb-6">Department Analytics</h2>
            <div class="overflow-x-auto">
              <table class="w-full">
                <thead>
                  <tr class="border-b border-gray-200">
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Department</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Participants</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Average Mood</th>
                    <th class="text-left py-3 px-4 font-semibold text-gray-700">Status</th>
                  </tr>
                </thead>
                <tbody>
                  <tr
                    v-for="service in services"
                    :key="service.id"
                    class="border-b border-gray-100 hover:bg-gray-50 transition"
                  >
                    <td class="py-4 px-4 font-medium text-gray-900">{{ service.name }}</td>
                    <td class="py-4 px-4 text-gray-700">{{ service.participant_count }}</td>
                    <td class="py-4 px-4">
                      <div class="flex items-center gap-2">
                        <span class="text-2xl">{{ getServiceMoodEmoji(service.mood_average) }}</span>
                        <span class="text-gray-700">{{ service.mood_average.toFixed(1) }}/5</span>
                      </div>
                    </td>
                    <td class="py-4 px-4">
                      <span
                        :class="[
                          'inline-flex items-center px-3 py-1 rounded-full text-xs font-medium',
                          service.mood_average >= 4 ? 'bg-green-100 text-green-800' :
                          service.mood_average >= 3 ? 'bg-yellow-100 text-yellow-800' :
                          'bg-red-100 text-red-800'
                        ]"
                      >
                        {{ service.mood_average >= 4 ? 'Good' : service.mood_average >= 3 ? 'Fair' : 'Needs Attention' }}
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
import { ref, onMounted, computed, nextTick } from 'vue';
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

  // Calculer le taux de participation (utilisateurs actifs cette semaine)
  const oneWeekAgo = new Date();
  oneWeekAgo.setDate(oneWeekAgo.getDate() - 7);
  
  const { data: activeUsers } = await supabase
    .from('posts')
    .select('user_id')
    .gte('created_at', oneWeekAgo.toISOString())
    .order('user_id');

  if (activeUsers && participantsData) {
    // Compter les utilisateurs uniques
    const uniqueActiveUsers = new Set(activeUsers.map(user => user.user_id)).size;
    stats.value.participationRate = (uniqueActiveUsers / participantsData.length) * 100;
  }

  // Calculer la variation hebdomadaire de l'humeur moyenne
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
    
    // Calculer la variation hebdomadaire
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

  // Attendre que les canvas soient rendus avant de créer les graphiques
  await nextTick();
  await createMoodChart(moodsData || []);
  await createTrendChart();
}

async function createMoodChart(moodsData: any[]) {
  if (!moodChartCanvas.value) {
    console.warn('Mood chart canvas not found');
    return;
  }

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
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
        },
      },
    },
  });
}

async function createTrendChart() {
  if (!trendChartCanvas.value) {
    console.warn('Trend chart canvas not found');
    return;
  }

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
        borderColor: '#0ea5e9',
        backgroundColor: 'rgba(14, 165, 233, 0.1)',
        tension: 0.4,
        fill: true,
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
          },
        },
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
    // Attendre que le DOM soit complètement rendu
    await nextTick();
    await loadData();
  }
});
</script>
