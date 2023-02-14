/* eslint-disable jsx-a11y/anchor-is-valid */
import styles from './Pagination.module.css';
import React, { useState } from 'react'
import { v4 } from 'uuid';
import { useHistory } from 'react-router-dom';

export default function Pagination({countriesPerPage,currentPage,setCurrentPage,totalCountries}) {
    const [topPage,setTopPage]=useState(false);
    const [bottomPage,setBottomPage]=useState(false);
    const navigate = useHistory();


    const pageNumbers=[];
    for (let i = 1; i <= (Math.ceil(totalCountries/countriesPerPage)); i++) {
        pageNumbers.push(i);
    };

    const onPreviousPage =()=>{
        if (currentPage>1){
            setCurrentPage(currentPage-1);
            setTopPage(false);
            navigate.push("/home?page="+(currentPage-1))
        } else {
            setTopPage(true);
        }
        setBottomPage(false);

    };
    const onNextPage =()=>{
        if (currentPage<pageNumbers.length) {
            setCurrentPage(currentPage+1);
            navigate.push("/home?page="+(currentPage+1))
            setBottomPage(false);
        }else{
            setBottomPage(true);
        }
        setTopPage(false);

    };
    const onIrPage=(page)=>{
        setCurrentPage(page);
        setTopPage(false);
        setBottomPage(false);
        navigate.push("/home?page="+page)
    };

  return (
    <div>
    <div className={styles.pagination}>
        <div className={styles.paginationList}>
            <button key={v4()} onClick={onPreviousPage} className={topPage?styles.disabled:styles.button}>Previous</button>
            <div><p>Pagina {currentPage}</p></div>
            <button key={v4()} onClick={onNextPage} className={bottomPage?styles.disabled:styles.button} >Next</button>
        </div>
        <div className={styles.paginationList}>
            {
            pageNumbers && pageNumbers.map(nPage=>(
            <div key={v4()}>
                <button key={v4()} onClick={()=>onIrPage(Number(nPage))} className={styles.button}>{nPage}</button>
            </div>
            ))
            }
        </div>
    </div>
    </div>
  )
};
