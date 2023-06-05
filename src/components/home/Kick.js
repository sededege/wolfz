import React, { useEffect, useState } from 'react';

const Kick = () => {
    const [newWindow, setNewWindow] = useState(null);

    const handleOpenLink = () => {
      const newWindowRef = window.open('https://www.example.com');
      setNewWindow(newWindowRef);
    }
  
    useEffect(() => {
      const handleBeforeUnload = () => {
        alert('La ventana se ha cerrado');
      }
  
      if (newWindow && typeof newWindow.removeEventListener === 'function') {
        newWindow.addEventListener('beforeunload', handleBeforeUnload);
      }
  
      return () => {
        if (newWindow && typeof newWindow.removeEventListener === 'function') {
          newWindow.removeEventListener('beforeunload', handleBeforeUnload);
        }
      }
    }, [newWindow]);
  
    return (
      <div>
{/*         <button className='fixed top-20 right-20' onClick={handleOpenLink}>Abrir enlace</button>
 */}      </div>
    );
}

export default Kick