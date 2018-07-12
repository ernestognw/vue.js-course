<template lang="pug">
  #app
    img(src='https://ernestognw.github.io/vue.js-course/assets/logo.png')
    h1 PlatziMusic
    select(v-model="selectedCountry")
      option(v-for="country in countries" :value="country.name") {{ country.translations.es }}
    spinner(v-show="loading")
    ul(v-show="artists")
      artist(v-for="artist in artists" :artist="artist" :key="artist.mbid")
    p(v-show="!artists || artists.length == 0") No se encontró información en este país :(
</template>

<script>
import getArtists from './api/';
import artist from './components/artist';
import getCountries from './api/countries';
import spinner from './components/spinner'

export default {
  name: 'app',
  data () {
    return {
      artists: [],
      countries: [],
      selectedCountry: 'Argentina',
      loading: true,
    }
  },
  components: {
    artist,
    spinner
  },
  methods: {
    refreshArtist() {
      const self = this
      self.loading = true;
      self.artists = [];
      getArtists(this.selectedCountry)
        .then(function (artists) {
          self.loading = false
          self.artists = artists
        })
    },
    getCountryList() {
      const self = this
      getCountries()
        .then(function (countries) {
          self.countries = countries
        })
    }
  },
  mounted() {
    this.getCountryList()
    this.refreshArtist()
  },
  watch: {
    selectedCountry () {
      this.refreshArtist()
    }
  }
}
</script>

<style lang="stylus">
#app
    font-family 'Avenir', Helvetica, Arial, sans-serif
    -webkit-font-smoothing antialiased
    -moz-osx-font-smoothing grayscale
    text-align center
    color #2c3e50
    margin-top 60px

h1, h2
    font-weight normal

ul
    list-style-type none
    padding 0

li
    display inline-block
    margin 0 10px

a
    color #42b983
</style>
