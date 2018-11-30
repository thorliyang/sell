<template>
    <div styleName="seller" ref="seller">
        <div styleName="seller-content">
            <div styleName="overview">
                <h1 styleName="title">{{seller.name}}</h1>
                <div styleName="desc">
                    <star styleName="star" :size="36" :score="seller.score"/>
                    <span styleName="text">({{seller.ratingCount}})</span>
                    <span styleName="text">月售{{seller.sellCount}}单</span>
                </div>
                <ul styleName="remark">
                    <li styleName="block">
                        <h2>起送价</h2>
                        <div styleName="content">
                            <span styleName="stress">{{seller.minPrice}}</span>元
                        </div>
                    </li>
                    <li styleName="block">
                        <h2>商家配送</h2>
                        <div styleName="content">
                            <span styleName="stress">{{seller.deliveryPrice}}</span>元
                        </div>
                    </li>
                    <li styleName="block">
                        <h2>平均配送时间</h2>
                        <div styleName="content">
                            <span styleName="stress">{{seller.deliveryTime}}</span>分钟
                        </div>
                    </li>
                </ul>
                <div styleName="favorite" @click="toggleFavorite">
                    <span class="icon_favorite" styleName="icon_favorite :active"></span>
                    <span styleName="text">{{favoriteText}}</span>
                </div>
            </div>
            <split />
            <div styleName="bulletin">
                <h1 styleName="title">公告与活动</h1>
                <div styleName="content-wrapper">
                    <p styleName="content">{{seller.bulletin}}</p>
                </div>
                <ul styleName="supports" v-if="seller.supports">
                    <li styleName="support-item" v-for="(item, index) in seller.supports" :key="index" >
                        <icon :variety="4" :type="item.type" />
                        <span styleName="text">{{item.description}}</span>
                    </li>
                </ul>
            </div>
            <split />
            <div styleName="pics">
                <h1 styleName="title">公告与活动</h1>
                <div styleName="pic-wrapper" ref="picWrapper">
                    <ul styleName="pic-list" ref="picList">
                        <li styleName="pic-item" :style="{marginRight: PICMARGIN + 'px'}" v-for="(pic, index) in seller.pics" :key="index" style="">
                            <img :src="pic" :width="PICWIDTH" height="90" />
                        </li>
                    </ul>
                </div>
            </div>
            <split />
            <div styleName="info">
                <h1 styleName="title">商家信息</h1>
                <ul>
                    <li styleName="info-item" v-for="(item, index) in seller.infos" :key="index">{{item}}</li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import CSSModules from 'vue-css-modules'
import BScroll from 'better-scroll'
import { saveToLocal, loadFromLocal } from '../../common/js/store.js'
import star from '../reuse/star/star'
import split from '../reuse/split/split'
import icon from '../reuse/icon/icon'

export default {
    mixins: [CSSModules()],
    components: {
        star, split, icon
    },
    data () {
        return {
            PICWIDTH: 120,
            PICMARGIN: 6,
            favorite: false
        }
    },
    computed: {
        ...mapState({
            seller: state => state.seller
        }),
        favoriteText () {
            return this.active ? '已收藏' : '收藏'
        },
        active: {
            get () {
                this.favorite = loadFromLocal(this.seller.id, 'favorite', false)
                return this.favorite
            },
            set (newVal) {
                this.favorite = newVal
            }
        }
    },
    watch: {
        seller () {
            this._initScroll()       
            this._initPics()
        }
    },
    methods: {
        _initScroll () { 
            this.$nextTick().then(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.seller, {
                        click: true
                    })
                } else {
                    this.scroll.refresh()
                }
            })
        },
        _initPics () {
            if (this.seller.pics) {
                let pics = this.seller.pics
                let width = (this.PICWIDTH + this.PICMARGIN) * pics.length - this.PICMARGIN
                this.$nextTick().then(() => {
                    this.$refs.picList.style.width = width + 'px'
                    if (!this.picScroll) {
                        this.picScroll = new BScroll(this.$refs.picWrapper, {
                            scrollX: true,
                            eventPassthrough: 'vertical'
                        })
                    } else {
                        this.picScroll.refresh()
                    }
                })
            }
        },
        toggleFavorite (e) {
            this.active = !this.active
            saveToLocal(this.seller.id, 'favorite', this.favorite)
        }
    },
    created () {
        this._initScroll()       
        this._initPics()
    }
}
</script>

<style module lang="less">
.seller {
    position: absolute;
    top: 174px;
    bottom: 46px;
    width: 100%;
    overflow: hidden;
    .overview {
        padding: 18px;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .desc {
            padding-bottom: 18px;
            .border-1px(rgba(7, 17, 27, 0.1));
            font-size: 0;
            .star {
                display: inline-block;
                vertical-align: top;
            }
            .text {
                display: inline-block;
                margin-left: 8px;
                line-height: 18px;
                color: rgb(77, 85, 93);
                font-size: 10px;
                &:last-child {
                    margin-left: 12px;
                }
            }
        }
        .remark {
            display: flex;
            padding-top: 18px;
            .block {
                flex: 1;
                border-right: 1px solid rgba(7, 17, 27, 0.1);
                text-align: center;
                &:last-child {
                    border-right: none;
                }
                h2 {
                    margin-bottom: 4px;
                    line-height: 10px;
                    font-size: 10px;
                    color: rgb(147, 153, 159);
                }
                .content {
                    line-height: 24px;
                    font-size: 10px;
                    color: rgb(7, 17, 27);
                    .stress {
                        font-size: 24px;
                    }
                }
            }
        }
        .favorite {
            position: absolute;
            top: 18px;
            right: 11px;
            width: 50px;
            text-align: center;
            .icon_favorite {
                display: block;
                margin-bottom: 4px;
                line-height: 24px;
                font-size: 24px;
                color: #d4d6d9;
                &.active {
                    color: rgb(240, 20, 20);
                }
            }
            .text {
                line-height: 10px;
                font-size: 10px;
                color: rgb(77, 85, 93);
            }
        }
    }
    .bulletin {
        padding: 18px 18px 0;
        .title {
            margin-bottom: 8px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .content-wrapper {
            padding: 0 12px 16px;
            .border-1px(rgba(7, 17, 27, 0.1));
            .content {
                line-height: 24px;
                font-size: 12px;
                color: rgb(240, 20, 0);
            }
        }
        .supports {
            .support-item {
                padding: 16px;
                line-height: 18px;
                font-size: 12px;
                color: rgb(7, 17, 27);
                .border-1px(rgba(7, 17, 27, 0.1));
                &:last-child {
                    .border-none();
                }
            }
        }
    }
    .pics {
        padding: 18px;
        .title {
            margin-bottom: 12px;
            line-height: 14px;
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .pic-wrapper {
            width: 100%;
            overflow: hidden;
            white-space: nowrap;
            .pic-list {
                font-size: 0;
                .pic-item {
                    display: inline-block;
                    &:last-child {
                        margin-right: 0 !important; 
                    }
                }
            }
        }
    }
    .info {
        padding: 18px 18px 0;
        color: rgb(7, 17, 27);
        .title {
            padding-bottom: 12px;
            line-height: 14px;
            .border-1px(rgba(7, 17, 27, 0.1));
            color: rgb(7, 17, 27);
            font-size: 14px;
        }
        .info-item {
            padding: 18px 12px;
            line-height: 16px;
            .border-1px(rgba(7, 17, 27, 0.1));
            font-size: 12px;
        }
    }
}
</style>
