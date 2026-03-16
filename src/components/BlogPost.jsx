import { useEffect, useRef } from 'react'
import mermaid from 'mermaid'

function BlogPost({ post, darkMode }) {
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
      const isDark = darkMode ?? document.documentElement.classList.contains('dark')
      mermaid.initialize({
        startOnLoad: false,
        theme: 'base',
        fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
        flowchart: { curve: 'basis', useMaxWidth: true },
        themeVariables: isDark ? {
          background: '#141e2e',
          primaryColor: '#334155',
          primaryTextColor: '#f1f5f9',
          primaryBorderColor: '#3b82f6',
          lineColor: '#94a3b8',
          secondaryColor: '#1e293b',
          tertiaryColor: '#475569',
          edgeLabelBackground: '#334155',
          clusterBkg: '#1e293b',
          nodeBorder: '#3b82f6',
          titleColor: '#f1f5f9',
          edgeLabelColor: '#f1f5f9',
        } : {
          background: '#ffffff',
          primaryColor: '#dbeafe',
          primaryTextColor: '#1e3a5f',
          primaryBorderColor: '#3b82f6',
          lineColor: '#64748b',
          edgeLabelBackground: '#f8fafc',
          nodeBorder: '#3b82f6',
        },
      })
      mermaid.run({ nodes: mermaidBlocks })
    }
  }, [post, darkMode])

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
