import React, { useState, useEffect } from "react";
import cn from "classnames";
import styles from "./todomain.module.sass";
import AddTodo from "../AddTodo";
import UpdateTodo from "../UpdateTodo";

//import message toastify
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TodoMain = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [showUpdate, setShowUpdate] = useState(false);
  const [id, setID] = useState();
  const [valueJob, setValueJob] = useState();

  const [jobs, setJobs] = useState(() => {
    const store = JSON.parse(localStorage.getItem("jobItem"));

    return store ?? [];
  });

  const rotateIcon = {
    transform: "rotate(45deg)",
    transition: "all .3s",
  };

  const hanldeDelete = (index) => {
    const list = JSON.parse(localStorage.getItem("jobItem"));
    const newList = list.filter((job, i) => {
      return i != index;
    });
    localStorage.setItem("jobItem", JSON.stringify(newList));
    setJobs(newList);
  };

  const handleUpdate = (index) => {
    const list = JSON.parse(localStorage.getItem("jobItem"));
    const newList = list.filter((job, i) => {
      return i == index;
    });
    setValueJob(newList[0]);
    setID(newList[0].id);
    // setID(index);
  };

  //setting toastify
  const notify = () =>
    toast.success("Xóa công việc thành công!", {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const currDate = new Date();
  let day = currDate.getDate();
  let month = currDate.getMonth() + 1;
  let year = currDate.getFullYear();
  let hour = currDate.getHours();
  let minute = currDate.getMinutes();

  const time = hour + ":" + minute + " " + day + "/" + month + "/" + year;

  return (
    <div className={cn("container")}>
      <ToastContainer />
      <div className={styles.todo}>
        <div className={styles.header}>
          <h2 className={styles.title}>TODO</h2>
          <button
            onClick={() => {
              setShowAdd(!showAdd);
              setShowUpdate(false);
            }}
            className={styles.icon__add}
          >
            <i
              style={showAdd ? rotateIcon : { transition: "all .3s" }}
              className="far fa-plus"
            ></i>
          </button>
        </div>
        <AddTodo
          style={showAdd ? { display: "block" } : { display: "none" }}
          setJobs={setJobs}
          timer={time}
        />
        <UpdateTodo
          style={showUpdate ? { display: "block" } : { display: "none" }}
          setJobs={setJobs}
          value={valueJob}
          id={id}
          timer={time}
          jobs={jobs}
        />
        <div
          className={styles.body}
          style={jobs.length == 0 ? { display: "none" } : { display: "block" }}
        >
          <ul>
            {jobs.map((item, i) => (
              <li key={i} className={styles.jobitem}>
                <h1 className={styles.item__id}>{i + 1}</h1>
                <div className={styles.content}>
                  <h1>{item.title}</h1>
                  <p className={styles.note}>
                    <span style={{ fontSize: 12, color: "gray" }}>
                      Note:&emsp;
                    </span>
                    {item.detail}
                  </p>
                  <p style={{ fontSize: 12, color: "gray" }}>
                    Date:&emsp;
                    {item.time}
                  </p>
                </div>
                <div className={styles.action}>
                  <button
                    onClick={() => {
                      handleUpdate(i);
                      setShowUpdate(true);
                      setShowAdd(false);
                    }}
                    className={styles.edit}
                  >
                    <i className="far fa-edit"></i>
                  </button>
                  <button
                    className={styles.delete}
                    onClick={() => {
                      hanldeDelete(i);
                      notify();
                    }}
                  >
                    <i className="far fa-trash"></i>
                  </button>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoMain;
