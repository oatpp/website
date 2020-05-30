<template>
    <div>
        <div v-for="user in users" class="maintainer_root">
            <img :src="user.avatar_url" :alt="user.name" width="80px">
            <div class="maintainer_info">
                <p class="maintainer_name">{{user.name}}</p>
                <p class="maintainer_desc">{{user.bio}}</p>
                <iframe :src="user.follow_addr" frameborder="0" scrolling="0" width="170px" height="20px"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
    const axios = require('axios')

    export default {
        data() {
            return {
                users: []
            }
        }
        ,
        beforeMount() {

            function loadUserInfo(obj, username, index) {
                axios.get('https://api.github.com/users/' + username)
                    .then(response => {

                        var user = response.data;
                        user.follow_addr = "https://ghbtns.com/github-btn.html?user=" + username + "&type=follow"

                        obj.$data.users.push(user);

                    })
                    .catch(error => {
                        console.log(error);
                    })
            }

            var usernames = ["lganzzzo", "bamkrs"];
            for (let i = 0; i < usernames.length; i++) {
                let username = usernames[i];
                loadUserInfo(this, username,  i);
            }

        }
    }
</script>

<style scoped>

</style>