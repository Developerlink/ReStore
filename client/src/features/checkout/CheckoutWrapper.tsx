import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import CheckoutPage from "./CheckoutPage";

const stripePromise = loadStripe("pk_test_51KIrc5HpUk5euLnkVAQOh3WaqU5RraKcybMmXjWkJtHny76BghCIYVenLys6tdPuRanXWDiFbgaRKhaADpNhLMXD00Qv1zVETL");

export default function CheckoutWrapper(){
    return (
        <Elements stripe={stripePromise}>
            <CheckoutPage />
        </Elements>
    )
}