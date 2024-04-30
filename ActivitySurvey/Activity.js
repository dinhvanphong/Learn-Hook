import React, {useState} from 'react'
import style from "./index.module.css";
import { AiOutlineCaretDown } from "react-icons/ai";


function Activity(props) {
  const { i, dataOption, handleCheckbox, listIdActivityAndIdOption, stt, studentAnswers } = props
  const [active, setActive] = useState(true)


  return (
    <>
      {!!studentAnswers
      ?
      <>
        <div key={studentAnswers.id} className={`${style.activity} ${active && style.active}`}>
          <p onClick={() => setActive(!active)} className={style.nameActivity}>
            <p>{`${stt}, ${studentAnswers.hoat_dong.name}`}</p>
            <div>
              <AiOutlineCaretDown className={style.iconDown}/>
            </div>
          </p>
          <div className={`${style.option}`}>
            {studentAnswers.tra_loi.id === 1
              ?
              <p className={style.thich}>{studentAnswers.tra_loi.name}</p>
              :
              <p className={style.kThich}>{studentAnswers.tra_loi.name}</p>
            }
          </div>
        </div>
      </>
      :
      <>
        <div key={i.id} className={`${style.activity} ${active && style.active}`}>
          <p onClick={() => setActive(!active)} className={style.nameActivity}>
            <p>{`${stt}, ${i.name}`}</p>
            <div>
              <AiOutlineCaretDown className={style.iconDown}/>
            </div>
          </p>
          <div className={`${style.option}`}>
            {dataOption.map((option) => (
              <div key={option.id} className={style.checkboxMb}>
                <input
                  type='radio'
                  id={option.name + "+" + i.name}
                  value={option.name}
                  checked={listIdActivityAndIdOption.includes((`${i.id} - ${option.id}`))}
                  onChange={() => handleCheckbox(i, option)}
                />
                <label htmlFor={option.name + "+" + i.name}>{option.name}</label>
              </div>
            ))}
          </div>
        </div>
      </>
    }
    </>
    
  )
}

export default Activity