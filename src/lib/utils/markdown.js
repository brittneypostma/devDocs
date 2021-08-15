import fs from 'fs'
import path from 'path'
import marked from 'marked'
import grayMatter from 'gray-matter'

export async function getPosts(filesPath) {
  const data = await fs.readdirSync(filesPath).map(fileName => {
    const post = fs.readFileSync(path.resolve(filesPath, fileName), 'utf-8')

    // Parse Front matter from string
    const { data, content } = grayMatter(post)

    // Turns markdown into html
    const renderer = new marked.Renderer()
    const html = marked(content, { renderer })

    // Builds data
    return {
      html,
      slug: fileName.substring(0, fileName.length - 3),
      ...data
    }
  })
  return data
}
