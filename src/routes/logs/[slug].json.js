import { getPost } from '@utils/markdown'

export async function get({params}) {
  const slug = params.slug
  const post = await getPost(slug)
  return {
    status: 200,
    body: post
  }
}