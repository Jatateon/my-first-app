import * as React from 'react';
import {BarChart,  Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';
export default (class SimpleBarChart extends React.PureComponent {
    render () {
        const {data} = this.props;
        return (
            <BarChart
				width={700}
				height={500}
				data={data}
				margin={{
					top: 5,
					right: 30,
					left: 20,
					bottom: 5
				}}>
				<CartesianGrid strokeDasharray="3 3" />
				<XAxis dataKey="name" />
				<YAxis />
				<Tooltip />
				<Legend />
				<Bar dataKey="online" fill="#8884d8" />
				<Bar dataKey="boxoffice" fill="#82ca9d" />
			</BarChart>
        );
    }
});