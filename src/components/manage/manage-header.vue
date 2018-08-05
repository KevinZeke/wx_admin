<template>
    <nav class="navbar navbar-default navbar-inverse" style="margin-bottom: 10px">
        <div class="container-fluid">
            <!-- Brand and toggle get grouped for better mobile display -->
            <div class="navbar-header hidden-sm hidden-xs" >
                <a class="navbar-brand" href="#">{{brand}}</a>
            </div>

            <div class="nav navbar-nav navbar-right logout">
                <span class="glyphicon glyphicon-user" aria-hidden="true"></span>
                <span>当前账户：{{userinfo.name || '未知'}}</span>
                &nbsp;
                <span  @click="logout" >[注销]</span>
                <button hidden style="position: absolute;top: 0;right: 0;font-size: .2em"
                        @click="toggleRouter"
                        type="button" class="navbar-toggle collapsed" aria-expanded="false">
                    <span class="sr-only">Toggle navigation</span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                    <span class="icon-bar"></span>
                </button>
                <slot></slot>
            </div>
        </div><!-- /.container-fluid -->
    </nav>
</template>

<script>
    import {mapGetters} from 'vuex'
    export default {
        name: "manage-header",
        props: {
            brand: {type: String, default: ''},
            user: {type: String, default: ''}
        },
        created(){
            console.log(this.userinfo)
        },
        computed: {
            ...mapGetters([
                'userinfo'
            ])
        },
        methods:{
            logout() {
                this.$router.push({name: 'login'});
            },
            toggleRouter(){
                return false;
            }
        }
    }
</script>

<style scoped>
    .logout {
        color: #e2e2e2;
        font-size: .5em;
        padding: 10px;
        box-sizing: border-box;
        cursor: pointer;
    }
</style>