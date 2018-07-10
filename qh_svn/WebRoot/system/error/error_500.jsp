<%@ page language="java" pageEncoding="utf-8"%>
<% request.setAttribute("path",request.getContextPath());%>
<!DOCTYPE html>
<html>
  <head>
    <title>500-服务器内部错误</title>	
    <meta http-equiv="keywords" content="keyword1,keyword2,keyword3">
    <meta http-equiv="description" content="this is my page">
    <meta http-equiv="content-type" content="text/html; charset=UTF-8">
    <link rel="stylesheet" type="text/css" href="${path}/css/error.css"/>
  </head>
  <body> 
	<center>
	    <div class="text-area rotate">
		    <p class="error">Error 500</p>
		    <p class="details">There was a problem<br /><br />An internal error occurred on the server.</p> 
	    </div>
	</center>
  </body>
</html>