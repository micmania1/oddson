!function(e){var t={};function n(r){if(t[r])return t[r].exports;var a=t[r]={i:r,l:!1,exports:{}};return e[r].call(a.exports,a,a.exports,n),a.l=!0,a.exports}n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)n.d(r,a,function(t){return e[t]}.bind(null,a));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=4)}([function(e,t){e.exports=require("aws-serverless-express")},function(e,t){e.exports=require("express")},function(e,t){e.exports.eventContext=e=>function(t,n,r){const a=(e=e||{}).reqPropKey||"apiGateway",o=void 0===e.deleteHeaders||e.deleteHeaders;if(!t.headers["x-apigateway-event"]||!t.headers["x-apigateway-context"])return console.error("Missing x-apigateway-event or x-apigateway-context header(s)"),void r();t[a]={event:JSON.parse(decodeURIComponent(t.headers["x-apigateway-event"])),context:JSON.parse(decodeURIComponent(t.headers["x-apigateway-context"]))},o&&(delete t.headers["x-apigateway-event"],delete t.headers["x-apigateway-context"]),r()}},function(e,t){e.exports=require("cors")},function(e,t,n){"use strict";n.r(t);var r=n(0),a=n(2),o=n(3),c=n.n(o),i=n(1);const s=n.n(i)()(),d=Object(i.Router)();d.use(c()()),d.use(Object(a.eventContext)()),d.post("/new",(e,t)=>{const n=JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":0,"challenger":{"name":"Scott","number":0},"victim":{"name":"Scott","number":0},"status":"new"}');t.json(n)}),d.post("/activate/:id",(e,t)=>{const n=JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":20,"challenger":{"name":"Challenger","number":0},"victim":{"name":"Victim","number":7},"status":"activated"}');t.json(n)}),d.post("/complete",(e,t)=>{const n=JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":20,"challenger":{"name":"Challenger","number":0},"victim":{"name":"Victim","number":7},"status":"activated"}');t.json(n)}),d.get("/check/:id",(e,t)=>{const n=JSON.parse('{"id":"fe5d746a-e582-4cec-b2c8-d0c44e9108d1","challenge":"Do the thing","odds":0,"challenger":{"name":"Challenger","number":0},"victim":{"name":"Victim","number":2},"status":"new"}');t.json(n)}),s.use("/",d);var u=s;const l=Object(r.createServer)(u);t.default=(e,t)=>{Object(r.proxy)(l,e,t)}}]);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vL2V4dGVybmFsIFwiYXdzLXNlcnZlcmxlc3MtZXhwcmVzc1wiIiwid2VicGFjazovLy9leHRlcm5hbCBcImV4cHJlc3NcIiIsIndlYnBhY2s6Ly8vLi9ub2RlX21vZHVsZXMvYXdzLXNlcnZlcmxlc3MtZXhwcmVzcy9zcmMvbWlkZGxld2FyZS5qcyIsIndlYnBhY2s6Ly8vZXh0ZXJuYWwgXCJjb3JzXCIiLCJ3ZWJwYWNrOi8vLy4vYXBwLmpzIiwid2VicGFjazovLy8uL2FwcC5zZXJ2ZXJsZXNzLmpzIl0sIm5hbWVzIjpbImluc3RhbGxlZE1vZHVsZXMiLCJfX3dlYnBhY2tfcmVxdWlyZV9fIiwibW9kdWxlSWQiLCJleHBvcnRzIiwibW9kdWxlIiwiaSIsImwiLCJtb2R1bGVzIiwiY2FsbCIsIm0iLCJjIiwiZCIsIm5hbWUiLCJnZXR0ZXIiLCJvIiwiT2JqZWN0IiwiZGVmaW5lUHJvcGVydHkiLCJlbnVtZXJhYmxlIiwiZ2V0IiwiciIsIlN5bWJvbCIsInRvU3RyaW5nVGFnIiwidmFsdWUiLCJ0IiwibW9kZSIsIl9fZXNNb2R1bGUiLCJucyIsImNyZWF0ZSIsImtleSIsImJpbmQiLCJuIiwib2JqZWN0IiwicHJvcGVydHkiLCJwcm90b3R5cGUiLCJoYXNPd25Qcm9wZXJ0eSIsInAiLCJzIiwicmVxdWlyZSIsImV2ZW50Q29udGV4dCIsIm9wdGlvbnMiLCJyZXEiLCJyZXMiLCJuZXh0IiwicmVxUHJvcEtleSIsImRlbGV0ZUhlYWRlcnMiLCJ1bmRlZmluZWQiLCJoZWFkZXJzIiwiY29uc29sZSIsImVycm9yIiwiZXZlbnQiLCJKU09OIiwicGFyc2UiLCJkZWNvZGVVUklDb21wb25lbnQiLCJjb250ZXh0IiwiYXBwIiwicm91dGVyIiwidXNlIiwicG9zdCIsImpzb24iLCJzZXJ2ZXIiXSwibWFwcGluZ3MiOiJhQUNFLElBQUlBLEVBQW1CLEdBR3ZCLFNBQVNDLEVBQW9CQyxHQUc1QixH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QUFNaUIsRUFBT1IsS0FBS0MsTUFBTSwrTEFDeEJWLEVBQUlpQixLQUFLQSxLQUdYSCxFQUFPRSxLQUFLLFlBQWEsQ0FBQ2pCLEVBQUtDLEtBQzdCLE1BQU1pQixFQUFPUixLQUFLQyxNQUFNLCtMQUN4QlYsRUFBSWlCLEtBQUtBLEtBR1hILEVBQU9yQyxJQUFJLGFBQWMsQ0FBQ3NCLEVBQUtDLEtBQzdCLE1BQU1pQixFQUFPUixLQUFLQyxNQUFNLHdMQUN4QlYsRUFBSWlCLEtBQUtBLEtBU1hKLEVBQUlFLElBQUksSUFBS0QsR0FFRSxRQ25DZixNQUFNSSxFQUFTLHVCQUFhLEdBRWIsa0JBQXNCLGdCQUFNQSxFQUFRVixFQUFPSSIsImZpbGUiOiJtYWluLmpzIiwic291cmNlc0NvbnRlbnQiOlsiIFx0Ly8gVGhlIG1vZHVsZSBjYWNoZVxuIFx0dmFyIGluc3RhbGxlZE1vZHVsZXMgPSB7fTtcblxuIFx0Ly8gVGhlIHJlcXVpcmUgZnVuY3Rpb25cbiBcdGZ1bmN0aW9uIF9fd2VicGFja19yZXF1aXJlX18obW9kdWxlSWQpIHtcblxuIFx0XHQvLyBDaGVjayBpZiBtb2R1bGUgaXMgaW4gY2FjaGVcbiBcdFx0aWYoaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0pIHtcbiBcdFx0XHRyZXR1cm4gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0uZXhwb3J0cztcbiBcdFx0fVxuIFx0XHQvLyBDcmVhdGUgYSBuZXcgbW9kdWxlIChhbmQgcHV0IGl0IGludG8gdGhlIGNhY2hlKVxuIFx0XHR2YXIgbW9kdWxlID0gaW5zdGFsbGVkTW9kdWxlc1ttb2R1bGVJZF0gPSB7XG4gXHRcdFx0aTogbW9kdWxlSWQsXG4gXHRcdFx0bDogZmFsc2UsXG4gXHRcdFx0ZXhwb3J0czoge31cbiBcdFx0fTtcblxuIFx0XHQvLyBFeGVjdXRlIHRoZSBtb2R1bGUgZnVuY3Rpb25cbiBcdFx0bW9kdWxlc1ttb2R1bGVJZF0uY2FsbChtb2R1bGUuZXhwb3J0cywgbW9kdWxlLCBtb2R1bGUuZXhwb3J0cywgX193ZWJwYWNrX3JlcXVpcmVfXyk7XG5cbiBcdFx0Ly8gRmxhZyB0aGUgbW9kdWxlIGFzIGxvYWRlZFxuIFx0XHRtb2R1bGUubCA9IHRydWU7XG5cbiBcdFx0Ly8gUmV0dXJuIHRoZSBleHBvcnRzIG9mIHRoZSBtb2R1bGVcbiBcdFx0cmV0dXJuIG1vZHVsZS5leHBvcnRzO1xuIFx0fVxuXG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlcyBvYmplY3QgKF9fd2VicGFja19tb2R1bGVzX18pXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm0gPSBtb2R1bGVzO1xuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZSBjYWNoZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5jID0gaW5zdGFsbGVkTW9kdWxlcztcblxuIFx0Ly8gZGVmaW5lIGdldHRlciBmdW5jdGlvbiBmb3IgaGFybW9ueSBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQgPSBmdW5jdGlvbihleHBvcnRzLCBuYW1lLCBnZXR0ZXIpIHtcbiBcdFx0aWYoIV9fd2VicGFja19yZXF1aXJlX18ubyhleHBvcnRzLCBuYW1lKSkge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBuYW1lLCB7IGVudW1lcmFibGU6IHRydWUsIGdldDogZ2V0dGVyIH0pO1xuIFx0XHR9XG4gXHR9O1xuXG4gXHQvLyBkZWZpbmUgX19lc01vZHVsZSBvbiBleHBvcnRzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIgPSBmdW5jdGlvbihleHBvcnRzKSB7XG4gXHRcdGlmKHR5cGVvZiBTeW1ib2wgIT09ICd1bmRlZmluZWQnICYmIFN5bWJvbC50b1N0cmluZ1RhZykge1xuIFx0XHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCBTeW1ib2wudG9TdHJpbmdUYWcsIHsgdmFsdWU6ICdNb2R1bGUnIH0pO1xuIFx0XHR9XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLCAnX19lc01vZHVsZScsIHsgdmFsdWU6IHRydWUgfSk7XG4gXHR9O1xuXG4gXHQvLyBjcmVhdGUgYSBmYWtlIG5hbWVzcGFjZSBvYmplY3RcbiBcdC8vIG1vZGUgJiAxOiB2YWx1ZSBpcyBhIG1vZHVsZSBpZCwgcmVxdWlyZSBpdFxuIFx0Ly8gbW9kZSAmIDI6IG1lcmdlIGFsbCBwcm9wZXJ0aWVzIG9mIHZhbHVlIGludG8gdGhlIG5zXG4gXHQvLyBtb2RlICYgNDogcmV0dXJuIHZhbHVlIHdoZW4gYWxyZWFkeSBucyBvYmplY3RcbiBcdC8vIG1vZGUgJiA4fDE6IGJlaGF2ZSBsaWtlIHJlcXVpcmVcbiBcdF9fd2VicGFja19yZXF1aXJlX18udCA9IGZ1bmN0aW9uKHZhbHVlLCBtb2RlKSB7XG4gXHRcdGlmKG1vZGUgJiAxKSB2YWx1ZSA9IF9fd2VicGFja19yZXF1aXJlX18odmFsdWUpO1xuIFx0XHRpZihtb2RlICYgOCkgcmV0dXJuIHZhbHVlO1xuIFx0XHRpZigobW9kZSAmIDQpICYmIHR5cGVvZiB2YWx1ZSA9PT0gJ29iamVjdCcgJiYgdmFsdWUgJiYgdmFsdWUuX19lc01vZHVsZSkgcmV0dXJuIHZhbHVlO1xuIFx0XHR2YXIgbnMgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLnIobnMpO1xuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkobnMsICdkZWZhdWx0JywgeyBlbnVtZXJhYmxlOiB0cnVlLCB2YWx1ZTogdmFsdWUgfSk7XG4gXHRcdGlmKG1vZGUgJiAyICYmIHR5cGVvZiB2YWx1ZSAhPSAnc3RyaW5nJykgZm9yKHZhciBrZXkgaW4gdmFsdWUpIF9fd2VicGFja19yZXF1aXJlX18uZChucywga2V5LCBmdW5jdGlvbihrZXkpIHsgcmV0dXJuIHZhbHVlW2tleV07IH0uYmluZChudWxsLCBrZXkpKTtcbiBcdFx0cmV0dXJuIG5zO1xuIFx0fTtcblxuIFx0Ly8gZ2V0RGVmYXVsdEV4cG9ydCBmdW5jdGlvbiBmb3IgY29tcGF0aWJpbGl0eSB3aXRoIG5vbi1oYXJtb255IG1vZHVsZXNcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubiA9IGZ1bmN0aW9uKG1vZHVsZSkge1xuIFx0XHR2YXIgZ2V0dGVyID0gbW9kdWxlICYmIG1vZHVsZS5fX2VzTW9kdWxlID9cbiBcdFx0XHRmdW5jdGlvbiBnZXREZWZhdWx0KCkgeyByZXR1cm4gbW9kdWxlWydkZWZhdWx0J107IH0gOlxuIFx0XHRcdGZ1bmN0aW9uIGdldE1vZHVsZUV4cG9ydHMoKSB7IHJldHVybiBtb2R1bGU7IH07XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18uZChnZXR0ZXIsICdhJywgZ2V0dGVyKTtcbiBcdFx0cmV0dXJuIGdldHRlcjtcbiBcdH07XG5cbiBcdC8vIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbFxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5vID0gZnVuY3Rpb24ob2JqZWN0LCBwcm9wZXJ0eSkgeyByZXR1cm4gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKG9iamVjdCwgcHJvcGVydHkpOyB9O1xuXG4gXHQvLyBfX3dlYnBhY2tfcHVibGljX3BhdGhfX1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5wID0gXCJcIjtcblxuXG4gXHQvLyBMb2FkIGVudHJ5IG1vZHVsZSBhbmQgcmV0dXJuIGV4cG9ydHNcbiBcdHJldHVybiBfX3dlYnBhY2tfcmVxdWlyZV9fKF9fd2VicGFja19yZXF1aXJlX18ucyA9IDQpO1xuIiwibW9kdWxlLmV4cG9ydHMgPSByZXF1aXJlKFwiYXdzLXNlcnZlcmxlc3MtZXhwcmVzc1wiKTsiLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJleHByZXNzXCIpOyIsIm1vZHVsZS5leHBvcnRzLmV2ZW50Q29udGV4dCA9IG9wdGlvbnMgPT4gZnVuY3Rpb24gYXBpR2F0ZXdheUV2ZW50UGFyc2VyIChyZXEsIHJlcywgbmV4dCkge1xuICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fSAvLyBkZWZhdWx0czoge3JlcVByb3BLZXk6ICdhcGlHYXRld2F5JywgZGVsZXRlSGVhZGVyczogdHJ1ZX1cbiAgY29uc3QgcmVxUHJvcEtleSA9IG9wdGlvbnMucmVxUHJvcEtleSB8fCAnYXBpR2F0ZXdheSdcbiAgY29uc3QgZGVsZXRlSGVhZGVycyA9IG9wdGlvbnMuZGVsZXRlSGVhZGVycyA9PT0gdW5kZWZpbmVkID8gdHJ1ZSA6IG9wdGlvbnMuZGVsZXRlSGVhZGVyc1xuXG4gIGlmICghcmVxLmhlYWRlcnNbJ3gtYXBpZ2F0ZXdheS1ldmVudCddIHx8ICFyZXEuaGVhZGVyc1sneC1hcGlnYXRld2F5LWNvbnRleHQnXSkge1xuICAgIGNvbnNvbGUuZXJyb3IoJ01pc3NpbmcgeC1hcGlnYXRld2F5LWV2ZW50IG9yIHgtYXBpZ2F0ZXdheS1jb250ZXh0IGhlYWRlcihzKScpXG4gICAgbmV4dCgpXG4gICAgcmV0dXJuXG4gIH1cblxuICByZXFbcmVxUHJvcEtleV0gPSB7XG4gICAgZXZlbnQ6IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KHJlcS5oZWFkZXJzWyd4LWFwaWdhdGV3YXktZXZlbnQnXSkpLFxuICAgIGNvbnRleHQ6IEpTT04ucGFyc2UoZGVjb2RlVVJJQ29tcG9uZW50KHJlcS5oZWFkZXJzWyd4LWFwaWdhdGV3YXktY29udGV4dCddKSlcbiAgfVxuXG4gIGlmIChkZWxldGVIZWFkZXJzKSB7XG4gICAgZGVsZXRlIHJlcS5oZWFkZXJzWyd4LWFwaWdhdGV3YXktZXZlbnQnXVxuICAgIGRlbGV0ZSByZXEuaGVhZGVyc1sneC1hcGlnYXRld2F5LWNvbnRleHQnXVxuICB9XG5cbiAgbmV4dCgpXG59XG4iLCJtb2R1bGUuZXhwb3J0cyA9IHJlcXVpcmUoXCJjb3JzXCIpOyIsImltcG9ydCB7IGV2ZW50Q29udGV4dCBhcyBhd3NTZXJ2ZXJsZXNzRXZlbnRDb250ZXh0IH0gZnJvbSAnYXdzLXNlcnZlcmxlc3MtZXhwcmVzcy9zcmMvbWlkZGxld2FyZSc7XG5pbXBvcnQgY29ycyBmcm9tICdjb3JzJztcbmltcG9ydCBleHByZXNzLCB7IFJvdXRlciBhcyBleHByZXNzUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5cbmNvbnN0IGFwcCA9IGV4cHJlc3MoKTtcbmNvbnN0IHJvdXRlciA9IGV4cHJlc3NSb3V0ZXIoKTtcblxucm91dGVyLnVzZShjb3JzKCkpO1xucm91dGVyLnVzZShhd3NTZXJ2ZXJsZXNzRXZlbnRDb250ZXh0KCkpO1xuXG5yb3V0ZXIucG9zdCgnL25ldycsIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCBqc29uID0gSlNPTi5wYXJzZSgne1wiaWRcIjpcImZlNWQ3NDZhLWU1ODItNGNlYy1iMmM4LWQwYzQ0ZTkxMDhkMVwiLFwiY2hhbGxlbmdlXCI6XCJEbyB0aGUgdGhpbmdcIixcIm9kZHNcIjowLFwiY2hhbGxlbmdlclwiOntcIm5hbWVcIjpcIlNjb3R0XCIsXCJudW1iZXJcIjowfSxcInZpY3RpbVwiOntcIm5hbWVcIjpcIlNjb3R0XCIsXCJudW1iZXJcIjowfSxcInN0YXR1c1wiOlwibmV3XCJ9Jyk7XG4gIHJlcy5qc29uKGpzb24pO1xufSk7XG5cbnJvdXRlci5wb3N0KCcvYWN0aXZhdGUvOmlkJywgKHJlcSwgcmVzKSA9PiB7XG4gIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKCd7XCJpZFwiOlwiZmU1ZDc0NmEtZTU4Mi00Y2VjLWIyYzgtZDBjNDRlOTEwOGQxXCIsXCJjaGFsbGVuZ2VcIjpcIkRvIHRoZSB0aGluZ1wiLFwib2Rkc1wiOjIwLFwiY2hhbGxlbmdlclwiOntcIm5hbWVcIjpcIkNoYWxsZW5nZXJcIixcIm51bWJlclwiOjB9LFwidmljdGltXCI6e1wibmFtZVwiOlwiVmljdGltXCIsXCJudW1iZXJcIjo3fSxcInN0YXR1c1wiOlwiYWN0aXZhdGVkXCJ9Jyk7XG4gIHJlcy5qc29uKGpzb24pO1xufSk7XG5cbnJvdXRlci5wb3N0KCcvY29tcGxldGUnLCAocmVxLCByZXMpID0+IHtcbiAgY29uc3QganNvbiA9IEpTT04ucGFyc2UoJ3tcImlkXCI6XCJmZTVkNzQ2YS1lNTgyLTRjZWMtYjJjOC1kMGM0NGU5MTA4ZDFcIixcImNoYWxsZW5nZVwiOlwiRG8gdGhlIHRoaW5nXCIsXCJvZGRzXCI6MjAsXCJjaGFsbGVuZ2VyXCI6e1wibmFtZVwiOlwiQ2hhbGxlbmdlclwiLFwibnVtYmVyXCI6MH0sXCJ2aWN0aW1cIjp7XCJuYW1lXCI6XCJWaWN0aW1cIixcIm51bWJlclwiOjd9LFwic3RhdHVzXCI6XCJhY3RpdmF0ZWRcIn0nKTtcbiAgcmVzLmpzb24oanNvbik7XG59KTtcblxucm91dGVyLmdldCgnL2NoZWNrLzppZCcsIChyZXEsIHJlcykgPT4ge1xuICBjb25zdCBqc29uID0gSlNPTi5wYXJzZSgne1wiaWRcIjpcImZlNWQ3NDZhLWU1ODItNGNlYy1iMmM4LWQwYzQ0ZTkxMDhkMVwiLFwiY2hhbGxlbmdlXCI6XCJEbyB0aGUgdGhpbmdcIixcIm9kZHNcIjowLFwiY2hhbGxlbmdlclwiOntcIm5hbWVcIjpcIkNoYWxsZW5nZXJcIixcIm51bWJlclwiOjB9LFwidmljdGltXCI6e1wibmFtZVwiOlwiVmljdGltXCIsXCJudW1iZXJcIjoyfSxcInN0YXR1c1wiOlwibmV3XCJ9Jyk7XG4gIHJlcy5qc29uKGpzb24pO1xufSk7XG5cbmlmIChwcm9jZXNzLmVudi5OT0RFX0VOViA9PT0gJ2RldmVsb3BtZW50Jykge1xuICByb3V0ZXIuZ2V0KCcvJywgKHJlcSwgcmVzKSA9PiB7XG4gICAgcmVzLmpzb24oWydUaGUgQVBJIGlzIHJ1bm5pbmcuJ10pO1xuICB9KTtcbn1cblxuYXBwLnVzZSgnLycsIHJvdXRlcik7XG5cbmV4cG9ydCBkZWZhdWx0IGFwcDtcbiIsImltcG9ydCB7IHByb3h5LCBjcmVhdGVTZXJ2ZXIgfSBmcm9tICdhd3Mtc2VydmVybGVzcy1leHByZXNzJztcbmltcG9ydCBhcHAgZnJvbSAnLi9hcHAnO1xuXG5jb25zdCBzZXJ2ZXIgPSBjcmVhdGVTZXJ2ZXIoYXBwKTtcblxuZXhwb3J0IGRlZmF1bHQgKGV2ZW50LCBjb250ZXh0KSA9PiB7IHByb3h5KHNlcnZlciwgZXZlbnQsIGNvbnRleHQpIH1cbiJdLCJzb3VyY2VSb290IjoiIn0=