import  {path} from 'path'
import fs from 'fs'
import grayMatter from 'gray-matter'
import remark from 'remark'
import remarkHtml from 'remark-html'
import remarkExternalLinks from 'remark-external-links'

export async function getPosts() {

    const files = await fs.readdir('src/posts')
    const paths = files.map(f => resolve('src/posts', f))

    let posts = []
    for await (const path of paths) {
        const src = await fs.readFile(path, 'utf-8')
        const file = grayMatter(src)

        posts.push({
            ...file.data
        })
      }

      // const files = await fs.readdirSync(postsPath)
      // const posts = files.map(file => {
      //   const post = fs.readFileSync(path.resolve(postsPath, fileName), 'utf-8')
      //   const {data} = grayMatter(post)
      //   const slug = file.substring(0, fileName.length - 3)

      //   return {
      //     slug,
      //     ...data
      //   }
      // })
      return posts      
    }
    
    // export async function getPosts() {
    //   const posts = await Promise.all(
    //     Object.entries(import.meta.glob('/src/posts/*.md')).map(
    //       async ([path, page]) => {
    //         const { metadata } = await page()
    //         const slug = path.split('/').pop()
    //         return {
    //           ...metadata,
    //           slug
    //         }
    //       }
    //     )
    //     )
    //     return {
    //       posts
    //     }
    // }
export async function getPost(slug) {
    const path = resolve('src/posts', slug + '.md')
    const src = await fs.readFile(path, 'utf-8')
    const file = grayMatter(src)
    const processed = await remark().use(remarkExternalLinks).use(remarkHtml).process(file.content)

    return {
        content: processed.contents,
        ...file.data
    }
}