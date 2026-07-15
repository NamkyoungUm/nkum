import './Viewer.css'
import { emotionList } from './util';

const Viewer = ({emotionId, content})=>{
    const emotionItem = emotionList.find((it)=> String(it.id) === String(emotionId));
    console.log(emotionItem);

    const {name, img} = emotionItem; 

    return (
    <div className="Viewer">
        <section>
            <h4>오늘의 감정</h4>
            <div className={`emotion_img_wrapper emotion_img_wrapper_${emotionId}`}>
                <img alt={name} src={img}/>
                <div className='emotion_descript'>{name}</div>
            </div>
        </section>
        <section>
            <h4>오늘의 일기</h4>
            <div className='content_wrapper'>
                <p>{content}</p>
            </div>
        </section>
    </div>)
}

export default Viewer;



