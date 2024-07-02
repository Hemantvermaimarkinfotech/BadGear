if(typeof(Anet)==='undefined'){var Anet={};}
Anet.App=angular.module('anet',['ui.bootstrap']);if(window.attachEvent&&!window.addEventListener){Anet.App.config(function($sceProvider){$sceProvider.enabled(false);});}
Anet.App.service('shared',function(){var sharedData={showQuestion:false};return{getObject:function(){return sharedData;}}}).service('modalService',['$modal',function($modal){var modalDefaults={backdrop:true,keyboard:true,modalFade:true,templateUrl:''};var modalOptions={closeButtonText:'Close',actionButtonText:'OK',headerText:'Proceed?',bodyText:'Perform this action?'};this.showModal=function(customModalDefaults,customModalOptions){customModalDefaults=customModalDefaults||{};customModalDefaults.backdrop='static';return this.show(customModalDefaults,customModalOptions);};this.show=function(customModalDefaults,customModalOptions){var tempModalDefaults={};var tempModalOptions={};angular.extend(tempModalDefaults,modalDefaults,customModalDefaults);angular.extend(tempModalOptions,modalOptions,customModalOptions);if(!tempModalDefaults.controller){tempModalDefaults.controller=function($scope,$modalInstance){$scope.modalOptions=tempModalOptions;$scope.modalOptions.ok=function(result){$modalInstance.close($scope.modalOptions);};$scope.modalOptions.cancel=function(result){$modalInstance.dismiss('cancel');};}}
tempModalDefaults.controller.$inject=['$scope','$modalInstance'];return $modal.open(tempModalDefaults).result;}}]);Anet.App.directive('dynamicName',function($compile){return{restrict:"A",terminal:true,priority:1000,link:function(scope,element,attrs){element.attr('name',scope.$eval(attrs.dynamicName));element.removeAttr('dynamic-name');$compile(element)(scope);}};});Anet.App.config(['$compileProvider',function($compileProvider){$compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|javascript):/);}]);Anet.Util={QueryStringTable:null,QueryString:function(qsKey){qsKey=qsKey.toLowerCase();if(Anet.Util.QueryStringTable!=null){return Anet.Util.QueryStringTable[qsKey];}
var qs=document.location.search.toString();if(qs.length>0){qs=qs.substring(1);}
Anet.Util.QueryStringTable={};var pairs=qs.split("&"),key,value;for(var i=0;i<pairs.length;i++){var pair=pairs[i].split("=");if(pair.length!=2||pair[1]==""){continue;}
try{key=decodeURI(pair[0]).toLowerCase();value=decodeURI(pair[1]);}
catch(e){key=unescape(pair[0]).toLowerCase();value=unescape(pair[1]);}
if(Anet.Util.QueryStringTable[key]){Anet.Util.QueryStringTable[key]+=", "+value;}
else{Anet.Util.QueryStringTable[key]=value;}}
return Anet.Util.QueryStringTable[qsKey];},AddParamValue:function(url,paramName,paramValue){if(url.indexOf(paramName+"=")>0){var regex=new RegExp(paramName+'=\\w+','i')
url=url.replace(regex,paramName+'='+paramValue);}
else{var hash="";var hashStart=url.indexOf("#");if(hashStart>=0){hash=url.substr(hashStart);url=url.substr(0,hashStart);}
var paramStart=(url.indexOf("?")>=0)?"&":"?";url+=paramStart+paramName+'='+paramValue+hash;}
return url;}};