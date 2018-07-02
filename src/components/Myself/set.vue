<template>
    <div class="box">
        <header>
            <a @click="goback">
                <</a>
                    <a>设置</a>
                    <a></a>
        </header>
        <div class="setMess">
            <ul>
                <li>
                    <span>我的头像</span>
                    <img :src="url" alt="">
                    <input type="file" class="file" @change="fileupload">
                </li>
                <li>
                    <span>用户名</span>
                    <span>></span>
                </li>
                <li>
                    <span>我的二维码名片</span>
                    <span>></span>
                </li>
            </ul>
            <button @click="exitLogin">退出登录</button>
        </div>
        <Toast ref="alertL"></Toast>
    </div>
</template>
<script>
import { delCookie, getCookie } from "../../utils/utils.js"
export default {
    name: 'set',
    data(){
        return{
            url:"../../../static/images/head.jpg"
        }
    },
   
    methods: {
        fileupload(e) {
            let fd = new FormData();
            fd.append("images", e.target.files[0])
            console.log(fd)
            this.$http.post("/api/upload",fd).then(res => {
                console.log(res)
                this.url = res.url
            })
        },
        goback() {
            this.$router.push({
                name: "myself"
            })
        },
        exitLogin() {
            if (confirm("您确定退出吗？")) {
                delCookie('token')
                this.$refs.alertL.active("您已退出")
                setTimeout(() => {
                    this.$router.push({
                        name: 'home'
                    })
                }, 2000)
            }
        }
    }
}
</script>
<style>
header a:nth-child(1) {
    padding-left: .1rem;
    font-size: .2rem
}

header a:nth-child(2) {
    text-align: center
}

header a {
    display: inline-block;
    width: 32%;
    line-height: .4rem;
}

.setMess,
.setMess ul {
    width: 100%;
    margin-top: .05rem;
}

.setMess ul {
    background: #fff
}

.setMess ul li {
    width: 90%;
    margin-left: 5%;
    padding: .1rem 0;
    border-bottom: .01px solid #ccc;
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: relative;
    overflow: hidden;
}

.file {
    width: 20%;
    position: absolute;
    right: 0;
    z-index: 1;
    opacity: 0;
}

.setMess ul li img {
    width: 15%;
    height: 15%;
    border-radius: 50%
}

.setMess ul li span:nth-child(2) {
    font-size: .2rem!important
}

.setMess button {
    width: 80%;
    margin-left: 10%;
    line-height: .4rem;
    background: red;
    color: #fff;
    border-radius: .2rem;
    border: .01rem solid red;
    outline: 0;
    margin-top: 20%;
}
</style>
