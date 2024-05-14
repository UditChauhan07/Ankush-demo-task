import React, { useState } from 'react';
import { useSelector } from 'react-redux';

const CartProduct = () => {
    const data = useSelector((state) => state.product);
    const [addData, setAddData] = useState(data);
    
    return (
        <div className="container-fluid">
            <table className="table">
                <thead>
                    <tr>
                        <th>Product Name</th>
                        <th>Quantity</th>
                        <th>Price</th>
                        <th>Updated Price</th>
                        <th>Update</th>
                        <th>Remove</th>
                    </tr>
                </thead>
                <tbody>
                    {addData.map((item) => (
                        <tr key={item.id}>
                            <td>{item.title}</td>
                            <td>
                                <input type="number"  value={item.quantity} className="form-control" />
                                
                            </td>
                            <td>12</td>
                            <td>12</td>
                            <td>
                                <button>Update</button>
                            </td>
                            <td>
                                <button>Remove</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
          
        </div>
          
    );
};

export default CartProduct;
