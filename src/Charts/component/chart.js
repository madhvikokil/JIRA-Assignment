import React, { PureComponent } from 'react';
import {PieChart,Pie,Cell} from 'recharts';
import '../../Assets/recharts.css';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042','#ffcc00','#0000ff','#8000000'];
const RADIAN = Math.PI / 180;


export default class Chart extends PureComponent {

    state={
        array:[]
    }
	
    constructor(props){
        super(props);
        this.state = {
            array:[]
        }
    }

	componentDidMount(){
            console.log("this.state.array : ",this.props.data);
            
            console.log("keys : ",Object.values(this.props.data));
			let s = Object.keys(this.props.data);
			for(let i=0;i<s.length-1;i++){
				
					this.setState({array : s.map((key) => { return { value :this.props.data[key] }})});
					console.log("index : ",i," ",this.state.array);
			
			}

			console.log("new state : ",this.state.array);
			
			
	
    }
    
    renderCustomizedLabel = ({
		cx, cy, midAngle, innerRadius, outerRadius, value
	}) => {
		const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
		const x = cx + radius * Math.cos(-midAngle * RADIAN);
		const y = cy + radius * Math.sin(-midAngle * RADIAN);
	
		return (
			<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
				{`${value}`}
			</text>
		);
	};
	
	render() {
		console.log('state.arr', this.state.array)
		return (
            <>
            <p>{this.props.count}</p>
            <p>{this.props.count2}</p>
			
			<PieChart width={400} height={400}>
			<Pie
				data={this.state.array}
				cx={300}
				cy={200}
				labelLine={false}
				label={this.renderCustomizedLabel}
				outerRadius={80}
				fill="#8884d8"
				dataKey="value"
			>
				{
					this.state.array.map((entry, index) =>
					<Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} ></Cell>)
				}
			</Pie>
		</PieChart> 
			 
			 
            </>
		);
	}
}