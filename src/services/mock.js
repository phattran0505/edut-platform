import axios from "axios";
import AxiosMockAdapter from "axios-mock-adapter";
import { courses } from "../assets/data/courses";
import { findRelevantCourses, generateChatBotMessage } from "./chatbot";

const mock = new AxiosMockAdapter(axios, { delayResponse: 1000 });

// courses api mock
mock.onGet("/api/v1/courses").reply(() => {
  return [
    200,
    {
      courses: courses,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: courses.length,
        itemsPerPage: courses.length,
      },
    },
  ];
});

mock.onGet("/api/v1/suggestions").reply((config) => {
  const { userId } = config.params;

  // Giả lập logic gợi ý
  const getRandomCourses = (count, excludeIds = []) => {
    const filtered = courses.filter(
      (course) => !excludeIds.includes(course.id)
    );
    const shuffled = [...filtered].sort(() => Math.random() - 0.5);
    return shuffled.slice(0, count);
  };

  //  khóa học đã xem gần đây
  const recentlyViewed = getRandomCourses(3);
  const recentIds = recentlyViewed.map((course) => course.id);

  // khóa học dựa trên sở thích
  const categories = recentlyViewed.map((course) => course.category);
  const basedOnLikes = courses
    .filter(
      (course) =>
        categories.includes(course.category) && !recentIds.includes(course.id)
    )
    .slice(0, 3);

  const allExcludeIds = [
    ...recentIds,
    ...basedOnLikes.map((course) => course.id),
  ];

  // khóa học thịnh hành
  const trending = courses
    .filter((course) => !allExcludeIds.includes(course.id))
    .sort((a, b) => (b.rating || 0) - (a.rating || 0))
    .slice(0, 3);

  const suggestions = {
    recentlyViewed,
    basedOnLikes,
    trending,
  };

  return [200, suggestions];
});

// chatbot api mock
mock.onPost("/api/v1/chatbot").reply(async (config) => {
  const { message } = JSON.parse(config.data);
  const msg = message.toLowerCase();
  // xử lý chào hỏi
  if (msg.includes("xin chào") || msg.includes("hello")) {
    return [200, "Xin chào! Tôi có thể giúp gì cho bạn?"];
  }

  // xử lý cảm ơn
  if (
    msg.includes("cảm ơn") ||
    msg.includes("thank") ||
    msg.includes("thank you")
  ) {
    return [200, "Không có gì! Rất vui được giúp bạn."];
  }

  // xử lý tạm biệt
  if (msg.includes("tạm biệt") || msg.includes("bye")) {
    return [200, "Tạm biệt bạn! Hẹn gặp lại!"];
  }

  const suggested = await findRelevantCourses(msg);
  const chatbotResponse = generateChatBotMessage(suggested);

  if (chatbotResponse) {
    return [200, chatbotResponse];
  }
  // default response
  return [
    200,
    "Xin lỗi, tôi chưa hiểu ý bạn. Bạn có thể nói rõ hơn được không?",
  ];
});

export default mock;
