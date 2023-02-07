/* eslint-disable jsx-a11y/anchor-is-valid */
import styled from './Country.module.css';
import React from 'react'
import { Link } from 'react-router-dom';
import { v4 } from 'uuid';

export default function Country(props) {
  return (
    <div key={v4()} className={styled.countryCard}>
      <Link to={`/detail/${props.id}`}>
        <img className={styled.countryImage} src={props.flags} alt={props.name} />
        <div className={styled.countryInfo}>
          <a>{props.name}</a>
          <a>{props.continent}</a>
        </div>
      </Link>
    </div>
  )
}
