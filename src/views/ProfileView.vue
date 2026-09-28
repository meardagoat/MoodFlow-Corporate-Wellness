<template>
  <div class="min-h-screen">
    <!-- ============================================================
         EN-TÊTE : CARTE D'IDENTITÉ
         ============================================================ -->
    <section class="shell pt-6 md:pt-10" aria-labelledby="profile-title">
      <div class="flex flex-wrap items-end justify-between gap-x-10 gap-y-4">
        <p class="label text-ink/55">(05) Profil<span v-if="currentProfile?.service"> · {{ currentProfile.service }}</span></p>
        <p v-reveal="0.3" class="max-w-sm text-pretty text-lg leading-snug text-ink/65">
          Votre compte, vos préférences et vos données. Tout est ici, et tout reste sous votre contrôle.
        </p>
      </div>

      <div v-reveal="0.1" class="id-card relative mt-8 overflow-hidden rounded-[2.5rem] bg-ink text-paper">
        <div class="id-glow pointer-events-none absolute -left-24 -top-40 h-96 w-96 rounded-full bg-grape/45 blur-3xl" aria-hidden="true" />
        <div class="pointer-events-none absolute -bottom-40 right-10 h-80 w-80 rounded-full bg-tangerine/20 blur-3xl" aria-hidden="true" />

        <!-- Libellé vertical -->
        <p class="label absolute right-7 top-1/2 hidden origin-center -translate-y-1/2 translate-x-1/2 rotate-90 whitespace-nowrap text-paper/35 xl:block" aria-hidden="true">
          MoodFlow · Pass collaborateur · {{ memberCode }}
        </p>

        <div class="relative p-6 sm:p-8 lg:p-12 xl:pr-24">
          <div class="flex items-center justify-between gap-4">
            <p class="label flex items-center gap-2.5 text-paper/55">
              <span class="h-2 w-2 rounded-full bg-aqua" aria-hidden="true" />
              Carte membre
            </p>
            <p class="font-mono text-xs tracking-[0.08em] text-paper/45">N° {{ memberCode }}</p>
          </div>

          <div class="mt-8 grid items-center gap-8 md:grid-cols-[auto_minmax(0,1fr)] md:gap-10 lg:gap-14 xl:pr-52">
            <!-- Avatar soleil -->
            <div v-tilt class="avatar relative h-40 w-40 shrink-0 sm:h-48 sm:w-48 lg:h-64 lg:w-64" aria-hidden="true">
              <SunMark
                class="absolute inset-0 h-full w-full"
                :face="false"
                :ray-count="18"
                :ray-width="7"
                :ray-colors="['#FED94E', '#FF8944']"
                disc="#FED94E"
              />
              <span class="display absolute inset-0 grid place-items-center text-[4.2rem] leading-none tracking-[-0.06em] text-ink sm:text-[5rem] lg:text-[6.8rem]">
                {{ initial }}
              </span>
            </div>

            <div class="min-w-0">
              <h1 id="profile-title" v-split="{ chars: true, immediate: true, delay: 0.15 }" class="display break-words text-display-lg">
                {{ firstName }} <span v-if="lastName" class="accent text-sun">{{ lastName }}</span>
              </h1>

              <ul class="mt-6 flex flex-wrap gap-2" aria-label="Rôle et service">
                <li class="inline-flex items-center gap-2 rounded-full bg-sun px-3.5 py-2 text-sm font-semibold leading-none text-ink">
                  <Icon :name="roleIcon" class="h-4 w-4" />
                  {{ roleLabel }}
                </li>
                <li v-if="currentProfile?.service" class="chip border-paper/25 text-paper">
                  <Icon name="building" class="h-4 w-4 text-paper/60" />
                  {{ currentProfile.service }}
                </li>
                <li class="chip border-paper/25 text-paper">
                  <Icon name="shield" class="h-4 w-4 text-aqua" />
                  Conforme RGPD
                </li>
              </ul>
            </div>
          </div>

          <!-- Tampon rotatif -->
          <div class="stamp pointer-events-none absolute right-12 top-1/2 hidden h-40 w-40 -translate-y-1/2 xl:right-28 xl:block 2xl:h-44 2xl:w-44" aria-hidden="true">
            <svg viewBox="0 0 200 200" class="stamp-ring absolute inset-0 h-full w-full">
              <defs>
                <path id="stamp-circle" d="M100,100 m-78,0 a78,78 0 1,1 156,0 a78,78 0 1,1 -156,0" />
              </defs>
              <circle cx="100" cy="100" r="96" fill="none" stroke="rgb(255 248 239 / 0.18)" stroke-dasharray="2 6" />
              <text class="font-mono" font-size="13" letter-spacing="4.6" fill="rgb(255 248 239 / 0.6)">
                <textPath href="#stamp-circle">MOODFLOW · MEMBRE VÉRIFIÉ · {{ memberYear }} · </textPath>
              </text>
            </svg>
            <span class="absolute inset-[30%] grid place-items-center rounded-full bg-paper">
              <MoodFace mood="very_happy" class="h-[80%] w-[80%]" />
            </span>
          </div>

          <!-- Méta -->
          <dl class="id-meta mt-10 grid grid-cols-2 gap-x-6 gap-y-6 border-t border-dashed border-paper/20 pt-6 lg:grid-cols-4">
            <div class="min-w-0">
              <dt class="label text-paper/45">Membre depuis</dt>
              <dd class="mt-2.5 font-mono text-sm text-paper/90">{{ memberSince }}</dd>
            </div>
            <div class="min-w-0">
              <dt class="label text-paper/45">Ancienneté</dt>
              <dd class="mt-2.5 font-mono text-sm text-paper/90">{{ tenure }}</dd>
            </div>
            <div class="min-w-0">
              <dt class="label text-paper/45">Mise à jour</dt>
              <dd class="mt-2.5 font-mono text-sm text-paper/90">{{ lastUpdate }}</dd>
            </div>
            <div class="col-span-2 min-w-0 lg:col-span-1">
              <dt class="label text-paper/45">E-mail</dt>
              <dd class="mt-2.5 truncate font-mono text-sm text-paper/90" :title="currentUser?.email">{{ currentUser?.email || '—' }}</dd>
            </div>
          </dl>
        </div>
      </div>
    </section>

    <!-- ============================================================
         RÉGLAGES (BENTO)
         ============================================================ -->
    <section class="shell mt-16 md:mt-20" aria-labelledby="settings-title">
      <div class="flex flex-wrap items-end justify-between gap-4">
        <h2 id="settings-title" v-split class="display text-display-md">Vos <span class="accent">réglages</span></h2>
        <p class="label text-ink/50">Compte · Confidentialité · Données</p>
      </div>

      <div class="mt-8 grid gap-3 md:grid-cols-12">
        <!-- (01) Compte -->
        <article v-reveal="0.05" class="rounded-[2.5rem] border border-ink/10 bg-white p-6 sm:p-8 md:col-span-7" aria-labelledby="account-title">
          <div class="flex items-start justify-between gap-4">
            <div>
              <p class="label text-ink/50">(01) Compte</p>
              <h3 id="account-title" class="display mt-4 text-display-sm">Vos <span class="accent text-grape">informations</span></h3>
            </div>
            <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-lilac">
              <Icon name="user" class="h-5 w-5" />
            </span>
          </div>

          <form @submit.prevent="updateProfileInfo" class="mt-8 space-y-5">
            <div>
              <label for="email" class="field-label">Adresse e-mail</label>
              <div class="relative">
                <input
                  id="email"
                  :value="currentUser?.email"
                  type="email"
                  disabled
                  class="field pr-11"
                  aria-describedby="email-help"
                />
                <Icon name="lock" class="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-ink/35" />
              </div>
              <p id="email-help" class="mt-2 text-xs text-ink/50">L'e-mail ne peut pas être modifié directement : passez par une demande.</p>
            </div>

            <div class="grid gap-5 sm:grid-cols-2">
              <div>
                <label for="display_name" class="field-label">Nom d'affichage</label>
                <input
                  id="display_name"
                  v-model="displayName"
                  type="text"
                  class="field"
                  placeholder="Votre nom (facultatif)"
                />
              </div>
              <div>
                <label for="service" class="field-label">Service</label>
                <input
                  id="service"
                  v-model="service"
                  type="text"
                  class="field"
                />
              </div>
            </div>

            <div>
              <label for="role" class="field-label">Rôle</label>
              <select
                id="role"
                v-model="role"
                class="field"
                :disabled="!isSystemAdmin"
                :aria-describedby="!isSystemAdmin ? 'role-help' : undefined"
              >
                <option value="employee">Collaborateur</option>
                <option value="manager">Manager</option>
                <option v-if="isSystemAdmin" value="system_admin">Super admin</option>
              </select>
              <p v-if="!isSystemAdmin" id="role-help" class="mt-2 text-xs text-ink/50">
                Seuls les super admins peuvent modifier les rôles.
              </p>
            </div>

            <div v-if="updateError" class="notice notice-error" role="alert">
              {{ updateError }}
            </div>
            <div v-if="updateSuccess" class="notice notice-success" role="status">
              Profil mis à jour avec succès.
            </div>

            <div class="flex flex-col gap-3 pt-1 sm:flex-row sm:items-center">
              <button type="submit" :disabled="updating" class="btn btn-ink">
                <RollText :text="updating ? 'Enregistrement…' : 'Enregistrer'" />
                <span class="btn-dot"><Icon name="check" /></span>
              </button>
              <p class="text-xs text-ink/50">Modifications appliquées immédiatement.</p>
            </div>
          </form>
        </article>

        <!-- (02) Demandes de modification -->
        <article v-reveal="0.12" class="relative flex flex-col overflow-hidden rounded-[2.5rem] bg-sun p-6 sm:p-8 md:col-span-5" aria-labelledby="requests-title">
          <MoodFace mood="peek" class="pointer-events-none absolute -bottom-8 -right-6 h-36 w-36 rotate-[-12deg] opacity-90" aria-hidden="true" />
          <p class="label text-ink/60">(02) Demandes</p>
          <h3 id="requests-title" class="display mt-4 text-display-sm">Un <span class="accent">changement</span>&nbsp;?</h3>
          <p class="mt-3 max-w-sm text-pretty text-ink/75">
            Certaines informations sont vérifiées par un administrateur. Choisissez ce que vous souhaitez modifier.
          </p>

          <ul class="relative mt-6 space-y-2">
            <li v-for="req in requestTypes" :key="req.type">
              <button
                type="button"
                class="group flex w-full items-center gap-3 rounded-full bg-paper/70 py-2 pl-2 pr-4 text-left font-semibold transition-[background-color,transform] duration-500 ease-out-back hover:translate-x-1 hover:bg-paper"
                @click="openModificationRequest(req.type)"
              >
                <span class="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-ink text-sun">
                  <Icon :name="req.icon" class="h-4 w-4" />
                </span>
                <span class="min-w-0 flex-1 truncate">{{ req.label }}</span>
                <Icon name="arrow-up-right" class="h-4 w-4 shrink-0 text-ink/45 transition-transform duration-500 ease-out-back group-hover:rotate-45 group-hover:text-ink" />
              </button>
            </li>
          </ul>

          <button type="button" class="btn btn-ink relative mt-6 self-start" @click="openModificationRequest()">
            <RollText text="Nouvelle demande" />
            <span class="btn-dot"><Icon name="pen" /></span>
          </button>
        </article>

        <!-- (03) Consentements -->
        <article v-reveal="0.05" class="rounded-[2.5rem] border border-ink/10 bg-white p-6 sm:p-8 md:col-span-7" aria-labelledby="consents-title">
          <p class="label text-ink/50">(03) Confidentialité</p>
          <h3 id="consents-title" class="display mt-4 text-display-sm">Vos <span class="accent text-grape">consentements</span></h3>
          <p class="mt-3 max-w-md text-sm text-ink/60">Modifiables à tout moment. Chaque changement est enregistré aussitôt.</p>

          <div class="mt-6 space-y-2">
            <label
              v-for="c in consentItems"
              :key="c.key"
              :for="c.id"
              class="consent-row group flex cursor-pointer items-center gap-4 rounded-3xl border border-ink/10 p-4 transition-colors duration-300 hover:border-ink/25 sm:gap-5 sm:p-5"
              :class="consents[c.key] ? 'bg-paper' : 'bg-white'"
            >
              <span
                class="hidden h-11 w-11 shrink-0 place-items-center rounded-full transition-colors duration-300 sm:grid"
                :class="consents[c.key] ? c.bg : 'bg-ink/[0.06]'"
              >
                <Icon :name="c.icon" class="h-5 w-5" />
              </span>
              <span class="min-w-0 flex-1">
                <span class="flex flex-wrap items-center gap-x-3 gap-y-1">
                  <span class="font-semibold">{{ c.title }}</span>
                  <span class="font-mono text-[10px] uppercase tracking-[0.12em]" :class="consents[c.key] ? 'text-ink/70' : 'text-ink/40'">
                    {{ consents[c.key] ? 'Activé' : 'Désactivé' }}
                  </span>
                </span>
                <span class="mt-1 block text-pretty text-sm text-ink/60">{{ c.description }}</span>
              </span>
              <input
                :id="c.id"
                v-model="consents[c.key]"
                type="checkbox"
                class="peer sr-only"
                @change="updateConsents"
              />
              <span class="switch" aria-hidden="true" />
            </label>
          </div>

          <div v-if="consentUpdateSuccess" class="notice notice-success mt-4" role="status">
            Préférences de confidentialité enregistrées.
          </div>
        </article>

        <!-- (04) Identifiant anonyme -->
        <article v-reveal="0.12" class="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-grape p-6 text-paper sm:p-8 md:col-span-5" aria-labelledby="anon-title">
          <div>
            <div class="flex items-start justify-between gap-4">
              <p class="label text-paper/65">(04) Anonymat</p>
              <span class="grid h-12 w-12 shrink-0 place-items-center rounded-full bg-paper/15">
                <Icon name="mask" class="h-5 w-5" />
              </span>
            </div>
            <h3 id="anon-title" class="display mt-4 text-display-sm">Votre <span class="accent text-sun">masque</span></h3>
            <p class="mt-3 max-w-sm text-pretty text-paper/75">
              Cet identifiant unique signe vos publications et conversations anonymes. Les autres personnes ne peuvent pas le relier à votre compte.
            </p>
          </div>
          <div class="mt-8 flex items-center gap-4" aria-hidden="true">
            <div class="flex -space-x-3">
              <MoodFace
                v-for="m in crowd"
                :key="m"
                :mood="m"
                class="h-11 w-11 rounded-full ring-[3px] ring-grape transition-transform duration-500 ease-out-back hover:-translate-y-1.5"
              />
            </div>
            <p class="text-sm text-paper/70">Vous, <span class="accent text-base text-sun">incognito</span>, parmi les autres.</p>
          </div>
          <div class="mt-6">
            <p class="label text-paper/50">Identifiant anonyme</p>
            <p class="mt-3 flex items-center gap-3 rounded-2xl bg-ink/30 px-4 py-3.5">
              <span class="relative flex h-2 w-2 shrink-0" aria-hidden="true">
                <span class="absolute inline-flex h-full w-full animate-ping rounded-full bg-aqua opacity-70" />
                <span class="relative inline-flex h-2 w-2 rounded-full bg-aqua" />
              </span>
              <code class="min-w-0 break-all font-mono text-sm text-paper">{{ currentProfile?.anonymous_id || '—' }}</code>
            </p>
          </div>
        </article>

        <!-- (05) Export -->
        <article v-reveal="0.05" class="group/export relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-aqua p-6 sm:p-8 md:col-span-5" aria-labelledby="export-card-title">
          <div>
            <p class="label text-ink/60">(05) Portabilité</p>
            <h3 id="export-card-title" class="display mt-4 text-display-sm">Emportez vos <span class="accent">données</span></h3>
            <p class="mt-3 max-w-sm text-pretty text-ink/75">
              Profil, publications et messages, réunis dans un fichier JSON lisible.
            </p>
          </div>
          <div class="mt-8 flex flex-wrap items-end justify-between gap-4">
            <button type="button" class="btn btn-ink" @click="showExportModal = true">
              <RollText text="Exporter mes données" />
              <span class="btn-dot"><Icon name="download" /></span>
            </button>
            <p class="display hidden text-[3.2rem] leading-none xl:block tracking-[-0.06em] text-ink/15 transition-colors duration-500 group-hover/export:text-ink/30" aria-hidden="true">.json</p>
          </div>
        </article>

        <!-- (06) Conservation -->
        <article v-reveal="0.12" class="rounded-[2.5rem] bg-paper-deep/80 p-6 sm:p-8 md:col-span-7" aria-labelledby="retention-title">
          <p class="label text-ink/50">(06) Conservation</p>
          <h3 id="retention-title" class="display mt-4 text-display-sm">Combien de <span class="accent text-tangerine">temps</span>&nbsp;?</h3>
          <ul class="mt-6 grid gap-3 sm:grid-cols-3">
            <li v-for="r in retention" :key="r.what" class="flex items-center gap-5 rounded-3xl bg-white/70 p-5 sm:flex-col sm:items-start sm:justify-between sm:gap-6">
              <p class="display w-28 shrink-0 text-[2.4rem] leading-[0.9] tracking-[-0.05em] sm:w-auto">
                {{ r.value }}<span v-if="r.unit" class="accent ml-1 text-[0.5em] tracking-normal text-ink/55">{{ r.unit }}</span>
              </p>
              <p class="text-sm leading-snug text-ink/65">{{ r.what }}</p>
            </li>
          </ul>
        </article>

        <!-- (07) Droits RGPD -->
        <article v-reveal="0.05" class="rounded-[2.5rem] border border-ink/10 bg-white p-6 sm:p-8 md:col-span-8" aria-labelledby="rights-title">
          <div class="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p class="label text-ink/50">(07) RGPD</p>
              <h3 id="rights-title" class="display mt-4 text-display-sm">Vos <span class="accent text-grape">droits</span></h3>
            </div>
            <a href="mailto:dpo@moodflow.com" class="group inline-flex items-center gap-2 text-sm font-semibold">
              <span class="grid h-9 w-9 place-items-center rounded-full bg-ink text-paper transition-transform duration-500 ease-out-back group-hover:scale-110">
                <Icon name="mail" class="h-4 w-4" />
              </span>
              <span class="link">dpo@moodflow.com</span>
            </a>
          </div>
          <ol class="mt-6 grid gap-2 sm:grid-cols-2">
            <li
              v-for="(right, i) in gdprRights"
              :key="right"
              class="flex items-baseline gap-3 rounded-2xl bg-paper px-4 py-3.5 text-sm transition-colors duration-300 hover:bg-lilac/40"
            >
              <span class="font-mono text-xs text-ink/45">{{ String(i + 1).padStart(2, '0') }}</span>
              <span class="min-w-0">{{ right }}</span>
            </li>
          </ol>
          <p class="mt-5 text-pretty text-sm text-ink/60">
            Une question sur le traitement de vos données, ou envie d'exercer l'un de ces droits&nbsp;? Écrivez à notre délégué à la protection des données.
          </p>
        </article>

        <!-- (08) Session -->
        <article v-reveal="0.12" class="relative flex flex-col justify-between overflow-hidden rounded-[2.5rem] bg-ink p-6 text-paper sm:p-8 md:col-span-4" aria-labelledby="session-title">
          <SunMark class="pointer-events-none absolute -right-14 -top-14 h-44 w-44 opacity-90" :face="true" state="sleepy" :ray-count="14" :ray-width="7" :blink="false" aria-hidden="true" />
          <div class="relative">
            <p class="label text-paper/55">(08) Session</p>
            <h3 id="session-title" class="display mt-4 text-display-sm">À <span class="accent text-sun">bientôt</span></h3>
            <p class="mt-3 text-sm text-paper/65">Fermez votre session sur cet appareil.</p>
            <div class="mt-6 flex items-center gap-3 rounded-full bg-paper/[0.08] p-1.5 pr-4">
              <span class="display grid h-10 w-10 shrink-0 place-items-center rounded-full bg-sun text-ink">{{ initial }}</span>
              <span class="min-w-0">
                <span class="block truncate text-sm font-semibold">{{ currentProfile?.display_name || 'Utilisateur' }}</span>
                <span class="block truncate font-mono text-[11px] text-paper/55">{{ currentUser?.email }}</span>
              </span>
            </div>
          </div>
          <div class="relative mt-8 flex flex-col gap-2.5">
            <router-link v-if="isSystemAdmin" to="/admin" class="btn btn-sun">
              <Icon name="crown" class="h-4 w-4" />
              Panneau d'administration
            </router-link>
            <button type="button" @click="handleSignOut" class="btn btn-outline-light">
              <Icon name="logout" class="h-4 w-4" />
              Se déconnecter
            </button>
          </div>
        </article>

        <!-- Zone sensible -->
        <article v-reveal="0.05" class="danger-zone relative overflow-hidden rounded-[2.5rem] border-2 border-coral bg-coral/[0.08] p-6 sm:p-8 md:col-span-12 lg:p-10" aria-labelledby="danger-title">
          <div class="danger-stripes pointer-events-none absolute inset-y-0 right-0 hidden w-1/3 md:block" aria-hidden="true" />
          <div class="relative grid items-center gap-8 md:grid-cols-[minmax(0,1fr)_auto]">
            <div class="min-w-0">
              <p class="label flex items-center gap-2.5 text-[#9F1239]">
                <span class="grid h-6 w-6 place-items-center rounded-full bg-coral text-ink"><Icon name="info" class="h-3.5 w-3.5" /></span>
                Zone sensible
              </p>
              <h3 id="danger-title" class="display mt-5 text-display-sm">Supprimer mon <span class="accent text-[#C81E3A]">compte</span></h3>
              <p class="mt-3 max-w-xl text-pretty text-ink/70">
                Votre profil, vos publications et vos messages seront effacés définitivement. Cette action est irréversible&nbsp;: pensez à exporter vos données avant.
              </p>
            </div>
            <button type="button" class="btn btn-danger btn-lg justify-self-start md:justify-self-end" @click="openDeleteModal">
              <Icon name="trash" class="h-5 w-5" />
              Supprimer mon compte
            </button>
          </div>
        </article>
      </div>
    </section>

    <!-- ============================================================
         MODALES
         ============================================================ -->
    <Teleport to="body">
      <Transition
        enter-active-class="transition duration-300 ease-out-expo"
        leave-active-class="transition duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showExportModal"
          class="modal-backdrop"
          @click.self="showExportModal = false"
          @keydown.esc="showExportModal = false"
        >
          <div class="modal-panel p-6 sm:p-8" role="dialog" aria-modal="true" aria-labelledby="export-title" data-lenis-prevent>
            <div class="flex items-start justify-between gap-4">
              <span class="grid h-14 w-14 place-items-center rounded-full bg-aqua">
                <Icon name="download" class="h-6 w-6" />
              </span>
              <button type="button" class="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/[0.06]" aria-label="Fermer" @click="showExportModal = false">
                <Icon name="x" class="h-5 w-5" />
              </button>
            </div>
            <p class="label mt-6 text-ink/50">Portabilité</p>
            <h3 id="export-title" class="display mt-3 text-3xl tracking-[-0.04em]">Exporter vos <span class="accent">données</span></h3>
            <p class="mt-3 text-ink/70">
              Vous allez télécharger l'ensemble de vos données au format JSON&nbsp;:
            </p>
            <ul class="mt-4 flex flex-wrap gap-2">
              <li class="tag"><Icon name="user" class="h-3.5 w-3.5" />Profil</li>
              <li class="tag"><Icon name="grid" class="h-3.5 w-3.5" />Publications</li>
              <li class="tag"><Icon name="message" class="h-3.5 w-3.5" />Messages</li>
            </ul>

            <div class="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
              <button type="button" @click="showExportModal = false" class="btn btn-outline flex-1">
                Annuler
              </button>
              <button type="button" @click="exportData" :disabled="exporting" class="btn btn-ink flex-1">
                <Icon name="download" class="h-4 w-4" />
                {{ exporting ? 'Export en cours…' : 'Télécharger' }}
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <Transition
        enter-active-class="transition duration-300 ease-out-expo"
        leave-active-class="transition duration-200 ease-in"
        enter-from-class="opacity-0"
        leave-to-class="opacity-0"
      >
        <div
          v-if="showDeleteModal"
          class="modal-backdrop"
          @click.self="showDeleteModal = false"
          @keydown.esc="showDeleteModal = false"
        >
          <div class="modal-panel overflow-hidden" role="alertdialog" aria-modal="true" aria-labelledby="delete-title" aria-describedby="delete-desc" data-lenis-prevent>
            <div class="h-2 w-full danger-stripes-solid" aria-hidden="true" />
            <div class="p-6 sm:p-8">
              <div class="flex items-start justify-between gap-4">
                <span class="grid h-14 w-14 place-items-center rounded-full bg-coral">
                  <Icon name="trash" class="h-6 w-6" />
                </span>
                <button type="button" class="grid h-10 w-10 place-items-center rounded-full transition-colors hover:bg-ink/[0.06]" aria-label="Fermer" @click="showDeleteModal = false">
                  <Icon name="x" class="h-5 w-5" />
                </button>
              </div>
              <p class="label mt-6 text-[#9F1239]">Zone sensible</p>
              <h3 id="delete-title" class="display mt-3 text-3xl tracking-[-0.04em]">Supprimer votre <span class="accent text-[#C81E3A]">compte</span>&nbsp;?</h3>
              <div id="delete-desc" class="mt-3 space-y-2 text-ink/70">
                <p>Cette action est définitive et ne peut pas être annulée.</p>
                <p>Toutes vos données, y compris vos publications et vos messages, seront supprimées.</p>
              </div>

              <div class="mt-6">
                <label for="delete-confirm" class="field-label">
                  Pour confirmer, saisissez <span class="font-mono font-semibold text-ink">{{ DELETE_WORD }}</span>
                </label>
                <input
                  id="delete-confirm"
                  v-model="deleteConfirmText"
                  type="text"
                  class="field font-mono uppercase tracking-[0.1em]"
                  autocomplete="off"
                  autocapitalize="characters"
                  spellcheck="false"
                />
              </div>

              <div class="mt-8 flex flex-col-reverse gap-3 sm:flex-row">
                <button type="button" @click="showDeleteModal = false" class="btn btn-outline flex-1">
                  Annuler
                </button>
                <button
                  type="button"
                  @click="deleteAccount"
                  :disabled="deleting || !deleteConfirmed"
                  class="btn btn-danger flex-1"
                >
                  <Icon name="trash" class="h-4 w-4" />
                  {{ deleting ? 'Suppression…' : 'Supprimer définitivement' }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </Teleport>

    <ModificationRequestModal
      :is-open="showModificationRequest"
      :type="modificationType"
      @close="showModificationRequest = false"
      @success="handleRequestSuccess"
    />
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted, reactive, computed } from 'vue';
import { useRouter } from 'vue-router';
import { supabase } from '../lib/supabase';
import { currentUser, currentProfile, signOut, updateProfile, isSystemAdmin } from '../lib/auth';
import ModificationRequestModal from '../components/ModificationRequestModal.vue';
import Icon, { type IconName } from '../components/ui/Icon.vue';
import RollText from '../components/ui/RollText.vue';
import SunMark from '../components/brand/SunMark.vue';
import MoodFace from '../components/brand/MoodFace.vue';

type RequestType = 'email_change' | 'service_change' | 'display_name_change';

const showModificationRequest = ref(false);
const modificationType = ref<RequestType | undefined>(undefined);

const requestTypes: { type: RequestType; label: string; icon: IconName }[] = [
  { type: 'email_change', label: 'Adresse e-mail', icon: 'mail' },
  { type: 'service_change', label: 'Service', icon: 'building' },
  { type: 'display_name_change', label: "Nom d'affichage", icon: 'pen' },
];

function openModificationRequest(type?: RequestType) {
  modificationType.value = type;
  showModificationRequest.value = true;
}

const gdprRights = [
  "Droit d'accès à vos données personnelles",
  'Droit de rectification des données inexactes',
  "Droit à l'effacement (« droit à l'oubli »)",
  'Droit à la limitation du traitement',
  'Droit à la portabilité des données',
  "Droit d'opposition au traitement",
];

const crowd = ['happy', 'neutral', 'closed', 'very_happy', 'sad'] as const;

const retention = [
  { value: '∞', unit: '', what: 'Informations de profil, tant que votre compte est actif' },
  { value: '12', unit: 'mois', what: 'Publications et messages, à compter de leur création' },
  { value: '30', unit: 'jours', what: "Journaux d'utilisation" },
];

// Carte d'identité
const nameParts = computed(() => (currentProfile.value?.display_name || 'Utilisateur').trim().split(/\s+/));
const firstName = computed(() => nameParts.value[0]);
const lastName = computed(() => nameParts.value.slice(1).join(' '));
const initial = computed(() => (firstName.value.charAt(0) || 'U').toUpperCase());

const ROLE_LABELS: Record<string, { label: string; icon: IconName }> = {
  employee: { label: 'Collaborateur', icon: 'user' },
  manager: { label: 'Manager', icon: 'users' },
  system_admin: { label: 'Super admin', icon: 'crown' },
};
const roleLabel = computed(() => ROLE_LABELS[currentProfile.value?.role || 'employee']?.label || 'Collaborateur');
const roleIcon = computed<IconName>(() => ROLE_LABELS[currentProfile.value?.role || 'employee']?.icon || 'user');

function formatLongDate(iso?: string | null) {
  if (!iso) return '—';
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? '—' : d.toLocaleDateString('fr-FR', { day: 'numeric', month: 'long', year: 'numeric' });
}
const memberSince = computed(() => formatLongDate(currentProfile.value?.created_at));
const lastUpdate = computed(() => formatLongDate(currentProfile.value?.updated_at));
const tenure = computed(() => {
  const iso = currentProfile.value?.created_at;
  if (!iso) return '—';
  const days = Math.max(0, Math.floor((Date.now() - new Date(iso).getTime()) / 86400000));
  if (days < 1) return "Arrivé·e aujourd'hui";
  if (days < 60) return `${days} jour${days > 1 ? 's' : ''}`;
  const months = Math.floor(days / 30.44);
  if (months < 24) return `${months} mois`;
  return `${Math.floor(months / 12)} ans`;
});
const memberYear = computed(() => {
  const iso = currentProfile.value?.created_at;
  return iso ? new Date(iso).getFullYear() : new Date().getFullYear();
});
const memberCode = computed(() => {
  const id = currentProfile.value?.id || '';
  let h = 0;
  for (const ch of id) h = (h * 31 + ch.charCodeAt(0)) >>> 0;
  return `MF-${String(h % 100000).padStart(5, '0')}`;
});

const consentItems: { key: 'analytics' | 'marketing' | 'thirdParty'; id: string; title: string; description: string; icon: IconName; bg: string }[] = [
  { key: 'analytics', id: 'analytics_consent', title: "Mesure d'audience", description: "Autoriser la collecte anonyme de données d'utilisation pour améliorer le service.", icon: 'chart', bg: 'bg-aqua' },
  { key: 'marketing', id: 'marketing_consent', title: 'Actualités', description: 'Recevoir des nouvelles sur les fonctionnalités et les améliorations.', icon: 'send', bg: 'bg-sun' },
  { key: 'thirdParty', id: 'third_party_consent', title: 'Partage avec des tiers', description: 'Autoriser le partage de données anonymisées avec des partenaires de confiance.', icon: 'globe', bg: 'bg-lilac' },
];

// Confirmation de suppression
const DELETE_WORD = 'SUPPRIMER';
const deleteConfirmText = ref('');
const deleteConfirmed = computed(() => deleteConfirmText.value.trim().toUpperCase() === DELETE_WORD);
function openDeleteModal() {
  deleteConfirmText.value = '';
  showDeleteModal.value = true;
}

const router = useRouter();

const displayName = ref('');
const service = ref('');
const role = ref<'employee' | 'manager' | 'system_admin'>('employee');
const updating = ref(false);
const updateError = ref('');
const updateSuccess = ref(false);
const showExportModal = ref(false);
const showDeleteModal = ref(false);
const exporting = ref(false);
const deleting = ref(false);
const consentUpdateSuccess = ref(false);

const consents = reactive({
  analytics: false,
  marketing: false,
  thirdParty: false
});

onMounted(() => {
  if (currentProfile.value) {
    displayName.value = currentProfile.value.display_name || '';
    service.value = currentProfile.value.service;
    role.value = currentProfile.value.role;

    // Charger les consentements existants
    if (currentProfile.value.consents) {
      consents.analytics = currentProfile.value.consents.analytics || false;
      consents.marketing = currentProfile.value.consents.marketing || false;
      consents.thirdParty = currentProfile.value.consents.thirdParty || false;
    }
  }
});

async function updateProfileInfo() {
  updating.value = true;
  updateError.value = '';
  updateSuccess.value = false;

  const { error } = await updateProfile({
    display_name: displayName.value || null,
    service: service.value,
    role: role.value,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    updateError.value = error.message;
  } else {
    updateSuccess.value = true;
    setTimeout(() => {
      updateSuccess.value = false;
    }, 3000);
  }

  updating.value = false;
}

async function updateConsents() {
  if (!currentProfile.value) return;

  try {
    const { error } = await supabase
      .from('profiles')
      .update({
        consents: consents,
        updated_at: new Date().toISOString()
      })
      .eq('id', currentProfile.value.id);

    if (error) {
      console.error('Error updating consents:', error);
    } else {
      consentUpdateSuccess.value = true;
      setTimeout(() => {
        consentUpdateSuccess.value = false;
      }, 3000);
    }
  } catch (error) {
    console.error('Error updating consents:', error);
  }
}

async function exportData() {
  if (!currentProfile.value) return;

  exporting.value = true;

  const { data: posts } = await supabase
    .from('posts')
    .select('*')
    .eq('user_id', currentProfile.value.id);

  const { data: messages } = await supabase
    .from('chat_messages')
    .select('*')
    .eq('sender_id', currentProfile.value.id);

  const exportData = {
    profile: currentProfile.value,
    posts: posts || [],
    messages: messages || [],
    exported_at: new Date().toISOString(),
  };

  const blob = new Blob([JSON.stringify(exportData, null, 2)], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = `moodflow-data-${new Date().toISOString().split('T')[0]}.json`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);

  exporting.value = false;
  showExportModal.value = false;
}

async function deleteAccount() {
  if (!currentUser.value) return;

  deleting.value = true;

  try {
    // Supprimer d'abord les données du profil
    await supabase
      .from('profiles')
      .delete()
      .eq('id', currentUser.value.id);

    // Supprimer le compte utilisateur via l'API client
    await supabase.auth.updateUser({
      data: { deleted: true }
    });

    await signOut();
    router.push('/login');
  } catch (error) {
    alert('Erreur lors de la suppression du compte. Veuillez contacter le support.');
    deleting.value = false;
  }
}

async function handleSignOut() {
  await signOut();
  router.push('/login');
}

function handleRequestSuccess() {
  // Optionnel: recharger les données du profil
  console.log('Demande de modification envoyée');
}
</script>

<style scoped>
.id-glow {
  animation: id-glow 12s ease-in-out infinite alternate;
}

.stamp-ring {
  animation: stamp-spin 28s linear infinite;
}

@keyframes stamp-spin {
  to {
    transform: rotate(360deg);
  }
}

@keyframes id-glow {
  to {
    transform: translate(3rem, 2rem) scale(1.15);
  }
}

.avatar :deep(svg) {
  filter: drop-shadow(0 20px 40px rgb(254 217 78 / 0.25));
}

.danger-stripes {
  background-image: repeating-linear-gradient(
    -45deg,
    rgb(250 77 82 / 0.12) 0 14px,
    transparent 14px 28px
  );
  mask-image: linear-gradient(to left, #000 20%, transparent);
  -webkit-mask-image: linear-gradient(to left, #000 20%, transparent);
}

.danger-stripes-solid {
  background-image: repeating-linear-gradient(-45deg, #fa4d52 0 10px, #1a0e2b 10px 20px);
}

@media (prefers-reduced-motion: reduce) {
  .id-glow,
  .stamp-ring {
    animation: none;
  }
}
</style>
