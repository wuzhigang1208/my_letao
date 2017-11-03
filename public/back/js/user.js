/**
 * Created by lenovo on 2017/11/3.
 */

$(function(){

    //发送ajax请求，获取后台的数据
    var currentPage = 1;
    var pageSize = 8;
    //去后台拿数据拿的是currentPage的数据
    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page:currentPage,
                pageSize:pageSize
            },
            success:function(data){
                // console.log(data);

                var html = template("tpl",data);

                //第一个html是方法，第二个html是变量
                $("tbody").html(html);

                //分页功能
                $("#paginator").bootstrapPaginator({
                    bootstrapMajorVersion:3,//指定版本
                    currentPage:currentPage,//指定当前页数
                    size:"small",
                    totalPages: Math.ceil(data.total/pageSize),
                    onPageClicked:function(event, originalEvent, type,page){
                        //为按钮绑定点击事件 page:当前点击的按钮值
                        // console.log(page);
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    }
    render();

    //点击禁用或启用按钮，弹出模态框
    //这里的按钮都是动态渲染出来的，所以需要委托事件
    $("tbody").on("click",".btn",function(){
        // console.log("hehe");
        $("#userModal").modal("show");
        var id = $(this).parent().data("id");
        var isDelete = $(this).parent().data("isDelete");
        // console.log(id);
        // console.log(isDelete);
        isDelete = isDelete === 1 ? 0 : 1;
        //点击确定按钮，需要禁用或者启用这个按钮
        $(".btn_confirm").on("click", function(){
            // console.log("hhh");
            //发送ajax请求
            $.ajax({
                type:"post",
                url:"/user/updateUser",
                data:{
                    id:id,
                    isDelete:isDelete,
                },
                success:function(data){
                    // console.log(data);
                    if(data.success){
                        //关闭模态框
                        $("#userModal").modal("hide");
                        render();
                    }
                }
            })
        })
    });

});