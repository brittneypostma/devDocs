import fs from 'fs'
import path from 'path'
import marked from 'marked'
import grayMatter from 'gray-matter'
import prism from 'prismjs'

export function get(req, res, next) {
  // the `slug` parameter is available because
  // this file is called [slug].json.js
  const { slug } = req.params

  // Reading correct file
  const post = fs.readFileSync(path.resolve('src/posts', `${slug}.md`), 'utf-8')

  // Parse front matter
  const { data, content } = grayMatter(post)

  // Render html from string
  const renderer = new marked.Renderer()

  renderer.code = (code, language) => {
    const parser = prism.languages[language] || prism.languages.html
    const highlighted = prism.highlight(code, parser, language)
    return `<pre class="language-${language}"><code class="language-${language}">${highlighted}</code></pre>`
  }

  const html = marked(content, { renderer })

  const body = { html, ...data }

  return {
    status: 200,
    body,
  }
}
