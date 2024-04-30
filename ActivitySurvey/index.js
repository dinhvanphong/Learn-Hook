import React, {useState, useEffect, useLayoutEffect} from 'react'
import style from "./index.module.css";
import TablePC from './TablePC';
import TableMb from './TableMb';
import Swal from "sweetalert2";
import { useUser, useAuth } from "@clerk/clerk-react";

function ActivitySurvey() {

  const [dataSubmit, setDataSubmit] = useState([])
  const [dataOption, setDataOption] = useState([])
  const [dataActivity, setDataActivity] = useState([])
  const [studentAnswers, setStudentAnswers] = useState({result: [], ykienkhac: []})
    // Ý kiến khác
  const [other, setOther] = useState("")
  const [isDone, setIsDone] = useState(false)
  const [present, setPresent] = useState(null);

  const [width, setWidth] = useState(window.innerWidth);
  const { user } = useUser()
  const { getToken } = useAuth()

useEffect(() => {
    const handleResize = (e) => {
      setWidth(e.target.innerWidth);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
// Lay danh sach cau tra loi
useLayoutEffect(() => {
    const callApi = async () => {
      await fetch(`${process.env.REACT_APP_GET_ANSWERS}`,
        {
          method: "GET",
        }
      )
        .then((res) => res.json())
        .then((res) => {
          if (res.result.length > 0) setDataOption(res.result);
          else setDataOption([]);
        });
    };
    callApi();
  }, []);
// Lay ki hien tai
useLayoutEffect(() => {
    const callApi = async () => {
      await fetch("https://edu-survey.hasura.app/api/rest/present")
        .then((res) => res.json())
        .then((res) => {
          if (res.hientai.length > 0) setPresent(res.hientai[0]);
        });
    };
    callApi();
  }, []);
// Lay danh sach hoat dong
useLayoutEffect(() => {
    const callApi = async () => {
      await fetch(
        `${process.env.REACT_APP_GET_ACTIVITY}`,
        {
          method: "POST",
          body: JSON.stringify({
           batch_id: 2
          }),
        }
      )
        .then((res) => res.json())
        .then((res) => {
          setDataActivity(res.result);
        });
    };
    callApi();
  }, []);

// Lay du lieu danh gia cua sinh vien
useLayoutEffect(() => {
  const callApi = async () => {
    await fetch(
      `${process.env.REACT_APP_GET_STUDENT_ANSWERS}`,
      {
        method: "POST",
        headers: {
          authorization: `Bearer ${await getToken({
            template: process.env.REACT_APP_EDUMNG_TEMPLATE,
          })}`,
        },
        body: JSON.stringify({
          student_code: user.publicMetadata.masv,
          batch_id: 2
        }),
      }
    )
      .then((res) => res.json())
      .then((res) => setStudentAnswers(res));
  };
  callApi();
}, [isDone]);

  const handleSubmit = (e) => {
    e.preventDefault()
    if (dataSubmit.length < dataActivity.length) {
      Swal.fire({
        title: "Bạn chưa đánh giá hết các hoạt động!",
        text: "Vui lòng tiếp tục đánh giá!",
        confirmButtonColor: "#0083c2",
        icon: "warning"
      });
      return
    }
    Swal.fire({
      title: "Bạn có chắc chắn không?",
      text: "Bạn sẽ không thể đánh giá lại nếu đồng ý!",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#0083c2",
      cancelButtonColor: "#d33",
      cancelButtonText: "Hủy",
      confirmButtonText: "Đồng ý",
      showLoaderOnConfirm: () => !Swal.isLoading(),
      preConfirm:async () => {
        const dataDone = dataSubmit.map(i => {
          return {
            activity_id: i.idActivity,
            answer_id: i.idOption,
            student_code: user.publicMetadata.masv
          }
        })
        if (!!other.trim()) {
          await fetch(
            process.env.REACT_APP_INSERT_OTHER,
            {
              method: "POST",
              headers: {
                authorization: `Bearer ${await getToken({
                  template: process.env.REACT_APP_EDUMNG_TEMPLATE,
                })}`,
              },
              body: JSON.stringify({
                objects: {
                    batch_id: 2,
                    name: other,
                    student_code: user.publicMetadata.masv
                }
              }),
            }
          )
            .then((res) => res.json())
        }
        let result = await fetch(
          process.env.REACT_APP_INSERT_ACTIVITY,
          {
            method: "POST",
            headers: {
              authorization: `Bearer ${await getToken({
                template: process.env.REACT_APP_EDUMNG_TEMPLATE,
              })}`,
            },
            body: JSON.stringify({
              objects: dataDone.map((i) => {
                return {
                  activity_id: i.activity_id,
                  answer_id: i.answer_id,
                  student_code: i.student_code
                };
              }),
            }),
          }
        )
          .then((res) => res.json())
          .then(() =>
            Swal.fire({
              title: "Thành công!",
              text: "Bạn đã đánh giá thành công",
              showConfirmButton: false,
              timer: 1500,
              icon: "success"
          }))
          .then(() => setIsDone(true))
        console.log("result",result)
      }
    })
  }
  return (
    <div className={style.wrap}>
      <div style={{ display: "flex", justifyContent: "center" }}>
        <h2 style={{ color: "#0083C2" }}>
          Khảo sát hoạt động
        </h2>
      </div>
      { width < 760
      ? 
      <>
        { studentAnswers?.result.length > 0
        ?
        <>
          <TableMb dataActivity={dataActivity} dataOption={dataOption} dataSubmit={dataSubmit} setDataSubmit={setDataSubmit} isDone={isDone} studentAnswers={studentAnswers.result}/>
          <div className={style.textarea}>
            <label>Ý kiến khác:</label>
            <textarea rows="4" disabled placeholder="Bạn không có ý kiến!"
              value={studentAnswers.ykienkhac[0]?.name || ""}
            ></textarea>
          </div>
        </>
        :
        <form onSubmit={handleSubmit}>
          <TableMb dataActivity={dataActivity} dataOption={dataOption} dataSubmit={dataSubmit} setDataSubmit={setDataSubmit} studentAnswers={studentAnswers.result}/>
          <div className={style.textarea}>
            <label>Ý kiến khác:</label>
            <textarea rows="4" placeholder="Nhập ý kiến của bạn tại đây (Bạn có thể bỏ trống)..."
              value={other}
              onChange={(e) => setOther(e.target.value)}
            ></textarea>
          </div>
          <div className={style.button}>
            <button type='submit'>Xong</button>
          </div>
        </form>
        }
      </>
      : 
      <>
        {studentAnswers.result.length > 0
          ?
          <>
            <TablePC dataActivity={dataActivity} studentAnswers={studentAnswers.result}/>
            <div className={style.textarea}>
              <label>Ý kiến khác:</label>
              <textarea rows="4" disabled placeholder="Bạn không có ý kiến!"
                  value={studentAnswers?.ykienkhac[0]?.name || ""}
              ></textarea>
            </div>
          </>
          :
          <form onSubmit={handleSubmit}>
            <TablePC dataActivity={dataActivity} dataOption={dataOption} dataSubmit={dataSubmit} setDataSubmit={setDataSubmit} studentAnswers={studentAnswers.result}/>
            <div className={style.textarea}>
              <label>Ý kiến khác:</label>
              <textarea rows="4" placeholder="Nhập ý kiến của bạn tại đây (Bạn có thể bỏ trống)..."
                value={other}
                onChange={(e) => setOther(e.target.value)}
              ></textarea>
            </div>
            <div className={style.button}>
              <button type='submit'>Xong</button>
            </div>
          </form>
        }
      </>
      }
    </div>
  )
}

export default ActivitySurvey