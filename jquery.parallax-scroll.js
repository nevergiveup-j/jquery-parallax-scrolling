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

    /**
     * 工具库
     * @type {Object}
     */
    var Util = {
        elementStyle: document.createElement('div').style,
        // 判断浏览器内核类型
        vendor: function() {
            var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
                transform,
                i = 0,
                l = vendors.length;

            for ( ; i < l; i++ ) {
                transform = vendors[i] + 'ransform';
                if ( transform in Util.elementStyle ) {
                    return vendors[i].substr(0, vendors[i].length-1);
                }
            }

            return false;
        },
        // 判断浏览器来适配css属性值
        prefixStyle: function(style) {
            if ( Util.vendor() === false ) return false;
            if ( Util.vendor() === '' ) return style;

            return Util.vendor() + style.charAt(0).toUpperCase() + style.substr(1);
        },
        // 判断是否支持css transform-3d（需要测试下面属性支持）
        hasPerspective: function(){
            var ret = Util.prefixStyle('perspective') in Util.elementStyle;
            if ( ret && 'webkitPerspective' in Util.elementStyle ) {
                Util.injectStyles('@media (transform-3d),(-webkit-transform-3d){#modernizr{left:9px;position:absolute;height:3px;}}', function( node, rule ) {
                    ret = node.offsetLeft === 9 && node.offsetHeight === 3;
                });
            }
            return !!ret;
        },
        translateZ: function(){
            if(Util.hasPerspective){
                return ' translateZ(0)';
            }else{
                return '';
            }
        }
    }

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
        // 当前页
        this.pageActive = 0;
        // 方向
        this.direction = null;
        // 是否切换页面
        this.isSwitchPage = false;

        this.$wrap
            .css('position', 'relative')
            .css(Util.prefixStyle('transform'), 'translate(0, 0)');

        this.uploadHeight();

        this.bind();
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

    /**
     * 事件
     */
    Parallax.prototype.bind = function() {
        var that = this,
            timer = null;

        this.$win.on('mousewheel.parallax', function(event, delta) {
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

        setTimeout(function(){
            that.togglePage();
        }, 300)

    };

    /**
     * 滚动事件
     */
    Parallax.prototype.togglePage = function() {
        var that = this;

        if(this.isSwitchPage){
            return;
        }

        that.isSwitchPage = true;

        if(this.direction == 'up'){
            this.pageActive--;
        }else{
            this.pageActive++;
        }

        var deltaY = -(this.pageActive * this.viewHeight) + 'px';

        console.log(deltaY);

        this.$wrap
            .css(Util.prefixStyle('transition'), 'all .3s')
            .css(Util.prefixStyle('transform'), 'translate(0, '+ deltaY +')');

    };

    $.fn.parallax = function( options ) {
        return this.each(function() {
            new Parallax( $(this), options );
        })
    };
    
    // ADM 
    return Parallax;
}));
