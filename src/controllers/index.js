//import data from "../data/model.js";
//import Application from "../models/application.js";
import { loadQuestionPage } from "./question.js";
import { loadTagPage } from "./tag.js";
import { createEle, appendEleChild, setMenuButton } from "../util/domops.js";

//const app = new Application(data);

window.onload = function () {
  loadFrame();
  loadQuestionPage();
};

const loadFrame = () => {
  // header
  let header = document.getElementById("header");
  let empty = createEle({ type: "div" });
  let title = createEle({
    type: "div",
    classes: ["title"],
    innerHTML: "Fake Stack Overflow",
  });
  let search = createEle({
    type: "input",
    id: "searchBar",
    event: {
      keydown: (e) => {
        if (e.key == "Enter") {
          e.preventDefault();
          loadQuestionPage("Search Results", "newest", search.value);
        }
      },
    },
    attributes: { placeholder: "Search ...", type: "text" },
  });

  appendEleChild(header, [empty, title, search]);

  // main
  let main = document.getElementById("main");
  let menu = createEle({
    type: "div",
    id: "sideBarNav",
    classes: ["sideBarNav"],
  });
  let questionbtn = createEle({
    type: "div",
    id: "menu_question",
    innerHTML: "Questions",
    classes: ["menu_button", "menu_selected"],
    event: {
      click: () => {
        loadQuestionPage();
        setMenuButton("question");
      },
    },
  });
  let tagbtn = createEle({
    type: "div",
    id: "menu_tag",
    innerHTML: "Tags",
    classes: ["menu_button"],
    event: {
      click: () => {
        loadTagPage();
        setMenuButton("tag");
      },
    },
  });
  let right = createEle({
    type: "div",
    id: "right_main",
    classes: ["right_main"],
  });
  appendEleChild(menu, [questionbtn, tagbtn]);
  appendEleChild(main, [menu, right]);
};
