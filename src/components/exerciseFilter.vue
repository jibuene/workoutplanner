<template>
  <div class="checkbox-select">
    <div class="checkbox-select__trigger" :class="{ isActive: activeTrigger }" @click="showDropdown">
      <span class="checkbox-select__title">{{ title_text.toUpperCase() }}</span>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 129 129"><path d="M121.3 34.6c-1.6-1.6-4.2-1.6-5.8 0l-51 51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8 0-1.6 1.6-1.6 4.2 0 5.8l53.9 53.9c.8.8 1.8 1.2 2.9 1.2 1 0 2.1-.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2.1-5.8z"/></svg>
    </div>
    <div :id="id" class="checkbox-select__dropdown bg-base-300" :style="[activeTrigger ? 'position: relative' : '']">
      <ul id="customScroll" class="checkbox-select__filters-wrapp">
        <li v-for="(filter, index) in filteredList" :key="id + index">
          <div class="checkbox-select__check-wrapp py-1">
            <input :id="id + index" class="conditions-check" v-model="checkedFilters" :value="filter" type="checkbox">
            <label v-if="filter !== null" :for="id + index">{{ filter.toUpperCase() }}</label>
          </div>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
import { gsap, Power2 } from 'gsap'
import { SimpleBar } from 'simplebar-vue3';

export default {
  props: ['title_text', 'id', 'listdata'],
  data () {
    return {
      search: '',
      checkedFilters: [],
      allSelected: false,
      selectAllText: 'Velg alle',
      activeTrigger: false,
      dropdown: false,
      showLoader: false
    }
  },
  components: { SimpleBar },
  computed: {
    filteredList () {
      return this.listdata.filter(item => {
        item = item === null ? 'null' : item
        return item.toLowerCase().includes(this.search.toLowerCase())
      })
    }
  },
  methods: {
    selectAll () {
      this.checkedFilters = []
      this.selectAllText = this.selectAllText === 'Velg alle' ? 'Fjern alle' : 'Velg alle'
      if (this.allSelected) {
        this.listdata.map(x => this.checkedFilters.push(x))
      }
    },
    showDropdown () {
      if (this.dropdown === false) {
        this.dropdown = true
        this.activeTrigger = true
        gsap.fromTo(
          `#${this.id}`,
          {
            autoAlpha: 0,
            y: -10
          },
          {
            autoAlpha: 1,
            y: 0,
            ease: Power2.easeOut,
            duration: 0.1
          }
        )
      } else {
        this.dropdown = false
        this.activeTrigger = false
        gsap.to(
          `#${this.id}`,
          {
            autoAlpha: 0,
            y: -10,
            ease: Power2.easeOut,
            duration: 0.1
          })
      }
    }
  },
  watch: {
    checkedFilters: {
      handler () {
        this.$emit('update:modelValue', this.checkedFilters)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
ul {
  list-style-type: none;
  padding-left: 15px;
}
.checkbox-select {
  position: relative;
  width: 100%;
  &__trigger {
    border-radius: 10px;
    position: relative;
    z-index: 1;
    height: 50px;
    display: flex;
    align-items: center;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
    &.isActive {
      border-radius: 10px 10px 0 0;
      svg {
        transform: rotate(-180deg);
      }
    }
    svg {
      width: 28px;
      stroke: 4px;
      transition: all 0.3s ease;
    }
  }
  &__title {
    font-size: 15px;
    flex: 1;
    letter-spacing: 1px;
  }
  &__dropdown {
    z-index: 99;
    opacity: 0;
    visibility: hidden;
    position: absolute;
    min-width: 200px;
    left: 0;
    right: 0;
    // box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 1px, rgba(0, 0, 0, 0.09) 0px 4px 2px, rgba(0, 0, 0, 0.09) 0px 8px 4px, rgba(0, 0, 0, 0.09) 0px 16px 8px, rgba(0, 0, 0, 0.09) 0px 32px 16px;
    border-radius: 0 0 8px 8px;
    overflow: hidden;
    padding-bottom: 15px;
    &:before {
      position: absolute;
      content: "";
      top: 0;
      height: 4px;
      z-index: 1;
    }
    &:after {
      opacity: 0;
      background: #000;
      background-color: #2980b9;
      transition: opacity 0.3s ease;
      animation: load 1.8s linear infinite;
      background: linear-gradient(
        135deg,
        rgba(143, 36, 237, 1) 20%,
        rgba(143, 36, 237, 1) 20%,
        rgba(143, 36, 237, 1) 22%,
        rgba(143, 36, 237, 1) 25%,
        rgba(16, 124, 179, 1) 100%
      );
    }
    &:before {
      width: 100%;
      background-color: #2980b9;
    }
    &.activeSearch {
      &:after {
        opacity: 1;
      }
    }
    .simplebar-scrollbar{
      width: 3px;
      right: 1px;
    }
  }
  &__search-wrapp {
    padding: 10px 15px 5px;

    input {
      width: 100%;
      height: 40px;
      border-width: 0 0 2px;
      border-style: solid;
      border-color: #23a6d5;
      font-size: 12px;
      background: transparent;
    }
    ::-webkit-input-placeholder {
      /* Chrome/Opera/Safari */
      color: #b8b8b8;
      opacity: 1;
    }
  }
  &__col {
    display: flex;
    font-size: 12px;
    padding: 0 15px;
    justify-content: space-between;
    text-transform: uppercase;

  }
  &__select-all {
    label {
      cursor: pointer;
    }
    input {
      display: none;
    }
  }
  &__filters-wrapp {
    margin-top: 20px;
    overflow-y: auto;
  }
  &__check-wrapp {
    position: relative;
  input[type="checkbox"] {
      display: none;

      & + label {
        position: relative;
        cursor: pointer;
        font-size: 15px;
        line-height: 22px;
        padding-left: 30px;
        display: inline-block;
        user-select: none;
        transition: padding 0.25s ease;
        &:after {
          border: solid 2px #fff;
          content: "";
          width: 22px;
          height: 22px;
          top: 0;
          left: 0;
          position: absolute;
        }
        &:before {
          width: 14px;
          height: 14px;
          content: "";
          position: absolute;
          top: 4px;
          left: 4px;
          background-color: #fff;
          opacity: 0;
          will-change: transform;
          transform: scale(0.5);
          transition: all 0.2s ease;
          border-radius: 3px;
        }
        &:hover {
          padding-left: 32px;
        }
      }
      &:checked {
        & + label {
          &:before {
            opacity: 1;
            transform: scale(1);
          }
        }
      }
    }
  }
}

@keyframes load {
  0% {
    left: -200px;
    width: 20%;
  }
  50% {
    width: 40%;
  }
  70% {
    width: 60%;
  }
  80% {
    left: 50%;
  }
  95% {
    left: 120%;
  }
  100% {
    left: 100%;
  }
}

.link{
  position:absolute;
  left:0;
  bottom:0;
  padding:20px;
  z-index:9999;
  a{
      display:flex;
      align-items:center;
      text-decoration:none;
      color:#fff;
  }
  .fa{
    font-size:28px;
    margin-right:8px;
    color:#fff;
  }
}

</style>
