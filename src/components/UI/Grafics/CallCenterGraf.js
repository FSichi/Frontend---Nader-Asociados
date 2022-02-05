import React from 'react'
import Chart from 'chart.js/auto'
import { Bar } from 'react-chartjs-2'
import { contarCallCenter } from '../../../helpers/CallCenterGrafic';

export const CallCenterGraf = ({ clientes }) => {

    const callCenterFilter = contarCallCenter(clientes);

    const tp = callCenterFilter[0];
    const at = callCenterFilter[1];
    const ag = callCenterFilter[2];

    const data = {
        labels: [ ''],
        datasets: [
            {
                label: 'TELEPERFORMANCE',
                data: [tp],
                backgroundColor: 'lightseagreen',
                borderColor: 'lightseagreen',
                borderWidth: 1
            },
            {
                label: 'AEGIS',
                data: [at],
                backgroundColor: 'deepskyblue',
                borderColor: 'deepskyblue',
                borderWidth: 1
            },
            {
                label: 'ATENTO',
                data: [ag],
                backgroundColor: 'purple',
                borderColor: 'purple',
                borderWidth: 1
            },
        ]
    };

    return (
        <div className='mt-5 mb-5'>
            <Bar
                data={data}
                height={300}
                width={100}
                options={
                    { maintainAspectRatio: false }
                }
            />
        </div>
    )
}

