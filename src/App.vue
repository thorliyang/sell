<template>
<div id="app">
    <v-header :seller="seller"></v-header>
    <nav :class="[$style.nav,$index['border-1px']]">
        <div :class="$style['nav-item']">
            <router-link :to="{name: 'goods'}" :active-class="$style['active']">商品</router-link>
        </div>
        <div :class="$style['nav-item']">
            <router-link :to="{name: 'ratings'}" :active-class="$style['active']">评论</router-link>
        </div>
        <div :class="$style['nav-item']">
            <router-link :to="{name: 'seller'}" :active-class="$style['active']">商家</router-link>
        </div>
    </nav>
    <router-view :seller="seller"></router-view>

    <!-- <article class="content"></article>
    <footer class="footer"></footer> -->
</div>
</template>

<script>
import header from './components/header/header'

const ERR_OK = 0;

export default {
    name: 'app',
    components: {
        'v-header': header
    },
    data() {
        return {
            seller: {}
        }
    },
    created() {
        this.$http('/seller').then(response => {
            response = response.data
            if (response.errno === ERR_OK) {
                this.seller = response.data
            }
        })
    }
}
</script>

<style module lang="less">
.nav {
    display: flex;
    height: 40px;
    width: 100%;
    align-items: center;
    box-sizing: border-box;
    .border-1px(rgba(7, 17, 27, 0.1));
    .nav-item {
        flex: 1;
        line-height: 40px;
        text-align: center;
        & > a {
            display: block;
            font-size: 14px;
            color: rgb(77, 85, 93);
            &.active {
                color: rgb(240, 20, 20);
            }
        }
    }
}
</style>
