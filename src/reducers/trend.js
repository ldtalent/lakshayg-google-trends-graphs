const initialState = {
    result:[[]],
    sending:false,
    
  };

  export default function (state = initialState, action) {
    const { type, payload } = action;
    switch (type) {
    
        case 'SENDING':
            return{
                ...state,
                sending: true
            }
        case 'TREND_RECEIVED':
            return {
                ...state,
                sending:false,
                result:payload
            }

        case 'TREND_ERROR':
            return {
                ...state,
                sending:false
            }    
        default:   
        return state 
    }
}