var RESManager=function(){function e(){this.map={},this.loadQueue=[],this.ref0List=[]}return Object.defineProperty(e,"instance",{get:function(){return e._instance||(e._instance=new e),e._instance},enumerable:!0,configurable:!0}),e.prototype.refRes=function(e){var t=this.map[e];if(t){if(t.inDList){var i=this.ref0List.indexOf(t);t.inDList=!1,this.ref0List.splice(i,1)}}else(t=RESObj.create())&&(t.val=e,this.map[e]=t,this.loadQueue.push(t),this.loadNext());return t&&t.refCount++,t},e.prototype.reduceRes=function(e){var t=this.map[e];return t&&(t.refCount--,t.refCount<=0&&(t.inDList||(t.ref0Time=DateUtils.getTimer(),t.inDList=!0,this.ref0List.push(t)))),t},e.prototype.onLoaded=function(){this.loadingRes=null,this.loadNext()},e.prototype.loadNext=function(){if(!this.loadingRes&&this.loadQueue.length)for(;this.loadQueue.length;){var e=this.loadQueue.shift();if(e){this.loadingRes=e,e.startLoad();break}}},e.prototype.checkDestory=function(){var e=this.ref0List.length;if(e>0){var t=e;t>25&&(t=25);for(var i=0;t>i;i++){var s=this.ref0List[i];if(s){DateUtils.getTimer()-s.ref0Time>1e4&&(s.inDList=!1,0==s.refCount&&(this.destoryRes(s),this.ref0List[i]=null,!0))}}}},e.prototype.checkDestory1=function(){var e=this.ref0List.length;if(e>0){var t=e;t>25&&(t=25);for(var i=0;t>i;i++){var s=this.ref0List[i];if(s){DateUtils.getTimer()-s.ref0Time>3e4&&(s.inDList=!1,0==s.refCount&&(this.destoryRes(s),this.ref0List[i]=null,!0))}}}},e.prototype.destoryRes=function(e){if(e!==this.loadingRes){if(delete this.map[e.val],0==e.isLoading){var t=this.loadQueue.indexOf(e);t>=0&&this.loadQueue.splice(t,1)}e.dispose()}},e}();