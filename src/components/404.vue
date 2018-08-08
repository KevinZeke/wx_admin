<template>
    <div class="container" id="code404">
        <div class="box col-md-offset-3 col-lg-6 col-md-6 col-lg-offset-3 col-sm-12 col-xs-12">
            <h4>
                <Icon type="close-circled" color="#ff3454"></Icon>
                &nbsp;&nbsp;
                {{title}}
            </h4>
            <p>{{content}}&nbsp;&nbsp;
                <Icon
                        color="steelblue"
                        style="cursor: pointer"
                        size="25"
                        @click="$router.push({name:'login'})"
                        type="log-in"></Icon>
            </p>
            <slot></slot>
        </div>
    </div>
</template>

<script>
    import {threeWaveBg} from "../common/util";

    export default {
        props: {
            title: {type: String, default: '404：页面未找到'},
            content: {type: String, default: '请检查地址是否正确或尝试重新登录'}
        },
        mounted() {
            threeWaveBg('code404', function (dom) {
                dom.style.opacity = '0.6';
            });
        }
    }
</script>

<style scoped>
    .container {
        text-align: center;
    }

    .box {
        background-color: rgba(3, 3, 3, .6);
        color: #d5d5d5;
        margin-top: 15%;
        font-size: 1.4em;
        padding: 10px;
        box-shadow: -2px -2px 20px 4px #282828 inset;
        font-weight: 500;
        z-index: 99;

    }

    .box h4 {
        padding-bottom: 15px;
        border-bottom: 1px solid #5d5d5d;
    }
</style>
