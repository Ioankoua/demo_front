<template>
  <div>
    <h1>Authors</h1>
    <ul>
      <li v-for="author in authors" :key="author.id">{{ author.first_name }} {{ author.last_name }}</li>
    </ul>

    <h1>Add New Author</h1>
    <form @submit.prevent="addAuthor">
      <input v-model="newAuthor.first_name" placeholder="First Name" required />
      <input v-model="newAuthor.last_name" placeholder="Last Name" required />
      <input v-model="newAuthor.middle_name" placeholder="Middle Name" />
      <button type="submit">Add Author</button>
    </form>

    <h1>Books</h1>
    <ul>
      <li v-for="book in books" :key="book.id">{{ book.title }}</li>
    </ul>

    <h1>Add New Book</h1>
    <form @submit.prevent="addBook">
      <input v-model="newBook.title" placeholder="Title" required />
      <input v-model="newBook.description" placeholder="Description" />
      <input v-model="newBook.image" placeholder="Image URL" />
      <input v-model="newBook.publication_date" placeholder="Publication Date" />
      <button type="submit">Add Book</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'Home',
  data() {
    return {
      authors: [],
      newAuthor: {
        first_name: '',
        last_name: '',
        middle_name: ''
      },
      books: [],
      newBook: {
        title: '',
        description: '',
        image: '',
        publication_date: ''
      }
    };
  },
  methods: {
    fetchAuthors() {
      axios.get('http://localhost:8000/api/authors')
        .then(response => {
          this.authors = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    addAuthor() {
      axios.post('http://localhost:8000/api/authors', this.newAuthor)
        .then(response => {
          this.fetchAuthors();
          this.newAuthor = {
            first_name: '',
            last_name: '',
            middle_name: ''
          };
        })
        .catch(error => {
          console.error(error);
        });
    },
    fetchBooks() {
      axios.get('http://localhost:8000/api/books')
        .then(response => {
          this.books = response.data;
        })
        .catch(error => {
          console.error(error);
        });
    },
    addBook() {
      axios.post('http://localhost:8000/api/books', this.newBook)
        .then(response => {
          this.fetchBooks();
          this.newBook = {
            title: '',
            description: '',
            image: '',
            publication_date: ''
          };
        })
        .catch(error => {
          console.error(error);
        });
    }
  },
  mounted() {
    this.fetchAuthors();
    this.fetchBooks();
  }
};
</script>

<style scoped>
/* Ваши стили здесь */
</style>
