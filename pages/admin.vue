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
        <!-- Classes  -------------------------------------------->
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

        <!-- Elections  -------------------------------------------->
        <div v-if="tab==='Elections'" class="column is-three-quarters">
          <div class="level">
            <b-button type="is-primary" @click="addElectionPrompt">
              Add Election
            </b-button>
          </div>
          <b-table class="data-table" :data="dataElections" striped="true" hoverable="true">
            <template slot-scope="props">
              <b-table-column field="name" label="Election">
                {{ props.row.name }}
              </b-table-column>
              <b-table-column field="presidential" label="Presidential/Local">
                {{ props.row.presidential ? 'Presidential':'Local' }}
              </b-table-column>
              <b-table-column field="genders" label="Genders">
                {{ props.row.genders === 0?'Boys Only':props.row.genders===1?'Girls Only':'Common' }}
              </b-table-column>
              <b-table-column label="Actions" width="200">
                <b-button icon-right="pencil" type="is-primary" @click="editElectionPrompt(props.row)">
                  Edit
                </b-button>
                <b-button icon-right="delete" type="is-danger" @click="deleteElectionPrompt(props.row)">
                  Delete
                </b-button>
              </b-table-column>
            </template>
            <template slot="empty">
              <section class="section">
                <div class="content has-text-grey has-text-centered">
                  <p>No elections added.</p>
                </div>
              </section>
            </template>
          </b-table>
        </div>
      </div>
    </section>
    <!-- Classes Modal -->
    <b-modal :active.sync="addClassModal" has-modal-card>
      <div class="card">
        <div class="card-content">
          <h1 class="subtitle is-3">
            Add Class
          </h1>
          <form @submit.prevent="addClass">
            <b-field label="Class">
              <b-input v-model="formData.name" />
            </b-field>
            <b-field label="Boys">
              <b-input v-model="formData.boys" type="number" />
            </b-field>
            <b-field label="Girls">
              <b-input v-model="formData.girls" type="number" />
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
              <b-input v-model="formData.name" />
            </b-field>
            <b-field label="Boys">
              <b-input v-model="formData.boys" type="number" />
            </b-field>
            <b-field label="Girls">
              <b-input v-model="formData.girls" type="number" />
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
              <div>{{ formData.name }}</div>
            </b-field>
            <b-field label="Boys">
              <div>{{ formData.boys }}</div>
            </b-field>
            <b-field label="Girls">
              <div>{{ formData.girls }}</div>
            </b-field>
            <button class="button is-danger">
              Delete
            </button>
          </form>
        </div>
      </div>
    </b-modal>

    <!-- Elections Modal -->
    <b-modal :active.sync="addElectionModal" has-modal-card>
      <div class="card">
        <div class="card-content">
          <h1 class="subtitle is-3">
            Add Election
          </h1>
          <form @submit.prevent="addElection">
            <b-field label="Election">
              <b-input v-model="formData.name" />
            </b-field>
            <b-field label="Presidential/Local">
              <b-select v-model="formData.presidential">
                <option value="false">
                  Local
                </option>
                <option value="true">
                  Presidential
                </option>
              </b-select>
            </b-field>
            <b-field label="Genders">
              <b-select v-model="formData.genders">
                <option value="0">
                  Boys only
                </option>
                <option value="1">
                  Girls only
                </option>
                <option value="2">
                  Common
                </option>
              </b-select>
            </b-field>
            <button class="button is-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="editElectionModal" has-modal-card>
      <div class="card">
        <div class="card-content">
          <h1 class="subtitle is-3">
            Edit Election
          </h1>
          <form @submit.prevent="editElection">
            <b-field label="Election">
              <b-input v-model="formData.name" />
            </b-field>
            <b-field label="Presidential/Local">
              <b-select v-model="formData.presidential">
                <option value="false">
                  Local
                </option>
                <option value="true">
                  Presidential
                </option>
              </b-select>
            </b-field>
            <b-field label="Genders">
              <b-select v-model="formData.genders">
                <option value="0">
                  Boys only
                </option>
                <option value="1">
                  Girls only
                </option>
                <option value="2">
                  Common
                </option>
              </b-select>
            </b-field>
            <button class="button is-primary">
              Save
            </button>
          </form>
        </div>
      </div>
    </b-modal>
    <b-modal :active.sync="deleteElectionModal" has-modal-card>
      <div class="card">
        <div class="card-content">
          <h1 class="subtitle is-3">
            Delete Election
          </h1>
          <form @submit.prevent="deleteElection">
            <b-field label="Election">
              <b-input v-model="formData.name" readonly />
            </b-field>
            <b-field label="Presidential/Local">
              <b-select v-model="formData.presidential" readonly>
                <option value="false">
                  Local
                </option>
                <option value="true">
                  Presidential
                </option>
              </b-select>
            </b-field>
            <b-field label="Genders">
              <b-select v-model="formData.genders" readonly>
                <option value="0">
                  Boys only
                </option>
                <option value="1">
                  Girls only
                </option>
                <option value="2">
                  Common
                </option>
              </b-select>
            </b-field>
            <button class="button is-danger">
              Delete
            </button>
          </form>
        </div>
      </div>
    </b-modal>
  </div>
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
      formId: null,
      formData: {
      },
      dataClasses: [],
      addClassModal: false,
      editClassModal: false,
      deleteClassModal: false,
      dataElections: [],
      addElectionModal: false,
      editElectionModal: false,
      deleteElectionModal: false
    }
  },
  async created() {
    await this.refreshClasses()
    await this.refreshElections()
  },
  methods: {
    async refreshClasses() {
      const resp = await this.$api.getClasses()
      this.dataClasses = resp.data
    },
    async addClassPrompt() {
      this.addClassModal = true
      this.formData = {
        name: 'New Class',
        boys: 10,
        girls: 20
      }
    },
    async editClassPrompt(row) {
      this.formId = row.id
      this.formData = {
        name: row.name,
        boys: row.boys,
        girls: row.girls
      }
      this.editClassModal = true
    },
    async deleteClassPrompt(row) {
      this.formId = row.id
      this.formData = {
        name: row.name,
        boys: row.boys,
        girls: row.girls
      }
      this.deleteClassModal = true
    },
    async addClass() {
      await this.$api.addClass(this.formData)
      this.addClassModal = false
      await this.refreshClasses()
    },
    async editClass() {
      await this.$api.updateClass(this.formId, this.formData)
      this.editClassModal = false
      await this.refreshClasses()
    },
    async deleteClass() {
      await this.$api.deleteClass(this.formId)
      this.deleteClassModal = false
      await this.refreshClasses()
    },
    /* ------------------------------------- */

    async refreshElections() {
      const resp = await this.$api.getElections()
      this.dataElections = resp.data
    },
    async addElectionPrompt() {
      this.addElectionModal = true
      this.formData = {
        name: 'New Election',
        presidential: false,
        genders: 0
      }
    },
    async editElectionPrompt(row) {
      this.formId = row.id
      this.formData = {
        name: row.name,
        presidential: row.presidential,
        genders: row.genders
      }
      this.editElectionModal = true
    },
    async deleteElectionPrompt(row) {
      this.formId = row.id
      this.formData = {
        name: row.name,
        presidential: row.presidential,
        genders: row.genders
      }
      this.deleteElectionModal = true
    },
    async addElection() {
      await this.$api.addElection(this.formData)
      this.addElectionModal = false
      await this.refreshElections()
    },
    async editElection() {
      this.editElectionModal = false
      await this.refreshElections()
    },
    async deleteElection() {
      await this.$api.deleteElection(this.formId)
      this.deleteElectionModal = false
      await this.refreshElections()
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
