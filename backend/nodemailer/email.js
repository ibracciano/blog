import { transporter } from "./config.js";
import { PASSWORD_RESET_REQUEST_TEMPLATE, PASSWORD_RESET_SUCCESS_TEMPLATE, VERIFICATION_EMAIL_TEMPLATE, WELCOME_EMAIL_TEMPLATE } from "./emailTemplate.js";

export const sendEmailVerification = (email, code) => {
    // Send verification email to the provided email address
    let mailOptions = {
        from: 'ouattarayacou494@gmail.com',
        to: email,
        subject: 'VERIFY EMAIL',
        html: VERIFICATION_EMAIL_TEMPLATE.replace("{verificationCode}", code)
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(200).json({ message: 'Error sending email' })
        } else {
            console.log('Email sent: ', info.response);
            res.send('Email sent successfully')
        }
    })
}

export const sendEmailWelcome = (email, username) => {
    // Send verification email to the provided email address
    let mailOptions = {
        from: 'ouattarayacou494@gmail.com',
        to: email,
        subject: 'WELCOME EMAIL',
        html: WELCOME_EMAIL_TEMPLATE.replace("{username}", username)
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(200).json({ message: 'Error sending email' })
        } else {
            console.log('Email sent: ', info.response);
            res.send('Email sent successfully')
        }
    })

}

export const sendEmailResetPassword = (email, url) => {
    // Send verification email to the provided email address
    let mailOptions = {
        from: 'ouattarayacou494@gmail.com',
        to: email,
        subject: 'RESET PASSWORD',
        html: PASSWORD_RESET_REQUEST_TEMPLATE.replace("{resetURL}", url)
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(200).json({ message: 'Error sending email' })
        } else {
            console.log('Email sent: ', info.response);
            res.send('Email sent successfully')
        }
    })

}
export const sendResetSuccessEmail = (email) => {
    // Send verification email to the provided email address
    let mailOptions = {
        from: 'ouattarayacou494@gmail.com',
        to: email,
        subject: 'RESET PASSWORD SUCCESSFULY',
        html: PASSWORD_RESET_SUCCESS_TEMPLATE
    }

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.status(200).json({ message: 'Error sending email' })
        } else {
            console.log('Email sent: ', info.response);
            res.send('Email sent successfully')
        }
    })

}