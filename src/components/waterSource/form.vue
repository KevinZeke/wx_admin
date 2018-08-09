<template>

    <div>
        <bread-header :path="['管理','水源','表单']"></bread-header>
        <Spin size="large" fix v-if="spinShow"></Spin>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">

            <FormItem label="id" prop="xfsid">
                <Input v-model="formValidate.xfsid" placeholder="id"></Input>
            </FormItem>

            <FormItem label="经度" prop="longi">
                <Input v-model="formValidate.longi" placeholder="输入经度"></Input>
            </FormItem>

            <FormItem label="纬度" prop="lati">
                <Input v-model="formValidate.lati" placeholder="输入纬度"></Input>
            </FormItem>

            <button class="btn btn-default btn-xs" v-if="!mapShow"
                    @click="mapShow = true">开启地图</button>

            <baidu-map v-if="mapShow && formValidate.lati && formValidate.longi"
                       class="bmap" :center="centerLocate" :zoom="15">
                <bm-navigation anchor="BMAP_ANCHOR_TOP_RIGHT"></bm-navigation>
                <bm-control>
                    <button class="btn btn-default btn-sm" @click="closeMap">关闭地图</button>
                </bm-control>
                <bm-marker
                        :position="centerLocate"
                        :dragging="false"
                        animation="BMAP_ANIMATION_DROP">
                    <bm-label :content="centerContent"
                              :labelStyle="{color: 'red', fontSize : '12px'}"
                              :offset="{width: -20, height: 30}"/>
                </bm-marker>
            </baidu-map>

            <FormItem label="类型" prop="qc_type">
                <Input v-model="formValidate.qc_type" placeholder="输入类型"></Input>
            </FormItem>

            <FormItem label="规格" prop="qc_guige">
                <Input v-model="formValidate.qc_guige" placeholder="输入规格"></Input>
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
    import {getById, insertOne, updateById} from "../../api/water";
    import apiConf from "../../api/api.conf"
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
        data() {
            return {
                spinShow: true,
                isUpdate: false,

                mapShow: true,
                centerContent: '您输入的位置',

                formValidate: {
                    // name: '',

                    xfsid: '',
                    longi: '',
                    lati: '',
                    qc_type: '',
                    qc_guige: '',
                    other: '',

                    // desc: ''
                },
                ruleValidate: {
                    xfsid: [
                        {required: true, message: 'id不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    longi: [
                        {required: true, message: '经度不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    lati: [
                        {required: true, message: '纬度不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    qc_type: [
                        {required: true, message: '类型不能为空', trigger: 'blur'},
                        // { type: 'string', min: 20, message: 'Introduce no less than 20 words', trigger: 'blur' }
                    ],
                    qc_guige: [
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

                        let xfsid = this.formValidate.xfsid,
                            longi = this.formValidate.longi,
                            lati = this.formValidate.lati,
                            qc_type = this.formValidate.qc_type,
                            qc_guige = this.formValidate.qc_guige,
                            other = this.formValidate.other;

                        console.log(xfsid, longi, lati, qc_type, qc_guige, other);

                        if (!this.isUpdate) {
                            insertOne(xfsid, longi, lati, qc_type, qc_guige, other).then(res => {
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
                                xfsid,
                                longi,
                                lati,
                                qc_type,
                                qc_guige,
                                other).then(res => {
                                if (res.data.code != apiConf.errorCode) {
                                    this.$refs[name].resetFields();
                                    this.$Modal.success({
                                        content: '更新成功!',
                                        onOk() {
                                            _this_.$router.push({name: 'waterList'})
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

            closeMap() {
                this.mapShow = false;
                // this.$Message.info('点击表格行可以重新开启开启地图');
            },
            changeMapCenter(data) {
                this.center = {
                    lng: data.longi, lat: data.lati
                }
                this.centerContent = '地址: ' + data.jz_address;
                this.$Message.info('地图位置已更新，点击表格行可切换对应的位置');
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
        }
    }
</script>
<style scoped>
    .bmap {
        width: 100%;
        height: 200px;
        margin: 10px auto;
    }
</style>