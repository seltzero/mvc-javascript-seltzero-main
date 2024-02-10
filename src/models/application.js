import Question from "./question.js";
import Tag from "./tag.js";
import Answer from "./answer.js"; 

let instance;

export default class Application {
  constructor({ questions, tags, answers }) {
    if(!instance) {
        this.questions = [];
        this.tags = [];
        this.answers = [];

        questions.forEach((q) => {
          this.questions.push(new Question(q));
        });

        tags.forEach((t) => {
          this.tags.push(new Tag(t));
        });

        answers.forEach((a) => {
          this.answers.push(new Answer(a));
        });
        instance = this;
    }
    return instance;
  }

  // add an answer to an existing question
  addAnswer = (qid, answer) => {

    this.answers.push(new Answer(answer));
    this.getQuestionById(qid).addAnswer(answer.aid);
    console.log(this);
  };

  // add a new question
  addQuestion = (question) => {
    this.questions.push(new Question(question));
  };

  addTag = (tagname) => {
    let newtag = new Tag({ tid: "t" + (this.tags.length+1), name: tagname });
    this.tags.push(newtag);
    console.log(this.tags);
    //return tagId;
  };

  getQuestionCountByTag = (tid) => {
    let cnt = 0;
    this.questions.forEach((q) => {
      q.tagIds.forEach((t) => {
        if (t == tid) cnt++;
      });
    });

    return cnt;
  };

  getQuestionCount() {
    return this.questions.length;
  }

  // get questions and filter or order based on the possible parameters newest, active, or unanswered
  getQuestionsByFilter = (order = "newest", search = "") => {
    let qlist = this.questions;
    if (search.length) {
      const searchWords = search.toLowerCase().split(" ");
      qlist = qlist.filter((q) => {
        const questionWords = q.title.toLowerCase().split(" ");
        const questionTextWords = q.text.toLowerCase().split(" ");
        return (
          searchWords.some((word) => questionWords.includes(word)) ||
          searchWords.some((word) => questionTextWords.includes(word)) ||
          searchWords.some((word) => {
            if (word.startsWith("[") && word.endsWith("]")) {
              const tagname = word.slice(1, -1);
              return q.tagIds.some((tid) => {
                const tag = this.getTagById(tid);
                return tag && tag.name === tagname;
              });
            }
            return false;
          })
        );
      });
    }

    if (order == "newest") {
      qlist.sort((a, b) => {
        return b.askDate - a.askDate;
      });
      // TODO
    } else if (order == "active") {
      qlist.sort((a, b) => {
        const latestAnswerDateA = a.getAnswersId().reduce((latestDate, answerId) => {
          const answer = this.getAnswerByID(answerId);
          if (answer && answer.ansDate > latestDate) {
            return answer.ansDate;
          }
          return latestDate;
        }, 0);
        const latestAnswerDateB = b.getAnswersId().reduce((latestDate, answerId) => {
          const answer = this.getAnswerByID(answerId);
          if (answer && answer.ansDate > latestDate) {
            return answer.ansDate;
          }
          return latestDate;
        }, 0);

        return latestAnswerDateB - latestAnswerDateA;
        
      });
    } else if (order == "unanswered") {
      qlist = qlist.filter((q) => {
        return q.getAnswerCount() == 0;
      });
    }
    return qlist;
  };

  getQuestionById = (qid) => {
    return this.questions.find((question) => question.qid === qid);
  };

  getQuestionAnswer = (question) => {
    if (question == null) {
      return [];
    }
    console.log(question.ansIds);
    const answerObjects = question.ansIds.map((aid) => this.getAnswerByID(aid));
    console.log(answerObjects);
    return answerObjects;
  };

  getTagCount = () => {
    return this.tags.length;
  };

  getTags = () => {
    return this.tags;
  };

  getTagById = (id) => {
    console.log("getting tag with id: " + id);
    for (let t of this.tags) {
      if (t.tid == id) {
        return t;
      }
    }

    return null;
  };

  getAnswerByID = (aid) => {
    return this.answers.find((answer) => answer.aid === aid);
  }
}
