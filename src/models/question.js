import { getMetaData } from "../util/tool.js";


export default class Question {
  #views;
  constructor({ qid, title, text, tagIds, askedBy, askDate, ansIds, views }) {
    this.qid = qid;
    this.title = title;
    this.text = text;
    this.tagIds = tagIds;
    this.askedBy = askedBy;
    this.askDate = askDate;
    this.ansIds = ansIds;
    this.#views = views;
  }

  getAnswerCount() {
    return this.ansIds.length;
  }

  addAnswer(aid) {
    this.ansIds.unshift(aid);
  }

  getAnswersId() {
    return this.ansIds;
  }

  getTagsId() {
    return this.tagIds;
  }

  calculateTimeElapsed() {
    return getMetaData(this.askDate);
  }

  getQuestionViews() {
    return this.#views;
  }

  addViewCount() {
    this.#views++;
  }

}
