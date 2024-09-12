"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const inquirer_1 = __importDefault(require("inquirer"));
(async () => {
    const randomNumber = Math.floor(10000 + Math.random() * 90000);
    let myBalance = 0;
    const studentDetails = await inquirer_1.default.prompt([
        {
            name: 'student',
            type: 'input',
            message: 'Enter student name:',
            validate: function (value) {
                if (value.trim() !== "") {
                    return true;
                }
                return "Please enter a non-empty value";
            },
        },
        {
            name: "course",
            type: "list",
            message: "Select the course to enroll",
            choices: ["MS.Office", "HTML", "JavaScript", "TypeScript", "Python"]
        }
    ]);
    const tuitionFee = {
        "MS.Office": 2000,
        "HTML": 2500,
        "JavaScript": 5000,
        "TypeScript": 6000,
        "Python": 10000
    };
    console.log(`\nTuition Fees: ${tuitionFee[studentDetails.course]}/-\n`);
    console.log(`Balance: ${myBalance}\n`);
    const paymentDetails = await inquirer_1.default.prompt([
        {
            name: 'paymentMethod',
            type: 'list',
            message: 'Select payment method',
            choices: ['Bank transfer', 'Easypaisa', 'Jazzcash']
        },
        {
            name: 'amount',
            type: 'input',
            message: "Transfer Money:",
            validate: function (value) {
                const amount = parseFloat(value);
                if (!isNaN(amount) && amount > 0) {
                    return true;
                }
                return 'Please enter a valid amount';
            },
        }
    ]);
    console.log(`\nYou selected payment method: ${paymentDetails.paymentMethod}\n`);
    const tuitionFees = tuitionFee[studentDetails.course];
    const paymentAmount = parseFloat(paymentDetails.amount);
    if (tuitionFees === paymentAmount) {
        console.log(`Congratulations! You have successfully enrolled in ${studentDetails.course}\n`);
        const nextStep = await inquirer_1.default.prompt([
            {
                name: 'nextAction',
                type: 'list',
                message: 'What would you like to do next?',
                choices: ['View Status', 'Exit']
            }
        ]);
        if (nextStep.nextAction === "View Status") {
            console.log('\n***** Status *****\n');
            console.log(`Student Name: ${studentDetails.student}`);
            console.log(`Student ID: ${randomNumber}`);
            console.log(`Course: ${studentDetails.course}`);
            console.log(`Tuition Fees Paid: ${paymentAmount}`);
            myBalance += paymentAmount;
            console.log(`Balance: ${myBalance}`);
        }
        else {
            console.log(`\nExiting Student Management System\n`);
        }
    }
    else {
        console.log("Invalid amount due for the course\n");
    }
})();
