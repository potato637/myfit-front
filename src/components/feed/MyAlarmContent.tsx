import { useState } from "react";

// 🔔 알림의 형태 정의
interface AlarmItem {
  id: number;
  type: "network" | "like" | "comment";
  fromUser: { id: number; name: string; avatarUrl: string };
  message: string;
  time: string;
  isRead: boolean;
}

const mockAlarms: AlarmItem[] = [
  {
    id: 1,
    type: "network",
    fromUser: {
      id: 101,
      name: "양승민",
      avatarUrl: "/public/assets/feed/network1.svg",
    },
    message: "님이 네트워크 관계를 요청했어요.",
    time: "10분",
    isRead: false,
  },
  {
    id: 2,
    type: "network",
    fromUser: {
      id: 102,
      name: "임호현",
      avatarUrl: "/public/assets/feed/network1.svg",
    },
    message: "님이 네트워크 관계를 요청했어요.",
    time: "10분",
    isRead: false,
  },
  {
    id: 3,
    type: "like",
    fromUser: {
      id: 102,
      name: "임호현",
      avatarUrl: "/public/assets/feed/network1.svg",
    },
    message: "님이 회원님의 게시글을 좋아합니다.",
    time: "15분",
    isRead: true,
  },
  {
    id: 4,
    type: "comment",
    fromUser: {
      id: 103,
      name: "장예슬",
      avatarUrl: "/public/assets/feed/network3.svg",
    },
    message: "님이 회원님의 게시글에 댓글을 남겼어요.",
    time: "22분",
    isRead: true,
  },
];

function MyAlarmContent() {
  const [alarms, setAlarms] = useState<AlarmItem[]>(mockAlarms);

  const handleClick = (alarm: AlarmItem) => {
    // 클릭 시 읽음 처리 + 이동 로직 예:
    setAlarms((prev) =>
      prev.map((item) =>
        item.id === alarm.id ? { ...item, isRead: true } : item
      )
    );

    switch (alarm.type) {
      case "network":
        console.log("프로필 페이지로 이동", alarm.fromUser.id);
        break;
      case "like":
      case "comment":
        console.log("해당 게시글로 이동", alarm.id);
        break;
    }
  };

  // 🔽 [추가] 읽지 않은 알림만 필터링
  const unreadAlarms = alarms.filter((alarm) => !alarm.isRead);

  return unreadAlarms.length === 0 ? (
    <div className="flex flex-col items-center justify-center h-[calc(100vh-66px-89px)]">
      <img
        src="/public/assets/feed/alarm.svg"
        alt="빈 알림 이모지"
        className="mb-4"
      />
      <p className="text-sub2 text-ct-gray-200">새로운 알림이 없습니다.</p>
    </div>
  ) : (
    <ul className="mt-[10px]  space-y-[4px]">
      {alarms.map((alarm) => (
        <li
          key={alarm.id}
          onClick={() => handleClick(alarm)}
          className={`flex items-center px-[22px] py-4 cursor-pointer ${
            !alarm.isRead ? "bg-[#F0F7FF]" : "bg-ct-white"
          }`}
        >
          <img
            src={alarm.fromUser.avatarUrl}
            alt={alarm.fromUser.name}
            className="w-10 h-10 rounded-full"
          />
          <div className="flex-1 ml-3">
            <p className="text-body2 text-ct-black-200">
              <span className="font-medium">{alarm.fromUser.name}</span>
              {alarm.message}
            </p>
          </div>
          <span className="text-body3 text-ct-gray-300 ml-2">{alarm.time}</span>
        </li>
      ))}
    </ul>
  );
}

export default MyAlarmContent;
