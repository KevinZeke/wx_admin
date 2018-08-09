<template>

    <div>
        <bread-header :path="['管理','人员','表单']"></bread-header>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">

            <FormItem label="id" prop="id">
                <Input v-model="formValidate.id" placeholder="输入id"></Input>
            </FormItem>

            <FormItem label="姓名" prop="name">
                <Input v-model="formValidate.name" placeholder="输入姓名"></Input>
            </FormItem>

            <FormItem label="大队" prop="dd">
                <Input v-model="formValidate.dd" placeholder="输入大队"></Input>
            </FormItem>

            <FormItem label="其他" prop="other">
                <Input v-model="formValidate.other"
                       type="textarea"
                       :autosize="{minRows: 4,maxRows: 5}"
                       placeholder="其他"></Input>
            </FormItem>

            <FormItem>
                <Button type="primary" @click="handleSubmit('formValidate')">
                    {{isUpdate?'更新':'提交'}}
                </Button>
                <Button @click="handleReset('formValidate')" style="margin-left: 8px">重置</Button>
            </FormItem>
        </Form>
    </div>

</template>
<script>
    import {getById, insertOne, updateById} from "../../api/building";
    import apiConf from "../../api/api.conf"
    import breadHeader from '../manage/bread-header'


    export default {
        data() {
            return {
                spinShow: true,
                isUpdate: false,

                // center: null,
                mapShow: true,
                centerContent: '您输入的位置',

                formValidate: {

                    id: '',
                    name: '',
                    dd: '',
                    other: '',

                },
                ruleValidate: {

                    id: [
                        {required: true, message: 'id不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    name: [
                        {required: true, message: '姓名不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    dd: [
                        {required: true, message: '大队不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],

                    other: [
                        {required: false, message: '', trigger: 'blur'}
                    ]
                }
            }
        },
        created() {
            //console.log(this.$route.query);
            // this.testData();
            this.initFormIfisUpdate();
        },
        computed: {
            centerLocate() {
                if (this.formValidate.longi && this.formValidate.lati) {
                    return {
                        lng: this.formValidate.longi, lat: this.formValidate.lati
                    }
                }
                return null;
            }
        },
        methods: {

            initFormIfisUpdate() {
                if (this.$route.query.id) {
                    this.isUpdate = true;

                    return;

                    getById(this.$route.query.id).then(res => {
                        console.log(res);
                        if (res.data.code != apiConf.errorCode && res.data.data.length > 0) {
                            this.formValidate = res.data.data[0];
                        }
                        this.spinShow = false;
                    });
                } else {
                    this.spinShow = false;
                }
            },

            handleSubmit(name) {

                this.$refs[name].validate((valid) => {
                    if (valid) {

                        let longi = this.formValidate.longi,
                            lati = this.formValidate.lati,
                            jz_type = this.formValidate.jz_type,
                            jz_address = this.formValidate.jz_address,
                            jz_data = this.formValidate.jz_data,
                            other = this.formValidate.other;

                        return;


                        if (!this.isUpdate) {
                            insertOne(longi, lati, jz_type, jz_address, jz_data, other).then(res => {
                                if (res.data.code != apiConf.errorCode) {
                                    this.$refs[name].resetFields();
                                    this.$Modal.success({
                                        content: '提交成功!'
                                    });
                                } else {
                                    this.$Message.error(res.data.msg || '提交失败');
                                }

                            })
                        } else {
                            let _this_ = this;
                            updateById(
                                this.$route.query.id,
                                longi, lati, jz_type, jz_address, jz_data, other).then(res => {
                                if (res.data.code != apiConf.errorCode) {
                                    this.$refs[name].resetFields();
                                    this.$Modal.success({
                                        content: '更新成功!',
                                        onOk() {
                                            _this_.$router.push({name: 'buildingList'})
                                        }
                                    });

                                } else {
                                    this.$Message.error(res.data.msg || '更新失败');
                                }

                            })
                        }

                    } else {
                        this.$Message.error('请按照提示填写表单!');
                    }
                })
            },

            handleReset(name) {
                this.$refs[name].resetFields();
            },

            //测试用
            testData() {
                this.formValidate = {
                    // name: '',

                    xfsid: 'XFS_0081921',
                    longi: '119.92459',
                    lati: '32.489451',
                    qc_type: '室内',
                    qc_guige: '33',
                    other: '',

                    // desc: ''
                };
            }
        },
        components: {
            breadHeader
        }
    }
</script>
<style>
    .bmap {
        width: 100%;
        height: 200px;
        margin: 10px auto;
    }
</style>