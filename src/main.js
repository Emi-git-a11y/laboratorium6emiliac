import './style.css'
import {createNewArticle} from './functions.js'
import dayjs from 'dayjs'

const articlesTable = document.getElementById("mydatabase");
const sortingSelect = document.getElementById("sortingSelect");
const displayTheArticles = async (sortQuery = "created_at.asc") => {
 try {
  const url = `https://jtpolkcgjrsfmwbuefyr.supabase.co/rest/v1/article?order=${sortQuery}`;
  const response = await fetch(url, {
    //body: JSON.stringify({}),
    headers: {
    'Content-Type': 'application/json',
    'apiKey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cG9sa2NnanJzZm13YnVlZnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODQ3OTMsImV4cCI6MjA5NjI2MDc5M30.Zcvh8C4TjXwNKRTzUkTPnv8q3jf9AgmIMc3lIgYa3Ts',
    'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cG9sa2NnanJzZm13YnVlZnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODQ3OTMsImV4cCI6MjA5NjI2MDc5M30.Zcvh8C4TjXwNKRTzUkTPnv8q3jf9AgmIMc3lIgYa3Ts'
    },
  });
  const data = await response.json();
  
  //articlesTable.innerHTML += JSON.stringify(data); //debug
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

sortingSelect.addEventListener('change', function(e) {
    // e.target.value zwróci np. "created_at.desc" lub "title.asc"
    displayTheArticles(e.target.value);
});

const form = document.getElementById("form");
form.addEventListener('submit', async function(e) {
    e.preventDefault();
    const titleInp = document.getElementById("titlePicker").value;
    const subtitleInp = document.getElementById("subtitlePicker").value;
    const authorInp = document.getElementById("authorPicker").value;
    const contentInp = document.getElementById("contentPicker").value;
    const dateInp = document.getElementById("datepicker").value;
    const tagsInp = document.getElementById("tagPicker").value;
    const tagsArray = tagsInp ? tagsInp.split(',').map(tag => tag.trim()) : [];
    const articleObject = {
        author: authorInp,
        title: titleInp,
        subtitle: subtitleInp,
        content: contentInp,
        tags: tagsArray
    };
    if (dateInp) {
        articleObject.created_at = dateInp;
    }
    const success = await createNewArticle(articleObject);
    if (success) {
        form.reset();
        await displayTheArticles(sortingSelect.value);
    }
});



displayTheArticles();