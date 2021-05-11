

export const initialState = {
    user:null,
    reload:null,
    message:null,
    profile:null,
    albums:null,
}

export const reducer=(state,action) =>{
    switch(action.type){
        case 'user':
            return {...state,user:action.value}
        
        case 'reload':
            return {...state,reload:action.value}
        case 'message':
            return {...state,message:action.value}
        
        case 'profile':
            return {...state,profile:action.value}
        case 'albums':
            return {...state,albums:action.value}
        
        default:
            return state
        }
}