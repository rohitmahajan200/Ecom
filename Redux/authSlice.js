import {createSlice,createAsyncThunk} from '@reduxjs/toolkit' 
import axios from 'axios'
import { toast } from 'react-toastify';
const initialState={
    user:{
        token:''
    },
    other:{
        error:'',
        isLoading:false
    }
    
}

export const loginAsync=createAsyncThunk('auth/login',async(data)=>{
        try {
            //Making API call to authecticated the user
            const response=await axios.post("http://localhost:5000/api/user/login",
            {   
                email:data.email,
                password:data.password
            },
            {
                //To allow backend to set cookies in frontend
                withCredentials: true
            });
            return response.data
        }catch (error) {
          // console.log(error.response.data); 
           throw new Error(error.response.data);
           
        }
   
})

const authSlice=createSlice({
    name:'auth',
    initialState,
    reducers:{

    },
    extraReducers:(builder)=>{
        //when the promise return by loginAsync is fullfiled then manipulating the state and trinngering toasts
        builder.addCase(loginAsync.fulfilled,(state,action)=>{            
            state.user.token=action.payload;
            state.error=''
            state.isLoading=false;
            toast.success("Login successFully")
        })
        .addCase(loginAsync.pending,(state,action)=>{
            //when the promise return by loginAsync is pending then manipulating the state and trinngering toasts
            state.error=''
            state.isLoading=true;
        })
        .addCase(loginAsync.rejected,(state,action)=>{
            //when the promise return by loginAsync is rejected then manipulating the state and trinngering toasts
            state.isLoading=false;
            state.error=action.error.message;
            toast.error(action.error.message)
        })
    }
})

export const authReducer=authSlice.reducer;

export const authAction=authSlice.actions;

export const authState=(state)=>state.other