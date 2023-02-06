import styled from './Country.module.css';
import React from 'react'
import { Link } from 'react-router-dom';

export default function Country({ id ,image, name, continent }) {
  return (
    <div key={id} className={styled.country}>
      <Link to={`/detail/${id}`}>
        <img className={styled.imagen} src={image} alt={name} />
        <div className={styled.contenedor}>
          <h1>{name}</h1>
          <h2>{continent}</h2>
        </div>
      </Link>
    </div>
  )
}
