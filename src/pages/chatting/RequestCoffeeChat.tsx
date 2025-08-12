import Calendar from "../../components/chatting/Calendar";
import PlacePicker from "../../components/chatting/PlacePicker";
import TopBarContainer from "../../components/common/TopBarContainer";
import { useModal } from "../../contexts/ui/modalContext";
import Modal from "../../components/ui/Modal";
import RequestModal from "../../components/chatting/Modal/RequestModal";
import EditConfirmedModal from "../../components/chatting/Modal/EditConfirmedModal";
import { useCoffeeChatModal } from "../../contexts/CoffeeChatModalContext";
import Picker from "react-mobile-picker";
import { useEffect, useRef, useState } from "react";
import { useCoffeeChat } from "../../contexts/coffeeChatContext";
import { useParams, useLocation } from "react-router-dom";

const TopBarContent = () => {
  return <span className="text-h2 text-ct-black-100">커피챗 요청</span>;
};

function RequestCoffeeChat() {
  const { setIsModalOpen } = useModal();
  const { editMode, modalType, setModalType } = useCoffeeChatModal();
  const {
    selectedDate,
    selectedTime,
    selectedPlace,
    selectedTitle,
    setSelectedTime,
  } = useCoffeeChat();
  const { chattingRoomId } = useParams();
  const location = useLocation();
  const [coffeechatId, setCoffeechatId] = useState<number | null>(null);

  const dateRef = useRef<HTMLDivElement>(null);
  const timeRef = useRef<HTMLDivElement>(null);
  const placeRef = useRef<HTMLDivElement>(null);
  const [errors, setErrors] = useState<{
    title: boolean;
    date: boolean;
    time: boolean;
    place: boolean;
  }>({
    title: false,
    date: false,
    time: false,
    place: false,
  });

  useEffect(() => {
    const idFromState = (location.state as any)?.coffeechatId;
    if (idFromState) setCoffeechatId(idFromState);
  }, [location.state]);

  if (!chattingRoomId) return null;

  const selections = {
    time: ["AM", "PM"],
    hour: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    minute: ["00", "10", "20", "30", "40", "50"],
  };

  const [pickerValue, setPickerValue] = useState<{
    time: string;
    hour: string;
    minute: string;
  }>({
    time: "AM",
    hour: "1",
    minute: "00",
  });

  useEffect(() => {
    const formattedTime = `${pickerValue.time} ${pickerValue.hour}:${pickerValue.minute}`;
    setSelectedTime(formattedTime);
  }, [pickerValue, setSelectedTime]);

  useEffect(() => {
    if (selectedTitle && errors.title)
      setErrors((e) => ({ ...e, title: false }));
  }, [selectedTitle, errors.title]);
  useEffect(() => {
    if (selectedDate && errors.date) setErrors((e) => ({ ...e, date: false }));
  }, [selectedDate, errors.date]);
  useEffect(() => {
    if (selectedTime && errors.time) setErrors((e) => ({ ...e, time: false }));
  }, [selectedTime, errors.time]);
  useEffect(() => {
    if (selectedPlace && errors.place)
      setErrors((e) => ({ ...e, place: false }));
  }, [selectedPlace, errors.place]);

  const scrollIntoView = (el: HTMLDivElement | null) => {
    if (!el) return;
    el.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const handleClick = () => {
    const nextErrors = {
      title: !selectedTitle || !selectedTitle.trim(),
      date: !selectedDate,
      time: !selectedTime,
      place: !selectedPlace,
    };
    setErrors(nextErrors);

    if (nextErrors.title || nextErrors.date) {
      scrollIntoView(dateRef.current);
      return;
    }
    if (nextErrors.time) {
      scrollIntoView(timeRef.current);
      return;
    }
    if (nextErrors.place) {
      scrollIntoView(placeRef.current);
      return;
    }

    setModalType(editMode ? "editConfirm" : "request");
    setIsModalOpen(true);
  };

  const label = editMode ? "수정하기" : "요청하기";

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full h-auto ct-center flex-col">
        <div ref={dateRef} className="w-full ct-center flex-col">
          <Calendar titleError={errors.title} />
          {errors.date && (
            <p className="mt-2 text-[12px] text-[#FF3B30] text-center">
              필수 입력 사항입니다
            </p>
          )}
        </div>

        <div ref={timeRef} className="w-full my-10">
          <Picker
            value={pickerValue}
            onChange={(newValue) =>
              setPickerValue((prev) => ({ ...prev, ...newValue }))
            }
            height={100}
            style={{ padding: "0 40px" }}
          >
            <Picker.Column name={"time"} style={{ flex: 1 }}>
              {selections["time"].map((option) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? "text-ct-main-blue-200 font-semibold"
                          : "text-ct-gray-400"
                      }
                    >
                      {option}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <Picker.Column name={"hour"} style={{ flex: 3 }}>
              {selections["hour"].map((option) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? "text-ct-main-blue-200 font-semibold"
                          : "text-ct-gray-400"
                      }
                    >
                      {option}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <div className="h-[100px] flex items-center">
              <span>시</span>
            </div>
            <Picker.Column name={"minute"} style={{ flex: 3 }}>
              {selections["minute"].map((option) => (
                <Picker.Item key={option} value={option}>
                  {({ selected }) => (
                    <div
                      className={
                        selected
                          ? "text-ct-main-blue-200 font-semibold"
                          : "text-ct-gray-400"
                      }
                    >
                      {option}
                    </div>
                  )}
                </Picker.Item>
              ))}
            </Picker.Column>
            <div className="h-[100px] flex items-center">
              <span>분</span>
            </div>
          </Picker>
          {errors.time && (
            <p className="mt-2 text-[12px] text-[#FF3B30] text-center">
              필수 입력 사항입니다
            </p>
          )}
        </div>

        <div ref={placeRef} className="w-full ct-center flex-col">
          <PlacePicker />
          {errors.place && (
            <p className="mt-2 text-[12px] text-[#FF3B30] text-center">
              필수 입력 사항입니다
            </p>
          )}
        </div>

        <button
          className="mb-[57px] w-[168px] h-[42px] rounded-[100px] border-[1px] border-ct-main-blue-200 ct-center text-ct-black-100 text-sub1"
          onClick={handleClick}
        >
          {label}
        </button>
      </div>

      <Modal>
        {modalType === "request" && (
          <RequestModal roomId={Number(chattingRoomId)} />
        )}
        {modalType === "editConfirm" && coffeechatId && (
          <EditConfirmedModal
            roomId={Number(chattingRoomId)}
            coffeechatId={coffeechatId}
          />
        )}
      </Modal>
    </TopBarContainer>
  );
}

export default RequestCoffeeChat;
