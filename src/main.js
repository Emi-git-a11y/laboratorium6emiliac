import './style.css'
import {differenceInDays, ifBirthday, differenceInWeeks, displayArticles } from './functions.js'
import dayjs from 'dayjs'

const date = document.getElementById("datepicker");
const form = document.getElementById("form");
const dialog = document.getElementById("info-dialog")
const closeButtonX = document.getElementById("close-dialog");
form.addEventListener('submit', function(e) {
    e.preventDefault();
    const dateInp = date.value;
    const answerInDays = differenceInDays(dateInp)
    if(!isNaN(answerInDays)){
      if(answerInDays>0 || ifBirthday(dateInp)){
        document.getElementById("dialog-days-result").innerHTML="Twoje urodziny były " + answerInDays + " dni temu."
        if(ifBirthday(dateInp)){
        document.getElementById("dialog-days-result").innerHTML+=" Wszystkiego najlepszego!!!"
        }
      }
      else{
        document.getElementById("dialog-days-result").innerHTML="Twoje urodziny będą za " + (-answerInDays+1) + " dni.";
        if(answerInDays<=0 && !ifBirthday(dateInp)){
            const answerInWeeks = differenceInWeeks(dateInp);
            document.getElementById("dialog-weeks-result").innerHTML="Masz urodziny za " + answerInWeeks + " tygodnie."
            if(answerInWeeks==0){
              document.getElementById("dialog-weeks-result").innerHTML+=" Masz urodziny w tym tygodniu!"
            }
          }
      }
    }else{
      document.getElementById("dialog-days-result").innerHTML="Musisz wybrać datę!"
    }
    dialog.showModal();
});
closeButtonX.addEventListener("click", () => {
  dialog.close();
});

const articlesTable = document.getElementById("mydatabase");


const displayTheArticles = async () => {
 try {
  const response = await fetch('https://jtpolkcgjrsfmwbuefyr.supabase.co/rest/v1/article', {
    //body: JSON.stringify({}),
    headers: {
    'Content-Type': 'application/json',
    'apiKey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cG9sa2NnanJzZm13YnVlZnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODQ3OTMsImV4cCI6MjA5NjI2MDc5M30.Zcvh8C4TjXwNKRTzUkTPnv8q3jf9AgmIMc3lIgYa3Ts',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cG9sa2NnanJzZm13YnVlZnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODQ3OTMsImV4cCI6MjA5NjI2MDc5M30.Zcvh8C4TjXwNKRTzUkTPnv8q3jf9AgmIMc3lIgYa3Ts'
    },
  });
  const data = await response.json();
  
  //articlesTable.innerHTML += JSON.stringify(data);
  let articles="<ol>";
  data.forEach((articleInDB)=>{
    const formattedDate = dayjs(articleInDB.created_at).format("DD-MM-YYYY");
    const tagsContent = articleInDB.tags ? articleInDB.tags.join(' | ') : '<i>Brak tagów</i>';
    articles+=`
    <li>
      <article>
        <h2>${articleInDB.title}.</h2>
        <h3>${articleInDB.subtitle}</h3>
        <address>Autor: ${articleInDB.author}</address>
        <div id="articleTags">
          ${tagsContent}
        </div>
        <p id="articleDate">Utworzono: <time datetime="${articleInDB.created_at}">${formattedDate}</time></p>
        <p id="articleContent">${articleInDB.content}</p>
      </article>
    </li>
    `;
  });
  articles+= "</ol>";
  articlesTable.innerHTML = articles;
  return data;
  } catch (error) {
    console.error('Fetch error:', error);
    articlesTable.innerHTML = `Błąd: ${error.message}`;
  }
};


displayTheArticles();