import data from "../data/model.js";
import Application from "../models/application.js";
import { setMenuButton, askQuestionBtn, createEle, appendEleChild, displayError, clearAllErrors } from "../util/domops.js";

const app = new Application(data);

const loadAnswersPage = (qid) => {
  console.log("Loading answers page for question id: " + qid);
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);

  let question = app.getQuestionById(qid);
  let ans = app.getQuestionAnswer(question);

  console.log(ans);

  // sort the ans variable by question date
  ans.sort((a, b) => {
    return b.ansDate - a.ansDate;
  });

  question.addViewCount();

  let header = createEle({
    type: "div",
    id: "answersHeader",
    classes: ["space_between", "right_padding"],
  });

  let anscnt = createEle({
    type: "div",
    innerHTML: question.getAnswerCount() + " answers",
    classes: ["bold_title"],
  });

  let title = createEle({
    type: "div",
    innerHTML: question.title,
    classes: ["bold_title", "answer_question_title"],
  });

  appendEleChild(header, [anscnt, title, askQuestionBtn()]);

  let qbody = createEle({
    type: "div",
    id: "questionBody",
    classes: ["questionBody", "right_padding"],
  });

  let views = createEle({
    type: "div",
    classes: ["bold_title", "answer_question_view"],
    innerHTML: question.getQuestionViews() + " views",
  });

  let qText = createEle({
    type: "div",
    innerHTML: question.text,
    classes: ["answer_question_text"],
  });

  let right = createEle({ type: "div", classes: ["answer_question_right"] });

  let author = createEle({
    type: "div",
    innerHTML: question.askedBy,
    classes: ["question_author"],
  });

  let meta = createEle({
    type: "div",
    innerHTML: "asked " + question.calculateTimeElapsed(),
    classes: ["answer_question_meta"],
  });

  appendEleChild(right, [author, meta]);

  appendEleChild(qbody, [views, qText, right]);

  let anslist = createEle({ type: "div" });
  let ansarray = ans.map((a) => {
    let answer = createEle({
      type: "div",
      classes: ["answer", "right_padding"],
    });
    let answerText = createEle({
      type: "div",
      innerHTML: a.text,
      id: "answerText",
      classes: ["answerText"],
    });

    let ansRight = createEle({ type: "div", classes: ["answerAuthor"] });

    let ansAuthor = createEle({
      type: "div",
      innerHTML: a.ansBy,
      classes: ["answer_author"],
    });

    let ansMeta = createEle({
      type: "div",
      innerHTML: "answered " + a.calculateTimeElapsed(),
      classes: ["answer_question_meta"],
    });

    appendEleChild(ansRight, [ansAuthor, ansMeta]);
    appendEleChild(answer, [answerText, ansRight]);

    return answer;
  });

  appendEleChild(anslist, ansarray);

  let addAnsbtn = createEle({
    type: "button",
    innerHTML: "Answer Question",
    classes: ["bluebtn", "ansButton"],
    event: {
      click: () => {
        loadNewAnswerPage(qid);
      },
    },
  });

  appendEleChild(main, [header, qbody, anslist, addAnsbtn]);
  setMenuButton();
};

const loadNewAnswerPage = (qid) => {
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);

  // Create the form for new question
  let form = createEle({
    type: "form",
    id: "newAnswerForm",
    classes: ["answer_form"],
  });

  // Username
  let usernameLabel = createEle({
    type: "label",
    innerHTML: "Username*",
    classes: ["form_username_lable"],
  });
  let usernameInput = createEle({
    type: "input",
    id: "answerUsernameInput",
    classes: ["form_username_input"],
    //attributes: { placeholder: "Enter username" },
  });
  let usernameError = createEle({
    type: "div",
    id: "answerUsernameError",
  });
  form.appendChild(usernameError);

  // Answer text
  let textLabel = createEle({
    type: "label",
    innerHTML: "Answer Text*",
    classes: ["form_text_label"],
  });
  let textInput = createEle({
    type: "textarea",
    id: "answerTextInput",
    //attributes: { placeholder: "Add details" },
    classes: ["form_text_input"],
  });
  let textError = createEle({
    type: "div",
    id: "answerTextError",
  });
  form.appendChild(textError);

  let btnIndicatorContainer = createEle({
    type: "div",
    classes: ["btn_indicator_container"],
  });

  // Post Answer button
  let postBtn = createEle({
    type: "button",
    innerHTML: "Post Answer",
    classes: ["form_postBtn"]
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();

    let isValid = true;

    if (usernameInput.value === "") {
      usernameError.innerHTML = "Username cannot be empty";
      isValid = false;
    }
    if (textInput.value === "") {
      textError.innerHTML = "Answer text cannot be empty";
      isValid = false;
    }

    // Add your code for the operation here

    // Placeholder comment for the operation
    if (isValid) {
      //app.addAnswer(qid, username, answerText);
      //loadAnswersPage(qid);

      let newaid = "a" + (app.answers.length + 1);

      //define the properties for the new answer
      let newAnswer = {
        aid: newaid,
        text: textInput.value,
        ansBy: usernameInput.value,
        ansDate: new Date(),
      };

      app.addAnswer(qid, newAnswer);

      loadAnswersPage(qid);
    }
  });


  appendEleChild(form, [
    usernameLabel,
    usernameInput,
    textLabel,
    textInput,
    btnIndicatorContainer,
  ]);
  appendEleChild(btnIndicatorContainer, [postBtn]);
  appendEleChild(main, [form]);
};

export { loadAnswersPage };