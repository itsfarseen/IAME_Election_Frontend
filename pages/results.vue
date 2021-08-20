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

    <div class="votes">
      <div class="votes-entry" v-for="c in candidatesList">
        <div class="-name">{{c.name}} - {{c.class_name}}</div>
        <div class="-votes">{{c.votes}} Votes ({{c.pct}} %)</div>
      </div>
    </div>
    <section v-if="candidatesList" class="section chart-container">
      <result-chart :chartData="chartData" :options="chartOptions"/>
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
      if (!this.selectedElection) return null
      const election = this.elections.find(e => e.id === this.selectedElection)
      let candidatesFiltered = null;
      if (election.presidential) {
        candidatesFiltered = this.candidates.filter(c => c.election_id === election.id)
      } else if (this.selectedClass !== null) {
        candidatesFiltered = this.candidates.filter(
          c =>
            c.election_id === election.id && c.class_id === this.selectedClass
        )
      }
      if(candidatesFiltered === null) return null;

      let totalVotes = candidatesFiltered.map(c => c.votes).reduce((a, b) => a + b, 0);

      let findClass = (id) => {
        return this.classes.find(e => e.id === id)
      }

      return candidatesFiltered.map(c => ({...c, pct: (c.votes*100/totalVotes).toFixed(2), class_name: findClass(c.class_id).name}));
    },
    chartData() {
      const data = this.candidatesList.map(e => e.votes)
      const labels = this.candidatesList.map(e => e.name)
      console.log([data, labels])
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
          bodyFontSize: 20,
        },
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
  margin-top: 3em;
  margin-bottom: 3em;
  max-width: 70vmin;
}

@media(max-width: 640px) {
  .chart-container {
    max-width: 100vmin;
  }
}

.votes {
  padding: 0 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.votes-entry .-name {
  font-size: 1.2rem;
}
.votes-entry .-votes {
  font-size: 2rem;
}
</style>
