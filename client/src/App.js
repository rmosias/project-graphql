import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from "graphql-tag";
import './App.css';

const GET_USERS = gql`
  {
    books {
      id
      title
      author
    }
  }
`;
const Book = ({ book: { title, author } }) => (
  <div className='Card'>
      <div>
      <h1 className='Card--name'>{title}</h1>
      </div>
      <p>{author}</p>
  </div>
)

function App() {
  const { loading, error, data } = useQuery(GET_USERS);

  if (error) return <h1>Something went wrong!</h1>
    if (loading) return <h1>Loading...</h1>

    return (
        <main className='App'>
            <h1>Books</h1>
            {data.books.map((book) => (
                <Book key={book.id} book={book} />
            ))}
        </main>
    )
}

export default App;
