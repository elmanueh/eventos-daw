import { useEffect, useState } from 'react'

export default function Pagination({ numItems, pageSize, callback }) {
  const [currentPage, setCurrentPage] = useState(1)
  const totalPages = Math.ceil(numItems / pageSize)

  useEffect(() => {
    setCurrentPage(1)
  }, [numItems])

  const handlePageChange = (nextPage) => {
    setCurrentPage(nextPage)
    callback(nextPage)
  }

  const renderPaginationItems = () => {
    const maxPageItems = 5
    const items = []

    let start = Math.max(currentPage - Math.floor(maxPageItems / 2), 1)
    let end = Math.min(start + maxPageItems - 1, totalPages)

    if (end - start < maxPageItems - 1) {
      start = Math.max(end - maxPageItems + 1, 1)
    }

    for (let i = start; i <= end; i++) {
      items.push(
        <li
          key={i}
          className={`page-item ${i === currentPage ? 'active' : ''}`}
        >
          <button
            className={`page-link border-primary ${
              i === currentPage ? 'text-dark' : ''
            }`}
            onClick={() => handlePageChange(i)}
          >
            {i}
          </button>
        </li>
      )
    }

    return items
  }

  return (
    <nav className="d-flex justify-content-center" aria-label="Page navigation">
      <ul className="pagination">
        <li className="page-item">
          <button
            className="page-link border-primary"
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
          >
            &laquo;
          </button>
        </li>

        {renderPaginationItems()}

        <li className="page-item">
          <button
            className="page-link border-primary"
            onClick={() => handlePageChange(totalPages)}
            disabled={currentPage === totalPages}
          >
            &raquo;
          </button>
        </li>
      </ul>
    </nav>
  )
}
