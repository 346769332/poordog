<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getScheme()+"://"+request.getServerName()+":"+request.getServerPort()+request.getContextPath()+"/");%>
<!DOCTYPE html>
<html>
	<head>
    	<title>全球眼</title>
    	<base href="${path}">
		<meta http-equiv="pragma" content="no-cache">
		<meta http-equiv="cache-control" content="no-cache">
		<meta http-equiv="expires" content="0">
		<meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
		<meta http-equiv="description" content="Large Screen System">
		<link rel="stylesheet" type="text/css" href="${path}/css/style.css" />
		<link rel="stylesheet" type="text/css" href="${path}/css/font.min.css" />
		<script type="text/javascript" src="${path}/easyui/jquery.min.js"></script>
	</head>
	<body>
		<!-- 弹出信息 -->
		<div class="page_window">
			<div class="window_body">
				<span class="fa fa-close window_close"></span>
				<div class="h_100 w_100">
					<video id="video" width="100%" height="100%" src="" controls="controls"></video>
				</div>
			</div>
		</div>
		<!--地图-->
		<div class="w_100 h_100">
			<div class="video_table">
				<div class="video_cell">
					<div class="video_row">
						<div>
							<img src="${path}/images/v_dlh.png" alt="" />
							<span class="video_play"><i id="v_test" class="fa fa-play-circle-o"></i></span>
							<span class="video_title">德令哈之夜视频</span>
						</div>
						<div>
							<img src="${path}/images/v_dx.png" alt="" />
							<span class="video_play"><i id="v_link" class="fa fa-play-circle-o"></i></span>
							<span class="video_title">中国电信青海分公司视频</span>
						</div>
						<div>
							<img src="${path}/images/v_my.png" alt="" />
							<span class="video_play"><i class="fa fa-play-circle-o"></i></span>
							<span class="video_title">门源花海视频</span>
						</div>
						<div>
							<img src="${path}/images/v_rm.png" alt="" />
							<span class="video_play"><i class="fa fa-play-circle-o"></i></span>
							<span class="video_title">西宁市人民公园视频</span>
						</div>
					</div>
					<div class="video_row mt32">
						<div>
							<img src="${path}/images/v_tes.png" alt="" />
							<span class="video_play"><i class="fa fa-play-circle-o"></i></span>
							<span class="video_title">塔尔寺视频</span>
						</div>
						<div>
							<img src="${path}/images/v_wfj.png" alt="" />
							<span class="video_play"><i class="fa fa-play-circle-o"></i></span>
							<span class="video_title">王府井商业步行街视频</span>
						</div>
						<div>
							<img src="${path}/images/v_xnhcz.png" alt="" />
							<span class="video_play"><i class="fa fa-play-circle-o"></i></span>
							<span class="video_title">西宁火车站视频</span>
						</div>
						<div>
							<img src="${path}/images/v_zxgc.png" alt="" />
							<span class="video_play"><i class="fa fa-play-circle-o"></i></span>
							<span class="video_title">中心广场视频</span>
						</div>
					</div>
				</div>
			</div>
		</div>
		<script type="text/javascript">
			//弹出窗关闭按钮			
			$(".window_close").click(function(){
				$("#video").removeAttr('autoplay',"");
				$("#video").attr('src',"");
				$(".window_body").removeClass("rotate");
				$(".page_window").hide();
			});
			$("i[class='fa fa-play-circle-o']").click(function(){
				var id=$(this).attr('id');
				var videoSrc=id.substring(2);
				if(videoSrc=='test'){
					$(".page_window").show();
					$("#video").attr({'src':"${path}/media/tianyi.mp4",'autoplay':'autoplay'});
					$(".window_body").addClass("rotate");
				}
				if(videoSrc=='link'){
					window.location.href ="LinkMonitor://监控专用链";
				}
			});
		</script>
	</body>
</html>