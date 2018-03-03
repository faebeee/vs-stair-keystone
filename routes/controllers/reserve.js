const keystone = require('keystone');
const sendmail = require('sendmail')();
var { renderFile } = require('twig');
const Steps = keystone.list('Step');

/**
 *
 * @param type
 * @param sponsor
 * @param step
 * @return {Promise<any>}
 */
function renderMailTemplate(type, sponsor, step) {
    return new Promise((res, rej) => {
        renderFile(`./templates/email/${type}.twig`, {
            headerText: 'Vorstadtsounds',
            title: '',
            headerImageUrl: `${process.env.SERVER_URL}/static/img/Vorstadtsounds_original.png`,
            backendUrl: `${process.env.BACKEND_URL}/steps/${step._id}`,
            sponsor,
            step,
        }, (err, html) => {
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
function sendMail(to, html) {
    return new Promise((res, rej) => {
        sendmail({
            from: 'no-reply@vorstadtsounds.ch',
            to,
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
    return renderMailTemplate('order', sponsor, step)
        .then((html) => {
            return sendMail(`sponsoring@vorstadtsounds.ch`, html)
                .then(() => {
                    return sendMail(`faebeee@gmail.com`, html)
                });
        })
        .then(() => {
            return renderMailTemplate('confirmation', sponsor, step)
        })
        .then((html) => {
            return Promise.all([sendMail(sponsor.email, html)]);
        });
}

/**
 *
 * @param item
 * @param firstname
 * @param lastname
 * @param email
 * @return {Promise<any>}
 */
function reserveItem(item, firstname, lastname, email) {
    return new Promise((res, rej) => {
        item.update({
            sponsor: { first: firstname, last: lastname },
            sponsor_email: email,
            isReserved: true
        }, function (err, raw) {
            if (err) {
                return rej(err);
            }
            return res(raw);
        });
    })
}

/**
 *
 * @type {module.exports}
 */
exports = module.exports = function (req, res) {
    const { firstname, lastname, email } = req.body;

    if(req.method !== 'post'){
        return res.status(200).send({});
    }


    Steps.model.findOne({ _id: req.params.id, isSold: false, isReserved: false })
        .exec((err, item) => {
            if (err) {
                return res.status(500).send(err.message);
            }

            if (!item) {
                return res.status(404).send('Not found');
            }

            reserveItem(item, firstname, lastname, email)
                .then(() => {
                    return sendMailNotification({ firstname, lastname, email }, item);
                })
                .then(() => {
                    return res.status(201).send({});
                })
                .catch((err) => {
                    return res.status(500).send(err.message);
                })
        });

};
