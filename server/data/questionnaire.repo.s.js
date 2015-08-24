var database = require('./database');
var ObjectId = require('mongodb').ObjectID;

exports.getQuestionnaire =  function (id, callback) {
    database.getDb(function (db){
        db.questionnaires.findOne({_id: new ObjectId(id)}, callback);
    });
};

exports.updateQuestionnaire = function (questionnaire, callback) {
    database.getDb(function (db) {
        var id = questionnaire._id;
        questionnaire.answerCount++;
        delete questionnaire._id;
        for (var i = 0, question; question = questionnaire.questions[i]; i++) {
            for (var j = 0, questionChoice; questionChoice = question.questionChoices[j]; j++) {
                if(questionChoice.isChecked){
                    questionChoice.answerCount++;
                }
                delete questionChoice.isChecked;
            }
        }
        db.questionnaires.update({_id: new ObjectId(id)}, questionnaire, callback);
    });
};

exports.addQuestionnaire = function (questionnaire, callback) {
    database.getDb(function (db) {
        db.questionnaires.insert(questionnaire, callback);
    });
};
exports.listQuestionnaires = function (page, status, callback) {
    var pageSize = 10;
    var limit = pageSize;
    var skip = page ? (page - 1) * pageSize : 0;

    var options = {
        "sort": [['created','desc']],
        "limit": limit,
        "skip": skip
    };

    var query;
    if(status == 'open'){
        query = {
            'closingDate':{$gt:new Date().getTime()},
            $where : "(this.maxAnswerCount == -1) || (this.answerCount < this.maxAnswerCount)"
        };
    } else if(status == 'closed'){
        query = {
            $or:[
                {'closingDate':{$lt:new Date().getTime()}},
                {$where : "(this.maxAnswerCount != -1) && (this.answerCount >= this.maxAnswerCount)"}
            ]
        };
    }

    database.getDb(function (db) {
        db.questionnaires.find(query).count(function(err, count){
            db.questionnaires.find(query, options).toArray(function (err, data) {
                var retObject = {
                    count: count,
                    questionnaires: data
                };

                callback(err, retObject);
            });
        });
    });
};

exports.removeAll = function (callback) {
    database.getDb(function (db) {
        db.questionnaires.remove({}, callback);
    });
};

exports.removeById = function (id, callback) {
    database.getDb(function (db) {
        db.questionnaires.remove({_id: new ObjectId(id)}, callback);
    });
};

