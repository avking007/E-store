import React from 'react';

function Dashboard() {
  return (
    <div>
      <div className='container'>
        <h2>Purchase History</h2>
        <br />
        <table className='table'>
          <thead>
            <th>Product</th>
            <th>Purchase price</th>
          </thead>
          <tbody>
            <tr>
              <td>Abc</td>
              <td>def</td>
            </tr>
            <tr>
              <td>Abc</td>
              <td>def</td>
            </tr>
            <tr>
              <td>Abc</td>
              <td>def</td>
            </tr>
            <tr>
              <td>Abc</td>
              <td>def</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Dashboard;
