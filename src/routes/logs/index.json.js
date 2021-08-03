import { getPosts } from '@utils/markdown'

export async function get() {
    const posts = await getPosts()

    return {
        status: 200,
        posts
    }
}