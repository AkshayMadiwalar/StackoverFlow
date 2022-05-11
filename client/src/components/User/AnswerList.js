import React, {useState,useEffect} from 'react'
import { Row, Col, Card, Button , Pagination} from 'react-bootstrap'
import { useNavigate } from 'react-router'
import moment from 'moment'
import { useParams } from 'react-router-dom'
import Axios from 'axios'
import Constants from '../util/Constants.json'
const AnswerList = (props) => {
    // const arr = [1, 2, 3, 4, 5, 6]
    const { userid } = useParams();
    const navigate = useNavigate();
    const [state,setstate] = useState([]);
    useEffect(()=>{
        async function getAnswers(){
            await Axios.get(`${Constants.uri}/api/users/${userid}/activity/answers`, {
              withCredentials: true
          }).then((r) => {
              setstate(r.data)
          })
          }
         getAnswers()  
         var list = []
        for (var i = startOffset; i <= endOffset; i++) {
            list.push(i)
        }
        setPageCount(list)
    },[])

    const [pageCount, setPageCount] = useState([])
    const [startOffset, setStartOffset] = useState(1)
    const [endOffset, setEndOffset] = useState(5)

    const openQuestion = (id) =>{
        navigate(`/questions/${id}`);
        // console.log(id)
    }

    const openTag = (tag) => {
        navigate(`/tags/${tag}/?show_user_posts=${false}&filterBy=${false}`);
      }


      
    const nextPageSet = () => {
        var list = []
        for (var i = startOffset+15; i <= endOffset+15; i++) {
            list.push(i)
        }
        setPageCount(list)
        setStartOffset(startOffset+15)
        setEndOffset(endOffset+15)
    }

    const previousPageSet = () => {
        if(startOffset >= 15){
            var list = []
            for (var i = startOffset-15; i <= endOffset-15; i++) {
                list.push(i)
            }
            setPageCount(list)
            setStartOffset(startOffset-15)
            setEndOffset(endOffset-15)
        }
    }
    const handlePage = async (index) => {
        
        const res = await Axios.get(`${Constants.uri}/api/users/${userid}/activity/answers?offset=${10*(index-1)}`)
        // dispatch(postReducer(res.data.questionsForDashboard))
        setstate(res.data);
    }

    return (
        <div>
            <Row>
                <h5>{state.length} {props.text}</h5>
            </Row>
            {
                state.map((i) => (
                    <Card>
                        <div style={{ margin: "1rem" }}>
                            <Row>
                            <Col sm={2}><text>{i.score} votes</text></Col>
                            {i.question.accepted_answer_id && <Col><Button style={{backgroundColor:"green", color:"white",marginTop:"-10px"}}>✔{props.text}</Button></Col>}
                            </Row>
                            <Row><text style={{ color: "hsl(206deg 100% 40%)", fontSize: "14px" }} onClick={()=>openQuestion(i.question.id)}>{i.question.title}</text></Row>
                            <Row>
                            <Col sm={6}>
                            {
                                <Row>
                                 <Col sm={6}>{ i.question.tags.map((obj) => (
                                    <button onClick={() => openTag(obj)} style={{ padding: 0, fontSize: 13, color: "hsl(205deg 47% 42%)", backgroundColor: "hsl(205deg 46% 92%)", border: "0", marginLeft: "9px", paddingTop: "1px", paddingBottom: "1px", paddingLeft: "6px", paddingRight: "6px" }}>
                                    <text  style={{ fontSize: "13px", cursor:"pointer" }}>{obj}</text>
                                </button>
                            ))}</Col>
                                    
                            
                                </Row>
                            }
                            </Col>
                            <Col sm={1}></Col>
                            <Col>answered {moment(i.created_date).fromNow()}</Col>
                            </Row>
                        </div>
                    </Card>
                ))
            }
            <Pagination style={{marginLeft:"24rem"}}>
            <Pagination.First onClick={() => previousPageSet()} />

            {pageCount.map(item => (
               <Pagination.Item onClick={() => handlePage(item)}>{item}</Pagination.Item>
            ))
        }
            <Pagination.Last onClick={() => nextPageSet()} />
        </Pagination>
        </div>
    )
}

export default AnswerList