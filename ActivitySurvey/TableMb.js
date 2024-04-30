import React from 'react'
import style from "./index.module.css";
import Activity from './Activity';



function TableMb(props) {
  const { dataActivity, dataOption, dataSubmit, setDataSubmit, studentAnswers} = props
  const listIdActivityAndIdOption = dataSubmit?.map(activity => (`${activity.idActivity} - ${activity.idOption}`))
  const listIdActivity = dataSubmit?.map(activity => activity.idActivity)

  const handleCheckbox = (i, option) => {
      if (listIdActivity.includes(i.id)) {
          setDataSubmit(prev => {
              let dataFilter = prev.filter(item => item.idActivity !== i.id)
              const data = {
                  idActivity: i.id,
                  nameActivity: i.name,
                  position: i.position,
                  idOption: option.id,
                  nameOption: option.name
              }
              dataFilter.push(data)
             return dataFilter
          })
      } else {
          const data = {
              idActivity: i.id,
              nameActivity: i.name,
              position: i.position,
              idOption: option.id,
              nameOption: option.name
          }
          setDataSubmit(prev => {
              return ([...prev, data])
          })  
      }
  }

  return (
    <div className={style.container}>
      {studentAnswers.length > 0
        ?
        <>
          {studentAnswers && studentAnswers.map((i, ind) => (
            <Activity
              key={i.id}
              studentAnswers={i}
              dataOption={dataOption}
              handleCheckbox={handleCheckbox}
              listIdActivityAndIdOption={listIdActivityAndIdOption}
              stt={ind + 1}
            />
          ))}
        </>
        :
        <>
          {dataActivity && dataActivity.map((i, ind) => (
            <Activity
              key={i.id}
              i={i}
              dataOption={dataOption}
              handleCheckbox={handleCheckbox}
              listIdActivityAndIdOption={listIdActivityAndIdOption}
              stt={ind + 1}
            />
          ))}
        </>
      }
      
    </div>
  )
}

export default TableMb