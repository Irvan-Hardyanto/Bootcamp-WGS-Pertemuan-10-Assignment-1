export default (state={//nilai awal state
    firstName:'',
    lastName:'',
    employed:false,
    education:'',
    expertises:[],
    prefTechs:'',
    notes:''
},action) => {
    switch(action.type){
        case "UPDATE_FIRST_NAME":
            return {//supaya atribut yang lain tidak hilang
                ...state, 
                firstName:action.payload.firstName
            };
        case "UPDATE_LAST_NAME":
            return {
                ...state,
                lastName:action.payload.lastName
            };
        case "UPDATE_EMPLOYED":
            return {...state,employed:action.payload.employed};
        case "UPDATE_EDUCATION":
            return {...state,education:action.payload.education};
        case "UPDATE_EXPERTISES":
            return {...state,expertises:action.payload.expertises};
        case "UPDATE_PREF_TECHS":
            return {...state,prefTechs:action.payload.prefTechs};
        case "UPDATE_NOTES":
            return {...state,notes:action.payload.notes};
        default:
            return state;
    }
}