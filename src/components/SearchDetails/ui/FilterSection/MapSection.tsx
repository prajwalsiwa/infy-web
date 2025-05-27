import googleMiniMap from "@/assets/Images/googleminimap.png";
import { useNavigate } from "react-router-dom";

function MapSection() {
  const navigate = useNavigate();
  return (
    <div className="w-full h-[5.817rem] relative justify-center items-center flex mt-4 overflow-hidden rounded-2xl">
      <img src={googleMiniMap} alt="" className="w-full h-full object-cover" />
      <div className="text-primary absolute cursor-pointer w-fit p-4 py-2 rounded-sm bg-white" onClick={() => navigate("/map-view")}>
        View on map
      </div>
    </div>
  );
}

export default MapSection;
