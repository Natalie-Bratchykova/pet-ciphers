import CaesarCipher from "./caesar.js";
import ThrithemiusCipher from "./Trithemius.js";
import xorCipher from "./XOREncryption.js";
import desCipher from "./des.js";
import aesCipher from "./aes.js";
import knapsackCipher from "./knapsack.js";
import rsaCipher from "./RSA.js";
const caesar = new CaesarCipher();
const thrithemius = new ThrithemiusCipher();
const xor = new xorCipher();
const des = new desCipher();
const aes = new aesCipher();
const knapsack = new knapsackCipher();
const rsa = new rsaCipher();

const radioAsString = document.querySelector("#string");
const radioAsNumber = document.querySelector("#number");
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

const thrithemiusKeySection = document.querySelector(".thrithemius");
const standartedCiphers = document.querySelector(".standartedCiphers");
const title = document.querySelector(".title");
const selectCipherType = document.querySelector("#ciphersDropDown");
const allCipherOptions = document.querySelectorAll(".dropdown-item");
const btngenerateKeyPairs = document.querySelector("#generatePublicKey");
const knapsackKey = document.querySelector(".knapsack");
const paralellKey = document.querySelector(".paralell-key__input");
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
  static ciphers = {
    caesar: "Caesar",
    thrithemius: "Thrithemius",
    xor: "XOR",
    des: "DES",
    aes: "AES",
    knapsack: "Knapsack",
    rsa: "RSA",
  };
  constructor() {
    this.initialize();
  }

  initialize() {
    this.openThemeSettings();
    this.closeThemeSettings();
    this.applyThemeSettings();
    this.setCipherTitle();
    this.encrypt();
    this.decrypt();
    this.defineKeyType();
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
        if (title.textContent === App.ciphers.thrithemius) {
          thrithemiusKeySection.classList.remove("--hiden");
        } else {
          thrithemiusKeySection.classList.add("--hiden");
        }
        if (
          title.textContent === App.ciphers.aes ||
          title.textContent === App.ciphers.des
        ) {
          standartedCiphers.classList.remove("--hiden");
        } else {
          standartedCiphers.classList.add("--hiden");
        }
        if (title.textContent === App.ciphers.knapsack) {
          paralellKey.classList.add("--hiden");
          knapsackKey.classList.remove("--hiden");
          btngenerateKeyPairs.classList.remove("--hiden");
        } else {
          paralellKey.classList.remove("--hiden");
          knapsackKey.classList.add("--hiden");
          btngenerateKeyPairs.classList.add("--hiden");
        }
      });
    });
  }

  // executes 2 time
  encrypt() {
    let clicked = 0;
    btnEncrypt.addEventListener("click", function (e) {
      clicked++;
      e.preventDefault();
      if (title.textContent === App.ciphers.caesar) {
        textarea.value = caesar.encrypt(textarea.value, Number(keyInput.value));
      } else if (title.textContent === App.ciphers.thrithemius) {
        let isString = radioAsString.checked ? true : false;
        textarea.value = thrithemius.encrypt(
          textarea.value,
          keyInput.value,
          isString
        );
      } else if (title.textContent === App.ciphers.xor) {
        let gamma = xor.generateGamma(keyInput.value, textarea.value);
        textarea.value = xor.doCipher(textarea.value, gamma);
      }
    });
  }

  decrypt() {
    btnDecrypt.addEventListener("click", function (e) {
      e.preventDefault();
      if (title.textContent === App.ciphers.caesar) {
        textarea.value = caesar.decrypt(textarea.value, Number(keyInput.value));
      } else if (title.textContent === App.ciphers.thrithemius) {
        let isString = radioAsString.checked ? true : false;
        textarea.value = thrithemius.decrypt(
          textarea.value,
          keyInput.value,
          isString
        );
      }
    });
  }

  defineKeyType() {
    keyInput.addEventListener("input", function (e) {
      if (/^-?[0-9]+$/.test(keyInput.value.replaceAll(" ", ""))) {
        radioAsNumber.disabled = false;
      } else {
        radioAsNumber.disabled = true;
      }
    });
  }
}

const app = new App();
app.initialize();
//
