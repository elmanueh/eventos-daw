export const Pagination = ({ currentPage, totalPages, onPageChange }) => {
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
            onClick={() => onPageChange(i)}
          >
            {i}
          </button>
        </li>
      )
    }

    return items
  }

  return (
    <>
      <style>{`
        .page-link:hover {
          box-shadow: none;
          background-color: rgba(var(--bs-primary-rgb), 0.5);
          color: rgba(var(--bs-dark-rgb), 0.5);
        }

        .page-link:focus{
          box-shadow: none;
          background-color: var(--bs-primary);
          color: var(--bs-dark);
        }
      `}</style>
      <nav
        className="d-flex justify-content-center"
        aria-label="Page navigation"
      >
        <ul className="pagination">
          {currentPage > 1 && (
            <li className="page-item">
              <button
                className="page-link border-primary"
                onClick={() => onPageChange(1)}
              >
                &laquo;
              </button>
            </li>
          )}

          {currentPage > 1 && (
            <li className="page-item">
              <button
                className="page-link border-primary"
                onClick={() => onPageChange(currentPage - 1)}
              >
                &lsaquo;
              </button>
            </li>
          )}

          {renderPaginationItems()}

          {currentPage < totalPages && (
            <li className="page-item">
              <button
                className="page-link border-primary"
                onClick={() => onPageChange(currentPage + 1)}
              >
                &rsaquo;
              </button>
            </li>
          )}

          {currentPage < totalPages && (
            <li className="page-item">
              <button
                className="page-link border-primary"
                onClick={() => onPageChange(totalPages)}
              >
                &raquo;
              </button>
            </li>
          )}
        </ul>
      </nav>
    </>
  )
}
