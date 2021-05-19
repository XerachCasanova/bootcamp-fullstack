import React from 'react'
import Field from './Field'

const Form = ({ action, fieldHandler }) => 

    <form onSubmit={action}>
      <div>
          { fieldHandler.map(field => 
            <Field key={field.label} label={field.label} value={field.value} handleChange={field.handleChange} />) }
      </div>
      <div>
        <button type="submit">add</button>
      </div>

    </form>

    export default Form