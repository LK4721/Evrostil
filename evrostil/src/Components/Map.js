import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "./Map.css";

function Map() {
    const mapElementRef = useRef(null);
    const mapInstanceRef = useRef(null);

    useEffect(() => {
        if (!mapElementRef.current || mapInstanceRef.current) return;

        const map = L.map(mapElementRef.current, {
            center: [41.4408, 22.6544],
            zoom: 15,
            scrollWheelZoom: false,
        });

        L.tileLayer(
            "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
            {
                attribution: "&copy; OpenStreetMap contributors",
            }
        ).addTo(map);

        const customIcon = L.divIcon({
            html: `<div class="customMarker"></div>`,
            className: "",
            iconSize: [20, 20],
            iconAnchor: [10, 10],
        });

        L.marker([41.4408, 22.6544], { icon: customIcon })
            .addTo(map)
            .bindPopup("Evrostil M");

        mapInstanceRef.current = map;

        return () => {
            map.remove();
            mapInstanceRef.current = null;
        };
    }, []);

    return (
        <div className="mapWrapper">
            <div ref={mapElementRef} className="map"></div>
        </div>
    );
}

export default Map;
