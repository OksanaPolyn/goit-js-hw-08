'use strict';
import throttle from 'lodash.throttle';
const formRef = document.querySelector('.feedback-form'); //вибор
const LOCALE_STORAGE_KEY = 'contact-form-key'; //Не змінюєм, зберігаєм об'єкт
import { save, load, remove } from './storage';

initPage();         //викл функ щоб отрим данні з LOCALE_STORAGE_KEY

const onFormInput = event => {               //
  const { name, value } = event.target;
//try{
  let saveData = load(LOCALE_STORAGE_KEY);

  saveData = saveData ? saveData : {};
  
  saveData[name] = value;
  save(LOCALE_STORAGE_KEY, saveData);
};

const throttledOnFormInput = throttle(onFormInput, 500);
formRef.addEventListener('input', throttledOnFormInput);

function initPage() {                //перевіряємо наявність отрим данних з LOCALE_STORAGE_KEY
  const saveData = load(LOCALE_STORAGE_KEY);              

  if (!saveData) {                      //якщо нічого не збережено- вихід
    return;
  }
  Object.entries(saveData).forEach(([name, value]) => {    //поверт масив массивів-доступ до масивівч/з ФорІч
    formRef.elements[name].value = value;   //звернулись до Форми по ключу name і записуємо туди value
  });
}

const handleSubmit = event => {
  event.preventDefault();

  const {
    elements: { name, email, message },
  } = event.currentTarget;

  console.log({ name: name.value, email: email.value, message: message.value });
  event.currentTarget.reset();
  remove(LOCALE_STORAGE_KEY);
};

formRef.addEventListener('submit', handleSubmit);

