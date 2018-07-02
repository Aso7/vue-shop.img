<template>
    <div class="address">
        <div class="addHead">
            <a @click="goMyself"><</a>
            <a>收货地址</a>
            <a></a>
        </div>
        <div class="nohave" v-show="data.length==0"></div>
        <div class="addPro">
            <div class="everyPro" v-for="(item,ind) in data" :key="ind" >
                <h6>{{item.name}} {{item.phone}}</h6>
                <p>{{item.province}}{{item.city}}{{item.area}}{{item.street}}</p>
                <p>
                    <span><b class="iconfont icon-check"></b>&nbsp;&nbsp;默认地址</span>
                    <span>
                        <button @click="editor(item)">编辑</button>
                        <button @click="editfn(item,ind)">删除</button>
                    </span>
                </p>
            </div>
        </div>
        <button class="addBtn" @click="goNewAdd">新增地址</button>
        <Toast ref="edit"></Toast>
    </div>
</template>
<script>
import { getCookie } from "../../utils/utils.js"
    export default{
        name:"address",
        data(){
            return{
                data:[]
            }
        },
        created(){
            this.$http.post("/api/addlist",{token:getCookie('token')}).then(res=>{
                console.log(res.data)
                this.data = res.data
            })
        },
        methods:{
            goNewAdd(){
                this.$router.push({
                    name:'newAdd'
                })
            },
            goMyself(){
                this.$router.push({
                    name:'myself'
                })
            },
            editor(data){
                //console.log(data)
                this.$router.push({
                    name:'newAdd',
                    query:{
                        type:'edit',
                        name:data.name,
                        phone:data.phone,
                        province: encodeURI(data.province) ,
                        city:encodeURI(data.city),
                        area:encodeURI(data.area),
                        street:encodeURI(data.street)
                    }
                })
            },
            editfn(item,ind){
                this.$http.post('/api/add/editadd', {
                    token: getCookie('token'),
                    data:item,
                    id:ind
                }).then((res) => {
                    this.$refs.edit.active(res.msg)
                    
                })
            }
        }
    }
</script>
<style>
.address{
    width: 100%;
    height: 100%;
    background:#fff;
}
.addHead{
    width: 90%;
    line-height: .4rem;
    margin-left: 5%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    background:#fff
}
.addHead a{
    font-size: .15rem
}
.addPro{
    width: 100%;
    height: auto;
    border-top: .01rem solid #eee;
    background:#eee;
}
.everyPro{
    width: 100%;
    margin-bottom: .05rem;
    padding: .05rem .15rem .05rem .15rem;
    border-bottom: .01rem solid #eee;
    background:#fff
}
.everyPro h6{
    line-height: .3rem;
    font-weight: normal;
    font-size: .15rem
}
.everyPro p{
    font-size: .12rem;
    line-height: .3rem;
}
.everyPro p:nth-child(3){
    border-top: .01rem solid #eee;
    line-height: .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
}
.everyPro p:nth-child(3) button{
    background:0;
    border: 0;
    outline: 0;
    margin-right: .1rem;
}
.everyPro p:nth-child(3) span:nth-child(1){
    font-size: .15rem;
}
.addBtn{
    margin-left: 15%;
    margin-top: .3rem;
    width: 70%;
    line-height: .4rem;
    background:red;
    color: #FFF;
    border-radius: .2rem;
    outline: 0;
    border: 0
}
</style>
