<template>
  <div class="rating ml-2 mt-5" :id="id + 'main'">
    <star-rating
      v-if="ignoreClick === true || disabled"
      :increment="0.5"
      v-model:rating="rating"
      :star-size="25"
      v-on:click.stop
      :read-only="true"
      :show-rating="false"
      :rounded-corners="true"
      :border-width="2"
      readonly
      :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
    />
    <star-rating
      v-else
      :increment="0.5"
      v-model:rating="rating"
      :star-size="25"
      @click="setUserRating()"
      :show-rating="false"
      :rounded-corners="true"
      :border-width="2"
      :star-points="[23,2, 14,17, 0,19, 10,34, 7,50, 23,43, 38,50, 36,34, 46,19, 31,17]"
    />
  </div>
</template>
<script>
import { mapActions, mapGetters } from 'vuex'
import StarRating from 'vue-star-rating'

export default {
  props: ['id', 'userRating', 'ignoreClick', 'disabled'],
  data () {
    return {
      rating: 0,
    }
  },
  components: {
    StarRating
  },
  computed: {
    ...mapGetters(['userRatings'])
  },
  methods: {
    ...mapActions([
      'setRating',
      'getRatings'
    ]),
    setUserRating () {
      this.setRating({ rating: this.rating, program: this.id })
    }
  },
  watch: {
    userRating () {
      if (this.userRating !== '' && this.userRating.find(x => x.program === this.id)) {
        this.rating = this.userRating.find(x => x.program === this.id).rating
      }
    }
  },
  async mounted () {
    this.rating = await this.getRatings(this.id)
  }
}
</script>
<style scoped>
  [type='radio']:checked {
    color: gold;
    background-color: gold;
    background-image: none;
  }
</style>