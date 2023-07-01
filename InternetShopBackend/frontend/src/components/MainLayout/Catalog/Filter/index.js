import { useEffect, useState } from 'react';
import CustomButton from './customButton';
import FilterContainer from './filterContainer';
import './style/filter.css'
import axiosService from '../../../../axios/axiosService';

const Filter = () => {

    const [filter, setFilter] = useState([]);
    const initFilters = async () => {
        let filters = await axiosService.getInitFilters(1);
        setFilter([...filters]);
    }

    useEffect(() => {
        initFilters();
    }, []);

    return (
        <div className='filter'>
            <h2>Фільтр</h2>
            {filter.map((el, index) => {
                return (
                <FilterContainer key={"filterParameter" + index} title={el.title} argumentsFilter={[
                    ...el.children
                ]}/>);
            })}
            

            <CustomButton text="Скинути всі фільтри"/>
        </div>
    );
}

export default Filter;