/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Pagination.module.css';
import React, { useState } from 'react'
import { v4 } from 'uuid';

export default function Pagination({countriesPerPage,currentPage,setCurrentPage,totalCountries}) {
    const [topPage,setTopPage]=useState(false);
    const [bottomPage,setBottomPage]=useState(false);

    const pageNumbers=[];
    for (let i = 1; i <= Math.ceil(totalCountries/countriesPerPage); i++) {
        pageNumbers.push(i);
    };
    const onPreviousPage =()=>{
        if (currentPage>1){
            setCurrentPage(currentPage-1);
            setTopPage(false);
        } else {
            setTopPage(true);
        }
        setBottomPage(false);
    };
    const onNextPage =()=>{
        if (currentPage<pageNumbers.length) {
            setCurrentPage(currentPage+1);
            setBottomPage(false);
        }else{
            setBottomPage(true);
        }
        setTopPage(false);
    };
    const onIrPage=(page)=>{
        setCurrentPage(page)
        console.log(page);
        setTopPage(false);
        setBottomPage(false);
    };
  return (
    <div>
    <nav className={styles.pagination}>
        <div className={styles.paginationList}>
            <button key={v4()} onClick={onPreviousPage} className={topPage?styles.disabled:styles.btn}>Previous</button>
            <button key={v4()} onClick={onNextPage} className={bottomPage?styles.disabled:styles.btn} >Next</button>
        </div>
        <ul className={styles.paginationList}>
            {
                pageNumbers.map(nPage=>(
                    <div key={v4()}>
                        <button key={v4()} onClick={()=>onIrPage(nPage)} className={styles.btn}>{nPage}</button>
                    </div>
                ))
            }
        </ul>
    </nav>
    </div>
  )
};
