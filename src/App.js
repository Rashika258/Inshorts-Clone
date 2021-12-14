import React, { useEffect, useState } from 'react'
import NavInshorts from './components/NavInshorts/NavInshorts'
import Footer from './components/Footer/Footer';
import NewsContent from './components/NewsContent/NewsContent';
import axios from "axios";

const App = () => {

  const [newsArray,setNewsArray]=useState([]);
  const [newsResults,setNewsResults]=useState();
  const [loadMore,setLoadMore]=useState(20);
  const [category,setCategory]=useState("general");

  console.log(process.env);

  const newsApi=async()=>{
    try {
      // const proxyUrl = "https://cors-anywhere.herokuapp.com/";

      const news = await axios.get(
        `https://newsapi.org/v2/top-headlines?country=in&apiKey=${process.env.REACT_APP_API_KEY}&pageSize=${loadMore}&category=${category}`
      );

      setNewsArray(news.data.articles);
      setNewsResults(news.data.totalResults);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    newsApi();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [newsResults,loadMore,category]);

  return (
    <div className='App' id='#home'>
      <NavInshorts setCategory={setCategory}/>
      {newsResults && (
        <NewsContent
        newsArray={newsArray}
        newsResults={newsResults}
        loadMore={loadMore}
        setLoadMore={setLoadMore} />


      )}
      <Footer />
    </div>
  )
}

export default App
