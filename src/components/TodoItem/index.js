import React, { useEffect, useRef,useState } from "react";
import styles from "./TodoItem.module.sass";
import cn from "classnames";

const TodoItem = (props) => {
  //------------- Get props
  const {
    keyIndex,
    value,
    setListJob,
    setCheck,
    setValue,
    toggle,
    setToggle,
    setShowAdd,
  } = props;

 

  //-------------- handle  Remove
  const handleRemove = (index) => {
    const question = window.confirm("Are you sure remove todo? ");
    if (question === true) {
      const listJobs = JSON.parse(localStorage.getItem("jobs"));
      const newListJobs = listJobs.filter((job, id) => job.id != index);
      localStorage.setItem("jobs", JSON.stringify(newListJobs));
      setListJob(newListJobs);
    }
  };

  // ---------------- handle checkbox
  const handleCheckTodo = (e) => {
    if(e){
      console.log("OK");
    }else{
      console.log("Not");
    }
  };

  //--------------- handle Update
  const handleSetUpdate = (value) => {
    setValue({
      id: value.id,
      title: value.title,
      desc: value.desc,
      time: value.time,
    });
    setCheck("update");
    setToggle(true);
    setShowAdd(false);
  };

  return (
    <li key={value.id} className={styles.job__item}>
      <h1 className={styles.id}>{keyIndex}</h1>
      <div className={styles.content}>
        <h1>{value.title}</h1>
        <p className={styles.note}>
          <span style={{ fontSize: 12, color: "gray" }}>Note:&emsp;</span>
          {value.desc}
        </p>
        <p style={{ fontSize: 12, color: "gray" }}>
          Date:&emsp;
          {value.time}
        </p>
      </div>
      <div className={styles.action}>
      
        <button
          className={styles.edit}
          onClick={() => handleSetUpdate({ ...value })}
        >
          <i className="far fa-edit"></i>
        </button>
        <button
          className={styles.delete}
          onClick={() => handleRemove(value.id)}
        >
          <i className="far fa-trash"></i>
        </button>
      </div>
    </li>
  );
};

export default TodoItem;
