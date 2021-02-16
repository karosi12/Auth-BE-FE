import React from 'react';

const TableRow = ({ book, index }) => {
  return (
    <tr>
      <th scope="row">{index + 1}</th>
      <td>{book.title}</td>
      <td>{book.author.fullName}</td>
    </tr>
  )
}

export default TableRow;