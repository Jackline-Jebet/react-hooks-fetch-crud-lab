/* eslint-disable no-template-curly-in-string */
import React, {useEffect, useState} from "react";
import QuestionItem from "./QuestionItem";

function QuestionList() {
  const [questions, setQuestions] = useState([]);

  useEffect(()=>{
    fetch("http://localhost:3000/questions")
    .then((res)=>res.json())
    .then((questions)=>{
      setQuestions(questions);
    });
  },[]);

  function handleDelete(id){
    // eslint-disable-next-line no-template-curly-in-string
    fetch('http://localhost:3000/questions/${id}',{
      method:"DELETE",
    })
    .then((res)=>res.json())
    .then(() =>{
      const updatedQuestions = questions.filter((q) =>q.id !==id);
      setQuestions(updatedQuestions)
      });
  }

  function handleAnswerChange(id, correctIndex){
    fetch("http://localhost:3000/questions/${id}",{
      method:"PATCH",
      headers: {
        "Content-Type": "application/json",
    },
    body:JSON.stringify({correctIndex}),
  })
  .then((r) =>r.json())
  .then((updatetdQuestions) =>{
    const updatedQuestions=questions.map((q)=>{
      if(q.id===updatedQuestions.id)
      return updatedQuestions;
      return q;
    });
    setQuestions(updatedQuestions);
  });
  }

  const questionItems = questions.map((q) =>(
    <QuestionItem key={q.id} question={q} onDelete={handleDelete} onAnswerChange={handleAnswerChange}/>
  ));

  return (
    <section>
      <h1>Quiz Questions</h1>
      <ul>{questionItems}</ul>
    </section>
  );
}

export default QuestionList;
