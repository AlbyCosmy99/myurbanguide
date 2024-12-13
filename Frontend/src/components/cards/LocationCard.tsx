interface LocationCardProps {
  img: string;
  location: string;
  distance: string;
  local_id: string;
}

const LocationCard: React.FC<LocationCardProps> = ({
  img,
  location,
  distance,
  local_id,
}) => {
  return (
    <div
      id={local_id}
      className="items-center cursor-pointer hover:scale-105 transition duration-200 ease-out flex gap-4"
    >
      <div className="w-20 h-20">
        <img src={img} className=" aspect-square rounded" />
      </div>
      <div>
        <h2 className="text-xl font-semibold pb-2">{location}</h2>
        <p className="text-sm">{distance}</p>
      </div>
    </div>
  );
};

export default LocationCard;
