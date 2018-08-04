<template>
    <div class="container" id="loginMain">
        <h2>
            <Icon color="red" type="fireball"></Icon>
            &nbsp;
            后台管理系统
        </h2>
        <form class="col-md-6 col-md-push-3" @submit.prevent="jump">
            <div class="form-group">
                <label for="InputUser">用户名</label>
                <input v-model="username" class="form-control" id="InputUser" placeholder="用户名">
            </div>
            <div class="form-group">
                <label for="InputPassword">密码</label>
                <input type="password" v-model="pwd" class="form-control" id="InputPassword"
                       placeholder="密码">
            </div>
            <button type="submit" class="btn btn-default">登录</button>
        </form>
    </div>
</template>

<script>
    import {userLogin} from "../api/user";
    import apiConf from "../api/api.conf";
    import {mapMutations} from 'vuex'
    import {threeWaveBg} from "../common/util";

    export default {
        name: "login",

        data() {
            return {
                username: '',
                pwd: ''
            }
        },
        created() {
            if (true) {
                //this.jump();
                // this.$router.push({name: 'facManage'})


            }
        },
        mounted() {
            threeWaveBg('loginMain', function (dom) {
                dom.style.opacity = '0.6';
            });
        },
        methods: {
            ...mapMutations(['setUser']),
            jump() {
                this.formCheck() && this.login(this.username, this.pwd)
                //&& this.$router.push({name: 'mapCtrl'});
            },
            login(u, p) {
                this.$Modal.info({
                    content: '正在登陆...'
                });
                userLogin(u, p).then((res) => {
                    //console.log(res.data);
                    if (res.data.code == apiConf.errorCode) {
                        this.$Modal.error({
                            title: '登录失败',
                            content: res.data.msg || '未知错误'
                        });
                    } else if (res.data.code == apiConf.successCode) {
                        console.log(res.data.data);
                        this.setUser(res.data.data);
                        this.$Modal.remove();
                        if (res.data.data.type == apiConf.normalUserType) {
                            this.$router.push(
                                {name: 'facManage', params: {id: res.data.data.id}}
                            );
                        } else if (res.data.data.type == apiConf.superUserType) {
                            this.$router.push({path: '/adminManage'});
                        }
                    }
                })
            },
            formCheck() {
                if (this.username == '') {
                    this.$Modal.error({
                        title: '填写不完整',
                        content: '用户名不能为空'
                    });
                    return false;
                }
                if (this.pwd == '') {
                    this.$Modal.error({
                        title: '填写不完整',
                        content: '密码不能为空'
                    });
                    return false;
                }
                return true;
            }
        }
    }
</script>

<style scoped>

    div.container {
        color: #fff;
        /*padding-top: 20%;*/
        overflow: hidden;
    }

    form {
        margin: 15% auto 0;
        z-index: 99;
        font-size: 1.2em;
    }
</style>