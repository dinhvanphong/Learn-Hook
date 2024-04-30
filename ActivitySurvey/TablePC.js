import React from 'react'
import style from "./index.module.css";
import CheckBox from './checkBox';


function TablePC(props) {
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
    <>
        <table>
            <thead>
                <tr>
                    <th>STT</th>
                    <th>Hoạt động</th>
                    <th>Ý kiến</th>
                </tr>
            </thead>
            <tbody>
                {studentAnswers.length > 0
                ?
                <> 
                    {studentAnswers && studentAnswers.map((i, ind) => (
                        <tr key={i.id}>
                            <td>{ind + 1}</td>
                            <td>{i.hoat_dong.name}</td>
                            <td>
                                {i.tra_loi.id === 1
                                    ?
                                    <p className={style.thich}>{i.tra_loi.name}</p>
                                    :
                                    <p className={style.kThich}>{i.tra_loi.name}</p>
                                }
                            </td>
                        </tr>
                    ))}
                </>
                :
                <>
                    {dataActivity && dataActivity.map((i, ind) => (
                        <tr key={i.id}>
                            <td>{ind + 1}</td>
                            <td>{i.name}</td>
                            <td>
                                <CheckBox dataOption={dataOption} activity={i} handleCheckbox={handleCheckbox} listIdActivityAndIdOption={listIdActivityAndIdOption}/>
                            </td>
                        </tr>
                    ))}
                </>
                }
                
            </tbody>
        </table>
       
    </>
  )
}

export default TablePC