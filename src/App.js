import React, { useEffect, useState, Fragment } from "react";
import Chart from 'react-google-charts'
import { connect} from "react-redux";
import {trendData} from './actions/data' 
import {PropTypes} from 'prop-types'
import loading from './loading.gif'
const App = ({trendData,sending, result}) => {
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
  const data = result.length == 0 || result.length==1 ? [[1,1,1]]: result;
  const options = {
    title: "Trend Comparision",
    curveType: "function",
    legend: { position: "bottom" }
  };
  return (
    <Fragment>
    <div className="container">
    <div className="jumbotron jumbotron-fluid">
  <div className="container">
    <h1 className="display-4" style={{"textAlign":"center"}}>Compare Google search trends</h1>
   
  </div>
</div>
    <div style={{"textAlign":"center"}}>
     <textarea style={{"margin":"10px","width":"30%"}} placeholder = "Trend 1 keywords" onChange={handleTrend1}></textarea>
     <textarea style={{"margin":"10px","width":"30%"}} placeholder = "Trend 2 keywords" onChange={handleTrend2}></textarea>
     </div>
     <div style={{"textAlign":"center"}}>
     <button type="button" className="btn btn-success" onClick={handleClick}>Compare the two trends</button>
     </div>
     <div style={{"textAlign":"center", "margin":"20px"}}>
{sending ? <img src = {loading} /> : 

result.length ==1  && result[0] && result[0].length ? <h1>No comparisions found</h1>:
<Chart
chartType="LineChart"
width="100%"
height="400px"
data={data}
options={options}
/>}
</div>
     
     </div>
</Fragment>
  );
}

App.propTypes = {
trendData:PropTypes.func.isRequired,
sending:PropTypes.bool.isRequired,
result:PropTypes.array.isRequired
}

const mapStateToProps = (state) => ({
 sending:state.trend.sending,
 result:state.trend.result
 });
export default connect(mapStateToProps, {
 trendData
})(App);
