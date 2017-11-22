/**
*一些看似有点用的方法~
*
*基本只对输入框类型的标签有用，input、password、textarea等
*/

//获取当前鼠标指针在输入框文本中的位置
    getCursorPosition(){
        var oTxt1 = document.getElementById("formula-Content");
        var cursurPosition=0;
        if(oTxt1.selectionStart){//非IE浏览器
        cursurPosition= oTxt1.selectionStart;
        }else{//IE
            if(document.selection){
                var range = document.selection.createRange();
                range.moveStart("character",-oTxt1.value.length);
                cursurPosition=range.text.length;
            }
        }
        // alert(cursurPosition);
        return cursurPosition
    }
	
	
	
	
	
    //获取选中的文字
    getSelectText(editor) {
        if (!editor) return; editor.focus();
        if (editor.document && editor.document.selection)
            return editor.document.selection.createRange().text; 
        else if ("selectionStart" in editor)
            return editor.value.substring(editor.selectionStart, editor.selectionEnd); 
    }
	
    // 设置光标位置
    setCaretPosition(ctrl, pos){
        console.log('in',ctrl,pos)
        if(ctrl.setSelectionRange)
        {
            ctrl.focus();
            ctrl.setSelectionRange(pos,pos);
        }
        else if (ctrl.createTextRange) {
            var range = ctrl.createTextRange();
            range.collapse(true);
            range.moveEnd('character', pos);
            range.moveStart('character', pos);
            range.select();
        }
    }
}
