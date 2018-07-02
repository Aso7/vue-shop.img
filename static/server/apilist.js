const fs = require("fs")
const path = require("path")
const jwt = require("jsonwebtoken")
const root = path.resolve(__dirname)
const multer = require("multer")
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, path.resolve(__dirname + "/upload"))
    },
    filename: function (req, file, cb) {
        let n = file.originalname.split('.')
        cb(null, n[0] + '-' + Date.now() + '.' + n[1])
    }
})
const upload = multer({ storage: storage })
//定义接口

module.exports = function (app) {
    const goodsPath = path.resolve(__dirname + "/goodslist")
    app.get("/api/index/recommend.action", (req, res, next) => {
        console.log(req.query)
        if (req.query > 5) {
            res.json({
                code: 1000,
                msg: "没有更多数据了"
            })
            next()
        } else {
            let list = fs.readFileSync(goodsPath + `/list${req.query.page}.json`, "utf-8")
            setTimeout(() => {
                res.json(list)
            }, 2000)
        }

    })

    //分类接口
    const queryApi = require("./queryApi")
    app.get("/api/classify", (req, res) => {
        //console.log(req.query)
        queryApi(`/index.php?ctl=goods_class&act=ajaxGetClassList&cid=${req.query.cid}`).then(data => {
            res.end(data)
            return
        })
    })

    //登录接口
    app.post("/api/user/login", (req, res) => {
        console.log(req.headers)
        console.log(req.body)
        let userpath = path.resolve(__dirname + '/user')
        let userlist = JSON.parse(fs.readFileSync(userpath + "/userlist.json", 'utf-8'))
        let flag = false
        userlist.forEach(item => {
            if (item.user == req.body.user && item.pwd == req.body.pwd) {
                flag = true
            }
        })
        if (flag) {
            let token = jwt.sign(req.body, '1122', { expiresIn: 60 * 60 })
            console.log(token)
            res.json({
                msg: 'success',
                code: 1,
                token
            })
        } else {
            res.json({
                msg: '用户名或者密码错误',
                code: 0
            })
        }

    })

    //注册接口
    app.post('/api/user/register', (req, res) => {
        console.log(req.body)
        let userpath = path.resolve(__dirname + '/user')
        let userlist = JSON.parse(fs.readFileSync(userpath + '/userlist.json', 'utf-8'))
        console.log(userlist)
        if (userlist.some(element => {
            return element.user == req.body.user
        })) {
            res.json({
                msg: 'failed',
                imfo: '该用户存在',
                code: 1
            })
        }
        userlist.push(req.body)
        fs.writeFile(userpath + '/userlist.json', JSON.stringify(userlist), function (err) {
            console.log(err)
            if (err) {
                res.json({
                    msg: 'err',
                    code: 0
                })
            } else {
                res.json({
                    msg: 'success',
                    code: 1
                })
            }
        })

    })

    //购物车商品列表
    app.post("/api/goodslist", (req, res) => {
        //console.log(req.body)
        jwt.verify(req.body.token, '1122', function (err, decoded) {
            console.log(err)
            if (err) {
                res.json({
                    msg: err,
                    code: 0
                })
            } else {
                console.log(decoded)
                let goods = JSON.parse(fs.readFileSync(__dirname + "/cartlist/cartlist.json", 'utf-8'))
                console.log(goods)
                res.json({
                    msg: 'success',
                    code: 1,
                    data: goods[decoded.user] || []
                })
            }
        }),
            res.json({
                msg: 'success',
                code: 1
            })
    })

    //添加购物车
    app.post("/api/addcart", (req, res) => {
        console.log(req.body)
        if (!req.body.token) {
            res.status(304)
            res.json({
                msg: "参数错误,token缺失",
                code: 2
            })
            return
        }
        jwt.verify(req.body.token, '1122', (err, decoded) => {
            if (err) {
                res.json({
                    msg: "登录超时，重新登录",
                    code: 0
                })
            } else {
                let cartpath = __dirname + "/cartlist/cartlist.json"
                let cartlist = JSON.parse(fs.readFileSync(cartpath, 'utf-8'))
                if (cartlist[decoded.user]) {
                    let flag = false
                    cartlist[decoded.user].forEach((item, index) => {
                        if (item.wname == req.body.data.wname) {
                            ++item.count
                            flag = true
                        }
                    })
                    if (!flag) {
                        let o = {
                            ...req.body.data,
                            count: 1
                        }
                        cartlist[decoded.user].push(o)
                    }
                } else {
                    cartlist[decoded.user] = [{ count: 1, ...req.body.data }]
                }
                fs.writeFile(cartpath, JSON.stringify(cartlist), (err) => {
                    if (err) {
                        res.json({
                            msg: "写入错误",
                            code: 0
                        })
                    } else {
                        res.json({
                            msg: "添加成功",
                            code: 1
                        })
                    }
                })
            }
        })
    })

    //修改购物车数量
    app.post("/api/cart/count", (req, res) => {
        if (!req.body.token) {
            res.status(304)
            res.json({
                msg: "参数错误,token缺失",
                code: 2
            })
            return
        }
        jwt.verify(req.body.token, '1122', (err, decoded) => {
            if (err) {
                res.json({
                    msg: "登录超时，重新登录",
                    code: 0
                })
            } else {
                let cartpath = __dirname + "/cartlist/cartlist.json"
                let cartlist = JSON.parse(fs.readFileSync(cartpath, 'utf-8'))
                let goodslist = cartlist[decoded.user]

                goodslist = goodslist.map((item, index) => {
                    if (item.wname == req.body.itemname) {
                        item.count = req.body.count
                    }
                    return item
                })
                cartlist[decoded.user] = goodslist
                fs.writeFile(cartpath, JSON.stringify(cartlist), (err) => {
                    if (err) {
                        res.json({
                            msg: "写入错误",
                            code: 0
                        })
                    } else {
                        res.json({
                            msg: "修改成功",
                            code: 1
                        })
                    }
                })
            }
        })
    })

    //删除购物车 
    app.post("/api/cart/dele", (req, res) => {
        console.log(req.body)
        let { delArr } = req.body
        console.log(delArr)
        let cartlist = JSON.parse(fs.readFileSync(path.join(__dirname, "cartlist", "cartlist.json")))
        let cart = []
        cart.push(cartlist)
        jwt.verify(req.body.token, '1122', (err, decoded) => {
            if (err) {
                res.json({
                    msg: "登录失败，重新登录",
                    code: 0
                })
            } else {
                let newData = []
                cart.forEach((val, ind) => {
                    if (val[decoded.user]) {
                        val[decoded.user].forEach((value, index) => {
                            if (delArr.indexOf(value.wareId) === -1) {
                                newData.push(value)
                            }
                        })
                        val[decoded.user] = newData
                    }
                })
                fs.writeFile(path.join(__dirname, "cartlist", "cartlist.json"), JSON.stringify(cartlist), (err) => {
                    if (err) {
                        res.json({
                            msg: err,
                            code: 0
                        })
                    } else {
                        res.json({
                            msg: "删除成功",
                            code: 1
                        })
                    }

                })
            }
        })
    })

    //添加地址
    app.post("/api/newAdd", (req, res) => {
        //console.log(req.body.data)
        let addlist = JSON.parse(fs.readFileSync(path.resolve(__dirname, "newadd/add.json"), "utf-8"))
        //console.log(addlist)
        jwt.verify(req.body.token, "1122", (err, decoded) => {
            if (err) {
                res.json({
                    code: 0,
                    msg: "登录超时,请重新登录"
                })
            } else {
                if (addlist[decoded.user]) {
                    addlist[decoded.user].push(req.body.data)
                } else {
                    addlist[decoded.user] = [req.body.data]
                }
                fs.writeFile(path.resolve(__dirname, "newadd/add.json"), JSON.stringify(addlist), function (error) {
                    if (error) {
                        res.json({
                            code: 0,
                            msg: '服务器报错,请重新尝试',
                            data: error
                        })
                    } else {
                        res.json({
                            code: 1,
                            msg: "添加成功"
                        })
                    }
                })
            }
        })
    })

    //地址列表
    app.post("/api/addlist", (req, res) => {
        let addlist = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'newadd/add.json'), "utf-8"))
        jwt.verify(req.body.token, "1122", (err, decoded) => {
            if (err) {
                res.json({
                    code: 0,
                    msg: "登录超时,请重新登录"
                })
            } else {
                res.json({
                    code: 1,
                    msg: '请求成功',
                    data: addlist[decoded.user]
                })
            }
        })
    })

    //删除地址
    app.post("/api/add/editadd", (req, res) => {
        //console.log(req.body.id)
        let addlist = JSON.parse(fs.readFileSync(path.join(__dirname, "newadd", "add.json")))
        let arr = []
        arr.push(addlist)
        //console.log(arr)
        jwt.verify(req.body.token, '1122', (err, decoded) => {
            if (err) {
                res.json({
                    msg: "登录失败，重新登录",
                    code: 0
                })
            } else {
                let newlist = []
                arr.forEach((value, index) => {
                    //console.log(value)
                    if (value[decoded.user]) {
                        value[decoded.user].forEach((val, ind) => {
                            if (req.body.id != ind) {
                                newlist.push(val)
                            }
                        })
                        value[decoded.user] = newlist
                    }
                })
                fs.writeFile(path.join(__dirname, "newadd", "add.json"), JSON.stringify(addlist), (err) => {
                    if (err) {
                        res.json({
                            msg: err,
                            code: 0
                        })
                    } else {
                        res.json({
                            msg: "删除成功",
                            code: 1
                        })
                    }

                })
            }
        })
    })

    //上传头像
    app.post("/api/upload", upload.single('images'), (req, res) => {
        console.log(req.file)
        res.json({
            code: 1,
            msg: 'success',
            url:"http://localhost:3000/server/upload/"+req.file.filename
        })
    })
}





//websockt  轮询  这是解决更新重复