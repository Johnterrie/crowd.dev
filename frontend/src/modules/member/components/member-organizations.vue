<template>
  <div v-if="orientation === 'vertical'">
    <div v-if="props.member.organizations?.length > 0">
      <router-link
        v-for="organization of props.member.organizations"
        :key="organization.id"
        :to="{
          name: 'organizationView',
          params: { id: organization.id }
        }"
        class="flex items-start hover:cursor-pointer"
        @click.stop
      >
        <div v-if="organization.logo">
          <div class="w-5 h-5 mr-1">
            <img :src="organization.logo" alt="Logo" />
          </div>
        </div>
        <div class="max-w-full">
          <p
            class="text-gray-900 text-sm text-ellipsis truncate hover:text-brand-500 transition leading-relaxed"
          >
            {{ organization.name || '-' }}
          </p>
          <div
            v-if="
              props.showTitle &&
              props.member.attributes.jobTitle?.default
            "
            class="text-gray-500 text-2xs truncate pr-4"
          >
            {{
              props.member.attributes.jobTitle?.default ||
              '-'
            }}
          </div>
        </div>
      </router-link>
    </div>
    <div
      v-else-if="props.member.attributes.jobTitle?.default"
    >
      <p class="text-gray-900 text-ellipsis truncate">-</p>
      <div
        v-if="props.showTitle"
        class="text-gray-500 text-2xs"
      >
        {{
          props.member.attributes.jobTitle?.default || '-'
        }}
      </div>
    </div>
    <div v-else class="text-gray-900">-</div>
  </div>
  <div
    v-else-if="
      member.attributes.jobTitle?.default ||
      props.member.organizations?.length
    "
    class="flex items-start grow mt-2"
  >
    <span
      v-if="member.attributes?.jobTitle?.default"
      class="text-gray-600 text-2xs mr-2 truncate block mt-0.5"
      >{{ member.attributes.jobTitle.default }}
      {{ member.organizations.length ? 'at' : '' }}</span
    >
    <div
      v-if="member.organizations.length"
      class="flex gap-2 flex-wrap max-w-[70%]"
    >
      <router-link
        v-for="organization of props.member.organizations"
        :key="organization.id"
        :to="{
          name: 'organizationView',
          params: { id: organization.id }
        }"
        class="text-gray-900 hover:text-brand-500 transition text-ellipsis truncate flex items-center hover:cursor-pointer gap-1.5 border px-1.5 rounded-md h-6"
        @click.stop
      >
        <img
          v-if="organization.logo"
          :src="organization.logo"
          alt="Logo"
          class="w-3.5"
        />
        <span class="text-xs">{{
          organization.name || '-'
        }}</span>
      </router-link>
    </div>
  </div>
  <div v-else class="text-gray-900">-</div>
  <app-paywall-modal
    v-model="isUpgradeModalOpen"
    module="organizations"
  />
</template>

<script>
export default {
  name: 'AppMemberOrganizations'
}
</script>

<script setup>
import { defineProps, ref } from 'vue'
import AppPaywallModal from '@/modules/layout/components/paywall-modal.vue'

const props = defineProps({
  member: {
    type: Object,
    required: true
  },
  showTitle: {
    type: Boolean,
    default: true
  },
  orientation: {
    type: String,
    default: () => 'vertical'
  }
})

const isUpgradeModalOpen = ref(false)
</script>
