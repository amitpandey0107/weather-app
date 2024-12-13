import React, {useState, useEffect} from 'react';
import './home.css';
import Header from '../header/header';
import Weather from '../weather/weather';
export default function Home() {
    const [data, setData] = useState([])
    const fetchData = async () => {
        try {
            await fetch('https://api.weatherapi.com/v1/current.json?key=2d8b7cd9b6384c9aa6a21957241312&q=paris')
            .then((res)=>{
                return res.json()
            })
            .then((res)=>{
                if(res) {
                    console.log(res)
                    let r = data;
                    r.push(res)
                    localStorage.setItem('allData', JSON.stringify(r))
                    setData(res)
                }
            })
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        fetchData()
    }, [])

    console.log({
        DATA:data,
        localStorage:JSON.parse(localStorage.getItem("allData"))
    })
    return (
        <div className='main'>
            <Header />

            <Weather data={data} />
        </div>
    )
}