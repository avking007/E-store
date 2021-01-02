import React from 'react';

function Purchase({ purchase }) {
  const p_history = purchase.map((item) => (
    <tr key={item._id}>
      <td>{item.title}</td>
      <td>Rs {item.cost_price} /-</td>
    </tr>
  ));
  return (
    <table className='table'>
      <thead>
        <tr>
          <th>Product</th>
          <th>Purchase price</th>
        </tr>
      </thead>
      <tbody>{p_history}</tbody>
    </table>
  );
}

export default Purchase;
