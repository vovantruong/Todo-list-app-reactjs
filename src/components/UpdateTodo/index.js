import React, { useRef, useState, useEffect } from "react";
import cn from "classnames";
import styles from "./UpdateTodo.module.sass";
import { ToastContainer, toast } from "react-toastify";

const UpdateTodo = ({ ...props }) => {
  const [job, setJob] = useState({
    id: props.id,
    title: props.value === undefined ? "" : props.value.title,
    detail: props.value === undefined ? "" : props.value.detail,
    time: props.timer,
  });

  const titleRef = useRef();
  const detailRef = useRef();
  const handleUpdate = () => {
    console.log(job);
    if (job.title != "") {
    } else {
      notify();
    }
    setJob({
      id: props.id,
      title: "",
      detail: "",
      time: props.timer,
    });
  };

  //setting toastify
  const notify = () =>
    toast.warning("Vui lòng chỉnh sửa công việc của bạn!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });
  return (
    <div style={props.style} className={cn(props.classname, styles.update)}>
      <h1>UPDATE</h1>
      <input
        className={styles.input_update}
        ref={titleRef}
        placeholder="Enter update title"
        value={job.title}
        onChange={(e) =>
          setJob((prev) => {
            return { ...prev, title: e.target.value, id: props.id };
          })
        }
        required
      />
      <input
        className={styles.input_update}
        ref={detailRef}
        placeholder="Enter update description"
        autoComplete="off"
        required
        value={job.detail}
        onChange={(e) =>
          setJob((prev) => {
            return { ...prev, detail: e.target.value, id: props.id };
          })
        }
      />
      <button className={styles.btn__update} onClick={handleUpdate}>
        Update todo
      </button>
    </div>
  );
};

export default UpdateTodo;
