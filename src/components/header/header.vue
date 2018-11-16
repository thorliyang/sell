<template>
<div :class="$style['header']">
    <div :class="$style['content-wrapper']">
        <!-- 商家图片 -->
        <div :class="$style['avatar']">
            <img :src="seller.avatar" width="64" height="64">
        </div>
        <!-- 内容 -->
        <div :class="$style['content']">
            <div :class="$style['title']">
                <span :class="$style['brand']"></span>
                <span :class="$style['name']">{{seller.name}}</span>
            </div>
            <div :class="$style['description']">{{seller.description}}/{{seller.deliveryTime}}分钟送达</div>
            <div v-if="seller.supports" :class="$style['support']">
                <icon :variety="1" :type="seller.supports[0].type" />
                <span :class="$style['text']">{{seller.supports[0].description}}</span>
            </div>
        </div>
        <!-- count -->
        <div :class="$style['support-count']" v-if="seller.supports" @click="showDetail">
            <span :class="$style['count']">{{seller.supports.length}}个</span>
            <i :class="[$index['keyboard_arrow_right'], $style['keyboard_arrow_right']]"></i>
        </div>
    </div>
    <!-- 公告 -->
    <div :class="$style['bulletin-wrapper']" @click="showDetail">
        <span :class="$style['bulletin-title']"></span><span :class="$style['bulletin-text']">{{seller.bulletin}}</span>
        <i :class="[$index['keyboard_arrow_right'], $style['keyboard_arrow_right']]"></i>
    </div>
    <!-- shadow -->
    <div :class="$style['background']">
        <img :src="seller.avatar" width="100%" >
    </div>
    <!-- shadow内容 -->
    <transition name="fade">
        <div :class="$style['detail']" v-show="detailShow">
            <div :class="$style['detail-background']"></div>
            <div :class="[$style['detail-wrapper'], $index['clearfix']]" class="clearfix">
                <div :class="$style['detail-main']">
                    <h1 :class="$style['name']">{{seller.name}}</h1>
                    <div :class="$style['star-wrapper']">
                        <v-star :size="48" :score="seller.score"></v-star>
                    </div>
                    <div :class="$style['title-wrapper']">
                        <v-title :text="titleText[0]"></v-title>
                    </div>
                    <ul :class="$style['supports']" v-if="seller.supports">
                        <li :class="$style['support-item']" v-for="(item, index) in seller.supports" :key="index">
                            <icon :variety="2" :type="item.type" />
                            <span :class="$style['text']">{{item.description}}</span>
                        </li>
                    </ul>
                    <div :class="$style['title-wrapper']">
                        <v-title :text="titleText[1]"></v-title>
                    </div>
                    <div :class="$style['bulletin']">
                        <p :class="$style['content']">{{seller.bulletin}}</p>
                    </div>
                </div>
            </div>
            <div :class="$style['detail-close']" @click="hideDetail">
                <i :class="$index['close']"></i>
            </div>
        </div>
    </transition>
</div>
</template>

<script>
import star from '../reuse/star/star'
import title from '../reuse/title/title'
import icon from '../reuse/icon/icon'

export default {
    components: {
        'v-star': star, 
        'v-title': title,
        icon
    },
    props: {
        seller: {
            type: Object
        }
    },
    data () {
        return {
            classMap: ['decrease', 'discount', 'guarantee', 'invoice', 'special'],
            detailShow: false,
            titleText: ['优惠信息', '商家公告']
        }
    },
    methods: {
        showDetail () {
            this.detailShow = true
        },
        hideDetail () {
            this.detailShow = false
        }
    },
}
</script>

<style module lang="less">
.header-image (@url) {
    .bg-image(@url, 'header', '');
}

.header {
    position: relative;
    color: #fff;
    background-color: rgba(7, 17, 27, 0.5);
    overflow: hidden;
    .content-wrapper {
        position: relative;
        padding: 24px 12px 18px 24px;
        font-size: 0;
        .avatar {
            display: inline-block;
            vertical-align: top;
            img {
                border-radius: 2px;
            }
        }
        .content {
            display: inline-block;
            margin-left: 16px;
            .title {
                margin: 2px 0 8px;
                .brand {
                    display: inline-block;
                    vertical-align: top;
                    width: 30px;
                    height: 18px;
                    .header-image('brand');
                    background-size: 30px 18px;
                    background-repeat: no-repeat;
                }
                .name {
                    margin-left: 6px;
                    font-size: 16px;
                    line-height: 18px;
                    font-weight: bold;
                }
            }
            .description {
                margin-bottom: 10px;
                line-height: 12px;
                font-size: 12px;
            }
            .support {
                .text {
                    line-height: 12px;
                    font-size: 10px;
                }
            }
        }
        .support-count {
            position: absolute;
            right: 12px;
            bottom: 14px;
            padding: 0 8px;
            height: 24px;
            line-height: 24px;
            border-radius: 14px;
            background-color: rgba(0, 0, 0, 0.2);
            text-align: center;
            .count {
                vertical-align: top;
                font-size: 10px;
            }
            .keyboard_arrow_right {
                margin-left: 2px;
                line-height: 24px;
                font-size: 10px;
            }
        }
    }
    .bulletin-wrapper {
        position: relative;
        height: 28px;
        line-height: 28px;
        padding: 0 22px 0 12px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        background-color: rgba(7,17,27,0.2);
        .bulletin-title {
            display: inline-block;
            vertical-align: top;
            margin-top: 8px;
            width: 22px;
            height: 12px;
            .header-image('bulletin');
            background-size: 22px 12px;
            background-repeat: no-repeat;
        }
        .bulletin-text {
            vertical-align: top;
            font-size: 10px;
            margin: 0 4px;
        }
        .keyboard_arrow_right {
            position: absolute;
            font-size: 10px;
            right: 12px;
            top: 8px;
        }
    }
    .background {
        text-align: center;
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: -1;
        filter: blur(10px);
    }
    .detail {
        position: fixed;
        z-index: 100;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
        background-color: rgba(7, 17, 27, 0.9);
        .detail-wrapper {
            width: 100%;
            min-height: 100%;
            .detail-main {
                padding: 64px 0;
                .name {
                    line-height: 16px;
                    text-align: center;
                    font-size: 16px;
                    font-weight: 700;
                }
                .star-wrapper {
                    margin-top: 18px;
                    padding: 2px 0;
                    text-align: center;
                }
                .title-wrapper {
                    width: 80%;
                    margin: 28px auto 24px;
                }
                .supports {
                    width: 80%;
                    margin: 0 auto;
                    .support-item {
                        padding: 0 12px;
                        margin-bottom: 12px;
                        font-size: 0;
                        &:last-child {
                            margin-bottom: 0;
                        }
                        .text {
                            line-height: 16px;
                            font-size: 12px;
                        }
                    }
                }
                .bulletin {
                    width: 80%;
                    margin: 0 auto;
                    .content {
                        padding: 0 12px;
                        line-height: 24px;
                        font-size: 12px;
                    }
                }
            }
        }
        .detail-close {
            position: relative;
            width: 32px;
            height: 32px;
            margin: -64px auto 0;
            clear: both;
            font-size: 32px;
        }
    }
}
</style>

<style scoped>
.fade-enter-active, .fade-leave-active {
    transition: all .3s
}
.fade-enter, .fade-leave-to  {
    transform: scale(0);
    opacity: 0;
}
.fade-leave, .fade-enter-to {
    transform: scale(1);
    opacity: 1;
}
</style>

