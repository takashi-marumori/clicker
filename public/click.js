var upgrades = Vue.extend({
  props:['name'],
  template:
    `
    <p v-if="$parent.resultCounter >= Math.ceil($parent.needClickUpgrade004)">
    <button class="upgrade" @click="$parent.clickUpgrade004">
      <div class="upgrade-title">
        {{name}}
      </div>
      <div>
        <div>
          レベル： {{ $parent.levelUpgrade004 }}
        </div>
        <div>
          必要なクリック数： {{ Math.ceil($parent.needClickUpgrade004) }}
        </div>
      </div>
    </button>
  </p>
  
  <p v-else>
    <button class="upgrade mask">
      <div class="upgrade-title">
        {{name}}
      </div>
      <div>
        <div>
          レベル： {{ $parent.levelUpgrade004 }}
        </div>
        <div>
          必要なクリック数： {{ Math.ceil($parent.needClickUpgrade004) }}
        </div>
      </div>
    </button>
  </p>
    `
})

var appClick = new Vue({

  el: '#clicker',
  components: {
    'upgrades': upgrades
  },

  data() {
    return {
      clickCounter: 0,
      autoCounter: 0,
      minusCounter: 0,
      levelUpgrade001: 0,
      levelUpgrade002: 0,
      levelUpgrade003: 0,
      levelUpgrade004: 0,
      needClickUpgrade001: 10,
      needClickUpgrade002: 50,
      needClickUpgrade003: 250,
      needClickUpgrade004: 1000,
    }
  },

  computed: {
    gameObject() {
      return [this.clickCounter, this.autoCounter,
      this.levelUpgrade001, this.levelUpgrade002,
      this.levelUpgrade003, this.levelUpgrade004,
      this.needClickUpgrade001, this.needClickUpgrade002,
      this.needClickUpgrade003, this.needClickUpgrade004,
    ]
    },
    resultCounter() {
      return this.clickCounter + this.autoCounter - this.minusCounter
    },
    secondCounter() {
      return (this.levelUpgrade001 * 0.1) + (this.levelUpgrade002) + (this.levelUpgrade003 * 2) + (this.levelUpgrade004 * 5)
    },
    oneClick() {
      return 1 + Math.floor(
        (this.levelUpgrade001 * 0.1) + (this.levelUpgrade002 * 0.5) + (this.levelUpgrade003) + (this.levelUpgrade004 * 2)
        )
    }
  },

  created: function () {
    setInterval(() => {
      this.autoCounter += (this.levelUpgrade001 * 0.1) + (this.levelUpgrade002 * 0.5) + (this.levelUpgrade003) + (this.levelUpgrade004 * 2)
      }, 1000)
  },

  methods: {
    activeClick: function () {
      this.clickCounter += 1 + Math.floor(
        (this.levelUpgrade001 * 0.1) + (this.levelUpgrade002 * 0.5) + (this.levelUpgrade003) + (this.levelUpgrade004 * 2)
        )
    },
    clear: function () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    clickUpgrade001: function () {
      this.minusCounter += this.needClickUpgrade001
      this.levelUpgrade001 += 1,
        this.needClickUpgrade001 *= 1.5
    },
    clickUpgrade002: function () {
      this.minusCounter += this.needClickUpgrade002
      this.levelUpgrade002 += 1,
        this.needClickUpgrade002 *= 1.5
    },
    clickUpgrade003: function () {
      this.minusCounter += this.needClickUpgrade003
      this.levelUpgrade003 += 1,
        this.needClickUpgrade003 *= 1.5
    },
    clickUpgrade004: function () {
      this.minusCounter += this.needClickUpgrade004
      this.levelUpgrade004 += 1,
        this.needClickUpgrade004 *= 1.5
    },
  },

  watch: {
    gameObject: function () {
      localStorage.setItem('clickCounter', JSON.stringify(this.clickCounter));
      localStorage.setItem('autoCounter', JSON.stringify(this.autoCounter));
      localStorage.setItem('levelUpgrade001', JSON.stringify(this.levelUpgrade001));
      localStorage.setItem('needClickUpgrade001', JSON.stringify(this.needClickUpgrade001));
      localStorage.setItem('levelUpgrade002', JSON.stringify(this.levelUpgrade002));
      localStorage.setItem('needClickUpgrade002', JSON.stringify(this.needClickUpgrade002));
      localStorage.setItem('levelUpgrade003', JSON.stringify(this.levelUpgrade003));
      localStorage.setItem('needClickUpgrade003', JSON.stringify(this.needClickUpgrade003));
      localStorage.setItem('levelUpgrade004', JSON.stringify(this.levelUpgrade004));
      localStorage.setItem('needClickUpgrade004', JSON.stringify(this.needClickUpgrade004));
    },
    deep: true
  },

  mounted: function () {
    this.clickCounter = JSON.parse(localStorage.getItem('clickCounter'));
    this.autoCounter = JSON.parse(localStorage.getItem('autoCounter'));
    this.levelUpgrade001 = JSON.parse(localStorage.getItem('levelUpgrade001'));
    this.needClickUpgrade001 = JSON.parse(localStorage.getItem('needClickUpgrade001'));
    this.levelUpgrade002 = JSON.parse(localStorage.getItem('levelUpgrade002'));
    this.needClickUpgrade002 = JSON.parse(localStorage.getItem('needClickUpgrade002'));
    this.levelUpgrade003 = JSON.parse(localStorage.getItem('levelUpgrade003'));
    this.needClickUpgrade003 = JSON.parse(localStorage.getItem('needClickUpgrade003'));
    this.levelUpgrade004 = JSON.parse(localStorage.getItem('levelUpgrade004'));
    this.needClickUpgrade004 = JSON.parse(localStorage.getItem('needClickUpgrade004'));
  },
});