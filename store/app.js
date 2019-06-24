export const state = () => ({
  isLoggedIn: false,
  schoolLeaders: [
    { name: 'School Leader 1', votes: 0 },
    { name: 'School Leader 2', votes: 0 },
    { name: 'School Leader 3', votes: 0 },
    { name: 'School Leader 4', votes: 0 },
    { name: 'School Leader 5', votes: 0 }
  ],
  deputyLeaders: [
    { name: 'Deputy Leader 1', votes: 0 },
    { name: 'Deputy Leader 2', votes: 0 },
    { name: 'Deputy Leader 3', votes: 0 },
    { name: 'Deputy Leader 4', votes: 0 },
    { name: 'Deputy Leader 5', votes: 0 }
  ],
  classes: [
    {
      name: '1 A',
      population: 20,
      'leaders': [
        {
          name: 'Person 1',
          votes: 0
        },
        {
          name: 'Person 2',
          votes: 0
        }
      ]
    },
    {
      'name': '1 B',
      'population': '30',
      'leaders': [
        {
          name: 'Person 3',
          votes: 0
        },
        {
          name: 'Person 4',
          votes: 0
        }
      ]
    }
  ]
})

export const mutations = {
  logIn(state) {
    state.isLoggedIn = true
  },
  logOut(state) {
    state.isLoggedIn = false
  },
  addSchoolLeader(state, leader) {
    state.schoolLeaders.push(leader)
  },
  addDeputyLeader(state, leader) {
    state.deputyLeaders.push(leader)
  },
  addClass(state, klass) {
    state.classes.push(klass)
  },
  addClassLeader(state, klass, leader) {
    state.classes.filter((e) => {
      return e.name === klass
    }).map((e) => {
      e.leaders.push(leader)
    })
  }
}
