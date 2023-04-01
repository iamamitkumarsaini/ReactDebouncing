import { useEffect, useMemo, useState } from "react";
import "./App.css"

function App() {
  const [arr, setArr] = useState([]);
  const [searched, setSearched] = useState("");

  const getData = async (search) => {
    if(search !== ""){
      let res = await fetch(`http://www.omdbapi.com/?apikey=96434885&s=${search}`);
      let data = await res.json();
      console.log(data.Search)
      setArr(data.Search || [])
    }
    else if(search===""){
      let res = await fetch(`http://www.omdbapi.com/?apikey=96434885&s=batman`);
      let data = await res.json();
      console.log(data.Search)
      setArr(data.Search)
    }
  }

  const debounce = (anyFunc,delay) => {
    let timer;
    return function () {
      const context = this,
      args = arguments;
      clearTimeout(timer);

      timer = setTimeout(() => {
        console.log("amit", context,args)
        anyFunc.apply(context,args)
      },delay)
    }
  }

  const debounceFunc = useMemo(() => debounce((value) => {
    getData(value)
  },900), [])

  const handleChange = (e) => {
    setSearched(e.target.value)
    debounceFunc(e.target.value)
  }

  useEffect(() => {
    getData(searched)
  },[])
  
  return (
    <>
    <div className="search" >
      <input type="text" placeholder="Search" value={searched} onChange={handleChange}/>
    </div>
    <div className="container" >
      {
        arr.length>0 && arr.map((ele) => (
          <div key={ele.imdbID}>
            <img src={ele.Poster} alt={ele.Title} />
            <h3>{ele.Title}</h3>
            <p>Type: {ele.Type}</p>
            <h5>Release Year: {ele.Year}</h5>
          </div>
        ))
      }
    </div>
    </>
  );
}

export default App;
