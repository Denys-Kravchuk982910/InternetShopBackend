import { UserOutlined } from '@ant-design/icons';
import { Input } from 'antd';
import { useField } from 'formik';
import classNames from 'classnames';

const Field = ({placeholder,label, ...props}) => {

    const [field, meta] = useField(props);

    return (<>
        <div className="form-group">
            <label htmlFor={props.name || props.id}>{label}</label>
            <input {...field} {...props} placeholder={placeholder} 
            className={classNames("form-control", {"is-valid": (!meta.error && meta.touched)},
             {"is-invalid": (meta.error && meta.touched)})}/>

             {meta.error && <div className="invalid-feedback">
                 {meta.error}
                 </div>}
        </div>
        
         
    </>);
}

export default Field;