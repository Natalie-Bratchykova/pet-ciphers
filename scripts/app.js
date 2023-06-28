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
const selectCipherMode = document.querySelector("#ciphersStandard");
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
const alertWindow = document.querySelector(".alert");
const alertTitle = document.querySelector(".alert__title");
const alertMessage = document.querySelector(".alert__message");
const btnAcceptAlert = document.querySelector("#accept");
const allButtons = document.querySelectorAll("button");
const inputPrivateKey = document.querySelector("#privateKey");
const inputM = document.querySelector("#m");
const inputN = document.querySelector("#n");
const inputPublicKey = document.querySelector("#publicKey");
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
    this.closeAlertWindow();
    this.generateAutomaticallyKeys();
    this.copyText();
    this.dragAndDropFile();
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
        if (title.textContent === App.ciphers.knapsack) {
          paralellKey.classList.add("--hiden");
          knapsackKey.classList.remove("--hiden");
          btngenerateKeyPairs.classList.remove("--hiden");
        } else if (title.textContent === App.ciphers.knapsack) {
          document
            .querySelectorAll(".knapsack__additional-numbers")
            .forEach((btn) => btn.classList.add("--hiden"));
        } else {
          paralellKey.classList.remove("--hiden");
          knapsackKey.classList.add("--hiden");
          btngenerateKeyPairs.classList.add("--hiden");
        }
        if (title.textContent === App.ciphers.rsa) {
          document
            .querySelectorAll(".knapsack__additional-numbers")
            .forEach((btn) => btn.classList.add("--hiden"));
          paralellKey.classList.add("--hiden");
          knapsackKey.classList.remove("--hiden");
          btngenerateKeyPairs.classList.remove("--hiden");
        }
      });
    });
  }

  encrypt() {
    btnEncrypt.addEventListener("click", function (e) {
      e.preventDefault();
      if (title.textContent === App.ciphers.caesar) {
        if (/^-?[0-9]+$/.test(keyInput.value)) {
          textarea.value = caesar.encrypt(
            textarea.value,
            Number(keyInput.value)
          );
        } else {
          alertWindow.classList.remove("--hiden");
          overlay.classList.remove("--hiden");
          alertTitle.textContent = "Error!";
          alertMessage.textContent = "Key should include only number";
          return;
        }
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
      } else if (title.textContent === App.ciphers.des) {
        textarea.value = des.encrypt(
          textarea.value,
          keyInput.value,
          selectCipherMode.value
        ).encryptedText;
      } else if (title.textContent === App.ciphers.aes) {
        textarea.value = aes.encrypt(
          textarea.value,
          keyInput.value,
          selectCipherMode.value
        ).encryptedText;
      } else if (title.textContent === App.ciphers.knapsack) {
        textarea.value = knapsack.encrypt(
          textarea.value,
          inputPublicKey.value.split(",")
        );
      } else if (title.textContent === App.ciphers.rsa) {
        textarea.value = rsa.encrypt(textarea.value, inputPublicKey.value);
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
      } else if (title.textContent === App.ciphers.xor) {
        let gamma = xor.generateGamma(keyInput.value, textarea.value);
        textarea.value = xor.doCipher(textarea.value, gamma);
      } else if (title.textContent === App.ciphers.des) {
        textarea.value = des.decrypt(
          textarea.value,
          keyInput.value,
          selectCipherMode.value,
          des.encrypt(textarea.value, keyInput.value, selectCipherMode.value).iv
        );
      } else if (title.textContent === App.ciphers.aes) {
        textarea.value = aes.decrypt(
          textarea.value,
          keyInput.value,
          selectCipherMode.value,
          aes.encrypt(textarea.value, keyInput.value, selectCipherMode.value).iv
        );
      } else if (title.textContent === App.ciphers.knapsack) {
        textarea.value = knapsack.decrypt(
          textarea.value,
          inputPrivateKey.value.split(",").map((el) => Number(el)),
          Number(inputM.value),
          Number(inputN.value)
        );
      } else if (title.textContent === App.ciphers.rsa) {
        textarea.value = rsa.decrypt(textarea.value, inputPrivateKey.value);
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

  generateAutomaticallyKeys() {
    btngenerateKeyPairs.addEventListener("click", (e) => {
      e.preventDefault();
      if (title.textContent === App.ciphers.knapsack) {
        let automaticGeneratedKeys = knapsack.generateKeysAutomatically();
        inputPrivateKey.value = automaticGeneratedKeys.privateKey;
        inputN.value = automaticGeneratedKeys.n;
        inputM.value = automaticGeneratedKeys.m;
        inputPublicKey.value = automaticGeneratedKeys.publicKey;
      } else if (title.textContent === App.ciphers.rsa) {
        let automaticGeneratedKeys = rsa.generateKeys();
        inputPublicKey.value = automaticGeneratedKeys.publicKey;
        inputPrivateKey.value = automaticGeneratedKeys.privateKey;
      }
    });
  }

  closeAlertWindow() {
    btnAcceptAlert.addEventListener("click", (e) => {
      e.preventDefault();
      alertWindow.classList.add("--hiden");
      overlay.classList.add("--hiden");
    });
  }

  copyText() {
    btnCopy.addEventListener("click", function (e) {
      e.preventDefault();
      alertWindow.classList.remove("--hiden");
      alertTitle.textContent = "Copied text";
      navigator.clipboard.writeText(textarea.value);
      navigator.clipboard
        .readText()
        .then((text) => (alertMessage.textContent = text));
    });
  }

  dragAndDropFile() {
    textarea.addEventListener("dragover", function (e) {
      e.stopPropagation();
      e.preventDefault();
      e.dataTransfer.dropEffect = "copy";
    });
    textarea.addEventListener("drop", function (e) {
      e.preventDefault();
      e.stopPropagation();
      let file = e.dataTransfer.files[0];
      let reader = new FileReader();
      reader.readAsText(file);
      reader.onload = function () {
        textarea.value = reader.result;
      };
    });
  }
}

const app = new App();
