import React, { useEffect } from 'react';
import { Container, Table } from 'reactstrap';
import { useDispatch, useSelector } from 'react-redux';
import NavBar from '../components/common/NavBar'
import TableRow from '../components/common/TableRow';
import { getBooks } from '../store/slice/bookSlice'

const UserPage = props => {
  const dispatch = useDispatch();
  const { books } = useSelector(state => state.bookReducer);

  useEffect(() => {
    dispatch(getBooks())
  }, [dispatch])

  return (
    <>
      <NavBar />
      <Container fluid={true}>
        <Table hover>
          <thead>
          <tr>
            <th>#</th>
            <th>Title</th>
            <th>Creator</th>
          </tr>
          </thead>

      <tbody>
        {
          books.map((book, index) => (
            <TableRow
              key={index}
              index={index}
              book={book} 
            />
          ))
        }
      </tbody>
        </Table>
      </Container>
    </>
  )
}

export default UserPage;