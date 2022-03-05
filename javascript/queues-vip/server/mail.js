const sgMail = require('@sendgrid/mail');

// const mail = async () => {
//   console.log(email, "mail");
// sgMail.setApiKey("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");
// try {
//     const msg = {
//         to: 'sherut@dr-gav.co.il',
//         from: 'igilfu@gmail.com',
//         subject: ' 0543055086 שלום חזרו אלי כשאתם רואים ',
//         text: 'שלום אני הזמנתי כיסא לפני חודש',
//         html: `
//         <strong>אני שולח לכם המון מיילים ואתם לא עונים!!!!</strong>
//         <b>   אני הזמנתי כיסא לפני חודש
//        אנא חיזרו אלי בטלפון 0543055086</b>,`
//     };
//     await sgMail.send(msg);
//     const msg2 = {
//         to: 'drgav@dr-gav.co.il',
//         from: 'igilfu@gmail.com',
//         subject: ' 0543055086 שלום חזרו אלי כשאתם רואים ',
//         text: 'שלום אני הזמנתי כיסא לפני חודש',
//         html: `
//         <strong>אני שולח לכם המון מיילים ואתם לא עונים!!!!</strong>
//         <b>   אני הזמנתי כיסא לפני חודש
//        אנא חיזרו אלי בטלפון 0543055086</b>,`
//     };
//     await sgMail.send(msg2);
//     console.log("mail sent");

//     return;
// } catch (error) {
//     console.error(error);

//     if (error.response) {
//         console.error(error.response.body)
//         return;
//         // return next(error);
//     }
// }
// }




var i = 1;
function myLoop() {
    setTimeout(function () {
        console.log('hello ', i, new Date());
        // mail()
        //  your code here
        i++;
        if (i < 10) {
            myLoop();
        }
    }, 10 * 60 * 1000)
}

myLoop();      