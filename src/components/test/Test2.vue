<template>
  <div id="mvvm-app">
    <input type="text" v-model="someStr" />
    <input type="text" v-model="child.someStr" />
    <p>{{ getHelloWord }}</p>
    <p v-html="htmlStr"></p>
    <button v-on:click="clickBtn">change model</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      el: "#mvvm-app",
      someStr: "hello ",
      className: "btn",
      htmlStr: '<span style="color: #f00;">red</span>',
      child: {
        someStr: "World !",
      },
    };
  },

  computed: {
    getHelloWord: function () {
      return this.someStr + this.child.someStr;
    },
  },

  methods: {
    clickBtn: function (e) {
      var randomStrArr1 = ["One ", "Two ", "Three "];
      this.someStr = randomStrArr1[parseInt(Math.random() * 3)];

      var randomStrArr2 = ["childOne", "childTwo", "childThree"];
      this.child.someStr = randomStrArr2[parseInt(Math.random() * 3)];
    },
  },
};
</script>