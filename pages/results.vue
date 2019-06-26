<template>
  <div>
    <div class="hero is-light">
      <div class="hero-body">
        <h1 class="title is-3">Results</h1>
      </div>
    </div>
    <section class="section">
      <div class="field is-grouped">
        <b-select v-model="selectedElection" placeholder="Select Election">
          <option
            v-for="election in elections"
            :key="election.id"
            :value="election.id"
          >{{ election.name }}</option>
        </b-select>
        <b-select v-if="isClassSelectShown" v-model="selectedClass" placeholder="Select Class">
          <option v-for="klass in classes" :key="klass.id" :value="klass.id">{{ klass.name }}</option>
        </b-select>
      </div>
    <router-link to="/dashboard" tag="button" class="button">Back</router-link>
    </section>

    <section v-if="candidatesList" class="section chart-container">
      <result-chart :data="chartData" :options="chartOptions"/>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      selectedElection: null,
      selectedClass: null
    }
  },
  computed: {
    isClassSelectShown() {
      return (
        this.selectedElection &&
        this.elections.find(
          e => e.id === this.selectedElection && !e.presidential
        )
      )
    },
    candidatesList() {
      console.log(this.selectedElection)
      if (!this.selectedElection) return null
      const election = this.elections.find(e => e.id === this.selectedElection)
      if (election.presidential) {
        return this.candidates.filter(c => c.election_id === election.id)
      } else {
        if (this.selectedClass === null) return null
        return this.candidates.filter(
          c =>
            c.election_id === election.id && c.class_id === this.selectedClass
        )
      }
    },
    chartData() {
      const data = this.candidatesList.map(e => e.votes)
      const labels = this.candidatesList.map(e => e.name)
      return {
        datasets: [
          {
            data: data,
            backgroundColor: [
              '#E35757',
              '#E3D757',
              '#68439A',
              '#45B645',
              '#FFB0B0',
              '#FFF8B0',
              '#B197D3',
              '#9DE49D',
              '#FF8585',
              '#FFF485',
              '#8765B3',
              '#6DD06D',
              '#CA3232',
              '#CABC32',
              '#532B89',
              '#28A228',
              '#A11717',
              '#A19517',
              '#3C186D',
              '#128112'
            ]
          }
        ],
        labels: labels
      }
    },
    chartOptions() {
      return {
        legend: {
          labels: {
            fontSize: 20
          }
        },
        tooltips: {
          titleFontSize: 20,
          bodyFontSize: 20
        }
      }
    }
  },
  async asyncData({ app }) {
    const candidates = await app.$api.getResults()
    return {
      classes: (await app.$api.getClasses()).data,
      elections: (await app.$api.getElections()).data,
      candidates: candidates.data
    }
  }
}
</script>

<style>
.chart-container {
  margin: auto;
  margin-bottom: 10em;
  width: 70vh;
  height: 70vh;
}
</style>
