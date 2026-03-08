function BlogIndex({ posts, showViewAll = false }) {
  return (
    <section className="section" id="blog">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">Latest Posts</h2>
          <p className="section-description">
            Notes on engineering, architecture experiments, and the tools I enjoy using.
          </p>
        </div>
        <div className="blog-grid">
          {posts.map((post) => (
            <article key={post.slug} className="blog-card">
              <div className="blog-card-content">
                <p className="blog-date">{new Date(post.date).toLocaleDateString()}</p>
                <h3 className="blog-title">
                  <a href={`/blog/${post.slug}/`}>{post.title}</a>
                </h3>
                <p className="blog-description">{post.description}</p>
                {post.tags?.length ? (
                  <div className="blog-tags">
                    {post.tags.map((tag) => (
                      <span key={tag} className="tag">
                        {tag}
                      </span>
                    ))}
                  </div>
                ) : null}
                <a className="blog-readmore" href={`/blog/${post.slug}/`}>
                  Read more →
                </a>
              </div>
              {post.image ? (
                <div className="blog-card-image">
                  <img src={post.image} alt="" loading="lazy" />
                </div>
              ) : null}
            </article>
          ))}
        </div>
        {showViewAll && (
          <div className="blog-view-all">
            <a href="/blog/" className="view-all-link">View all posts →</a>
          </div>
        )}
      </div>
    </section>
  )
}

export default BlogIndex
