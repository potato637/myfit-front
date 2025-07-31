import Calendar from "../../components/chatting/Calendar";
import PlacePicker from "../../components/chatting/PlacePicker";
import TopBarContainer from "../../components/common/TopBarContainer";
import { useModal } from "../../contexts/ui/modalContext";
import Modal from "../../components/ui/Modal";
import RequestModal from "../../components/chatting/Modal/RequestModal";
import EditConfirmedModal from "../../components/chatting/Modal/EditConfirmedModal";
import { useCoffeeChatModal } from "../../contexts/CoffeeChatModalContext";
import Picker from "react-mobile-picker";
import { useState } from "react";

const TopBarContent = () => {
  return <span className="text-h2 text-ct-black-100">커피챗 요청</span>;
};

function RequestCoffeeChat() {
  const { setIsModalOpen } = useModal();
  const { editMode, modalType, setModalType } = useCoffeeChatModal();

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

  const handleClick = () => {
    if (editMode) {
      setModalType("editConfirm");
    } else {
      setModalType("request");
    }
    setIsModalOpen(true);
  };

  const label = editMode ? "수정하기" : "요청하기";

  return (
    <TopBarContainer TopBarContent={<TopBarContent />}>
      <div className="w-full h-auto ct-center flex-col">
        <Calendar />
        <div className="w-full my-10">
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
        </div>
        <PlacePicker />
        <button
          className="mb-[57px] w-[168px] h-[42px] rounded-[100px] border-[1px] border-ct-main-blue-200 ct-center text-ct-black-100 text-sub1"
          onClick={handleClick}
        >
          {label}
        </button>
      </div>
      <Modal>
        {modalType === "request" && <RequestModal />}
        {modalType === "editConfirm" && <EditConfirmedModal />}
      </Modal>
    </TopBarContainer>
  );
}

export default RequestCoffeeChat;
