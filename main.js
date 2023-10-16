import express from 'express';
import bodyParser from 'body-parser';
import { preSignUpTrigger, createAuthChallengeTrigger, verifyAuthChallengeResponseTrigger, } from "./lambdaTriggers.js";
const app = express();
const PORT = 3000;
app.use(bodyParser.json());
// Pre Sign-Up Trigger
app.post('/pre-signup', async (req, res) => {
    try {
        const result = await preSignUpTrigger(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
// Create Auth Challenge Trigger
app.post('/create-auth-challenge', async (req, res) => {
    try {
        const result = await createAuthChallengeTrigger(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
// Verify Auth Challenge Trigger
app.post('/verify-auth-challenge', async (req, res) => {
    try {
        const result = await verifyAuthChallengeResponseTrigger(req.body);
        res.json(result);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});
app.listen(PORT, () => {
    console.log(`Server is running at http://localhost:${PORT}`);
});
