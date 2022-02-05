import React from 'react'
import { Doughnut } from 'react-chartjs-2'
import { contarCallCenter } from '../../../helpers/CallCenterGrafic';
import Chart from 'chart.js/auto'

export const DonoutGraf = ({ clientes }) => {

    const callCenterFilter = contarCallCenter(clientes);

    const tp = callCenterFilter[0];
    const at = callCenterFilter[1];
    const ag = callCenterFilter[2];


    const data = {
        labels: ['Teleperformance', 'Atento', 'Aegis'],
        datasets: [{
            label: '',
            data: [tp, at, ag],
            backgroundColor: [
                'lightseagreen',
                'deepskyblue',
                'purple'
            ],
            borderColor: [
                'lightseagreen',
                'deepskyblue',
                'purple'
            ],
            borderWidth: 1
        }]
    };

    return (
        <div className='mt-5 mb-5'>

            <Doughnut
                data={data}
                height={300}
                width={100}
                options={
                    {maintainAspectRatio: false}
                }
            />

        </div>
    )
}
