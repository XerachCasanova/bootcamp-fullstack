import {useState} from 'react'


export const useFieldAnecdotes = (type) => {
  
  const [value, setValue] = useState('')

  const onChange = (event) => {
 
    setValue(event.target.value)

  }
 
  return {
    type,
    value,
    reset: {setValue},
    onChange,
  }
}

export const useReset = (type, {content, author, info}) => {

  const onClick = () => {
    content.reset.setValue('')
    author.reset.setValue('')
    info.reset.setValue('')
  }

  return {
    type,
    onClick
  }

}