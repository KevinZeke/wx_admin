<template>
    <div style="position: relative">
        <bread-header :path="['管理','建筑']"></bread-header>
        <baidu-map v-if="center" class="bmap" :center="center" :zoom="15">
            <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
            <bm-control>
                <button class="btn btn-default" @click="closeMap">关闭地图</button>
            </bm-control>
            <bm-marker
                    :position="center"
                    :dragging="false"
                    animation="BMAP_ANIMATION_DROP">
                <bm-label :content="centerContent"
                          :labelStyle="{color: 'red', fontSize : '12px'}"
                          :offset="{width: -20, height: 30}"/>
            </bm-marker>
        </baidu-map>
        <Spin fix size="large" v-if="spinShow"></Spin>
        <div style="position: absolute;width: 50px;height: 50px;border-radius: 50%;background-color:#2e6da4;z-index: 99;text-align: center;line-height: 50px;right: 0;color: #fff;font-size: 1.1em;cursor: pointer;color: white">
            <router-link :to="{name:'buildingForm'}" style="color: white">添加</router-link>
        </div>
        <Table border stripe
               @on-row-click="changeMapCenter"
               :columns="listColumns" :data="listData"></Table>
        <div class="page text-center row">
            <Page
                    show-elevator
                    :page-size="listPageSize"
                    @on-change="pageChangeHandle"
                    @on-page-size-change="pageSizeChangeHandle"
                    :total="listTotal"
                    :current="listCurPage" prev-text="上一页" next-text="下一页"/>
        </div>
    </div>
</template>

<script>
    import {getList, getPageInfo, del} from "../../api/building";
    import breadHeader from '../manage/bread-header'
    import baiduMap from 'vue-baidu-map/components/map/Map'
    import bmView from 'vue-baidu-map/components/map/MapView'
    import bmMarker from 'vue-baidu-map/components/overlays/Marker'
    import bmLabel from 'vue-baidu-map/components/overlays/Label'
    import bmTraffic from 'vue-baidu-map/components/layers/Traffic'
    import bmDriving from 'vue-baidu-map/components/search/Driving'
    import bmLocalSearch from 'vue-baidu-map/components/search/LocalSearch'
    import bmNavigation from 'vue-baidu-map/components/controls/Navigation'
    import bmControl from 'vue-baidu-map/components/controls/Control'


    export default {
        name: "buildinglist",
        data() {
            return {
                center: null,
                centerContent: '位置',
                spinShow: false,
                listTotal: 100,
                listPageSize: 10,
                listCurPage: 1,
                listColumns: [
                    {
                        title: '经度',
                        key: 'longi'
                    },
                    {
                        title: '纬度',
                        key: 'lati'
                    },
                    {
                        title: '类型',
                        key: 'jz_type'
                    },
                    {
                        title: '地址',
                        key: 'jz_address'
                    },
                    {
                        title: '数据',
                        key: 'jz_data'
                    },
                    {
                        title: '其他',
                        key: 'other'
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 150,
                        align: 'center',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small'
                                    },
                                    style: {
                                        marginRight: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            this.edit(params.index)
                                        }
                                    }
                                }, '修改'),
                                h('Button', {
                                    props: {
                                        type: 'error',
                                        size: 'small'
                                    },
                                    on: {
                                        click: () => {
                                            this.delete(params.index)
                                        }
                                    }
                                }, '删除')
                            ]);
                        }
                    }
                ],
                listData: [],
            }
        },
        components: {
            breadHeader,
            bmControl,
            baiduMap,
            bmLabel,
            bmMarker,
            bmTraffic,
            bmView,
            bmDriving,
            bmLocalSearch,
            bmNavigation
        },
        created() {
            this.getPageInfo();
            this.getList(this.listCurPage, this.listPageSize);
        },
        methods: {
            pageChangeHandle(page) {
                this.getList(page, this.listPageSize);
            },
            pageSizeChangeHandle(size) {
                this.listPageSize = size;
                // this.getList(this.listCurPage, size);
            },
            edit(idx) {
                //alert(this.listData[idx].id)
                this.$router.push({name: 'buildingForm', query: {id: this.listData[idx].id}});
            },
            delete(idx) {
                // alert(this.listData[idx].id)
                del(this.listData[idx].id).then(res => {
                    if(res.data.data ==1){
                        this.$Modal.success({
                            content:'删除成功'
                        });
                        this.listData.splice(idx, 1);
                    }else {
                        this.$Modal.error({
                            content:'删除失败'
                        });
                    }
                });
            },
            getList(curPage, pageSize) {
                this.spinShow = true;
                getList(curPage, pageSize).then(res => {
                    this.listData = res.data.data;
                    this.spinShow = false;
                    this.changeMapCenter(this.listData[0])
                })
            },
            getPageInfo() {
                getPageInfo(this.listCurPage, this.listPageSize).then(res => {
                    console.log(res.data.data);
                    this.listTotal = parseInt(res.data.data.totalRows);
                });
            },
            closeMap(){
                this.center = null;
                this.$Message.info('点击表格行可以重新开启开启地图');
            },
            changeMapCenter(data) {
                this.center = {
                    lng: data.longi, lat: data.lati
                }
                this.centerContent = '地址: ' + data.jz_address;
                this.$Message.info('地图位置已更新，点击表格行可切换对应的位置');
            }
        }
    }
</script>

<style scoped>
    .page {
        padding-top: 15px;
    }

    .bmap {
        width: 100%;
        height: 200px;
        margin: 10px auto;
    }
</style>