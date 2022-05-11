import React, { useEffect, useState } from 'react'
import { Col, Row, Card, Button } from 'react-bootstrap'
import { Link, useParams, useSearchParams } from 'react-router-dom'
import Constants from '../../util/Constants.json'
import axios from 'axios'
import moment from 'moment'
import parse from 'html-react-parser'
const TagOverview = () => {
    const { tagname } = useParams();
    const [searchParams, setSearchParams] = useSearchParams();
    const show_user_posts = searchParams.get('show_user_posts')
    const filterBy = searchParams.get('filterBy')
    // var description = "swdasd"
    const [description, setdescription] = useState("");
    const [questions, setQuestions] = useState([])
    const [title, settitle] = useState("")
    useEffect(() => {
        async function getQuestionforTags() {
            // const res = await axios.get(`${Constants.uri}/api/tags/${tagname}/?show_user_posts=${show_user_posts}&filterBy=${filterBy}`, { withCredentials: true })
            const res1 = await axios.get(`${Constants.uri}/api/tags/${tagname}/questions?filterBy=interesting`)
            setQuestions(res1.data.Posts)
            setdescription(res1.data.description);
        }
        getQuestionforTags();
    }, [])
    const openInteresting = async()=>{
        // const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=interesting`);
        // dispatch(postReducer(res.data.questionsForDashboard));
        // dispatch(titleReducer("Interesting"))
        //  settitle("Interesting")
      }
      const openHot = async()=>{
        // const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=hot`);
        // dispatch(postReducer(res.data.questionsForDashboard));
        // dispatch(titleReducer("Hot"))
        // settitle("Hot")    
      }
      const openScore = async()=>{
        // const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=score`);
        // dispatch(postReducer(res.data.questionsForDashboard));
        // dispatch(titleReducer("Score"))
        // settitle("Score")
       
      }
      const openUnanswered = async()=>{
        // const res = await axios.get(`${Constants.uri}/api/post/dashboard/?filterBy=unanswered`);
        // dispatch(postReducer(res.data.questionsForDashboard));
        // dispatch(titleReducer("Unanswered"))
        // settitle("Unanswered")
     
      }

    return (
        <div>
            <Row>
                <Col sm={2}></Col>
                <Col sm={7}>

                    <Row style={{ marginBottom: "1rem", marginTop: "17px" }}><h3>Questions tagged [{tagname}]</h3></Row>
                    <Row style={{ marginBottom: "2rem" }}><text>{description}</text></Row>
                    <Row style={{ marginBottom: "1rem" }}><Col sm={5}><h5>{questions.length} questions</h5></Col>
                        <Col sm={7} style={{ marginLeft: "-3rem", marginTop: "7px" }}>
                            <button style={title == "Interesting" ? { backgroundColor: "#D0D0D0", marginRight: "1px", borderWidth: "1px" } : { backgroundColor: "white", marginRight: "1px", color: "hsl(210deg 8% 45%)", borderWidth: "1px" }} onClick={openInteresting}>Interesting</button>
                            <button style={title == "Hot" ? { backgroundColor: "#D0D0D0", marginRight: "1px", borderWidth: "1px" } : { backgroundColor: "white", color: "hsl(210deg 8% 45%)", marginRight: "1px", borderWidth: "1px" }} onClick={openHot}>Hot</button>
                            <button style={title == "Score" ? { backgroundColor: "#D0D0D0", marginRight: "1px", borderWidth: "1px" } : { backgroundColor: "white", color: "hsl(210deg 8% 45%)", marginRight: "1px", borderWidth: "1px" }} onClick={openScore}>Score</button>
                            <button style={title == "Unanswered" ? { marginRight: "1rem", backgroundColor: "#D0D0D0", marginRight: "1px", borderWidth: "1px" } : { backgroundColor: "white", color: "hsl(210deg 8% 45%)", marginRight: "1px", borderWidth: "1px" }} onClick={openUnanswered}>Unanswered</button>
                        </Col></Row>

                    <hr style={{ marginTop: "1rem" }}></hr>

                    {questions && questions.map(question => (
                        <Row>
                            <Col sm={2} style={{ marginRight: "-3rem" }}>
                                <Row style={{ marginLeft: "50px" }}>{question.score} votes</Row>
                                <Row><button style={{ backgroundColor: "hsl(140deg 40% 47%)", border: "0", width: "7rem", borderRadius: "3px", color: "white" }} ><i style={{ color: "white" }} class="fa-solid fa-check"></i> {question.answers_count} answers</button></Row>
                                <Row><span style={{ marginLeft: "50px", color: "hsl(27,90%,55%)" }}>{question.views_count} views</span></Row>
                            </Col>
                            <Col sm={1}></Col>
                            <Col sm={9}>
                                <Row>
                                    <Col>
                                        <Link to={`/questions/${question.id}`} style={{ textDecoration: "none", fontSize: 20, color: "hsl(206deg 100% 40%)", fontSize: "17px" }}>{question.title}</Link>
                                    </Col>
                                </Row>
                                <Row className='textLimit'>
                                    <text style={{ color: "hsl(210deg 8% 25%)", fontSize: "13px" }}>{parse(question.body)}</text>
                                </Row>
                                <Row>
                                    <Col sm={6}>{question.tags.map(tag => (<Button style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>{tag}</Button>))}&nbsp;&nbsp;&nbsp;</Col>

                                </Row>
                                <Row>
                                    <span className='text-muted' style={{ fontSize: 13, textAlign: 'right' }}><Link to={`/User/${question.User.id}`}><img style={{ width: "15px", height: "15px" }} src={question.User.photo}></img>{question.User.username}</Link> asked,  {moment(question.created_date).fromNow()}</span>
                                </Row>
                                <Row>
                                    <Col><hr style={{ marginTop: "1rem", marginLeft: "-143px" }}></hr></Col>

                                </Row>
                            </Col>

                        </Row>
                    ))}

                </Col>
            </Row>


        </div>
    )
}

export default TagOverview