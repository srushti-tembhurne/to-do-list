/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;
/******/
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

jQuery(function($){
    var index = 0;
    var myList=[];
    var App = {
        init : function(){
            this.bindEvents();
        },
        bindEvents : function(){
            $('.add').on('click',this.addToList.bind(this));
            $('.save').on('click',this.saveToDB.bind(this));
            $('.getdata').on('click',this.getData.bind(this));            
        },
        addToList : function(){
            var data = $('#todo').val();
            if(data==''){
                alert("enter value in textbox");
                return false;
            }
            $('.list').append('<li id=\''+(index++)+'\'>'+ data +'</li>');
            myList.push(data);
            $('#todo').val('');     
            $('.wrapper li').on('dblclick',this.removeData.bind(this));
        },
        saveToDB : function(){
            if(myList.length==0){
            alert("Please add atleast one data");
            return false;
            }
            var request = $.ajax({
            url: "http://demo3277623.mockable.io/api/post",
            type: "POST",
            data: JSON.stringify(myList),
            success: function(){
                localStorage.setItem('list', JSON.stringify(myList));
                alert("List is saved successfully");
            }
            });
        },
        getData : function(){
            var request = $.get( "http://demo3277623.mockable.io/api/getdata", function(data,status) {
            var final = JSON.parse(localStorage.getItem('list'));
            var str = '';
            $('.saved-list ul').empty();
            if(final == null){
                alert("Sorry, No data available to display");
            }
            for (i=0;i<final.length; i++) {
            str += '<li id=\''+i+'\'>' + final[i] + '</li>';
            }
            $('.saved-list ul').append(str);
            })
            .fail(function() {
                alert( "error" );
            }); 
        },
        removeData : function(e){
            e.stopImmediatePropagation();
            var self=e.target;
            $(self).fadeOut('slow');
            var indexToRemove = $(self).attr('id');
            myList.splice(indexToRemove,1);
        }
    };
    App.init();
});

/***/ })
/******/ ]);