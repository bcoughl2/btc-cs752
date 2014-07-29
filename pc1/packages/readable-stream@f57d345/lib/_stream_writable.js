function WriteReq(e,i,t){this.chunk=e,this.encoding=i,this.callback=t}function WritableState(e,i){e=e||{};var t=e.highWaterMark;this.highWaterMark=t||0===t?t:16384,this.objectMode=!!e.objectMode,this.highWaterMark=~~this.highWaterMark,this.needDrain=!1,this.ending=!1,this.ended=!1,this.finished=!1;var s=e.decodeStrings===!1;this.decodeStrings=!s,this.defaultEncoding=e.defaultEncoding||"utf8",this.length=0,this.writing=!1,this.sync=!0,this.bufferProcessing=!1,this.onwrite=function(e){onwrite(i,e)},this.writecb=null,this.writelen=0,this.buffer=[],this.errorEmitted=!1}function Writable(e){var i=require("./_stream_duplex");return this instanceof Writable||this instanceof i?(this._writableState=new WritableState(e,this),this.writable=!0,Stream.call(this),void 0):new Writable(e)}function writeAfterEnd(e,i,t){var s=Error("write after end");e.emit("error",s),process.nextTick(function(){t(s)})}function validChunk(e,i,t,s){var a=!0;if(!Buffer.isBuffer(t)&&"string"!=typeof t&&null!==t&&void 0!==t&&!i.objectMode){var u=new TypeError("Invalid non-string/buffer chunk");e.emit("error",u),process.nextTick(function(){s(u)}),a=!1}return a}function decodeChunk(e,i,t){return e.objectMode||e.decodeStrings===!1||"string"!=typeof i||(i=new Buffer(i,t)),i}function writeOrBuffer(e,i,t,s,a){t=decodeChunk(i,t,s),Buffer.isBuffer(t)&&(s="buffer");var u=i.objectMode?1:t.length;i.length+=u;var n=i.length<i.highWaterMark;return n||(i.needDrain=!0),i.writing?i.buffer.push(new WriteReq(t,s,a)):doWrite(e,i,u,t,s,a),n}function doWrite(e,i,t,s,a,u){i.writelen=t,i.writecb=u,i.writing=!0,i.sync=!0,e._write(s,a,i.onwrite),i.sync=!1}function onwriteError(e,i,t,s,a){t?process.nextTick(function(){a(s)}):a(s),e._writableState.errorEmitted=!0,e.emit("error",s)}function onwriteStateUpdate(e){e.writing=!1,e.writecb=null,e.length-=e.writelen,e.writelen=0}function onwrite(e,i){var t=e._writableState,s=t.sync,a=t.writecb;if(onwriteStateUpdate(t),i)onwriteError(e,t,s,i,a);else{var u=needFinish(e,t);u||t.bufferProcessing||!t.buffer.length||clearBuffer(e,t),s?process.nextTick(function(){afterWrite(e,t,u,a)}):afterWrite(e,t,u,a)}}function afterWrite(e,i,t,s){t||onwriteDrain(e,i),s(),t&&finishMaybe(e,i)}function onwriteDrain(e,i){0===i.length&&i.needDrain&&(i.needDrain=!1,e.emit("drain"))}function clearBuffer(e,i){i.bufferProcessing=!0;for(var t=0;i.buffer.length>t;t++){var s=i.buffer[t],a=s.chunk,u=s.encoding,n=s.callback,r=i.objectMode?1:a.length;if(doWrite(e,i,r,a,u,n),i.writing){t++;break}}i.bufferProcessing=!1,i.buffer.length>t?i.buffer=i.buffer.slice(t):i.buffer.length=0}function needFinish(e,i){return i.ending&&0===i.length&&!i.finished&&!i.writing}function finishMaybe(e,i){var t=needFinish(e,i);return t&&(i.finished=!0,e.emit("finish")),t}function endWritable(e,i,t){i.ending=!0,finishMaybe(e,i),t&&(i.finished?process.nextTick(t):e.once("finish",t)),i.ended=!0}module.exports=Writable;var Buffer=require("buffer").Buffer;Writable.WritableState=WritableState;var util=require("core-util-is");util.inherits=require("inherits");var Stream=require("stream");util.inherits(Writable,Stream),Writable.prototype.pipe=function(){this.emit("error",Error("Cannot pipe. Not readable."))},Writable.prototype.write=function(e,i,t){var s=this._writableState,a=!1;return"function"==typeof i&&(t=i,i=null),Buffer.isBuffer(e)?i="buffer":i||(i=s.defaultEncoding),"function"!=typeof t&&(t=function(){}),s.ended?writeAfterEnd(this,s,t):validChunk(this,s,e,t)&&(a=writeOrBuffer(this,s,e,i,t)),a},Writable.prototype._write=function(e,i,t){t(Error("not implemented"))},Writable.prototype.end=function(e,i,t){var s=this._writableState;"function"==typeof e?(t=e,e=null,i=null):"function"==typeof i&&(t=i,i=null),e!==void 0&&null!==e&&this.write(e,i),s.ending||s.finished||endWritable(this,s,t)};