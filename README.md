# [Citizens' Cyber Security Hackathon](https://rsue.ru/universitet/novosti/novosti.php?ELEMENT_ID=107749)

## 🏅 The KISS team took first place

![hackathon](/images/2.jpg)

## 📜 Description

We have developed a system for identifying unjustified requests for refunds from the budget system.

The Federal Treasury Department in Rostov Oblast on average receives about 2,500 refund requests per day.
On average 2,500 refund requests are received daily in the Rostov Oblast, there are also days when there are peak days when 10,000 refund requests are received.
There are peak days when more than 10 thousand documents for refunds are received. For optimization of checkout of requests for refunds with
To optimize the verification of refund requests with payment and collection orders, there is a need for a system working automatically.
mode.

To make full use of the software product we have implemented a system of
registration and authorization system. Then the user has the ability to download
two types of documents: payment orders and refund requests. The system checks
correctness of operations and returns a report. In the report, each refund request gets
one of three statuses:

- the request has passed the check;
- the request passed the check, but the user's bank account was changed;
- the request was not verified;

We used TypeScript as our programming language, we have Node.js with Express on the backend, we used MongoDB as our database, the frontend uses the Next.js framework built over the React library, which has been the "production standard" in the frontend world for years. It's all wrapped in docker containers and run with a single command "docker-compose up"

We also made the visual pleasant for the user, there are animations and change of theme (light and dark)

![hackathon](/images/1.jpg)
