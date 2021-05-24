$(function () {
    // 1. 为登录和注册 超链接添加点击事件
    $('#link_reg').on('click', function () {
        // 隐藏 登录 div显示 注册div
        $('.login-box').hide();
        $('.reg-box').show();
    })
    // 点击去登录
    $('#link_login').on('click', function () {
        // 隐藏 登录 div 显示 注册div
        $('.login-box').show();
        $('.reg-box').hide();
    })


// 从laye 获取form对象
// 为layui.form 表单组件添加自定义规则
    layui.form.verify({
        // 密码长度规则
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],

        // 两次密码框输入的是否相同,效验
        repwd: function (value) {
            // 获取 密码框的文本
            let strPWD = $('.reg-box [name=password]').val().trim();
            // 对比两次密码框是否相同
            if (value !== strPWD) {
                return '两次输入不一致哦!!: ('
            }
        }
    })

    // 3. 注册表单, 添加提交事件 -------------------------------------
    $('#form-reg').on('submit', function () {
        // 阻止默认提交行为
        e.preventDefalut();
        // 获取表单数据
        const formData = {
            username: $('#form-reg input[name=username]').val().trim(),
            password: $('#form-reg input[name=password]').val().trim(),
        }
        $.ajax({
            method: 'POST',
            url: '/api/reguser',
            data: formData,
            success: (res) => {
                // c1. 如果注册失败, 则停止执行 , 并提示消息
                if (res.status !== 0) return layui.layer.msg(res.message)
                // c2. 如果注册成功, 提示注册成功
                layui.layer.msg('注册成功,跳转至登录界面', {
                    icon: 6,
                    time: 1000,
                }, () => {
                    // c3 触发 去登录超链接的点击事件, 代替('#link_login').click
                    $('#link_login').trigger('click')
                    // c4 . 清空注册表单数据
                    // 注意: this 是哪的表单提交事件中 this, 也就是事件源表单事件
                    console.log(this)
                    this.reset();
                })
            }
        })
    })
    // 4. 为登录表单 添加提交事件----------------------------------------
    $('#form-login').on('submit', function (e) {
        // 阻止表单提交的默认行为
        e.preventDefault();
        // 获取两个表单的数据
        const formData = {
            username: $('#form-login input[name=username]').val().trim(),
            password: $('#form-login input[name=password]').val().trim(),
        }
        console.log(formData)
        // tihs.serialize();
        // 提交数据到服务器
        $.ajax({
            method: 'POST',
            url: '/api/login',
            data: formData,
            success: (res) => {
                // 登录失败显示提示信息
                if (res.status !== 0) return layui.layer.msg(res.message);
                // c2. 如果登录成功, 跳转至首页
                layui.layer.msg('登录成功, 跳转至首页', {
                    icon: 6,
                    time: 1000,
                }, () => {
                    // c3. 将服务器的登录成功的token保存到本地
                    localStorage.setItem('token', res.token)
                    // c4. 跳转至首页(index.html)
                    window.location.href = 'index.html';
                })
            }
        })
    })
})
