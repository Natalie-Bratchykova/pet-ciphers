import CaesarCipher from "./caesar.js";
const btnSetColorTheme = document.querySelector("#colorTheme");
const popupSetColorTheme = document.querySelector(".color-theme");
const overlay = document.querySelector(".overlay");
const btnApply = document.querySelector("#apply");
const btnReset = document.querySelector("#reset");
const btnClosePopup = document.querySelector(".close__popup");
const inputColorBg = document.querySelector("#bg");
const inputColorText = document.querySelector("#ordinaryText");
const inputColorHeader = document.querySelector("#header");
const inputColorTextareaBg = document.querySelector("#textareaBg");
const inputColorTextareaText = document.querySelector("#textareaText");
const inputColorButtonsBg = document.querySelector("#buttonsBg");
const inputColorButtonsText = document.querySelector("#buttonsText");

const title = document.querySelector(".title");
const selectCipherType = document.querySelector("#ciphersDropDown");
const allCipherOptions = document.querySelectorAll(".dropdown-item");
let r = document.querySelector(":root");

const keyInput = document.querySelector("#key");
let btnEncrypt = document.querySelector("#encrypt");
let btnDecrypt = document.querySelector("#decrypt");
const btnCopy = document.querySelector("#copy");
const textarea = document.querySelector("#textarea");

const allButtons = document.querySelectorAll("button");
allButtons.forEach((btn) =>
  btn.addEventListener("click", (e) => {
    e.preventDefault();
  })
);
class App {
  constructor() {
    this.ciphers = {
      caesar: "Caesar",
      thrithemius: "Thrithemius",
      xor: "XOR",
      des: "DES",
      aes: "AES",
      knapsack: "Knapsack",
      rsa: "RSA",
    };
    this.initialize();
  }
  initialize() {
    this.openThemeSettings();
    this.closeThemeSettings();
    this.applyThemeSettings();
    this.setCipherTitle();
  }

  openThemeSettings() {
    btnSetColorTheme.addEventListener("click", function () {
      popupSetColorTheme.classList.remove("--hiden");
      overlay.classList.remove("--hiden");
    });
  }
  closeThemeSettings() {
    btnClosePopup.addEventListener("click", function () {
      popupSetColorTheme.classList.add("--hiden");
      overlay.classList.add("--hiden");
    });
  }
  applyThemeSettings() {
    btnApply.addEventListener("click", function (e) {
      e.preventDefault();
      r.style.setProperty("--background-color", inputColorBg.value);
      r.style.setProperty("--header-bg-color", inputColorHeader.value);
      r.style.setProperty("--main-text-color", inputColorText.value);
      r.style.setProperty(
        "--encryption-menu-bg-color",
        inputColorTextareaBg.value
      );
      r.style.setProperty(
        "--encrypt-menu-buttons-bg-color",
        inputColorButtonsBg.value
      );
      r.style.setProperty(
        "--encrypt-menu-buttons-text-color",
        inputColorButtonsText.value
      );
      r.style.setProperty("--textarea-text", inputColorTextareaText.value);
    });
  }

  setCipherTitle() {
    allCipherOptions.forEach((option) => {
      option.addEventListener("click", function (e) {
        title.textContent = e.target.dataset.cipher;
      });
      this.defineCipher();
    });
  }

  defineCipher() {
    if (title.textContent === this.ciphers.caesar) {
      this.doCaesarCipher();
    } else {
      console.log("lolololalalala");
    }
  }

  doCaesarCipher() {
    const caesar = new CaesarCipher();
    btnEncrypt = this.deleteAllEventsListener(btnEncrypt);
    btnDecrypt = this.deleteAllEventsListener(btnDecrypt);
    btnEncrypt.addEventListener("click", () => {
      alert("encrypt");
      textarea.value = caesar.encrypt(textarea.value, Number(keyInput.value));
    });
    btnDecrypt.addEventListener("click", () => {
      alert("decrypt");
      textarea.value = caesar.decrypt(textarea.value, Number(keyInput.value));
    });
  }

  // doesn't work
  deleteAllEventsListener(el) {
    return el.cloneNode(true);
  }
}

const app = new App();
app.initialize();
allCipherOptions.forEach((option) => {
  option.addEventListener("click", function () {
    app.defineCipher();
  });
});
