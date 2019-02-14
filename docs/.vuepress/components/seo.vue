<template></template>
<script>
  export default {
    created () {
      if (typeof this.$ssrContext !== 'undefined') {

        var host = "https://oatpp.io";
        var pageUrl = host + `${this.$page.path}`

        this.$ssrContext.userHeadTags+="<link rel='canonical' href='" + pageUrl + "'/>";
      }
    }
  }
</script>
<style scoped></style>