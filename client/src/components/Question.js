import React, { useEffect, useState } from "react";
import Accordion from "react-bootstrap/Accordion";

export default function Question() {
  const [questionList, setQuestionList] = useState({});
  useEffect(() => {
    fetch("http://localhost:3001/questions")
      .then((response) => response.json())
      // .catch((err) => console.log(err))
      .then((data) => {
        console.log(data);
        setQuestionList(data);
      });
  }, []);
  return (
    <>
      {Array.isArray(questionList) ? (
        questionList.map((item, index) => {
          return (
            <div key={index}>
              <Accordion>
                <Accordion.Item eventKey="index">
                  <Accordion.Header>
                    Question # {index + 1} : <span>{item.question}</span>
                  </Accordion.Header>
                  <Accordion.Body>{item.answer}</Accordion.Body>
                </Accordion.Item>
              </Accordion>
            </div>
          );
        })
      ) : (
        <div className="container text-center text-danger">
          No Question Found...!
        </div>
      )}
    </>
  );
}
