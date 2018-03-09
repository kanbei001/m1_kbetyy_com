document.writeln("<style>");
document.writeln(".order-screen{width:100%;height:100%;background:rgba(0,0,0,0.3);position:fixed;top:0px;left:0px;display:none;z-index:1000}");
document.writeln(".order{border-radius: 5px;overflow: hidden;  -webkit-box-shadow: 3px 3px 3px;  -moz-box-shadow:0 0 10px 2px rgba(0,0,0,0.3);  box-shadow:0 0 10px 2px rgba(0,0,0,0.3); position:absolute;top:50%;left:50%;margin-top:-255px;margin-left:-200px;}");
document.writeln(".order-header{line-height:40px;padding:15px 0px;color:#fff;font-size:30px;font-weight:bold;text-align:center;background:#04a9f9;}");
document.writeln(".order-header p{font-size:14px;font-weight:normal;line-height:1.15em;}");
document.writeln(".order-close-btn{display: inline-block;width:30px;height:30px;line-height:24px;color:#04a9f9;font-size:40px;border-radius: 100%;cursor:pointer;background:#fff;position:absolute;top:3px;right:3px;}");
document.writeln(".order-content{padding:30px;background:#fff;}");
document.writeln(".order-from{width:340px;height:auto;}");
document.writeln(".order-from .input-group{width:100%;margin:15px 0px;}");
document.writeln(".order-from .input-group label{display:inline-block;width:70px;height:40px;line-height:40px;padding-right: 10px;color:#333;}");
document.writeln(".order-from .input-group select{width:250px;border:1px solid #ccc;background:#fff;height:42px;border-radius: 5px;outline: none;padding-left:6px;}");
document.writeln(".order-from .input-group select:focus{border:1px solid #0899e0;}");
document.writeln(".order-from .input-group input[type=\'text\']{padding-left:10px;width:240px;border:1px solid #ccc;background:#fff;height:40px;line-height:40px;border-radius: 5px;outline: none;}");
document.writeln(".order-from .input-group input[name=\'gh_date\']{padding-left:10px;width:240px;border:1px solid #ccc;background:#fff;height:40px;line-height:40px;border-radius: 5px;outline: none;}");
document.writeln(".order-from .submit{margin:30px 4px 0;text-align:right;}");
document.writeln(".order-from #gh_submit, .order-from #gh_reset{display: inline-block;padding:10px 30px;background:#aaa;border-radius: 5px;color:#fff;border:0px;outline: none;cursor: pointer;}");
document.writeln(".order-from #gh_submit{margin-left:19px; background:#f60;}");
document.writeln(".order-Explain{width:360px; padding-top:20px;}");
document.writeln(".order-Explain b{height:30px;line-height: 30px;color:#ff5400;}");
document.writeln(".order-Explain p{line-height:20px;color:#333333;}");
document.writeln("<div class=\'order\'>");
document.writeln("</style>");
document.writeln("<div class='order-screen'>");
document.writeln("<div class='order'>");
document.writeln("		<div class=\'order-header\'><p>深圳康贝儿童医院</p>在线快速挂号平台</div>");
document.writeln("		<span class=\'order-close-btn\' onclick=\'hide_order()\'>×</span>");
document.writeln("		<div class=\'order-content\'>");
document.writeln("			<div class=\'order-from\'>");
document.writeln("			  <form>");
document.writeln("				<div class=\'input-group\'>");
document.writeln("					<label for=\'\'>挂号科室：</label>");
document.writeln("					<select name=\'gh_offices\' class=\'keshi\'>");
document.writeln("						<option value=\'0\'>——请选择预约科室——</option>");
document.writeln("					</select>");
document.writeln("				</div>");
document.writeln("				<div class=\'input-group\'>");
document.writeln("					<label for=\'\'>联系电话：</label>");
document.writeln("					<input type=\'text\' name=\'gh_tel\' id=\'\'>");
document.writeln("				</div>");
document.writeln("				<div class=\'input-group\'>");
document.writeln("					<label for=\'\'>挂号姓名：</label>");
document.writeln("					<input type=\'text\' name=\'gh_name\' id=\'\'>");
document.writeln("				</div>");
document.writeln("				<div class=\'input-group\'>");
document.writeln("					<label for=\'\'>预约时间：</label>");
document.writeln("					<input type=\'text\' name=\'gh_date\' id=\'\' placeholder=\'如2017-1-1\' onfocus=\'WdatePicker({dateFmt:\"yyyy-MM-dd\"})\'>");
document.writeln("				</div>");
document.writeln("				<div class=\'submit\'><input type=\'reset\' id=\'gh_reset\' value=\'重新填写\'/><div onclick=\'post_order()\' id=\'gh_submit\'>提交挂号</div></div>");
document.writeln("			  </form>");
document.writeln("			  <div class=\'order-Explain\'>");
document.writeln("				  <p><b>温馨提醒：</b>预约成功后您将收到一条挂号短信，请您凭此短信按时到院就诊！其他问题请拨打：0755-25111120。</p>");
document.writeln("			  </div>");
document.writeln("			</div>");
document.writeln("		</div>");
document.writeln("	</div>");
document.writeln("</div>");
document.writeln("<script type=\'text/javascript\' src=\'/templets/kangbei/js/DatePicker/WdatePicker.js\'><\/script>");

$(document).ready(function(){
    //科室列表
    url = "/plus/API.php";
    postData = {k:2};
    $.post(url, postData, function(result) {
        var str = JSON.parse(result);
        for(var i in str) {
            if(str[i] == 0) {
                break;
            }
            $(".keshi").append(
                 "<option value='"+str[i]["section_name"]+"'>"+str[i]["section_name"]+"</option>"
            );
        }
    });
});
function show_order(){
	$('.order-screen').fadeIn();
}
function hide_order(){
	$('.order-screen').fadeOut();
}
function post_order(){
	var gh_name = $("input[name='gh_name']");//姓名
	//var gh_sex = $("input[name='gh_sex']");//性别
	//var gh_age = $("input[name='gh_age']");//年龄
	var gh_tel = $("input[name='gh_tel']");//电话
	//var gh_qq = $("input[name='gh_qq']");//QQ
	var gh_date = $("input[name='gh_date']");//时间
	var gh_offices = $('select[name="gh_offices"] option:selected');//科室
	var gh_des = $("textarea[name='gh_des']");//描述
	//var gh_code = $("input[name='gh_code']");
	//var gh_fromurl = window.location.href;//来源
    var tel_re = /^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|17[0-9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/;
	if(gh_name.length>0 &&gh_name.val() ==""){
		showMsg('姓名不能为空！',2000);
		gh_name.focus();
		return false;
	}
	if(gh_tel.length>0 &&gh_tel.val() ==""){
		showMsg('联系电话不能为空！',2000);
		gh_tel.focus();
		return false;
	}
	if(!tel_re.test(gh_tel.val())) {
    showMsg('联系电话格式不正确，请输入11位手机号码！',2000);
    gh_tel.focus();
		return false;
    }
	if(gh_offices.length>0 &&gh_offices.val() =="0"){
		showMsg('请选择科室！',2000);
    gh_offices.focus();
		return false;
	}
	if(gh_date.length>0 &&gh_date.val() ==""  ){
		showMsg('请选择您的预约时间！',2000);
    gh_date.focus();
		return false;
	}
  var data = new Array();
  var weburl = window.location.href;
  var sourceUrl = weburl.split("//")[1];
  data["sourceUrl"] = sourceUrl;
  data["k"] = 1;
  data["name"] = gh_name.val();
  data["phone"] = gh_tel.val();
  data["keshi"] = gh_offices.val();
  data["time"]  = gh_date.val();
  data["bingzheng"] = gh_des.val();
  var jsondata = {name:data["name"],phone:data["phone"],keshi:data["keshi"],time:data['time'],bingzheng:data["bingzheng"],k:data["k"],sourceUrl:data["sourceUrl"]};
  url = '/plus/API.php';
  $.post(url,jsondata, function(result) {
    try {
      var result = JSON.parse(result);
    } catch(error) {
        　　
    } 
      if(result.status==1) {
        showMsg("预约成功！我们将会在30分钟内联系您。");
        $('.order-screen').fadeOut(300);
      }else{
        if(result.error_det) {
            showMsg(result.error_det);
        }else{
           showMsg("提交失败，请拨打电话0755-25111120进行预约。");
        }
      }
  });
}
/*消息提示框，用来代替alert*/
/*data参数为提示内容，必需*/
/*time参数为显示时间，到时间后自动消失，可选*/
function showMsg(data, time){
  var msg = data ? data : "";
  var msg_style = '<style class="msg_style msg_remove">.msg{display:none; background:#fff; position:fixed; top:35%; left:50%; width:280px; margin-left:-140px; text-align:center; border-radius:5px; color:#555; box-shadow:0 0 10px 2px rgba(0,0,0,0.5); z-index:1100;} .msg .close{position:absolute; top:0; right:0; width:30px; height:30px; line-height:30px; font-size:26px; font-weight:bold; background:rgba(0,0,0,0.1); cursor:pointer;} .msg h3{border-bottom:1px solid #ccc; margin:0 10px; padding:10px 0;} .msg p{margin:15px;}</style>';
  var msg_html = '<div class="msg msg_remove"><div class="close">×</div><h3>温馨提示</h3><p>'+msg+'</p></div>';
  var msg_script = '<script class="msg_script msg_remove">$(".msg .close").click(function(){$(".msg").fadeOut(300);setTimeout(function(){$(".msg_remove").remove()},1000)})<\/script>';
  $("body").append(msg_style+msg_html+msg_script);
  $(".msg").fadeIn(300);
  var htime_script = time ? '<script class="htime_script msg_remove">setTimeout(function(){$(".msg").fadeOut(300)},'+time+');setTimeout(function(){$(".msg_remove").remove()},'+(time+300)+')<\/script>' : '';
  $("body").append(htime_script);
}
