import fs from "fs";
import sgMail from "@sendgrid/mail";

sgMail.setApiKey(<string>process.env.SENDGRID_API_KEY);

export const Mailer = async (
  recipientEmail: string,
  recipientName: string,
  mailType: "CREATE" | "UPDATE" | "REQUEST",
  serviceTime: Date,
  userseats: number,
  userpin: number
) => {
  const date = new Date(serviceTime);

  let subject = "Wildwood Easter Services";

  let htmlContent = `
  <head>
    <style>
      .body {
        text-align: center;
        background: #fff;
        border-radius: 20px;
        padding-top: 20px 0px;
      }
      p {
        color: #000;
        font-size: 20px;
        margin: 5px 0px;
      }
      .primary {
        font-size: 24px;
        font-weight: bold;
      }
      .secondary {
        font-size: 22px;
      }
      .text {
        margin-left: 5px;
        margin-right: 5px;
      }
      .seats {
        color: #dd9d4a;
        font-weight: bold;
      }
      .pin {
        color: #dd9d4a;
        font-weight: bold;
      }
    </style>`;

  switch (mailType) {
    case "CREATE":
      htmlContent += `<body class="body">
            <div class="text">
              <p class="primary">Thank you ${recipientName} for reserving your spot for Wildwood's Easter services!</p>
              <p class="secondary">You reserved <span class="seats">${userseats}</span> seats for our ${date.toLocaleString(
        "en-US",
        {
          timeZone: "America/Los_Angeles",
          day: "numeric",
          month: "long",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
        }
      )} service<p>
              <p>Your user pin for updating your selection is: <span class="pin">${userpin}</span><p>
              <p>If you need to update your selection, place your user pin in the 'Update Your Selection' form back on the reservation website</p>
            </div>
          </body>
        </head>`;
      break;
    case "UPDATE":
      subject = "Wildwood Easter Updated Selection";
      htmlContent += `<body class="body">
          <div class="text">
            <p class="primary">Thank you ${recipientName} for updating your spot for Wildwood's Easter services!</p>
            <p class="secondary">You reserved <span class="seats">${userseats}</span> seats for our ${date.toLocaleString(
        "en-US",
        {
          timeZone: "America/Los_Angeles",
          day: "numeric",
          month: "long",
          weekday: "long",
          hour: "2-digit",
          minute: "2-digit",
        }
      )} service<p>
            <p>Your user pin for updating your selection is: <span class="pin">${userpin}</span><p>
            <p>If you need to update your selection, place your user pin in the 'Update Your Selection' form back on the reservation website</p>
          </div>
        </body>
      </head>`;
      break;
    case "REQUEST":
      subject = "Wildwood Easter User Pin";
      htmlContent += `<body class="body">
          <div class="text">
            <p style="font-size: 24px">Your user pin for updating your selection is: <span class="pin">${userpin}</span><p>
            <p>If you need to update your selection, place your user pin in the 'Update Your Selection' form on the reservation website</p>
          </div>
        </body>
      </head>`;
      break;
    default:
      break;
  }

  let msg = {
    to: recipientEmail,
    from: "Wildwood Easter <mailer@wildwoodeaster.com>",
    subject: subject,
    html: htmlContent,
  };

  try {
    await sgMail.send(msg);
  } catch (error) { }
};

export default Mailer;
