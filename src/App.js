import React, { useEffect, useState, Fragment } from "react";
import Chart from 'react-google-charts'
import { connect} from "react-redux";
import {trendData, getTrending} from './actions/data' 
import {PropTypes} from 'prop-types'
import loading from './loading.gif'
import Dropdown from 'react-dropdown';
import 'react-dropdown/style.css';


const App = ({trendData,sending,dailyTrending, result, getTrending,keyArr}) => {
  
  useEffect(()=>{
   // console.log('Hello')
   async function getTrend(){
    await getTrending();
   }
    getTrend()

   
   },[getTrending])
   
  const handleTrend1 = async(e) => {
    //console.log(trending1)
    settrend1({
      ...trend1,
       trending1 : e.target.value
    })
  
  }
  const handleTrend2 = async(e) => {
    settrend2({
      ...trend2,
       trending2 : e.target.value
    })
  
  }

  const handleClick = async(e) =>{
    console.log('clicked')
    if(trending1.length !=0 && trending2.length !=0){
trendData(trending1,trending2)
    }
  }
  const [trend1,settrend1] = useState({
   trending1:''
  })
  const {trending1} = trend1;

  const [trend2,settrend2] = useState({
    trending2:''
   })
   const {trending2} = trend2;
  const data = result.length == 0 || result.length==1 ? [[1,1,1,1]]: result;
  const options = {
    title: "Trend Comparison",
    curveType: "function",
    legend: { position: "bottom" }
  };

  const options2 = [
    'Line Chart', 'Scatter Chart'
  ];
  const defaultOption = options2[0];
  const[option,setOption] = useState({
    chart:'Line Chart'
  })
const {chart} = option;
  return (
    <Fragment>
    <div className="container">
    <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4" style={{"textAlign":"center"}}>Compare Google search trends</h1>
 
  </div>
</div>
<div className ="row">
<div className="col-md-2 col-sm-12" style={{textAlign:'center'}}>
{dailyTrending? null: <div><h6>Trending Searches</h6><i class="fa fa-arrow-down" aria-hidden="true"></i>{keyArr.map((x)=> 
  <div> {x}</div>
)}</div>}
</div>
<div className="col-md-10 col-sm-12">
    <div  style={{"textAlign":"center"}}>
    
     <textarea style={{"margin":"10px","width":"30%"}} placeholder = "Trend 1 keywords" onChange={handleTrend1}></textarea>
     <textarea style={{"margin":"10px","width":"30%"}} placeholder = "Trend 2 keywords" onChange={handleTrend2}></textarea>
     </div>
     <div style={{"textAlign":"center"}}>
     <button style={{margin:'10px'}} type="button" className="btn btn-success" onClick={handleClick}>Compare the two trends</button>
     </div>
     
     <div style={{"textAlign":"center"}}>
      <Dropdown  className = "btn btn-light" style={{width:'fit-content !important'}} onChange = {(e)=>{setOption({
        ...option,
        chart:e.value
      })}} options={options2}  value={defaultOption} placeholder="Select chart"></Dropdown>
    
      </div>
      <div style={{"textAlign":"center", "margin":"20px"}}>
{sending ? <img src = {loading} /> : 

result.length ==1  && result[0] && result[0].length ? <h1>No comparisons found</h1>:
<div>

{chart=='Line Chart' ? <Chart
chartType="LineChart"
width="100%"
height="400px"
data={data}
options={options}
/>: <Chart
chartType="ScatterChart"
width="100%"
height="100%"
data={data}
options={options}
legendToggle
/>}


      </div>}
</div>
     
     </div>
     </div>
     
     
     </div>
</Fragment>
  );
}

App.propTypes = {
trendData:PropTypes.func.isRequired,
sending:PropTypes.bool.isRequired,
dailyTrending:PropTypes.bool.isRequired,
result:PropTypes.array.isRequired,
getTrending:PropTypes.func.isRequired,
keyArr:PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
 sending:state.trend.sending,
 dailyTrending:state.trend.dailyTrending,
 result:state.trend.result,
keyArr:state.trend.keyArr
 });
export default connect(mapStateToProps, {
 trendData, getTrending
})(App);
