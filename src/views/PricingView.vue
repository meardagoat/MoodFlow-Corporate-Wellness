<template>
  <div class="overflow-x-clip">
    <PageHero
      label="Tarifs"
      subtitle="Des tarifs transparents et flexibles pour toutes les tailles d'entreprise. Commencez gratuitement, évoluez selon vos besoins."
      :indicators="['Essai gratuit 14 jours', 'Sans engagement', 'Support inclus']"
      tone="#FED94E"
      disc="#FFF8EF"
      mood="very_happy"
      :dots="['#8248FE', '#FA4D52', '#11C1DC']"
    >
      Tarifs <span class="accent text-grape">MoodFlow</span>
    </PageHero>

    <!-- (01) Offres -->
    <section id="offres" class="relative pb-24 pt-20 md:pb-36 md:pt-28" aria-labelledby="pri-plans-title">
      <div class="shell">
        <div class="grid gap-10 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <p class="label text-ink/55">(01) Nos offres</p>
            <h2 id="pri-plans-title" v-split class="display mt-6 text-display-lg">
              Un prix <span class="accent text-grape">clair</span>, par personne.
            </h2>
          </div>

          <!-- Bascule mensuel / annuel -->
          <div v-reveal="0.1" class="lg:col-span-5 lg:justify-self-end">
            <div
              class="pri-toggle relative inline-grid grid-cols-2 rounded-full bg-ink p-1.5 text-paper"
              :class="{ 'is-yearly': isYearly }"
              role="radiogroup"
              aria-label="Période de facturation"
            >
              <span class="pri-toggle-pill" aria-hidden="true">
                <MoodFace :mood="isYearly ? 'very_happy' : 'neutral'" class="h-8 w-8 shrink-0 sm:h-9 sm:w-9" />
              </span>
              <button
                v-for="c in cycles"
                :key="c.id"
                type="button"
                role="radio"
                :aria-checked="billingCycle === c.id"
                class="pri-toggle-btn relative z-10 flex items-center justify-center gap-2 rounded-full py-4 pl-12 pr-5 text-base font-semibold sm:pl-14 sm:pr-7 sm:text-lg"
                :class="billingCycle === c.id ? 'text-ink' : 'text-paper/75 hover:text-paper'"
                @click="setCycle(c.id)"
                @keydown.left.prevent="setCycle('monthly')"
                @keydown.right.prevent="setCycle('yearly')"
              >
                {{ c.label }}
              </button>
              <span
                class="pri-save-badge pointer-events-none absolute -right-3 -top-5 z-20 rounded-full bg-coral px-3 py-1.5 text-sm font-bold text-ink shadow-[0_10px_24px_-10px_rgba(26,14,43,0.6)]"
                aria-hidden="true"
              >-20%</span>
            </div>
            <p class="mt-5 max-w-sm text-pretty text-ink/70 lg:text-right" aria-live="polite">
              <template v-if="isYearly">
                Facturation annuelle activée : jusqu'à <strong class="font-semibold text-ink">48 € économisés</strong> par employé et par an.
              </template>
              <template v-else>
                Passez à l'annuel et économisez <strong class="font-semibold text-ink">20 %</strong>, soit plus de deux mois offerts.
              </template>
            </p>
          </div>
        </div>

        <div class="mt-16 grid gap-5 md:mt-20 lg:grid-cols-3 lg:gap-4 xl:gap-6">
          <div
            v-for="(plan, i) in plans"
            :key="plan.id"
            v-reveal="i * 0.1"
            class="min-w-0"
            :class="plan.id === 'professional' ? 'lg:-my-5' : ''"
          >
          <article
            :ref="(el) => setPlanEl(el as HTMLElement | null, plan.id)"
            v-tilt="4"
            class="pri-card group relative flex h-full min-w-0 flex-col overflow-hidden rounded-[2.25rem] p-7 transition-shadow duration-500 md:grid md:grid-cols-2 md:gap-x-10 md:p-10 lg:flex lg:p-7 xl:p-10"
            :class="[
              plan.theme.card,
              plan.id === 'professional' ? 'lg:py-12 xl:py-14' : '',
              recommended === plan.id ? 'is-recommended' : '',
              flashPlan === plan.id ? 'is-flash' : '',
            ]"
            :aria-labelledby="`pri-plan-${plan.id}`"
            @pointerenter="hoverPlan = plan.id"
            @pointerleave="hoverPlan = null"
          >
            <!-- Soleil qui change d'expression selon l'offre et la période -->
            <div
              class="pointer-events-none absolute -right-14 -top-14 w-44 transition-transform duration-700 ease-out-expo group-hover:-translate-x-2 group-hover:translate-y-2 md:w-52 lg:-right-12 lg:-top-12 lg:w-36 xl:w-48"
              aria-hidden="true"
            >
              <SunMark :state="planMood(plan.id)" :disc="plan.theme.disc" :ray-colors="plan.theme.rays" :ray-count="18" />
            </div>

            <div class="relative md:col-start-1">
              <div class="flex flex-wrap items-center gap-2 pr-28 lg:pr-24">
                <span class="label" :class="plan.theme.muted">{{ String(i + 1).padStart(2, '0') }} / 03</span>
                <span
                  v-if="plan.id === 'professional'"
                  class="inline-flex rotate-[-3deg] items-center gap-1.5 rounded-full bg-sun px-3 py-1.5 text-xs font-bold uppercase tracking-wide text-ink"
                >
                  <Icon name="spark" class="h-3.5 w-3.5 text-coral" />
                  Populaire
                </span>
              </div>
              <h3 :id="`pri-plan-${plan.id}`" class="display mt-6 text-4xl tracking-[-0.045em] lg:text-[2.1rem] xl:text-5xl">{{ plan.name }}</h3>
              <p class="mt-3 max-w-[22ch] text-pretty text-lg leading-snug" :class="plan.theme.soft">{{ plan.tagline }}</p>

              <Transition name="pri-chip">
                <p
                  v-if="recommended === plan.id"
                  class="mt-5 inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold"
                  :class="plan.theme.chip"
                >
                  <span class="relative flex h-2 w-2"><span class="absolute inset-0 animate-ping rounded-full bg-current opacity-60" /><span class="relative h-2 w-2 rounded-full bg-current" /></span>
                  Idéal pour {{ employeesLabel }} personnes
                </p>
              </Transition>

              <div class="mt-8 min-h-[7.5rem] xl:min-h-[8.5rem]">
                <template v-if="plan.monthly !== null">
                  <div class="flex items-end gap-3">
                    <span
                      class="display leading-none tracking-[-0.06em]"
                      :class="plan.id === 'professional' ? 'text-[5.25rem] xl:text-[6.5rem]' : 'text-[4.5rem] xl:text-[5.5rem]'"
                    >
                      <Odometer :value="priceOf(plan)" :pad="2" /><span class="ml-1 align-top text-[0.42em] tracking-normal">€</span>
                    </span>
                    <span class="mb-2 flex flex-col text-sm leading-tight" :class="plan.theme.muted">
                      <s
                        class="font-semibold decoration-coral decoration-2 transition-opacity duration-500"
                        :class="isYearly ? 'opacity-100' : 'opacity-0'"
                        :aria-hidden="!isYearly"
                      >{{ plan.monthly }} €</s>
                      <span>/employé</span>
                      <span>/mois</span>
                    </span>
                  </div>
                  <p class="mt-3 text-sm" :class="plan.theme.muted">
                    <Transition name="pri-line" mode="out-in">
                      <span :key="billingCycle" class="inline-block">
                        {{ isYearly ? `Facturé ${(plan.yearly ?? 0) * 12} € par employé et par an` : 'Facturé chaque mois, sans engagement' }}
                      </span>
                    </Transition>
                  </p>
                </template>
                <template v-else>
                  <p class="display text-[3.4rem] leading-[0.9] tracking-[-0.055em] xl:text-[4.25rem]">Sur mesure</p>
                  <p class="mt-3 text-sm" :class="plan.theme.muted">Un tarif construit avec vous, selon votre organisation</p>
                </template>
              </div>

              <router-link
                :to="plan.cta.to"
                class="btn mt-8 w-full"
                :class="plan.theme.btn"
                v-magnetic="plan.id === 'professional' ? 0.15 : undefined"
              >
                <RollText :text="plan.cta.label" />
                <span v-if="plan.id === 'professional'" class="btn-dot hidden xl:grid"><Icon name="arrow-right" /></span>
              </router-link>
            </div>

            <ul
              class="relative mt-10 space-y-3.5 border-t pt-8 md:col-start-2 md:row-start-1 md:mt-0 md:border-l md:border-t-0 md:pl-10 md:pt-24 lg:mt-10 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8"
              :class="plan.theme.rule"
            >
              <li v-for="item in plan.features" :key="item" class="flex items-center gap-3">
                <span class="grid h-6 w-6 shrink-0 place-items-center rounded-full" :class="plan.theme.check">
                  <Icon :name="item.endsWith('+') ? 'plus' : 'check'" class="h-3.5 w-3.5" stroke-width="2.5" />
                </span>
                <span class="text-base xl:text-lg" :class="item.endsWith('+') ? 'font-semibold' : ''">{{ item }}</span>
              </li>
            </ul>
          </article>
          </div>
        </div>

        <p v-reveal class="mt-12 flex flex-wrap items-center gap-x-3 gap-y-2 text-ink/65 md:mt-16">
          <Icon name="info" class="h-4 w-4 shrink-0" />
          Vous hésitez ?
          <a href="#simulateur" class="link font-semibold text-ink" @click.prevent="goTo('simulateur')">Estimez votre budget en 5 secondes</a>
        </p>
      </div>
    </section>

    <!-- (02) Simulateur -->
    <section id="simulateur" class="relative scroll-mt-24 overflow-hidden bg-ink py-24 text-paper md:py-36" aria-labelledby="pri-sim-title">
      <div class="shell relative z-10">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-8">
            <p class="label text-paper/55">(02) Simulateur</p>
            <h2 id="pri-sim-title" v-split class="display mt-6 text-display-lg">
              Combien <span class="whitespace-nowrap">êtes-<span class="accent text-sun">vous</span>&nbsp;?</span>
            </h2>
          </div>
          <p v-reveal class="text-pretty text-lg text-paper/70 lg:col-span-4 md:text-xl">
            Faites glisser le curseur : nous vous recommandons l'offre adaptée et calculons votre budget en direct.
          </p>
        </div>

        <div class="mt-14 grid gap-6 md:mt-20 lg:grid-cols-12 lg:gap-8">
          <!-- Curseur + foule -->
          <div v-reveal class="rounded-[2.25rem] bg-paper/[0.06] p-6 ring-1 ring-paper/10 sm:p-8 lg:col-span-7 xl:p-10">
            <div class="flex flex-wrap items-end justify-between gap-4">
              <div>
                <p class="label text-paper/55">Taille de votre équipe</p>
                <p class="display mt-4 flex items-end text-[4.5rem] leading-none tracking-[-0.06em] sm:text-[6rem] xl:text-[7.5rem]">
                  <Odometer :value="employees" :pad="1" /><span v-if="isMaxStep" class="text-sun">+</span>
                </p>
                <p class="mt-2 text-paper/60">employés</p>
              </div>
              <div class="inline-flex rounded-full bg-paper/10 p-1" role="radiogroup" aria-label="Période de facturation du simulateur">
                <button
                  v-for="c in cycles"
                  :key="c.id"
                  type="button"
                  role="radio"
                  :aria-checked="billingCycle === c.id"
                  class="rounded-full px-4 py-2 text-sm font-semibold transition-colors duration-300"
                  :class="billingCycle === c.id ? 'bg-sun text-ink' : 'text-paper/70 hover:text-paper'"
                  @click="setCycle(c.id)"
                >
                  {{ c.label }}
                </button>
              </div>
            </div>

            <!-- Curseur stylé -->
            <div class="pri-range relative mt-12" :style="{ '--p': progress }">
              <div class="pointer-events-none relative h-3" aria-hidden="true">
                <div class="absolute inset-x-0 top-0 h-3 rounded-full bg-paper/10" />
                <div class="absolute inset-x-7 top-0 h-3">
                  <span
                    v-for="z in zones"
                    :key="z.id"
                    class="absolute top-0 h-3 transition-colors duration-500"
                    :class="[z.round, recommended === z.id ? z.bar : 'bg-paper/15']"
                    :style="{ left: `${z.from * 100}%`, width: `${(z.to - z.from) * 100}%` }"
                  />
                </div>
                <div class="pri-range-thumb absolute top-1/2">
                  <span class="grid h-14 w-14 place-items-center rounded-full bg-paper shadow-[0_12px_30px_-8px_rgba(0,0,0,0.6)]">
                    <MoodFace :mood="thumbMood" :color="thumbColor" class="h-11 w-11" />
                  </span>
                </div>
              </div>
              <input
                id="pri-employees"
                v-model.number="stepIndex"
                type="range"
                min="0"
                :max="STEPS.length - 1"
                step="1"
                class="pri-range-input absolute inset-x-0 -top-6 h-14 w-full cursor-grab active:cursor-grabbing"
                aria-label="Nombre d'employés"
                :aria-valuetext="`${employeesLabel} employés, offre ${recommendedPlan.name}`"
              />
              <div class="relative mx-7 mt-6 h-12 text-sm" aria-hidden="true">
                <span
                  v-for="t in ticks"
                  :key="t.label"
                  class="absolute top-0 flex -translate-x-1/2 flex-col items-center gap-1.5 whitespace-nowrap text-paper/55"
                  :style="{ left: `${t.at * 100}%` }"
                >
                  <span class="h-2 w-px bg-paper/30" />
                  {{ t.label }}
                </span>
              </div>
              <div class="relative mx-7 mt-1 h-4" aria-hidden="true">
                <span
                  v-for="z in zones"
                  :key="z.id"
                  class="label absolute top-0 -translate-x-1/2 whitespace-nowrap transition-colors duration-500"
                  :class="recommended === z.id ? 'text-paper' : 'text-paper/35'"
                  :style="{ left: `${((z.from + z.to) / 2) * 100}%` }"
                >{{ z.id === 'professional' ? 'Pro' : z.name }}</span>
              </div>
            </div>

            <!-- Votre équipe, visage par visage -->
            <div class="mt-10 border-t border-paper/10 pt-8">
              <p class="label text-paper/55">Votre équipe, en un coup d'œil</p>
              <ul class="mt-5 grid grid-cols-10 gap-1.5 sm:gap-2.5" aria-hidden="true">
                <li v-for="(m, i) in crowd" :key="i" class="relative aspect-square">
                  <span class="absolute inset-0 rounded-full border border-dashed border-paper/15" />
                  <MoodFace
                    :mood="m"
                    class="pri-crowd-face absolute inset-0 h-full w-full"
                    :class="{ 'is-on': i <= stepIndex }"
                    :style="{ '--k': i % 10 }"
                  />
                </li>
              </ul>
            </div>
          </div>

          <!-- Résultat -->
          <div v-reveal="0.1" class="flex lg:col-span-5">
          <div
            class="relative flex w-full flex-col overflow-hidden rounded-[2.25rem] p-6 transition-colors duration-700 ease-out-expo sm:p-8 xl:p-10"
            :class="recommendedPlan.theme.result"
          >
            <div class="pointer-events-none absolute -right-12 -top-12 w-28 sm:-right-14 sm:-top-14 sm:w-44 lg:w-32 xl:w-44" aria-hidden="true">
              <SunMark :state="recommended === 'starter' ? 'happy' : 'very_happy'" :disc="recommendedPlan.theme.disc" :ray-colors="recommendedPlan.theme.rays" />
            </div>

            <p class="label relative opacity-70">Notre recommandation</p>
            <div class="relative mt-5 h-[3rem] overflow-hidden sm:h-[4.1rem] lg:h-[3.2rem] xl:h-[4.1rem]">
              <Transition name="pri-roll">
                <p :key="recommended" class="display absolute inset-x-0 top-0 text-[2.6rem] leading-[1.1] tracking-[-0.05em] sm:text-[3.6rem] lg:text-[2.75rem] xl:text-[3.6rem]">
                  {{ recommendedPlan.name }}
                </p>
              </Transition>
            </div>
            <p class="relative mt-1 opacity-75">{{ recommendedPlan.limit }} · {{ recommendedPlan.tagline }}</p>

            <dl class="relative mt-8 grid gap-5 border-t pt-7" :class="recommendedPlan.theme.rule">
              <template v-if="recommendedPlan.monthly !== null">
                <div class="flex items-baseline justify-between gap-4">
                  <dt class="opacity-75">Prix par employé</dt>
                  <dd class="font-display text-2xl font-bold tracking-tight">{{ priceOf(recommendedPlan) }} € <span class="text-base font-medium opacity-70">/mois</span></dd>
                </div>
                <div>
                  <dt class="opacity-75">{{ isYearly ? 'Soit, par mois' : 'Total mensuel' }}</dt>
                  <dd class="display mt-2 flex items-end text-[3.4rem] leading-none tracking-[-0.055em] sm:text-[4.25rem]">
                    <Odometer :value="monthlyTotal" :pad="3" /><span class="ml-2 text-[0.45em] tracking-normal">€</span>
                  </dd>
                  <dd class="mt-2 text-sm opacity-75">
                    {{ isYearly ? `Facturé ${formatNumber(monthlyTotal * 12)} € par an` : `${formatNumber(monthlyTotal * 12)} € sur 12 mois` }}
                  </dd>
                </div>
              </template>
              <div v-else>
                <dt class="opacity-75">Budget</dt>
                <dd class="display mt-2 text-[3rem] leading-none tracking-[-0.05em] sm:text-[3.6rem]">Sur mesure</dd>
                <dd class="mt-3 max-w-xs text-pretty opacity-80">Au-delà de 500 personnes, nous construisons avec vous une offre adaptée à votre organisation.</dd>
              </div>
            </dl>

            <div class="relative mt-auto pt-8">
              <p v-if="recommendedPlan.monthly !== null" class="mb-5">
                <span v-if="isYearly" class="inline-flex items-center gap-2 rounded-full bg-paper px-3 py-1.5 text-sm font-semibold text-ink">
                  <Icon name="gift" class="h-4 w-4 text-coral" />
                  {{ formatNumber(yearlySaving) }} € économisés par an
                </span>
                <button
                  v-else
                  type="button"
                  class="inline-flex items-center gap-2 rounded-full border border-current px-3 py-1.5 text-left text-sm font-semibold transition-colors hover:bg-paper hover:text-ink"
                  @click="setCycle('yearly')"
                >
                  <Icon name="gift" class="h-4 w-4 shrink-0" />
                  Passez à l'annuel : {{ formatNumber(yearlySaving) }} € économisés
                </button>
              </p>
              <div class="flex flex-wrap gap-3">
                <router-link :to="recommendedPlan.cta.to" class="btn" :class="recommendedPlan.theme.resultBtn">
                  <RollText :text="recommendedPlan.cta.label" />
                </router-link>
                <button type="button" class="btn" :class="recommendedPlan.theme.ghost" @click="showPlan(recommended)">
                  <RollText text="Voir l'offre" />
                  <span class="btn-dot" :class="recommended === 'professional' ? '!text-grape' : ''"><Icon name="arrow-up" /></span>
                </button>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </section>

    <!-- (03) Engagements -->
    <section aria-labelledby="pri-trust-title">
      <div class="border-y border-ink bg-coral py-5 md:py-6">
        <Marquee :speed="38" :repeat="2" reactive>
          <span
            v-for="g in guaranteeStrip"
            :key="g.text"
            class="flex items-center gap-6 pr-6 font-display text-2xl font-bold tracking-[-0.03em] md:gap-8 md:pr-8 md:text-4xl"
          >
            {{ g.text }}
            <MoodFace :mood="g.mood" class="h-9 w-9 md:h-11 md:w-11" />
          </span>
        </Marquee>
      </div>

      <div class="shell py-24 md:py-36">
        <div class="grid gap-8 lg:grid-cols-12 lg:items-end">
          <div class="lg:col-span-7">
            <p class="label text-ink/55">(03) Nos engagements</p>
            <h2 id="pri-trust-title" v-split class="display mt-6 text-display-lg">
              Zéro <span class="accent text-coral">mauvaise</span> surprise.
            </h2>
          </div>
          <p v-reveal class="text-pretty text-lg text-ink/70 md:text-xl lg:col-span-4 lg:col-start-9">
            Ce que vous voyez ici est ce que vous payez. Et vous restez libre, à chaque instant.
          </p>
        </div>

        <ul class="mt-14 grid gap-4 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          <li
            v-for="(g, i) in guarantees"
            :key="g.title"
            v-reveal="(i % 3) * 0.08"
            v-tilt="5"
            class="group relative flex min-h-[15rem] flex-col justify-between overflow-hidden rounded-[2rem] p-7 md:p-8"
            :class="g.card"
          >
            <div class="flex items-start justify-between gap-4">
              <span class="grid h-12 w-12 place-items-center rounded-full" :class="g.dot">
                <Icon :name="g.icon" class="h-5 w-5" />
              </span>
              <span class="label opacity-55">{{ String(i + 1).padStart(2, '0') }}</span>
            </div>
            <div class="mt-10">
              <h3 class="display text-2xl leading-[1.05] tracking-[-0.035em] md:text-[1.75rem]">{{ g.title }}</h3>
              <p class="mt-3 text-pretty opacity-75">{{ g.text }}</p>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- (04) Comparatif -->
    <section id="comparatif" class="bg-paper-deep/60 py-24 md:py-36" aria-labelledby="pri-compare-title">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-ink/55">(04) Comparatif</p>
            <h2 id="pri-compare-title" v-split class="display mt-6 text-display-lg">Comparaison des fonctionnalités</h2>
          </div>
          <p v-reveal class="text-pretty text-xl text-ink/75 md:col-span-4 md:col-start-9">
            Découvrez toutes les fonctionnalités incluses dans chaque plan
          </p>
        </div>

        <!-- Mobile : sélecteur d'offre -->
        <div class="mt-12 md:hidden">
          <div
            class="pri-sticky sticky z-20 -mx-5 bg-paper-deep px-5 py-3 sm:-mx-8 sm:px-8"
            :style="{ top: stickyTop }"
          >
            <div class="relative grid grid-cols-3 rounded-full bg-ink/[0.07] p-1" role="tablist" aria-label="Choisir une offre à comparer">
              <span
                class="absolute inset-y-1 left-1 w-[calc((100%-0.5rem)/3)] rounded-full transition-[transform,background-color] duration-500 ease-out-expo"
                :class="plans[mobilePlanIndex].theme.tab"
                :style="{ transform: `translateX(${mobilePlanIndex * 100}%)` }"
                aria-hidden="true"
              />
              <button
                v-for="(plan, i) in plans"
                :id="`pri-tab-${plan.id}`"
                :key="plan.id"
                type="button"
                role="tab"
                :aria-selected="mobilePlan === plan.id"
                aria-controls="pri-tabpanel"
                class="relative z-10 truncate rounded-full px-1 py-3 text-sm font-semibold transition-colors duration-300"
                :class="mobilePlan === plan.id ? (i === 0 ? 'text-ink' : 'text-paper') : 'text-ink/70'"
                @click="mobilePlan = plan.id"
              >
                {{ plan.id === 'professional' ? 'Pro' : plan.name }}
              </button>
            </div>
          </div>

          <div id="pri-tabpanel" role="tabpanel" :aria-labelledby="`pri-tab-${mobilePlan}`" class="mt-4 overflow-hidden rounded-[1.75rem] bg-paper">
            <div class="flex items-center justify-between gap-4 p-5" :class="plans[mobilePlanIndex].theme.head">
              <div>
                <p class="display text-2xl tracking-[-0.04em]">{{ plans[mobilePlanIndex].name }}</p>
                <p class="text-sm opacity-75">{{ plans[mobilePlanIndex].limit }}</p>
              </div>
              <p class="text-right font-display text-xl font-bold leading-tight">
                <template v-if="plans[mobilePlanIndex].monthly !== null">{{ priceOf(plans[mobilePlanIndex]) }} €<span class="block text-xs font-medium opacity-70">/employé/mois</span></template>
                <template v-else>Sur mesure</template>
              </p>
            </div>
            <div v-for="group in featureGroups" :key="group.name">
              <p class="label flex items-center gap-2 bg-ink/[0.04] px-5 py-3 text-ink/60">
                <span class="h-2 w-2 rounded-full" :class="group.dot" />
                {{ group.name }}
              </p>
              <ul>
                <li
                  v-for="feature in group.items"
                  :key="feature.name"
                  class="flex items-center justify-between gap-4 border-b border-ink/[0.07] px-5 py-4 last:border-0"
                >
                  <span :class="feature[mobilePlan] ? 'font-medium' : 'text-ink/45'">{{ feature.name }}</span>
                  <span
                    v-if="feature[mobilePlan]"
                    class="grid h-7 w-7 shrink-0 place-items-center rounded-full bg-ink text-paper"
                  >
                    <Icon name="check" class="h-3.5 w-3.5" stroke-width="2.5" /><span class="sr-only">Inclus</span>
                  </span>
                  <span v-else class="shrink-0 text-xs font-medium text-ink/40">
                    <span aria-hidden="true">—</span><span class="sr-only">Non inclus</span>
                  </span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <!-- Tablette & desktop : tableau à en-tête collant -->
        <div v-reveal class="mt-16 hidden rounded-[2rem] bg-paper md:block">
          <table class="w-full border-separate border-spacing-0 text-left">
            <caption class="sr-only">Comparaison des fonctionnalités par offre</caption>
            <thead>
              <tr>
                <th
                  scope="col"
                  class="pri-sticky sticky z-20 w-[40%] rounded-tl-[2rem] border-b border-ink/15 bg-paper px-6 py-6 align-bottom md:px-8"
                  :style="{ top: stickyTop }"
                >
                  <span class="label text-ink/55">Fonctionnalités</span>
                </th>
                <th
                  v-for="(plan, i) in plans"
                  :key="plan.id"
                  scope="col"
                  class="pri-sticky sticky z-20 w-[20%] border-b border-ink/15 px-3 py-5 text-center align-bottom"
                  :class="[plan.id === 'professional' ? 'bg-[#F0E8FF]' : 'bg-paper', i === 2 ? 'rounded-tr-[2rem]' : '']"
                  :style="{ top: stickyTop }"
                >
                  <MoodFace :mood="plan.face" :color="plan.theme.disc" class="mx-auto h-9 w-9" />
                  <span class="mt-2 block font-display text-lg font-bold tracking-tight" :class="plan.id === 'professional' ? 'text-grape' : ''">{{ plan.name }}</span>
                  <span class="block text-sm font-medium text-ink/55">
                    {{ plan.monthly !== null ? `${priceOf(plan)} € /emp./mois` : 'Sur mesure' }}
                  </span>
                </th>
              </tr>
            </thead>
            <tbody v-for="group in featureGroups" :key="group.name">
              <tr>
                <th colspan="4" scope="colgroup" class="border-b border-ink/10 bg-ink/[0.035] px-6 pb-3 pt-8 md:px-8">
                  <span class="label flex items-center gap-2 text-ink/60">
                    <span class="h-2 w-2 rounded-full" :class="group.dot" />
                    {{ group.name }}
                  </span>
                </th>
              </tr>
              <tr v-for="feature in group.items" :key="feature.name" class="pri-row">
                <th scope="row" class="border-b border-ink/[0.07] px-6 py-4 font-medium md:px-8">{{ feature.name }}</th>
                <td
                  v-for="plan in plans"
                  :key="plan.id"
                  class="border-b border-ink/[0.07] px-3 py-4 text-center"
                  :class="plan.id === 'professional' ? 'bg-grape/[0.07]' : ''"
                >
                  <span v-if="feature[plan.id]" class="pri-check inline-grid h-7 w-7 place-items-center rounded-full bg-ink text-paper">
                    <Icon name="check" class="h-3.5 w-3.5" stroke-width="2.5" />
                    <span class="sr-only">Inclus</span>
                  </span>
                  <span v-else class="text-ink/25">—<span class="sr-only">Non inclus</span></span>
                </td>
              </tr>
            </tbody>
            <tfoot>
              <tr>
                <td class="rounded-bl-[2rem] px-6 py-7 md:px-8">
                  <span class="text-sm text-ink/55">Changez d'offre à tout moment, sans frais.</span>
                </td>
                <td v-for="(plan, i) in plans" :key="plan.id" class="px-3 py-7 text-center" :class="[plan.id === 'professional' ? 'bg-grape/[0.07]' : '', i === 2 ? 'rounded-br-[2rem]' : '']">
                  <router-link :to="plan.cta.to" class="btn btn-sm" :class="plan.id === 'professional' ? 'btn-grape' : 'btn-outline'">
                    {{ plan.id === 'enterprise' ? 'Contact' : 'Choisir' }}
                  </router-link>
                </td>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>

    <!-- (05) FAQ -->
    <section class="py-24 md:py-36" aria-labelledby="pri-faq-title">
      <div class="shell grid gap-12 lg:grid-cols-12">
        <div class="lg:col-span-4">
          <div class="lg:sticky lg:top-28">
            <p class="label text-ink/55">(05) FAQ</p>
            <h2 id="pri-faq-title" v-split class="display mt-6 text-display-lg lg:text-display-md">Questions fréquentes</h2>
            <div v-reveal class="mt-10 flex items-center gap-4 rounded-[1.75rem] bg-lilac/60 p-5">
              <MoodFace mood="peek" class="h-14 w-14 shrink-0" color="#FED94E" />
              <p class="text-pretty leading-snug">
                Une autre question ?
                <router-link to="/contact" class="link font-semibold">Écrivez-nous</router-link>, nous répondons sous 24h.
              </p>
            </div>
          </div>
        </div>
        <div class="lg:col-span-8">
          <FaqList :items="faqs" :open="openFaqs" @toggle="toggleFaq" />
        </div>
      </div>
    </section>

    <!-- CTA final -->
    <section class="relative overflow-hidden bg-grape pb-40 pt-24 text-paper md:pb-52 md:pt-36">
      <div class="shell relative z-10">
        <p class="label text-paper/60">(06) C'est parti</p>
        <h2 v-split class="display mt-8 max-w-[12ch] text-display-xl">Prêt à <span class="whitespace-nowrap">commencer ?</span></h2>

        <div class="mt-12 max-w-3xl md:mt-16">
          <p v-reveal class="max-w-xl text-pretty text-xl leading-snug text-paper/85 md:text-2xl">
            Rejoignez des milliers d'entreprises qui ont déjà transformé leur bien-être au travail
          </p>
          <div v-reveal="0.1" class="mt-8 inline-flex max-w-full flex-wrap items-center gap-x-3 gap-y-2 rounded-[1.5rem] bg-ink/20 px-5 py-4 ring-1 ring-paper/15">
            <MoodFace :mood="thumbMood" :color="thumbColor" class="h-8 w-8 shrink-0" />
            <span class="label text-paper/60">Votre sélection</span>
            <span class="font-semibold">
              {{ recommendedPlan.name }} · {{ employeesLabel }} employés ·
              <template v-if="recommendedPlan.monthly !== null">{{ formatNumber(monthlyTotal) }} € /mois ({{ isYearly ? 'annuel' : 'mensuel' }})</template>
              <template v-else>sur mesure</template>
            </span>
            <a href="#simulateur" class="link text-sm font-semibold text-sun" @click.prevent="goTo('simulateur')">Modifier</a>
          </div>
          <div v-reveal="0.15" class="mt-10 flex flex-wrap gap-3">
            <router-link to="/demo" class="btn btn-sun btn-lg" v-magnetic>
              <RollText text="Essayer gratuitement" />
              <span class="btn-dot"><Icon name="arrow-right" /></span>
            </router-link>
            <router-link to="/contact" class="btn btn-outline-light btn-lg">
              <RollText text="Nous contacter" />
            </router-link>
          </div>
        </div>
      </div>
      <div class="pointer-events-none absolute -bottom-[22vw] -right-[10vw] w-[70vw] md:-bottom-[16vw] md:w-[46vw] lg:-bottom-[10vw] lg:w-[42vw]" aria-hidden="true">
        <div v-parallax="0.2">
          <SunMark :state="isYearly ? 'very_happy' : 'happy'" :ray-colors="['#FED94E', '#FF5BBC']" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, defineComponent, h, onMounted, onUnmounted, ref, type PropType } from 'vue';
import PageHero from '../components/site/PageHero.vue';
import FaqList from '../components/site/FaqList.vue';
import SunMark from '../components/brand/SunMark.vue';
import MoodFace from '../components/brand/MoodFace.vue';
import Icon from '../components/ui/Icon.vue';
import type { IconName } from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import Marquee from '../components/ui/Marquee.vue';
import { scrollToElement } from '../lib/motion';
import type { FaceState, MoodValue } from '../lib/moods';

/* ------------------------------------------------------------------
   Compteur « à rouleaux » : chaque chiffre tourne indépendamment
   ------------------------------------------------------------------ */
const DIGITS = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

const Odometer = defineComponent({
  name: 'PriOdometer',
  props: {
    value: { type: Number as PropType<number>, required: true },
    pad: { type: Number as PropType<number>, default: 1 },
  },
  setup(props) {
    return () => {
      const str = String(Math.max(0, Math.round(props.value)));
      const len = str.length;
      const cols = Math.max(props.pad, len);
      const nodes = [];
      for (let i = cols - 1; i >= 0; i--) {
        const blank = i >= len;
        const d = blank ? 0 : Number(str[len - 1 - i]);
        nodes.push(
          h(
            'span',
            { key: `d${i}`, class: ['pri-odo-col', { 'is-blank': blank }], style: { '--d': d, '--i': i } },
            [h('span', { class: 'pri-odo-strip' }, DIGITS.map((n) => h('span', n)))],
          ),
        );
        if (i > 0 && i % 3 === 0) {
          nodes.push(h('span', { key: `s${i}`, class: ['pri-odo-sep', { 'is-blank': i >= len }] }));
        }
      }
      return h('span', { class: 'pri-odo' }, [
        h('span', { class: 'sr-only' }, formatNumber(props.value)),
        h('span', { class: 'pri-odo-vis', 'aria-hidden': 'true' }, nodes),
      ]);
    };
  },
});

/* ------------------------------------------------------------------
   Données
   ------------------------------------------------------------------ */
type Cycle = 'monthly' | 'yearly';
type PlanId = 'starter' | 'professional' | 'enterprise';

interface Plan {
  id: PlanId;
  name: string;
  tagline: string;
  limit: string;
  monthly: number | null;
  yearly: number | null;
  face: MoodValue;
  features: string[];
  cta: { to: string; label: string };
  theme: Record<'card' | 'soft' | 'muted' | 'btn' | 'resultBtn' | 'ghost' | 'check' | 'rule' | 'chip' | 'result' | 'tab' | 'head' | 'disc', string> & { rays: string[] };
}

const cycles: { id: Cycle; label: string }[] = [
  { id: 'monthly', label: 'Mensuel' },
  { id: 'yearly', label: 'Annuel' },
];

const billingCycle = ref<Cycle>('monthly');
const isYearly = computed(() => billingCycle.value === 'yearly');
const setCycle = (c: Cycle) => {
  billingCycle.value = c;
};

const starterFeatures = [
  'Jusqu\'à 50 employés',
  'Expression libre anonyme',
  'Dashboard de base',
  'Support email',
  'Rapports mensuels',
];

const professionalFeatures = [
  'Jusqu\'à 500 employés',
  'Tout Starter +',
  'Insights en temps réel',
  'Actions ciblées',
  'Support prioritaire',
  'Rapports hebdomadaires',
  'Intégrations API',
];

const enterpriseFeatures = [
  'Employés illimités',
  'Tout Professional +',
  'Déploiement sur site',
  'Support dédié 24/7',
  'Formation personnalisée',
  'SLA garantie',
  'Conformité avancée',
];

const plans: Plan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Parfait pour les petites équipes qui commencent',
    limit: 'Jusqu\'à 50 employés',
    monthly: 10,
    yearly: 8,
    face: 'happy',
    features: starterFeatures,
    cta: { to: '/register', label: 'Commencer gratuitement' },
    theme: {
      card: 'bg-white text-ink ring-1 ring-ink/10',
      soft: 'text-ink/70',
      muted: 'text-ink/55',
      btn: 'btn-outline',
      resultBtn: 'btn-ink',
      ghost: 'btn-outline',
      check: 'bg-aqua text-ink',
      rule: 'border-ink/10',
      chip: 'bg-aqua text-ink',
      result: 'bg-aqua text-ink',
      tab: 'bg-aqua',
      head: 'bg-aqua text-ink',
      disc: '#5EDDE7',
      rays: ['#8248FE', '#FA4D52'],
    },
  },
  {
    id: 'professional',
    name: 'Professional',
    tagline: 'Pour les entreprises en croissance',
    limit: 'Jusqu\'à 500 employés',
    monthly: 20,
    yearly: 16,
    face: 'very_happy',
    features: professionalFeatures,
    cta: { to: '/register', label: 'Essayer 30 jours gratuits' },
    theme: {
      card: 'bg-grape text-paper',
      soft: 'text-paper/80',
      muted: 'text-paper/65',
      btn: 'btn-sun',
      resultBtn: 'btn-sun',
      ghost: 'btn-outline-light',
      check: 'bg-sun text-ink',
      rule: 'border-paper/20',
      chip: 'bg-sun text-ink',
      result: 'bg-grape text-paper',
      tab: 'bg-grape',
      head: 'bg-grape text-paper',
      disc: '#FED94E',
      rays: ['#FF5BBC', '#FFF8EF'],
    },
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    tagline: 'Pour les grandes organisations',
    limit: 'Employés illimités',
    monthly: null,
    yearly: null,
    face: 'very_happy',
    features: enterpriseFeatures,
    cta: { to: '/contact', label: 'Nous contacter' },
    theme: {
      card: 'bg-ink text-paper ring-1 ring-paper/10',
      soft: 'text-paper/75',
      muted: 'text-paper/55',
      btn: 'btn-paper',
      resultBtn: 'btn-ink',
      ghost: 'btn-outline',
      check: 'bg-candy text-ink',
      rule: 'border-paper/15',
      chip: 'bg-candy text-ink',
      result: 'bg-candy text-ink',
      tab: 'bg-ink',
      head: 'bg-ink text-paper',
      disc: '#FF5BBC',
      rays: ['#FED94E', '#8248FE'],
    },
  },
];

const planById = (id: PlanId) => plans.find((p) => p.id === id) ?? plans[0];
const priceOf = (plan: Plan) => (isYearly.value ? plan.yearly : plan.monthly) ?? 0;

/* ------------------------------------------------------------------
   Simulateur
   ------------------------------------------------------------------ */
const STEPS = [
  5, 10, 15, 20, 25, 30, 35, 40, 45, 50,
  75, 100, 125, 150, 175, 200, 225, 250, 275, 300, 325, 350, 375, 400, 425, 450, 475, 500,
  600, 700, 800, 900, 1000, 1250, 1500, 2000, 2500, 3000, 4000, 5000,
];
const LAST = STEPS.length - 1;
const STARTER_END = STEPS.indexOf(50);
const PRO_END = STEPS.indexOf(500);

const stepIndex = ref(STEPS.indexOf(150));
const employees = computed(() => STEPS[stepIndex.value] ?? STEPS[0]);
const isMaxStep = computed(() => stepIndex.value >= LAST);
const progress = computed(() => stepIndex.value / LAST);

const recommended = computed<PlanId>(() =>
  employees.value <= 50 ? 'starter' : employees.value <= 500 ? 'professional' : 'enterprise',
);
const recommendedPlan = computed(() => planById(recommended.value));

const monthlyTotal = computed(() => employees.value * priceOf(recommendedPlan.value));
const yearlySaving = computed(() => {
  const p = recommendedPlan.value;
  return employees.value * ((p.monthly ?? 0) - (p.yearly ?? 0)) * 12;
});

const formatNumber = (n: number) => new Intl.NumberFormat('fr-FR').format(Math.round(n)).replace(/\u202f|\u00a0/g, ' ');
const employeesLabel = computed(() => `${formatNumber(employees.value)}${isMaxStep.value ? '+' : ''}`);

const thumbMood = computed<MoodValue>(() => (recommended.value === 'starter' ? 'happy' : 'very_happy'));
const thumbColor = computed(() => recommendedPlan.value.theme.disc);

const zones: { id: PlanId; name: string; from: number; to: number; bar: string; round: string }[] = [
  { id: 'starter', name: 'Starter', from: 0, to: STARTER_END / LAST, bar: 'bg-aqua', round: 'rounded-l-full' },
  { id: 'professional', name: 'Professional', from: STARTER_END / LAST, to: PRO_END / LAST, bar: 'bg-sun', round: 'border-x-2 border-ink' },
  { id: 'enterprise', name: 'Enterprise', from: PRO_END / LAST, to: 1, bar: 'bg-candy', round: 'rounded-r-full' },
];

const ticks = [
  { label: '5', at: 0 },
  { label: '50', at: STARTER_END / LAST },
  { label: '500', at: PRO_END / LAST },
  { label: '5 000+', at: 1 },
];

// Une foule de visages : un visage de plus à chaque cran du curseur
const CROWD_MOODS: MoodValue[] = ['very_happy', 'happy', 'neutral', 'very_happy', 'sad', 'happy', 'very_sad', 'very_happy', 'happy', 'neutral'];
const crowd = STEPS.map((_, i) => CROWD_MOODS[(i * 7 + Math.floor(i / 10) * 3) % CROWD_MOODS.length]);

/* ------------------------------------------------------------------
   Cartes : expression du soleil, recommandation, défilement
   ------------------------------------------------------------------ */
const hoverPlan = ref<PlanId | null>(null);
const flashPlan = ref<PlanId | null>(null);
const planEls: Partial<Record<PlanId, HTMLElement>> = {};
let flashTimer = 0;

function setPlanEl(el: HTMLElement | null, id: PlanId) {
  if (el) planEls[id] = el;
}

function planMood(id: PlanId): FaceState {
  if (hoverPlan.value === id) return 'very_happy';
  if (id === 'enterprise') return 'peek';
  if (id === 'starter') return isYearly.value ? 'happy' : 'neutral';
  return isYearly.value ? 'very_happy' : 'happy';
}

function showPlan(id: PlanId) {
  scrollToElement(planEls[id] ?? null, -140);
  window.clearTimeout(flashTimer);
  flashPlan.value = null;
  flashTimer = window.setTimeout(() => {
    flashPlan.value = id;
    flashTimer = window.setTimeout(() => (flashPlan.value = null), 1600);
  }, 700);
}

function goTo(id: string) {
  scrollToElement(document.getElementById(id), -40);
}

/* ------------------------------------------------------------------
   Comparatif : sélecteur mobile + en-tête collant sous le header
   ------------------------------------------------------------------ */
const mobilePlan = ref<PlanId>('professional');
const mobilePlanIndex = computed(() => plans.findIndex((p) => p.id === mobilePlan.value));

const headerHidden = ref(false);
const stickyTop = computed(() => (headerHidden.value ? '0px' : 'var(--header-h, 5rem)'));
let lastY = 0;

// Même logique que le header : caché en descendant, visible en remontant
function onScroll() {
  const y = window.scrollY;
  if (y > 180 && y > lastY + 2) headerHidden.value = true;
  if (y < lastY - 2 || y <= 180) headerHidden.value = false;
  lastY = y;
}

type Feature = { name: string } & Record<PlanId, boolean>;

const features: Feature[] = [
  { name: 'Expression libre anonyme', starter: true, professional: true, enterprise: true },
  { name: 'Dashboard de base', starter: true, professional: true, enterprise: true },
  { name: 'Rapports mensuels', starter: true, professional: true, enterprise: true },
  { name: 'Support email', starter: true, professional: true, enterprise: true },
  { name: 'Insights en temps réel', starter: false, professional: true, enterprise: true },
  { name: 'Actions ciblées', starter: false, professional: true, enterprise: true },
  { name: 'Support prioritaire', starter: false, professional: true, enterprise: true },
  { name: 'Rapports hebdomadaires', starter: false, professional: true, enterprise: true },
  { name: 'Intégrations API', starter: false, professional: true, enterprise: true },
  { name: 'Déploiement sur site', starter: false, professional: false, enterprise: true },
  { name: 'Support dédié 24/7', starter: false, professional: false, enterprise: true },
  { name: 'Formation personnalisée', starter: false, professional: false, enterprise: true },
  { name: 'SLA garantie', starter: false, professional: false, enterprise: true },
  { name: 'Conformité avancée', starter: false, professional: false, enterprise: true },
];

const featureGroups = [
  { name: 'L\'essentiel', dot: 'bg-aqua', items: features.slice(0, 4) },
  { name: 'Piloter et agir', dot: 'bg-sun', items: features.slice(4, 9) },
  { name: 'Grandes organisations', dot: 'bg-candy', items: features.slice(9) },
];

/* ------------------------------------------------------------------
   Engagements
   ------------------------------------------------------------------ */
const guaranteeStrip: { text: string; mood: MoodValue }[] = [
  { text: 'Essai gratuit 14 jours', mood: 'very_happy' },
  { text: 'Sans engagement', mood: 'happy' },
  { text: 'Aucun frais de configuration', mood: 'neutral' },
  { text: 'Données hébergées en Europe', mood: 'sad' },
  { text: 'Support inclus', mood: 'very_happy' },
];

const guarantees: { title: string; text: string; icon: IconName; card: string; dot: string }[] = [
  { title: 'Sans engagement', text: 'Annulez à tout moment depuis votre tableau de bord. Aucun frais d\'annulation.', icon: 'refresh', card: 'bg-sun text-ink', dot: 'bg-ink text-sun' },
  { title: 'Aucun frais de configuration', text: 'Vous payez uniquement le montant mensuel ou annuel de votre plan.', icon: 'ban', card: 'bg-white text-ink ring-1 ring-ink/10', dot: 'bg-coral text-ink' },
  { title: 'Un plan qui suit votre croissance', text: 'Changez de plan quand vous voulez : l\'effet est immédiat, la facturation ajustée.', icon: 'trending', card: 'bg-grape text-paper', dot: 'bg-paper text-grape' },
  { title: 'Données protégées', text: 'Chiffrement de bout en bout, serveurs en Europe, conformité RGPD. Jamais partagées.', icon: 'shield', card: 'bg-ink text-paper', dot: 'bg-aqua text-ink' },
  { title: 'Pas de coupure', text: 'Vous dépassez votre nombre d\'employés ? Vous continuez à utiliser MoodFlow sans interruption.', icon: 'activity', card: 'bg-blush text-ink', dot: 'bg-ink text-paper' },
  { title: 'Tarifs solidaires', text: 'Des conditions préférentielles pour les associations et les établissements d\'enseignement.', icon: 'heart', card: 'bg-aqua text-ink', dot: 'bg-ink text-aqua' },
];

/* ------------------------------------------------------------------
   FAQ
   ------------------------------------------------------------------ */
const openFaqs = ref<number[]>([]);

const faqs = [
  {
    question: 'Puis-je changer de plan à tout moment ?',
    answer: 'Oui, vous pouvez upgrader ou downgrader votre plan à tout moment. Les changements prennent effet immédiatement et nous ajustons la facturation en conséquence.'
  },
  {
    question: 'Y a-t-il des frais de configuration ?',
    answer: 'Non, il n\'y a aucun frais de configuration. Vous payez uniquement le montant mensuel ou annuel selon votre plan choisi.'
  },
  {
    question: 'Que se passe-t-il si je dépasse le nombre d\'employés de mon plan ?',
    answer: 'Nous vous contacterons pour discuter de l\'upgrade de votre plan. En attendant, vous pouvez continuer à utiliser MoodFlow sans interruption.'
  },
  {
    question: 'Mes données sont-elles sécurisées ?',
    answer: 'Absolument. Nous utilisons un chiffrement de bout en bout, hébergeons nos serveurs en Europe et sommes conformes au RGPD. Vos données ne sont jamais partagées avec des tiers.'
  },
  {
    question: 'Puis-je annuler à tout moment ?',
    answer: 'Oui, vous pouvez annuler votre abonnement à tout moment depuis votre tableau de bord. Aucun frais d\'annulation ne s\'applique.'
  },
  {
    question: 'Offrez-vous des remises pour les organisations à but non lucratif ?',
    answer: 'Oui, nous offrons des tarifs préférentiels pour les organisations à but non lucratif et les établissements d\'enseignement. Contactez-nous pour plus d\'informations.'
  }
];

const toggleFaq = (index: number) => {
  if (openFaqs.value.includes(index)) {
    openFaqs.value = openFaqs.value.filter(i => i !== index);
  } else {
    openFaqs.value.push(index);
  }
};

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
  lastY = window.scrollY;
  window.addEventListener('scroll', onScroll, { passive: true });
});

onUnmounted(() => {
  window.removeEventListener('scroll', onScroll);
  window.clearTimeout(flashTimer);
});
</script>

<style scoped>
/* ---------- Bascule mensuel / annuel ---------- */
.pri-toggle-btn {
  min-width: 9.5rem;
  transition: color 0.4s var(--ease-out-expo);
}

@media (min-width: 640px) {
  .pri-toggle-btn {
    min-width: 11.5rem;
  }
}

.pri-toggle-pill {
  position: absolute;
  inset-block: 0.375rem;
  left: 0.375rem;
  width: calc(50% - 0.375rem);
  display: flex;
  align-items: center;
  padding-left: 0.5rem;
  border-radius: 999px;
  background: var(--paper);
  transition:
    transform 0.8s cubic-bezier(0.68, -0.35, 0.27, 1.35),
    background-color 0.6s var(--ease-out-expo);
}

.pri-toggle-pill > svg {
  transition: transform 0.8s cubic-bezier(0.68, -0.35, 0.27, 1.35);
}

.pri-toggle.is-yearly .pri-toggle-pill {
  transform: translateX(100%);
  background: var(--sun);
}

.pri-toggle.is-yearly .pri-toggle-pill > svg {
  transform: rotate(360deg);
}

.pri-save-badge {
  transform: rotate(8deg);
  transition: transform 0.6s var(--ease-out-expo);
}

.pri-toggle.is-yearly .pri-save-badge {
  animation: pri-badge 0.9s var(--ease-out-expo) both;
}

@keyframes pri-badge {
  0% { transform: rotate(8deg) scale(1); }
  35% { transform: rotate(-10deg) scale(1.35); }
  100% { transform: rotate(8deg) scale(1.08); }
}

/* ---------- Cartes ---------- */
.pri-card.is-recommended {
  box-shadow: 0 0 0 3px var(--paper), 0 0 0 6px var(--coral), 0 40px 80px -40px rgb(26 14 43 / 0.45);
}

.pri-card.is-flash {
  animation: pri-flash 1.4s var(--ease-out-expo);
}

@keyframes pri-flash {
  0%, 100% { scale: 1; }
  30% { scale: 1.025; }
}

.pri-chip-enter-active,
.pri-chip-leave-active {
  transition: opacity 0.4s ease, transform 0.6s var(--ease-out-expo);
}

.pri-chip-enter-from,
.pri-chip-leave-to {
  opacity: 0;
  transform: translate3d(0, 8px, 0) scale(0.9);
}

.pri-line-enter-active,
.pri-line-leave-active {
  transition: opacity 0.25s ease, transform 0.4s var(--ease-out-expo);
}

.pri-line-enter-from {
  opacity: 0;
  transform: translate3d(0, 60%, 0);
}

.pri-line-leave-to {
  opacity: 0;
  transform: translate3d(0, -60%, 0);
}

/* ---------- Simulateur ---------- */
.pri-range-thumb {
  left: calc(1.75rem + var(--p) * (100% - 3.5rem));
  transform: translate(-50%, -50%);
  transition: left 0.35s var(--ease-out-expo);
}

.pri-range-thumb > span {
  transition: transform 0.4s var(--ease-out-expo);
}

.pri-range:has(.pri-range-input:active) .pri-range-thumb > span {
  transform: scale(1.12);
}

.pri-range:has(.pri-range-input:focus-visible) .pri-range-thumb > span {
  outline: 3px solid var(--sun);
  outline-offset: 4px;
}

.pri-range-input {
  -webkit-appearance: none;
  appearance: none;
  background: transparent;
  opacity: 0;
  margin: 0;
}

.pri-range-input::-webkit-slider-thumb {
  -webkit-appearance: none;
  appearance: none;
  width: 3.5rem;
  height: 3.5rem;
}

.pri-range-input::-moz-range-thumb {
  width: 3.5rem;
  height: 3.5rem;
  border: 0;
}

.pri-crowd-face {
  opacity: 0;
  transform: scale(0.2) rotate(-40deg);
  transition:
    opacity 0.3s ease,
    transform 0.6s var(--ease-out-expo);
}

.pri-crowd-face.is-on {
  opacity: 1;
  transform: none;
  transition:
    opacity 0.3s ease calc(var(--k) * 18ms),
    transform 0.7s cubic-bezier(0.34, 1.56, 0.64, 1) calc(var(--k) * 18ms);
}

.pri-roll-enter-active,
.pri-roll-leave-active {
  transition: transform 0.7s var(--ease-out-expo), opacity 0.4s ease;
}

.pri-roll-enter-from {
  transform: translate3d(0, 100%, 0);
  opacity: 0;
}

.pri-roll-leave-to {
  transform: translate3d(0, -100%, 0);
  opacity: 0;
}

/* ---------- Comparatif ---------- */
.pri-sticky {
  transition: top 0.5s var(--ease-out-expo);
}

.pri-row:hover > * {
  background-color: rgb(254 217 78 / 0.28);
}

.pri-row:hover .pri-check {
  background: var(--grape);
}

@media (prefers-reduced-motion: reduce) {
  .pri-toggle-pill,
  .pri-toggle-pill > svg,
  .pri-range-thumb,
  .pri-crowd-face,
  .pri-crowd-face.is-on {
    transition: none;
  }

  .pri-toggle.is-yearly .pri-save-badge,
  .pri-card.is-flash {
    animation: none;
  }
}
</style>

<style>
/* Compteur à rouleaux (rendu par une fonction h(), donc hors du style scoped) */
.pri-odo {
  display: inline-flex;
}

.pri-odo-vis {
  display: inline-flex;
  align-items: flex-start;
  font-variant-numeric: tabular-nums;
}

.pri-odo-col {
  --h: 1.04em;
  display: inline-block;
  height: var(--h);
  max-width: 0.75em;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(transparent, #000 14%, #000 86%, transparent);
  mask-image: linear-gradient(transparent, #000 14%, #000 86%, transparent);
  transition:
    max-width 0.7s cubic-bezier(0.16, 1, 0.3, 1),
    opacity 0.4s ease;
}

.pri-odo-col.is-blank {
  max-width: 0;
  opacity: 0;
}

.pri-odo-strip {
  display: flex;
  flex-direction: column;
  transform: translateY(calc(var(--d) * var(--h) * -1));
  transition: transform 1.1s cubic-bezier(0.16, 1, 0.3, 1);
  transition-delay: calc(var(--i) * 70ms);
}

.pri-odo-strip > span {
  display: block;
  height: var(--h);
  line-height: var(--h);
  text-align: center;
}

.pri-odo-sep {
  display: inline-block;
  width: 0.22em;
  max-width: 0.22em;
  transition: max-width 0.7s cubic-bezier(0.16, 1, 0.3, 1);
}

.pri-odo-sep.is-blank {
  max-width: 0;
}

@media (prefers-reduced-motion: reduce) {
  .pri-odo-col,
  .pri-odo-strip,
  .pri-odo-sep {
    transition: none;
  }
}
</style>
