<template>
  <div id="mvvm-app">
    <input type="text" v-model="word" />
    <p>{{ word }}</p>
    <button v-on:click="sayHi">change model</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      // el: "#mvvm-app",
      word: "Hello World!",
    };
  },
  methods: {
    sayHi: function () {
      this.word = "Hi, everybody!";
    },
  },
};
</script>