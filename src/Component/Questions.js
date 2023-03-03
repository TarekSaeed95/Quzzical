import React from "react";
import { nanoid } from "nanoid";
export default function Question (props){
    
let answerElement=props.answers.map(answer=>{
    let id=""
    if(props.checked===true && props.correctAnswer===answer){
        id="correct"}
   else if (props.selected===answer && props.checked===true && props.correctAnswer!==answer){id="incorrect"}
    else {id="unselected"}
    
    return(<span id={id} key={nanoid()} selected={false} onClick={()=>{props.chooseAnswer(props.id,answer,props.correctAnswer)
        }}  className={answer===props.selected?"answer clicked":"answer"}>{answer}</span>)
})
    return (
        <div className="question-holder">
            <div className="container">
            <p>{props.questions}</p>
            <div className="answers">
                {answerElement}
             </div>
            </div>
        </div>
    )
}