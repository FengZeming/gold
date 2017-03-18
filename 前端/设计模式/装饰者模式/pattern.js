/**
 * 装饰者模式 AOP 
 * @param {Object} beforefn
 */

// 在函数之前
Function.prototype.before = function (beforefn) {

	var _self = this;
	return function () {
			debugger;
		if(beforefn.apply(this, arguments) === false) {
			return;
		}

		return _self.apply(this, arguments);
	};
};
//在函数之后
Function.prototype.after = function (afterfn) {
	var _self = this;
	return function () {
		var ret = _self.apply(this, arguments);
		afterfn.apply(this, arguments);
		return ret;

	};

};