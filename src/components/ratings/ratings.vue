<template>
    <div styleName="ratings">
        我是ratings
    </div>
</template>

<script>
import CSSModules from 'vue-css-modules'
import vuex from 'vuex';

export default {
    mixins: [CSSModules()],
    created () {
        // console.log(this.$store.state.count)
    }
}
</script>

<style module lang="less">
    .ratings {
        color: red;
    }
</style>
