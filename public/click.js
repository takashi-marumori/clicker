var upgrades = Vue.extend({
  props:['name','level','need','click'],
  
  template:
    `
    <p v-if="$parent.resultCounter >= Math.ceil(need)">
    <button class="upgrade" @click="click">
      <div class="upgrade-title">
        {{name}}
      </div>
      <div>
        <div>
          レベル： {{ level }}
        </div>
        <div>
          必要なクリック数： {{ Math.ceil(need) }}
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
          レベル： {{ level }}
        </div>
        <div>
          必要なクリック数： {{ Math.ceil(need) }}
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
      boostItem: 1,
      boostSwitch: false,
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
      return [this.clickCounter, this.autoCounter,this.minusCounter,
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
      return (1 + Math.floor(
        (this.levelUpgrade001 * 0.1) + (this.levelUpgrade002 * 0.5) + (this.levelUpgrade003) + (this.levelUpgrade004 * 2)
        )) * this.boostItem
    }
  },

  created: function () {
    setInterval(() => {
      this.autoCounter += (this.levelUpgrade001 * 0.1) + (this.levelUpgrade002) + (this.levelUpgrade003 * 2) + (this.levelUpgrade004 * 5)
      }, 1000)
  },

  methods: {
    activeClick: function () {
      this.clickCounter += (1 + Math.floor(
        (this.levelUpgrade001 * 0.1) + (this.levelUpgrade002 * 0.5) + (this.levelUpgrade003) + (this.levelUpgrade004 * 2)
        )) * this.boostItem
    },
    clear: function () {
      Object.assign(this.$data, this.$options.data.call(this))
    },
    boost: function(){
      if ((this.resultCounter > this.oneClick * 100) && this.boostSwitch == false) {
        this.minusCounter += this.oneClick * 100;
        this.boostItem = 10;
        this.boostSwitch = true;
          setTimeout(function(){
            this.boostItem = 1,
            this.boostSwitch = false
          }.bind(this),5000)
      } else {
        return false
      }
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
      localStorage.setItem('minusCounter', JSON.stringify(this.minusCounter));
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
    this.minusCounter = JSON.parse(localStorage.getItem('minusCounter'));
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