<template>
  <div>
    <section class="hero">
      <div class="hero-body">
        <h1 class="title">
          Administration
        </h1>
        <h2 class="subtitle">
          IAME School Parliament 2019
        </h2>
      </div>
    </section>
    <section class="container">
      <div class="panel columns">
        <aside class="column is-one-quarters">
          <a class="panel-block" :class="{'is-active': tab=='School Leader'}" @click="tab='School Leader'">School Leaders</a>
          <a class="panel-block" :class="{'is-active': tab=='Deputy Leader'}" @click="tab='Deputy Leader'">Deputy Leaders</a>
          <a class="panel-block" :class="{'is-active': tab=='Classes'}" @click="tab='Classes'">Classes</a>
          <a class="panel-block" :class="{'is-active': tab=='Class Leader'}" @click="tab='Class Leader'">Class Leaders</a>
        </aside>
        <div class="column is-three-quarters">
          <b-dropdown v-if="tab == 'Class Leader'">
            <button slot="trigger" class="button is-primary">
              <span>Class</span>
              <b-icon icon="menu-down" />
            </button>
            <b-dropdown-item v-for="e of classes" :key="e.name" @click="selected_class=e.name">
              {{ e.name }}
            </b-dropdown-item>
          </b-dropdown>
          <b-table
            :data="table_data"
            :columns="table_columns"
          />
          <b-button type="is-primary" @click="add_modal=true">
            Add {{ tab }}
          </b-button>
        </div>
      </div>
    </section>
    <b-modal :active.sync="add_modal">
      <b-field grouped>
        <b-field v-if="tab!=='Classes'" horizontal label="Name">
          <b-input v-model="leader_name" />
        </b-field>
        <b-field v-if="tab==='Classes'" horizontal label="Class">
          <b-input v-model="class_name" />
        </b-field>
        <b-field v-if="tab==='Classes'" horizontal label="Population">
          <b-input v-model="class_pop" />
        </b-field>
        <b-field>
          <b-button type="is-primary" @click="add_leader">
            Add {{ tab }}
          </b-button>
        </b-field>
      </b-field>
    </b-modal>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      add_modal: false,
      leader_name: 'New Leader',
      class_name: '1st A',
      class_pop: 20,
      selected_class: null,
      tab: 'School Leader'
    }
  },
  computed: {
    classes() {
      return this.$store.state.app.classes
    },
    table_data() {
      if (this.tab === 'School Leader') {
        return this.$store.state.app.schoolLeaders.map((e) => {
          return {
            name: e.name
          }
        })
      } else if (this.tab === 'Deputy Leader') {
        return this.$store.state.app.deputyLeaders.map((e) => {
          return {
            name: e.name
          }
        })
      } else if (this.tab === 'Class Leader') {
        if (this.selected_class !== null) { return this.$store.state.app.classes.filter((e) => { return e.name === this.selected_class })[0].leaders }
        return [{}]
      } else {
        return this.$store.state.app.classes.map((e) => {
          return {
            name: e.name,
            population: e.population
          }
        })
      }
    },
    table_columns() {
      if (this.tab === 'Classes') {
        return [{ field: 'name', label: 'Name' }, { field: 'population', label: 'Population' }]
      } else {
        return [{ field: 'name', label: 'Name' }]
      }
    }

  },
  methods: {
    add_leader() {
      this.add_modal = false
      if (this.tab === 'School Leader') {
        this.$store.commit('app/addSchoolLeader', { name: this.leader_name, votes: 0 })
      }
      if (this.tab === 'Deputy Leader') {
        this.$store.commit('app/addDeputyLeader', { name: this.leader_name, votes: 0 })
      }
      if (this.tab === 'Class Leader') {
        this.$store.commit('app/addClassLeader', this.selected_class, { name: this.leader_name, votes: 0 })
      }
      if (this.tab === 'Classes') {
        this.$store.commit('app/addClass', { name: this.class_name, population: this.class_pop, leader: [] })
      }
    }

  }
}
</script>

<style scoped>
* {
  /* border: 1px solid #ff000022; */
}
</style>
