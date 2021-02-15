const nodemailer = require('nodemailer');

function generateOrderEmail({ order, total }) {
  return `<div>
  <h2>You Recent Order for ${total}</h2>
  <p>Please start walking over, we will have your order ready in the next 20 minutes.</p>
  <ul>
    ${order
      .map(
        (item) => `<li>
    <img src="${item.thumbnail}" alt="${item.name}"/>
    ${item.size} ${item.name} - ${item.price}
    </li>`
      )
      .join('')}
  </ul>
  <p>Your total is: <strong>$${total}</strong> due at pickup</p>
    <style>
      ul {
        list-style: none;
      }
    </style>
  </div>`;
}

// create a transport for nodemailer
const transporter = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: 587,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

// function wait(ms) {
//   return new Promise((resolve, reject) => {
//     setTimeout(resolve, ms);
//   });
// }

exports.handler = async (event, context) => {
  // await wait(5000);
  const body = JSON.parse(event.body);
  console.log(body);
  // Validate the data coming in is correct
  const requireFields = ['email', 'name', 'order'];

  if (!body.order.length) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        message: `WHY would you order nothing...?`,
      }),
    };
  }

  // Make sure they actually have items in that order

  // Send the email

  const info = await transporter.sendMail({
    from: "Slick's Slices <slick@example.com>",
    to: `${body.name} <${body.email}>, order@example.com`,
    subject: 'New order!',
    html: generateOrderEmail({ order: body.order, total: body.total }),
  });
  console.log(info);
  return {
    statusCode: 200,
    body: JSON.stringify({ message: 'success' }),
  };
};
