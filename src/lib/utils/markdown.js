import { promises as fs } from 'fs'
import  { resolve } from 'path'

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

    return posts.sort((a,b) => a.date < b.date ? 1 : -1)
}

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