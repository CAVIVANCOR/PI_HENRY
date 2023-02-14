/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Country.module.css';
import React from 'react'
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

export default function Country(props) {
  return (
    <div key={v4()} className={styles.countryCard}>
      <Link to={`/detail/${props.id}`}>
        <img className={styles.countryImage} src={props.flags} alt={props.name} />
        <div className={styles.countryInfo}>
          <h2> <span>{props.name}</span> </h2>
          <p>{props.continent}</p>
        </div>
      </Link>
    </div>
  )
}
