import React, { useState } from "react";
import styles from "./Toggle.module.sass"
import cn from 'classnames'

const Toggle = () => {
  return (
    <label className={styles.toggle}>
      <input className={styles.input} type="checkbox" />
        <span className={styles.inner}>
            <span className={styles.box}></span>
        </span>
    </label>
  );
};

export default Toggle;
