<template>
  <div class="min-h-screen py-6 sm:py-10">
    <div class="mx-auto max-w-7xl px-4 sm:px-6">
      <!-- En-tête -->
      <header class="mb-10 flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="label flex items-center gap-2 text-ink/55">
            <Icon name="chart" class="h-3.5 w-3.5" />
            Team wellness insights and trends
          </p>
          <h1 class="display mt-4 text-display-md">Wellness Analytics</h1>
        </div>
      </header>

      <div v-if="!isManager" class="grid place-items-center rounded-[2rem] bg-paper-deep/70 px-6 py-20 text-center">
        <span class="grid h-16 w-16 place-items-center rounded-full bg-ink text-paper">
          <Icon name="lock" class="h-7 w-7" />
        </span>
        <p class="mt-6 max-w-sm text-lg font-medium">Manager permissions required to view this dashboard</p>
      </div>

      <template v-else>
        <!-- Indicateurs clés -->
        <div class="grid grid-cols-1 gap-3 md:grid-cols-3">
          <!-- Total Participants -->
          <section class="flex min-h-[12rem] flex-col rounded-[2rem] bg-sun p-6">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-semibold">Total Team</h2>
              <Icon name="users" class="h-5 w-5" />
            </div>
            <p class="display mt-auto text-6xl leading-none tracking-[-0.05em]">{{ stats.totalParticipants }}</p>
            <p class="mt-2 text-sm text-ink/70">Active participants</p>
          </section>

          <!-- Total Posts -->
          <section class="flex min-h-[12rem] flex-col rounded-[2rem] bg-aqua p-6">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-semibold">Activity</h2>
              <Icon name="message" class="h-5 w-5" />
            </div>
            <p class="display mt-auto text-6xl leading-none tracking-[-0.05em]">{{ stats.totalPosts }}</p>
            <p class="mt-2 text-sm text-ink/70">Posts last 30 days</p>
          </section>

          <!-- Average Mood -->
          <section class="flex min-h-[12rem] flex-col rounded-[2rem] bg-ink p-6 text-paper">
            <div class="flex items-center justify-between">
              <h2 class="text-sm font-semibold">Team Mood</h2>
              <MoodFace :mood="averageMood" class="h-10 w-10" :label="`Team Mood ${stats.averageMood.toFixed(1)}/5`" />
            </div>
            <p class="display mt-auto text-6xl leading-none tracking-[-0.05em]">
              {{ stats.averageMood.toFixed(1) }}<span class="text-2xl text-paper/50">/5</span>
            </p>
            <p class="mt-2 flex items-center gap-2 text-sm">
              <span
                :class="[
                  'inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-semibold',
                  stats.weeklyChange >= 0 ? 'bg-[#D9F5E4] text-[#14532D]' : 'bg-coral/25 text-paper'
                ]"
              >
                <Icon :name="stats.weeklyChange >= 0 ? 'arrow-up' : 'arrow-down'" class="h-3.5 w-3.5" stroke-width="2.25" />
                {{ Math.abs(stats.weeklyChange).toFixed(1) }}%
              </span>
              <span class="text-paper/65">vs last week</span>
            </p>
          </section>
        </div>

        <!-- Indicateurs secondaires -->
        <div class="mt-3 grid grid-cols-1 gap-3 md:grid-cols-2">
          <!-- Participation Rate -->
          <section class="rounded-[2rem] border border-ink/10 bg-white p-6">
            <div class="flex items-center justify-between">
              <h2 class="font-display text-xl font-bold tracking-[-0.025em]">Participation Rate</h2>
              <Icon name="trending" class="h-5 w-5 text-ink/50" />
            </div>
            <div class="mt-5 flex items-end justify-between gap-4">
              <p class="display text-5xl leading-none tracking-[-0.05em]">{{ stats.participationRate.toFixed(0) }}%</p>
              <p class="text-sm text-ink/60">Active this week</p>
            </div>
            <!-- Jauge : piste d'un ton plus clair de la même teinte -->
            <div
              class="mt-5 h-3 w-full overflow-hidden rounded-full bg-[#E6DDFF]"
              role="meter"
              :aria-valuenow="Math.round(stats.participationRate)"
              aria-valuemin="0"
              aria-valuemax="100"
              aria-label="Participation Rate"
            >
              <div
                class="h-full rounded-full bg-[#6B3BE0] transition-[width] duration-700 ease-out-expo"
                :style="{ width: Math.min(stats.participationRate, 100) + '%' }"
              ></div>
            </div>
          </section>

          <!-- Top Tags -->
          <section class="rounded-[2rem] border border-ink/10 bg-white p-6">
            <div class="flex items-center justify-between">
              <h2 class="font-display text-xl font-bold tracking-[-0.025em]">Top Topics</h2>
              <Icon name="tag" class="h-5 w-5 text-ink/50" />
            </div>
            <div class="mt-5 flex flex-wrap gap-2">
              <span class="tag px-3.5 py-2 text-sm">💼 Workload</span>
              <span class="tag px-3.5 py-2 text-sm">👥 Team</span>
              <span class="tag px-3.5 py-2 text-sm">⚖️ Balance</span>
              <span class="tag px-3.5 py-2 text-sm">👔 Leadership</span>
              <span class="tag px-3.5 py-2 text-sm">🏢 Environment</span>
            </div>
          </section>
        </div>

        <!-- Graphiques -->
        <div class="mt-3 grid grid-cols-1 gap-3 lg:grid-cols-2">
          <!-- Mood Distribution : barre empilée 100 % + tableau des valeurs -->
          <figure class="rounded-[2rem] border border-ink/10 bg-white p-6 sm:p-8">
            <figcaption class="flex items-center justify-between">
              <h2 class="font-display text-xl font-bold tracking-[-0.025em]">Mood Distribution</h2>
              <Icon name="pie" class="h-5 w-5 text-ink/50" />
            </figcaption>

            <div class="relative mt-8">
              <div class="flex h-11 w-full gap-[2px] overflow-hidden rounded-full bg-white" :class="moodTotal === 0 ? 'bg-ink/[0.06]' : ''">
                <template v-for="segment in moodSegments" :key="segment.value">
                  <div
                    v-if="segment.count > 0"
                    class="relative h-full min-w-[4px] outline-none transition-opacity duration-300 focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                    :class="hoveredMood && hoveredMood !== segment.value ? 'opacity-35' : 'opacity-100'"
                    :style="{ flexGrow: segment.count, backgroundColor: segment.color }"
                    tabindex="0"
                    :aria-label="`${segment.label}: ${segment.count} (${segment.percent}%)`"
                    @pointerenter="hoveredMood = segment.value"
                    @pointerleave="hoveredMood = null"
                    @focus="hoveredMood = segment.value"
                    @blur="hoveredMood = null"
                  />
                </template>
              </div>

              <!-- Info-bulle : la valeur d'abord, puis le libellé -->
              <div
                v-if="hoveredSegment"
                class="pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-xl bg-ink px-3 py-2 text-paper shadow-lg"
                role="tooltip"
              >
                <span class="text-sm font-semibold">{{ hoveredSegment.count }} · {{ hoveredSegment.percent }}%</span>
                <span class="ml-2 inline-flex items-center gap-1.5 text-xs text-paper/70">
                  <span class="inline-block h-0.5 w-3 rounded-full" :style="{ backgroundColor: hoveredSegment.color }" />
                  {{ hoveredSegment.label }}
                </span>
              </div>
            </div>

            <table class="mt-8 w-full text-sm">
              <thead class="sr-only">
                <tr>
                  <th scope="col">Mood</th>
                  <th scope="col">Posts</th>
                  <th scope="col">Share</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="segment in moodSegments"
                  :key="segment.value"
                  class="border-t border-ink/[0.07] transition-colors"
                  :class="hoveredMood === segment.value ? 'bg-paper' : ''"
                  @pointerenter="hoveredMood = segment.value"
                  @pointerleave="hoveredMood = null"
                >
                  <th scope="row" class="py-2.5 text-left font-medium">
                    <span class="flex items-center gap-3">
                      <span class="h-3 w-1.5 rounded-full" :style="{ backgroundColor: segment.color }" aria-hidden="true" />
                      <MoodFace :mood="segment.value" class="h-7 w-7" />
                      {{ segment.label }}
                    </span>
                  </th>
                  <td class="py-2.5 text-right font-semibold tabular-nums">{{ segment.count }}</td>
                  <td class="w-20 py-2.5 text-right tabular-nums text-ink/60">{{ segment.percent }}%</td>
                </tr>
              </tbody>
            </table>
          </figure>

          <!-- Trend Chart -->
          <figure class="flex flex-col rounded-[2rem] border border-ink/10 bg-white p-6 sm:p-8">
            <figcaption class="flex items-center justify-between">
              <h2 class="font-display text-xl font-bold tracking-[-0.025em]">7-Day Trend</h2>
              <Icon name="activity" class="h-5 w-5 text-ink/50" />
            </figcaption>
            <div class="relative mt-8 h-72 flex-1 lg:h-auto lg:min-h-[18rem]">
              <canvas ref="trendChartCanvas" aria-label="7-Day Trend, Average Mood" role="img"></canvas>
            </div>
          </figure>
        </div>

        <!-- Department Analytics Table -->
        <section class="mt-3 overflow-hidden rounded-[2rem] border border-ink/10 bg-white">
          <div class="flex items-center justify-between p-6 sm:p-8">
            <h2 class="font-display text-xl font-bold tracking-[-0.025em]">Department Breakdown</h2>
            <Icon name="building" class="h-5 w-5 text-ink/50" />
          </div>
          <div class="overflow-x-auto">
            <table class="w-full min-w-[40rem]">
              <thead>
                <tr class="border-y border-ink/10 bg-paper/60">
                  <th scope="col" class="label px-6 py-4 text-left text-ink/55 sm:px-8">Department</th>
                  <th scope="col" class="label px-4 py-4 text-left text-ink/55">Team Size</th>
                  <th scope="col" class="label px-4 py-4 text-left text-ink/55">Avg Mood</th>
                  <th scope="col" class="label px-4 py-4 text-left text-ink/55 sm:pr-8">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr
                  v-for="service in services"
                  :key="service.id"
                  class="border-b border-ink/[0.07] transition-colors last:border-0 hover:bg-paper/70"
                >
                  <td class="px-6 py-4 font-semibold sm:px-8">{{ service.name }}</td>
                  <td class="px-4 py-4 tabular-nums text-ink/70">
                    {{ service.participant_count }} people
                  </td>
                  <td class="px-4 py-4">
                    <div class="flex items-center gap-3">
                      <MoodFace :mood="moodFromScore(service.mood_average)" class="h-8 w-8" />
                      <span class="font-semibold tabular-nums">{{ service.mood_average.toFixed(1) }}/5</span>
                    </div>
                  </td>
                  <td class="px-4 py-4 sm:pr-8">
                    <span
                      :class="[
                        'inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-semibold',
                        service.mood_average >= 4
                          ? 'bg-[#D9F5E4] text-[#14532D]' :
                        service.mood_average >= 3
                          ? 'bg-sun/45 text-ink' :
                        'bg-coral/20 text-[#9F1239]'
                      ]"
                    >
                      {{ service.mood_average >= 4 ? '✨ Excellent' : service.mood_average >= 3 ? '👍 Good' : '⚠️ Needs Support' }}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>
      </template>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { Chart, registerables, type Plugin } from 'chart.js';
import { supabase } from '../lib/supabase';
import { isManager } from '../lib/auth';
import type { Database } from '../lib/database.types';
import MoodFace from '../components/brand/MoodFace.vue';
import Icon from '../components/ui/Icon.vue';
import { moodFromScore, type MoodValue } from '../lib/moods';

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

const trendChartCanvas = ref<HTMLCanvasElement | null>(null);
let trendChart: Chart | null = null;

const averageMood = computed(() => moodFromScore(stats.value.averageMood));

// Teintes de la marque, prises un ton plus profond pour les graphiques
// (palette validée : écarts suffisants en vision normale et daltonienne).
const CHART_MOOD_COLORS: Record<MoodValue, string> = {
  very_happy: '#E0A900',
  happy: '#E2531D',
  neutral: '#A58AFF',
  sad: '#0FA5B8',
  very_sad: '#6B3BE0',
};

const moodLabels: Record<MoodValue, string> = {
  very_happy: 'Great',
  happy: 'Good',
  neutral: 'Okay',
  sad: 'Bad',
  very_sad: 'Awful',
};

const moodCounts = ref<Record<MoodValue, number>>({
  very_happy: 0,
  happy: 0,
  neutral: 0,
  sad: 0,
  very_sad: 0,
});

const moodTotal = computed(() => Object.values(moodCounts.value).reduce((a, b) => a + b, 0));

// Pourcentages arrondis au plus fort reste : leur somme fait toujours 100
function roundedShares(values: number[]): number[] {
  const total = values.reduce((a, b) => a + b, 0);
  if (!total) return values.map(() => 0);
  const raw = values.map((v) => (v / total) * 100);
  const floors = raw.map(Math.floor);
  let rest = 100 - floors.reduce((a, b) => a + b, 0);
  raw
    .map((r, i) => ({ i, frac: r - floors[i] }))
    .sort((a, b) => b.frac - a.frac)
    .forEach(({ i }) => {
      if (rest > 0) {
        floors[i]++;
        rest--;
      }
    });
  return floors;
}

const moodSegments = computed(() => {
  const values = Object.keys(moodLabels) as MoodValue[];
  const shares = roundedShares(values.map((value) => moodCounts.value[value]));
  return values.map((value, i) => ({
    value,
    label: moodLabels[value],
    color: CHART_MOOD_COLORS[value],
    count: moodCounts.value[value],
    percent: shares[i],
  }));
});

const hoveredMood = ref<MoodValue | null>(null);
const hoveredSegment = computed(() => moodSegments.value.find((s) => s.value === hoveredMood.value) ?? null);

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
  const counts = {
    very_happy: 0,
    happy: 0,
    neutral: 0,
    sad: 0,
    very_sad: 0,
  };

  moodsData.forEach(p => {
    if (p.mood in counts) {
      counts[p.mood as keyof typeof counts]++;
    }
  });

  moodCounts.value = counts;
}

// Réticule vertical qui suit le jour survolé
const crosshair: Plugin<'line'> = {
  id: 'moodflowCrosshair',
  afterDatasetsDraw(chart) {
    const active = chart.tooltip?.getActiveElements?.() ?? [];
    if (!active.length) return;
    const { ctx, chartArea } = chart;
    const x = active[0].element.x;
    ctx.save();
    ctx.beginPath();
    ctx.moveTo(x, chartArea.top);
    ctx.lineTo(x, chartArea.bottom);
    ctx.lineWidth = 1;
    ctx.strokeStyle = 'rgba(26, 14, 43, 0.25)';
    ctx.stroke();
    ctx.restore();
  },
};

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

  const axisFont = { family: '"DM Mono", ui-monospace, monospace', size: 11 };

  trendChart?.destroy();
  trendChart = new Chart(trendChartCanvas.value, {
    type: 'line',
    data: {
      labels,
      datasets: [{
        label: 'Average Mood',
        data,
        borderColor: '#6B3BE0',
        backgroundColor: 'rgba(107, 59, 224, 0.1)',
        cubicInterpolationMode: 'monotone',
        fill: true,
        borderWidth: 2,
        borderCapStyle: 'round',
        borderJoinStyle: 'round',
        pointBackgroundColor: '#6B3BE0',
        pointBorderColor: '#FFFFFF',
        pointBorderWidth: 2,
        pointRadius: 4,
        pointHoverRadius: 6,
        pointHitRadius: 16,
      }],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      interaction: { mode: 'index', intersect: false },
      scales: {
        y: {
          beginAtZero: true,
          max: 5,
          ticks: {
            stepSize: 1,
            color: '#8A7F93',
            font: axisFont,
            padding: 8,
          },
          grid: {
            color: '#EFE8E0',
            drawTicks: false,
          },
          border: { display: false },
        },
        x: {
          grid: {
            display: false
          },
          ticks: {
            color: '#8A7F93',
            font: axisFont,
          },
          border: { color: '#DDD4CA' },
        }
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          backgroundColor: '#1A0E2B',
          titleColor: 'rgba(255, 248, 239, 0.65)',
          titleFont: axisFont,
          bodyColor: '#FFF8EF',
          bodyFont: { family: '"Instrument Sans Variable", system-ui, sans-serif', size: 14, weight: 600 },
          padding: 12,
          cornerRadius: 12,
          boxWidth: 12,
          boxHeight: 2,
          boxPadding: 6,
          callbacks: {
            label: (context) => `${(context.parsed.y ?? 0).toFixed(1)}/5  Average Mood`,
          },
        },
      },
    },
    plugins: [crosshair],
  });
}

onMounted(async () => {
  if (isManager.value) {
    await supabase.rpc('update_service_analytics');
    await nextTick();
    await loadData();
  }
});

onUnmounted(() => {
  trendChart?.destroy();
});
</script>
