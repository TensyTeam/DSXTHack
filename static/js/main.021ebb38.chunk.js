(window.webpackJsonp=window.webpackJsonp||[]).push([[0],{164:function(t,e,n){t.exports=n(382)},169:function(t,e,n){},184:function(t,e){},186:function(t,e){},217:function(t,e){},218:function(t,e){},266:function(t,e){},268:function(t,e){},291:function(t,e){},382:function(t,e,n){"use strict";n.r(e);var a=n(15),o=n.n(a),c=n(158),s=n.n(c),r=(n(169),n(159)),u=n(160),i=n(162),l=n(161),d=n(163),m=n(50);function f(t,e,n){return"https://playground24.ru/dsxt-api/get_data.php?id="+t+"&value="+e+"&name="+n}var p=function(t){function e(t){var n;return Object(r.a)(this,e),(n=Object(i.a)(this,Object(l.a)(e).call(this,t))).state={data:[]},n.onSendData=n.onSendData.bind(Object(m.a)(Object(m.a)(n))),n}return Object(d.a)(e,t),Object(u.a)(e,[{key:"onSendData",value:function(t,e){var a;this.setState({data:(a=f(t,e),n(170)({url:"https://tensy.org/",method:"POST",json:a},function(t,e,n){if(!t&&200===e.statusCode)return n;console.log("error: "+t),console.log("response.statusCode: "+e.statusCode),console.log("response.statusText: "+e.statusText)}))})}},{key:"render",value:function(){var t=this;return o.a.createElement(o.a.Fragment,null,o.a.createElement("div",{className:"general"},o.a.createElement("div",{className:"top"},o.a.createElement("div",{className:"chart"},"1"),o.a.createElement("div",{className:"order"},this.state.data)),o.a.createElement("div",{className:"bottom"},o.a.createElement("div",{className:"content"},o.a.createElement("button",{onClick:function(e){t.onSendData("11","token1")}},"\u041e\u0442\u043f\u0440\u0430\u0432\u0438\u0442\u044c")))))}}]),e}(o.a.Component);s.a.render(o.a.createElement(p,null),document.getElementById("root"))}},[[164,1,2]]]);
//# sourceMappingURL=main.021ebb38.chunk.js.map