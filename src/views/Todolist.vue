<template>
  <div class="todolist__wrapper">
    <div class="todolist" v-if="filteredTasks">
      <input
        class="taskTitle"
        placeholder="What needs to be done?"
        v-model="form.taskTitle"
        @keypress.enter="addTask"
      />
      <div class="tasks">
        <p v-for="(task, i) in filteredTasks" :key="i" class="task__wrapper">
          <input
            v-model="task.checked"
            @change="changeTaskStatus($event.target.checked, i)"
            type="checkbox"
            class="checkbox"
          />
          <span class="task" :class="{ task__done: task.checked }">{{
            task.title
          }}</span>
        </p>
      </div>

      <div class="footer">
        <p class="tasks__length">{{ filteredTasks.length }} item left</p>
        <p>
          <button
            class="button"
            :class="{ button__active: filter === 'all' }"
            @click="changeFilter('all')"
          >
            All
          </button>
          <button
            class="button"
            :class="{ button__active: filter === false }"
            @click="changeFilter(false)"
          >
            Active
          </button>
          <button
            class="button"
            :class="{ button__active: filter === true }"
            @click="changeFilter(true)"
          >
            Completed
          </button>
        </p>
        <p>
          <button class="button" @click="clearCompleted()">
            Clear completed
          </button>
        </p>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { Form } from "../tools/Form";

export default {
  data: () => ({
    form: new Form({
      taskTitle: "",
    }),
  }),

  computed: {
    ...mapGetters(["filteredTasks", "filter"]),
  },

  methods: {
    addTask() {
      this.$store.dispatch("addTask", this.form.taskTitle);
      this.form.taskTitle = "";
    },

    changeTaskStatus(value, index) {
      this.$store.dispatch("changeTaskStatus", { value, index });
    },

    changeFilter(filter) {
      this.$store.dispatch("changeFilter", { filter });
    },

    clearCompleted() {
      this.$store.dispatch("clearCompleted");
    },
  },

  mounted() {},
};
</script>
<style lang="scss" scoped>
* {
  box-sizing: border-box;
}
.todolist {
  border: 1px solid rgb(177 158 158 / 50%);
  display: flex;
  flex-direction: column;
  width: 40vw;
  padding: 20px;
  &__wrapper {
    display: flex;
    justify-content: center;
  }
}
.tasks {
  &__length {
    margin-right: 10px;
    color: gray;
    font-size: 18px;
  }
}
.button {
  background: none;
  border-radius: 6px;
  border: none;
  cursor: pointer;
  color: gray;
  font-size: 18px;
  &__active {
    border: 1px solid gray;
  }
}
.task {
  margin-left: 20px;
  font-size: x-large;
  &__done {
    text-decoration: line-through;
    opacity: 0.5;
  }
  &__wrapper {
    text-align: start;
    padding-bottom: 5px;
    margin: 0;
    border-bottom: 1px solid gray;
    margin-bottom: 10px;
    &:last-child {
      border-bottom: none;
    }
    &:first-child {
      margin-top: 10px;
    }
  }
}

.taskTitle {
  outline: none;
  border: none;
  border-bottom: 1px solid gray;
  font-size: x-large;
  padding-bottom: 10px;
}
.checkbox {
  display: inline-block;
  width: 19px;
  height: 19px;
  margin: -1px 4px 0 0;
  vertical-align: middle;
  cursor: pointer;
}
.footer {
  display: flex;
  border-top: 1px solid gray;
  justify-content: space-between;
}
</style>