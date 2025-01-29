export const STYLES = [
  {
    idx: 1,
    name: "혼자",
    title: "신선한 가을 날씨에 {style_name} 있기 좋은 곳🍁",
  },
  {
    idx: 2,
    name: "함께",
    title: "신선한 가을 날씨에 {style_name} 하기 좋은 곳🍁",
  },
  {
    idx: 3,
    name: "반려동물",
    title: "신선한 가을 날씨에 {style_name}과 함께가기 좋은 곳🍁",
  },
  {
    idx: 4,
    name: "가족",
    title: "{style_name}과 함께 보내기 좋은 가족 나들이 장소👪",
  },
  {
    idx: 5,
    name: "포토존",
    title: "{style_name}에서 인생샷 남기기 좋은 곳📸",
  },
  {
    idx: 6,
    name: "체험",
    title: "{style_name}을(를) 즐기기 좋은 체험 장소✨",
  },
  {
    idx: 7,
    name: "굿즈",
    title: "{style_name} 구경하며 쇼핑하기 좋은 곳🛍️",
  },
  {
    idx: 8,
    name: "로맨스",
    title: "{style_name} 분위기에서 데이트하기 좋은 곳💑",
  },
  {
    idx: 9,
    name: "스포츠",
    title: "{style_name} 활동으로 몸을 움직이기 좋은 곳🏅",
  },
  {
    idx: 10,
    name: "동양풍",
    title: "{style_name}의 전통을 느낄 수 있는 곳🀄",
  },
  {
    idx: 11,
    name: "자연",
    title: "{style_name} 속에서 힐링할 수 있는 장소🌳",
  },
  {
    idx: 12,
    name: "만화",
    title: "{style_name} 속에서 튀어나온 듯한 장소📚",
  },
  {
    idx: 13,
    name: "재미있는",
    title: "{style_name} 활동으로 즐거운 시간을 보내기 좋은 곳🎉",
  },
  {
    idx: 14,
    name: "귀여운",
    title: "{style_name} 것들로 마음이 따뜻해지는 곳🐾",
  },
  {
    idx: 15,
    name: "활기찬",
    title: "{style_name} 에너지를 받을 수 있는 활기찬 곳⚡",
  },
  {
    idx: 16,
    name: "세련된",
    title: "{style_name} 스타일로 세련되게 즐길 수 있는 곳💎",
  },
  {
    idx: 17,
    name: "힙한",
    title: "{style_name} 분위기를 만끽하기 좋은 핫플레이스🔥",
  },
  {
    idx: 18,
    name: "핫한",
    title: "{style_name} 장소에서 뜨거운 시간을 보내기🔥",
  },
  {
    idx: 19,
    name: "편안한",
    title: "{style_name} 시간을 보내며 휴식하기 좋은 곳🛋️",
  },
  {
    idx: 20,
    name: "힐링",
    title: "{style_name}하기에 완벽한 힐링 장소🌿",
  },
  {
    idx: 21,
    name: "감동",
    title: "{style_name}적인 스토리가 담긴 감동의 장소💖",
  },
  {
    idx: 22,
    name: "예술적인",
    title: "{style_name} 작품들을 감상할 수 있는 아트 스팟🎨",
  },
  {
    idx: 23,
    name: "신비로운",
    title: "{style_name} 느낌의 숨겨진 장소✨",
  },
  {
    idx: 24,
    name: "공포",
    title: "{style_name}한 스릴을 느낄 수 있는 장소👻",
  },
  {
    idx: 25,
    name: "미스터리",
    title: "{style_name} 분위기의 신비로운 곳🕵️",
  },
  {
    idx: 26,
    name: "추리",
    title: "{style_name} 마니아들이 좋아할 만한 미스터리 장소🔍",
  },
  {
    idx: 27,
    name: "진지한",
    title: "{style_name} 분위기의 몰입할 수 있는 장소🎭",
  },
] as const;

export type StyleName = (typeof STYLES)[number]["name"];
