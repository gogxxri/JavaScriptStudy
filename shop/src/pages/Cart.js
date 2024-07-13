import {Table} from 'react-bootstrap';
import {useDispatch, useSelector} from "react-redux";
import {changeAge} from './../store/userSlice.js';
import {changeCnt, deleteCart} from '../store.js';

function Cart(){

    let state = useSelector((state) => state);
    console.log(state);

    let dispatch = useDispatch();

    return (
        <div>
            {state.user.name} {state.user.age}의 장바구니
            <button onClick={()=>{
                dispatch(changeAge(5))
            }}>changeAge</button>
            <Table>
                <thead>
                    <tr>
                    <th>#</th>
                    <th>상품명</th>
                    <th>수량</th>
                    <th>변경하기</th>
                    </tr>
                </thead>
                <tbody>
                    {state.cartlist.map((item, i)=>
                    <tr key={i}>
                        <td>{state.cartlist[i].id}</td>
                        <td>{state.cartlist[i].name}</td>
                        <td>{state.cartlist[i].count}</td>
                        <td>
                            <button onClick={()=>{
                                dispatch(changeCnt(state.cartlist[i].id))
                            }}>+</button>
                        </td>
                        <td>
                            <button onClick={()=>{
                                dispatch(deleteCart(state.cartlist[i].id))
                            }}>❌</button>
                        </td>
                    </tr>)}
                </tbody>
            </Table> 
        </div>
    );
}
export default Cart;