<template>
  <div class="statu">
    <ul>
        <li v-for="(item,index) in lists" :key="index"  @click="goOrder(id)">
            <b class="iconfont" :class="item.icons"></b>
            <span>{{item.title}}</span>
        </li>
    </ul>
  </div>
</template>
<script>
    export default{
        name:'statu',
        data(){
            return{
                lists:[
                    {id:1,'title':"待付款",'icons':"icon-fukuan"},
                    {id:2,'title':"待发货",'icons':"icon-fahuo"},
                    {id:3,'title':"待收货",'icons':"icon-che2"},
                    {id:4,'title':"售后",'icons':"icon-shouhoubaozhang"},
                    {id:5,'title':"我的订单",'icons':"icon-dingdan"}
                ]
            }
        },
        methods:{
            goOrder(){
                this.$router.push({
                    name:'order'
                })
            }
        }
    }
</script>
<style>
.statu{
    width: 100%;
}
.statu ul{
    width: 100%;
    background: #fff;
    display: flex;
    justify-content: space-around;
    align-items: center;
}
.statu ul li{
    flex:1;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: .1rem 0;
}
.statu ul li:last-child{
    border-left: .01rem solid #ddd
}
.statu ul li b{
    font-size: .2rem
}
.statu ul li span{
    font-size: .12rem
}
</style>
