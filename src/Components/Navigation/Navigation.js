import React from 'react';

const Navigation = ({onRouteChange}) => {
    return (
        <nav style={{display:"flex", justifyContent: 'flex-end'}}>  
             <p className='f3 link br2 shadow-2 ma3 dim black underline pa3 pointer' onClick={() => onRouteChange('signout')}>Sign Out</p>
        </nav>
    )
}

export default Navigation; 