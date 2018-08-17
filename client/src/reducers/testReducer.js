
const initialState = {'name':''}

export default function (state = initialState,action) {
    console.log('REDUCER',action);
    switch (action.type){
        case 'Success':{
            return {'name':action.payload}
        }
        default:{
            return state
        }
    }
}