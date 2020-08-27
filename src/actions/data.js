import axios from 'axios'
 //const domain = "http://localhost:3001"
const domain = "https:apigoogletrends.herokuapp.com"
 export const trendData = (trend1,trend2) => async (dispatch) => {
    try {
    dispatch({
      type:'SENDING'
    })
console.log('dispatched')
   const result = await axios.get(`${domain}/${trend1}/${trend2}`)
  // const result2 = await axios.get(`${domain}/${trend2}`)
    // console.log(result.data)
      dispatch({
        type: 'TREND_RECEIVED',
        payload: result.data
      });
    } catch (error) {
   
      if (error.response) {
  
  
        console.log(error.response.data.errors);
        console.log(error.response.status);
        console.log(error.response.headers);
      } else if (error.request) {
        /*
         * The request was made but no response was received, `error.request`
         * is an instance of XMLHttpRequest in the browser and an instance
         * of http.ClientRequest in Node.js
         */
        console.log(error.request);
      } else {
        
        console.log("Error", error.message);
      }
      console.log(error);
  
      dispatch({
        type: 'TREND_ERROR',
      });
    }
  };