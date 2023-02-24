import * as React from 'react';
import { useState, useMemo } from 'react';
import Map, {
    Marker,
    Popup,
    NavigationControl,
    FullscreenControl,
    ScaleControl,
    GeolocateControl
} from 'react-map-gl';
import Pin from './Pin';

import classes from "../../styles/DisplayMap.module.css"
import mapboxgl from 'mapbox-gl';
// eslint-disable-next-line import/no-webpack-loader-syntax
mapboxgl.workerClass = require('worker-loader!mapbox-gl/dist/mapbox-gl-csp-worker').default;




const DisplayMap = (props) => {
    const [popupInfo, setPopupInfo] = useState(null);

    const pins = useMemo(
        () =>
            props.cityData && props.cityData.map((city, index) => (
                <Marker
                    key={`marker-${index}`}
                    longitude={city.geometry.coordinates[0]}
                    latitude={city.geometry.coordinates[1]}
                    anchor="bottom"
                    onClick={e => {
                        // If we let the click event propagates to the map, it will immediately close the popup
                        // with `closeOnClick: true`
                        e.originalEvent.stopPropagation();
                        setPopupInfo(city);
                    }}
                >
                    <Pin />
                </Marker>
            )),
        []
    );


    return <div >
        <Map
            initialViewState={{
                latitude: 19.0760,
                longitude: 72.8777,
                zoom: 2.5,
                bearing: 0,
                pitch: 0
            }}
            // style={{ width: 1150, height: 500 }}
            style={{ width: "80vw", height: "70vh" }}
            mapStyle="mapbox://styles/mapbox/dark-v9"
            mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
        >
            <div className={classes.main}>
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />
            </div>

            {pins}

            {popupInfo && (
                <Popup
                    anchor="top"
                    longitude={Number(popupInfo.geometry.coordinates[0])}
                    latitude={Number(popupInfo.geometry.coordinates[1])}
                    onClose={() => setPopupInfo(null)}
                >
                    <div>
                        {popupInfo.location} |{' '}

                    </div>
                    <img width="100%" src={popupInfo.images[0].url} alt="campgroundInfo" />
                </Popup>
            )}
        </Map>
    </div>
}

export default DisplayMap