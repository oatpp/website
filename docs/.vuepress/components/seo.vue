<template></template>
<script>
  export default {
    created () {
      if (typeof this.$ssrContext !== 'undefined') {

        var host = "https://oatpp.io";
        var pageUrl = host + `${this.$page.path}`


        if(pageUrl[pageUrl.length -1] == '/') { // remove last '/'
            pageUrl = pageUrl.slice(0, -1);
        }

        this.$ssrContext.userHeadTags+="<link rel='canonical' href='" + pageUrl + "'/>";
      }
    }
  }
</script>
<style scoped></style>