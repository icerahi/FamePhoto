

export const initialState = {
    user:null,
    reload:null,
    message:null,
    profile:null,
    albums:null,
    photos:null,
  
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
        
        case 'photos':
            return {...state,photos:action.value}
        
        
        default:
            return state
        }
}