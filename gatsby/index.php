<html> 
<head> 
<title>The Great Gatsby Text Adventure</title> 

<script language="JavaScript" src="engine.js"></script>
<script language="JavaScript" src="words.js"></script>
<script language="JavaScript" src="places.js"></script> 
<script language="JavaScript" src="characters.js"></script> 
<script language="JavaScript" src="things.js"></script> 
<script language="JavaScript" src="variables.js"></script> 
<link rel="stylesheet" href="css.css">
<script type="text/javascript">
  var _gaq = _gaq || [];
  _gaq.push(['_setAccount', 'UA-592586-1']);
  _gaq.push(['_trackPageview']);

  (function() {
    var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
    ga.src = ('https:' == document.location.protocol ? 'https://ssl' : 'http://www') + '.google-analytics.com/ga.js';
    var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
  })();
</script>

<body>
<table><tr><td>
<div class="gameTitle"></div>
<div class="statusBar"> 
	<div id="placeLabel">Loading... (Or it's broken.)</div> 
	<div id="scoreLabel">0%</div>
	<hr>
</div> 
<noscript>ERROR: You must have JavaScript enabled for this game to play!</noscript>
<div id="outDiv"></div> 
<div class="inDiv"> 
<div id="caret">&gt;&nbsp;</div> 
<textarea cols="80" rows="1" id="textIn" wrapping="virtual" onKeyDown="if(event.keyCode==38) {upKey();} else if(event.keyCode==40) {downKey();}" onKeyPress="if(event.keyCode==13 && this.value!=''){take_command(this.value);this.value='';}" onKeyUp="if(event.keyCode==13){this.value='';}"> 
</textarea> 
</div>

<form name="secretform" method="post" action="index.php">
<input type="hidden" name="secretsavedata" size="1" readonly maxlength="1">
<input type="hidden" name="secretloaddata" size="1" readonly maxlength="1">
</form>
</td>
<td><img src="gatsby.gif"></td>
</tr></table>
</body> 
<script type="text/javascript"> 
start();
</script> 
</html>