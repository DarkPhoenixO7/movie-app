import logo from './logo.svg';
import './App.css';
import api from '../src/api/axiosConfig'
import { useEffect, useState } from 'react';
import Layout from './component/layout';
import { Route, Routes } from 'react-router-dom';
import Home from './component/home/Home';
import Header from './component/header/Header';
import Trailer from './component/trailer/Trailer';
import Reviews from './reviews/Reviews';
function App() {
  const [movies, setMovies]=useState([])
  const[movie,setMovie]=useState()
  const [reviews, setReviews]=useState([])
  const getMovies= async()=>{
    try{
      const response=await api.get("/api/v1/movies")
      setMovies(response.data)
    }
    catch(error){
      console.log(error)
    }
  }
  const getMovieData= async(movieId)=>{
    try {
      const response=await api.get(`/api/v1/movies/${movieId}`)
      const singleMovie=response.data
      setMovie(singleMovie)
      setReviews(singleMovie.reviews)
    } catch (error) {
      console.log(error)
    }
  }
  useEffect(()=>{
    getMovies()
  },[])
  return (
    <div className="App">
      <Header />
      <Routes>
         <Route path='/' element={<Layout/>}>
          <Route path='/' element={<Home movies={movies}/>} />
          <Route path='/Trailer/:ytTrailerId' element={<Trailer/>} />
          <Route path='/Reviews/:movieId' element={<Reviews getMovieData={getMovieData} movie={movie} reviews={reviews} setReviews={setReviews}/>} />

         </Route>
      </Routes>
      
    </div>
  );
}

export default App;
