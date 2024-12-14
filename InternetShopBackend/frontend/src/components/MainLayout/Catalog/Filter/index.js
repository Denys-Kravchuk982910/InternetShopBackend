/* eslint-disable no-unused-vars */
import { useState } from 'react';
import CustomButton from './customButton';
import FilterContainer from './filterContainer';
import './style/filter.css'

const Filter = () => {

    const [filter, setFilter] = useState(
        [
            {
                id: 2,
                title: "Стать",
                children: [
                    {
                        title: "Чоловіча",
                        id: 7
                    },
                    {
                        title: "Жіноча",
                        id: 8
                    }
                ]
            },
            {
                id: 3,
                title: "Бренд",
                children: [
                    {
                        title: "Puma",
                        id: 9
                    },
                    {
                        title: "Adidas",
                        id: 10
                    },
                    {
                        title: "Nike",
                        id: 11
                    }
                ]
            },
            {
                id: 4,
                title: "Розмір",
                children: [
                    {
                        title: "36",
                        id: 13
                    },
                    {
                        title: "37",
                        id: 14
                    },
                    {
                        title: "38",
                        id: 15
                    },
                    {
                        title: "39",
                        id: 16
                    },
                    {
                        title: "40",
                        id: 17
                    },
                    {
                        title: "41",
                        id: 18
                    },
                    {
                        title: "42",
                        id: 19
                    },
                    {
                        title: "43",
                        id: 20
                    },
                    {
                        title: "44",
                        id: 21
                    },
                    {
                        title: "45",
                        id: 22
                    },
                    {
                        title: "46",
                        id: 23
                    },
                    {
                        title: "47",
                        id: 24
                    },
                    {
                        title: "48",
                        id: 25
                    }
                ]
            },
            {
                id: 5,
                title: "Колір",
                children: [
                    {
                        title: "Чорний",
                        id: 12
                    }
                ]
            },
            {
                id: 6,
                title: "Ціна",
                children: []
            }
        ]
    );

    // const initFilters = async () => {
    //     let filters = await axiosService.getInitFilters(1);
    //     setFilter([...filters]);
    // }

    // useEffect(() => {
    //     initFilters();
    // }, []);

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