export interface Course {
  id: string;
  title: string;
  instructor: string;
  category: string;
  students: number;
}

export const courses: Course[] = [
  {
    id: "course-01",
    title: "React Native cơ bản",
    instructor: "Nguyễn Minh Anh",
    category: "Lập trình di động",
    students: 42,
  },
  {
    id: "course-02",
    title: "Thiết kế giao diện UI/UX",
    instructor: "Trần Hoàng Nam",
    category: "Thiết kế",
    students: 35,
  },
  {
    id: "course-03",
    title: "JavaScript nâng cao",
    instructor: "Lê Thu Hà",
    category: "Lập trình web",
    students: 58,
  },
  {
    id: "course-04",
    title: "Cơ sở dữ liệu",
    instructor: "Phạm Quang Huy",
    category: "Khoa học máy tính",
    students: 47,
  },
  {
    id: "course-05",
    title: "Lập trình ứng dụng với Expo",
    instructor: "Nguyễn Minh Anh",
    category: "Lập trình di động",
    students: 30,
  },
];
