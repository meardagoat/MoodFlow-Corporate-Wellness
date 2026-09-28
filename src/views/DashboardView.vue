<template>
  <div class="min-h-screen">
    <!-- ============================================================
         EN-TÊTE
         ============================================================ -->
    <section class="shell pt-6 md:pt-10">
      <div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-6">
        <div class="min-w-0">
          <p class="label text-ink/55">(02) Analyses<span v-if="isManager"> · Espace manager</span></p>
          <h1 id="dash-title" v-split="{ chars: true, immediate: true, delay: 0.1 }" class="display mt-5 text-display-lg">
            Le pouls de l'<span class="accent text-grape">équipe</span>
          </h1>
        </div>
        <div v-reveal="0.3" class="max-w-sm">
          <p class="text-pretty text-lg leading-snug text-ink/65">
            Des tendances agrégées et anonymes pour repérer tôt les signaux faibles et agir au bon moment.
          </p>
          <p v-if="isManager" class="mt-4 flex flex-wrap items-center gap-2">
            <span class="chip gap-2 whitespace-nowrap">
              <Icon name="calendar" class="h-3.5 w-3.5" />
              30 derniers jours
            </span>
            <span class="chip gap-2 whitespace-nowrap">
              <Icon name="refresh" class="h-3.5 w-3.5" />
              Mis à jour le {{ updatedLabel }}
            </span>
          </p>
        </div>
      </div>
    </section>

    <!-- ============================================================
         ACCÈS RÉSERVÉ
         ============================================================ -->
    <section v-if="!isManager" class="shell mt-10" aria-labelledby="dash-locked-title">
      <div v-reveal="0.15" class="relative grid overflow-hidden rounded-[2.5rem] bg-ink text-paper lg:grid-cols-[minmax(0,1fr)_26rem]">
        <div class="pointer-events-none absolute -left-24 -top-24 h-72 w-72 rounded-full bg-grape/40 blur-3xl" aria-hidden="true" />
        <div class="relative p-6 sm:p-10 lg:p-14">
          <span class="grid h-14 w-14 place-items-center rounded-full bg-sun text-ink">
            <Icon name="lock" class="h-6 w-6" />
          </span>
          <p class="label mt-8 text-paper/55">Accès restreint</p>
          <h2 id="dash-locked-title" class="display mt-4 text-display-md">
            Réservé aux <span class="accent text-sun">managers</span>
          </h2>
          <p class="mt-5 max-w-lg text-pretty text-lg leading-snug text-paper/70">
            Ce tableau de bord agrège l'humeur des équipes de façon anonyme pour les responsables. Si votre rôle a changé,
            vous pouvez demander une mise à jour depuis votre profil.
          </p>
          <div class="mt-8 flex flex-wrap gap-3">
            <RouterLink to="/feed" class="btn btn-sun">
              Retour au fil
              <span class="btn-dot"><Icon name="arrow-right" /></span>
            </RouterLink>
            <RouterLink to="/profile" class="btn btn-outline-light">Mon profil</RouterLink>
          </div>
        </div>
        <div class="relative hidden place-items-center border-l border-paper/10 p-10 lg:grid" aria-hidden="true">
          <div class="relative grid h-64 w-64 place-items-center rounded-full bg-paper/[0.06]">
            <span class="absolute inset-4 animate-spin-slow rounded-full border border-dashed border-paper/20" />
            <MoodFace mood="peek" class="h-40 w-40 animate-drift" />
            <span class="absolute bottom-6 right-6 grid h-14 w-14 place-items-center rounded-full bg-coral text-ink ring-8 ring-ink">
              <Icon name="lock" class="h-6 w-6" />
            </span>
          </div>
        </div>
      </div>
    </section>

    <!-- ============================================================
         CHARGEMENT
         ============================================================ -->
    <section v-else-if="loading" class="shell mt-10" role="status" aria-live="polite">
      <div class="grid grid-cols-2 gap-3 md:grid-cols-12">
        <div class="col-span-2 grid min-h-[22rem] place-items-center rounded-[2.5rem] bg-ink text-paper md:col-span-12 lg:col-span-6 lg:row-span-2">
          <div class="flex flex-col items-center gap-5">
            <SunMark class="h-16 w-16 animate-spin-slow" :face="false" :ray-count="14" :ray-width="9" />
            <p class="label text-paper/60">Calcul des tendances…</p>
          </div>
        </div>
        <div
          v-for="n in 4"
          :key="n"
          class="skeleton min-h-[10.5rem] rounded-[2rem] bg-ink/[0.06] md:col-span-6 lg:col-span-3"
          :style="{ animationDelay: `${n * 0.12}s` }"
        />
        <div class="skeleton col-span-2 min-h-[20rem] rounded-[2.5rem] bg-ink/[0.06] md:col-span-12 lg:col-span-7" />
        <div class="skeleton col-span-2 min-h-[20rem] rounded-[2.5rem] bg-ink/[0.06] md:col-span-12 lg:col-span-5" style="animation-delay: 0.2s" />
      </div>
      <span class="sr-only">Chargement des analyses</span>
    </section>

    <template v-else>
      <!-- ============================================================
           INDICATEURS CLÉS
           ============================================================ -->
      <section class="shell mt-10" aria-label="Indicateurs clés">
        <div class="grid grid-cols-2 gap-3 md:grid-cols-12">
          <!-- Humeur moyenne -->
          <article
            v-reveal="0.1"
            class="relative col-span-2 flex min-h-[22rem] flex-col overflow-hidden rounded-[2.5rem] bg-ink p-6 text-paper sm:p-8 md:col-span-12 lg:col-span-6 lg:row-span-2 lg:p-10"
          >
            <div
              class="hero-glow pointer-events-none absolute -right-24 -top-24 h-96 w-96 rounded-full blur-3xl"
              :style="{ backgroundColor: moodColor(averageMood) }"
              aria-hidden="true"
            />
            <div class="pointer-events-none absolute -bottom-32 -left-20 h-80 w-80 rounded-full bg-grape/30 blur-3xl" aria-hidden="true" />
            <div class="relative flex flex-wrap items-center justify-between gap-3">
              <p class="label text-paper/60">Humeur moyenne</p>
              <span class="rounded-full bg-paper/10 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-paper/70">
                {{ moodTotal }} {{ moodTotal > 1 ? 'check-ins' : 'check-in' }}
              </span>
            </div>

            <div class="relative mt-auto flex items-end justify-between gap-4 pt-10">
              <div class="min-w-0">
                <p class="display text-[clamp(5rem,10vw,10.5rem)] leading-[0.8] tracking-[-0.07em]">
                  <template v-if="hasMoodData">{{ fmt(stats.averageMood) }}</template>
                  <template v-else>–</template><span class="text-[0.32em] tracking-[-0.03em] text-paper/40">/5</span>
                </p>
                <p class="mt-4 flex items-center gap-2 text-lg font-semibold">
                  <span class="h-2.5 w-2.5 rounded-full" :style="{ backgroundColor: moodColor(averageMood) }" aria-hidden="true" />
                  {{ hasMoodData ? moodLabels[averageMood] : 'Pas encore de données' }}
                </p>
              </div>
              <span class="hero-face grid shrink-0 place-items-center rounded-full bg-paper/[0.08] p-3 sm:p-4">
                <MoodFace
                  :mood="hasMoodData ? averageMood : 'sleepy'"
                  class="h-24 w-24 animate-drift sm:h-36 sm:w-36 xl:h-44 xl:w-44"
                  :label="hasMoodData ? `Humeur moyenne : ${fmt(stats.averageMood)} sur 5` : 'Aucune donnée'"
                />
              </span>
            </div>

            <!-- Échelle 1 → 5 -->
            <div class="relative mt-8">
              <div class="relative h-2.5 rounded-full" :style="{ background: scaleGradient }">
                <span
                  v-if="hasMoodData"
                  class="absolute top-1/2 h-6 w-6 -translate-x-1/2 -translate-y-1/2 rounded-full border-4 border-ink bg-paper shadow-lg transition-[left] duration-1000 ease-out-expo"
                  :style="{ left: `${scalePosition}%` }"
                  aria-hidden="true"
                />
              </div>
              <div class="mt-3 flex justify-between font-mono text-[10px] uppercase tracking-[0.08em] text-paper/45 sm:text-[11px]">
                <span>Difficile</span>
                <span class="hidden sm:inline">Correct</span>
                <span>Radieux</span>
              </div>
            </div>
          </article>

          <!-- Tendance hebdomadaire -->
          <article
            v-reveal="0.18"
            class="kpi group flex min-h-[11rem] min-w-0 flex-col rounded-[2rem] bg-grape p-5 text-paper sm:min-h-[13rem] sm:p-6 md:col-span-6 lg:col-span-3"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="label text-paper/70">Tendance</p>
              <span
                class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-paper text-grape transition-transform duration-500 ease-out-back group-hover:scale-110"
                aria-hidden="true"
              >
                <Icon :name="trendIcon" class="h-5 w-5" stroke-width="2.25" />
              </span>
            </div>
            <p class="kpi-value display mt-auto pt-6 leading-[0.85] tracking-[-0.06em]">
              {{ trendValueLabel }}
            </p>
            <p class="mt-2 text-sm text-paper/75">vs semaine précédente</p>
          </article>

          <!-- Participation -->
          <article
            v-reveal="0.24"
            class="kpi group flex min-h-[11rem] min-w-0 flex-col rounded-[2rem] border border-ink/10 bg-white p-5 sm:min-h-[13rem] sm:p-6 md:col-span-6 lg:col-span-3"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="label text-ink/55">Participation</p>
              <svg
                viewBox="0 0 40 40"
                class="h-10 w-10 shrink-0 -rotate-90"
                role="meter"
                :aria-valuenow="Math.round(stats.participationRate)"
                aria-valuemin="0"
                aria-valuemax="100"
                aria-label="Taux de participation"
              >
                <circle cx="20" cy="20" r="16" fill="none" stroke="#CDB8FF" stroke-opacity="0.45" stroke-width="6" />
                <circle
                  class="ring-fill"
                  cx="20"
                  cy="20"
                  r="16"
                  fill="none"
                  stroke="#8248FE"
                  stroke-width="6"
                  stroke-linecap="round"
                  pathLength="100"
                  stroke-dasharray="100"
                  :stroke-dashoffset="revealed ? 100 - Math.min(stats.participationRate, 100) : 100"
                />
              </svg>
            </div>
            <p class="kpi-value display mt-auto pt-6 leading-[0.85] tracking-[-0.06em]">
              <CountUp :value="`${Math.round(stats.participationRate)}%`" />
            </p>
            <p class="mt-2 text-sm text-ink/60">actifs cette semaine</p>
          </article>

          <!-- Effectif -->
          <article
            v-reveal="0.3"
            class="kpi group flex min-h-[11rem] min-w-0 flex-col rounded-[2rem] border border-ink/10 bg-white p-5 sm:min-h-[13rem] sm:p-6 md:col-span-6 lg:col-span-3"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="label text-ink/55">Effectif</p>
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink/[0.05] transition-transform duration-500 ease-out-back group-hover:rotate-12" aria-hidden="true">
                <Icon name="users" class="h-5 w-5" />
              </span>
            </div>
            <p class="kpi-value display mt-auto pt-6 leading-[0.85] tracking-[-0.06em]">
              <CountUp :value="String(stats.totalParticipants)" />
            </p>
            <p class="mt-2 text-sm text-ink/60">collaborateurs inscrits</p>
          </article>

          <!-- Publications -->
          <article
            v-reveal="0.36"
            class="kpi group flex min-h-[11rem] min-w-0 flex-col rounded-[2rem] bg-sun p-5 sm:min-h-[13rem] sm:p-6 md:col-span-6 lg:col-span-3"
          >
            <div class="flex items-start justify-between gap-2">
              <p class="label text-ink/65">Publications</p>
              <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-sun transition-transform duration-500 ease-out-back group-hover:-rotate-12" aria-hidden="true">
                <Icon name="message" class="h-5 w-5" />
              </span>
            </div>
            <p class="kpi-value display mt-auto pt-6 leading-[0.85] tracking-[-0.06em]">
              <CountUp :value="String(stats.totalPosts)" />
            </p>
            <p class="mt-2 text-sm text-ink/70">sur 30 jours · {{ fmt(stats.totalPosts / 30) }}/jour</p>
          </article>
        </div>
      </section>

      <!-- ============================================================
           ÉVOLUTION + RÉPARTITION
           ============================================================ -->
      <section class="shell mt-3 grid gap-3 lg:grid-cols-12" aria-label="Évolution et répartition des humeurs">
        <!-- Évolution sur 7 jours -->
        <figure v-reveal="0.1" class="min-w-0 rounded-[2.5rem] border border-ink/10 bg-white p-6 sm:p-8 lg:col-span-7">
          <figcaption class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="label text-ink/55">Évolution · 7 jours</p>
              <h2 class="display mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.045em]">
                La <span class="accent text-grape">courbe</span> de la semaine
              </h2>
            </div>
            <p v-if="weekAverage !== null" class="sm:text-right">
              <span class="display block text-3xl leading-none tracking-[-0.05em]">{{ fmt(weekAverage) }}<span class="text-base text-ink/40">/5</span></span>
              <span class="label text-ink/50">moyenne 7 j</span>
            </p>
          </figcaption>

          <div class="mt-8 grid grid-cols-[1.25rem_minmax(0,1fr)] gap-2 sm:grid-cols-[1.5rem_minmax(0,1fr)]">
            <!-- Axe Y -->
            <div class="relative h-60 sm:h-72 lg:h-80" aria-hidden="true">
              <span
                v-for="s in [5, 4, 3, 2, 1]"
                :key="s"
                class="absolute left-0 -translate-y-1/2 font-mono text-[11px] text-ink/40"
                :style="{ top: `${yFor(s)}%` }"
              >{{ s }}</span>
            </div>

            <div>
              <div class="relative h-60 sm:h-72 lg:h-80" @pointerleave="activeDay = null">
                <!-- Repères horizontaux -->
                <span
                  v-for="s in [5, 4, 3, 2, 1]"
                  :key="`g${s}`"
                  class="absolute inset-x-0 border-t border-dashed"
                  :class="s === 1 ? 'border-ink/15' : 'border-ink/[0.07]'"
                  :style="{ top: `${yFor(s)}%` }"
                  aria-hidden="true"
                />

                <!-- Réticule -->
                <span
                  v-if="activePoint"
                  class="absolute inset-y-0 w-px bg-ink/15"
                  :style="{ left: `${activePoint.x}%` }"
                  aria-hidden="true"
                />

                <!-- Courbe -->
                <div class="trend-draw absolute inset-0" :class="revealed ? 'is-drawn' : ''" aria-hidden="true">
                  <svg viewBox="0 0 100 100" preserveAspectRatio="none" class="absolute inset-0 h-full w-full overflow-visible">
                    <defs>
                      <linearGradient id="dash-area" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="0%" stop-color="#8248FE" stop-opacity="0.28" />
                        <stop offset="100%" stop-color="#8248FE" stop-opacity="0" />
                      </linearGradient>
                    </defs>
                    <path v-if="areaPath" :d="areaPath" fill="url(#dash-area)" />
                    <path
                      v-if="linePath"
                      :d="linePath"
                      fill="none"
                      stroke="#8248FE"
                      stroke-width="5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      vector-effect="non-scaling-stroke"
                    />
                  </svg>
                </div>

                <!-- Points (visages) -->
                <button
                  v-for="(point, i) in chartPoints"
                  :key="point.label + i"
                  type="button"
                  class="trend-point absolute z-[1] grid -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                  :class="point.score === null ? 'h-6 w-6' : 'h-8 w-8 sm:h-11 sm:w-11'"
                  :style="{ left: `${point.x}%`, top: `${point.y}%`, '--i': i }"
                  :aria-label="point.aria"
                  @pointerenter="activeDay = i"
                  @focus="activeDay = i"
                  @blur="activeDay = null"
                >
                  <span
                    v-if="point.score === null"
                    class="h-3 w-3 rounded-full border-2 border-dashed border-ink/30 bg-white"
                  />
                  <MoodFace
                    v-else
                    :mood="moodFromScore(point.score)"
                    class="h-full w-full rounded-full ring-4 ring-white transition-transform duration-300 ease-out-back"
                    :class="activeDay === i ? 'scale-125' : ''"
                  />
                </button>

                <!-- Info-bulle -->
                <div
                  v-if="activePoint"
                  class="pointer-events-none absolute z-10 whitespace-nowrap rounded-2xl bg-ink px-3.5 py-2.5 text-paper shadow-xl"
                  :style="tooltipStyle"
                  role="tooltip"
                >
                  <p class="font-mono text-[10px] uppercase tracking-[0.1em] text-paper/55">{{ activePoint.fullLabel }}</p>
                  <p v-if="activePoint.score !== null" class="mt-1 text-sm font-semibold">
                    {{ fmt(activePoint.score) }}/5 · {{ moodLabels[moodFromScore(activePoint.score)] }}
                  </p>
                  <p class="text-xs text-paper/65">
                    {{ activePoint.count === 0 ? 'Aucune publication' : `${activePoint.count} ${activePoint.count > 1 ? 'publications' : 'publication'}` }}
                  </p>
                </div>
              </div>

              <!-- Axe X -->
              <div class="relative mt-3 h-5" aria-hidden="true">
                <span
                  v-for="(point, i) in chartPoints"
                  :key="`x${i}`"
                  class="absolute -translate-x-1/2 whitespace-nowrap font-mono text-[10px] uppercase tracking-[0.06em] sm:text-[11px]"
                  :class="i === chartPoints.length - 1 ? 'font-semibold text-ink' : 'text-ink/45'"
                  :style="{ left: `${point.x}%` }"
                >{{ point.label }}</span>
              </div>
            </div>
          </div>
        </figure>

        <!-- Répartition des humeurs -->
        <figure v-reveal="0.18" class="min-w-0 rounded-[2.5rem] border border-ink/10 bg-white p-6 sm:p-8 lg:col-span-5">
          <figcaption>
            <p class="label text-ink/55">Répartition · 30 jours</p>
            <h2 class="display mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.045em]">
              La <span class="accent text-tangerine">météo</span> intérieure
            </h2>
          </figcaption>

          <div class="relative mt-8">
            <div class="flex h-12 w-full gap-1 overflow-hidden rounded-full" :class="moodTotal === 0 ? 'bg-ink/[0.06]' : ''">
              <template v-for="segment in moodSegments" :key="segment.value">
                <div
                  v-if="segment.count > 0"
                  class="dist-seg relative h-full min-w-[6px] rounded-full outline-none transition-[opacity,flex-grow] duration-700 ease-out-expo focus-visible:ring-2 focus-visible:ring-ink focus-visible:ring-offset-2"
                  :class="hoveredMood && hoveredMood !== segment.value ? 'opacity-30' : 'opacity-100'"
                  :style="{ flexGrow: revealed ? segment.count : 0.0001, backgroundColor: segment.color }"
                  tabindex="0"
                  :aria-label="`${segment.label} : ${segment.count} (${segment.percent} %)`"
                  @pointerenter="hoveredMood = segment.value"
                  @pointerleave="hoveredMood = null"
                  @focus="hoveredMood = segment.value"
                  @blur="hoveredMood = null"
                />
              </template>
            </div>

            <div
              v-if="hoveredSegment"
              class="pointer-events-none absolute -top-2 left-1/2 z-10 -translate-x-1/2 -translate-y-full whitespace-nowrap rounded-2xl bg-ink px-3.5 py-2 text-paper shadow-xl"
              role="tooltip"
            >
              <span class="text-sm font-semibold">{{ hoveredSegment.count }} · {{ hoveredSegment.percent }} %</span>
              <span class="ml-2 inline-flex items-center gap-1.5 text-xs text-paper/70">
                <span class="inline-block h-2 w-2 rounded-full" :style="{ backgroundColor: hoveredSegment.color }" />
                {{ hoveredSegment.label }}
              </span>
            </div>
          </div>

          <table class="mt-6 w-full text-sm">
            <thead class="sr-only">
              <tr>
                <th scope="col">Humeur</th>
                <th scope="col">Part</th>
                <th scope="col">Publications</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="segment in moodSegments"
                :key="segment.value"
                class="border-t border-ink/[0.07] transition-colors duration-300"
                :class="hoveredMood === segment.value ? 'bg-paper' : ''"
                @pointerenter="hoveredMood = segment.value"
                @pointerleave="hoveredMood = null"
              >
                <th scope="row" class="py-2.5 pr-3 text-left font-medium">
                  <span class="flex items-center gap-3">
                    <MoodFace :mood="segment.value" class="h-9 w-9 shrink-0 transition-transform duration-300 ease-out-back" :class="hoveredMood === segment.value ? 'scale-110' : ''" />
                    <span class="min-w-0">
                      <span class="block font-semibold">{{ segment.label }}</span>
                      <span class="mt-1.5 block h-1.5 w-24 overflow-hidden rounded-full bg-ink/[0.06] sm:w-32">
                        <span
                          class="block h-full rounded-full transition-[width] duration-1000 ease-out-expo"
                          :style="{ width: revealed ? `${(segment.count / maxMoodCount) * 100}%` : '0%', backgroundColor: segment.color }"
                        />
                      </span>
                    </span>
                  </span>
                </th>
                <td class="display py-2.5 text-right text-2xl tabular-nums leading-none tracking-[-0.04em]">
                  {{ segment.percent }}<span class="text-sm text-ink/40">%</span>
                </td>
                <td class="w-14 py-2.5 text-right font-mono text-xs tabular-nums text-ink/50">{{ segment.count }}</td>
              </tr>
            </tbody>
          </table>
        </figure>
      </section>

      <!-- ============================================================
           CLASSEMENT DES SERVICES + SUJETS
           ============================================================ -->
      <section class="shell mt-3 grid gap-3 lg:grid-cols-12" aria-label="Services et sujets">
        <div v-reveal="0.1" class="min-w-0 rounded-[2.5rem] border border-ink/10 bg-white p-6 sm:p-8 lg:col-span-8">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="label text-ink/55">Classement · {{ services.length }} services</p>
              <h2 class="display mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.045em]">
                Service par <span class="accent text-grape">service</span>
              </h2>
            </div>
            <p v-if="hasMoodData" class="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.08em] text-ink/50">
              <span class="h-4 w-0 border-l-2 border-dashed border-ink/40" aria-hidden="true" />
              Moyenne globale {{ fmt(stats.averageMood) }}
            </p>
          </div>

          <p v-if="services.length === 0" class="mt-8 rounded-[1.5rem] bg-paper-deep/60 px-5 py-10 text-center text-ink/60">
            Aucun service à afficher pour le moment.
          </p>

          <ol v-else class="mt-8 space-y-4 sm:space-y-3" aria-label="Services classés par humeur moyenne">
            <li
              v-for="(service, i) in services"
              :key="service.id"
              class="group grid grid-cols-[auto_minmax(0,1fr)_auto] items-center gap-x-3 gap-y-2.5 sm:grid-cols-[2rem_minmax(0,10rem)_minmax(0,1fr)_4.5rem] sm:gap-x-4"
            >
              <span class="font-mono text-xs text-ink/40">{{ String(i + 1).padStart(2, '0') }}</span>
              <div class="min-w-0">
                <p class="truncate font-semibold">{{ service.name }}</p>
                <p class="mt-0.5 flex items-center gap-1.5 text-xs text-ink/55">
                  <span class="h-1.5 w-1.5 shrink-0 rounded-full" :class="serviceStatus(service.mood_average).dot" aria-hidden="true" />
                  <span class="truncate">{{ service.participant_count }} pers. · {{ serviceStatus(service.mood_average).label }}</span>
                </p>
              </div>
              <p class="display text-right text-2xl leading-none tracking-[-0.05em] sm:order-last sm:text-3xl">
                {{ fmt(service.mood_average) }}<span class="text-sm tracking-normal text-ink/40">/5</span>
              </p>
              <div class="relative col-span-3 h-12 rounded-full bg-ink/[0.04] sm:col-span-1">
                <div
                  class="service-bar absolute inset-y-0 left-0 min-w-[3rem] rounded-full transition-[width] duration-[1.2s] ease-out-expo group-hover:brightness-105"
                  :style="{
                    width: revealed ? `${(service.mood_average / 5) * 100}%` : '3rem',
                    backgroundColor: moodColor(moodFromScore(service.mood_average)),
                    transitionDelay: `${i * 0.08}s`,
                  }"
                >
                  <span class="absolute right-1.5 top-1/2 grid h-9 w-9 -translate-y-1/2 place-items-center rounded-full bg-paper/80 transition-transform duration-500 ease-out-back group-hover:scale-110">
                    <MoodFace :mood="moodFromScore(service.mood_average)" class="h-7 w-7" :label="moodLabels[moodFromScore(service.mood_average)]" />
                  </span>
                </div>
                <span
                  v-if="hasMoodData"
                  class="pointer-events-none absolute -inset-y-1 w-0 border-l-2 border-dashed border-ink/35"
                  :style="{ left: `${(stats.averageMood / 5) * 100}%` }"
                  aria-hidden="true"
                />
              </div>
            </li>
          </ol>
        </div>

        <!-- Sujets récurrents -->
        <div v-reveal="0.18" class="relative flex min-w-0 flex-col overflow-hidden rounded-[2.5rem] bg-lilac p-6 sm:p-8 lg:col-span-4">
          <p class="label text-ink/60">Sujets récurrents</p>
          <h2 class="display mt-3 text-[clamp(1.75rem,3vw,2.5rem)] leading-none tracking-[-0.045em]">
            Ce qui <span class="accent">revient</span>
          </h2>

          <p v-if="topTopics.length === 0" class="mt-8 text-ink/65">Aucun sujet associé aux publications récentes.</p>
          <ul v-else class="mt-8 space-y-4">
            <li v-for="(topic, i) in topTopics" :key="topic.id">
              <div class="flex items-baseline justify-between gap-3">
                <p class="min-w-0 truncate font-semibold">
                  <span class="mr-2 font-mono text-xs text-ink/45">{{ String(i + 1).padStart(2, '0') }}</span>{{ topic.label }}
                </p>
                <p class="shrink-0 font-mono text-xs text-ink/60">{{ topic.count }}</p>
              </div>
              <div class="mt-2 h-2 overflow-hidden rounded-full bg-ink/10">
                <div
                  class="h-full rounded-full bg-ink transition-[width] duration-1000 ease-out-expo"
                  :style="{ width: revealed ? `${(topic.count / topTopics[0].count) * 100}%` : '0%', transitionDelay: `${i * 0.08}s` }"
                />
              </div>
            </li>
          </ul>
          <MoodFace mood="peek" class="pointer-events-none absolute -bottom-10 -right-6 h-32 w-32 rotate-[-18deg] opacity-90" />
          <div class="h-16 lg:mt-auto" aria-hidden="true" />
        </div>
      </section>

      <!-- ============================================================
           PISTES D'ACTION
           ============================================================ -->
      <section class="shell mt-16 md:mt-20" aria-labelledby="dash-insights-title">
        <div class="flex flex-wrap items-end justify-between gap-4">
          <h2 id="dash-insights-title" v-split class="display text-display-md">Pistes d'<span class="accent">action</span></h2>
          <p class="label max-w-xs text-ink/50">Suggestions calculées à partir des données ci-dessus</p>
        </div>
        <div class="mt-8 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <article
            v-for="(insight, i) in insights"
            :key="insight.key"
            v-reveal="i * 0.08"
            v-tilt
            class="insight relative flex min-h-[17rem] flex-col overflow-hidden rounded-[2rem] p-6"
            :class="insight.tone"
          >
            <div class="flex items-center justify-between gap-3">
              <p class="label opacity-70">{{ insight.kicker }}</p>
              <span class="insight-icon grid h-11 w-11 shrink-0 place-items-center rounded-full" :class="insight.iconTone" aria-hidden="true">
                <Icon :name="insight.icon" class="h-5 w-5" />
              </span>
            </div>
            <h3 class="display mt-auto pt-10 text-[1.75rem] leading-[0.95] tracking-[-0.045em]">{{ insight.title }}</h3>
            <p class="mt-3 text-pretty text-[15px] leading-snug opacity-80">{{ insight.body }}</p>
          </article>
        </div>
      </section>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted, nextTick } from 'vue';
import { RouterLink } from 'vue-router';
import { supabase } from '../lib/supabase';
import { isManager } from '../lib/auth';
import type { Database } from '../lib/database.types';
import MoodFace from '../components/brand/MoodFace.vue';
import SunMark from '../components/brand/SunMark.vue';
import Icon, { type IconName } from '../components/ui/Icon.vue';
import CountUp from '../components/ui/CountUp.vue';
import { MOOD_COLORS, MOOD_VALUES, moodColor, moodFromScore, type MoodValue } from '../lib/moods';

type Service = Database['public']['Tables']['services']['Row'];

const services = ref<Service[]>([]);
const stats = ref({
  totalParticipants: 0,
  totalPosts: 0,
  averageMood: 0,
  participationRate: 0,
  weeklyChange: 0,
});

const loading = ref(true);
const revealed = ref(false);

const averageMood = computed(() => moodFromScore(stats.value.averageMood));

const moodLabels: Record<MoodValue, string> = {
  very_happy: 'Radieux',
  happy: 'Bien',
  neutral: 'Correct',
  sad: 'Pas top',
  very_sad: 'Difficile',
};

const topicLabels: Record<string, string> = {
  workload: 'Charge de travail',
  team: "Esprit d'équipe",
  work_life: 'Équilibre pro/perso',
  management: 'Management',
  environment: 'Environnement',
  growth: 'Évolution',
  recognition: 'Reconnaissance',
};

/** Nombre au format français : 3.64 → "3,6" */
function fmt(n: number, digits = 1): string {
  return n.toFixed(digits).replace('.', ',');
}

const updatedLabel = new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'long' });

const moodCounts = ref<Record<MoodValue, number>>({
  very_happy: 0,
  happy: 0,
  neutral: 0,
  sad: 0,
  very_sad: 0,
});

const moodTotal = computed(() => Object.values(moodCounts.value).reduce((a, b) => a + b, 0));
const hasMoodData = computed(() => moodTotal.value > 0 && stats.value.averageMood > 0);
const maxMoodCount = computed(() => Math.max(1, ...Object.values(moodCounts.value)));

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
  const values = MOOD_VALUES;
  const shares = roundedShares(values.map((value) => moodCounts.value[value]));
  return values.map((value, i) => ({
    value,
    label: moodLabels[value],
    color: MOOD_COLORS[value],
    count: moodCounts.value[value],
    percent: shares[i],
  }));
});

const hoveredMood = ref<MoodValue | null>(null);
const hoveredSegment = computed(() => moodSegments.value.find((s) => s.value === hoveredMood.value) ?? null);

// Échelle 1 → 5 de la carte « Humeur moyenne »
const scaleGradient = `linear-gradient(90deg, ${[...MOOD_VALUES].reverse().map((m) => MOOD_COLORS[m]).join(', ')})`;
const scalePosition = computed(() => Math.min(100, Math.max(0, ((stats.value.averageMood - 1) / 4) * 100)));

// Tendance hebdomadaire
const trendIcon = computed<IconName>(() => {
  if (stats.value.weeklyChange > 0.05) return 'arrow-up-right';
  if (stats.value.weeklyChange < -0.05) return 'arrow-down';
  return 'arrow-right';
});
const trendValueLabel = computed(() => {
  const v = stats.value.weeklyChange;
  const sign = v > 0.05 ? '+' : v < -0.05 ? '−' : '';
  return `${sign}${fmt(Math.abs(v))}%`;
});

function serviceStatus(score: number) {
  if (score >= 4) return { label: 'Excellent', dot: 'bg-[#1F9D55]' };
  if (score >= 3) return { label: 'Stable', dot: 'bg-tangerine' };
  return { label: 'À accompagner', dot: 'bg-coral' };
}

// ---------- Courbe des 7 derniers jours ----------
interface TrendDay {
  label: string;
  fullLabel: string;
  score: number | null;
  count: number;
}

const trendDays = ref<TrendDay[]>([]);
const activeDay = ref<number | null>(null);

/** Score 1–5 → position verticale (%) dans la zone du graphique */
function yFor(score: number): number {
  return 10 + ((5 - score) / 4) * 80;
}

const chartPoints = computed(() => {
  const n = trendDays.value.length;
  return trendDays.value.map((day, i) => {
    const x = n > 1 ? 5 + (i / (n - 1)) * 90 : 50;
    const y = day.score === null ? yFor(1) : yFor(day.score);
    const aria =
      day.score === null
        ? `${day.fullLabel} : aucune publication`
        : `${day.fullLabel} : ${fmt(day.score)} sur 5, ${day.count} ${day.count > 1 ? 'publications' : 'publication'}`;
    return { ...day, x, y, aria };
  });
});

const plottedPoints = computed(() => chartPoints.value.filter((p) => p.score !== null));

const linePath = computed(() => {
  const pts = plottedPoints.value;
  if (pts.length < 2) return '';
  let d = `M ${pts[0].x} ${pts[0].y}`;
  for (let i = 1; i < pts.length; i++) {
    const a = pts[i - 1];
    const b = pts[i];
    const dx = (b.x - a.x) / 2;
    d += ` C ${a.x + dx} ${a.y}, ${b.x - dx} ${b.y}, ${b.x} ${b.y}`;
  }
  return d;
});

const areaPath = computed(() => {
  const pts = plottedPoints.value;
  if (!linePath.value) return '';
  return `${linePath.value} L ${pts[pts.length - 1].x} 100 L ${pts[0].x} 100 Z`;
});

const activePoint = computed(() => (activeDay.value === null ? null : chartPoints.value[activeDay.value] ?? null));

const tooltipStyle = computed(() => {
  const p = activePoint.value;
  if (!p) return {};
  const shift = p.x < 20 ? '-12%' : p.x > 80 ? '-88%' : '-50%';
  return { left: `${p.x}%`, top: `${p.y}%`, transform: `translate(${shift}, calc(-100% - 1.75rem))` };
});

const weekAverage = computed(() => {
  const pts = trendDays.value.filter((d) => d.score !== null && d.count > 0);
  const total = pts.reduce((a, d) => a + d.count, 0);
  if (!total) return null;
  return pts.reduce((a, d) => a + (d.score as number) * d.count, 0) / total;
});

// ---------- Sujets ----------
const topicCounts = ref<Record<string, number>>({});
const topTopics = computed(() =>
  Object.entries(topicCounts.value)
    .map(([id, count]) => ({ id, count, label: topicLabels[id] ?? id }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)
);

// ---------- Pistes d'action ----------
interface Insight {
  key: string;
  tone: string;
  iconTone: string;
  icon: IconName;
  kicker: string;
  title: string;
  body: string;
}

const insights = computed<Insight[]>(() => {
  const list: Insight[] = [];
  const sorted = [...services.value].sort((a, b) => b.mood_average - a.mood_average);
  const best = sorted[0];
  const weakest = sorted[sorted.length - 1];

  if (weakest && weakest.mood_average < 3) {
    list.push({
      key: 'priority',
      tone: 'bg-coral text-ink',
      iconTone: 'bg-ink text-coral',
      icon: 'lifebuoy',
      kicker: 'Priorité',
      title: `Soutenir ${weakest.name}`,
      body: `Humeur à ${fmt(weakest.mood_average)}/5 sur ${weakest.participant_count} personnes. Proposez un point d'équipe et vérifiez la charge de travail.`,
    });
  } else if (weakest && sorted.length > 1) {
    list.push({
      key: 'watch',
      tone: 'bg-aqua text-ink',
      iconTone: 'bg-ink text-aqua',
      icon: 'eye',
      kicker: 'À surveiller',
      title: `Garder un œil sur ${weakest.name}`,
      body: `Service le moins bien noté (${fmt(weakest.mood_average)}/5), sans signal d'alerte pour l'instant.`,
    });
  }

  if (best) {
    list.push({
      key: 'strength',
      tone: 'bg-sun text-ink',
      iconTone: 'bg-ink text-sun',
      icon: 'crown',
      kicker: 'Point fort',
      title: `${best.name} rayonne`,
      body: `${fmt(best.mood_average)}/5 de moyenne. Demandez à l'équipe ce qui fonctionne et partagez ces pratiques.`,
    });
  }

  const rate = Math.round(stats.value.participationRate);
  list.push(
    rate < 50
      ? {
          key: 'participation',
          tone: 'bg-grape text-paper',
          iconTone: 'bg-paper text-grape',
          icon: 'send',
          kicker: 'Participation',
          title: 'Relancer les check-ins',
          body: `Seulement ${rate} % de l'équipe s'est exprimée cette semaine. Rappelez que le partage peut rester anonyme.`,
        }
      : {
          key: 'participation',
          tone: 'bg-grape text-paper',
          iconTone: 'bg-paper text-grape',
          icon: 'users',
          kicker: 'Participation',
          title: 'Belle mobilisation',
          body: `${rate} % de l'équipe a partagé son humeur cette semaine. Continuez à valoriser ces échanges.`,
        }
  );

  const change = stats.value.weeklyChange;
  const lowShare = moodTotal.value
    ? Math.round(((moodCounts.value.sad + moodCounts.value.very_sad) / moodTotal.value) * 100)
    : 0;
  if (lowShare >= 25) {
    list.push({
      key: 'signals',
      tone: 'bg-ink text-paper',
      iconTone: 'bg-coral text-ink',
      icon: 'activity',
      kicker: 'Signaux faibles',
      title: `${lowShare} % d'humeurs basses`,
      body: `${change < -2 ? `En baisse de ${fmt(Math.abs(change))} % cette semaine. ` : ''}Prévoyez des temps d'écoute individuels dans les prochains jours.`,
    });
  } else {
    list.push({
      key: 'trend',
      tone: 'bg-ink text-paper',
      iconTone: 'bg-sun text-ink',
      icon: change < -2 ? 'trending' : 'spark',
      kicker: 'Tendance',
      title: change > 2 ? 'Dynamique positive' : change < -2 ? 'Légère baisse' : 'Humeur stable',
      body:
        change > 2
          ? `+${fmt(change)} % par rapport à la semaine précédente. Un bon moment pour célébrer les réussites.`
          : change < -2
            ? `${fmt(Math.abs(change))} % de moins que la semaine précédente. Restez attentif aux prochains check-ins.`
            : 'Peu de variation d’une semaine à l’autre. Maintenez les rituels qui fonctionnent.',
    });
  }

  return list;
});

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

  // Sujets les plus cités sur la même période
  const { data: tagsData } = await supabase
    .from('posts')
    .select('tags')
    .gte('created_at', new Date(Date.now() - 30 * 24 * 60 * 60 * 1000).toISOString());

  const topicTally: Record<string, number> = {};
  ((tagsData ?? []) as { tags: string[] | null }[]).forEach((p) => {
    (p.tags ?? []).forEach((tag) => {
      topicTally[tag] = (topicTally[tag] ?? 0) + 1;
    });
  });
  topicCounts.value = topicTally;

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

async function createTrendChart() {
  const days = 7;
  const result: TrendDay[] = [];

  for (let i = days - 1; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);

    const startOfDay = new Date(date);
    startOfDay.setHours(0, 0, 0, 0);
    const endOfDay = new Date(date);
    endOfDay.setHours(23, 59, 59, 999);

    const { data: dayMoods } = await supabase
      .from('posts')
      .select('mood')
      .gte('created_at', startOfDay.toISOString())
      .lte('created_at', endOfDay.toISOString());

    const weekday = date.toLocaleDateString('fr-FR', { weekday: 'short' }).replace('.', '');
    const day: TrendDay = {
      label: i === 0 ? 'Auj.' : weekday,
      fullLabel: i === 0 ? "Aujourd'hui" : date.toLocaleDateString('fr-FR', { weekday: 'long', day: 'numeric', month: 'short' }),
      score: null,
      count: 0,
    };

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
      day.score = moodScores.reduce((a, b) => a + b, 0) / moodScores.length;
      day.count = moodScores.length;
    }

    result.push(day);
  }

  trendDays.value = result;
}

onMounted(async () => {
  if (isManager.value) {
    try {
      await supabase.rpc('update_service_analytics');
      await nextTick();
      await loadData();
    } finally {
      loading.value = false;
      await nextTick();
      requestAnimationFrame(() => {
        setTimeout(() => (revealed.value = true), 250);
      });
    }
  }
});
</script>

<style scoped>
.kpi {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.kpi:hover {
  transform: translateY(-4px);
}
.kpi-value {
  font-size: clamp(2.5rem, 10vw, 4.25rem);
}
@media (min-width: 768px) {
  .kpi-value {
    font-size: clamp(3rem, 5.2vw, 4.75rem);
  }
}

.hero-glow {
  opacity: 0.25;
  animation: hero-pulse 7s ease-in-out infinite alternate;
}
@keyframes hero-pulse {
  from { transform: scale(1) translate(0, 0); opacity: 0.2; }
  to { transform: scale(1.15) translate(-2rem, 1.5rem); opacity: 0.32; }
}

.ring-fill {
  transition: stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1);
}

.trend-draw {
  clip-path: inset(0 100% 0 0);
  transition: clip-path 1.6s cubic-bezier(0.16, 1, 0.3, 1);
}
.trend-draw.is-drawn {
  clip-path: inset(-10% -5% -10% -5%);
}
.trend-point {
  animation: point-in 0.6s cubic-bezier(0.34, 1.56, 0.64, 1) both;
  animation-delay: calc(0.4s + var(--i) * 0.12s);
}
@keyframes point-in {
  from { opacity: 0; scale: 0.3; }
  to { opacity: 1; scale: 1; }
}

.skeleton {
  animation: skeleton-pulse 1.4s ease-in-out infinite;
}
@keyframes skeleton-pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.45; }
}

.insight {
  transition: box-shadow 0.5s ease;
}
.insight:hover {
  box-shadow: 0 24px 50px -24px rgb(26 14 43 / 0.45);
}
.insight .insight-icon {
  transition: transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
}
.insight:hover .insight-icon {
  transform: rotate(-12deg) scale(1.1);
}

@media (prefers-reduced-motion: reduce) {
  .kpi,
  .kpi:hover,
  .insight .insight-icon,
  .insight:hover .insight-icon {
    transform: none;
    transition: none;
  }
  .hero-glow,
  .trend-point,
  .skeleton {
    animation: none;
  }
  .trend-draw,
  .ring-fill,
  .service-bar,
  .dist-seg {
    transition: none;
  }
}
</style>
