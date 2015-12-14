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

    var $body = $('html, body');

    function Parallax( $wrap, options ) {

        this.$win = $(window);
        this.$wrap = $wrap;
        this.opts = $.extend(true, {}, defaults, options || {});

        this.init();
    };


    /**
     * 初始化
     */
    Parallax.prototype.init = function(){
        var that = this;

        this.$list = $(this.opts.listEl);

        if(!this.$list.length) {
            return;
        }

        this.viewHeight = 0;
        this.pageActive = 0;
        // 方向
        this.direction = null;



        this.uploadHeight();

        this.bind();
    };


    /**
     * 事件
     */
    Parallax.prototype.bind = function() {
        var that = this,
            timer = null;

        this.$win.on('mousewheel.parallax', function(event, delta) {
            console.log(delta);
            //event.preventDefault();
            that.scrollEvent(event);
        });

        this.$win.on('resize.parallax', function(event) {
            timer = setTimeout(function() {
                that.uploadHeight();
            }, 300);
        });
    };

    /**
     * 滚动事件
     */
    Parallax.prototype.scrollEvent = function(event) {
        var that = this;

        this.direction = (event.deltaY >= 1) ? 'up' : 'down';

        console.log(this.direction);

    };

    /**
     * 更新列表高度
     */
    Parallax.prototype.uploadHeight = function() {
        var that = this;

        this.viewHeight = this.$win.height();

        $body
            .css({
                height: this.viewHeight,
                overflow: 'hidden'
            });

        this.$list.css({
            height: this.viewHeight
        })
    };

    $.fn.parallax = function( options ) {
        return this.each(function() {
            new Parallax( $(this), options );
        })
    };
    
    // ADM 
    return Parallax;
}));
