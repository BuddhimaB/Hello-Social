// Desc: AuthContext Provider
import { createContext, useReducer } from "react";
import AuthReducer from "./AuthReducer";


const INITIAL_STATE = {
    user: {_id:"666f0bbb4648b751bd83f531",
        username:"Example",
        email:"example@email.com",
        profilePicture:"",
        coverPicture:"",
        followers:["6672d4b8f380f5068b4d2f50","666dbb8f7908e16f4ee65802"],
        followings:["666de54118025d619a818e94","666de54118025d619a818e94","666dbb8f7908e16f4ee65802"],
        isAdmin:false,
        desc:"Hey its my updated description and Good day to all",
        city:"Colombo",
        relationship:{"$numberInt":"1"},
        from:"Sri Lanka"
    },
    //user: null,
    isFetching: false,
    error: false,
};

export const AuthContext = createContext(INITIAL_STATE);

export const AuthContextProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, INITIAL_STATE);

    return (
        <AuthContext.Provider value={{ 
        user:state.user, 
        isFetching:state.isFetching,
        error:state.error,
        dispatch }}>
            {children}
        </AuthContext.Provider>
    );
};