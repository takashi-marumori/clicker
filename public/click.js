let appClick = new Vue({

  el:'#clicker',
    data:{
      clickCounter: 0,
      autoCounter: 0,
      minusCounter: 0,
      levelUpgrade001: 0,
      levelUpgrade002: 0,
      needClickUpgrade001: 10,
      needClickUpgrade002: 50,
    },

    computed:{
      gameObject(){
        return [this.clickCounter,this.autoCounter,
          this.levelUpgrade001,this.levelUpgrade002,
          this.needClickUpgrade001,this.needClickUpgrade002]
      },
      resultCounter(){
        return this.clickCounter + this.autoCounter - this.minusCounter
       },
      secondCounter(){
        return (this.levelUpgrade001 * 0.1) + (this.levelUpgrade002)
       },
      oneClick(){
        return 1 + Math.floor((this.levelUpgrade001 * 0.1) + (this.levelUpgrade002 * 0.5))
      }
    },

    created: function(){
      setInterval(() => {
        this.autoCounter += (this.levelUpgrade001 * 0.1)
                          + (this.levelUpgrade002)
      }, 1000)
    },

    methods:{
      activeClick: function(){
        this.clickCounter += 1 + Math.floor((this.levelUpgrade001 * 0.1) + (this.levelUpgrade002 * 0.5))
      },
      reset: function() {
        this.clickCounter = 0,
        this.autoCounter = 0,
        this.minusCounter = 0,
        this.levelUpgrade001 = 0,
        this.levelUpgrade002 = 0,
        this.needClickUpgrade001 = 10,
        this.needClickUpgrade002 = 50
      },
      clickUpgrade001: function(){
        this.minusCounter += this.needClickUpgrade001
        this.levelUpgrade001 += 1,
        this.needClickUpgrade001 *= 1.5
      },
      clickUpgrade002: function(){
        this.minusCounter += this.needClickUpgrade002
        this.levelUpgrade002 += 1,
        this.needClickUpgrade002 *= 1.5
      },
    },

    watch:{
      gameObject: function(){
        localStorage.setItem('clickCounter',JSON.stringify(this.clickCounter));
        localStorage.setItem('autoCounter',JSON.stringify(this.autoCounter));
        localStorage.setItem('levelUpgrade001',JSON.stringify(this.levelUpgrade001));
        localStorage.setItem('needClickUpgrade001',JSON.stringify(this.needClickUpgrade001));
        localStorage.setItem('levelUpgrade002',JSON.stringify(this.levelUpgrade002));
        localStorage.setItem('needClickUpgrade002',JSON.stringify(this.needClickUpgrade002));
      },
      deep: true
  },

  mounted: function(){
    this.clickCounter = JSON.parse(localStorage.getItem('clickCounter'));
    this.autoCounter = JSON.parse(localStorage.getItem('autoCounter'));
    this.levelUpgrade001 = JSON.parse(localStorage.getItem('levelUpgrade001'));
    this.needClickUpgrade001 = JSON.parse(localStorage.getItem('needClickUpgrade001'));
    this.levelUpgrade002 = JSON.parse(localStorage.getItem('levelUpgrade002'));
    this.needClickUpgrade002 = JSON.parse(localStorage.getItem('needClickUpgrade002'));
  },
});