window.onload = function () {
    
    var column = {
        "type"  : "table" ,
        "label" : "审批详情" ,
        "name"  : "textarea" ,

        "options" : {
            "primary" : "bh" ,  //根据某列合并 , 合并列必须该属性的值相等
            "equal"   : false   //合并条件: 当前列之前的列是否必须值相同 如果相同 则不合并
        } ,

        "header" : [
            {
                "field" : "bh" ,
                "title" : "编号"
            } ,
            {
                "field" : "spr" ,
                "title" : "审批人"
            } ,
            {
                "field" : "cz" ,
                "title" : "操作"
            } ,
            {
                "field" : "sj" ,
                "title" : "操作时间"
            } ,
            {
                "field" : "ys" ,
                "title" : "用时"
            } ,
            {
                "field" : "spyj" ,
                "title" : "审批意见"
            }
        ] ,
        "data"   : [
            {
                "bh"   : "1" ,
                "spr"  : "王天照" ,
                "cz"   : "查看申请" ,
                "sj"   : "2016" ,
                "ys"   : "3天" ,
                "spyj" : "还行"
            } ,
            {
                "bh"   : "1" ,
                "spr"  : "王天照" ,
                "cz"   : "批准申请" ,
                "sj"   : "2016" ,
                "ys"   : "3天" ,
                "spyj" : "还行"
            } ,
            {
                "bh"   : "2" ,
                "spr"  : "赵敏敏" ,
                "cz"   : "批准申请" ,
                "sj"   : "2016" ,
                "ys"   : "3天" ,
                "spyj" : "还行"
            } ,
            {
                "bh"   : "3" ,
                "spr"  : "张大帅" ,
                "cz"   : "批准申请" ,
                "sj"   : "2016" ,
                "ys"   : "3天" ,
                "spyj" : "还行"
            }
        
        ]
    };

    //获取html元素
    var oTable = document.getElementById ( 'table' );
    var oTheader = document.getElementById ( 'thead' );
    var oTbody = document.getElementById ( 'tbody' );

    //变量
    var parmas = {
        i        : 0  //循环变量
        , colLen : column.header.length    //列总数
    };

    //拼串
    var html = {
        td : [] ,
        tr : []
    };

    //缓存
    var cache = {
        colSort : [] , //列属性缓存
        rowspan : {}   //rowspan 缓存
    }

    var method = {

        /**
         * 创建头部
         */
        createHeader : function () {
            for ( i; i < parmas.colLen; i++ ) {
                html.td.push ( '<th>' + column.header[i].title + '</th>' );
            }
            oTheader.innerHTML = html.td.join ( '' );
            html.td = [];
        }

        /**
         * 创建表数据
         */
        ,
        createTbody : function () {
            var l = column.data.length;
            for ( i = 0; i < l; i++ ) {
                var tr = column.data[i];
                html.td = [];
                for ( var key in tr ) {

                    var rowspan = cache.rowspan[i][key];

                    if ( rowspan > 1 ) {
                        html.td.push ( '<td  rowspan="' + rowspan + '" > ' + tr[key] + '</td>' );
                        continue;
                    }
                    if ( rowspan > 0 ) {
                        html.td.push ( '<td>' + tr[key] + '</td>' );
                        continue;
                    }

                }
                html.tr.push ( '<tr>' + html.td.join ( '' ) + '</tr>' );
            }
            oTbody.innerHTML = html.tr.join ( '' );
            html.tr = [];

        }

        /**
         * 获取行
         * @param index
         * @returns {*}
         */
        ,
        getRow                : function ( index ) {
            return column.data.length ? column.data[index] : {};
        }
        /**
         * 初始化列顺序缓存
         */
        , initCacheForColSort : function () {
            for ( var k in  this.getRow ( 0 ) ) {
                cache.colSort.push ( k );
            }
        }

        /**
         * 初始化 行 rowspan 缓存
         * @param index
         */
        , initCacheForRowspan : function ( index ) {

            /*
             *  只有在每行rowspan缓存没有的时候设置,并设置每列的初始值=1
             */
            if ( !cache.rowspan[index] ) {
                cache.rowspan[index] = {};
                for ( var j = 0 , l = cache.colSort.length; j < l; j++ ) {
                    cache.rowspan[index][cache.colSort[j]] = 1;
                }
            }

        }

        /**
         * 判断当前列之前的列的值是否相同
         * @param nextRow
         * @param currRow
         * @param index
         * @returns {boolean}
         */
        ,
        isEqual          : function ( prevRow , currRow , index ) {
            /*
             *  判断当前列之前的列是否相同
             */
            var check = true;
            for ( var j = 0; j < index; j++ ) {
                var key = [cache.colSort[j]];
                if ( prevRow[key] !== currRow[key] ) {
                    check = false;
                    break;
                }
            }
            return check;
        }
        /**
         * 设置rowspan
         * @param prevIdx
         * @param currIdx
         * @param prevRow
         * @param currRow
         */
        ,
        setRowspans      : function ( prevIdx , currIdx , prevRow , currRow ) {

            /* 1. 设置每行rowspan的缓存初始值
             * 2. 排序后的列倒叙循环
             * 3. 判断是否当前列之前的列必须相同
             * 4. 判断当前行的基准列值是否相同
             * 5. 如果true 当前列 0, 上一列 +1
             * 6. 否则 全部为1
             *
             */

            this.initCacheForRowspan ( prevIdx , prevRow );
            this.initCacheForRowspan ( currIdx , currRow );

            for ( var j = cache.colSort.length - 1; j >= 0; j-- ) {
                var key = cache.colSort[j];
                if ( j >= 0 ) {

                    if ( ( column.options.equal ? this.isEqual ( prevRow , currRow , j ) : true  )
                        && prevRow[column.options.primary] === currRow[column.options.primary]
                        && prevRow[key] === currRow[key] ) {

                        cache.rowspan[prevIdx][key] = cache.rowspan[currIdx][key] + 1;
                        cache.rowspan[currIdx][key] = 0;

                    } else {

                        cache.rowspan[prevIdx][key] = 1;
                        cache.rowspan[currIdx][key] = 1;
                        
                    }
                }
            }
        }
        /**
         * 创建rowspans
         */
        , createRowspans : function () {

            /* 1. 数据倒叙遍历
             * 2. 当前行与上一行做对比
             */

            for ( i = column.data.length - 1; i > 0; i-- ) {
                var currRow = this.getRow ( i );
                var prevRow = this.getRow ( i - 1 );
                this.setRowspans ( i - 1 , i , prevRow , currRow );
            }

        }
        /**
         * 初始化
         */
        , init           : function () {
            this.initCacheForColSort ();
            this.createRowspans ();
            this.createHeader ();
            this.createTbody ();
        }

    };

    method.init ();

}