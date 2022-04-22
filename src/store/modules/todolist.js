import * as types from '../types';

const state = {
  tasks: [
    { title: 'foo', checked: false }
  ],
  filteredTasks: [

  ],
  filter: 'all'
};

const getters = {
  tasks: (state) => state.tasks,
  filter: (state) => state.filter,
  filteredTasks: (state, getters) => {
    if (state.filter == 'all') {
      return state.tasks
    }
    else {
      console.log(state.filter)
      return state.tasks.filter(e => e.checked === state.filter)
    }
  },
};

const actions = {
  addTask({ commit }, taskTitle) {
    commit(types.ADD_TASK, { taskTitle });
  },
  changeTaskStatus({ commit }, { value, index }) {
    commit(types.CHANGE_TASK_STATUS, { value, index });
  },
  changeFilter({ commit }, {filter}) {
    commit(types.FILTER_TASKS, { filter });
  },
  clearCompleted({ commit }) {
    commit(types.CLEAR_COMPLETED);
  },
};

const mutations = {
  [types.ADD_TASK](state, { taskTitle }) {
    const newTask = { title: taskTitle, checked: false }
    state.tasks.push(newTask);
  },

  [types.CHANGE_TASK_STATUS](state, { value, index }) {
    const task = state.tasks.find((e, i) => i === index)
    task.checked = value
  },

  [types.FILTER_TASKS](state, { filter }) {
    console.log(filter.filter);
    state.filter = filter
  },

  [types.CLEAR_COMPLETED](state) {
    state.tasks.forEach(e => {
      e.checked = false
    })
  }
};

export default {
  state,
  getters,
  actions,
  mutations,
};
