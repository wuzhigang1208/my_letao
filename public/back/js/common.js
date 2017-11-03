/**
 * Created by lenovo on 2017/11/1.
 */

//希望在ajax调用之前start
//在ajax调用结束后执行down

//校验用户是否登录的功能
//路径中，并没有login.html
if(location.href.indexOf("login.html") < 0){
    $.ajax({
        type:"get",
        url:"/employee/checkRootLogin",
        success:function(data){
           // console.log(data);
            if(data.error === 400){
                //说明用户没有登录，跳转到登录页面
                location.href = "login.html";
            }
        }
    });
}


$(document).ajaxStart(function(){
    // 让进度条显示出来
    NProgress.start();
})

$(document).ajaxStop(function(){
    //让进度条结束
    setTimeout(function(){
        NProgress.done();
    },500);
});


//点击分类管理，显示或隐藏二级分类
$(".child").prev().on("click",function(){
    // console.log("heh");
    $(this).next().slideToggle();
})

//点击icon_menu，隐藏或显示侧边栏
$(".icon_menu").on("click",function(){
    // console.log("hahah");
    // 让侧边栏慢慢的出去
    $(".lt_aside").toggleClass("now");
    //让从侧边栏慢慢的边长
    $(".lt_main").toggleClass("now");
});

//公用的退出功能
$(".icon_logout").on("click", function(){
    // console.log("heheheh");
    $("#logoutModal").modal("show");
});

$(".btn_logout").on("click", function(){
    // console.log("hahahah");

    //发送ajax请求，告诉服务器我要退出了，服务器会清空你的session
    $.ajax({
        type:"get",
        url:"/employee/employeeLogout",
        success:function(data){
            // console.log(data);
            if(data.success){
                window.location.href = "login.html";
            }
        }
    })
});