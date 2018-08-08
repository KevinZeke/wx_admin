<template>

    <div>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">

            <FormItem label="经度" prop="longi">
                <Input v-model="formValidate.longi" placeholder="输入经度"></Input>
            </FormItem>

            <FormItem label="纬度" prop="lati">
                <Input v-model="formValidate.lati" placeholder="输入纬度"></Input>
            </FormItem>

            <FormItem label="类型" prop="jz_type">
                <Input v-model="formValidate.jz_type" placeholder="输入类型"></Input>
            </FormItem>

            <FormItem label="地址" prop="jz_address">
                <Input v-model="formValidate.jz_address" placeholder="输入类型"></Input>
            </FormItem>

            <FormItem label="数据" prop="jz_data">
                <Input v-model="formValidate.jz_data" placeholder="输入类型"></Input>
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

    export default {
        data() {
            return {
                spinShow: true,
                isUpdate: false,

                formValidate: {

                    longi: '',
                    lati: '',
                    jz_type: '',
                    jz_address: '',
                    jz_data: '',
                    other: '',

                },
                ruleValidate: {

                    longi: [
                        {required: true, message: '经度不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    lati: [
                        {required: true, message: '纬度不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    jz_type: [
                        {required: true, message: '类型不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    jz_address: [
                        {required: true, message: '规格不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    jz_data: [
                        {required: true, message: '规格不能为空', trigger: 'blur'},
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
        methods: {

            initFormIfisUpdate() {
                if (this.$route.query.id) {
                    this.isUpdate = true;
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
        }
    }
</script>