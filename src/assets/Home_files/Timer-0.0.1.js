var timerInterval;var modalDisplayed=false;var countDownToExpire;var countDownToWarn;var databaseTimeToExpire=-1;var channel;$(document).ready(function(){if(JavascriptSessionWarningOn){initializeTimer();timerInterval=setInterval(timer,1000);}});function timer(){let now=new Date().getTime();let timeLeftToExpire=countDownToExpire-now;let timeLeftToWarn=countDownToWarn-now;var minutes=Math.floor((timeLeftToExpire%(1000*60*60))/(1000*60));var seconds=Math.floor((timeLeftToExpire%(1000*60))/1000);document.getElementById("timer").innerHTML="<b>"+minutes+"m "+seconds+"s. "+"</b>";if(timeLeftToWarn<0&&!modalDisplayed){getSessionAliveTime();}
if(timeLeftToExpire<0){document.getElementById("timer").innerHTML="0s";logout();}}
function logout(){if(!!channel)
channel.postMessage('logout');logOutSession();}
function closeModal(){var modal=document.getElementById('basicModal');if(!!modal)
modal.style.display='none';}
function logOutSession(){clearInterval(timerInterval);window.location.href=LoginPageUrl;}
function continueSession(){if(timerInterval)
clearInterval(timerInterval);initializeTimer();var modal=document.getElementById('basicModal');if(!!modal){modal.style.display='none';}
timerInterval=setInterval(timer,1000);var url=Anet.Site.BoardingController+'ValidateSession';$.ajax({type:'GET',url:url,cache:false,success:function(data){if(!!channel)
channel.postMessage('timerreset');},error:function(error){console.log(error);}});}
function getSessionAliveTime(){var url=Anet.Site.verifySessionController;$.ajax({type:'GET',url:url,cache:false,success:function(data){checkWithDatabaseAliveSession(JSON.parse(data))},error:function(error){console.log(error);}});}
function initializeTimer(){modalDisplayed=false;countDownToExpire=new Date();countDownToExpire.setSeconds(countDownToExpire.getSeconds()+JavascriptSessionExpireTimeInSeconds);countDownToWarn=new Date();countDownToWarn.setSeconds(countDownToWarn.getSeconds()+JavascriptSessionWarningTimeInSeconds);}
function checkWithDatabaseAliveSession(result){let current=new Date();countDownToWarn=new Date();let warnTimeDiff=JavascriptSessionExpireTimeInSeconds-JavascriptSessionWarningTimeInSeconds;countDownToExpire=new Date();countDownToWarn.setSeconds(countDownToWarn.getSeconds()+(result.SessionTimeAlive-warnTimeDiff));countDownToExpire.setSeconds(countDownToExpire.getSeconds()+result.SessionTimeAlive);let timeLeftToWarn=countDownToWarn-current.getTime();if(timeLeftToWarn<0){var modal=document.getElementById('basicModal');if(!!modal)
modal.style.display='block';modalDisplayed=true;}}
try{channel=new BroadcastChannel('timerreset');channel.onmessage=function(e){if(!!e&&!!e.data){if(e.data==="timerreset"){initializeTimer();var modal=document.getElementById('basicModal');if(!!modal){modal.style.display='none';}}else if(e.data==="logout"){logOutSession();}}};channel.postMessage('timerreset');}catch(ex){console.log(ex.message);}