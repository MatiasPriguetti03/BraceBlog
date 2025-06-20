import React from 'react'
import PropTypes from 'prop-types'

const Loader = ({ type = 'dots', message = 'Loading...' }) => {
  if (type === 'spinner') {
    return (
      <div className='loader--spinner'>
        <div className='loader__container'>
          <div className='loader__circle'></div>
          <p className='loader__text'>{message}</p>
        </div>
      </div>
    )
  }

  return (
    <div className='loader'>
      <div className='loader__container'>
        <div className='loader__spinner'>
          <div className='loader__dot loader__dot--1'></div>
          <div className='loader__dot loader__dot--2'></div>
          <div className='loader__dot loader__dot--3'></div>
        </div>
        <p className='loader__text'>{message}</p>
      </div>
    </div>
  )
}

Loader.propTypes = {
  type: PropTypes.oneOf(['dots', 'spinner']),
  message: PropTypes.string
}

export default Loader