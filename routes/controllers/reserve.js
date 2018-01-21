const keystone = require('keystone');
const Twig = require('twig');
const sendmail = require('sendmail')();

const Steps = keystone.list('Step');


function sendMailNotification(sponsor, step) {
    console.log(sponsor);
        Twig.renderFile(__dirname + '../../templates/email/confirmation.twig', {sponsor, step}, (err, html) => {
            if (err) {
                throw err;
            }

            sendmail({
                from: 'no-reply@vorstadtsounds.ch',
                //to: 'sponsorMail, kontakt@163.com ',
                to: `faebeee@gmail.com`,
                subject: 'Treppen Sponsor',
                html: html,
            }, function (err, reply) {
                console.log(err && err.stack);
                console.dir(reply);
            });
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

            sendMailNotification({firstname, lastname, email}, item);

            return res.status(201).send(raw);

        });
    });
};
