// 注意：每次调用 $.get() 或 $.post() 或 $.ajax() 的时候，
// 会先调用 ajaxPrefilter 这个函数
// 在这个函数中，可以拿到我们给Ajax提供的配置对象
$.ajaxPrefilter(function(opt){
    // 1. 同意为rul添加基地址
    opt.url = 'http://api-breakingnews-web.itheima.net'+opt.url;
})