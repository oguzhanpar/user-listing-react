import React, { useState } from 'react'
import Card from "../UI/Card";
import classes from "./AddUser.module.css"
import Button from "../UI/Button";
import ErrorModal from "../UI/ErrorModal";

const AddUser = (props) => {

  const [enteredUsername, setEnteredUsername] = useState('')
  const [enteredAge, setEnteredAge] = useState('')
  const [error, setError] = useState('');


  const addUserHandler = (event) => {
    event.preventDefault();

    if (enteredUsername.trim().length === 0 || enteredAge.trim().length === 0) {
      setError({
        title: 'Geçerli bir değer giriniz',
        message: 'Kullanıcı adı ve yaşı için geçerli bir değer giriniz'
      })
      return
    }

    if (+enteredAge < 1) {
      setError({
        title: 'Geçersiz yaş bilgisi',
        message: 'Kullanıcı yaşı 0 dan büyük olmalıdır'
      })
      return
    }

    props.onAddUser(enteredUsername, enteredAge)
    setEnteredAge('')
    setEnteredUsername('')

  }

  const usernameChangeHandler = (event) => {
    setEnteredUsername(event.target.value)
  }

  const ageChangeHandler = (event) => {
    setEnteredAge(event.target.value)
  }

  const errorHandler = () => {
    setError(null)
  }

  console.log(error);

  return (
    <>
      {error && (
        <ErrorModal
          title={error.title}
          message={error.message}
          onConfirm={errorHandler}
        />
      )}
      <Card className={classes.input}>
        <form onSubmit={addUserHandler}>
          <label htmlFor="username">Username</label>
          <input type="text" id="username" onChange={usernameChangeHandler} value={enteredUsername} />
          <label htmlFor="age">Age (Years)</label>
          <input type="number" id="age" onChange={ageChangeHandler} value={enteredAge} />
          <Button type="submit"> Add User </Button>
        </form>
      </Card>
    </>

  )
}

export default AddUser