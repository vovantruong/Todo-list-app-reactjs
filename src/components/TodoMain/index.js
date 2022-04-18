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
    // const list = JSON.parse(localStorage.getItem("jobItem"));
    // const newList = list.filter((job, i) => {
    //   return i == index;
    // });
    // console.log(newList);
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

  return (
    <div className={cn("container")}>
      <ToastContainer />
      <div className={styles.todo}>
        <div className={styles.header}>
          <h2 className={styles.title}>TODO</h2>
          <button
            onClick={() => setShowAdd(!showAdd)}
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
                  <p>
                    <span style={{ fontSize: 12, color: "gray" }}>
                      Note:&emsp;
                    </span>
                    {item.detail}
                  </p>
                </div>
                <div className={styles.action}>
                  <button
                    onClick={() => {
                      handleUpdate(i);
                      setShowUpdate(true);
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
