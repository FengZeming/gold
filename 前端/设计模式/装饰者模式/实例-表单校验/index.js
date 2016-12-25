var oName = document.getElementById("js_name");
var oPass = document.getElementById("js_pass");
var oBtnSub = document.getElementById("js_btn_sub");

function valid() {
	if(!oName.value.length) {
		return false;
	}

	if(!oPass.value.length) {
		return false;
	}

}

function onSub() {
	alert('提交');

}

onSub = onSub.before(valid);

oBtnSub.onclick = function () {
	onSub();
}