import { useState, useRef, useEffect } from "react";
import styles from "./TodoForm.module.sass";
import cn from "classnames";
import { time } from "../ValueDate";
import { ToastContainer, toast } from "react-toastify";

const TodoForm = (props) => {
  //------get props
  const {
    className,
    value,
    setValue,
    setListJobs,
    check,
    setCheck,
    setToggle,
    toggle,
  } = props;

  const focus = useRef((prev) => focus);

  useEffect(() => {
    if (toggle == true) {
      focus.current.focus();
    }
  }, []);

  //------handle actions
  //------------------Function Add job
  const handleAdd = () => {
    if (value.title != "") {
      setListJobs((prev) => {
        const newJob = [...prev, value];
        localStorage.setItem("jobs", JSON.stringify(newJob));
        return newJob;
      });
      setValue({
        id: new Date().valueOf(),
        title: "",
        desc: "",
        time: time,
      });
    } else {
      notifyCheck();
    }
  };

  //-------------- Function Update job
  const handleUpdate = () => {
    const listJobs = JSON.parse(localStorage.getItem("jobs"));
    const newJobs = listJobs.map((j) => {
      if (j.id === value.id) {
        return {
          id: new Date().valueOf(),
          title: value.title,
          desc: value.desc,
          time: time,
        };
      }
      return j;
    });
    setListJobs(newJobs);
    localStorage.setItem("jobs", JSON.stringify(newJobs));
    setValue({
      id: new Date().valueOf(),
      title: "",
      desc: "",
      time: time,
    });
    setToggle(false);
    setCheck("add");
    
  };

  // --------------------- TOAST MESSAGE
  //setting toastify
  const notifyCheck = () =>
    toast.warning("Plese enter todo!", {
      position: "top-center",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  //====================== Render UI ================================ //
  return (
    <div className={cn(className, styles.form)}>
      <ToastContainer />
      <input
        ref={focus}
        value={value.title}
        placeholder="Enter title todo"
        onChange={(e) =>
          setValue((prve) => {
            return { ...prve, title: e.target.value };
          })
        }
      />
      <br />
      <input
        value={value.desc}
        placeholder="Enter description todo"
        onChange={(e) =>
          setValue((prve) => {
            return { ...prve, desc: e.target.value };
          })
        }
      />
      {check === "add" ? (
        <button className={styles.btn} onClick={handleAdd}>
          ADD
        </button>
      ) : (
        <button className={styles.btn} onClick={handleUpdate}>
          UPDATE
        </button>
      )}
    </div>
  );
};

export default TodoForm;
