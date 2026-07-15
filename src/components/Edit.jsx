import { useNavigate, useParams } from "react-router-dom";
import useDiary from "../hooks/useDiary";
import Button from "./Button";
import Header from "./Header";
import { useContext, useEffect } from "react";
import { DiaryDispatchContext } from "../App";
import Editor from "./Editor";
import { setPageTitle } from "./util";

const Edit = ()=>{
    useEffect(()=>{setPageTitle("감정 일기장 : 수정")},[]);
    
    const {onDelete, onUpdate} = useContext(DiaryDispatchContext);
    const {id} = useParams();
    const data = useDiary(id);
    const navigate = useNavigate();
    const goBack = ()=>{navigate(-1)}
    const onClickDelete = () => {
        if (window.confirm("일기를 정말 삭제할까요? 다시 복구되지 않아요!")) {
            onDelete(Number(id));
            navigate('/', { replace: true });
        }
    };
    
    const onSubmit = (data) => {
        if (window.confirm("일기를 정말 수정할까요?")) {
            const { date, content, emotionId } = data;
            onUpdate(id, date, content, emotionId);
        }
        navigate("/", { replace: true });
    };
 
    if(!data)   return <div>일기 로딩중...</div>
    else        return (
        <div>
            <Header title={'일기 수정하기'}
                    leftChild={<Button text={'<뒤로가기'} onClick={goBack}/>}
                    rightChild={<Button text={'삭제하기'} type={'negative' }
                    onClick={onClickDelete}/>}            
            />
            <Editor initData={data} onSubmit={onSubmit}/>
        </div>
    )
}
export default Edit;
