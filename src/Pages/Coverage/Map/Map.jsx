import React, { useRef } from "react";
import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { CiSearch } from "react-icons/ci";

const Map = ({ servicecenter }) => {
//   console.log(servicecenter);
  const position = [23.685, 90.3563];
  const searchRef = useRef();
  const mapRef = useRef();

  const serchHandle = () => {
    // console.log(searchRef.current.value);
    const searchValue = searchRef.current.value;
    const finded = servicecenter.find( c => c.district.toLowerCase().includes(searchValue.toLowerCase()));
    if(finded) {
        const cord = [finded?.latitude, finded?.longitude];
        mapRef.current.flyTo(cord, 13)
    }
    // console.log(finded)
  }

  return (
    <div>
      <h2 className="text-2xl font-bold text-secondary">
        We are available in 64 districts
      </h2>

        <div className="join mt-7 mb-5 relative">
          <input ref={searchRef} className="input join-item border-none pl-7 bg-gray-100" placeholder="Search Service Center" />
          <button onClick={serchHandle} className="btn join-item btn-primary text-secondary rounded-r-full">Search</button>
          <CiSearch className="absolute top-3 left-1.5" />
        </div>
      
      <h3 className="text-xl font-bold text-secondary">
        We deliver almost all over Bangladesh
      </h3>

      <div className="w-full h-[500px] mt-5 md:h-[500px]">
        <MapContainer
          center={position}
          zoom={7}
          scrollWheelZoom={false}
          ref={mapRef}
          className="w-full h-full"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {servicecenter.map((center, index) => {
            return (
              <Marker key={index} position={[center?.latitude, center?.longitude]}>
                <Popup>
                  <strong>{center?.district}</strong> <br /> Service Centers:{" "}
                  {center?.covered_area.join(",  ")}
                </Popup>
              </Marker>
            );
          })}
        </MapContainer>
        ,
      </div>
    </div>
  );
};

export default Map;
