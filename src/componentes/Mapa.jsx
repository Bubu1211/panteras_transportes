import React from 'react'
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import './../../node_modules/leaflet/dist/leaflet';

const Mapa = ({lat, lng}) => {
  return (
    <div id="map" style={{width: '100%', height: '100vh' ,overflow: 'scroll'}}>
        <MapContainer  center={[lat, lng]} zoom={10} scrollWheelZoom={true}> 
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors' 
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"   
      />
    </MapContainer>
    </div>
  )
}

export default Mapa