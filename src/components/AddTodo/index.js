import React, { useState, useRef } from "react";
import cn from "classnames";
import styles from "./AddTodo.module.sass";
import { ToastContainer, toast } from "react-toastify";

const AddTodo = ({ style, className, setJobs }) => {
  const [job, setJob] = useState({
    title: "",
    detail: "",
  });

  const titleRef = useRef();
  const detailRef = useRef();

  const handleAdd = () => {
    if (job.title != "") {
      setJobs((prev) => {
        const newJob = [...prev, job];

        const jsonJob = JSON.stringify(newJob);
        localStorage.setItem("jobItem", jsonJob);

        return newJob;
      });
    }else{
      notify();
    }
    setJob({
      title: "",
      detail: "",
    });
  };

  //setting toastify
  const notify = () =>
    toast.warning("Vui lòng nhập công việc của bạn!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  return (
    <div style={style} className={cn(className, styles.add)}>
      <input
        className={styles.input}
        ref={titleRef}
        placeholder="Enter title"
        value={job.title}
        onChange={(e) =>
          setJob((prev) => {
            return { ...prev, title: e.target.value };
          })
        }
        required
      />
      <input
        className={styles.input}
        ref={detailRef}
        placeholder="Enter description"
        autoComplete="off"
        required
        value={job.detail}
        onChange={(e) =>
          setJob((prev) => {
            return { ...prev, detail: e.target.value };
          })
        }
      />
      <button className={styles.btn__add} onClick={handleAdd}>
        Add Todo
      </button>
    </div>
  );
};

export default AddTodo;
