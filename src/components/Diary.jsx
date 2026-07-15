import { useNavigate, useParams } from "react-router-dom"; 
import useDiary from "../hooks/useDiary";
import { getFormattedDate } from "./util";
import Header from "./Header";
import Button from "./Button";
import Viewer from "./Viewer";
import { useEffect } from "react";
import { setPageTitle } from "./util";

const Diary = ()=>{
    useEffect(()=>{setPageTitle("감정 일기장 : 보기")},[]);
    const {id} = useParams();
    const data = useDiary(id);

    const navigate = useNavigate();
    const goBack = ()=>{navigate(-1);}
    const goEdit = ()=>{navigate(`/edit/${id}`)} 
    
    if(!data) return <div>일기 로딩중...</div>
    else {
        const {date,emotionId,content} = data;
        const title = `${getFormattedDate(new Date(Number(date)))} 기록`
        
        return (
        <div>
            <Header 
                title = {title}
                leftChild={<Button text={'< 뒤로가기'} onClick={goBack} />}
                rightChild={<Button text={'수정하기'} onClick={goEdit} />} />
            <Viewer emotionId={emotionId} content={content}></Viewer>
        </div>
        );
    }
}
export default Diary;



