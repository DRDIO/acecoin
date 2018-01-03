<template>
  <v-app>
    <v-toolbar app fixed clipped-left>
      <v-toolbar-side-icon @click.stop="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title>Application</v-toolbar-title>
    </v-toolbar>

    <v-content>
      <v-container fluid fill-height>
        <v-layout>
          <li v-for="item in allTransactions" :key="item.id">
            {{ item.shares }} @ {{ item.symbol }}
          </li>

          <v-flex xs12 sm6 offset-sm3>
            <v-card>
              <Chart v-if="isReady" :data="sets" />
              <v-card-title primary-title>
                <div>
                  <h3 class="headline mb-0">BTC : ETH : LTC</h3>
                  <div>30 day timeline of Coinbase exchange</div>
                </div>
              </v-card-title>

              <v-data-table
                :headers="headers"
                :items="items"
                hide-actions
                class="elevation-1"
              >
              <template slot="items" scope="props">
                <td class="text-xs-right">{{ props.item.usdBuy }}</td>
                <td class="text-xs-right">{{ props.item.currency }}</td>
                <td class="text-xs-right">{{ props.item.shares }}</td>
              </template>
            </v-data-table>
            </v-card>
          </v-flex>
        </v-layout>
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
import Chart from '~/components/Chart.vue'
import { mapState } from 'vuex'
import allTransactions from '~/apollo/queries/allTransactions'

export default {
  apollo: {
    allTransactions: {
      prefetch: true,
      query: allTransactions
    }
  },
  data () {
    return {
      limit: 3,
      headers: [
        { text: 'USD Buy', value: 'usdBuy' },
        { text: 'Currency', value: 'currency' },
        { text: 'Shares', value: 'shares' }
      ],
      items: [
        { value: false, usdBuy: 0, currency: 'BTC', shares: 0 },
        { value: false, usdBuy: 0, currency: 'ETH', shares: 0 },
        { value: false, usdBuy: 0, currency: 'LTC', shares: 0 }
      ]
    }
  },

  computed: {
    isReady () {
      return Object.keys(this.$store.state.history.sets).length === this.limit
    },
    ...mapState({
      sets: state => state.history.sets
    })
  },

  async mounted () {
    await this.$store.dispatch('history/load')
    await this.$store.dispatch('history/load', { from: 'ETH' })
    await this.$store.dispatch('history/load', { from: 'LTC' })
  },

  components: {
    Chart
  }
}
</script>

<style>

</style>
