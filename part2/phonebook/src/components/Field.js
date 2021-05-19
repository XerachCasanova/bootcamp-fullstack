import React from 'react'

const Field = ({ label, value, handleChange }) => <>{label} <input key={label} value={value} onChange={handleChange} /><br/></>

export default Field