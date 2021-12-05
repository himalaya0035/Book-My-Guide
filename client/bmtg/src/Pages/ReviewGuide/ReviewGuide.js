import React, {useState} from "react";
import PageHeader from "../../Components/PageHeader/PageHeader";
import "./ReviewGuide.css";
import {makePostRequest} from "../../makePostRequest";
import DJANGO_URL from "../../constants";
import {useParams} from "react-router-dom";

function ReviewGuide() {
    const [stars, setStars] = useState(0);
    const [review, setReview] = useState("");
    const [starsErr, setStarsErr] = useState("");
    const [reviewErr, setReviewErr] = useState("");
    const [button1, setButton1] = useState(false);
    const [button2, setButton2] = useState(false);
    const [button3, setButton3] = useState(false);
    const {guideId} = useParams();
    const rate = (e) => {
        let classname = e.target.className;
        let star = parseInt(classname.split(" ")[2][4]);
        for (let i = 1; i <= star; ++i) {
            let starSpan = document.getElementsByClassName("star" + i)[0];
            starSpan.style.color = "orange";
        }
        for (let i = star + 1; i <= 5; ++i) {
            let starSpan2 = document.getElementsByClassName("star" + i)[0];
            starSpan2.style.color = "black";
        }
        setStars(star);
    };

    const submit = () => {
        let ok = 1;
        if (stars === 0) {
            setStarsErr("Please give some stars");
            ok = 0;
        } else {
            setStarsErr("");
        }

        if (review === "") {
            setReviewErr("Please write something about your guide");
            ok = 0;
        } else {
            setReviewErr("");
        }

        if (ok) {
            let arr = []

            if (button1)
                arr.push("Knowledgeable")
            if (button2)
                arr.push("Punctual")
            if (button3)
                arr.push("Humble")

            makePostRequest(DJANGO_URL + "/reviews/create", {
                content: review,
                rating: stars,
                guide: guideId,
                tags: arr
            }, "application/json").then(() => {
                window.location.href = '/guide/' + guideId + '/reviews'
            })

        }
    };

    return (
        <div className="reviewGuie">
            <PageHeader
                pageTitle={
                    <>
                        Write a <span style={{color: " #f78383"}}>Review</span>
                    </>
                }
            />
            <div className="reviewGuide__main">
                <div className="reviewGuide__first">
                    <h3>What do you like in the Guide</h3>
                    <div className="reviewGuide__buttons">
                        <button
                            className={button1 ? "selected__btn" : "unselected__btn"}
                            onClick={() => setButton1((prev) => !prev)}
                        >
                            Knowledgeable
                        </button>
                        <button
                            className={button2 ? "selected__btn" : "unselected__btn"}
                            onClick={() => setButton2((prev) => !prev)}
                        >
                            Punctual
                        </button>
                        <button
                            className={button3 ? "selected__btn" : "unselected__btn"}
                            onClick={() => setButton3((prev) => !prev)}
                        >
                            Humble
                        </button>
                    </div>
                </div>
                <h3 style={{marginTop: "20px", marginBottom: "10px"}}>
                    Rate this guide here with stars your satisfaction level
                </h3>
                <div className="reviewGuide__second">
                    <div className="reviewGuide__stars">
                        <span className="fa fa-star star1" onClick={rate}></span>
                        <span className="fa fa-star star2" onClick={rate}></span>
                        <span className="fa fa-star star3" onClick={rate}></span>
                        <span className="fa fa-star star4" onClick={rate}></span>
                        <span className="fa fa-star star5" onClick={rate}></span>
                    </div>
                    <div className="reviewGuide__starButton">
                        <div>{stars} / 5</div>
                    </div>
                </div>
                <p className="reviewGuide__err">{starsErr}</p>
                <div className="reviewGuide__third">
                    <h3>Write your own review in the following</h3>
                    <textarea
                        type="number"
                        name="timePerTour"
                        required
                        spellCheck="false"
                        placeholder="Write your review here"
                        value={review}
                        maxLength={100}
                        onChange={(e) => setReview(e.target.value)}
                    />
                    <p className="reviewGuide__err">{reviewErr}</p>
                </div>
                <div className="reviewGuide__submitBtn">
                    <button onClick={submit}>Submit Review</button>
                </div>
            </div>
        </div>
    );
}

export default ReviewGuide;
