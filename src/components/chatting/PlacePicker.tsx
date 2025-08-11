import { useCoffeeChat } from "../../contexts/coffeeChatContext";

function PlacePicker() {
  const { selectedPlace, setSelectedPlace } = useCoffeeChat();

  return (
    <div className="w-[330px] border-b-[1px] border-ct-gray-300 mb-[40px] p-[6px]">
      <div className="w-full flex justify-between items-center">
        <input
          className="w-full h-[31px] placeholder-ct-gray-300 placeholder:text-sub2 focus:outline-none pr-[6px]"
          placeholder="약속 장소를 입력해 주세요"
          value={selectedPlace}
          onChange={(e) => setSelectedPlace(e.target.value)}
        />
      </div>
    </div>
  );
}

export default PlacePicker;
