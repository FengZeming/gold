(function (window) {
    'use strict';
   // basUrl ǰ���/ ��ʾ�ӵ�ַ�ĸ�Ŀ¼��ʼ ���������/�����������ļ��ĵ�ǰ�ļ��п�ʼ����
	 var config = {
        baseUrl: '/amd/js',
        paths: {
            app:'../app',
            //

            jquery: 'jquery/2.1.4/jquery.min'
        }
    };
    window.require.config(config);
})(window);

