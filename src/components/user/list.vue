<template>
    <div style="position: relative">
        <bread-header :path="['管理','人员管理']"></bread-header>
        <Form ref="formValidate" class="text-right" inline>
            <FormItem>
                <Input v-model="nameSelected" placeholder="输入姓名"></Input>
            </FormItem>

            <Select class="text-left" placeholder="选择大队" v-model="ddSelected" style="width:200px">
                <Option v-for="item in ddList" :value="item" :key="item">
                    {{ item }}
                </Option>
            </Select>

            <FormItem>
                <Button type="primary">搜索</Button>
            </FormItem>
        </Form>
        <div style="position: absolute;width: 50px;height: 50px;border-radius: 50%;background-color:#2e6da4;z-index: 99;text-align: center;line-height: 50px;right: 0;color: #fff;font-size: 1.1em;cursor: pointer;color: white">
            <router-link :to="{name:'userForm'}" style="color: white">添加</router-link>
        </div>
        <Table border stripe
               :loading="spinShow"
               :columns="listColumns" :data="listDataFilter"></Table>
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


    export default {
        name: "buildinglist",
        data() {
            return {

                ddSelected: '',
                nameSelected: '',
                ddList: [
                    '全部',
                    'force 1',
                    'force 2',
                    'force 3',
                    'force 4',
                    'force 5',
                    'force 6',
                    'force 7',
                ],
                spinShow: false,
                listTotal: 100,
                listPageSize: 10,
                listCurPage: 1,
                listColumns: [
                    {
                        title: 'id',
                        key: 'id'
                    },
                    {
                        title: '姓名',
                        key: 'name'
                    },
                    {
                        title: '所属',
                        key: 'dd'
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
                listData: [
                    {id: 1001, name: '赵', dd: 'force 1'},
                    {id: 1002, name: '赵', dd: 'force 1'},
                    {id: 1003, name: '赵', dd: 'force 1'},
                    {id: 1004, name: '赵', dd: 'force 1'},
                    {id: 1005, name: '赵', dd: 'force 1'},
                    {id: 1006, name: '钱', dd: 'force 2'},
                    {id: 1007, name: '钱', dd: 'force 2'},
                    {id: 1008, name: '钱', dd: 'force 2'},
                    {id: 1009, name: '孙', dd: 'force 3'},
                    {id: 1024, name: '李', dd: 'force 4'},
                    {id: 1034, name: '李', dd: 'force 4'},
                    {id: 1055, name: '周', dd: 'force 5'},
                    {id: 1065, name: '周', dd: 'force 5'},
                    {id: 1005, name: '周', dd: 'force 5'},
                    {id: 1025, name: '周', dd: 'force 5'},
                    {id: 1066, name: '吴', dd: 'force 6'},
                    {id: 1006, name: '吴', dd: 'force 6'},
                    {id: 1026, name: '吴', dd: 'force 6'},
                    {id: 1056, name: '吴', dd: 'force 6'},
                    {id: 1066, name: '吴', dd: 'force 6'},
                    {id: 1026, name: '吴', dd: 'force 6'},
                ],

                formValidate: {},
                ruleValidate: {}
            }
        },
        components: {
            breadHeader
        },
        created() {
            this.getPageInfo();
            // this.getList(this.listCurPage, this.listPageSize);
        },
        computed: {
            listDataFilter() {
                if (this.ddSelected || this.nameSelected) {
                    return this.listData.filter(item => {
                        if (this.ddSelected && this.nameSelected) {
                            return (item.name == this.nameSelected) && (this.ddSelected == '全部' || item.dd == this.ddSelected)
                        } else if (this.ddSelected) {
                            if (this.ddSelected == '全部') return true;
                            return item.dd == this.ddSelected;
                        } else {
                            return item.name == this.nameSelected;
                        }
                    })
                }
                return this.listData;
            }
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
                //this.$router.push({name: 'buildingForm', query: {id: this.listData[idx].id}});
            },
            delete(idx) {
                // alert(this.listData[idx].id)

                // del(this.listData[idx].id).then(res => {
                //     if (res.data.data == 1) {
                //         this.$Modal.success({
                //             content: '删除成功'
                //         });
                //         this.listData.splice(idx, 1);
                //     } else {
                //         this.$Modal.error({
                //             content: '删除失败'
                //         });
                //     }
                // });
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
            }
        }
    }
</script>

<style scoped>
    .page {
        padding-top: 15px;
    }

</style>