import fs from 'fs'
import path from 'path'
import marked from 'marked'
import grayMatter from 'gray-matter'

function getAllPosts(filesPath) {
  const data = fs.readdirSync(filesPath).map(fileName => {
    const post = fs.readFileSync(path.resolve(filesPath, fileName), 'utf-8')

    // Parse Front matter from string
    const { data, content } = grayMatter(post)

    // Turns markdown into html
    // const renderer = new marked.Renderer()
    // const html = marked(content, { renderer })

    // Builds data
    return {
      // html,
      slug: fileName.substring(0, fileName.length - 3),
      ...data
    }
  })
  return data
}

export function get(req, res) {  
  const posts = getAllPosts('src/posts')
  // console.log(posts)
  return {
    statusCode: 200,
    body: JSON.stringify({
      posts
    }),
  }
  // res.writeHead(200, {
  //   'Content-Type': 'application/json'
  // })

  // res.end(JSON.stringify(posts))
}

// import pMap from 'p-map'
// import { basename } from 'path'

// export async function get() {
//   const modules = import.meta.glob('./*.md')
//   const posts = await pMap(
//     Object.entries(modules),
//     async function ([filename, module]) {
//     const {metadata} = await module()
//     return {
//       title: metadata.title,
//       slug: basename(filename, '.md')
//     }
//   }
//   )
//   return {
//     body: { posts }
//   }
// }