<template>
  <q-layout view="lHh Lpr lFf">
    <q-header elevated>
      <q-toolbar>
        <q-btn
          flat
          dense
          round
          icon="menu"
          aria-label="Menu"
          @click="leftDrawerOpen = !leftDrawerOpen"
        />

        <q-toolbar-title>
          Calculo App
        </q-toolbar-title>

        <div>App version 1.0.0</div>
      </q-toolbar>
    </q-header>

    <q-drawer
      v-model="leftDrawerOpen"
      show-if-above
      bordered
      content-class="bg-grey-1"
    >
      <q-list>
        <q-item-label
          header
          class="text-grey-8"
        >
          Menu
        </q-item-label>
        <EssentialLink
          v-for="link in essentialLinks"
          :key="link.title"
          v-bind="link"
        />
      </q-list>
    </q-drawer>

    <q-page-container>
      <keep-alive>
      <router-view />
      </keep-alive>
    </q-page-container>
  </q-layout>
</template>

<script>
import EssentialLink from 'components/EssentialLink'

export default {
  name: 'MainLayout',

  components: {
    EssentialLink
  },

  data () {
    return {
      leftDrawerOpen: false,
      essentialLinks: [
        {
          title: 'Cálculo PR ST - PMC',
          caption: '',
          icon: 'local_pharmacy',
          to: '/'
        },
         {
          title: 'Cálculo Generico ST - MVA',
          caption: 'Genéricos',
          icon: 'local_pharmacy',
          to: '/Genericos'
        },
         {
          title: 'Cálculo Santa Catarina ST - PMC',
          caption: 'Genéricos',
          icon: 'local_pharmacy',
          to: '/CalculoSc'
        }        
      ]
    }
  }
}
</script>
