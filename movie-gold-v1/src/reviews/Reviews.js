import React, { useEffect, useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useParams } from "react-router-dom";
import api from '../api/axiosConfig';
import ReviewFrom from "../reviewForm/ReviewForm";
const Reviews = ({ getMovieData, movie, reviews, setReviews }) => {
  const revText = useRef();
  let params = useParams();
  const movieId = params.movieId;
  useEffect(() => {
    getMovieData(movieId);
  }, []);
  const addReview=async(e)=>{
    e.preventDefault()
    const rev=revText.current
    try {
        const response=await api.post("/api/v1/reviews",{reviewBody:rev.value,imdbId:movieId})
    const updatedReviews=reviews != null
    ? [...reviews, { body: rev.value }]
    : [{ body: rev.value }];
    rev.value=""
    setReviews(updatedReviews)
    } catch (error) {
        console.log(error)
    }
    

  }
  return (
    <Container>
      <Row>
        <Col>
          <h3>Review</h3>
        </Col>
      </Row>
      <Row className="mt-2">
        <Col>
          <img src={movie?.poster} alt="" />
        </Col>
        <Col>
          {
            <>
              <Row>
                <Col>
                  <ReviewFrom
                    handleSubmit={addReview}
                    revText={revText}
                    lableText="Write a review"
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <hr />
                </Col>
              </Row>
            </>
          }
          {reviews?.map((r) => {
            return (
              <>
                <Row>
                  <Col>{r.body}</Col>
                </Row>
                <Row>
                  <Col>
                    <hr />
                  </Col>
                </Row>
              </>
            );
          })}
        </Col>
      </Row>
      <Row>
        <Col>
          <hr />
        </Col>
      </Row>
    </Container>
  );
};
export default Reviews;
