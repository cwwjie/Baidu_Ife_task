
/**
 * 初始所需要数据
 */
var Traver = document.getElementById("BTNtraver"),
    root = document.querySelector(".contain"),
    SeekTree = document.getElementById("BTNSeek"),
    AddTree = document.getElementById("AddSeek"),
    DeleteTree = document.getElementById("DeleteSeek");

/**
 * 渲染表格储存的数据
 */
var AryTree = [],
    SelectTree = Number();


/**
 * 绑定事件
 */
Traver.addEventListener("click", function() {
    ShowAllDiv();
    ClearAllColor();
    Traversal(root);
    animation();
});
SeekTree.addEventListener("click", function(){
    ShowAllDiv();
    ClearAllColor();
    Traversal(root);
    SeekTraver();
});
root.addEventListener("click", function (event) {
    ClearAllColor();
    Traversal(root);
    Selected(event);
});
AddTree.addEventListener("click", function (event) {
    AddTraver();
})
DeleteTree.addEventListener("click", function (event) {
    DeleteTraver();
})


/**
 * 清除所有的颜色以及数组数据 以及显示所有DIV
 */
function ClearAllColor(){
    for (var i = 0; i < AryTree.length; i++) {
        AryTree[i].style.backgroundColor = "#FFFFFF";
    }
    AryTree.splice(0,AryTree.length);
    SelectTree = 0; 
}
function ShowAllDiv () {
    var ShowDiv = root.getElementsByTagName("div");
    for (var j = 0; j < ShowDiv.length; j++) {
        ShowDiv[j].style.display = "block";
    }}


/**
 * 递归遍历并自执行
 */
function Traversal(node) {
    AryTree.push(node);
    for (var i = 0; i < node.children.length; i++) {
        Traversal(node.children[i]);
    }
}Traversal(root);



/**
 * 渲染动画
 */
function animation() {
    var stack   = AryTree,
        iter    = 0,
        self    = this,
        timer;

    stack[iter].style.backgroundColor = "#2196f3";
    timer = setInterval(function() {
        if(iter == stack.length-1) {
            stack[iter].style.backgroundColor = "#FFFFFF";
            clearInterval(timer);
        } else {
            ++iter;
            stack[iter-1].style.backgroundColor = "#FFFFFF";
            stack[iter].style.backgroundColor = "#2196f3";
        }
    }, 150);
};


/**
 * 遍历并且渲染
 */
function SeekTraver(){
    var SeekValue = document.getElementById("SeekValue").value.trim();
    if (!SeekValue){
        alert("请输入查询词");
    }else {
        var Delete = 0;
        for (var i = 0; i < AryTree.length; i++) {
            var CheckData = AryTree[i].firstChild.textContent.trim()
            if (CheckData==SeekValue){
                Delete = i;
                break;
            }
        }
        if (!Delete == 0){
            AryTree.splice(Delete+1,AryTree.length-Delete);
            var stack   = AryTree,
                iter    = 0,
                self    = this,
                timer;
            stack[iter].style.backgroundColor = "#2196f3";
            timer = setInterval(function() {
                if(iter == stack.length-1) {
                    stack[iter].style.backgroundColor = "red";
                    clearInterval(timer);
                } else {
                    ++iter;
                    stack[iter-1].style.backgroundColor = "#FFFFFF";
                    stack[iter].style.backgroundColor = "#2196f3";
                }
            }, 50);
        }else {
            var stack   = AryTree,
                iter    = 0,
                self    = this,
                timer;
            stack[iter].style.backgroundColor = "#2196f3";
            timer = setInterval(function() {
                if(iter == stack.length-1) {
                    stack[iter].style.backgroundColor = "#FFFFFF";
                    alert("找不到查询词，请重新输入");
                    clearInterval(timer);
                } else {
                    ++iter;
                    stack[iter-1].style.backgroundColor = "#FFFFFF";
                    stack[iter].style.backgroundColor = "#2196f3";
                }
            }, 50);
        }
    }
}


/**
 * 点击某个节点元素
 */
function Selected (event) {
    for (var i = 0; i < AryTree.length; i++) {
        var CheckData = AryTree[i].firstChild.textContent.trim();
        if (AryTree[i] = event.target) {
            AryTree[i].style.backgroundColor = "#81c784";
            SelectTree = AryTree[i];
        }else {
            AryTree[i].style.backgroundColor = "#FFFFFF";
        }
    }
    var EveElement = event.target,
        SelChild = EveElement.getElementsByTagName("div");//搞了好久啊啊，原来是这样获取所有子元素的啊，妈蛋
    for (var j = 0; j < SelChild.length; j++) {             //但是有BUG好烦、
        if (SelChild[j].style.display=="none") {
            SelChild[j].style.display="block";
        }else {
            SelChild[j].style.display="none";
        }
    }
}


/**
 * 添加某个元素
 */
function AddTraver (event) {
    if (SelectTree == 0) {
        alert("请点击要添加/删除的元素");
    }else {
        var AddEle = document.getElementById("AddValue").value.trim();
        if (AddEle==0) {
            alert("请输入要添加/删除的元素");
        }else {
            var CreTraEle = document.createElement("div");
            CreTraEle.textContent = AddEle;
            SelectTree.appendChild(CreTraEle);
            
        }
    }
}


/**
 * 删除某个元素
 */
function DeleteTraver (event) {
    if (SelectTree == 0) {
        alert("请点击要添加/删除的元素");
    }else {
        SelectTree.parentNode.removeChild(SelectTree);//+_+删除自己可以这样删除的，真是神奇
    }
}
