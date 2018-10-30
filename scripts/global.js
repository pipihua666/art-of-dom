//加载函数
function addLoadEvent(func) {
	var oldLoad = window.onload;
	if(typeof window.onload != 'function')
		window.onload = func;
	else
		{
			window.onload = function () {
				oldLoad();
				func();
			}
		}
}
//将结点加载到另一个结点后面
function insertAfter(newElement,targetElement) {
	var parent = targetElement.parentNode;
	if(parent.lastChild == targetElement)
		parent.appendChild(newElement);
	else
		parent.insertBefore(newElement,targetElement.nextSibling);
}
//为结点添加class属性
function addClass(element,value) {
	if(!element.className)
		element.className=value;
	else{
		var newClassName = element.className;
		newClassName+=" ";
		newClassName+=value;
		element.className = newClassName;
	}
}//-----------------------------------------------index页面突出链接显示函数----------------------------------------
function highLightPage() {
	if(!document.getElementsByTagName) return false;
	var headers = document.getElementsByTagName("header");
	if(headers.length==0) return false;
	var navs = headers[0].getElementsByTagName("nav");
	if(navs.length==0) return false;
	var links = navs[0].getElementsByTagName("a");
	// for(var i=0;i<links.length;i++)  //不知道为什么这里加一个循环
	// {
	// 	var linkUrl;
		for(var i=0;i<links.length;i++)
		{
			var linkUrl;
			linkUrl = links[i].getAttribute("href");
			if(window.location.href.indexOf(linkUrl)!=-1) {
				links[i].className = 'here';
				var linkText = links[i].lastChild.nodeValue.toLowerCase();
				document.body.setAttribute("id", linkText);
			}
		}
	// }
}
//-------------------------------------------------javascript幻灯片------------------------------------------
function moveElement(elementID,final_x,final_y,interval)
{
	if(!document.getElementById) return false;
	if(!document.getElementById(elementID)) return false;
	var elem=document.getElementById(elementID);
	if(elem.movement){
		clearTimeout(elem.movement);
	}
	if(!elem.style.left){
		elem.style.left="0px";
	}
	if(!elem.style.top){
		elem.style.top="0px";
	}
	var xops=parseInt(elem.style.left);
	var yops=parseInt(elem.style.top);
	if(xops==final_x&&yops==final_y)
		return true;
	if(xops<final_x)
	{
		var dist=Math.ceil((final_x-xops)/10);
		xops=xops+dist;
	}
	if(xops>final_x)
	{
		var dist=Math.ceil((xops-final_x)/10);
		xops=xops-dist;
	}
	if(yops>final_y)
	{
		var dist=Math.ceil((yops-final_y)/10);
		yops=yops-dist;
	}
	if(yops<final_y)
	{
		var dist=Math.ceil((final_y-yops)/10);
		yops=yops+dist;
	}
	elem.style.left=xops+"px";
	elem.style.top=yops+"px";
	var repeat = "moveElement('"+elementID+"',"+final_x+","+final_y+","+interval+")";
	elem.movement=setTimeout(repeat,interval);
}
function prepareSlideshow() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	if(!document.getElementById("intro")) return false;
	var intro=document.getElementById("intro");
	var slideShow=document.createElement("div");
	slideShow.style.borderRadius="10px";
	slideShow.setAttribute("id","slideShow");
	var preview=document.createElement("img");
	preview.setAttribute("id","preview");
	preview.setAttribute("src","./images/slideshow.gif");
	preview.setAttribute("alt","this is a slideshow picture");
	var frame=document.createElement("img");
	frame.setAttribute("id","frame");
	frame.setAttribute("alt","this is a frame");
	frame.setAttribute("src","./images/frame.gif");
	slideShow.appendChild(preview);
	slideShow.appendChild(frame);
	insertAfter(slideShow,intro);
	var links=document.getElementsByTagName("a");
	var destination;
	for(var i=0;i<links.length;i++){
		links[i].onmouseover=function () {
			destination=this.getAttribute("href");
			if(destination.indexOf("index.html")!=-1)
				moveElement("preview",0,0,5);
			 if(destination.indexOf("about.html")!=-1)
				moveElement("preview",-150,0,5);
			if(destination.indexOf("photos.html")!=-1)
				moveElement("preview",-300,0,5);
			if(destination.indexOf("live.html")!=-1)
				moveElement("preview",-450,0,5);
			if(destination.indexOf("contact.html")!=-1)
				moveElement("preview",-600,0,5);
		}
	}
}
//-----------------------------------------------显示内部链接的section-------------------------------
function showSection(id) {
	if(!document.getElementsByTagName) return false;
	var sections=document.getElementsByTagName("section");
	for(var i=0;i<sections.length;i++) {
		if (sections[i].getAttribute("id")!=id) {
			sections[i].style.display = "none";
		}
		else {
			sections[i].style.display = "block";
		}
	}
}
function prepareInternalNav() {
	if(!document.getElementsByTagName) return false;
	if(!document.getElementById) return false;
	var articles=document.getElementsByTagName("article");
		if(articles.length==0) return false;
	var navs=articles[0].getElementsByTagName("nav");
		if(navs.length==0) return false;
	var links=navs[0].getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		var sectionID=links[i].getAttribute("href").split("#")[1];
		if(!document.getElementById(sectionID)) continue;
		document.getElementById(sectionID).style.display="none";
		links[i].destination=sectionID;
		links[i].onclick=function () {
			showSection(this.destination);
			return false;
		}
	}
}
//js图片库
function preparePlaceholer() {
	if(!document.getElementById) return false;
	if(!document.createTextNode) return false;
	if(!document.createElement) return false;
	if(!document.getElementById("imagegallery")) return false;
	var placeholder = document.createElement("img");
	placeholder.setAttribute("id", "placeholder");
	placeholder.setAttribute("alt", "my images gallery");
	placeholder.setAttribute("src","./images/logo.gif");
	var destination=document.createElement("p");
	destination.setAttribute("id","destination");
	var destText=document.createTextNode("choose the picture");
	destination.appendChild(destText);
	var gallery=document.getElementById("imagegallery");
	insertAfter(destination,gallery);
	insertAfter(placeholder,destination);
}
function prepareGallery() {
	if(!document.getElementById("imagegallery")) return false;
	if(!document.getElementsByTagName) return false;
	var gallery=document.getElementById("imagegallery");
	var links=gallery.getElementsByTagName("a");
	for(var i=0;i<links.length;i++){
		links[i].onclick=function () {
			return showPic(this);
		}
	}
}
function showPic(whichpic) {
	if(!document.getElementById("placeholder")) return true;
	var source=whichpic.getAttribute("href");
	var placeholder=document.getElementById("placeholder");
	placeholder.setAttribute("src",source);
	if(!document.getElementById("destination")) return true;
	if(whichpic.getAttribute("title"))
		var text=whichpic.getAttribute("title");
	else
		var text="";
	var destination=document.getElementById("destination");
	if(destination.lastChild.nodeType==3) {
		destination.firstChild.nodeValue = text;
	}
	return false;//返回false的原因是阻止onclick默认行为
}
/*----------------------------------------增强表格----------------------------------------*/
// 给奇数行添加“odd”class属性,为奇数行添加样式
function stripeTables() {
	if(!document.getElementsByTagName) return false;
	var tables=document.getElementsByTagName("table");
	if(tables.length==0) return false;
	for(var i=0;i<tables.length;i++){
		var odd=false;
		var rows=document.getElementsByTagName("tr");
		for(var j=0;j<rows.length;j++){
			if(odd==true){
				addClass(rows[j],"odd");
				odd=false;
			}
			else{
				odd=true;
			}
		}
	}
}
// 给用户鼠标停留时添加“highlight”类，鼠标离开时恢复原来类的名字，为鼠标悬浮添加样式
function highLightRows() {
	if(!document.getElementsByTagName) return false;
	var rows=document.getElementsByTagName("tr");
	for(var i=0;i<rows.length;i++){
		rows[i].oldClassName=rows[i].className;
		rows[i].onmouseover=function () {
			addClass(this,"highlight");
		}
		rows[i].onmouseout=function () {
			this.className=this.oldClassName;
		}
	}
}
//创建自定义列表的信息（注意for( in )的用法）
function displayAbbreviations() {
	if(!document.getElementsByTagName||!document.createElement||!document.createTextNode)	return false;
	var abbreviations=document.getElementsByTagName("abbr");
	if(abbreviations.length<1)	return false;
	var defs=new Array();
	for(var i=0;i<abbreviations.length;i++){
		var current_abbr=abbreviations[i];
		if(current_abbr.childNodes.length<1)	continue;
		var defination=current_abbr.getAttribute("title");
		var key=current_abbr.lastChild.nodeValue;
		defs[key]=defination;
	}
	//创建自定义列表dl
	var dlist=document.createElement("dl");
	for(key in defs){
		var defination=defs[key];
		var dtitle=document.createElement("dt");
		var dtitle_text=document.createTextNode(key);
		dtitle.appendChild(dtitle_text);
		var ddesc=document.createElement("dd");
		var ddesc_text=document.createTextNode(defination);
		ddesc.appendChild(ddesc_text);
		dlist.appendChild(dtitle);
		dlist.appendChild(ddesc);
	}
	if(dlist.childNodes.length<1)	return false;
	var header=document.createElement("h3");
	var header_text=document.createTextNode("Abbreviations");
	header.appendChild(header_text);
	var articles=document.getElementsByTagName("article");
	if(articles.length==0)	return false;
	articles[0].appendChild(header);
	articles[0].appendChild(dlist);
}
/*---------------------------增强表单--------------------------------*/
//点击label标签让相应的id获得焦点
function focusLabels() {
	if(!document.getElementsByTagName) return false;
	var labels=document.getElementsByTagName("label");
	for(var i=0;i<labels.length;i++){
		if(!labels[i].getAttribute("for"))	continue;
		labels[i].onclick=function () {
			var id=this.getAttribute("for");
			if(!document.getElementById(id))	return false;
			var element=document.getElementById(id);
			element.focus();

		}
	}
}
//占位符值（实现获得焦点时value默认值消失，离开焦点如果input的值为空重新获得placeholder值）
function resetFields(whichForm) {
	// if(Modernizr.input.placeholder)	return;
	for(var i=0;i<whichForm.elements.length;i++){
		var element=whichForm.elements[i];
		if(element.type=="submit")	continue;
		var check=element.placeholder||element.getAttribute("placeholder");//检查有没有placeholder
		if(!check) continue;
		element.onfocus=function () {
			var text = this.placeholder || this.getAttribute("placeholder");
			if (this.value == text) {
				this.className = "";
				this.value = '';
			}
		}
			element.onblur=function () {
				if(this.value==''){
					this.className=="placeholder";
					this.value=this.placeholder||this.getAttribute("placeholder");
				}
			}
			element.onblur();//以便在必要时应用占位符的值
		}
}
//遍历每一个表单执行resetFields函数  ---------------（关键执行函数，上下面的表单函数都是prepareForms调用）
function prepareForms() {
	for(var i=0;i<document.forms.length;i++){
		var thisform=document.forms[i];
		resetFields(thisform);
		thisform.onsubmit=function () {
			 if(!validateFrom) return false;
			var articles=document.getElementsByTagName("article")[0];
			if(submitFormWithAjax(this,articles)) return false;
				return true;
		}
	}
}
/*------------------------验证表单----------------------------*/
//验证表单是否为空
function isFilled(field) {
	if(field.value.replace(" ",'').length==0) return false;//replace将值得空格去掉
	var placeholder=field.placeholder||field.getAttribute(placeholder);
	return (placeholder!=field.value);
}
//验证邮箱
function isEmail(field) {
	return (field.value.indexOf("@")!=-1&&field.value.indexOf(".")!=-1);
}
//提醒表单未填
function validateFrom(whichFrom) {
	for(var i=0;i<whichFrom.elements.length;i++){
		var element=whichFrom.elements[i];
		if(element.request=="request"){
			if(!isFilled(element)){
				alert("fill in the "+element.name+" "+"field.");
				return false;
			}
		}
		if(element.type=="email"){
			if(!isEmail(element)){
				alert("fill in the "+element.name+" field");
				return false;
			}
		}
	}
	return true;
}
/*--------------------------Ajax提交表单-------------------------------*/
//获得一个XMLHTTPObject对象
function getHTTPObject() {
	if(typeof XMLHttpRequest=="undefined"){
		XMLHttpRequest=function () {
			try{return new ActiveXObject("MSXML2.XMLHTTP.6.0");}
			catch (e){}
			try{return new ActiveXObject("MSXML2.XMLHTTP.3.0");}
			catch (e){}
			try{return new ActiveXObject("MSXML2.XMLHTTP");}
			catch (e){}
			return false;
		}
	}
	return new XMLHttpRequest();
}
//添加一个加载的图片到清空了的element下
function displayAjaxLoading(element) {
	while(element.hasChildNodes()){
		element.removeChild(element.lastChild);
	}
	var content=document.createElement("img");
	content.setAttribute("src","./images/loading.gif");
	content.setAttribute("alt","loading... ");
	// console.log(element);
	element.appendChild(content);
}
function submitFormWithAjax(whichForm,thetarget) {
	var request=getHTTPObject();
	if(!request) return false;
	displayAjaxLoading(thetarget);
	var dataParts=[];//定义请求URL后的查询字符串数组（定义数组的另一种方法）
	var element;
	for(var i=0;i<whichForm.elements.length;i++){
		element=whichForm.elements[i];
		dataParts[i]=element.name+"="+encodeURIComponent(element.value);//收集名字和编码后的值(encode函数把值编码成URL安全的字符串)
	}
	var data=dataParts.join("&");//‘&’分隔
	request.onreadystatechange= function  () {
		if (request.readyState == 4) {
			if (request.status ==200 ||request.status ==0) {
				var matches = request.responseText.match(/<article>([\s\S]+)<\/article>/);
				if (matches.length > 0) {
					thetarget.innerHTML = matches[1];
				}else{
					thetarget.innerHTML = "<p>oops,there was an error,sorry</p>";
				}
			}else{
				thetarget.innerHTML = '<p>'+request.statusText+'</p>';
				// console.log("status error");
			}
		}
	}
	request.open("post",whichForm.getAttribute("action"),true);
	request.setRequestHeader('Content-type','application/x-www-form-urlencoded');
	request.send(data);
	// console.log("成功了");
	return true;
}
//----------------------------加载函数--------------------------------
addLoadEvent(highLightPage);
addLoadEvent(prepareSlideshow);
addLoadEvent(prepareInternalNav);
addLoadEvent(preparePlaceholer);
addLoadEvent(prepareGallery);
addLoadEvent(stripeTables);
addLoadEvent(highLightRows);
addLoadEvent(displayAbbreviations);
addLoadEvent(prepareForms);