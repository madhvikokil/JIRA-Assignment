import React from 'react';
// import BarChart from '@bit/recharts.recharts.bar-chart';
// import Bar from '@bit/recharts.recharts.bar';
// import XAxis from '@bit/recharts.recharts.x-axis';
// import YAxis from '@bit/recharts.recharts.y-axis';
// import CartesianGrid from '@bit/recharts.recharts.cartesian-griyd';
// import Tooltip from '@bit/recharts.recharts.tooltip';
// import Legend from '@bit/recharts.recharts.legend';
import '../../Assets/recharts.css';
import { BarChart, XAxis, YAxis, Bar,Legend } from 'recharts';
 class Chart2 extends React.Component{

    constructor(props){
        super(props);
        this.state = {
            array:[]
        }
        this.state ={
            names : []
        }
    }

	componentDidMount(){
            console.log("this.state.array : ",this.props.data);
            
            // const name ={
            // 0:"open",
            // 1:"acc",
            // 2:"inprog",
            // 3:"review",
            // 4:"resolve",
            // 5:"done",
            // 6:"sp"     
            // }
            console.log("keys : ",Object.values(this.props.data));
			let s = Object.keys(this.props.data);
				
				this.setState({array : s.map((key) => { return { value :this.props.data[key] }})});
                console.log("new state : ",this.state.array);
                
               
    }
	
     render(){
        console.log("this.state : ",this.state);
         return(
             
            <BarChart
		width={500}
		height={300}
		data={this.state.array}
		margin={{
			top: 5, right: 30, left: 20, bottom: 5,
		}}
	>
		{/* <CartesianGrid strokeDasharray="3 3" /> */}
		<XAxis dataKey="value" />
		<YAxis />
		{/* <Tooltip /> */}
		<Legend />
		
		<Bar dataKey="value" fill="#82ca9d" />
	</BarChart>
         )  
     }
 }


export default Chart2;