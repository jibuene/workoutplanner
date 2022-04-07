<template>
  <div class="ml-3 inline-flex rounded-md shadow">
    <select class="form-select appearance-none
      block
      w-full
      px-5
      py-1.5
      text-base
      font-normal
      text-gray-700
      bg-white bg-clip-padding bg-no-repeat
      border border-solid border-gray-300
      rounded
      transition
      ease-in-out
      m-0
      focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
      @input="$emit('update:modelValue', $event.target.value)">
        <option selected>Select {{ name }}</option>
        <option v-for="(line, idx) in listdata" :key="idx">
          <template v-if="line === null">
            Blank
          </template>
          <template v-else>
            {{ line }}
          </template>
        </option>
    </select>
  </div>
</template>
<script>
export default {
  props: ['listdata', 'name'],
  computed: {
    inputVal: {
      get() {
        return this.value;
      },
      set(val) {
        this.$emit('input', val);
      }
    }
  }
}
</script>