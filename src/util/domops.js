import { loadNewQuestionPage } from "../controllers/question.js";

const setMenuButton = (type = "") => {
  const question = document.getElementById("menu_question");
  const tag = document.getElementById("menu_tag");
  question.classList.remove("menu_selected");
  tag.classList.remove("menu_selected");
  if (type == "question") {
    question.classList.add("menu_selected");
  } else if (type == "tag") {
    tag.classList.add("menu_selected");
  }
};

const askQuestionBtn = () => {
  return createEle({
    type: "button",
    innerHTML: "Ask a Question",
    classes: ["bluebtn"],
    event: {
      click: () => {
        loadNewQuestionPage();
      },
    },
  });
};

const createEle = ({
  type,
  id = null,
  classes = null,
  innerHTML = null,
  event = null,
  attributes = null,
}) => {
  let newEle = document.createElement(type);
  if (id != null) {
    newEle.id = id;
  }
  if (classes != null && classes.length) {
    classes.forEach((c) => {
      newEle.classList.add(c);
    });
  }
  if (innerHTML != null) {
    newEle.innerHTML = innerHTML;
  }
  if (event != null) {
    for (let e in event) {
      newEle.addEventListener(e, event[e]);
    }
  }
  if (attributes != null) {
    for (let attr in attributes) {
      newEle.setAttribute(attr, attributes[attr]);
    }
  }

  return newEle;
};

const appendEleChild = (parent, child) => {
  child.forEach((c) => parent.appendChild(c));
};

const displayError = (element, message) => {
  // Check if there's an existing error, remove it if true
  //let existingError = element.parentElement.querySelector(".input-error");
  //if (existingError) existingError.remove();

  if (message) {
    // Create error element
    let errorEle = createEle({
      type: "div",
      innerHTML: message,
      classes: ["input-error"],
    });

    // Insert the error element after the given element
    element.parentElement.insertBefore(errorEle, element.nextSibling);
  }
};

const clearAllErrors = () => {
  let errors = document.querySelectorAll(".input-error");
  errors.forEach((error) => {
    error.remove();
  });
};

export { setMenuButton, askQuestionBtn, createEle, appendEleChild, displayError, clearAllErrors }