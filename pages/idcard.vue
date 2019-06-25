<template>
  <div>
    <div class="hero is-fullheight">
      <div class="hero-body">
        <div>
          <h1 class="subtitle is-1">
            Generate ID Cards
          </h1>
        </div>
        <div>
          <b-select v-model="class_id" placeholder="Select Class:">
            <option v-for="c in classes" :key="c.id" :value="c.id">
              {{ c.name }}
            </option>
          </b-select>
          <b-button v-if="class_id !== null" type="is-primary" @click="generate">
            Generate
          </b-button>
        </div>
      </div>
    </div>
    <div class="container" style="display: none">
      <a id="dl_link">
        <canvas id="qr_canvas" width="2480" height="3508" />
      </a>
    </div>
  </div>
</template>

<script>
import qrcode from 'qrcode-generator'
export default {
  data: function () {
    return { class_id: null }
  },
  meta: {
    requiresLogin: true
  },
  async asyncData({ app }) {
    const classes = await app.$api.getClasses()
    return {
      classes: classes.data
    }
  },
  methods: {
    async generate() {
      const canvas = document.getElementById('qr_canvas')
      //   const width = canvas.width
      //   const height = canvas.height
      const context = canvas.getContext('2d')
      context.fillStyle = 'white'
      context.fillRect(0, 0, canvas.width, canvas.height)
      const link = document.getElementById('dl_link')
      const xOffset = canvas.width / 4
      const yOffset = canvas.height / 6
      console.log(xOffset + ' ' + yOffset)
      let x = 0
      let y = 0
      for (const klass of this.classes.filter(c => c.id === this.class_id)) {
        let class_i = 0
        let generated = 0
        for (let i = 0; i < klass.boys; i++) {
          const data = {
            student_num: i,
            class_id: klass.id
          }
          const str = JSON.stringify(data)
          const qr = qrcode(0, 'L')
          qr.addData(str)
          qr.make()
          context.setTransform(1, 0, 0, 1, x, y)
          qr.renderTo2dContext(context, 20)
          generated += 1
          x += xOffset
          if (x > canvas.width) {
            y += yOffset
            x = 0
          }
          if (y > canvas.height) {
            class_i += 1
            link.setAttribute('download', klass.name + ' ' + class_i + '.png')
            link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
            link.click()
            generated = 0
          }
        }

        if (generated > 0) {
          class_i += 1
          link.setAttribute('download', klass.name + ' ' + class_i + '.png')
          link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
          link.click()
          generated = 0
        }
      }
    }
  }
}
</script>

<style>
</style>
