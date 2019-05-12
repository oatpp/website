<template>
  <div>
    <span v-for="item in items" class="contributor_img">
      <a :href="item.url" >
        <img :src="item.img" :alt="item.login" :title="item.login" width="64px">
      </a>
    </span>
  </div>
</template>
<script>

const axios = require('axios')

export default {
  data () {
      return {
          items: []
      }
  },
  beforeMount() {
    axios.get('https://api.github.com/repos/oatpp/oatpp/stats/contributors')
    .then(response => {

       var arr = response.data;
       var items = [];
       for (var item of response.data) {
         if(item.author.type != "Bot") {
           var author = {
              total: item.total,
              login: item.author.login,
              url: item.author.html_url,
              img: item.author.html_url + ".png"
           };
           items.push(author);
         }
       }

       function compare(a, b) {
         if ( a.total > b.total ){
           return -1;
         }
         if ( a.total < b.total ){
           return 1;
         }
         return 0;
       }

       items.sort(compare);

       this.$data.items = items;

    })
    .catch(error => {
        console.log(error);
    })
  }
}

</script>
<style scoped></style>