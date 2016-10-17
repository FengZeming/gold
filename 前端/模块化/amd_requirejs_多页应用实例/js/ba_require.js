(function (window) {
    'use strict';
    var config = {
        // basUrl 前面加/ 表示从地址的根目录开始 ，如果不加/则从引用入口文件的当前文件夹开始查找
        //文件定义不能用中- 否则会找不到
        baseUrl: '/amd/js',
        paths: {
            app: '../app',
            //

            jquery: 'jquery/2.1.4/jquery.min',
            dialog: 'mod/mod_init'
        }
    };
    window.require.config(config);
})(window);

