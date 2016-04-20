
/**
 * 初始所需要数据
 */
var BinaryTree = [],
    btns       = document.querySelectorAll("input"),
    preBtn     = btns[0],
    inBtn      = btns[1],
    postBtn    = btns[2],
    root       = document.querySelector(".root");


/**
 * 绑定事件
 */
preBtn.addEventListener("click", function() {
    BinaryTree.splice(0,BinaryTree.length);
    preOrder(root);
    animation();
});
inBtn.addEventListener("click", function() {
    BinaryTree.splice(0,BinaryTree.length);
    inOrder(root);
    animation();
});
postBtn.addEventListener("click", function() {
    BinaryTree.splice(0,BinaryTree.length);
    postOrder(root);
    animation();
});


/**
 * 前序遍历
 */
function preOrder(node) {
    BinaryTree.push(node);
    if(node.firstElementChild) {
        this.preOrder(node.firstElementChild);
    }
    if(node.lastElementChild) {
        this.preOrder(node.lastElementChild);
    }
};


/**
 * 中序遍历
 */
function inOrder(node) {
    if(node.firstElementChild) {
        this.inOrder(node.firstElementChild);
    }
    BinaryTree.push(node);
    if(node.lastElementChild) {
        this.inOrder(node.lastElementChild);
    }
}


/**
 * 后序遍历
 */
function postOrder(node) {
    if(node.firstElementChild) {
        this.postOrder(node.firstElementChild);
    }
    if(node.lastElementChild) {
        this.postOrder(node.lastElementChild);
    }
    BinaryTree.push(node);
};


/**
 * 渲染动画
 */
function animation() {
    var stack   = BinaryTree,
        speeder = document.querySelector("#speeder"),
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
    }, speeder.value);
};
