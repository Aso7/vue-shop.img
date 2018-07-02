<template>
  <div class="order-all">
        <div class="every">
            <h2>
                <span>小鱼的店</span>
                <span>状态</span>
            </h2>
            <dl>
                <dt><img src="../../../static/images/may.gif" alt=""></dt>
                <dd>
                    <p>哈哈哈哈哈哈哈哈啊哈哈哈哈哈哈哈哈啊哈哈哈</p>
                    <p>
                        <span>￥109</span>
                        <span>*</span>
                    </p>
                </dd>
            </dl>
            <div class="sumList">
                <p>合计:￥<span>888</span></p>
                <p><button>提醒卖家发货</button><button>申请退款</button></p>
            </div>
        </div>
  </div>   
</template>
<script>
    export default{
        name:"all"
    }
</script>
<style>
.sumList{
    width: 100%;
    text-align: right;
    padding-right: .1rem
}
.sumList p{
    line-height: .3rem;
}
.sumList p button{
    margin-left: .1rem;
    background: 0;
    outline: 0;
    border: .01rem solid #ccc;
    padding: .02rem .07rem;
}
.order-all{
    width: 100%;
    height: 100%;
}
.every{
    width: 100%;
}
.every h2{
    width: 100%;
    height: .4rem;
    line-height: .4rem;
    font-weight: normal;
    border-bottom: .01rem solid #ddd;
    display: flex;
    justify-content: space-between;
}
.every h2 span:nth-child(1){
    padding-left: .1rem;
}
.every h2 span:nth-child(2){
    padding-right: .1rem;
}
.every h2 span:nth-child(2){
    font-size: .12rem!important;
    color:red
}
.every dl{
    width: 100%;
    border-bottom: .01px solid #ddd;
    padding: .1rem;
    display: flex;
    justify-content: space-between;
}
.every dl dt{
    width: 30%;
    border: .01rem solid #ddd
}
.every dl dt img{
    width: 100%;
}
.every dl dd{
    width: 67%;
    margin-left: 3%;
}
.every dl dd p{
    display: flex;
    justify-content: space-between;
    align-items: center;
}
</style>
