import {Route, Routes, Link} from 'react-router-dom'
import {getEmotionImgById} from './components/util.js'
import React, {useState, useReducer, useRef, useEffect} from 'react'
import Home from './components/Home'
import New from './components/New'
import Edit from './components/Edit'
import Diary from './components/Diary'
import './App.css'

const reducer = (state,action)=>{
  switch (action.type){
    case 'CREATE' :{
      const newData = [action.data, ...state];
      localStorage.setItem("diary", JSON.stringify(newData)); 
      return newData;}
    case 'UPDATE' :{
      const newData = state.map((it)=>String(it.id)===String(action.data.id)? {...action.data}:it)
      localStorage.setItem("diary", JSON.stringify(newData));
      return newData;} 
    case 'DELETE' :{
      const newData = state.filter((it)=> String(it.id)!==String(action.targetId))
      localStorage.setItem("diary", JSON.stringify(newData));
      return newData;}
    case 'INIT' :   {
      const initData = JSON.parse(localStorage.getItem("diary"));
      if(initData) return initData;
      return action.data;
    }
    default :       return state;
  }
}

const mockData = [
  {id: 1, date: new Date().getTime() - 1, content: "mock1", emotionId: 1},
  {id: 2, date: new Date().getTime() - 2, content: "mock2", emotionId: 2},
  {id: 3, date: new Date().getTime() - 3, content: "mock3", emotionId: 3},
]

export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  const [data, dispatch] = useReducer(reducer, []);
  const idRef = useRef(4);

  const [isDataLoaded, setIsDataLoaded] = useState(false);

  useEffect(()=>{
    dispatch({
      type : "INIT", 
      data : mockData
    }); 
    setIsDataLoaded(true);
  }, [])

  const onCreate = (date, content, emotionId)=>{
    dispatch({type : "CREATE", 
              data : {
                id : idRef.current, 
                date : new Date().getTime(), 
                content, 
                emotionId
              }
            })
    idRef.current += 1;
  }

  const onUpdate = (targetId, date, content, emotionId)=>{
    dispatch({type : "UPDATE", 
              data : {
                id: targetId, 
                date : new Date(date).getTime(),
                content, 
                emotionId
              }
            })
  }

  const onDelete = (targetId)=>{
    dispatch({type : "DELETE", 
              targetId
            })
  }

  if(!isDataLoaded) return <div>데이터 로딩중</div>
  else {
    return (
      <DiaryStateContext.Provider value={data}>
        <DiaryDispatchContext.Provider value = {
          {onCreate, onUpdate, onDelete}
        }>
          <div className = "App">
            <Routes>
              <Route path="/" element={<Home />}/>
              <Route path="/new" element={<New />}/>
              <Route path="/diary/:id" element={<Diary />}/>
              <Route path="/edit/:id" element={<Edit />}/>
            </Routes> 
          </div>
        </DiaryDispatchContext.Provider>
      </DiaryStateContext.Provider>
    );
  }
}

export default App
