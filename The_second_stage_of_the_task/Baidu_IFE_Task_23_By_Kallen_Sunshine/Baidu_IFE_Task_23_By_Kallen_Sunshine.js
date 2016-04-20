
/**
 * 初始所需要数据
 */
var AryTree = [],
    Traver = document.getElementById("BTNtraver"),
    root = document.querySelector(".contain"),
    SeekTree = document.getElementById("BTNSeek");


/**
 * 绑定事件
 */
Traver.addEventListener("click", function() {
    ClearAllColor ();
    Traversal(root);
    animation();
});
SeekTree.addEventListener("click", function(){
    ClearAllColor ();
    Traversal(root);
    SeekTraver();
})


/**
 * 递归遍历
 */
function Traversal(node) {
    AryTree.push(node);
    for (var i = 0; i < node.children.length; i++) {
            Traversal(node.children[i]);
        }
};


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
 * 清除所有的颜色以及数组数据
 */
function ClearAllColor () {
    for (var i = 0; i < AryTree.length; i++) {
        AryTree[i].style.backgroundColor = "#FFFFFF";
    }
    AryTree.splice(0,AryTree.length);
}
