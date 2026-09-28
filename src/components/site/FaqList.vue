<template>
  <ul class="border-t" :class="dark ? 'border-paper/20' : 'border-ink/15'">
    <li
      v-for="(faq, index) in items"
      :key="faq.question"
      class="border-b"
      :class="dark ? 'border-paper/20' : 'border-ink/15'"
    >
      <h3>
        <button
          :id="`${uid}-q-${index}`"
          type="button"
          class="group flex w-full items-center justify-between gap-6 py-6 text-left md:py-8"
          :aria-expanded="open.includes(index)"
          :aria-controls="`${uid}-a-${index}`"
          @click="$emit('toggle', index)"
        >
          <span class="flex items-baseline gap-4 md:gap-6">
            <span class="label w-7 shrink-0" :class="dark ? 'text-paper/45' : 'text-ink/40'">
              {{ String(index + 1).padStart(2, '0') }}
            </span>
            <span class="font-display text-xl font-bold leading-tight tracking-[-0.025em] md:text-[1.75rem]">
              {{ faq.question }}
            </span>
          </span>
          <span
            class="grid h-11 w-11 shrink-0 place-items-center rounded-full border transition-[transform,background-color,color] duration-500 ease-out-expo"
            :class="[
              open.includes(index) ? 'rotate-45' : 'group-hover:rotate-90',
              open.includes(index)
                ? dark ? 'border-paper bg-paper text-ink' : 'border-ink bg-ink text-paper'
                : dark ? 'border-paper/30' : 'border-ink/20',
            ]"
          >
            <Icon name="plus" class="h-5 w-5" />
          </span>
        </button>
      </h3>
      <div
        :id="`${uid}-a-${index}`"
        role="region"
        :aria-labelledby="`${uid}-q-${index}`"
        class="grid transition-[grid-template-rows,visibility] duration-500 ease-out-expo"
        :class="open.includes(index) ? 'visible grid-rows-[1fr]' : 'invisible grid-rows-[0fr]'"
      >
        <div class="overflow-hidden">
          <p
            class="max-w-3xl pb-8 pl-11 text-pretty text-lg leading-relaxed md:pl-[3.25rem]"
            :class="dark ? 'text-paper/75' : 'text-ink/75'"
          >
            {{ faq.answer }}
          </p>
        </div>
      </div>
    </li>
  </ul>
</template>

<script setup lang="ts">
import { useId } from 'vue';
import Icon from '../ui/Icon.vue';

withDefaults(
  defineProps<{
    items: { question: string; answer: string }[];
    open: number[];
    dark?: boolean;
  }>(),
  { dark: false },
);

defineEmits<{ toggle: [index: number] }>();

const uid = useId();
</script>
