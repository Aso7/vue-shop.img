<template>
    <div class="newAdd">
        <div class="newAddhead">
            <a @click="goAddress"><</a>
            <a>收货人</a>
            <a></a>
        </div>
        <div class="message">
            <input type="text" placeholder="收货人姓名" v-model="name">
            <input type="text" placeholder="手机号" v-model="phone">
            <div class="select-area">
                <multiselect @select="provChange" v-model="province" label="name" :options="provlist" placeholder="请选择省份"></multiselect>
                <multiselect @select="cityChange" v-model="city" label="name" :options="citylist" placeholder="请选择城市"></multiselect>
                <multiselect v-model="area" :options="arealist" placeholder="请选择地区"></multiselect>
            </div>
            <input type="text" placeholder="详细地址" v-model="street">
            <b>
                <i class="iconfont icon-duoxuan"></i>设为默认地址</b>
            <button @click="saveMsg">保存</button>
        </div>
        <Toast ref="alertFn"></Toast>
    </div>
</template>
<script>
import Multiselect from "vue-multiselect"
import "vue-multiselect/dist/vue-multiselect.min.css"
import { anotherInstance } from "../../utils/request.js"
import { getCookie } from "../../utils/utils.js"
export default {
    name: 'newAdd',
    data() {
        return {
            name: '',
            phone: '',
            street: '',
            province: '',
            city: '',
            area: '',
            provlist: [],
            citylist: [],
            arealist: []
        }
    },
    created() {
        console.log(decodeURI(this.$route.query))
        let { type, name, phone, province, city, area, street } = this.$route.query
        if (type == 'edit') {
            this.name = name,
            this.phone = phone,
            this.province = { name: decodeURI(province) },
            this.city = { name: decodeURI(city) },
            this.area = decodeURI(area),
            this.street = decodeURI(street)
        }
        anotherInstance.get('../../../static/server/pcrdata/pcr.json').then(res => {
            // console.log(res.data)
            this.provlist = res.data
        })
    },
    methods: {
        goAddress() {
            this.$router.push({
                name: 'address'
            })
        },
        provChange(a) {
            this.citylist = a.city
            this.city = ''
            this.area = ''
        },
        cityChange(a) {
            this.arealist = a.area
            this.area = ''
        },
        saveMsg() {
            let data = {
                province: this.province.name,
                city: this.city.name,
                area: this.area,
                street: this.street,
                name: this.name,
                phone: this.phone,
            }
            if (!data.province || !data.city || !data.name || !data.phone || !data.area || !data.street) {
                this.$refs.alertFn.active("输入省市区信息")
                return
            }
            if (!/^1[3578]\d{9}$/.test(data.phone)) {
                this.$refs.alertFn.active("请确认手机号")
                return
            }
            this.$http.post("/api/newAdd", {
                token: getCookie('token'),
                data
            }).then(res => {
                // console.log(res)
                if (res.code == 1) {
                    this.$refs.alertFn.active(res.msg)
                    setTimeout(() => {
                        this.$router.push({
                            name: "address"
                        })
                    }, 1000)
                }
                if (res.code == 0) {
                    this.$refs.alertFn.active(res.msg)
                    setTimeout(() => {
                        this.$router.replace({
                            name: "login",
                            query: {
                                from: 'newAdd'
                            }
                        })
                    }, 1000)
                }
            })
        }
    },
    components: {
        Multiselect
    }
}
</script>
<style>
.select-area {
    width: 90%;
    margin-left: 5%;
    margin-top: .1rem;
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap
}

.select-area .multiselect {
    line-height: .2rem;
    border: .01rem solid #eee;
    border-radius: 0;
}

.multiselect:nth-child(1),
.multiselect:nth-child(2) {
    width: 48%;
    margin-bottom: .1rem;
}

.select-area .multiselect span {
    font-size: .14rem!important;
    color: #999;
}

.newAdd {
    width: 100%;
    height: 100%;
    background: #eee;
    overflow-Y: hidden;
}

.newAddhead {
    width: 100%;
    line-height: .4rem;
    padding: 0 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background: #fff
}

.newAddhead a {
    font-size: .15rem
}

.message {
    width: 100%;
    height: 100%;
    position: relative;
}

.message input {
    width: 90%;
    margin-left: 5%;
    margin-top: .1rem;
    line-height: .3rem;
    padding-left: .1rem;
    outline: 0;
    border: 0;
}

.message b {
    margin-left: 5%;
    line-height: .4rem
}

.message button {
    width: 70%;
    line-height: .4rem;
    position: absolute;
    left: 15%;
    bottom: 20%;
    background: red;
    border-radius: .2rem;
    color: #FFF;
    outline: 0;
    border: 0
}
</style>
