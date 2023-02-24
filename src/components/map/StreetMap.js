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




const StreetMap = (props) => {
    const [popupInfo, setPopupInfo] = useState(null);
    const pins2 = useMemo(
        () =>
            props.campground &&
            <Marker
                key={`marker-${props.campground._id}`}
                longitude={props.campground.geometry.coordinates[0]}
                latitude={props.campground.geometry.coordinates[1]}
                anchor="bottom"
                onClick={e => {
                    // If we let the click event propagates to the map, it will immediately close the popup
                    // with `closeOnClick: true`
                    e.originalEvent.stopPropagation();
                    setPopupInfo(props.campground);
                }}
            >
                <Pin />
            </Marker>
        ,
        []
    );
    return (
        <>
            <Map
                initialViewState={{
                    longitude: props.campground.geometry.coordinates[0],
                    latitude: props.campground.geometry.coordinates[1],
                    zoom: 13
                }}
                style={{ width: "100%", height: "40vh" }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
                mapboxAccessToken={process.env.REACT_APP_MAPBOX_TOKEN}
            >
                <GeolocateControl position="top-left" />
                <FullscreenControl position="top-left" />
                <NavigationControl position="top-left" />
                <ScaleControl />
                {pins2}
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
        </>
    );
}

export default StreetMap