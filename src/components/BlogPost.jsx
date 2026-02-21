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

  useEffect(() => {
    if (!post || !contentRef.current) return
    contentRef.current.querySelectorAll('.code-block').forEach((block) => {
      if (block.querySelector('.code-copy-btn')) return
      const header = block.querySelector('.code-block-header')
      if (!header) return
      const btn = document.createElement('button')
      btn.className = 'code-copy-btn'
      btn.setAttribute('aria-label', 'Copy code to clipboard')
      btn.textContent = 'Copy'
      btn.addEventListener('click', async () => {
        const code = block.querySelector('code')
        if (!code) return
        try {
          await navigator.clipboard.writeText(code.textContent)
          btn.textContent = 'Copied!'
          btn.classList.add('code-copy-btn--copied')
          setTimeout(() => {
            btn.textContent = 'Copy'
            btn.classList.remove('code-copy-btn--copied')
          }, 2000)
        } catch { /* clipboard unavailable, fail silently */ }
      })
      header.appendChild(btn)
    })
  }, [post])

  return (
    <section className="section" id="blog-post">
      <div className="container">
        <div className="blog-post-content">
          <div className="blog-post-header">
            <a className="back-link" href="/blog">
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
