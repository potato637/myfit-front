import { FeedItem } from "../types/feed/feed";

// mocks/feed.ts
export const mockFeeds: FeedItem[] = [
  {
    feed_id: 26,
    user: {
      id: 3,
      name: "우슬희",
      sector: "광고마케터",
      profile_img: "/public/assets/feed/feed-main-profile.svg",
    },
    created_at: "2025-07-01T10:15:00",
    images: [
      "/public/assets/feed/feed_main.svg",
      "/public/assets/feed/post1.svg",
      "/public/assets/feed/post2.svg",
      "/public/assets/feed/post3.svg",
      "/public/assets/feed/post4.svg",
      "/public/assets/feed/post5.svg",
      "/public/assets/feed/post6.svg",
    ],
    feed_text:
      "스쳐 지나간 소비자의 말 한마디에서 다음 캠페인의 방향이 보이니까. 오늘도 브랜드와 사람 사이, 가장 설득력 있는 연결고리를 찾아..",
    hashtags: ["#광고하는사람들", "#Freelancer", "#AdLife", "#DailyInsight"],
    heart: 8,
    is_liked: true,
    comment_count: 5,
  },
  {
    feed_id: 27,
    user: {
      id: 3,
      name: "장예솔",
      sector: "기획자",
      profile_img: "/public/assets/feed/network3.svg",
    },
    created_at: "2025-07-01T10:15:00",
    images: [
      "/public/assets/feed/post1.svg",
      "/public/assets/feed/post2.svg",
      "/public/assets/feed/post3.svg",
      "/public/assets/feed/post4.svg",
      "/public/assets/feed/post5.svg",
      "/public/assets/feed/post6.svg",
    ],
    feed_text: "요즘 트렌드 분석 정리!",
    hashtags: ["#마케팅", "#소셜미디어"],
    heart: 8,
    is_liked: true,
    comment_count: 5,
  },

  // 추가 더미 데이터...
];
