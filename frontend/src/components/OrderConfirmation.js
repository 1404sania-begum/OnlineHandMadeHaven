// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";

// const OrderConfirmation = () => {
//     const navigate = useNavigate();
//     const [orderDetails, setOrderDetails] = useState(null);
//     const [feedback, setFeedback] = useState("");
//     const [rating, setRating] = useState(0);

//     const ratingLabels = {
//         1: "😞 Poor Craftsmanship",
//         2: "👎 Needs More Finesse",
//         3: "👌 Decent Art",
//         4: "✨ Crafted with Care",
//         5: "🌟 True Artisan Magic",
//     };

//     useEffect(() => {
//         const storedDetails = localStorage.getItem("orderDetails");
//         if (storedDetails) {
//             setOrderDetails(JSON.parse(storedDetails));
//         } else {
//             navigate("/payment");
//         }
//     }, [navigate]);

//     if (!orderDetails) {
//         return <div>Loading...</div>;
//     }

//     const { name, email, phone, address, city, state, zip, amount, txnId } = orderDetails;

//     const handleFeedbackChange = (e) => setFeedback(e.target.value);
//     const handleRatingChange = (star) => setRating(star);

//     const handleSubmitFeedback = () => {
//         if (feedback.trim() === "") {
//             alert("⚠️ Please provide your feedback before submitting!");
//             return;
//         }

//         const userFeedback = {
//             feedback,
//             rating,
//             name,
//             txnId,
//             orderDate: new Date().toISOString(),
//         };

//         localStorage.setItem("userFeedback", JSON.stringify(userFeedback));
//         alert("✅ Feedback submitted successfully!");
//         setFeedback("");
//         setRating(0);
//     };


    

//     return (
//         <div style={styles.container}>
//             <h2>✅ Order Confirmation</h2>

//             <div style={styles.deliveryInfo}>
//                 <p><strong>Deliver To:</strong> {name}</p>
//                 <p><strong>Order Placed:</strong> {new Date().toLocaleString()}</p>
//                 <p><strong>Shipping:</strong> Pay Online</p>
//             </div>

//             <div style={styles.contentWrapper}>
//                 {/* Order Details */}
//                 <div style={styles.box}>
//                     <p><strong>Email:</strong> {email}</p>
//                     <p><strong>Phone:</strong> {phone}</p>
//                     <p><strong>Address:</strong> {address}</p>
//                     <p><strong>City:</strong> {city}</p>
//                     <p><strong>State:</strong> {state}</p>
//                     <p><strong>ZIP:</strong> {zip}</p>
//                     <p><strong>Amount Paid:</strong> ₹{amount}</p>
//                     <p><strong>Transaction ID:</strong> {txnId}</p>
//                 </div>

//                 {/* Feedback Section */}
//                 <div style={styles.box}>
//                     <h4>We'd Love Your Feedback!</h4>
//                     <textarea
//                         placeholder="Please share your feedback here..."
//                         value={feedback}
//                         onChange={handleFeedbackChange}
//                         style={styles.textarea}
//                     ></textarea>

//                     <div style={styles.rating}>
//                         <span style={styles.ratingText}>Rate Us:</span>
//                         {[1, 2, 3, 4, 5].map((star) => (
//                             <span
//                                 key={star}
//                                 style={star <= rating ? styles.filledStar : styles.emptyStar}
//                                 onClick={() => handleRatingChange(star)}
//                                 title={ratingLabels[star]}
//                             >
//                                 ★
//                             </span>
//                         ))}
//                     </div>

//                     {rating > 0 && (
//                         <div style={styles.ratingCard}>
//                             <span style={styles.ratingLabel}>{ratingLabels[rating]}</span>
//                         </div>
//                     )}

//                     <div style={styles.feedbackButtons}>
//                         <button onClick={handleSubmitFeedback} style={styles.button}>
//                             Submit Feedback
//                         </button>
//                         <button onClick={() => navigate("/")} style={styles.button}>
//                             Back to Home
//                         </button>
//                     </div>
//                 </div>
//             </div>

//             <div style={styles.thankYouMessage}>
//                 <h3>Thank You for Your Purchase! 🙏</h3>
//                 <p>Your order has been successfully placed. We appreciate your business!</p>
//             </div>
//         </div>
//     );
// };

// const styles = {
//     container: {
//         padding: "20px",
//         textAlign: "center",
//     },
//     deliveryInfo: {
//         marginTop: "20px",
//         textAlign: "left",
//         marginBottom: "20px",
//         backgroundColor: "#e1f5fe",
//         padding: "15px",
//         borderRadius: "8px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         border: "2px solid #039be5",
//     },
//     contentWrapper: {
//         display: "flex",
//         justifyContent: "space-between",
//         alignItems: "stretch", // Make both boxes equal height
//         gap: "40px",
//         marginTop: "20px",
//     },
//     box: {
//         flex: 1,
//         backgroundColor: "#fff",
//         padding: "15px",
//         borderRadius: "8px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
//         border: "1px solid #ddd",
//         display: "flex",
//         flexDirection: "column",
//         justifyContent: "space-between",
//         textAlign: "left",
//     },
//     textarea: {
//         width: "100%",
//         padding: "10px",
//         marginBottom: "15px",
//         borderRadius: "5px",
//         border: "1px solid #ccc",
//         height: "100px",
//     },
//     rating: {
//         display: "flex",
//         alignItems: "center",
//         gap: "5px",
//         fontSize: "24px", // Enlarges emojis and stars
//         justifyContent: "center",
//         cursor: "pointer",
//     },
//     ratingText: {
//         fontWeight: "bold",
//         fontSize: "18px",
//     },
//     filledStar: {
//         color: "#FFD700",
//     },
//     emptyStar: {
//         color: "#ccc",
//     },
//     ratingCard: {
//         marginTop: "10px",
//         padding: "8px",
//         backgroundColor: "#f0f0f0",
//         borderRadius: "8px",
//         boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
//         border: "1px solid #ddd",
//         width: "200px",
//         margin: "10px auto",
//         textAlign: "center",
//     },
//     ratingLabel: {
//         fontWeight: "bold",
//         color: "#FF6347",
//         fontSize: "16px",
//     },
//     feedbackButtons: {
//         display: "flex",
//         gap: "10px",
//         justifyContent: "center",
//         marginTop: "10px",
//     },
//     button: {
//         padding: "10px 20px",
//         backgroundColor: "#4CAF50",
//         color: "#fff",
//         border: "none",
//         borderRadius: "5px",
//         cursor: "pointer",
//     },
//     thankYouMessage: {
//         marginTop: "40px",
//         textAlign: "center",
//         fontSize: "18px",
//         fontWeight: "bold",
//         color: "#4CAF50",
//     },
// };

// export default OrderConfirmation;




import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const OrderConfirmation = () => {
    const navigate = useNavigate();
    const [orderDetails, setOrderDetails] = useState(null);
    const [feedback, setFeedback] = useState("");
    const [rating, setRating] = useState(0);

    const ratingLabels = {
        1: "😞 Poor Craftsmanship",
        2: "👎 Needs More Finesse",
        3: "👌 Decent Art",
        4: "✨ Crafted with Care",
        5: "🌟 True Artisan Magic",
    };

    useEffect(() => {
        const storedDetails = localStorage.getItem("orderDetails");
        if (storedDetails) {
            setOrderDetails(JSON.parse(storedDetails));
        } else {
            navigate("/payment");
        }
    }, [navigate]);

    if (!orderDetails) {
        return <div>Loading...</div>;
    }

    const { name, email, phone, address, city, state, zip, amount, txnId } = orderDetails;

    const handleFeedbackChange = (e) => setFeedback(e.target.value);
    const handleRatingChange = (star) => setRating(star);

    const handleSubmitFeedback = () => {
        if (feedback.trim() === "") {
            alert("⚠️ Please provide your feedback before submitting!");
            return;
        }

        const userFeedback = {
            feedback,
            rating,
            name,
            txnId,
            orderDate: new Date().toISOString(),
        };

        localStorage.setItem("userFeedback", JSON.stringify(userFeedback));

        const orders = JSON.parse(localStorage.getItem("allOrders")) || [];
        const updatedOrders = [...orders];
        const lastIndex = updatedOrders.length - 1;

        if (updatedOrders[lastIndex]) {
            updatedOrders[lastIndex].feedback = feedback;
            updatedOrders[lastIndex].rating = rating;
            localStorage.setItem("allOrders", JSON.stringify(updatedOrders));
        }

        alert("✅ Feedback submitted successfully!");
        setFeedback("");
        setRating(0);
    };

    return (
        <div style={styles.container}>
            <h2>✅ Order Confirmation</h2>

            <div style={styles.deliveryInfo}>
                <p><strong>Deliver To:</strong> {name}</p>
                <p><strong>Order Placed:</strong> {new Date().toLocaleString()}</p>
                <p><strong>Shipping:</strong> Pay Online</p>
            </div>

            <div style={styles.contentWrapper}>
                {/* Order Details */}
                <div style={styles.box}>
                    <p><strong>Email:</strong> {email}</p>
                    <p><strong>Phone:</strong> {phone}</p>
                    <p><strong>Address:</strong> {address}</p>
                    <p><strong>City:</strong> {city}</p>
                    <p><strong>State:</strong> {state}</p>
                    <p><strong>ZIP:</strong> {zip}</p>
                    <p><strong>Amount Paid:</strong> ₹{amount}</p>
                    <p><strong>Transaction ID:</strong> {txnId}</p>
                </div>

                {/* Feedback Section */}
                <div style={styles.box}>
                    <h4>We'd Love Your Feedback!</h4>
                    <textarea
                        placeholder="Please share your feedback here..."
                        value={feedback}
                        onChange={handleFeedbackChange}
                        style={styles.textarea}
                    ></textarea>

                    <div style={styles.rating}>
                        <span style={styles.ratingText}>Rate Us:</span>
                        {[1, 2, 3, 4, 5].map((star) => (
                            <span
                                key={star}
                                style={star <= rating ? styles.filledStar : styles.emptyStar}
                                onClick={() => handleRatingChange(star)}
                                title={ratingLabels[star]}
                            >
                                ★
                            </span>
                        ))}
                    </div>

                    {rating > 0 && (
                        <div style={styles.ratingCard}>
                            <span style={styles.ratingLabel}>{ratingLabels[rating]}</span>
                        </div>
                    )}

                    <div style={styles.feedbackButtons}>
                        <button onClick={handleSubmitFeedback} style={styles.button}>
                            Submit Feedback
                        </button>
                        <button onClick={() => navigate("/")} style={styles.button}>
                            Back to Home
                        </button>
                    </div>
                </div>
            </div>

            <div style={styles.thankYouMessage}>
                <h3>Thank You for Your Purchase! 🙏</h3>
                <p>Your order has been successfully placed. We appreciate your business!</p>
            </div>
        </div>
    );
};

const styles = {
    container: {
        padding: "20px",
        textAlign: "center",
    },
    deliveryInfo: {
        marginTop: "20px",
        textAlign: "left",
        marginBottom: "20px",
        backgroundColor: "#e1f5fe",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        border: "2px solid #039be5",
    },
    contentWrapper: {
        display: "flex",
        justifyContent: "space-between",
        alignItems: "stretch",
        gap: "40px",
        marginTop: "20px",
    },
    box: {
        flex: 1,
        backgroundColor: "#fff",
        padding: "15px",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.05)",
        border: "1px solid #ddd",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        textAlign: "left",
    },
    textarea: {
        width: "100%",
        padding: "10px",
        marginBottom: "15px",
        borderRadius: "5px",
        border: "1px solid #ccc",
        height: "100px",
    },
    rating: {
        display: "flex",
        alignItems: "center",
        gap: "5px",
        fontSize: "24px",
        justifyContent: "center",
        cursor: "pointer",
    },
    ratingText: {
        fontWeight: "bold",
        fontSize: "18px",
    },
    filledStar: {
        color: "#FFD700",
    },
    emptyStar: {
        color: "#ccc",
    },
    ratingCard: {
        marginTop: "10px",
        padding: "8px",
        backgroundColor: "#f0f0f0",
        borderRadius: "8px",
        boxShadow: "0 4px 10px rgba(0, 0, 0, 0.1)",
        border: "1px solid #ddd",
        width: "200px",
        margin: "10px auto",
        textAlign: "center",
    },
    ratingLabel: {
        fontWeight: "bold",
        color: "#FF6347",
        fontSize: "16px",
    },
    feedbackButtons: {
        display: "flex",
        gap: "10px",
        justifyContent: "center",
        marginTop: "10px",
    },
    button: {
        padding: "10px 20px",
        backgroundColor: "#4CAF50",
        color: "#fff",
        border: "none",
        borderRadius: "5px",
        cursor: "pointer",
    },
    thankYouMessage: {
        marginTop: "40px",
        textAlign: "center",
        fontSize: "18px",
        fontWeight: "bold",
        color: "#4CAF50",
    },
};

export default OrderConfirmation;
