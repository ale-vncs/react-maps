import React, {useState, useEffect, useRef, useCallback} from 'react';
import {GoogleApiWrapper, Map, Marker, InfoWindow, IMapProps, mapEventHandler} from 'google-maps-react';

interface LatLng {
  lat: number;
  lng: number
}

function App(props: any) {
  const mapRef = useRef(null)

  const [centerLocation, setCenterLocation] = useState<LatLng>()

  const onMarkerDragEnd = (coord: any, index: number) => {
    const { latLng } = coord;
    const lat = latLng.lat();
    const lng = latLng.lng();
  }

  const onReady = (all: any) => {
    console.log(all)
    console.log(all.initialCenter)
    setCenterLocation({
      lat: all.initialCenter.lat,
      lng: all.initialCenter.lng
    })
  }

  const onReCenter = (center: any) => {
    const mapCenter = mapRef.current
    if(mapCenter) {
      // @ts-ignore
      console.log(mapCenter.map.center.lat(), mapCenter.map.center.lng())
      console.log(mapCenter)
      setCenterLocation({
        // @ts-ignore
        lat: mapCenter.map.center.lat(),
        // @ts-ignore
        lng: mapCenter.map.center.lng()
      })
    }
  }


  return (
    <div style={{
      position:'fixed',
      width: '100%',
      height: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <div
        style={{
          offsetAnchor: 'center bottom',
          zIndex: 999,
          position: 'fixed',
          width: 10,
          height: 10,
          top: 'calc(100% / 2)',
          right: 'calc(100% / 2)',
          background: 'red'
        }}
      ></div>
      <div style={{
        width: 500,
        height: 500
      }}>
        <Map
          style={{
            width: 500,
            height: 500
          }}
          ref={mapRef}
          onCenterChanged={onReCenter}
          google={props.google}
          centerAroundCurrentLocation={true}
          onReady={onReady}
          zoom={15}
        >
        </Map>
      </div>
    </div>
  );
}
export default GoogleApiWrapper({
  apiKey: ''
})(App)
