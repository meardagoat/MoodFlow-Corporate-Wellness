<template>
  <div ref="rootEl" class="overflow-x-clip">
    <PageHero
      label="À propos"
      subtitle="Notre mission est de fournir à chaque entreprise un accès à un support continu pour le bien-être mental de ses équipes."
      :indicators="['Bien-être mental', 'Support continu', 'Équipes saines']"
      tone="#FFE3D8"
      mood="very_happy"
    >
      À propos de <span class="accent text-coral">MoodFlow</span>
    </PageHero>

    <!-- ============================================================
         (01) QUI NOUS SOMMES : manifeste qui s'allume au défilement
         ============================================================ -->
    <section class="relative pb-20 pt-24 md:pb-28 md:pt-40">
      <div class="shell">
        <div class="flex items-center justify-between gap-6">
          <p class="label text-ink/55">(01) Qui nous sommes</p>
          <p class="label hidden text-ink/40 sm:block" aria-hidden="true">Manifeste</p>
        </div>
        <h2 class="sr-only">Qui nous sommes</h2>
        <p class="display mt-10 text-[clamp(2.15rem,5.4vw,5.9rem)] leading-[1] tracking-[-0.045em] md:mt-14">
          <span v-scrub-words="{ end: 'bottom 60%' }">Considérez MoodFlow comme votre guide de confiance</span>
          <MoodFace mood="very_happy" class="inline-face" />
          <span v-scrub-words="{ end: 'bottom 60%' }">pour un meilleur bien-être en entreprise. Nous sommes là pour vous, quand vous en avez besoin, où que vous soyez,</span>
          <MoodFace mood="neutral" class="inline-face" />
          <span v-scrub-words="{ end: 'bottom 60%' }">vous aidant à traverser les moments difficiles et à trouver</span>
          <span v-scrub-words="{ end: 'bottom 60%' }" class="accent text-coral">la joie dans chaque journée de travail.</span>
          <MoodFace mood="happy" class="inline-face" />
        </p>
      </div>
    </section>

    <!-- Mission + premiers chiffres -->
    <section class="pb-24 md:pb-40">
      <div class="shell grid gap-6 lg:grid-cols-12 lg:gap-6">
        <div
          v-reveal="{ variant: 'scale' }"
          class="group relative flex min-h-[30rem] flex-col justify-between overflow-hidden rounded-[2.5rem] bg-sun p-8 md:min-h-[36rem] md:p-10 lg:col-span-5"
        >
          <div class="flex items-start justify-between gap-4">
            <p class="label">Notre Mission</p>
            <span class="chip hidden whitespace-nowrap border-ink/20 sm:inline-flex lg:hidden xl:inline-flex">Depuis le premier jour</span>
          </div>
          <SunMark
            class="mx-auto my-6 w-[62%] max-w-[18rem] transition-transform duration-1000 ease-out-expo group-hover:rotate-[8deg] group-hover:scale-105"
            state="very_happy"
            disc="#FFF8EF"
            track
          />
          <div>
            <h3 class="display text-display-sm">Notre Mission</h3>
            <p class="mt-3 text-lg text-ink/75">Transformer le bien-être en entreprise</p>
          </div>
        </div>

        <div class="flex flex-col justify-between gap-12 rounded-[2.5rem] bg-paper-deep/70 p-8 md:p-12 lg:col-span-7">
          <p v-reveal class="max-w-2xl text-pretty text-xl leading-relaxed text-ink/80 md:text-2xl md:leading-snug">
            Notre équipe d'experts va des <span class="accent text-grape">cliniciens en santé mentale</span> aux
            <span class="accent text-coral">développeurs primés</span>, travaillant ensemble pour aider des milliers
            d'entreprises dans le monde à être plus saines et productives.
          </p>
          <dl class="grid gap-6 sm:grid-cols-2">
            <div v-reveal class="rounded-[2rem] bg-paper p-6 md:p-8">
              <dd class="display text-[clamp(3.4rem,7vw,6.5rem)] leading-[0.85] tracking-[-0.06em] text-coral"><CountUp value="1000+" /></dd>
              <dt class="label mt-5 flex items-center gap-2 text-ink/60">
                <span class="h-2.5 w-2.5 rounded-full bg-coral" />Entreprises
              </dt>
            </div>
            <div v-reveal="0.1" class="rounded-[2rem] bg-paper p-6 md:p-8">
              <dd class="display text-[clamp(3.4rem,7vw,6.5rem)] leading-[0.85] tracking-[-0.06em] text-grape"><CountUp value="50K+" /></dd>
              <dt class="label mt-5 flex items-center gap-2 text-ink/60">
                <span class="h-2.5 w-2.5 rounded-full bg-grape" />Employés
              </dt>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- ============================================================
         (02) NOTRE HISTOIRE : la courbe d'humeur se dessine au scroll
         ============================================================ -->
    <section
      ref="historySection"
      class="history relative bg-ink text-paper"
      :class="{ 'is-horizontal': horizontal }"
      aria-labelledby="history-title"
    >
      <div class="history-head shell">
        <div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-8">
          <div>
            <p class="label text-paper/55">(02) Notre histoire</p>
            <h2 id="history-title" v-split class="history-title display mt-6">
              De l'orage au <span class="accent text-sun">plein soleil</span>
            </h2>
          </div>
          <div v-if="horizontal" class="flex items-end gap-6" aria-hidden="true">
            <p class="label pb-2 text-paper/50">{{ chapters[active].tag }}</p>
            <p class="display text-5xl leading-none tracking-[-0.05em]">
              {{ pad(active + 1) }}<span class="text-paper/25"> / {{ pad(chapters.length) }}</span>
            </p>
          </div>
          <p v-else class="max-w-md text-pretty text-lg leading-snug text-paper/70">
            Cinq chapitres, une même courbe : celle d'une équipe qui apprend à dire comment elle va, puis à aller mieux.
          </p>
        </div>
      </div>

      <div ref="historyStage" class="history-stage">
        <div ref="historyTrack" class="history-track">
          <svg
            v-if="horizontal"
            class="history-svg"
            :width="svgBox.w"
            :height="svgBox.h"
            :viewBox="`0 0 ${svgBox.w} ${svgBox.h}`"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="abo-curve" gradientUnits="userSpaceOnUse" x1="0" y1="0" :x2="svgBox.w" y2="0">
                <stop v-for="stop in curveStops" :key="stop.offset" :offset="stop.offset" :stop-color="stop.color" />
              </linearGradient>
            </defs>
            <line
              v-for="(dot, i) in curveDots"
              :key="`l${i}`"
              :x1="dot.x"
              :x2="dot.x"
              :y1="dot.y + 14"
              :y2="svgBox.h"
              class="curve-stem"
              :class="{ 'is-on': i <= active }"
            />
            <path :d="curveD" class="curve-base" />
            <path ref="curveDrawn" :d="curveD" class="curve-drawn" :pathLength="curveLength" />
            <circle
              v-for="(dot, i) in curveDots"
              :key="`c${i}`"
              :cx="dot.x"
              :cy="dot.y"
              r="9"
              class="curve-dot"
              :class="{ 'is-on': i <= active }"
              :style="{ '--c': chapters[i].color }"
            />
          </svg>

          <div v-if="horizontal" class="history-prologue">
            <p class="label text-paper/45">Prologue</p>
            <p class="mt-4 text-pretty text-xl leading-snug text-paper/75">
              Cinq chapitres, une même courbe : celle d'une équipe qui apprend à dire comment elle va, puis à aller mieux.
            </p>
            <p class="label mt-6 flex items-center gap-3 text-sun" aria-hidden="true">Défilez <Icon name="arrow-right" class="h-4 w-4" /></p>
          </div>
          <ol class="history-list">
            <li
              v-for="(chapter, i) in chapters"
              :key="chapter.title"
              class="chapter"
              :class="{ 'is-on': !horizontal || i <= active, 'is-current': horizontal && i === active }"
              :style="{ '--c': chapter.color }"
            >
              <div v-if="!horizontal" class="chapter-face" aria-hidden="true">
                <MoodFace :mood="chapter.mood" :color="chapter.color" />
              </div>
              <div class="chapter-body">
                <div class="flex items-baseline gap-4">
                  <span class="chapter-num display" aria-hidden="true">{{ pad(i + 1) }}</span>
                  <p class="label text-paper/55">{{ chapter.tag }}</p>
                </div>
                <h3 class="display mt-4 text-[clamp(1.9rem,3vw,2.9rem)] leading-[0.95] tracking-[-0.04em]">{{ chapter.title }}</h3>
                <p class="mt-4 max-w-[30rem] text-pretty text-lg leading-snug text-paper/70">{{ chapter.text }}</p>
              </div>
            </li>
          </ol>
        </div>

        <div v-if="horizontal" class="history-fade" aria-hidden="true" />
        <div v-if="horizontal" ref="runner" class="history-runner" aria-hidden="true">
          <span class="runner-halo" :style="{ backgroundColor: chapters[active].color }" />
          <MoodFace :key="active" :mood="chapters[active].mood" :color="chapters[active].color" class="runner-face" />
        </div>
      </div>
    </section>

    <!-- ============================================================
         (03) CE QUE NOUS FAISONS
         ============================================================ -->
    <section class="py-24 md:py-40">
      <div class="shell grid gap-14 lg:grid-cols-12 lg:items-center lg:gap-12">
        <div class="order-2 lg:order-1 lg:col-span-5">
          <div
            v-reveal="{ variant: 'scale' }"
            class="group relative flex aspect-[4/5] max-h-[40rem] w-full flex-col justify-between overflow-hidden rounded-[2.5rem] bg-lilac p-8 md:p-10"
          >
            <p class="label">Notre Approche</p>
            <div class="relative mx-auto grid w-[62%] max-w-[20rem] place-items-center" aria-hidden="true">
              <div class="absolute inset-0 rounded-full border-2 border-dashed border-ink/25 motion-safe:animate-spin-slower" />
              <div class="absolute inset-[16%] rounded-full bg-grape transition-transform duration-1000 ease-out-back group-hover:scale-[1.08]" />
              <div class="absolute inset-[34%] rounded-full bg-coral transition-transform delay-75 duration-1000 ease-out-back group-hover:scale-[1.15]" />
              <div class="absolute inset-[42%] transition-transform delay-150 duration-1000 ease-out-back group-hover:scale-125">
                <MoodFace mood="very_happy" />
              </div>
              <div class="aspect-square w-full" />
            </div>
            <div>
              <h3 class="display text-display-sm">Notre Approche</h3>
              <p class="mt-3 text-lg text-ink/75">Solutions éprouvées et personnalisées</p>
            </div>
          </div>
        </div>

        <div class="order-1 lg:order-2 lg:col-span-6 lg:col-start-7">
          <p class="label text-ink/55">(03) Ce que nous faisons</p>
          <h2 v-split class="display mt-6 text-display-lg">Ce que nous faisons</h2>
          <p v-reveal class="mt-10 text-pretty text-xl leading-relaxed text-ink/80">
            Grâce à des outils d'expression libre et de mindfulness basés sur des preuves,
            du coaching en santé mentale et des insights en temps réel, MoodFlow vous aide
            à créer des habitudes transformatrices pour soutenir le bien-être mental de vos équipes
            et trouver un environnement de travail plus sain et plus heureux.
          </p>
          <ol class="mt-12 border-t border-ink/15">
            <li
              v-for="(item, i) in approach"
              :key="item.title"
              v-reveal="i * 0.08"
              class="approach-row group relative flex items-center gap-5 overflow-hidden border-b border-ink/15 py-6"
              :style="{ '--c': item.color }"
            >
              <span class="approach-fill" aria-hidden="true" />
              <span class="label relative w-8 text-ink/50">{{ pad(i + 1) }}</span>
              <span class="relative font-display text-[clamp(1.4rem,2.4vw,2rem)] font-bold leading-tight tracking-[-0.03em] transition-transform duration-700 ease-out-expo group-hover:translate-x-2">{{ item.title }}</span>
              <Icon :name="item.icon" class="relative ml-auto h-6 w-6 shrink-0 transition-transform duration-700 ease-out-back group-hover:rotate-12 group-hover:scale-125" />
            </li>
          </ol>
        </div>
      </div>
    </section>

    <!-- ============================================================
         (04) COMMENT NOUS PROCÉDONS : valeurs, visages expressifs
         ============================================================ -->
    <section class="bg-paper-deep/60 py-24 md:py-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-7">
            <p class="label text-ink/55">(04) Nos valeurs</p>
            <h2 v-split class="display mt-6 text-display-lg">Comment nous procédons</h2>
          </div>
          <p v-reveal class="text-pretty text-xl leading-snug text-ink/75 md:col-span-4 md:col-start-9">
            Nos quatre valeurs guident nos décisions et notre façon d'opérer au quotidien.
            <span class="mt-3 block text-base text-ink/55">Survolez une carte : elle vous sourit.</span>
          </p>
        </div>

        <div class="mt-16 grid gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:items-start">
          <div
            v-for="(value, i) in values"
            :key="value.title"
            v-reveal="i * 0.08"
            :class="i % 2 === 1 ? 'lg:mt-20' : ''"
          >
            <article
              v-tilt="7"
              tabindex="0"
              class="value-card group relative flex min-h-[25rem] flex-col overflow-hidden rounded-[2rem] p-7 outline-none focus-visible:ring-4 focus-visible:ring-ink/40 md:min-h-[27rem]"
              :style="{ backgroundColor: value.color }"
              @pointerenter="hoveredValue = i"
              @pointerleave="hoveredValue = -1"
              @focus="hoveredValue = i"
              @blur="hoveredValue = -1"
            >
              <div class="flex items-start justify-between">
                <span class="display text-6xl leading-none tracking-[-0.06em]">{{ pad(i + 1) }}</span>
                <Icon :name="value.icon" class="h-7 w-7 transition-transform duration-700 ease-out-expo group-hover:rotate-12" />
              </div>
              <div class="value-face my-8 w-28 self-center md:w-32" aria-hidden="true">
                <MoodFace :mood="hoveredValue === i ? value.hover : value.rest" color="#FFF8EF" />
              </div>
              <h3 class="display mt-auto text-2xl leading-tight tracking-[-0.03em]">{{ value.title }}</h3>
              <p class="mt-3 text-pretty text-ink/75">{{ value.description }}</p>
            </article>
          </div>
        </div>
      </div>
    </section>

    <!-- Bandeau -->
    <div class="relative z-10 -mt-10 py-12 md:-mt-14 md:py-16" aria-hidden="true">
      <div class="w-[112%] -translate-x-[6%] -rotate-[2.5deg] bg-grape py-4 text-paper md:py-6">
        <Marquee :speed="40" reactive :repeat="2">
          <template v-for="word in marqueeWords" :key="word">
            <span class="display whitespace-nowrap text-[clamp(2rem,5vw,4.75rem)] tracking-[-0.045em]">{{ word }}</span>
            <MoodFace mood="very_happy" class="mx-6 h-9 w-9 shrink-0 md:mx-10 md:h-14 md:w-14" />
          </template>
        </Marquee>
      </div>
    </div>

    <!-- ============================================================
         (05) MOODFLOW EN CHIFFRES : très grands nombres sur fond soleil
         ============================================================ -->
    <section class="relative mx-3 overflow-hidden rounded-[2.5rem] bg-sun py-24 md:mx-5 md:rounded-[3.5rem] md:py-36">
      <div class="shell relative z-10">
        <div class="flex flex-wrap items-end justify-between gap-6">
          <div>
            <p class="label text-ink/60">(05) Impact</p>
            <h2 v-split class="display mt-6 text-display-lg">MoodFlow en chiffres</h2>
          </div>
        </div>
        <dl class="mt-14 md:mt-20">
          <div
            v-for="(figure, i) in figures"
            :key="figure.label"
            v-reveal="i * 0.08"
            class="figure-row group grid items-end gap-4 border-t-2 border-ink py-8 md:grid-cols-12 md:gap-8 md:py-10"
          >
            <dt class="flex items-center gap-4 md:col-span-4" :class="i % 2 === 1 ? 'md:order-2 md:col-start-9 md:row-start-1 md:justify-end md:text-right' : ''">
              <span class="grid h-12 w-12 shrink-0 place-items-center transition-transform duration-700 ease-out-back group-hover:rotate-[-14deg] group-hover:scale-110 md:h-14 md:w-14" aria-hidden="true">
                <MoodFace :mood="figure.mood" :color="figure.color" />
              </span>
              <span class="text-xl font-semibold leading-tight md:text-2xl">{{ figure.label }}</span>
            </dt>
            <dd
              class="display text-[clamp(4.75rem,17vw,16rem)] leading-[0.8] tracking-[-0.07em] md:col-span-8"
              :class="i % 2 === 1 ? 'md:order-1 md:col-start-1 md:row-start-1' : 'md:text-right'"
            >
              <CountUp :value="figure.value" :duration="2.2" />
            </dd>
          </div>
        </dl>
      </div>
      <div class="pointer-events-none absolute -right-[12vw] -top-[10vw] w-[40vw] opacity-90 md:w-[26vw]" aria-hidden="true">
        <div v-parallax="0.3">
          <SunMark state="happy" disc="#FFF8EF" :ray-colors="['#FF8944', '#FFF8EF']" />
        </div>
      </div>
    </section>

    <!-- ============================================================
         (06) RÉSULTATS : barres qui se remplissent au défilement
         ============================================================ -->
    <section class="py-24 md:py-40">
      <div class="shell grid gap-14 lg:grid-cols-12">
        <div class="lg:col-span-5">
          <div class="lg:sticky lg:top-32">
            <p class="label text-ink/55">(06) Résultats</p>
            <h2 v-split class="display mt-6 text-display-lg">Résultats basés sur des preuves</h2>
            <p v-reveal class="mt-8 max-w-md text-pretty text-lg leading-snug text-ink/70">
              Mesurés auprès des entreprises qui utilisent MoodFlow au quotidien.
            </p>
          </div>
        </div>
        <ul class="space-y-10 lg:col-span-7 lg:pt-4 md:space-y-14">
          <li
            v-for="(outcome, i) in outcomes"
            :key="outcome.label"
            v-reveal="i * 0.08"
            class="outcome"
            :style="{ '--w': `${outcome.value}%`, '--c': outcome.color, '--d': `${0.2 + i * 0.1}s` }"
          >
            <div class="flex items-end justify-between gap-6">
              <span class="text-lg font-semibold leading-tight md:text-2xl">{{ outcome.label }}</span>
              <span class="display text-[clamp(3rem,6vw,5.5rem)] leading-[0.8] tracking-[-0.06em]" :style="{ color: outcome.color }">
                <CountUp :value="`${outcome.value}%`" :duration="1.8" />
              </span>
            </div>
            <div class="outcome-track mt-5" aria-hidden="true">
              <div class="outcome-fill">
                <span class="outcome-knob"><MoodFace :mood="outcome.mood" :color="outcome.color" /></span>
              </div>
            </div>
          </li>
        </ul>
      </div>
    </section>

    <!-- ============================================================
         (07) L'ÉQUIPE : liste éditoriale + portrait qui suit le curseur
         ============================================================ -->
    <section class="bg-paper-deep/60 py-24 md:py-40">
      <div class="shell">
        <div class="grid gap-8 md:grid-cols-12 md:items-end">
          <div class="md:col-span-8">
            <p class="label text-ink/55">(07) Les visages de MoodFlow</p>
            <h2 v-split class="display mt-6 text-display-lg">Notre équipe</h2>
          </div>
          <p v-reveal class="text-pretty text-lg leading-snug text-ink/70 md:col-span-4">
            Cliniciens, ingénieurs et designers : huit personnes pour une même mission.
            <span v-if="followEnabled" class="mt-2 block text-ink/50">Survolez un nom pour faire connaissance.</span>
          </p>
        </div>

        <div v-for="group in teamGroups" :key="group.title" class="mt-16 md:mt-24">
          <div class="flex items-center justify-between gap-4 border-b-2 border-ink pb-4">
            <h3 class="label text-ink">{{ group.title }}</h3>
            <span class="label text-ink/45">{{ pad(group.members.length) }} personnes</span>
          </div>

          <!-- Desktop avec souris : grande liste éditoriale -->
          <ul
            v-if="followEnabled"
            class="team-list"
            @pointermove="onTeamMove"
            @pointerleave="hideFollower"
          >
            <li
              v-for="member in group.members"
              :key="member.id"
              class="team-row grid grid-cols-12 items-center gap-6 border-b border-ink/15 py-7"
              :class="{ 'is-active': activeMember === member.id }"
              :style="{ '--c': member.bg }"
              @pointerenter="showFollower(member.id)"
            >
              <span class="label col-span-1 text-ink/40">{{ pad(member.id + 1) }}</span>
              <span class="team-name display col-span-5 text-[clamp(3rem,6.2vw,6.5rem)] leading-[0.9] tracking-[-0.055em]">{{ member.name }}</span>
              <span class="label col-span-2 leading-relaxed text-coral">{{ member.role }}</span>
              <p class="col-span-4 text-pretty text-ink/70">{{ member.description }}</p>
            </li>
          </ul>

          <!-- Mobile / tactile : cartes -->
          <ul v-else class="mt-6 grid gap-4 md:grid-cols-2" :class="group.members.length === 3 ? 'lg:grid-cols-3' : ''">
            <li
              v-for="member in group.members"
              :key="member.id"
              v-reveal="(member.id % 3) * 0.08"
              class="flex flex-col rounded-[2rem] bg-paper p-6 md:p-7"
            >
              <div class="flex items-center gap-4">
                <span
                  class="relative grid h-20 w-20 shrink-0 place-items-center rounded-[1.4rem]"
                  :style="{ backgroundColor: member.bg, color: member.fg }"
                >
                  <span class="display text-4xl leading-none">{{ member.initial }}</span>
                  <MoodFace :mood="member.mood" color="#FFF8EF" class="absolute -bottom-2 -right-2 h-8 w-8" />
                </span>
                <div class="min-w-0">
                  <h4 class="display text-3xl leading-none tracking-[-0.04em]">{{ member.name }}</h4>
                  <p class="label mt-2 leading-relaxed text-coral">{{ member.role }}</p>
                </div>
              </div>
              <p class="mt-5 text-pretty text-ink/70">{{ member.description }}</p>
            </li>
          </ul>
        </div>
      </div>

      <!-- Carte portrait qui suit le curseur -->
      <Teleport to="body">
        <div v-if="followEnabled" ref="follower" class="follower" :class="{ 'is-visible': followerVisible }" aria-hidden="true">
          <div ref="followerTilt" class="follower-tilt">
            <div class="follower-inner">
              <div
                v-for="member in members"
                :key="member.id"
                class="follower-card"
                :class="{ 'is-active': activeMember === member.id }"
                :style="{ backgroundColor: member.bg, color: member.fg }"
              >
                <span class="label opacity-70">{{ member.group }}</span>
                <span class="follower-initial display">{{ member.initial }}</span>
                <div class="flex items-end justify-between gap-3">
                  <div class="min-w-0">
                    <p class="display text-3xl leading-none tracking-[-0.04em]">{{ member.name }}</p>
                    <p class="label mt-2 leading-relaxed opacity-75">{{ member.role }}</p>
                  </div>
                  <MoodFace :mood="member.mood" color="#FFF8EF" class="h-14 w-14 shrink-0" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Teleport>
    </section>

    <!-- ============================================================
         CTA
         ============================================================ -->
    <section ref="ctaSection" class="relative overflow-hidden bg-coral pb-52 pt-24 md:pb-60 md:pt-36">
      <div class="shell relative z-10 grid gap-10 lg:grid-cols-12 lg:items-end">
        <div class="lg:col-span-8">
          <p class="label text-ink/60">(08) Et maintenant ?</p>
          <h2 v-split class="display mt-6 text-display-xl">Rejoignez l'aventure <span class="accent">MoodFlow</span></h2>
          <p v-reveal class="mt-8 max-w-xl text-pretty text-xl leading-snug md:text-2xl">
            Découvrez comment MoodFlow peut transformer votre entreprise et le bien-être de vos équipes
          </p>
        </div>
        <div v-reveal="0.15" class="flex flex-wrap gap-3 lg:col-span-4 lg:flex-col lg:items-end">
          <router-link to="/demo" class="btn btn-ink btn-lg" v-magnetic>
            <RollText text="Demander une démo" />
            <span class="btn-dot"><Icon name="arrow-right" /></span>
          </router-link>
          <router-link to="/contact" class="btn btn-outline btn-lg">
            <RollText text="Nous contacter" />
          </router-link>
        </div>
      </div>
      <div class="pointer-events-none absolute -bottom-[14vw] left-1/2 w-[62vw] -translate-x-1/2 md:-bottom-[12vw] md:w-[28vw]" aria-hidden="true">
        <div ref="sunrise">
          <SunMark state="very_happy" disc="#FED94E" :ray-colors="['#1A0E2B', '#FFF8EF']" />
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { computed, nextTick, onMounted, onUnmounted, ref } from 'vue';
import PageHero from '../components/site/PageHero.vue';
import SunMark from '../components/brand/SunMark.vue';
import MoodFace from '../components/brand/MoodFace.vue';
import Icon, { type IconName } from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import CountUp from '../components/ui/CountUp.vue';
import Marquee from '../components/ui/Marquee.vue';
import { gsap } from '../lib/motion';
import type { MoodValue } from '../lib/moods';

const pad = (n: number) => String(n).padStart(2, '0');

const rootEl = ref<HTMLElement | null>(null);
const historySection = ref<HTMLElement | null>(null);
const historyStage = ref<HTMLElement | null>(null);
const historyTrack = ref<HTMLElement | null>(null);
const curveDrawn = ref<SVGPathElement | null>(null);
const runner = ref<HTMLElement | null>(null);
const ctaSection = ref<HTMLElement | null>(null);
const sunrise = ref<HTMLElement | null>(null);
const follower = ref<HTMLElement | null>(null);
const followerTilt = ref<HTMLElement | null>(null);

/* ---------------------------- Contenus ---------------------------- */

const chapters: { tag: string; title: string; text: string; mood: MoodValue; color: string }[] = [
  {
    tag: 'Le constat',
    title: 'Un mal-être qui ne se voit pas',
    text: 'Au travail, le mal-être reste souvent invisible. On le découvre trop tard : un arrêt, un départ, une équipe qui s\'éteint.',
    mood: 'sad',
    color: '#5EDDE7',
  },
  {
    tag: 'L\'idée',
    title: 'Donner la parole à chacun',
    text: 'Offrir un espace sûr et anonyme pour dire comment on se sent, en quelques secondes et sans jugement.',
    mood: 'neutral',
    color: '#CDB8FF',
  },
  {
    tag: 'L\'équipe',
    title: 'Des experts réunis',
    text: 'Cliniciens en santé mentale et développeurs primés unissent leurs savoir-faire autour d\'une même conviction.',
    mood: 'happy',
    color: '#FF8944',
  },
  {
    tag: 'La méthode',
    title: 'Des preuves, pas des promesses',
    text: 'Expression libre, mindfulness, coaching et insights en temps réel : des habitudes qui transforment durablement.',
    mood: 'happy',
    color: '#FF5BBC',
  },
  {
    tag: 'Aujourd\'hui',
    title: 'Des milliers d\'équipes plus sereines',
    text: 'Plus de 1000 entreprises et 50 000 employés avancent avec MoodFlow, partout dans le monde. Et ce n\'est qu\'un début.',
    mood: 'very_happy',
    color: '#FED94E',
  },
];

const approach: { title: string; icon: IconName; color: string }[] = [
  { title: 'Expression libre et anonyme', icon: 'message', color: '#FED94E' },
  { title: 'Insights en temps réel', icon: 'activity', color: '#5EDDE7' },
  { title: 'Actions ciblées et personnalisées', icon: 'target', color: '#FF8944' },
];

const values: { title: string; description: string; icon: IconName; color: string; rest: MoodValue; hover: MoodValue }[] = [
  {
    title: 'Faire compter la mission',
    description: 'Chaque décision est guidée par notre mission de transformer le bien-être en entreprise.',
    icon: 'target',
    color: '#FF8944',
    rest: 'neutral',
    hover: 'very_happy',
  },
  {
    title: 'Itérer vers l\'excellence',
    description: 'Nous améliorons constamment nos solutions basées sur vos retours.',
    icon: 'repeat',
    color: '#CDB8FF',
    rest: 'sad',
    hover: 'happy',
  },
  {
    title: 'Assumer le résultat',
    description: 'Nous nous engageons pleinement dans le succès de votre transformation.',
    icon: 'flag',
    color: '#5EDDE7',
    rest: 'neutral',
    hover: 'very_happy',
  },
  {
    title: 'Se connecter avec courage',
    description: 'Nous créons des liens authentiques avec nos clients et leurs équipes.',
    icon: 'heart',
    color: '#FF5BBC',
    rest: 'sad',
    hover: 'very_happy',
  },
];

const hoveredValue = ref(-1);

const marqueeWords = ['Bien-être mental', 'Support continu', 'Équipes saines', 'Faire compter la mission', 'Se connecter avec courage'];

const figures: { value: string; label: string; color: string; mood: MoodValue }[] = [
  { value: '200+', label: 'Entreprises dans le monde', color: '#FF8944', mood: 'happy' },
  { value: '100K+', label: 'Vies transformées', color: '#FF5BBC', mood: 'very_happy' },
  { value: '70K+', label: 'Téléchargements d\'app', color: '#5EDDE7', mood: 'happy' },
];

const outcomes: { value: number; label: string; color: string; mood: MoodValue }[] = [
  { value: 32, label: 'Réduction du stress', color: '#FA4D52', mood: 'happy' },
  { value: 14, label: 'Amélioration de l\'engagement', color: '#FF8944', mood: 'happy' },
  { value: 59, label: 'Satisfaction des employés', color: '#8248FE', mood: 'very_happy' },
  { value: 70, label: 'Rétention des talents', color: '#11C1DC', mood: 'very_happy' },
];

const avatarColors = [
  { bg: '#8248FE', fg: '#FFF8EF' },
  { bg: '#FED94E', fg: '#1A0E2B' },
  { bg: '#FA4D52', fg: '#1A0E2B' },
  { bg: '#5EDDE7', fg: '#1A0E2B' },
  { bg: '#FF8944', fg: '#1A0E2B' },
  { bg: '#FF5BBC', fg: '#1A0E2B' },
];

const leadership = [
  {
    name: 'David',
    initial: 'D',
    role: 'CEO & Co-founder',
    description: 'Fondateur de MoodFlow, visionnaire du bien-être en entreprise avec plus de 10 ans d\'expérience.'
  },
  {
    name: 'Sophie',
    initial: 'S',
    role: 'Chief Clinical Officer',
    description: 'Experte en santé mentale, elle s\'assure de la qualité et de l\'efficacité de nos solutions.'
  },
  {
    name: 'Thomas',
    initial: 'T',
    role: 'Chief Technology Officer',
    description: 'Architecte technique passionné, il veille à la sécurité et à l\'évolutivité de notre plateforme.'
  }
];

const team = [
  {
    name: 'Abdoul',
    initial: 'A',
    role: 'Lead Developer',
    description: 'Architecte technique passionné, expert en backend et sécurité des données.'
  },
  {
    name: 'Mathieu',
    initial: 'M',
    role: 'Frontend Developer',
    description: 'Maître de l\'interface utilisateur, passionné par l\'UX et les animations.'
  },
  {
    name: 'Amaury',
    initial: 'A',
    role: 'UI/UX Designer',
    description: 'Créateur de l\'identité visuelle, expert en design thinking et psychologie des couleurs.'
  },
  {
    name: 'Jerobel',
    initial: 'J',
    role: 'Backend Developer',
    description: 'Génie de l\'infrastructure, spécialiste des bases de données et optimisation.'
  },
  {
    name: 'Mehmet',
    initial: 'M',
    role: 'Full Stack Developer',
    description: 'Polyvalent et créatif, toujours à l\'affût des dernières technologies.'
  }
];

const memberMoods: MoodValue[] = ['very_happy', 'happy', 'very_happy', 'happy'];

const members = [
  ...leadership.map((m) => ({ ...m, group: 'Équipe dirigeante' })),
  ...team.map((m) => ({ ...m, group: 'Équipe produit' })),
].map((m, id) => ({ ...m, id, ...avatarColors[id % avatarColors.length], mood: memberMoods[id % memberMoods.length] }));

const teamGroups = computed(() => [
  { title: 'Notre équipe dirigeante', members: members.filter((m) => m.group === 'Équipe dirigeante') },
  { title: 'L\'équipe produit', members: members.filter((m) => m.group === 'Équipe produit') },
]);

/* --------------------- Frise « courbe d'humeur » --------------------- */

const horizontal = ref(false);
const active = ref(0);
const svgBox = ref({ w: 0, h: 0 });
const curveD = ref('');
const curveLength = ref(1);
const curveDots = ref<{ x: number; y: number }[]>([]);
const curveStops = ref<{ offset: number; color: string }[]>([]);

type Sample = { x: number; y: number; l: number };

function setupHistory() {
  const stage = historyStage.value;
  const track = historyTrack.value;
  const section = historySection.value;
  if (!stage || !track || !section) return;

  const items = Array.from(track.querySelectorAll<HTMLElement>('.chapter'));
  const proxy = { p: 0 };
  let samples: Sample[] = [];
  let firstX = 0;
  let lastX = 0;

  const measure = () => {
    firstX = items[0].offsetLeft;
    lastX = items[items.length - 1].offsetLeft;
  };
  const distance = () => {
    measure();
    return Math.max(0, lastX - firstX);
  };

  // Construit la courbe (en pixels) : elle monte de l'orage vers le soleil
  const build = () => {
    measure();
    const width = track.scrollWidth;
    const bodyTop = Math.min(
      ...items.map((li) => li.offsetTop + (li.querySelector<HTMLElement>('.chapter-body')?.offsetTop ?? li.clientHeight)),
    );
    const band = Math.max(140, bodyTop - 36);
    const top = 58;
    const bottom = Math.max(top + 40, band - 58);
    const last = items.length - 1;
    const pts = items.map((li, i) => ({
      x: li.offsetLeft,
      y: bottom - (bottom - top) * (i / last) + (i === 1 ? (bottom - top) * 0.12 : 0),
    }));
    const all = [{ x: 0, y: pts[0].y }, ...pts, { x: width, y: Math.max(22, top - 30) }];

    let d = `M${all[0].x} ${all[0].y}`;
    samples = [{ x: all[0].x, y: all[0].y, l: 0 }];
    let length = 0;
    for (let k = 1; k < all.length; k++) {
      const a = all[k - 1];
      const b = all[k];
      const mx = (a.x + b.x) / 2;
      d += ` C${mx} ${a.y} ${mx} ${b.y} ${b.x} ${b.y}`;
      let prev = samples[samples.length - 1];
      for (let s = 1; s <= 48; s++) {
        const t = s / 48;
        const u = 1 - t;
        const x = u * u * u * a.x + 3 * u * u * t * mx + 3 * u * t * t * mx + t * t * t * b.x;
        const y = u * u * u * a.y + 3 * u * u * t * a.y + 3 * u * t * t * b.y + t * t * t * b.y;
        length += Math.hypot(x - prev.x, y - prev.y);
        prev = { x, y, l: length };
        samples.push(prev);
      }
    }

    svgBox.value = { w: width, h: band };
    curveD.value = d;
    curveLength.value = Math.max(1, length);
    curveDots.value = pts;
    curveStops.value = items.map((_, i) => ({ offset: Math.min(1, pts[i].x / width), color: chapters[i].color }));
  };

  const pointAt = (x: number): Sample => {
    let lo = 0;
    let hi = samples.length - 1;
    if (!samples.length) return { x, y: 0, l: 0 };
    while (lo < hi) {
      const mid = (lo + hi) >> 1;
      if (samples[mid].x < x) lo = mid + 1;
      else hi = mid;
    }
    const b = samples[lo];
    const a = samples[Math.max(0, lo - 1)];
    const t = b.x === a.x ? 1 : (x - a.x) / (b.x - a.x);
    return { x, y: a.y + (b.y - a.y) * t, l: a.l + (b.l - a.l) * t };
  };

  const render = () => {
    const shift = proxy.p * (lastX - firstX);
    const x = firstX + shift;
    gsap.set(track, { x: -shift });
    const pt = pointAt(x);
    if (runner.value) gsap.set(runner.value, { x: firstX, y: pt.y });
    if (curveDrawn.value) {
      curveDrawn.value.style.strokeDasharray = `${curveLength.value}`;
      curveDrawn.value.style.strokeDashoffset = `${Math.max(0, curveLength.value - pt.l)}`;
    }
    let idx = 0;
    items.forEach((li, i) => {
      if (li.offsetLeft <= x + 4) idx = i;
    });
    if (idx !== active.value) active.value = idx;
  };

  build();
  render();

  gsap.to(proxy, {
    p: 1,
    ease: 'none',
    onUpdate: render,
    scrollTrigger: {
      trigger: section,
      start: 'top top',
      end: () => `+=${Math.round(distance() * 1.15)}`,
      pin: true,
      scrub: 0.7,
      invalidateOnRefresh: true,
      onRefresh: () => {
        build();
        nextTick(render);
      },
    },
  });
}

/* ------------------ Carte portrait qui suit le curseur ------------------ */

const followEnabled = ref(false);
const followerVisible = ref(false);
const activeMember = ref(0);
let xTo: ((v: number) => void) | null = null;
let yTo: ((v: number) => void) | null = null;
let rotTo: ((v: number) => void) | null = null;
let lastX = 0;

function onTeamMove(e: PointerEvent) {
  if (!xTo || !yTo) return;
  xTo(e.clientX);
  yTo(e.clientY);
  rotTo?.(gsap.utils.clamp(-12, 12, (e.clientX - lastX) * 0.6));
  lastX = e.clientX;
}

function showFollower(id: number) {
  activeMember.value = id;
  followerVisible.value = true;
}

function hideFollower() {
  followerVisible.value = false;
  rotTo?.(0);
}

function setupFollower() {
  if (!follower.value || !followerTilt.value) return;
  gsap.set(follower.value, { x: window.innerWidth / 2, y: window.innerHeight / 2 });
  xTo = gsap.quickTo(follower.value, 'x', { duration: 0.65, ease: 'power3.out' });
  yTo = gsap.quickTo(follower.value, 'y', { duration: 0.65, ease: 'power3.out' });
  rotTo = gsap.quickTo(followerTilt.value, 'rotation', { duration: 0.9, ease: 'power3.out' });
}

/* ----------------------------- Montage ----------------------------- */

let ctx: gsap.Context | null = null;

onMounted(() => {
  window.scrollTo({ top: 0, behavior: 'smooth' });

  ctx = gsap.context(() => {
    const mm = gsap.matchMedia();

    mm.add('(min-width: 1024px) and (prefers-reduced-motion: no-preference)', (context) => {
      horizontal.value = true;
      nextTick(() => {
        document.fonts.ready.then(() => {
          if (horizontal.value) context.add(() => setupHistory());
        });
      });
      return () => {
        horizontal.value = false;
        active.value = 0;
        if (historyTrack.value) gsap.set(historyTrack.value, { clearProps: 'transform' });
      };
    });

    mm.add('(min-width: 1024px) and (hover: hover) and (pointer: fine) and (prefers-reduced-motion: no-preference)', () => {
      followEnabled.value = true;
      nextTick(setupFollower);
      return () => {
        followEnabled.value = false;
        followerVisible.value = false;
        xTo = yTo = rotTo = null;
      };
    });

    mm.add('(prefers-reduced-motion: no-preference)', () => {
      gsap.fromTo(
        sunrise.value,
        { yPercent: 45, rotate: -40 },
        {
          yPercent: 0,
          rotate: 0,
          ease: 'none',
          scrollTrigger: { trigger: ctaSection.value, start: 'top bottom', end: 'bottom bottom', scrub: true },
        },
      );
    });
  }, rootEl.value ?? undefined);
});

onUnmounted(() => {
  ctx?.revert();
});
</script>

<style scoped>
.inline-face {
  display: inline-block;
  width: 0.9em;
  height: 0.9em;
  margin: 0 0.12em;
  vertical-align: -0.12em;
  animation: abo-bob 4s ease-in-out infinite;
}

@keyframes abo-bob {
  0%, 100% { transform: translateY(0) rotate(-6deg); }
  50% { transform: translateY(-0.08em) rotate(6deg); }
}

/* ------------------------------------------------------------------
   Frise : par défaut (mobile, tablette, mouvement réduit) empilée
   ------------------------------------------------------------------ */
.history {
  padding: 6rem 0;
}

.history-title {
  font-size: clamp(2.6rem, 7vw, 7rem);
  line-height: 0.9;
  letter-spacing: -0.045em;
}

.history-stage {
  margin: 3.5rem auto 0;
  width: 100%;
  max-width: 96rem;
  padding: 0 1.25rem;
}

.history-list {
  position: relative;
  display: grid;
  gap: 3rem;
  padding-left: 4.75rem;
}

.history-list::before {
  content: '';
  position: absolute;
  left: 1.6rem;
  top: 1.5rem;
  bottom: 1.5rem;
  width: 3px;
  border-radius: 999px;
  background: linear-gradient(180deg, #5edde7, #cdb8ff 30%, #ff8944 55%, #ff5bbc 78%, #fed94e);
  opacity: 0.8;
}

.chapter {
  position: relative;
}

.chapter-face {
  position: absolute;
  left: -4.75rem;
  top: 0;
  width: 3.4rem;
  height: 3.4rem;
  border-radius: 999px;
  box-shadow: 0 0 0 6px #1a0e2b;
}

.chapter-num {
  font-size: clamp(2.6rem, 5vw, 4rem);
  line-height: 0.8;
  letter-spacing: -0.06em;
  color: var(--c);
}

@media (min-width: 640px) {
  .history-stage { padding: 0 2rem; }
}

@media (min-width: 768px) {
  .history { padding: 10rem 0; }
  .history-list {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    column-gap: 3rem;
    row-gap: 4rem;
    padding-left: 0;
  }
  .history-list::before { display: none; }
  .chapter { padding-left: 4.75rem; }
  .chapter-face { left: 0; }
}

@media (min-width: 1024px) {
  .history-stage { padding: 0 3rem; }
  .history-list { grid-template-columns: repeat(3, minmax(0, 1fr)); }
}

/* ------------------------------------------------------------------
   Frise horizontale épinglée (≥ 1024 px, animations autorisées)
   ------------------------------------------------------------------ */
.history.is-horizontal {
  display: flex;
  flex-direction: column;
  height: 100svh;
  padding: 7rem 0 0;
  overflow: hidden;
}

.is-horizontal .history-title {
  font-size: clamp(2.6rem, 4.4vw, 4.75rem);
}

.is-horizontal .history-stage {
  position: relative;
  flex: 1 1 auto;
  min-height: 0;
  max-width: none;
  margin-top: 1.5rem;
  padding: 0;
}

.is-horizontal .history-track {
  position: relative;
  height: 100%;
  width: max-content;
  will-change: transform;
}

.is-horizontal .history-list {
  display: flex;
  height: 100%;
  gap: 0;
  padding: 0 60vw 0 44vw;
}

.is-horizontal .history-list::before {
  display: none;
}

.is-horizontal .chapter {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  flex: 0 0 auto;
  width: min(31rem, 36vw);
  margin-right: 7vw;
  padding: 0 0 max(2.5rem, 7svh);
}

.is-horizontal .chapter-num {
  color: transparent;
  -webkit-text-stroke: 1.5px rgb(255 248 239 / 0.3);
  transition: color 0.7s var(--ease-out-expo), -webkit-text-stroke-color 0.7s var(--ease-out-expo);
}

.is-horizontal .chapter.is-on .chapter-num {
  color: var(--c);
  -webkit-text-stroke-color: transparent;
}

.is-horizontal .chapter-body {
  opacity: 0.32;
  transform: translate3d(0, 1rem, 0);
  transition:
    opacity 0.8s var(--ease-out-expo),
    transform 0.9s var(--ease-out-expo);
}

.is-horizontal .chapter.is-on .chapter-body {
  opacity: 1;
  transform: none;
}

.history-prologue {
  position: absolute;
  left: max(3rem, calc((100vw - 96rem) / 2 + 3rem));
  bottom: max(2.5rem, 7svh);
  width: min(24rem, 30vw);
}

.history-fade {
  position: absolute;
  inset: 0 auto 0 0;
  width: 9vw;
  z-index: 1;
  pointer-events: none;
  background: linear-gradient(90deg, #1a0e2b, rgb(26 14 43 / 0));
}

.is-horizontal .chapter:not(.is-current).is-on .chapter-body {
  opacity: 0.55;
}

.history-svg {
  position: absolute;
  left: 0;
  top: 0;
  overflow: visible;
  pointer-events: none;
}

.curve-base {
  fill: none;
  stroke: rgb(255 248 239 / 0.16);
  stroke-width: 2;
  stroke-dasharray: 2 10;
  stroke-linecap: round;
}

.curve-drawn {
  fill: none;
  stroke: url(#abo-curve);
  stroke-width: 6;
  stroke-linecap: round;
}

.curve-stem {
  stroke: rgb(255 248 239 / 0.12);
  stroke-width: 1.5;
  stroke-dasharray: 3 6;
  transition: stroke 0.6s var(--ease-out-expo);
}

.curve-stem.is-on {
  stroke: rgb(255 248 239 / 0.35);
}

.curve-dot {
  fill: #1a0e2b;
  stroke: rgb(255 248 239 / 0.3);
  stroke-width: 2.5;
  transition: fill 0.5s var(--ease-out-expo), stroke 0.5s var(--ease-out-expo);
}

.curve-dot.is-on {
  fill: var(--c);
  stroke: var(--c);
}

.history-runner {
  position: absolute;
  left: 0;
  top: 0;
  width: 0;
  height: 0;
  pointer-events: none;
  z-index: 2;
}

.runner-halo {
  position: absolute;
  left: -3.25rem;
  top: -3.25rem;
  width: 6.5rem;
  height: 6.5rem;
  border-radius: 999px;
  opacity: 0.22;
  transition: background-color 0.6s var(--ease-out-expo);
  animation: abo-pulse 2.6s ease-in-out infinite;
}

.runner-face {
  position: absolute;
  left: -2.5rem;
  top: -2.5rem;
  width: 5rem;
  height: 5rem;
  filter: drop-shadow(0 10px 24px rgb(0 0 0 / 0.35));
  animation: abo-pop 0.7s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes abo-pulse {
  0%, 100% { transform: scale(0.85); }
  50% { transform: scale(1.12); }
}

@keyframes abo-pop {
  from { transform: scale(0.6) rotate(-20deg); }
  to { transform: none; }
}

/* ------------------------------------------------------------------
   Approche
   ------------------------------------------------------------------ */
.approach-fill {
  position: absolute;
  inset: 0;
  background: var(--c);
  transform: scaleY(0);
  transform-origin: bottom;
  transition: transform 0.6s var(--ease-out-expo);
}

.approach-row:hover .approach-fill {
  transform: scaleY(1);
}

.approach-row {
  padding-left: 0.75rem;
  padding-right: 0.75rem;
}

/* ------------------------------------------------------------------
   Valeurs
   ------------------------------------------------------------------ */
.value-face {
  transition: transform 0.8s cubic-bezier(0.34, 1.56, 0.64, 1);
}

.value-card:hover .value-face,
.value-card:focus-visible .value-face {
  transform: scale(1.12) rotate(-8deg);
}

/* ------------------------------------------------------------------
   Résultats : barres
   ------------------------------------------------------------------ */
.outcome-track {
  position: relative;
  height: 1.5rem;
  border-radius: 999px;
  background: rgb(26 14 43 / 0.07);
}

.outcome-fill {
  position: relative;
  height: 100%;
  width: var(--w);
  border-radius: 999px;
  background: var(--c);
  transition: width 1.8s var(--ease-out-expo) var(--d, 0s);
}

.outcome[data-reveal]:not(.is-revealed) .outcome-fill {
  width: 0;
}

.outcome-knob {
  position: absolute;
  right: -1.4rem;
  top: 50%;
  width: 2.8rem;
  height: 2.8rem;
  margin-top: -1.4rem;
  border-radius: 999px;
  box-shadow: 0 0 0 4px #fff8ef;
}

@media (min-width: 768px) {
  .outcome-track { height: 2rem; }
  .outcome-knob {
    right: -1.75rem;
    width: 3.5rem;
    height: 3.5rem;
    margin-top: -1.75rem;
  }
}

/* ------------------------------------------------------------------
   Équipe : liste éditoriale
   ------------------------------------------------------------------ */
.team-row {
  position: relative;
  transition: opacity 0.5s var(--ease-out-expo);
  cursor: default;
}

.team-name {
  display: inline-block;
  transition:
    transform 0.7s var(--ease-out-expo),
    color 0.4s var(--ease-out-expo);
}

.team-list:hover .team-row:not(:hover) {
  opacity: 0.3;
}

.team-row:hover .team-name {
  transform: translate3d(1.25rem, 0, 0);
  font-style: normal;
}

.team-row::after {
  content: '';
  position: absolute;
  left: 0;
  right: 0;
  bottom: -1px;
  height: 3px;
  background: var(--c);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.7s var(--ease-out-expo);
}

.team-row:hover::after {
  transform: scaleX(1);
}

.follower {
  position: fixed;
  left: 0;
  top: 0;
  z-index: 45;
  width: 0;
  height: 0;
  pointer-events: none;
}

.follower-tilt {
  position: absolute;
  left: 2.5rem;
  top: -12rem;
  width: 17rem;
  height: 22rem;
}

.follower-inner {
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border-radius: 2rem;
  opacity: 0;
  transform: scale(0.4);
  transition:
    opacity 0.35s var(--ease-out-expo),
    transform 0.6s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 30px 60px -20px rgb(26 14 43 / 0.45);
}

.follower.is-visible .follower-inner {
  opacity: 1;
  transform: none;
}

.follower-card {
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1.5rem;
  clip-path: inset(100% 0 0 0);
  transition: clip-path 0.6s var(--ease-out-expo);
}

.follower-card.is-active {
  z-index: 1;
  clip-path: inset(0 0 0 0);
}

.follower-initial {
  font-size: 9rem;
  line-height: 0.8;
  letter-spacing: -0.06em;
}

@media (prefers-reduced-motion: reduce) {
  .inline-face,
  .runner-halo,
  .runner-face {
    animation: none;
  }
  .outcome-fill {
    transition: none;
  }
}
</style>
