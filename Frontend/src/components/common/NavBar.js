import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { useDispatch, useSelector } from 'react-redux';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  NavbarText,
  Button, Modal, ModalHeader,
  Spinner,
  Form
} from 'reactstrap';
import TextField from './TextField';
import { addBook, getBooks } from '../../store/slice/bookSlice';
import { logoutUser } from '../../store/slice/authSlice';
import "../../assets/styles/auth.css"

const NavBar = (props) => {
  const [isOpen, setIsOpen] = useState(false);
  const [modal, setModal] = useState(false);
  const { register, handleSubmit, errors } = useForm();
  const dispatch = useDispatch()

  const toggle = () => setIsOpen(!isOpen);
  const toggleModal = () => setModal(!modal);

   // Method that handles the submission of register admin form
   const onSubmit = async data => {
    const { title, description } = data;
    const token = localStorage.getItem('token')

    // restructure all required user data
    const requestPayload = {
      title,
      description,
      token
    };
    // dispatch the action that create and register a user.
    dispatch(addBook(requestPayload))
    dispatch(getBooks())
  };

  const onLogoutUser = async () => {
    dispatch(logoutUser())
  }

  const {
    addBookIsLoading
  } = useSelector(state => state.bookReducer)


  return (
    <div>
      <Navbar expand="md" dark style={{ background: "#262262" }}>
        <NavbarBrand href="/">BOOK</NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
        <div className="" style={{ cursor: 'pointer' }}>
            <NavbarText
              onClick={toggleModal}
              >
              Add book
            </NavbarText>
          </div>
          <div className="ml-4" style={{ cursor: 'pointer' }}>
            <NavbarText
              onClick={onLogoutUser}
              >
              Log Out
            </NavbarText>
          </div>
        </Collapse>
      </Navbar>

      <Modal isOpen={modal} toggle={toggleModal} className="mt-5">
        <ModalHeader toggle={toggle}>Add Book</ModalHeader>
        <Form className="container" onSubmit={handleSubmit(onSubmit)}>
          <TextField
              label="Title"
              register={register({
                required: 'This field is required',
              })}
              errors={errors.title}
              type="text"
              name="title"
            />
            <TextField
              label="Description"
              register={register({
                required: 'This field is required',
              })}
              errors={errors.description}
              type="text"
              name="description"
            />

          <Button
            className="authButton mt-2 mb-4"
            outline={false}
            >
            {addBookIsLoading ? <Spinner color="light" size="sm" /> : null}
            {'  '}
            Add Book
          </Button>
        </Form>
      </Modal>
    </div>
  );
}

export default NavBar;