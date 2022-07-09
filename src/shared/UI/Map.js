import React, { useEffect, useRef } from 'react';
import styles from './Map.module.css';


function Map(props) {

    const { center, zoom } = props;
    const mapRef = useRef();

    useEffect(() => {
        //* point to the mapRef's element
        const map = new window.google.maps.Map(mapRef.current, {
            center: center,
            zoom: zoom
        });

        //* Create a new marker in the center of map
        new window.google.maps.Marker({ position: center, map: map });
    }, [center, zoom]);

    return (
        <div ref={mapRef} className={`${styles.map}`} >
        </div >
    )

}


export default Map