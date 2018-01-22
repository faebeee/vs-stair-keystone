const keystone = require('keystone');
const Twig = require('twig');
const sendmail = require('sendmail')();

const Steps = keystone.list('Step');

/**
 *
 * @param sponsor
 * @param step
 * @return {Promise<any>}
 */
function renderMailTemplate(sponsor, step) {
    return new Promise((res, rej) => {
        Twig.renderFile(__dirname + '../../templates/email/confirmation.twig', {sponsor, step}, (err, html) => {
            if (err) {
                return rej(err);
            }
            return res(html);
        });
    })
}

/**
 *
 * @param sponsor
 * @param html
 * @return {Promise<any>}
 */
function sendMail(sponsor, html) {
    return new Promise((res, rej) => {
        sendmail({
            from: 'no-reply@vorstadtsounds.ch',
            //to: 'sponsorMail, kontakt@163.com ',
            to: `faebeee@gmail.com`,
            subject: 'Treppen Sponsor',
            html: html,
        }, (err, reply) => {
            if (err) {
                return rej(err);
            }
            return res(reply)
        });
    })
}

/**
 *
 * @param sponsor
 * @param step
 * @return {Promise<any>}
 */
function sendMailNotification(sponsor, step) {
    return renderMailTemplate(sponsor, step)
        .then((html) => {
            return sendMail(sponsor, html)
        });
}


exports = module.exports = function (req, res) {
    const {firstname, lastname, email} = req.body;

    Steps.model.findOne({_id: req.params.id, /*isSold: false, isReserved: false*/}).exec(function (err, item) {
        if (err) {
            return res.status(500).send(err.message);
        }

        if (!item) {
            return res.status(404).send('Not found');
        }

        item.update({
            sponsor: {first: firstname, last: lastname},
            sponsor_email: email,
            isReserved: true
        }, function (err, raw) {
            if (err) {
                return res.status(500).send(err.message);
            }

            sendMailNotification({firstname, lastname, email}, item)
                .then(() => {
                    return res.status(201).send(raw);
                })
                .catch((err) => {
                    return res.status(500).send(err.message);
                })
        });
    });
};
