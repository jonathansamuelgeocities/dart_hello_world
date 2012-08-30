function Isolate() {}
init();

var $$ = {};
var $ = Isolate.$isolateProperties;
$.Primitives_printString = function(string) {
  if (typeof dartPrint == "function") {
    dartPrint(string);
    return;
  }
  if (typeof console == "object") {
    console.log(string);
    return;
  }
  if (typeof write == "function") {
    write(string);
    write("\n");
  }
};

$.print = function(obj) {
  $.Primitives_printString(obj);
};

$.main = function() {
  $.print('Hello World!');
};

var $ = null;
Isolate = Isolate.$finishIsolateConstructor(Isolate);
var $ = new Isolate();
if (typeof document != 'undefined' && document.readyState != 'complete') {
  document.addEventListener('readystatechange', function () {
    if (document.readyState == 'complete') {
      $.main();
    }
  }, false);
} else {
  $.main();
}
function init() {
Isolate.$isolateProperties = {};
Isolate.$finishIsolateConstructor = function(oldIsolate) {
  var isolateProperties = oldIsolate.$isolateProperties;
  var isolatePrototype = oldIsolate.prototype;
  var str = "{\n";
  str += "var properties = Isolate.$isolateProperties;\n";
  for (var staticName in isolateProperties) {
    if (Object.prototype.hasOwnProperty.call(isolateProperties, staticName)) {
      str += "this." + staticName + "= properties." + staticName + ";\n";
    }
  }
  str += "}\n";
  var newIsolate = new Function(str);
  newIsolate.prototype = isolatePrototype;
  isolatePrototype.constructor = newIsolate;
  newIsolate.$isolateProperties = isolateProperties;
  return newIsolate;
};
}
