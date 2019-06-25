<template>
  <div>
    <div class="hero is-fullheight">
      <div class="hero-body columns">
        <div class="column is-one-quarter">
          <h1 class="title is-1">Voting</h1>
          <button class="button">
            <router-link to="/">Exit</router-link>
          </button>
          <b-notification
            auto-close
            type="is-danger"
            :active.sync="alreadyVotedError"
            has-icon
          >This voter has already already voted.</b-notification>
          <b-notification
            auto-close
            type="is-success"
            :active.sync="votedSuccesfull"
            has-icon
          >Voted successfully.</b-notification>
        </div>
        <div class="column is-three-quarters">
          <canvas v-show="!voting" id="canvas" class="image" width="400" height="400">
            <div id="loadingMessage">Loading...</div>
          </canvas>
          <div v-if="elections.length > 0" class="container">
            <h1 class="subtitle is-1">Choose {{ elections[0].name }}</h1>
            <div v-for="candidate in elections[0].candidates" :key="candidate.id" class="box">
              <div class="media">
                <img :src="candidate.symbol" width="128" height="128" class="media-left">
                <div class="media-content">
                  <h1 class="subtitle is-3">{{ candidate.name }}</h1>
                </div>
                <div class="media-right">
                  <button
                    class="button is-primary is-large"
                    @click="vote(elections[0].name, candidate.id)"
                  >Vote</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import jsQR from 'jsqr'
export default {
  data() {
    return {
      alreadyVotedError: false,
      votedSuccesfull: false,
      voterData: null,
      voting: false,
      elections: [],
      recordedVotes: [],
      stop: false
    }
  },
  beforeDestroy() {
      this.stop = true
  },
  async mounted() {
    const video = document.createElement('video')
    const canvasElement = document.getElementById('canvas')
    const canvas = canvasElement.getContext('2d')
    const loadingMessage = document.getElementById('loadingMessage')

    function drawLine(begin, end, color) {
      canvas.beginPath()
      canvas.moveTo(begin.x, begin.y)
      canvas.lineTo(end.x, end.y)
      canvas.lineWidth = 4
      canvas.strokeStyle = color
      canvas.stroke()
    }

    // Use facingMode: environment to attemt to get the front camera on phones
    navigator.mediaDevices
      .getUserMedia({ video: { facingMode: 'environment' } })
      .then(function(stream) {
        video.srcObject = stream
        video.setAttribute('playsinline', true) // required to tell iOS safari we don't want fullscreen
        video.play()
        requestAnimationFrame(tick)
      })

    const tick = () => {
      if (this.stop) {
        video.srcObject.getTracks()[0].stop()
        return
      }
      loadingMessage.innerText = '⌛ Loading video...'
      if (!this.voting && video.readyState === video.HAVE_ENOUGH_DATA) {
        loadingMessage.hidden = true
        canvasElement.hidden = false

        canvasElement.height = video.videoHeight
        canvasElement.width = video.videoWidth
        canvas.drawImage(video, 0, 0, canvasElement.width, canvasElement.height)
        const imageData = canvas.getImageData(
          0,
          0,
          canvasElement.width,
          canvasElement.height
        )
        const code = jsQR(imageData.data, imageData.width, imageData.height, {
          inversionAttempts: 'dontInvert'
        })
        if (code) {
          drawLine(
            code.location.topLeftCorner,
            code.location.topRightCorner,
            '#FF3B58'
          )
          drawLine(
            code.location.topRightCorner,
            code.location.bottomRightCorner,
            '#FF3B58'
          )
          drawLine(
            code.location.bottomRightCorner,
            code.location.bottomLeftCorner,
            '#FF3B58'
          )
          drawLine(
            code.location.bottomLeftCorner,
            code.location.topLeftCorner,
            '#FF3B58'
          )
          try {
            const data = JSON.parse(code.data)
            if (
              data.student_num !== undefined &&
              data.class_id !== undefined &&
              data.gender !== undefined &&
              data.school_id !== undefined
            ) {
              this.voterData = data
              this.startVoting()
              console.log('DONE')
            } else {
              console.log(data)
            }
          } catch (error) {
            console.log(error)
          }
        }
      }
      requestAnimationFrame(tick)
    }
  },
  methods: {
    async startVoting() {
      const resp = await this.$api.getVoteCandidates(this.voterData)
      if (!resp.success) {
        this.alreadyVotedError = true
        this.voterData = null
        return
      }
      this.elections = resp.data.reduce((doc, e) => {
        if (
          doc.find(election => election.name === e.election_name) === undefined
        ) {
          doc.push({
            name: e.election_name,
            candidates: []
          })
        }
        doc
          .filter(election => election.name === e.election_name)
          .map(election => election.candidates.push(e))
        return doc
      }, [])
      this.recordedVotes = []
      this.voting = true
    },
    async vote(election_name, candidate_id) {
      this.recordedVotes.push(candidate_id)
      const i = this.elections.findIndex(e => e.name === election_name)
      this.elections.splice(i, 1)
      if (this.elections.length === 0) {
        await this.$api.castVotes({
          student_num: this.voterData.student_num,
          class_id: this.voterData.class_id,
          vote_candidate_ids: this.recordedVotes
        })
        this.recordedVotes = []
        this.voting = false
        this.voterData = null
        this.votedSuccesfull = true
      }
    }
  }
}
</script>
