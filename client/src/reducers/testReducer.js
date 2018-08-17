
const initialState = {}

export default function (state = initialState,action) {
    console.log('REDUCER',action);
    switch (action.type){
        case 'Success':{
            return action.payload
        }
        default:{
            return state
        }
    }
}