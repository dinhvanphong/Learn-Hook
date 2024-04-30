import React from 'react'
import style from "./index.module.css";


function CheckBox(props) {
  const {dataOption, activity, handleCheckbox, listIdActivityAndIdOption} = props
  return (
    <div>
      {dataOption.map(option => (
        <div key={option.id} className={style.checkbox}>
          <input type='radio' id={option.name + "+" + activity.name}
            checked={listIdActivityAndIdOption.includes((`${activity.id} - ${option.id}`))}
            onChange={() => handleCheckbox(activity, option)}
          />
          <label htmlFor={option.name + "+" + activity.name}>{option.name}</label>
        </div>
      ))}
    </div>
  )
}

export default CheckBox