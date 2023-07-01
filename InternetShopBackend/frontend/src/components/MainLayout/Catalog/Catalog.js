import Card from './../Main/Card';
import {Row, Col} from "antd";
import More from './More';
import Filter from './Filter';
import { useEffect, useState } from 'react';
import axiosService from '../../../axios/axiosService';
import { useDispatch, useSelector } from 'react-redux';
import { BACKEND_URL } from '../../../constants/default';
import { increment, setNullItem } from '../../../redux/reducers/pageReducer';


const Catalog = () => {
    const dispatch = useDispatch();
    const onOpenFilter = (e) => {
        setOpenMobileFilter(!openMobileFilter);

        let root = document.documentElement;
        root.style.overflow = openMobileFilter ? 'auto' : 'hidden';


        let item = document.getElementsByClassName("open-mobile")[0];
        item.style.transition = 'opacity 0.3s ease';
        item.style.opacity = openMobileFilter ? 0 : 1;
        
    }

    const [openMobileFilter, setOpenMobileFilter] = useState(false);
    const page = useSelector(page => page.page);
    const filters = useSelector(filter => filter.filter);
    const [products, setProducts] = useState([]);


    const fillProducts = async () => {
        let count = (await axiosService.getProductCountByFilter({
            skipped: page-1,
            keys: filters
        })).data;
        if (count != products.length || page-1 == 0) {
            
            let result = await axiosService.setProductFilter({
                skipped:
                page-1, 
                keys: filters
            });

            if(page-1 == 0) {
                setProducts([...result.data]);
            }
            else {
                setProducts([...products, ...result.data]);
            }

        }
    }

    const incrementFunction = async() => {
        let count = (await axiosService.getProductCount()).data;

        if (count > products.length) {
            dispatch(increment());
        }
    }

    const onClickEvent = () => {
        incrementFunction();
    }

    useEffect(() => {
        let item = document.getElementsByClassName("custom-row")[0];
        let filter = document.getElementsByClassName("filter")[0];
        filter.style.height = (item.clientHeight-100) + "px";
        return () => {
            let root = document.documentElement;
            root.style.overflow = 'auto';
        };
    }, []);

    useEffect(() => {
        fillProducts();
    },[page])

    useEffect(() => {
        window.scrollTo(0,0);
        fillProducts();
        dispatch(setNullItem());
    }, [filters]);

    return (<>
        <Row className='filter-button'>
            <Col md={24} className='filter-btn-col'>
                <span className='filter-btn-text' onClick={onOpenFilter}>Фільтр</span>
            </Col>
        </Row>
        <Row>
            <Col lg={6} xs={0}>
                <Row>
                    <Col offset={3} xs={18}>
                        <Filter/>
                    </Col>
                </Row>
            </Col>

            <Col lg={18} xs={24}>
                <Row className='custom-row'>
                <Col md={24}>
                <Row className='goods-filter'>
                    {products.map((element, index) => {
                        return (<Col key={index+"catalogitems" + index} xl={8} lg={12} md={12} xs={24} sm={12}>
                            <Card id={element.id} title={element.title} brand={element.brand} image={BACKEND_URL + "images/" + element.images[0].image} price={element.price} />
                        </Col>);
                    })}                    
                </Row>
                
                <More text={"Дивитися більше"} onClickEvent={onClickEvent}/>
            </Col>


                </Row>
                
            </Col>
        </Row>
        
        <div className='open-mobile'>

            {openMobileFilter &&
                <div className='container-filter'>

                    <div className="container-filter-inner">
                        <Row>
                            <Col offset={3} xs={18}>
                                <Filter />
                            </Col>
                        </Row>
                    </div>
                </div>}
        </div>
    </>)
}

export default Catalog;