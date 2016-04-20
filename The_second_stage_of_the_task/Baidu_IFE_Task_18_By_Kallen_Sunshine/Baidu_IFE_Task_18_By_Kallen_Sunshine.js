function AddControlEventListener () {
var Button = document.getElementsByName("ControlBTN");
for (var i = 0; i < 4; i++) {
	Button[i].addEventListener("click", function(event) {
		InsertNumber(event);
	});} 
}
function InsertNumber(event) {
	var DivTextContent = document.getElementById("InputTextContent");
	DivTextContent.select();
	if (DivTextContent.value == 0) {
		alert("请输入数值");
		return;
	}else {
		var ControlDiv = document.getElementById("Control");
		var OutputElement = document.getElementById("Output");
		var DIV = document.createElement("div");
		DIV.textContent = DivTextContent.value;
		if (event.target == ControlDiv.children[2]) {
			OutputElement.insertBefore(DIV,OutputElement.firstChild);
		}else if (event.target == ControlDiv.children[3]) {
			OutputElement.appendChild(DIV);
		}else if (event.target == ControlDiv.children[4]){
			var AlertMessage = OutputElement.children[0].textContent;
			alert(AlertMessage);
			OutputElement.removeChild(OutputElement.children[0]);
		}else if (event.target == ControlDiv.children[5]){
			var NumberPlace = OutputElement.children.length - 1;
			var AlertMessage = OutputElement.children[NumberPlace].textContent;
			alert(AlertMessage);
			OutputElement.removeChild(OutputElement.children[NumberPlace]);
		}
		DIV.addEventListener("click",function (event){event.srcElement.parentElement.removeChild(event.srcElement)});
	}
}
window.onload=function(){AddControlEventListener()}
