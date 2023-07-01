import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useField } from 'formik';
import classNames from 'classnames';
import IMask from 'imask';
import { useEffect, useState } from 'react';

const PhoneField = ({placeholder,label, ...props}) => {

    const [field, meta] = useField(props);
    const [mask, setMask] = useState();

    useEffect(() => {
        var element = document.getElementsByClassName('phoneNumber')[0];
        var maskOptions = {
        mask: '+{38} (000) 000 00 00'
        };
        var mask = IMask(element, maskOptions);
        setMask(mask);
    }, []);

    return (<>
        <div className="form-group">
            <label htmlFor={props.name || props.id}>{label}</label>
            <input {...field} {...props} placeholder={placeholder} 
            className={classNames("phoneNumber","form-control", {"is-valid": (!meta.error && meta.touched)},
             {"is-invalid": (meta.error && meta.touched)})}/>

             {meta.error && <div className="invalid-feedback">
                 {meta.error}
                 </div>}
        </div>
        
         
    </>);
}

export default PhoneField;