import React, {useState, useEffect} from 'react';
import {fetchDailyData} from '../../api';
import {Bar, Line} from 'react-chartjs-2';

import styles from './Chart.module.css';

const Chart = ({data: {confirmed, recovered, deaths}, country}) => {
    const [dailyData, setDailyData] = useState({});

    useEffect(()=>{
        const fetchAPI = async () => {
           const initialDailyData = await fetchDailyData();

           setDailyData(initialDailyData);
        }
        fetchAPI();
    }, []);

    const barChart = (
        confirmed
        ?(
           <Bar 
               data={{
                   labels: ['Infected', 'Recovered', 'Deaths'],
                   datasets: [
                       {
                        label: 'People',
                        backgroundColor: ['#2ecc71', '#3498db', '#e74c3c'],
                        data:[ confirmed.value, recovered.value, deaths.value],
                       },
                ],
               }}

               options = {{
                   legend: {display: false},
                   title: {display: true, text: `Current situation in ${country}`},
               }}
           />
           
        ): null
    )     

    const lineChart = (
        dailyData.length
        ?(
            <Line
                data = {{
                    labels: dailyData.map(({date})=> date),
                    datasets: [{
                        data: dailyData.map(({confirmed})=> confirmed),
                        label: 'Infected',
                        borderColor: '#3498db',
                        fill: true,
                    }, {
                        data: dailyData.map(({deaths})=> deaths),
                        label: 'Deaths',
                        borderColor: '#c0392b',
                        backgroundColor: '#e74c3c',
                        fill: true,
                    }],
                }}
                options = {{
                    legend: {
                        labels: {
                            fontColor: '#fff'
                        }
                    },
                    
                    scales: {
                        xAxes: [{
                            ticks: {
                                fontColor: '#fff'
                            },
                        }],

                        yAxes: [{
                            ticks: {
                                fontColor: '#fff'
                            },
                        }]
                    }
                }}

             
            />
        ) : null
    );  
      
    return(
        <div className = {styles.chart}>
            {!country ? lineChart : barChart}
        </div>
    )
}


export default Chart;