<template>
  <div>
    <svg width="700" height="320">
      <g style="transform: translate(0, 10px)">
        <path :d="lines" />
      </g>
    </svg>
  </div>
</template>

<style lang="sass">
svg
  path
    fill: none
    stroke: #76BF8A
    stroke-width: 3px
</style>

<script>
import * as d3 from 'd3'

export default {
  name: 'vue-line-chart',
  props: {
    data: {
      type: Object,
      default: () => ({})
    }
  },
  data () {
    return {
      lines: [],
      error: 'None'
    }
  },
  mounted () {
    this.calculatePath()
  },
  watch: {
    data (newVal, oldVal) {
      this.calculatePath()
    }
  },
  methods: {
    getScales (set) {
      const x = d3.scaleTime().range([0, 700])
      const y = d3.scaleLinear().range([280, 0])
      d3.axisLeft().scale(x)
      d3.axisBottom().scale(y)
      x.domain(d3.extent(set, (d, i) => i))
      y.domain([0, d3.max(set, d => d)])
      return { x, y }
    },
    calculatePath () {
      const keys = Object.keys(this.data)
      const primary = this.data[keys[0]]
      const scale = this.getScales(primary)
      const path = d3.line()
        .x((d, i) => scale.x(i))
        .y(d => scale.y(d))
        .curve(d3.curveCardinal)

      this.lines = keys.map(r => path(this.data[r]))
    }
  }
}
</script>
