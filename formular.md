## 公式参数说明：

参数 | 说明	| 类型	| 可选	| 默认
---|---|---|---|---
formularSelects | 公式框筛选select	| [] | 是 | 
formularLeftDatas | 公式左侧数据 | [] | 是 | 无	
formularRightDatas | 公式右侧数据| [] | |
wrapType	| 单个变量用什么方式来包裹 | string ："{}"| 是 | 无

## 公式参数说明：

 // 设置光标位置
```setCaretPosition(ctrl, pos){
        console.log(ctrl,pos,'inin')
        
        if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }else{
            var st = setTimeout(function(){
                clearTimeout(st);
                     //设置光标需要到的位置
                     ctrl.setSelectionRange(pos,pos);
            },0);
            // ctrl.setSelectionRange(pos,pos);
            // ctrl.focus();
        }
    }
```
需要将setSelectionRange(pos,pos)这个操作放在一个setTimeout函数中才有效果