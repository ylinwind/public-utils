/**
 * 新建统计项目弹出框
 */
import React from 'react';
import { WeaDialog , WeaFormItem , WeaInput , WeaTextarea ,WeaTransfer} from 'ecCom';
import { Table , Button ,Icon} from 'antd';
import FomularComs from './fomularComs';

export default class Formular extends React.Component{
    constructor(props){
        super(props);
        this.state={
            selectedKeys: [1,2],
            computedIcon : ["+","－",">","≥","=","(",")","×","÷","<","≤","≠","%","←"],
            cursurIndex:0,
            areaVal:"",
            areaSelectVal:'',//多行文本选中的文本值
            isFormular:0,
            fomularIndex:0
        }
    }
    render(){
        let _this = this;
        
        const { countModalShow , onChange , formularSelects , formularRightDatas ,formularLeftDatas, wrapType} =this.props;
        const { selectedKeys , computedIcon , areaVal ,cursurIndex} =this.state;
        
        return(
                <div>
                {/* 公式 */}
                    <WeaFormItem 
                        label="公式"
                        labelCol={{span:24 }}
                        wrapperCol={{span:0}}>
                    </WeaFormItem>
                    <WeaFormItem 
                        label="公式area"
                        labelCol={{span:0 }}
                        wrapperCol={{span:24}}>
                        <div 
                            
                            style={{
                            height:"68px",
                            border:"1px solid #E2E2E2",
                            position:"relative"}}>
                            <WeaTextarea 
                                fieldName="formula_Content"
                                style={{
                                    width:"70%",
                                    height:"100%"
                                }}
                                value={areaVal}
                                onChange={(v)=>{
                                    // console.log(v,areaVal,'------')
                                    let index = v.length>areaVal.length?cursurIndex+1:cursurIndex-1;
                                    this.setState({
                                        areaVal:v,
                                        cursurIndex:index
                                    })
                                }}
                            />
                            {/* 计算符 */}
                            <div style={{
                                position:"absolute",
                                width:"28%",
                                top:0,
                                bottom:0,
                                right:"6px",
                                paddingBottom:"6px"
                            }}>
                                {computedIcon.map(function(item,index){
                                    return (
                                        <Button 
                                            type="ghost" 
                                            title={item} 
                                            size="small"
                                            style={{marginLeft:"6px",width:"25px",height:"24px"}}
                                            onClick={_this.formularClick.bind(this,index)}
                                        >
                                            {item}
                                        </Button>
                                    )
                                })
                                }
                            </div>
                        </div>
                    </WeaFormItem>
                {/* 双击选中流程数据和统计函数到公式框 */}
                <WeaFormItem 
                    label="双击选中流程数据和统计函数到公式框"
                    labelCol={{span:24 }}
                    wrapperCol={{span:0}}>
                </WeaFormItem>
                <WeaFormItem 
                    label="公式框"
                    labelCol={{span:0 }}
                    wrapperCol={{span:24}}>
                    <div style={{overflow:"auto"}}>
                        <div style={{float:"left",width:"45%"}}>
                            <FomularComs 
                                datas={formularLeftDatas}
                                filterOptions={formularSelects}
                                DoubleClick={this.doubleClickLeft}/>
                        </div>
                        <div style={{float:"right",width:"45%"}}>
                            <FomularComs 
                                style={{display:"none"}}
                                datas={formularRightDatas}
                                filterOptions={formularSelects}
                                DoubleClick={this.doubleClickRight}/>
                        </div>
                    </div>
                    
                </WeaFormItem>
                </div>
        )
    }
    componentDidMount(){
        let _this = this;
        // 给公式textarea点击事件委托到document，点击获取当前点击位置
        jQuery(function(){
            jQuery(document).delegate("#formula_Content","select",function(){
                var text = _this.getSelectText(this);
                _this.setState({
                    areaSelectVal:text
                })
            })
            //公式区域
            jQuery(document).delegate("#formula_Content","click",function(){
                let index = _this.getCursorPosition();
                // let index2 = _this.state.cursurIndex;
                // console.log(index2,'222')
                _this.setState({
                    cursurIndex:index
                })
            })
            // _this.setCaretPosition(jQuery("#formula_Content"),index);
            console.log(jQuery("#formula_Content"),document.getElementById("formula_Content"),'--')
            // _this.setCaretPosition(jQuery("#formula_Content"),cursurIndex);
        })
    }
    doubleClickLeft=(v)=>{
        // 
        const { cursurIndex , areaSelectVal} =this.state;
        const { wrapType } = this.props;
        let val = this.state.areaVal;
        let index = this.state.cursurIndex;
        if(!val){
            console.log('is null');
            val = "={"+ v +"}";
            index = v.length+3;
        }else{
            console.log("not null")
            let val_1 = val.substring(0,index);
            let val_2="";
            if(areaSelectVal!=""){
                val_2 = val.substring(index+areaSelectVal.length,val.length);
            }else{
                val_2 = val.substring(index,val.length);
            }
            val = val_1+"{"+v+"}"+val_2;
            index = val_1.length+v.length+2;
        }
        this.setCaretPosition(jQuery("#formula_Content")[0],index)
        this.setState({
            areaVal:val,
            cursurIndex:index,
            areaSelectVal:""
        })
    }
    doubleClickRight=(v)=>{
        // 
        const { cursurIndex  , areaVal , areaSelectVal} =this.state;
        const { wrapType } = this.props;
        let val = this.state.areaVal;
        let index = this.state.cursurIndex;
        if(!val){
            console.log('is null');
            val = "="+ v +"()";
            index = v.length+2;
        }else{
            console.log("not null")
            let val_1 = val.substring(0,index);
            let val_2 = "";
            if(areaSelectVal!=""){
                val_2 = val.substring(index+areaSelectVal.length,val.length);
            }else{
                val_2 = val.substring(index,val.length);
            }
            val = val_1+v+"()"+val_2;
            index = val_1.length+v.length+1;
        }
        this.setCaretPosition(jQuery("#formula_Content")[0],index)
        this.setState({
            areaVal:val,
            cursurIndex:index,
            areaSelectVal:""
        })
    }
    formularClick=(index)=>{
        const {  computedIcon , cursurIndex ,areaSelectVal} =this.state;
        let val = this.state.areaVal;
        let pointindex = this.state.cursurIndex;

        if(!val){
            if(index==13){return}
            val = "="+ computedIcon[index];
            pointindex = pointindex+2;
        }else{
            let val_1="",val_2="";
            if(index==13){
                if(areaSelectVal!=""){
                    val_1 = val.substring(0,cursurIndex);
                    val_2 = val.substring(cursurIndex+areaSelectVal.length,val.length);
                }else{
                    val_1 = val.substring(0,cursurIndex-1);
                    val_2 = val.substring(cursurIndex,val.length);
                    pointindex = pointindex-1;
                }
                val = val_1+val_2;
            }
            else{
                val_1 = val.substring(0,cursurIndex);

                if(areaSelectVal!=""){
                    val_2 = val.substring(cursurIndex+areaSelectVal.length,val.length);
                }else{
                    val_2 = val.substring(cursurIndex,val.length);
                }
                pointindex = pointindex+1;
                val = val_1+computedIcon[index]+val_2;
            }
        }
        // this.setCaretPosition(document.getElementById("formula_Content"),pointindex)
        // var st = setTimeout(function(){
        //     clearTimeout(st);
        //          //设置光标需要到的位置
        //         formula_Content.setSelectionRange(pointindex,pointindex);
        // },0);
        this.setCaretPosition(jQuery("#formula_Content")[0],pointindex)
        this.setState({
            areaVal:val,
            cursurIndex:pointindex,
            areaSelectVal:""
        })
    }
    //获取当前鼠标指针在输入框文本中的位置
    getCursorPosition(){
        var oTxt1 = document.getElementById("formula_Content");
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
}
