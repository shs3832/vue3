const posts = [
  { id: 1, title: "제목1", contents: "내용1", createAt: "2020-01-01" },
  { id: 2, title: "제목2", contents: "내용2", createAt: "2020-01-01" },
  { id: 3, title: "제목3", contents: "내용3", createAt: "2020-01-01" },
  { id: 4, title: "제목4", contents: "내용4", createAt: "2020-01-01" },
  { id: 5, title: "제목5", contents: "내용5", createAt: "2020-01-01" },
];

export function getPosts() {
  return posts;
}

export function getPostById(id) {
  return posts.find((item) => item.id === id);
}
