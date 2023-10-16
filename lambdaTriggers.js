// Import necessary modules and files
// Lambda triggers logic
const preSignUpTrigger = async (event) => {
    // Handle pre-sign up logic for passwordless authentication
    const phoneNumber = event.request.userAttributes.phone_number;
    // Check if the phone number is not empty and it has the Kenyan country code.
    if (phoneNumber && /^(\+254|0)/.test(phoneNumber)) {
        // If the number doesn't start with +254 (Kenyan code), add it.
        event.request.userAttributes.phone_number = phoneNumber.replace(/^0/, '+254');
    }
    else {
        throw new Error("Invalid phone number. Please enter a valid Kenyan phone number.");
    }
    return event;
};
const createAuthChallengeTrigger = async (event) => {
    // Handle create auth challenge logic for passwordless authentication
    // Sending a one-time code to the user's phone or email.
    // Creating a one-time code (OTP)
    const otp = Math.floor(1000 + Math.random() * 9000).toString();
    // Store the OTP for verification
    event.privateChallengeParameters = { otp };
    // TODO: Send the OTP to the user via SMS.
    // You can integrate with a service liker AWS SNS to send the OTP.
    return event;
};
const verifyAuthChallengeResponseTrigger = async (event) => {
    // Handle verify auth challenge response logic for passwordless authentication
    // Retrieve the OTP provided by the user and the one stored during the creation
    const userOtp = event.request.challengeAnswer;
    const validOtp = event.privateChallengeParameters.otp;
    // Ensure event.response is initialized as an object
    if (!event.response) {
        event.response = {};
    }
    // Check if the OTPs match
    if (userOtp === validOtp) {
        event.response.answerCorrect = true;
    }
    else {
        event.response.answerCorrect = false;
        throw new Error("Invalid code. Please enter the correct code sent to your phone.");
    }
    return event;
};
// Export the functions
export { preSignUpTrigger, createAuthChallengeTrigger, verifyAuthChallengeResponseTrigger, };
