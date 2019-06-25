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
      <div class="columns">
        <aside class="panel column is-one-quarters">
          <a
            class="panel-block"
            :class="{'is-active': tab=='Classes'}"
            @click="tab='Classes'"
          >Classes</a>
          <a
            class="panel-block"
            :class="{'is-active': tab=='Elections'}"
            @click="tab='Elections'"
          >Elections</a>
          <a
            class="panel-block"
            :class="{'is-active': tab=='Candidates'}"
            @click="tab='Candidates'"
          >Candidates</a>
        </aside>
        <div v-if="tab==='Classes'" class="column is-three-quarters">
          <div class="level">
            <b-button type="is-primary" @click="addClassPrompt">
              Add Class
            </b-button>
          </div>
          <b-table class="data-table" :data="dataClasses" striped="true" hoverable="true">
            <template slot-scope="props">
              <b-table-column field="name" label="Class">
                {{ props.row.name }}
              </b-table-column>
              <b-table-column field="boys" label="Boys">
                {{ props.row.boys }}
              </b-table-column>
              <b-table-column field="girls" label="Girls">
                {{ props.row.girls }}
              </b-table-column>
              <b-table-column label="Actions" width="200">
                <b-button icon-right="pencil" type="is-primary" @click="editClassPrompt(props.row)">
                  Edit
                </b-button>
                <b-button icon-right="delete" type="is-danger" @click="deleteClassPrompt(props.row)">
                  Delete
                </b-button>
              </b-table-column>
            </template>
            <template slot="empty">
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p>No classes added.</p>
                </div>
              </section>
            </template>
          </b-table>
        </div>
      </div>
    </section>
    <b-modal :active.sync="addClassModal" has-modal-card>
      <div class="card">
        <div class="card-content">
          <h1 class="subtitle is-3">
            Add Class
          </h1>
          <form @submit.prevent="addClass">
            <b-field label="Class">
              <b-input v-model="classData.name" />
            </b-field>
            <b-field label="Boys">
              <b-input v-model="classData.boys" type="number" />
            </b-field>
            <b-field label="Girls">
              <b-input v-model="classData.girls" type="number" />
            </b-field>
            <button class="button is-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="editClassModal" has-modal-card>
      <div class="card">
        <div class="card-content">
          <h1 class="subtitle is-3">
            Edit Class
          </h1>
          <form @submit.prevent="editClass">
            <b-field label="Class">
              <b-input v-model="classData.name" />
            </b-field>
            <b-field label="Boys">
              <b-input v-model="classData.boys" type="number" />
            </b-field>
            <b-field label="Girls">
              <b-input v-model="classData.girls" type="number" />
            </b-field>
            <button class="button is-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="deleteClassModal" has-modal-card>
      <div class="card">
        <div class="card-content">
          <h1 class="subtitle is-3">
            Delete Class
          </h1>
          <form @submit.prevent="deleteClass">
            <b-field label="Class">
              <div>{{ classData.name }}</div>
            </b-field>
            <b-field label="Boys">
              <div>{{ classData.boys }}</div>
            </b-field>
            <b-field label="Girls">
              <div>{{ classData.girls }}</div>
            </b-field>
            <button class="button is-danger">
              Delete
            </button>
          </form>
        </div>
      </div>
    </b-modal>
  </div>
</template>

<script>
export default {
  meta: {
    requiresLogin: true
  },
  data: function () {
    return {
      tab: 'Classes',
      dataClasses: [],
      addClassModal: false,
      editClassModal: false,
      deleteClassModal: false,
      classId: null,
      classData: {
        name: '',
        boys: 10,
        girls: 10
      }
    }
  },
  async created() {
    await this.refreshClasses()
  },
  methods: {
    async refreshClasses() {
      const resp = await this.$api.getClasses()
      this.dataClasses = resp.data
    },
    async addClassPrompt() {
      this.addClassModal = true
      this.classData = {
        name: 'New Class',
        boys: 10,
        girls: 20
      }
    },
    async editClassPrompt(row) {
      this.classId = row.id
      this.classData = {
        name: row.name,
        boys: row.boys,
        girls: row.girls
      }
      this.editClassModal = true
    },
    async deleteClassPrompt(row) {
      this.classId = row.id
      this.classData = {
        name: row.name,
        boys: row.boys,
        girls: row.girls
      }
      this.deleteClassModal = true
    },
    async addClass() {
      await this.$api.addClass(this.classData)
      this.addClassModal = false
      await this.refreshClasses()
    },
    async editClass() {
      await this.$api.updateClass(this.classId, this.classData)
      this.editClassModal = false
      await this.refreshClasses()
    },
    async deleteClass() {
      await this.$api.deleteClass(this.classId)
      this.deleteClassModal = false
      await this.refreshClasses()
    }
  }
}
</script>

<style>
.form-modal {
  max-width: 40em;
}
.data-table {
  border: 1px solid #ddd;
}
</style>
