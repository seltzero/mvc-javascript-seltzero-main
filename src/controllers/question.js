import data from "../data/model.js";
import Application from "../models/application.js";
import { setMenuButton, askQuestionBtn, createEle, appendEleChild, displayError, clearAllErrors } from "../util/domops.js";
import { loadAnswersPage } from './answer.js'; 

const app = new Application(data);

const loadNewQuestionPage = () => {
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);

  // Create the form for new question
  let form = createEle({
    type: "form",
    id: "newQuestionForm",
    classes: ["question_form"],
  });

  let titleLabel = createEle({
    type: "label",
    innerHTML: "Question Title*",
    classes: ["form_question_title_label"],
  });
  // Create input element for question title
  let titleInput = createEle({
    type: "input",
    id: "formTitleInput",
    classes: ["form_question_title_input"],
    attributes: {
      type: "text",
      placeholder: "Limit to 100 characters or less",
      maxLength: 100,
    },
  });
  form.appendChild(titleLabel);
  form.appendChild(titleInput);
  

  let questionLabel = createEle({
    type: "label",
    innerHTML: "Question*",
    classes: ["form_text_label"],
  });
  // Create input element for question text
  let questionInput = createEle({
    type: "input",
    id: "formTextInput",
    classes: ["form_text_input"],
    attributes: {
      type: "text",
      placeholder: "Add details",
    },
  });
  form.appendChild(questionLabel);
  form.appendChild(questionInput);

  let tagsLabel = createEle({
    type: "label",
    innerHTML: "Tags*",
    classes: ["form_question_tags_label"],
  });
  // Create input element for tags
  let tagsInput = createEle({
    type: "input",
    id: "formTagInput",
    classes: ["form_question_tags_input"],
    attributes: {
      type: "text",
      placeholder: "Add keywords separated by whitespace (max 5, max 20 characters each)",
    },
  });
  form.appendChild(tagsLabel);
  form.appendChild(tagsInput);

  let usernameLabel = createEle({
    type: "label",
    innerHTML: "Username*",
    classes: ["form_username_lable"],
  });
  // Create input element for username
  let usernameInput = createEle({
    type: "input",
    id: "formUsernameInput",
    classes: ["form_username_input"],
    attributes: {
      type: "text",
      placeholder: "Enter Username Here",
    },
  });
  form.appendChild(usernameLabel);
  form.appendChild(usernameInput);

  // Create button element for posting question
  let postQuestionBtn = createEle({
    type: "button",
    id: "postQuestionBtn",
    classes: ["form_postbtn"],
    innerHTML: "Post Question",
  });
  form.appendChild(postQuestionBtn);

  // Add event listener for form submission
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    clearAllErrors();

    // Validate inputs
    let isValid = true;

    if (titleInput.value.length === 0) {
      displayError(titleInput, "Title cannot be empty");
      isValid = false;
    } 

    if (titleInput.value.length >= 100) {
      displayError(titleInput, "Title cannot be more than 100 characters");
      isValid = false;
    }

    if (questionInput.value.trim().length === 0) {
      displayError(questionInput, "Question text cannot be empty");
      isValid = false;
    }

    let tags = tagsInput.value.trim().split(" ");
    if (tags.length > 5) {
      displayError(tagsInput, "Cannot have more than 5 tags");
      isValid = false;
    }
    
    if (tags.some((tag) => tag.length > 20)) {
      displayError(tagsInput, "New tag length cannot be more than 20");
      isValid = false;
    }

    if (usernameInput.value.trim().length === 0) {
      displayError(usernameInput, "Username cannot be empty");
      isValid = false;
    }

    if (isValid) {
      // Perform form submission logic
      // Add the question to the data object in model.js

      // set the newqid to the length of the questions array + 1
      let newqid = "q" + (app.getQuestionCount() + 1);

      let tagIds = [];

      // if there are tags, add them to the tags array
      if (!(tags.length == 1 && tags[0] == "")) {
        // go through tags in app.getTags() and add them to the tags array with app.addtag() if they don't already exist
        tags.forEach((tag) => {
          if (!app.getTags().some((t) => t.name === tag)) {
            app.addTag(tag);
          }
        });
        // make an array of tag ids from the tags array
        tagIds = tags.map((tag) => app.getTags().find((t) => t.name === tag).tid);
      }

      // Define the properties for the new question
      const questionData = {
        qid: newqid,
        title: titleInput.value,
        text: questionInput.value,
        tagIds: tagIds,
        askedBy: usernameInput.value,
        askDate: new Date(),
        ansIds: new Array(),
        views: 0,
      };

      app.addQuestion(questionData);

      // Redirect the user to the home page
      loadQuestionPage();
    }
  });

  appendEleChild(main, [form]);
};

const loadQuestionPage = (
  title_text = "All Questions",
  order = "newest",
  search = ""
) => {
  let main = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  document.getElementById("right_main").replaceWith(main);

  let header = createEle({ type: "div" });

  let first = createEle({
    type: "div",
    classes: ["space_between", "right_padding"],
  });

  let title = createEle({
    type: "div",
    innerHTML: title_text,
    classes: ["bold_title"],
  });

  appendEleChild(first, [title, askQuestionBtn()]);

  let second = createEle({
    type: "div",
    classes: ["space_between", "right_padding"],
  });

  let qcnt = createEle({ type: "div", id: "question_count" });

  let btns = createEle({ type: "div", classes: ["btns"] });
  let newbtn = createEle({
    type: "button",
    innerHTML: "Newest",
    classes: ["btn"],
    event: {
      click: () => {
        document
          .getElementById("question_list")
          .replaceWith(getQuestions("newest", search));
      },
    },
  });

  let actbtn = createEle({
    type: "button",
    innerHTML: "Active",
    classes: ["btn"],
    event: {
      click: () => {
        document
          .getElementById("question_list")
          .replaceWith(getQuestions("active", search));
      },
    },
  });

  let unansbtn = createEle({
    type: "button",
    innerHTML: "Unanswered",
    classes: ["btn"],
    event: {
      click: () => {
        document
          .getElementById("question_list")
          .replaceWith(getQuestions("unanswered", search));
      },
    },
  });

  appendEleChild(btns, [newbtn, actbtn, unansbtn]);
  appendEleChild(second, [qcnt, btns]);
  appendEleChild(header, [first, second]);

  appendEleChild(main, [header]);
  appendEleChild(main, [getQuestions(order, search)]);

  setMenuButton("question");
};

const getQuestions = (order = "newest", search = "") => {
  let qlist = app.getQuestionsByFilter(order, search);

  let qcntEle = document.getElementById("question_count");
  qcntEle.textContent = qlist.length + " questions";

  if (search.length && qlist.length == 0) {
    let noresult = createEle({
      type: "div",
      id: "question_list",
      classes: ["bold_title", "right_padding", "question_list"],
      innerHTML: "No Questions Found",
    });
    return noresult;
  }

  let questionsList = createEle({
    type: "div",
    id: "question_list",
    classes: ["question_list"],
  });

  let qarray = qlist.map((q) => {
    let question = createEle({
      type: "div",
      classes: ["question", "right_padding"],     
    });

    let left = createEle({ type: "div", classes: ["postStats"] });
    let answers = createEle({
      type: "div",
      innerHTML: q.getAnswerCount() + " answers",
    });
    let views = createEle({
      type: "div",
      innerHTML: q.getQuestionViews() + " views",
    });
    appendEleChild(left, [answers, views]);

    let mid = createEle({ type: "div", classes: ["question_mid"] });
    let qTitle = createEle({
      type: "div",
      innerHTML: q.title,
      classes: ["postTitle"],
    });

    qTitle.addEventListener("click", () => {
      //loadAnswersPage(q.id); // Replace `loadAnswersPage` with the actual function name
      loadAnswersPage(q.qid);
    });

    let qTags = createEle({ type: "div", classes: ["question_tags"] });

    let tarray = q.getTagsId().map((tid) => {
      let t = app.getTagById(tid);
      let tbn = createEle({
        type: "button",
        innerHTML: t.name,
        classes: ["question_tag_button"]
      });

      return tbn;
    });

    appendEleChild(qTags, tarray);
    appendEleChild(mid, [qTitle, qTags]);

    let right = createEle({ type: "div", classes: ["lastActivity"] });
    let author = createEle({
      type: "div",
      innerHTML: q.askedBy,
      classes: ["question_author"],
    });
    let blank = createEle({
      type: "div",
      innerHTML: "&nbsp",
    });
    let meta = createEle({
      type: "div",
      innerHTML: "asked " + q.calculateTimeElapsed(),
      classes: ["question_meta"],
    });

    appendEleChild(right, [author, blank, meta]);
    appendEleChild(question, [left, mid, right]);

    return question;
  });

  appendEleChild(questionsList, qarray);

  return questionsList;
};

export { loadQuestionPage, loadNewQuestionPage }