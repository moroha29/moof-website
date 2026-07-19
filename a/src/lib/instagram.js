export function getInstagramPreviewPosts(posts = [], limit = 3) {
  return posts.filter((post) => post.active).slice(0, limit);
}
