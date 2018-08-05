<template>
    <div style="position: relative">
        <Spin fix size="large" v-if="spinShow"></Spin>
        <div style="position: absolute;width: 50px;height: 50px;border-radius: 50%;background-color:#2e6da4;z-index: 99;text-align: center;line-height: 50px;right: 0;top: -20px;color: #fff;font-size: 1.1em;cursor: pointer;color: white">
            <router-link :to="{name:'waterForm'}" style="color: white">添加</router-link>
        </div>
        <Table border stripe :columns="listColumns" :data="listData"></Table>
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
    import {getList, getPageInfo, del} from "../../api/water";

    export default {
        name: "list",
        data() {
            return {
                spinShow: false,
                listTotal: 100,
                listPageSize: 10,
                listCurPage: 1,
                listColumns: [
                    {
                        title: 'id',
                        key: 'xfsid',
                        // sortable: true
                    },
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
                        key: 'qc_type'
                    },
                    {
                        title: '规格',
                        key: 'qc_guige'
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
                this.$router.push({name: 'waterForm', query: {id: this.listData[idx].id}});
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
                })
            },
            getPageInfo() {
                getPageInfo(this.listCurPage, this.listPageSize).then(res => {
                    console.log(res.data.data);
                    this.listTotal = parseInt(res.data.data.totalRows);
                });
            }
        }
    }
</script>

<style scoped>
    .page {
        padding-top: 15px;
    }
</style>