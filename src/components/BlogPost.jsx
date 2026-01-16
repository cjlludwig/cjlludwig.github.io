import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

function BlogPost({ post }) {
  const contentRef = useRef(null)

  useEffect(() => {
    if (!post || !contentRef.current) return

    // Convert fenced mermaid code blocks into mermaid containers
    const mermaidCodeBlocks = contentRef.current.querySelectorAll('pre code.language-mermaid')
    mermaidCodeBlocks.forEach((codeBlock) => {
      const pre = codeBlock.parentElement
      const container = document.createElement('div')
      container.className = 'mermaid'
      container.textContent = codeBlock.textContent
      pre.replaceWith(container)
    })

    const mermaidBlocks = contentRef.current.querySelectorAll('.mermaid')
    if (mermaidBlocks.length) {
      mermaid.initialize({ startOnLoad: false, theme: 'neutral' })
      mermaid.run({ nodes: mermaidBlocks })
    }
  }, [post])

  return (
    <section className="section" id="blog-post">
      <div className="container">
        <div className="blog-post-content">
          <div className="blog-post-header">
            <a className="back-link" href="#/blog">
              ← Back to all posts
            </a>
            <h1 className="blog-post-title">{post.title}</h1>
          </div>
          <article className="blog-post-body" ref={contentRef} dangerouslySetInnerHTML={{ __html: post.html }} />
        </div>
      </div>
    </section>
  )
}

export default BlogPost
