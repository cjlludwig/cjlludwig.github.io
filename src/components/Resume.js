import { Document, Page, pdfjs } from 'react-pdf'
import { useState } from 'react';

import '../static/components/Resume.css'
import 'react-pdf/dist/esm/Page/AnnotationLayer.css';
import 'react-pdf/dist/esm/Page/TextLayer.css';

import resumePdf from '../static/images/cjludwig_resume.pdf'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

function Resume() {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
    setPageNumber(1);
  }

  function changePage(offset) {
    setPageNumber(prevPageNumber => prevPageNumber + offset);
  }

  function previousPage() {
    changePage(-1);
  }

  function nextPage() {
    changePage(1);
  }

  return (
    <>
      <Document file={resumePdf} onLoadSuccess={onDocumentLoadSuccess}>
        <Page 
          key={1}
          className={pageNumber === 1 ? "prevPage" : ""}
          pageNumber={1} 
        />
        <Page
          key={2}
          pageNumber={2}
          className={pageNumber === 2 ? "prevPage" : ""}
        />
      </Document>
      <div className='pdf-buttons'>
        <button
          type="button"
          disabled={pageNumber <= 1}
          onClick={previousPage}
          >
          {"<"}
        </button>
        <span>
          {pageNumber || (numPages ? 1 : '--')} of {numPages || '--'}
        </span>
        <button
          type="button"
          disabled={pageNumber >= numPages}
          onClick={nextPage}
        >
          {">"}
        </button>
      </div>
    </>
  );
}

export default Resume;