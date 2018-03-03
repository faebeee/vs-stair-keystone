const keystone = require('keystone');
const sendmail = require('sendmail')();
var { renderFile } = require('twig');
const Steps = keystone.list('Step');
var helper = require('sendgrid').mail;

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

        var from_email = new helper.Email('no-reply@vorstadtsounds.ch');
        var to_email = new helper.Email(to);
        var subject = 'Treppen Sponsor';
        var content = new helper.Content('text/html', html);
        var mail = new helper.Mail(from_email, subject, to_email, content);

        var sg = require('sendgrid')(process.env.SENDGRID_API_KEY);
        var request = sg.emptyRequest({
            method: 'POST',
            path: '/v3/mail/send',
            body: mail.toJSON(),
        });

        sg.API(request, (error, response) => {
            if (error) {
                return rej(error);
            }
            return res(response);
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

    if (req.method.toLowerCase() !== 'post') {
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
