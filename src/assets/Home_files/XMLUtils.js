var gbNav6=false;var gbNav61=false;var gbNav4=false;var gbIE4=false;var gbIE=false;var gbIE5=false;var gbIE55=false;var gAgent=navigator.userAgent.toLowerCase();var gbMac=(gAgent.indexOf("mac")!=-1);var gbSunOS=(gAgent.indexOf("sunos")!=-1);var gbOpera=(gAgent.indexOf("opera")!=-1);var HH_DISPLAY_TOPIC=0;var HH_DISPLAY_TOC=1;var HH_DISPLAY_INDEX=2;var HH_DISPLAY_SEARCH=3;var HH_HELP_CONTEXT=15;var gVersion=navigator.appVersion.toLowerCase();var gnVerMajor=parseInt(gVersion);var gnVerMinor=parseFloat(gVersion);gbIE=(navigator.appName.indexOf("Microsoft")!=-1);if(gnVerMajor>=4)
{if(navigator.appName=="Netscape")
{gbNav4=true;if(gnVerMajor>=5)
gbNav6=true;}
gbIE4=(navigator.appName.indexOf("Microsoft")!=-1);}
if(gbNav6)
{document.gnPageWidth=innerWidth;document.gnPageHeight=innerHeight;var nPos=gAgent.indexOf("netscape");if(nPos!=-1)
{var nVersion=parseFloat(gAgent.substring(nPos+10));if(nVersion>=6.1)
gbNav61=true;}}else if(gbIE4)
{var nPos=gAgent.indexOf("msie");if(nPos!=-1)
{var nVersion=parseFloat(gAgent.substring(nPos+5));if(nVersion>=5)
gbIE5=true;if(nVersion>=5.5)
gbIE55=true;}}
function RH_ShowHelp(hParent,a_pszHelpFile,uCommand,dwData)
{var strHelpPath=a_pszHelpFile;var strWnd="";var nPos=a_pszHelpFile.indexOf(">");if(nPos!=-1)
{strHelpPath=a_pszHelpFile.substring(0,nPos);strWnd=a_pszHelpFile.substring(nPos+1);}
if(isServerBased(strHelpPath))
RH_ShowWebHelp_Server(hParent,strHelpPath,strWnd,uCommand,dwData);else
RH_ShowWebHelp(hParent,strHelpPath,strWnd,uCommand,dwData);}
function RH_ShowWebHelp_Server(hParent,strHelpPath,strWnd,uCommand,dwData)
{ShowWebHelp_Server(strHelpPath,strWnd,uCommand,dwData);}
function RH_ShowWebHelp(hParent,strHelpPath,strWnd,uCommand,dwData)
{ShowWebHelp(strHelpPath,strWnd,uCommand,dwData);}
function ShowWebHelp_Server(strHelpPath,strWnd,uCommand,nMapId)
{var a_pszHelpFile="";if(uCommand==HH_HELP_CONTEXT)
{if(strHelpPath.indexOf("?")==-1)
a_pszHelpFile=strHelpPath+"?ctxid="+nMapId;else
a_pszHelpFile=strHelpPath+"&ctxid="+nMapId;}
else
{if(strHelpPath.indexOf("?")==-1)
a_pszHelpFile=strHelpPath+"?ctxid=0";else
a_pszHelpFile=strHelpPath+"&ctxid=0";}
if(strWnd)
a_pszHelpFile+=">"+strWnd;if(gbIE4)
{a_pszHelpFile+="&cmd=newwnd&rtype=iefrm";loadData(a_pszHelpFile);}
else if(gbNav4)
{a_pszHelpFile+="&cmd=newwnd&rtype=nswnd";var sParam="left="+screen.width+",top="+screen.height+",width=100,height=100";window.open(a_pszHelpFile,"__webCshStub",sParam);}
else
{var sParam="left="+screen.width+",top="+screen.height+",width=100,height=100";if(gbIE5)
window.open("about:blank","__webCshStub",sParam);window.open(a_pszHelpFile,"__webCshStub");}}
function ShowWebHelp(strHelpPath,strWnd,uCommand,nMapId)
{var a_pszHelpFile="";if(uCommand==HH_DISPLAY_TOPIC)
{a_pszHelpFile=strHelpPath+"#<id=0";}
if(uCommand==HH_HELP_CONTEXT)
{a_pszHelpFile=strHelpPath+"#<id="+nMapId;}
else if(uCommand==HH_DISPLAY_INDEX)
{a_pszHelpFile=strHelpPath+"#<cmd=idx";}
else if(uCommand==HH_DISPLAY_SEARCH)
{a_pszHelpFile=strHelpPath+"#<cmd=fts";}
else if(uCommand==HH_DISPLAY_TOC)
{a_pszHelpFile=strHelpPath+"#<cmd=toc";}
if(strWnd)
a_pszHelpFile+=">>wnd="+strWnd;if(a_pszHelpFile)
{var xMax=screen.width,yMax=screen.height;var x=900;var y=600;var xOffset=xMax-x-100,yOffset=yMax-y-100;window.open(a_pszHelpFile,"__webCshStub",'width='+x+',height='+y+',screenX='+xOffset+',screenY='+yOffset+',top='+yOffset+',left='+xOffset+'');}}
function isServerBased(a_pszHelpFile)
{if(a_pszHelpFile.length>0)
{var nPos=a_pszHelpFile.lastIndexOf('.');if(nPos!=-1&&a_pszHelpFile.length>=nPos+4)
{var sExt=a_pszHelpFile.substring(nPos,nPos+4);if(sExt.toLowerCase()==".htm")
{return false;}}}
return true;}
function getElement(sID)
{if(document.getElementById)
return document.getElementById(sID);else if(document.all)
return document.all(sID);return null;}
function loadData(sFileName)
{if(!getElement("dataDiv"))
{if(!insertDataDiv())
{gsFileName=sFileName;return;}}
var sHTML="";if(gbMac)
sHTML+="<iframe name=\"__WebHelpCshStub\" src=\""+sFileName+"\"></iframe>";else
sHTML+="<iframe name=\"__WebHelpCshStub\" style=\"visibility:hidden;width:0;height:0\" src=\""+sFileName+"\"></iframe>";var oDivCon=getElement("dataDiv");if(oDivCon)
{if(gbNav6)
{if(oDivCon.getElementsByTagName&&oDivCon.getElementsByTagName("iFrame").length>0)
{oDivCon.getElementsByTagName("iFrame")[0].src=sFileName;}
else
oDivCon.innerHTML=sHTML;}
else
oDivCon.innerHTML=sHTML;}}
function insertDataDiv()
{var sHTML="";if(gbMac)
sHTML+="<div id=dataDiv style=\"display:none;\"></div>";else
sHTML+="<div id=dataDiv style=\"visibility:hidden\"></div>";document.body.insertAdjacentHTML("beforeEnd",sHTML);return true;}
function DownloadURL(url){var w=window.open("downloadurl.aspx?url="+escape(url),"download",config="height=300,width=450,scrollbars=0");}
function EncodeElementForXML(s){var str
str=s;regexpr=/&/g;str=str.replace(regexpr,"&amp;");regexpr=/>/g;str=str.replace(regexpr,"&gt;");regexpr=/</g;return str.replace(regexpr,"&lt;");}
function EncodeAttrForXML(s){var str
str=s;regexpr=/&/g;str=str.replace(regexpr,"&amp;");regexpr=/"/g;str=str.replace(regexpr,"&quot;");regexpr=/'/g;str=str.replace(regexpr,"&apos;");regexpr=/>/g;str=str.replace(regexpr,"&gt;");regexpr=/</g;return str.replace(regexpr,"&lt;");}
function isValidEmail(field){var goodEmail=field.value.match(/^([\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01FFa-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01FFa-zA-Z0-9\-]+\.)+))([\u00C0-\u00D6\u00D8-\u00F6\u00F8-\u01FFa-zA-Z]{2,200}|[0-9]{1,3})(\]?)$/gi);if(goodEmail){return true;}
alert('The email address that you have entered is not valid. Please correct this value before you proceed.');field.focus();return false;}
function isEmpty(field,strMsg){for(i=0;i<field.value.length;i++){var strTemp=field.value.charCodeAt(i);if(strTemp!=32&&strTemp!=9){return false;}}
if(strMsg.length>0){if(typeof(field.selectedIndex)!='undefined'){alert(strMsg+' is a required field. Please select an available '+strMsg+'.');}else{alert(strMsg+' is a required field. Please enter a valid '+strMsg+'.');}
field.focus();}
return true;}
function isSafeString(field,strMsg){for(i=0;i<field.value.length;i++){var strTemp=field.value.charCodeAt(i);if(strTemp<32||strTemp>127){alert(strMsg+' may only contain characters from A - Z and certain punctuation such as periods and apostrophes.  Please re-enter the '+strMsg+' value, limiting the text to these characters.');field.focus();return false;}}
return true;}
function isSafeStringExtended(field,strMsg){for(i=0;i<field.value.length;i++){var strTemp=field.value.charCodeAt(i);if(strTemp<32||strTemp>255){alert(strMsg+' contains invalid characters.  Please re-enter the '+strMsg+' value.');field.focus();return false;}}
return true;}
function isValidPhone(field){var nDigit;nDigit=0;for(i=0;i<field.value.length;i++){var strTemp=field.value.charAt(i);if(strTemp!=' '&&strTemp!='('&&strTemp!=')'&&strTemp!='.'&&strTemp!='-'&&strTemp!='+'&&strTemp!='0'&&strTemp!='1'&&strTemp!='2'&&strTemp!='3'&&strTemp!='4'&&strTemp!='5'&&strTemp!='6'&&strTemp!='7'&&strTemp!='8'&&strTemp!='9'){alert('Phone number must be a minimum of ten digits and may only contain ( ) - + . or spaces.  Please re-enter this value and click Submit.');field.focus();return false;}else if(strTemp=='0'||strTemp=='1'||strTemp=='2'||strTemp=='3'||strTemp=='4'||strTemp=='5'||strTemp=='6'||strTemp=='7'||strTemp=='8'||strTemp=='9'){++nDigit;}}
if(nDigit<10){alert('Phone number must be a minimum of ten digits and may only contain ( ) - . or spaces.  Please re-enter this value and click Submit.');field.focus();return false;}
return true;}
function isValidURL(field){var bBad;bBad=false;if((field.value.substring(0,7).toLowerCase()!="http://")&&(field.value.substring(0,8).toLowerCase()!="https://")){bBad=true;}
if(((field.value.substring(0,7).toLowerCase()=="http://")&&(field.value.length<8))||((field.value.substring(0,8).toLowerCase()=="https://")&&(field.value.length<9))){bBad=true;}
if(bBad==false){for(i=0;i<field.value.length;i++){var strTemp=field.value.charCodeAt(i);if(strTemp==32){bBad=true;break;}}}
if(bBad==true){alert('The URL is invalid. The URL must start with either http:// or https:// and no spaces are allowed.  Please enter a valid URL.');field.focus();return false;}
return true;}
function isOverMaxLen(field,sName,nMax){if(field.value.length>nMax){alert('The maximum length for '+sName+' is '+nMax+'. Please click OK and modify the value in '+sName+' to be less than '+nMax+' characters.');field.focus();return true;}
return false;}
function stripCommas(input){var result="";var nperiods=0;for(var i=0;i<input.length;i++){var ch=input.substring(i,i+1);if(isIntOnly(ch))
{result=result+ch;}
else if(ch==".")
{if(nperiods>1)
{return "NAN";}
else
{result=result+ch;}
nperiods++;}
else if(ch==",")
{if(nperiods>0||i==0){return "NAN";}}
else
{return "NAN";}}
if(result=="")
{return "NAN";}
return result;}
function isIntOnly(str){if(str.length==0)return false;for(var i=0;i<str.length;i++)
if((str.substring(i,i+1)<'0')||(str.substring(i,i+1)>'9'))
return false;return true;}
function isValidNumRange(field,from,to,sName){var value=field.value;var errMsg="";var valid=false;if(isIntOnly(value)){if(from!=''&&to==''){if(parseInt(value,10)<parseInt(from,10)){errMsg='should be a number greater than or equal to '+from+'.';}else{valid=true;}}else if(from!=''&&to!=''){if(parseInt(value,10)<parseInt(from,10)||parseInt(value,10)>parseInt(to,10)){if(parseInt(from,10)==parseInt(to,10)){if(parseInt(from,10)==1)
errMsg='cannot be greater than '+from+'.';else
errMsg='cannot be greater or less than '+from+'.';}else{errMsg='should be a number between '+from+' and '+to+'.';}}else{valid=true;}}else if(from==''&&to==''){valid=true;}}else{errMsg='is invalid.  It must be a whole number.';}
if(valid)return true;if(sName.length>0){alert(sName+' '+errMsg);field.focus();}
return false;}
function isValidNumWithSpace(field,sName){var str=field.value;for(var i=0;i<str.length;i++){if(str.substring(i,i+1)!=' '){if((str.substring(i,i+1)<'0')||(str.substring(i,i+1)>'9')){alert(sName+' can only contain numbers and spaces.');field.focus();return false;}}}
return true;}
function isValidNumRangeMoney(field,from,to,sName){var value=field.value;var number=stripCommas(value);var newto=Number(stripCommas(to))+0.001;if(number!="NAN"){if(from!=''&&to==''){if(parseFloat(number)<parseFloat(from)){alert(sName+' should be a number greater than or equal to '+from+'.');}else{return true;}}else if(from!=''&&to!=''){if((parseFloat(number)<parseFloat(from))||(parseFloat(number)>parseFloat(newto))){alert(sName+' should be a number between '+from+' and '+to+'.');}else{return true;}}else if(from==''&&to==''){return true;}}else{alert(sName+' should be a number.');}
field.focus();return false;}
function isValidNumDigits(field,min,max,sName){var str=field.value;var len;while(str.substring(0,1)==' ')
str=str.substring(1,str.length);while(str.substring(str.length-1,str.length)==' ')
str=str.substring(0,str.length-1);len=str.length;if((len>=min)&&(len<=max)){for(var i=0;i<len;i++){if((str.substring(i,i+1)<'0')||(str.substring(i,i+1)>'9')){alert(sName+' should only contain numbers.');field.focus();return false;}}}else{if(min==max){alert(sName+' should be a '+min+' digit number.');}else{alert(sName+' should be a '+min+' - '+max+' digit number.');}
field.focus;return false}
return true;}
function openHelp(dwData){RH_ShowHelp(0,helplink+'/merchant_Interface_RoboHelp_Project.htm>Tri-Pane',HH_HELP_CONTEXT,dwData);}
function openHelpMain(url,width,height){if(width=='')width='600';if(height=='')height='450';var win=window.open(helplink+url,'Help',config='height='+height+',width='+width+',scrollbars=1,resizable=1');win.focus();}
function openWin(url,winname,width,height,scroll,resize){if(width==null||width=='')width='750';if(height==null||height=='')height='500';if(scroll==null||scroll=='')scroll='1';if(resize==null||resize=='')resize='1';var win=window.open(url,winname,config='height='+height+',width='+width+',scrollbars='+scroll+',resizable='+resize);win.focus();}
function openDoc(url,win){var win=window.open(url,win,config='height=450,width=600,scrollbars=1,resizable=1');win.focus();}
function isValidBirthDate(field,sName){var str=field.value;var dateArray=str.split('/');if(dateArray.length==3){if(isDate(dateArray[2],dateArray[0],dateArray[1])==false){return false;}else if(dateArray[2]<1753){return false;}}else{return false;}
return true;}
function isValidDate(field,sName,sStartDate){var str;if(typeof(field.value)!='undefined')str=field.value;else str=field;var dateArray=str.split('/');var result=true;var errMsg=' is invalid. Please correct the value and resubmit.';if(sStartDate!=""){if(Date.parse(str)<Date.parse(sStartDate)){errMsg=' cannot be before '+sStartDate;result=false;}}
if(result){if(dateArray.length==3){if(isDate(dateArray[2],dateArray[0],dateArray[1])==false){result=false;}else if(dateArray[2]<1753){result=false;}}else{result=false;}}
if(!result){if(sName.length>0){alert(sName+errMsg);if(typeof(field.value)!='undefined')field.focus();}}
return result;}
function daysBetween(date1,date2){var ONE_DAY=1000*60*60*24
var date1_ms=date1.getTime()
var date2_ms=date2.getTime()
var difference_ms=Math.abs(date1_ms-date2_ms)
return Math.round(difference_ms/ONE_DAY)}
function isDate(year,mnth,day){if(isNaN(year)||isNaN(mnth)||isNaN(day))return false;if(year==' '||year=='  '||year=='   '||year=='    '||year<0)return false;if(!day||!mnth||!year)return false;if(mnth>12||mnth<1)return false;if(day>31||day<1)return false;if((day==31)&&(mnth!=1&&mnth!=3&&mnth!=5&&mnth!=7&&mnth!=8&&mnth!=10&&mnth!=12))return false;if(mnth==2){if(day>29)return false;if(day==29&&!isLeapYear(year))
return false;}
return true;}
function isLeapYear(year){return((year%4==0)&&(year%100!=0))||(year%400==0);}
function trim(str){while(str.substring(0,1)==' ')
str=str.substring(1,str.length);while(str.substring(str.length-1,str.length)==' ')
str=str.substring(0,str.length-1);return str;}
function isValidAmount(field,strName){var strAmount=field.value;for(var i=0;i<strAmount.length;i++){if(strAmount.substring(i,i+1)!=','&&strAmount.substring(i,i+1)!='.'){if((strAmount.substring(i,i+1)<'0')||(strAmount.substring(i,i+1)>'9')){if(strName.length>0){alert('Please re-enter the '+strName+'. The amount field should contain numbers only.');field.focus();}
return false;}}}
return true;}
var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');function _isInteger(val){var digits="1234567890";for(var i=0;i<val.length;i++){if(digits.indexOf(val.charAt(i))==-1){return false;}}
return true;}
function _getInt(str,i,minlength,maxlength){for(var x=maxlength;x>=minlength;x--){var token=str.substring(i,i+x);if(token.length<minlength){return null;}
if(_isInteger(token)){return token;}}
return null;}
function getDateFromFormat(val,format){var MONTH_NAMES=new Array('January','February','March','April','May','June','July','August','September','October','November','December','Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec');var DAY_NAMES=new Array('Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sun','Mon','Tue','Wed','Thu','Fri','Sat');val=val+"";format=format+"";var i_val=0;var i_format=0;var c="";var token="";var token2="";var x,y;var now=new Date();var year=now.getYear();var month=now.getMonth()+1;var date=1;var hh=now.getHours();var mm=now.getMinutes();var ss=now.getSeconds();var ampm="";while(i_format<format.length){c=format.charAt(i_format);token="";while((format.charAt(i_format)==c)&&(i_format<format.length)){token+=format.charAt(i_format++);}
if(token=="yyyy"||token=="yy"||token=="y"){if(token=="yyyy"){x=4;y=4;}
if(token=="yy"){x=2;y=2;}
if(token=="y"){x=2;y=4;}
year=_getInt(val,i_val,x,y);if(year==null){return 0;}
i_val+=year.length;if(year.length==2){if(year>70){year=1900+(year-0);}
else{year=2000+(year-0);}}}
else if(token=="MMM"||token=="NNN"){month=0;for(var i=0;i<MONTH_NAMES.length;i++){var month_name=MONTH_NAMES[i];if(val.substring(i_val,i_val+month_name.length).toLowerCase()==month_name.toLowerCase()){if(token=="MMM"||(token=="NNN"&&i>11)){month=i+1;if(month>12){month-=12;}
i_val+=month_name.length;break;}}}
if((month<1)||(month>12)){return 0;}}
else if(token=="EE"||token=="E"){for(var i=0;i<DAY_NAMES.length;i++){var day_name=DAY_NAMES[i];if(val.substring(i_val,i_val+day_name.length).toLowerCase()==day_name.toLowerCase()){i_val+=day_name.length;break;}}}
else if(token=="MM"||token=="M"){month=_getInt(val,i_val,token.length,2);if(month==null||(month<1)||(month>12)){return 0;}
i_val+=month.length;}
else if(token=="dd"||token=="d"){date=_getInt(val,i_val,token.length,2);if(date==null||(date<1)||(date>31)){return 0;}
i_val+=date.length;}
else if(token=="hh"||token=="h"){hh=_getInt(val,i_val,token.length,2);if(hh==null||(hh<1)||(hh>12)){return 0;}
i_val+=hh.length;}
else if(token=="HH"||token=="H"){hh=_getInt(val,i_val,token.length,2);if(hh==null||(hh<0)||(hh>23)){return 0;}
i_val+=hh.length;}
else if(token=="KK"||token=="K"){hh=_getInt(val,i_val,token.length,2);if(hh==null||(hh<0)||(hh>11)){return 0;}
i_val+=hh.length;}
else if(token=="kk"||token=="k"){hh=_getInt(val,i_val,token.length,2);if(hh==null||(hh<1)||(hh>24)){return 0;}
i_val+=hh.length;hh--;}
else if(token=="mm"||token=="m"){mm=_getInt(val,i_val,token.length,2);if(mm==null||(mm<0)||(mm>59)){return 0;}
i_val+=mm.length;}
else if(token=="ss"||token=="s"){ss=_getInt(val,i_val,token.length,2);if(ss==null||(ss<0)||(ss>59)){return 0;}
i_val+=ss.length;}
else if(token=="a"){if(val.substring(i_val,i_val+2).toLowerCase()=="am"){ampm="AM";}
else if(val.substring(i_val,i_val+2).toLowerCase()=="pm"){ampm="PM";}
else{return 0;}
i_val+=2;}
else{if(val.substring(i_val,i_val+token.length)!=token){return 0;}
else{i_val+=token.length;}}}
if(i_val!=val.length){return 0;}
if(month==2){if(((year%4==0)&&(year%100!=0))||(year%400==0)){if(date>29){return 0;}}
else{if(date>28){return 0;}}}
if((month==4)||(month==6)||(month==9)||(month==11)){if(date>30){return 0;}}
if(hh<12&&ampm=="PM"){hh=hh-0+12;}
else if(hh>11&&ampm=="AM"){hh-=12;}
var newdate=new Date(year,month-1,date,hh,mm,ss);return newdate.getTime();}
function limitText(limitField,limitCount,limitNum){tempText=limitField.value.replace(/\r?\n/g,"\r\n");if(tempText.length>limitNum){limitField.value=tempText.substring(0,limitNum);}else{limitCount.value=limitNum-tempText.length;}}
navigator.browserSpecs=(function(){var ua=navigator.userAgent,tem,M=ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i)||[];if(/trident/i.test(M[1])){tem=/\brv[ :]+(\d+)/g.exec(ua)||[];return{name:'IE',version:(tem[1]||'')};}
if(M[1]==='Chrome'){tem=ua.match(/\b(OPR|Edge)\/(\d+)/);if(tem!=null)return{name:tem[1].replace('OPR','Opera'),version:tem[2]};}
M=M[2]?[M[1],M[2]]:[navigator.appName,navigator.appVersion,'-?'];if((tem=ua.match(/version\/(\d+)/i))!=null)
M.splice(1,1,tem[1]);return{name:M[0],version:M[1]};})();