import { courses } from "../assets/data/courses";

export const findRelevantCourses = async (query) => {
  query = query.toLowerCase();
  const keywords = {
    "tiếng anh": ["english"],
    "kinh doanh": ["business", "digital marketing"],
    "thiết kế": ["ui/ux design", "database design"],
    marketing: ["digital marketing"],
    database: ["database design"],
    game: ["game development"],
    web: ["web development"],
    security: ["web security"],
    native: ["english"],
    python: ["data science"],
    javascript: ["web development", "nodejs"],
    react: ["web development"],
    ui: ["ui/ux design"],
    ux: ["ui/ux design"],
    mobile: ["mobile development"],
    devops: ["devops and ci/cd"],
    blockchain: ["blockchain development"],
    cloud: ["cloud computing"],
    data: ["data analytics", "data science"],
  };
  let matchedCategories = [];
  for (const [keyword, categories] of Object.entries(keywords)) {
    if (query.includes(keyword)) {
      matchedCategories.push(...categories);
    }
  }
  console.log("Query:", query);
  console.log("Matched Categories:", matchedCategories);

  if (matchedCategories.length === 0) return [];
  const filteredCourses = courses.filter((course) =>
    matchedCategories.some((cat) =>
      course.category.toLowerCase().includes(cat.toLowerCase())
    )
  );
  console.log(filteredCourses);

  return filteredCourses.slice(0, 3);
};

export const generateChatBotMessage = (courses) => {
  if (courses.length === 0) return "Không tìm thấy khóa học phù hợp";
  const response =
    `Có ${courses.length} khóa học phù hợp với yêu cầu của bạn:\n` +
    courses.map((course) => ` - ${course.name}`).join("\n");

  return response;
};
