import React from 'react';

const Clock = () => {
    const currentDate = new Date();
    const month = currentDate.getMonth() + 1; // Ajoutez 1 pour obtenir le mois correct
    const day = currentDate.getDate();
    const hours = currentDate.getHours();
    const minutes = currentDate.getMinutes();
  
    const formattedDate = `${day}/0${month} - ${hours} : ${minutes}`;

    return (
        <>
        <p className='text-2xl'>{formattedDate}</p>
        </>
    )
};


export default Clock