var chai=require('chai');
var chaiAsPromised=require('chai-as-promised');
chai.use(chaiAsPromised);
var expect=chai.expect;

var ptor = protractor.getInstance(),
    button;

describe('e2e tests', function() {
    beforeEach(function () {

    });

    it('should not allow creation of mcq without any questions', function() {
        browser.get('http://localhost:3001/#!/createQuestionnaire');

        element(by.model('questionnaire.name')).sendKeys('test1');
        element(by.model('questionnaire.closingDate')).sendKeys('03-January-2020');

        element(by.id('createMCQ')).click();

        //Test that we are still on the same page and no redirection happened
        expect(ptor.getCurrentUrl()).to.eventually.contain('createQuestionnaire');
    });


    it('should not allow creation of mcq with questions of less that 2 choices', function() {
        browser.get('http://localhost:3001/#!/createQuestionnaire');

        element(by.model('questionnaire.name')).sendKeys('test1');
        element(by.model('questionnaire.closingDate')).sendKeys('03-January-2020');

        element(by.id('addQuestion')).click();
        element(by.model('question.text')).sendKeys('question 1');

        element(by.id('createMCQ')).click();

        //Test that we are still on the same page and no redirection happened
        expect(ptor.getCurrentUrl()).to.eventually.contain('createQuestionnaire');
    });

    it('should not allow creation of mcq with correctable questions if no choices are selected', function() {
        browser.get('http://localhost:3001/#!/createQuestionnaire');

        element(by.model('questionnaire.name')).sendKeys('test1');
        element(by.model('questionnaire.closingDate')).sendKeys('03-January-2020');


        element(by.id('addQuestion')).click();
        element(by.model('question.text')).sendKeys('question 1');
        element(by.model('question.isCorrectable')).click();

        element(by.id('addChoice')).click();
        element(by.id('addChoice')).click();

        var questionChoices = element(by.repeater('questionChoice in question.questionChoices').row(0)).element(by.model('questionChoice.text')).sendKeys('choice 1');
        var questionChoices = element(by.repeater('questionChoice in question.questionChoices').row(1)).element(by.model('questionChoice.text')).sendKeys('choice 2');

        element(by.id('createMCQ')).click();

        //Test that we are still on the same page and no redirection happened
        expect(ptor.getCurrentUrl()).to.eventually.contain('createQuestionnaire');
    });

    it('should not allow creation of mcq with correctable questions and multiple answers if less than 2 choices are selected', function() {
        browser.get('http://localhost:3001/#!/createQuestionnaire');

        element(by.model('questionnaire.name')).sendKeys('test1');
        element(by.model('questionnaire.closingDate')).sendKeys('03-January-2020');


        element(by.id('addQuestion')).click();
        element(by.model('question.text')).sendKeys('question 1');
        element(by.model('question.isCorrectable')).click();
        element(by.model('question.allowMultiple')).click();

        element(by.id('addChoice')).click();
        element(by.id('addChoice')).click();

        element(by.repeater('questionChoice in question.questionChoices').row(0)).element(by.model('questionChoice.text')).sendKeys('choice 1');
        element(by.repeater('questionChoice in question.questionChoices').row(1)).element(by.model('questionChoice.text')).sendKeys('choice 2');

        element(by.repeater('questionChoice in question.questionChoices').row(1)).element(by.model('questionChoice.isCorrect')).click();

        element(by.id('createMCQ')).click();

        //Test that we are still on the same page and no redirection happened
        expect(ptor.getCurrentUrl()).to.eventually.contain('createQuestionnaire');
    });

    it('should not allow creation of mcq with correctable questions and multiple answers if less than 2 choices are selected', function() {
        browser.get('http://localhost:3001/#!/createQuestionnaire');

        element(by.model('questionnaire.name')).sendKeys('test1');
        element(by.model('questionnaire.closingDate')).sendKeys('03-January-2020');


        element(by.id('addQuestion')).click();
        element(by.model('question.text')).sendKeys('question 1');
        element(by.model('question.isCorrectable')).click();
        element(by.model('question.allowMultiple')).click();

        element(by.id('addChoice')).click();
        element(by.id('addChoice')).click();

        element(by.repeater('questionChoice in question.questionChoices').row(0)).element(by.model('questionChoice.text')).sendKeys('choice 1');
        element(by.repeater('questionChoice in question.questionChoices').row(1)).element(by.model('questionChoice.text')).sendKeys('choice 2');

        element(by.repeater('questionChoice in question.questionChoices').row(1)).element(by.model('questionChoice.isCorrect')).click();

        element(by.id('createMCQ')).click();

        //Test that we are still on the same page and no redirection happened
        expect(ptor.getCurrentUrl()).to.eventually.contain('createQuestionnaire');
    });

    it('should submit MCQ successfully if all validation passes then redirect to the answer page', function() {
        browser.get('http://localhost:3001/#!/createQuestionnaire');

        element(by.model('questionnaire.name')).sendKeys('test1');
        element(by.model('questionnaire.closingDate')).sendKeys('03-January-2020');


        element(by.id('addQuestion')).click();
        element(by.model('question.text')).sendKeys('question 1');

        element(by.id('addChoice')).click();
        element(by.id('addChoice')).click();

        element(by.repeater('questionChoice in question.questionChoices').row(0)).element(by.model('questionChoice.text')).sendKeys('choice 1');
        element(by.repeater('questionChoice in question.questionChoices').row(1)).element(by.model('questionChoice.text')).sendKeys('choice 2');

        element(by.id('createMCQ')).click();

        expect(ptor.getCurrentUrl()).to.eventually.contain('answerQuestionnaire');
    });

    it('should not allow submitting answers if a question has not been answered', function() {
        browser.get('http://localhost:3001/#!/createQuestionnaire');

        element(by.model('questionnaire.name')).sendKeys('test1');
        element(by.model('questionnaire.closingDate')).sendKeys('03-January-2020');


        element(by.id('addQuestion')).click();
        element(by.model('question.text')).sendKeys('question 1');

        element(by.id('addChoice')).click();
        element(by.id('addChoice')).click();

        element(by.repeater('questionChoice in question.questionChoices').row(0)).element(by.model('questionChoice.text')).sendKeys('choice 1');
        element(by.repeater('questionChoice in question.questionChoices').row(1)).element(by.model('questionChoice.text')).sendKeys('choice 2');

        element(by.id('createMCQ')).click();

        element(by.id('submitAnswers')).click();

        //Test that we are still on the same page and no redirection happened
        expect(ptor.getCurrentUrl()).to.eventually.contain('answerQuestionnaire');
    });
});
