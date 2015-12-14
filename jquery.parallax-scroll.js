/**
 * @Description: 下拉到底部和上拉到顶部再拉就出现刷新效果
 * @Author: wangjun
 * @Update: 2015-10-29 13:27
 * @version: 1.1
 * @Github URL: https://github.com/nevergiveup-j/zepto-refresh
 */
 
;(function (factory) {
    if (typeof define === "function" && define.amd) {
        // AMD模式
        define([ "jQuery" ], factory);
    } else {
        // 全局模式
        factory(jQuery);
    }
}(function ($) {
    "use strict";

    // 分享默认配置
    var defaults = {
        // 列表元素
        listEl: '.parallax-list',
        // 刷新回调
        refreshCallback: function() {

        },
        // 加载更多回调
        loadingMoreCallback: function() {

        }  
    };

    var viewHeight = $(window).height();


    function Parallax( $this, options ) {

        this.$scroll = $this;
        this.opts = $.extend(true, {}, defaults, options || {});

        this.init();
    };


    /**
     * 初始化
     */
    Parallax.prototype.init = function(){
        this.bind();
    };


    /**
     * 事件
     */
    Parallax.prototype.bind = function() {
        var that = this,
            timer = null;

        this.$wrap.on('scroll', function() {
            timer = setTimeout(function() {
                that.getLoadMore( that.$wrap );
            }, 300);
        });
    };

    $.fn.parallax = function( options ) {
        return this.each(function() {
            new Parallax( $(this), options );
        })
    };
    
    // ADM 
    return Parallax;
}));
