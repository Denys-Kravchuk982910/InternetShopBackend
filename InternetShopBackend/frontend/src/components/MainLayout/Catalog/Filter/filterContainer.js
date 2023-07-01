
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useEffect, useState } from 'react';
import { Checkbox, Row, Col } from "antd";
import { addFilter, removeFilter } from '../../../../redux/reducers/filterReducer';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';
const FilterContainer = ({ title, argumentsFilter }) => {

    const [isActive, setActive] = useState(false);
    const dispatch = useDispatch();


    const onCheckedItem = (e) => {
        let item = e.target;
        if(item.checked) {
            dispatch(addFilter(item.value));
        }else {
            dispatch(removeFilter(item.value));
        }
    }

    const filters = useSelector(filter=> filter.filter);

    const onListParentHover = (e) => {
        var item = e.target.closest(".list-parent").querySelector(
            ".list-parent-inner"
        );

        item.style.borderBottom = "1px solid black";
        item.style.transition = "border-bottom 0.3s ease";
    }

    const onListParentLeave = (e) => {
        var item = e.target.closest(".list-parent").querySelector(
            ".list-parent-inner"
        );

        item.style.borderBottom = "0px solid black";
        item.style.transition = "";
    }

    const onClickHandler = (e) => {
        if (isActive) {
            var item = e.target.closest(".list-parent").querySelector(
                ".list-parent-inner"
            );

            let arrow = e.target.closest(".list-parent").querySelector(
                ".arrow-rotate"
            );
            arrow.style.transform = "rotate(0deg)";
            arrow.style.transition = "transform 0.3s ease";

            item.style.borderBottom = "0px solid black";
            item.style.transition = "";
        } else {
            var item = e.target.closest(".list-parent").querySelector(
                ".list-parent-inner"
            );

            let arrow = e.target.closest(".list-parent").querySelector(
                ".arrow-rotate"
            );
            arrow.style.transform = "rotate(90deg)";
            arrow.style.transition = "transform 0.3s ease";

            item.style.borderBottom = "1px solid black";
            item.style.transition = "border-bottom 0.3s ease";
        }

        setActive(!isActive);
    }
    return (<>
        <div className='filter-container'>
            <span className='list-parent' onClick={onClickHandler}
                onMouseEnter={onListParentHover}
                onMouseLeave={onListParentLeave}><span className='list-parent-inner'>{title}</span>
                <ArrowForwardIosIcon className='arrow-rotate' /></span>
            <span className='filter-underlying'></span>

            
        </div>

         <div
            className={classNames("ch-group", {"d-block":isActive}, {"d-none":!isActive})}

        >
            <div  style={{
                        width: '100%',
                    }}>
                
                
                    {argumentsFilter.map((item, index) => {
                        let isChecked = filters.includes(item.id);

                        
                        return (<div key={item.id + index} className='container-check'>
                            <Checkbox value={item.id}
                                checked={isChecked}
                                onChange={onCheckedItem}
                            >{item.title}</Checkbox>

                        </div>);
                    })}

                </div>
            </div>
        </>
    );
}

export default FilterContainer;