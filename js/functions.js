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