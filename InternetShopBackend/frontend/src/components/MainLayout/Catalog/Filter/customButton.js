import { Checkbox } from "antd";
import "./style/filter.css"
import React from "react";

const CustomButton = ({text, type="button"}) => {

    const onClick =()=> {
        //ant-checkbox-input
        let items = document.getElementsByClassName("ant-checkbox-input");
        
        
        for (var i = 0; i < items.length; i++) {
            if(items[i].checked) {
                let item = items[i].closest(".ant-checkbox-wrapper-checked");
                item.click();
            }
        }
    }

    return (<>
        <button onClick={onClick} className="button-49" type={type} role="button"><span className="text">{text}</span></button>
    </>);
}

export default CustomButton;
