import React, {useEffect, useState} from "react";
import "./GuideVIew.css";
import ReviewCard from "../../Components/ReviewCard/ReviewCard";
import CardTypeTwo from "../../Components/CardTypeTwo/CardTypeTwo";
import PageHeader from "../../Components/PageHeader/PageHeader";
import {useParams} from "react-router-dom";
import {makeGetRequest} from "../../makeGetRequest";
import DJANGO_URL from "../../constants";

function GuideView() {
    const [reviews, setReviews] = useState([]);
    const {guideId} = useParams();
    const [guideDetails, setGuideDetails] = useState();


    useEffect(() => {
        const res = makeGetRequest(DJANGO_URL + "/reviews/create?guide=" + guideId);
        const url = DJANGO_URL  + "/guide/" + guideId
        const res2 = makeGetRequest(url)

        Promise.all([res, res2]).then((values => {
            setReviews(values[0].data)
            setGuideDetails(values[1].data);
        }))


    },[guideId])

    return (
        <div className="guideView">
            <PageHeader
                pageTitle={
                    <>
                        Guide's <span style={{color: "#f78383"}}>Review</span>
                    </>
                }
            />
            <div
                className="guideView__first"
                style={{
                    background:
                        "url('https://images.unsplash.com/photo-1548013146-72479768bada?ixid=MnwxMjA3fDB8MHxzZWFyY2h8NXx8dGFqJTIwbWFoYWwlMjBhZ3JhJTIwaW5kaWF8ZW58MHx8MHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=60')",
                }}
            >
                <div className="guideInformation">
                    {guideDetails && (
                        <CardTypeTwo link="/guide/1" isReview={true} data={guideDetails}/>)}
                    <div className="featuredReview flex flex-center">
                        <p
                            style={{
                                textAlign: "center",
                                fontStyle: "italic",
                                fontSize: "16px",
                            }}
                        >
                            &ldquo;  A very Knowledgebale Guide, Punctual and Humble as well  &rdquo;
                        </p>
                    </div>
                </div>
            </div>
            <div className="guideView__second">
                {reviews.map(review => {
                        const dateTime = new Date(review.created_at)
                        return (<ReviewCard content={review.content} imgUrl={review.user_data.image}
                                            fullName={review.user_data.name} rating={review.rating}
                                            date={String(dateTime.getDate()) + " " + String(dateTime.toLocaleString('default', {month: 'short'}))}
                                            time={dateTime.toLocaleTimeString().slice(0, 5)}/>)
                    }
                )}
            </div>
        </div>
    );
}

export default GuideView;
