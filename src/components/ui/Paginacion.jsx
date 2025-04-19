import { Pagination } from 'react-bootstrap'

const Paginacion = ({ currentPage, totalPages, onPageChange }) => {
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
        <Pagination.Item
          key={i}
          active={i === currentPage}
          onClick={() => onPageChange(i)}
        >
          {i}
        </Pagination.Item>
      )
    }

    return items
  }

  return (
    <div className="d-flex justify-content-center mt-4 mb-4">
      <Pagination>
        <Pagination.First
          onClick={() => onPageChange(1)}
          disabled={currentPage === 1}
        />
        <Pagination.Prev
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
        />
        {renderPaginationItems()}
        <Pagination.Next
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
        />
        <Pagination.Last
          onClick={() => onPageChange(totalPages)}
          disabled={currentPage === totalPages}
        />
      </Pagination>
    </div>
  )
}

export default Paginacion
