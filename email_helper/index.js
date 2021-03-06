require("dotenv").config();
const nodemailer = require("nodemailer");
// const hbs = require("nodemailer-express-handlebars");
const moment = require('moment');

const domain = process.env.MONGODB;

const emailHandler = {
    async mySendMail(data, template) {
        let mailTransport = nodemailer.createTransport({
            service: "gmail",
            // host: 'smtp.gmail.com',
            port: 465,
            // secure: true,
            auth: {
                user: process.env.EMAIL,
                pass: process.env.PASSWORD,
            },
            logger: true,
            debug: true,
        });
        // let mailTransport = nodemailer.createTransport({
        //   host: process.env.SMTP_HOST,
        //   port: process.env.SMTP_PORT,
        //   auth: {
        //     user: process.env.SMTP_USER,
        //     pass: process.env.SMTP_PASS,
        //   },
        //     logger: true,
        //     debug: false,
        // });

        // mailTransport.use(
        //   "compile",
        //   hbs({
        //     viewEngine: "express-handlebars",
        //     viewEngine: {
        //         partialsDir: 'templates/partials',
        //         extname: ".handlebars",
        //         layout: 'templates/layouts'
        //     },
        //     viewPath: "templates",
        //     extName: ".hbs",
        //   })
        // );

        let { to, subject, text, html } = data;
        if (!to) {
            throw new Error(`Missing info 'to'!`);
        }
        if (!subject) {
            throw new Error(`Missing info 'subject'!`);
        }

        await mailTransport.sendMail(
            {
                from: "<Scan-party>",
                to,
                subject,
                text,
                html,
            },
            (err, info) => {
                if (err) {
                    console.error(err.message);
                } else {
                    console.log({ message: "success", info });
                }
            }
        );
    },
    async sendMailVerifyEmail(data) {
        let dataSend = {
            to: data.email,
            subject: "Confirm your email",
            text: "For clients with plaintext support only",
            html: `
            <table style="width: 100%; background-color: #fff; border-top: 3px solid #ee82ee; display: flex; justify-content: center;">
                <tbody style="width: 650px; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; margin: 10px;">
                <tr>
                    <td>
                    <table
                        style="width: 650px; display: flex; justify-content: center; align-items: center; flex-wrap: wrap; margin: 10px;">
                        <tr>
                            <td style="width: 100%; padding: 20px; display: flex; justify-content: center">
                                <p><img alt="gitLab"
                                    src="${process.env.DOMAIN}/assets/logo.png"
                                    width="55" height="55" /></p>
                            </td>
                        </tr>
                        <tr>
                            <td
                                style="width: 100%; background-color: #ff6347;text-align: center; margin: 0px 10px; border-radius: 5px; color: #fff; padding: 10px">
                                <p>your ${process.env.DOMAIN} account was created, click <a
                                        href="${process.env.DOMAIN}/api/v1/users/verify-email/${data._id
                }">here</a> to enable your account</p>
                            </td>
                        </tr>
                        <tr>
                            <td style="width: 100%; text-align: left; padding: 20px 30px; border-radius: 5px; margin: 10px; background-color: #f0f2f5 ;">
                                <table style="width: 100%;">
                                    <tr>
                                        <th style="background-color: #ff8d79; color: #8c8c8c; border-radius: 5px; padding: 10px">
                                            Email
                                        </th>
                                        <td style="background-color: #fb8d79; color: #333333; border-radius: 5px; padding: 10px">
                                            ${data.email}</td>
                                    </tr>
                                    <tr>
                                        <th style="background-color: #ff8d79; color: #8c8c8c; border-radius: 5px; padding: 10px">
                                            Time
                                        </th>
                                        <td style="background-color: #fb8d79; color: #333333; border-radius: 5px; padding: 10px">
                                            ${moment().format('DD/MM/YYYY HH:mm')}</td>
                                    </tr>
                                </table>
                            </td>
                        </tr>
                        <tr>
                            <td style="color: #333333">
                                <p style="color: #333333; text-align: center;">Copyright ?? ${process.env.DOMAIN}. All rights reserved</p>
                            </td>
                        </tr>
                    </table>
                    </td>
                </tr>
                </tbody>
            </table>`,
        };
        await this.mySendMail(dataSend, "index");
    },

    async sendMailResetPassword(data, newPassword) {
        let dataSend = {
            to: data.email,
            subject: "New Password",
            text: "For clients with plaintext support only",
            html: `
            <div style="padding:0;background-color:#fafafa;height:100%!important;margin:0 auto!important;width:100%!important">
        <div style="Margin:0 auto;max-width:600px">
            <table
                style="border-collapse: collapse; margin: 0 auto; width: 100%; max-width: 600px" cellpadding="0" cellspacing="0">
                <tbody>
                    <tr>
                        <td style="width: 100%; margin: 0 auto; text-align: center">
                            <img style="width: 24px; height: 24px; background-size: cover; margin: auto" alt="logo"
                                src="https://icons-for-free.com/iconfiles/png/512/account+circle+24px-131985189042594487.png" />
                        </td>
                    </tr>
                    <tr>
                        <td style=" color: white; text-align: center; background-color: #4b2999; margin: 30px auto;">
                            <h3>Your new password: <strong style="font-size: 24px">${newPassword}</strong></h3>
                        </td>
                    </tr>
                    <tr>
                        <td style="padding:0;font-size:13px;line-height:0">
                            <table
                                style="width: 100%; max-width: 600px; background-color: white; margin: auto; color: white; text-align: center;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table style="margin: 5px auto; color: #333; text-align: center;">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <p>Copyright ?? ${process.env.DOMAIN}. All rights reserved</p>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>`,
        };
        await this.mySendMail(dataSend, "index");
    },

    async sendTicket(data) {
        let dataSend = {
            to: data.email,
            subject: `V?? m???i tham gia s??? ki???n ${data.nameEvent}`,
            text: "For clients with plaintext support only",
            html: `
        <div style="padding:0;background-color:#fafafa;height:100%!important;margin:0 auto!important;width:100%!important">
            <div style="Margin:0 auto;max-width:650px">
                <table style="border-collapse: collapse; margin: 0 auto; width: 100%; max-width: 650px; background-color: #4b2999">
                    <tbody>
                        <tr>
                            <table style="width: 100%; background-image: url('https://images.cdn1.stockunlimited.net/preview1300/music-event-background-concept_1934779.jpg'); padding: 30px"">
                                <tbody>
                                    <tr>
                                        <td style="margin: 30px auto; color: white; text-align: center;">
                                            <h3> <strong>${data.nameEvent}</strong></h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin: 30px 20px; color: white; text-align: center;">
                                            <h3> <strong>?????a ??i???m: ${data.addressEvent}</strong></h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin: 30px 20px; color: white; text-align: center;">
                                            <h3> Th???i gian: ${data.beginTimeEvent} ${data.endTimeEvent}</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin: 30px 20px; color: white; text-align: center;">
                                            <h3> Ng??y: ${data.dateEvent}</h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin: 30px 20px; color: white; text-align: center;">
                                            <h3> <strong>K??nh m???i: ${data.nameGuest}</strong></h3>
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin: 30px 20px; color: white; text-align: center;">
                                            <img src="${data.qrcode}" style=" height: 120px; background-size: cover" alt="qrcode" />
                                        </td>
                                    </tr>
                                    <tr>
                                        <td style="margin: 30px 20px; color: white; text-align: center;">
                                            <a href="${data.linkInfo}">${data.linkInfo}</a>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </tr>
                        <tr>
                        <td style="padding:0;font-size:13px;line-height:0">
                            <table style="width: 100%; max-width: 650px; background-color: white; margin: auto; color: white; text-align: center;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table style="margin: 10px auto; color: #333; text-align: center;">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <span>Copyright ?? ${process.env.DOMAIN}. All rights reserved</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tbody>
                </table>
            </div>
        </div>`,
        };
        await this.mySendMail(dataSend, "index");
    },

    async sendMailDelEvent(data) {
        let dataSend = {
            to: data.email,
            subject: `Th??ng b??o h???y s??? ki???n: ${data.name}`,
            text: "For clients with plaintext support only",
            html: `l
        <div style="padding:0;background-color:#fafafa;height:100%!important;margin:0 auto!important;width:100%!important">
            <div style="Margin:0 auto;max-width:650px">
                <table style="border-collapse: collapse; margin: 0 auto; width: 100%; max-width: 650px; background-color: #4b2999">
                    <tbody>
                        <!-- <tr>
                            <img style="width: 100%; height: 120px; background-size: cover;" alt src="https://www.talkwalker.com/images/2020/blog-headers/image-analysis.png" />
                        </tr> -->
                        <tr>
                            <table style="width: 100%; background-image: url('https://images.cdn1.stockunlimited.net/preview1300/music-event-background-concept_1934779.jpg'); padding: 30px"">
                                <tbody>
                                    <tr>
                                        <td style="margin: 30px auto; color: white; text-align: center;">
                                            <h3>S??? ki???n: <strong>${data.name}</strong> ???? b??? h???y</h3>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </tr>
                        <tr>
                        <td style="padding:0;font-size:13px;line-height:0">
                            <table style="width: 100%; max-width: 650px; background-color: white; margin: auto; color: white; text-align: center;">
                                <tbody>
                                    <tr>
                                        <td>
                                            <table style="margin: 10px auto; color: #333; text-align: center;">
                                                <tbody>
                                                    <tr>
                                                        <td>
                                                            <span>Copyright ?? ${process.env.DOMAIN}. All rights reserved</span>
                                                        </td>
                                                    </tr>
                                                </tbody>
                                            </table>
                                        </td>
                                    </tr>
                                </tbody>
                            </table>
                        </td>
                    </tbody>
                </table>
            </div>
        </div>`,
        };
        await this.mySendMail(dataSend, "index");
    },
};

module.exports = emailHandler;
