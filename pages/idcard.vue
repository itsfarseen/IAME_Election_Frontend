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
      const xOffset = (canvas.width - 80) / 4
      const yOffset = (canvas.height - 80) / 5
      console.log(xOffset + ' ' + yOffset)
      const xInitialOffset = 40
      const yInitialOffset = 40
      let x = xInitialOffset
      let y = yInitialOffset
      for (const klass of this.classes.filter(c => c.id === this.class_id)) {
        let class_i = 0
        let generated = 0
        for (let i = 0; i < klass.boys + klass.girls; i++) {
          const data = {
            student_num: i,
            class_id: klass.id,
            gender: i < klass.boys ? 0 : 1
          }
          const str = JSON.stringify(data)
          const qr = qrcode(0, 'L')
          qr.addData(str)
          qr.make()
          context.setTransform(1, 0, 0, 1, x, y)
          qr.renderTo2dContext(context, 15)
          context.setTransform(1, 0, 0, 1, x, y + yOffset - 200)
          context.font = '50px sans-serif'
          context.fillStyle = 'black'
          const str1 = `${i}x${klass.id}`
          context.fillText(str1, 0, 0)
          console.log(str)
          console.log(str1)
          generated += 1
          x += xOffset
          if ((x + xOffset) > canvas.width) {
            y += yOffset
            x = xInitialOffset
          }
          if ((y + yOffset) > canvas.height) {
            x = xInitialOffset
            y = yInitialOffset
            console.log(generated)
            console.log('i ' + i)
            class_i += 1
            link.setAttribute('download', klass.name + ' ' + class_i + '.png')
            link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
            link.click()
            generated = 0
            context.fillStyle = 'white'
            context.setTransform(1, 0, 0, 1, 0, 0)
            context.fillRect(0, 0, canvas.width, canvas.height)
            console.log(canvas.height)
          }
        }

        if (generated > 0) {
          class_i += 1
          link.setAttribute('download', klass.name + ' ' + class_i + '.png')
          link.setAttribute('href', canvas.toDataURL('image/png').replace('image/png', 'image/octet-stream'))
          link.click()
          generated = 0
          context.fillStyle = 'white'
          context.setTransform(1, 0, 0, 1, 0, 0)
          context.fillRect(0, 0, canvas.width, canvas.height)
        }
      }
    }
  }
}
</script>

<style>
</style>
