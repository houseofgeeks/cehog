exports.createForm = (req, res, next) => {
    var Event = require('../model/event');
    var Form = require('../model/form');
    Event.findOne({ title: req.body.etitle }, function (err, event) {
        if (err || !event) {
            console.log('No Event Found');
            res.json({ success: 'False', data: 'No Event Found' });
        } else {
            var model = new Form({ 
                etitle: req.body.etitle, 
                ftitle: req.body.ftitle, 
                fdata: req.body.fdata,
                edata: event.data
            });

            model.save()
                .then(doc => {
                    res.json({ success: 'True', data: doc });
                })
                .catch(err => {
                    res.json({ success: 'False', data: err });

                });
        }
    });
};

exports.stopForm = (req, res, next) => {
    var Form = require('../model/form');
    Form.deleteMany({ etitle: req.body.etitle, ftitle: req.body.ftitle },
        function (err, docs) {
            if (err || !docs) {
                console.log("Error in deleting Form");
                res.json({ success: 'False', data: "Error in Deleting Form" });
            } else {
                console.log("Form deleted");
                res.json({ success: 'True', data: "Form Deleted Successfully" });
            }
        });
};

exports.getForm = (req, res, next) => {
    var Model = require('../model/form');
    Model.findOne({ etitle: req.body.etitle, ftitle: req.body.ftitle }, function (err, docs) {
        if (err || !docs) {
            res.json({ success: 'False', data: 'No Data Found' });
        } else {
            res.json({ success: 'True', data: docs });
        }
    });
};

exports.submitForm = (req, res, next) => {
    //console.log(req.files);

    var etitle = req.body.ename;
    var ftitle = req.body.fname; 

    delete req['undefined'];
    delete req['ename'];
    delete req['fname'];

    var Model = require('../model/data');
    var model = new Model({
        etitle: etitle,
        ftitle: ftitle,
        data: JSON.stringify(req.body),
        file: req.files
    });
    model.save()
        .then(doc => {
            res.json({ success: 'True', data: doc });
        })
        .catch(err => {
            res.json({ success: 'False', data: err });

        });
};