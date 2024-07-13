import { configureStore, createSlice } from '@reduxjs/toolkit';
import user from './store/userSlice.js'



let stock = createSlice ({
    name : 'stock',
    initialState : [10, 11, 12]
})

let cartlist = createSlice({
    name : 'cartlist',
    initialState : [
        {id : 0, name : 'White and Black', count : 2},
        {id : 2, name : 'Grey Yordan', count : 1}
    ],
    reducers : {
        changeCnt(state, action){
            let findId = state.findIndex((idx)=>{return idx.id == action.payload })
            state[findId].count += 1;
        },
        plusCart : (state, action) =>{
            const {id, name, count} = action.payload;
            const isInCart = state.find(item => item.id === id);
            if (isInCart) { // 상품 있을때 
                isInCart.count++;
            } else { // 상품 없을때
                state.push({id, name, count});
            }
        },
        deleteCart :(state, action) => {
            const deleteItem = action.payload;
            return state.filter((item)=>{return item.id !== deleteItem})
        }
    }
});
export let {changeCnt, plusCart, deleteCart} =  cartlist.actions

export default configureStore({
  reducer: {
    user: user.reducer,
    stock:stock.reducer,
    cartlist:cartlist.reducer
  }
});