<template>
    <div class="order">
        <div class="orderHead">
            <a @click="goStatu"><</a>
            <a>我的订单</a>
            <a class="iconfont icon-xiaoxi"></a>
        </div>
        <div class="orderList">
            <ol class="ols">
                <li v-for="(item,ind) in lists" :key="ind" @click="goevery(item.name)">
                    {{item.title}}
                </li>
            </ol>
            <router-view></router-view>
        </div>
    </div>
</template>
<script>
    export default{
        name:"order",
        data(){
            return{
                lists:[
                    {"name":"all",id:1,'title':"全部",'icons':"icon-fukuan"},
                    {"name":"notmoney",id:2,'title':"待付款",'icons':"icon-fukuan"},
                    {"name":"send",id:3,'title':"待发货",'icons':"icon-fahuo"},
                    {"name":"wait",id:4,'title':"待收货",'icons':"icon-che2"},
                    {"name":"after-sale",id:5,'title':"售后",'icons':"icon-shouhoubaozhang"}
                ]
            }
        },
        methods:{
            goStatu(){
                this.$router.push({
                    name:'myself'
                })
            },
            goevery(name){
                this.$router.push({
                    name:name
                })
            }
        }
    }
</script>
<style>
.ols{
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    border-bottom: .01rem solid #ddd;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.order{
    width: 100%;
    height: 100%;
}
.orderHead{
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: .01px solid #ccc;
}
.orderHead a:nth-child(1){
    padding-left: .1rem;
    font-size: .2rem!important
}
.orderHead a:nth-child(3){
    padding-right: .1rem;
    font-size: .2rem!important
}
.orderList{
    width: 100%;
    height: 100%;
    background:#fff
}
</style>
