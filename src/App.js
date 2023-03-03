import React from "react";
import IntroPage from "./Component/Intro-page";
import Question from "./Component/Questions";
import { nanoid } from "nanoid";
export default function App(){
    let [question,setQuestion]=React.useState([])
    let [checked,setChecked]=React.useState(false)
    let [counter,setCounter]=React.useState(0)
    let [started,setStarted]=React.useState(false)
    let [startGame,setStartGame]=React.useState(false)
    
    let shufflingAnswers=(arr)=>arr.sort(()=>Math.random()-.5)
        React.useEffect(()=>{
            let dummyArr=[]
            async function getQuestion() {
                const res = await fetch("https://opentdb.com/api.php?amount=5&category=21&difficulty=easy")
                const data = await res.json()
                data.results.forEach(q=>{
                    dummyArr.push({id:nanoid(),question:q.question,correctAnswer:q.correct_answer,selected:null,checked:false,answers:shufflingAnswers([...q.incorrect_answers,q.correct_answer])}) 
                })
            setQuestion(dummyArr)
    
            }
            getQuestion()

        },[started])
    
    function chooseAnswer(id,answer){
        setQuestion(prev=>
            prev.map((q)=>{
                if(q.id===id){
                    if(q.selected===answer){
                        return {...q,selected:null}
                    }
                    else return {...q,selected:answer}
                }else return q
            })

        )

    }

    function checkAnswer(){
        setQuestion(prev=>prev.map(el=>{return {...el,checked:true}}))}
     function checkBtn(){
        question.forEach(el=>{
            checkAnswer(el.selected)
        })
        setChecked(true)
        setCounter((oldValue)=>{
            question.forEach(el=>
                el.selected===el.correctAnswer?oldValue++:oldValue
            )
            return oldValue
        }
        )
    }
    function playAgain(){
        setStarted(prev=> !prev)
        setChecked(false)
    }
    function startGameHandler(){
        setStartGame(true)
    }
    let questionElement=question.map(q=>{
      return  (<Question key={q.id} questions={q.question} chooseAnswer={chooseAnswer} checkAnswer={checked} answers={q.answers} correctAnswer={q.correctAnswer} selected={q.selected} checked={q.checked} id={q.id} />)
    }) 
    return (
        <>
         <IntroPage startGameHandler={startGameHandler} startGame={startGame}>
         </IntroPage> 
         <div className={!startGame?"questions-container off":"questions-container"}>
            {questionElement}
        {checked===false?<button className="btn check" onClick={checkBtn}>Check Answer</button>
        :<div className="result-holder"> <button className="btn" onClick={playAgain}>Play Again?</button> 
        <span>{`you Scored ${counter}/5 correct answers`}</span></div>}
        </div>
        </>
    )
}