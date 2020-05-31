// import fs from "fs";
// import path from "path";
// import grayMatter from "gray-matter";
// import marked from "marked";

// const getPost = (filesPath, fileName) =>
//   fs.readFileSync(path.resolve(filesPath, fileName), "utf-8");

// export function getAllMDIn(res, filesPath) {
//   res.writeHead(200, {
//     "Content-Type": "application/json",
//   });
//   const data = fs.readdirSync(filesPath).map((fileName) => {
//     const post = getPost(filesPath, fileName);
//     const { data, content } = grayMatter(post);
//     const newSlug = fileName.substring(0, fileName.length - 3);
//     data.slug = newSlug;
//     const renderer = new marked.Renderer();
//     const html = marked(content, { renderer });
//     return { html, ...data };
//   });
//   res.end(JSON.stringify(data));
// }
