<template>
  <div id="app">
      <form>
          <input type="text" name="name" v-model="newAcc.name"/>
          <input type="text" name="login"  v-model="newAcc.login"/>
          <input type="text" name="pass"  v-model="newAcc.pass"/>
          <button type="button" @click="addAcc">Save</button>
      </form>
      <ul>
          <li v-for="acc in accsArray">
              <div class="item">
                  <span>{{ acc.name }}</span>
                  <span>{{ acc.login }}</span>
                  <span>{{ acc.pass }}</span>
              </div>
          </li>
      </ul>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: 'app',
  data () {
    return {
      newAcc: {
        name: null,
        login: null,
        pass: null
      },
      accsArray: []
    }
  },
  created() {
      axios.get('http://192.168.0.106:7070/accs').then(data => this.accsArray = data.data)
  },
  methods: {
    addAcc() {
      axios.post('http://192.168.0.106:7070/accs', this.newAcc)
    }
  }
}
</script>

<style>
    .item {
        display: flex;
        flex-direction: column;
        margin-bottom: 10px;
    }
</style>
