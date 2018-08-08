<style scoped>
    .layout-con {
        height: 100%;
        width: 100%;
    }

    .menu-item span {
        display: inline-block;
        overflow: hidden;
        width: 69px;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: bottom;
        transition: width .2s ease .2s;
    }

    .menu-item i {
        transform: translateX(0px);
        transition: font-size .2s ease, transform .2s ease;
        vertical-align: middle;
        font-size: 16px;
    }

    .collapsed-menu span {
        width: 0px;
        transition: width .2s ease;
    }

    .collapsed-menu i {
        transform: translateX(5px);
        transition: font-size .2s ease .2s, transform .2s ease .2s;
        vertical-align: middle;
        font-size: 22px;
    }
</style>
<template>
    <div class="layout">
        <vheader brand="后台管理系统"></vheader>
        <Layout :style="{minHeight: '100vh'}">
            <Sider collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1">
                        <router-link
                                style="display: inline-block;width: 100%;"
                                :to="{name:'waterList'}">
                            <Icon type="ios-flame" />
                            &nbsp;
                            &nbsp;
                            <span>水源</span>
                        </router-link>
                    </MenuItem>
                    <MenuItem name="1-2" >
                        <router-link
                                style="display: inline-block;width: 100%;"
                                :to="{name:'buildingList'}">
                            <Icon type="ios-home" />
                            &nbsp;
                            &nbsp;
                            <span>建筑</span>
                        </router-link>
                    </MenuItem>
                    <MenuItem name="1-3">
                        <router-link
                                style="display: inline-block;width: 100%;"
                                :to="{name:'userList'}">
                            <Icon type="ios-contact" />
                            &nbsp;
                            &nbsp;
                            <span>人员</span>
                        </router-link>
                    </MenuItem>
                </Menu>
            </Sider>
            <Layout>
                <!--<Header :style="{background: '#fff', boxShadow: '0 2px 3px 2px rgba(0,0,0,.1)'}"></Header>-->
                <Content :style="{padding: '0 16px 16px'}">
                    <Card>
                        <div style="height: 100%">
                            <router-view></router-view>
                        </div>
                    </Card>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>
<script>
    import vheader from './manage/manage-header'

    export default {
        data() {
            return {
                curLocate:'水源',
                isCollapsed: false
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
        methods:{
            changeCurLocate(name){
                console.log(name);
                this.curLocate = name;
            }
        },
        components: {vheader}
    }
</script>