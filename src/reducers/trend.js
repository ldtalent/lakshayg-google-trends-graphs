const initialState = {
    result:[[]],
    sending:false,
    key1:"",
    key2:"",
    dailyTrending:false
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
            
            case 'TRENDING':
                return{
                    ...state,
                    dailyTrending: true
                }
            case 'TRENDING_RECEIVED':
                return {
                    ...state,
                    dailyTrending:false,
                   key1:payload.key1,
                   key2:payload.key2
                }
    
            case 'TRENDING_ERROR':
                return {
                    ...state,
                    dailyTrending:false
                }    
        default:   
        return state 
    }
}