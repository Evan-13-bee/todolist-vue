<template>
  <input
    v-if="editMode"
    :value="modelValue"
    @input="updateValue"
    @blur="editMode = false"
  />
  <span v-else @click="editMode = true">{{ modelValue }}</span>
</template>
<script>
export default {
  props: {
    modelValue: [String, Number],
  },
  data: () => ({
    editMode: false,
  }),
  methods: {
    updateValue(event) {
      this.$emit("update:modelValue", event.target.value);
    },
  },
};
</script>