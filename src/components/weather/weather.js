import React, { useEffect, useState } from 'react';
import './weather.css';
import Modal from 'react-bootstrap/Modal';
export default function Weather(props) {
    const [locData, setLocData] = useState()
    const [show, setShow] = useState(false);
    const [newcity, setNewcity] = useState('');
    const [data, setData] = useState([]);
    const [flag, setFlag] = useState('')

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    useEffect(() => {
        if (props?.data) {
            setLocData(props?.data)
        }
    }, [props?.data])

    const handleChange = (e) => {
        setNewcity(e.target.value)
    }

    // GET DAY FROM DATE
    const dateFormat = (date) => {
        const weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
        const d = new Date(date);
        let day = weekday[d.getUTCDay()];
        return day;
    }

    // UPDATE DATE FORMAT
    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [month, day, year].join('/');
    }


    const fetchData = async (city) => {
        try {            
            let url = `https://api.weatherapi.com/v1/current.json?key=2d8b7cd9b6384c9aa6a21957241312&q=${city.toLowerCase()}`
            await fetch(url)
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                if(res) {
                    console.log({
                        "RES":res
                    })
                    // let r = data;
                    // r.push(res)
                    // localStorage.setItem('allData', JSON.stringify(r))
                    // setData(res)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    // Add New City
    const handleAddNewCity = () => {
        setFlag(newcity)
    }

    useEffect(()=> {
        fetchData(flag)
    }, [flag])

    console.log({
        HEREDATA: data
    })
    return (
        <>
            <section className='content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-sm-12 col-md-12 col-lg-12 flexBox'>
                            <div className='weatherBox'>
                                <div className='cityWrap'>
                                    <div className='sunLogo'>
                                        <img src='./images/sun.svg' alt='sun' />
                                    </div>
                                    <div className='city'>
                                        <h2>{locData?.location?.region}, {locData?.location?.country}</h2>
                                        <h5>{dateFormat(locData?.current?.last_updated)}, {formatDate(locData?.current?.last_updated)}</h5>
                                    </div>
                                </div>
                                <div className='tempBox'>
                                    <div className='top'>
                                        <span className='temp'>{locData?.current?.temp_c}
                                            <sup className='unit'>&deg;C</sup>
                                        </span>
                                    </div>
                                    <div className='bottom'>Mostly cloudy</div>
                                </div>
                                <div className='infoRow'>
                                    <div className='left'>
                                        <span>Visibility</span>
                                        <span>{locData?.current?.vis_km}KM</span>
                                    </div>
                                    <div className='right'>
                                        <span>Feels like </span>
                                        <span>{locData?.current?.feelslike_c} &deg;C</span>
                                    </div>
                                </div>
                                <div className='infoRow'>
                                    <div className='left'>
                                        <span>Humidity</span>
                                        <span>{locData?.current?.humidity}</span>
                                    </div>
                                    <div className='right'>
                                        <span>Wind</span>
                                        <span>{locData?.current?.wind_kph}KPH</span>
                                    </div>
                                </div>
                            </div>

                            <div className='addMore'>
                                <div className='middle'>
                                    <button className='btnPlus' onClick={handleShow}>
                                        <img src='./images/plus.svg' slt="plus" />
                                    </button>
                                    <h6>Add new location</h6>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Modal
                show={show}
                onHide={handleClose}
                backdrop="static"
                keyboard={false}
                className='cityModal'
            >
                <div className='modelContent'>
                    <button className='btnClose' onClick={handleClose}>
                        <img src='./images/close.svg' alt="close" />
                    </button>
                    <h2>Add New City</h2>
                    {/* <form> */}
                        <div className='formControl'>
                            <input
                                type="text"
                                name='city'
                                id='city'
                                placeholder='Enter new City'
                                onChange={handleChange}
                                value={newcity}
                            />
                        </div>
                        <div className='formControl'>
                            <button onClick={handleAddNewCity}>Add</button>
                        </div>
                    {/* </form> */}
                </div>
            </Modal>

        </>

    )
}