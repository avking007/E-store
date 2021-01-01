import React, { useState } from 'react';

function Sell() {
  const [formData, setformData] = useState({
    title: '',
    desc: '',
    dop: '',
    cost_price: '',
    sell_price: '',
  });
  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formData);
    setformData({
      title: '',
      desc: '',
      dop: '',
      cost_price: '',
      sell_price: '',
    });
  };
  const changeHandler = (e) => {
    setformData({ ...formData, [e.target.name]: e.target.value });
  };
  return (
    <div className='container'>
      <h2 className='header'>Sell your Item</h2>
      <form className='form' onSubmit={submitHandler}>
        <div className='form-group'>
          <input
            type='text'
            name='title'
            placeholder='Product Name'
            value={formData.title}
            onChange={(e) => changeHandler(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            name='desc'
            placeholder='description'
            value={formData.desc}
            onChange={(e) => changeHandler(e)}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            name='dop'
            placeholder='Enter Date of Purchase'
            onChange={(e) => changeHandler(e)}
            onFocus={(e) => {
              e.target.type = 'date';
            }}
            onBlur={(e) => (e.target.type = 'text')}
            value={formData.dop}
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            name='cost_price'
            onChange={(e) => changeHandler(e)}
            value={formData.cost_price}
            placeholder='Your Cost price'
          />
        </div>

        <div className='form-group'>
          <input
            type='text'
            name='sell_price'
            onChange={(e) => changeHandler(e)}
            value={formData.sell_price}
            placeholder='Your Selling price'
          />
        </div>

        <button className='btn btn-primary'>Sell Item</button>
      </form>
    </div>
  );
}

export default Sell;
