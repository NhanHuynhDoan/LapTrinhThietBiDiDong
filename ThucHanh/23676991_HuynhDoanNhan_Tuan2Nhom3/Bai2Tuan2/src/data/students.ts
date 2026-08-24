export type StudentStatus = "Đang học" | "Bảo lưu";

export interface Student {
  id: string;
  fullName: string;
  studentId: string;
  className: string;
  status: StudentStatus;
}

export interface StudentSection {
  title: string;
  data: Student[];
}

export const studentSections: StudentSection[] = [
  {
    title: "Công nghệ thông tin",
    data: [
      {
        id: "student-01",
        fullName: "Nguyễn Minh Anh",
        studentId: "24CNTT001",
        className: "24CNTT1",
        status: "Đang học",
      },
      {
        id: "student-02",
        fullName: "Trần Quốc Bảo",
        studentId: "24CNTT002",
        className: "24CNTT1",
        status: "Đang học",
      },
      {
        id: "student-03",
        fullName: "Lê Thu Hà",
        studentId: "23CNTT015",
        className: "23CNTT2",
        status: "Bảo lưu",
      },
    ],
  },
  {
    title: "Kinh tế",
    data: [
      {
        id: "student-04",
        fullName: "Phạm Hoàng Nam",
        studentId: "24KTE010",
        className: "24KTE1",
        status: "Đang học",
      },
      {
        id: "student-05",
        fullName: "Võ Ngọc Mai",
        studentId: "23KTE022",
        className: "23KTE2",
        status: "Đang học",
      },
    ],
  },
  {
    title: "Ngôn ngữ Anh",
    data: [
      {
        id: "student-06",
        fullName: "Đỗ Thanh Trúc",
        studentId: "24NNA007",
        className: "24NNA1",
        status: "Đang học",
      },
      {
        id: "student-07",
        fullName: "Bùi Gia Huy",
        studentId: "23NNA018",
        className: "23NNA2",
        status: "Bảo lưu",
      },
    ],
  },
];
