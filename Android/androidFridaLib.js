//       _        ___    ______    _     _       
//      (_)      / _ \  |  ____|  (_)   | |      
// __  ___  __ _| | | | | |__ _ __ _  __| | __ _ 
// \ \/ / |/ _` | | | | |  __| '__| |/ _` |/ _` |
//  >  <| | (_| | |_| | | |  | |  | | (_| | (_| |
// /_/\_\_|\__,_|\___/  |_|  |_|  |_|\__,_|\__,_|


// show java call stack
Java.stackid = 0;
function showCallstack(){
	function Where(stack){
		for(var i = 0; i < stack.length; ++i){
			XLOG(stack[i].toString());
		}
	} 
	var threadef = Java.use('java.lang.Thread');
	var threadinstance = threadef.$new();
	var stack = threadinstance.currentThread().getStackTrace();
	XLOG("=====================Callstack # " + Java.stackid.toString() + "========================");
	Java.stackid = Java.stackid + 1;
	XLOG(Where(stack));
}

// xia0 Frida Log
function XLOG(log) {
	console.log("[I]:" + log );
}

// xia0 frida java hook
// clz: class want to hook  methd: method of class callbackFunc: do your hook code
function xia0Hook(clz, methd, callbackFunc){
	clz[methd].implementation = function (){
		XLOG("xia0Hook # Hook class:"+ clz + " method:" + methd);
		
		var argc = arguments.length;
		for (var i = 0; i < argc; i++) {
			XLOG("xia0Hook # args[" + i + "]:"+ arguments[i]);
		}

		callbackFunc(arguments);
		
		switch (argc) {
			case 0:
				var retv = this[methd]();
				break;
			case 1:
				var retv = this[methd](arguments[0]);
				break;
			case 2:
				var retv = this[methd](arguments[0], arguments[1]);
				break;
			case 3:
				var retv = this[methd](arguments[0], arguments[1], arguments[2]);
				break;
			case 4:
				var retv = this[methd](arguments[0], arguments[1], arguments[2], arguments[3]);
				break;
			case 5:
				var retv = this[methd](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4]);
				break;
			case 6:
				var retv = this[methd](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5]);
				break;
			case 7:
				var retv = this[methd](arguments[0], arguments[1], arguments[2], arguments[3], arguments[4], arguments[5], arguments[6]);
				break;

			default:
				XLOG("xia0Hook # Hook class:"+ clz + " method:" + methd + " arguments count bigger than 7?");
				break;
		}
		
		return retv;
	}
}

XLOG("++++++++++++++++Android Frida Lib Loaded!✅++++++++++++++++");
