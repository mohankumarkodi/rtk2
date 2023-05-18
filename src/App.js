import { useState } from "react";
import "./App.css";
import {
  useGetTodosQuery,
  useAddTodoMutation,
  useGetTodoQuery,
  useDeleteTodoMutation,
  useUpdateTodoMutation,
} from "./components/features/apiSlice";
import { useFormik } from "formik";
import {Form,InputGroup,Button} from "react-bootstrap";

export const Delete = () => {
  const [deleteId, setDeleteId] = useState(null);
  const [deleteTodo, res] = useDeleteTodoMutation();
  console.log(res);

  const handleDelete = (id) => {
    deleteTodo(id);
    setDeleteId(null);
  };
  return (
    <div>
      <input
        onChange={(event) => {
          setDeleteId(event.target.value);
        }}
        type="text"
        value={deleteId}
      />
      <input type="color" />
      <br />
      <button onClick={() => handleDelete(deleteId)}>deleteTodo</button>
    </div>
  );
};

export const Todo = () => {
  const { data, isLoading, isError, error, isSuccess } = useGetTodoQuery(3);

  let content;
  if (isLoading) {
    content = <h1>Loading...</h1>;
  } else if (isSuccess) {
    content = JSON.stringify(data);
  } else if (isError) {
    content = <p>{error}</p>;
  }

  return (
    <div>
      <button>AllTodo</button>
      {content}
      <br />
    </div>
  );
};
export const AllTodo = () => {
  const { data } = useGetTodosQuery();
  let listTodods = [];
  if (data !== undefined) {
    listTodods = data;
  }

  return (
    <ul>
      {listTodods.map((eachone) => (
        <div>
          <p>userId:{eachone.userId}</p>
          <p>Id:{eachone.id}</p>
          <p>title:{eachone.title}</p>
          <p>completed:{eachone.completed}</p>
          <hr />
        </div>
      ))}
    </ul>
  );
};

export const AddAll = () => {
  const [addTodo] = useAddTodoMutation();

  const formik = useFormik({
    initialValues: {
      id: "",
      userId: "",
      title: "",
      completed: "  false",
    },
    onSubmit: (values) => {
      addTodo(values);
      formik.resetForm();
    },
  });

  return (
    <Form onSubmit={formik.handleSubmit}>
      <Form.Label>userId</Form.Label>
      <Form.Control type="text" {...formik.getFieldProps("userId")} />
      <br />
      <Form.Label>id</Form.Label>
      <Form.Control type={"text"} {...formik.getFieldProps("id")} />
      <br />
      <Form.Label>title</Form.Label>
      <Form.Control type="text" {...formik.getFieldProps("title")} />
      <br />

      <button type="submit">addTodo</button>
      <InputGroup className="mb-3">
      <Button
        variant="outline-primary"
        id="button-addon1"
        style={{ backgroundColor: '#fff', color: '#007bff' }}
        onMouseOver={(e) => {
          e.target.style.backgroundColor = '#007bff';
          e.target.style.color = '#fff';
        }}
        onMouseOut={(e) => {
          e.target.style.backgroundColor = '#fff';
          e.target.style.color = '#007bff';
        }}
      >
        Button
      </Button>
      <Form.Control
        aria-label="Example text with button addon"
        aria-describedby="basic-addon1"
      />
    </InputGroup>
    </Form>
  );
};
