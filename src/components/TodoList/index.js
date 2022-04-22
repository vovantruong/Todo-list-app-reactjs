import React, { useState, useEffect } from "react";
import styles from "./Todolist.module.sass";
import cn from "classnames";
import TodoForm from "../TodoForm";
import TodoItem from "../TodoItem";
import { time } from "../ValueDate";

const TodoList = () => {
  //--------------- State
  const [showAdd, setShowAdd] = useState(false);
  const [checkForm, setCheckForm] = useState("add");
  const [toggle, setToggle] = useState(false);

  //----------------- State Callback
  const [jobs, setJobs] = useState(() => {
    const store = JSON.parse(localStorage.getItem("jobs"));
    return store ?? [];
  });

  const [job, setJob] = useState({
    id: new Date().valueOf(),
    title: "",
    desc: "",
    time: time,
  });

  const styleRotate = {
    transform: "rotate(45deg)",
    transition: "all .3s",
  };

  const handleOnclick = () => {
    setToggle(!toggle);
    setCheckForm("add");
    setShowAdd(!showAdd)
    if(showAdd === false) {
      setToggle(true)
    }
    setJob({
      id: new Date().valueOf(),
      title: "",
      desc: "",
      time: time,
    });
  };

  return (
    <div className={cn("container")}>
      <div className={styles.session}>
        <div className={styles.header}>
          <h2 className={styles.title}>TODO</h2>
          <button onClick={handleOnclick} className={styles.icon__add}>
            <i
              style={showAdd ? styleRotate : { transition: "all .3s" }}
              className="far fa-plus"
            ></i>
          </button>
        </div>
        {toggle ? (
          <TodoForm
            className={styles.todo__form}
            value={job}
            setValue={setJob}
            setListJobs={setJobs}
            check={checkForm}
            setCheck={setCheckForm}
            setToggle={setToggle}
            toggle={toggle}
          />
        ) : (
          ""
        )}
        <div style={ jobs.length == 0 ? {display: "none"} :{display:"block"}} className={styles.body}>
          <ul className={styles.list__item}>
            {jobs.map((job, i) => (
              <TodoItem
                key={i}
                keyIndex={i + 1}
                value={job}
                setValue={setJob}
                setListJob={setJobs}
                setCheck={setCheckForm}
                setToggle={setToggle}
                toggle={toggle}
                setShowAdd={setShowAdd}
              />
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default TodoList;
