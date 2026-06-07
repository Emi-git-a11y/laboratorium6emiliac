import dayjs from 'dayjs'

export const createNewArticle = async (newArticleData) => {
  try {
    const possiblePreviousError = document.getElementById("errorMessage");
    if (possiblePreviousError) possiblePreviousError.remove();

    const response = await fetch('https://jtpolkcgjrsfmwbuefyr.supabase.co/rest/v1/article', {
      method: 'POST',
      headers: {
        apiKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cG9sa2NnanJzZm13YnVlZnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODQ3OTMsImV4cCI6MjA5NjI2MDc5M30.Zcvh8C4TjXwNKRTzUkTPnv8q3jf9AgmIMc3lIgYa3Ts',
        'Content-Type' : 'application/json',
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imp0cG9sa2NnanJzZm13YnVlZnlyIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA2ODQ3OTMsImV4cCI6MjA5NjI2MDc5M30.Zcvh8C4TjXwNKRTzUkTPnv8q3jf9AgmIMc3lIgYa3Ts'
      },
      body: JSON.stringify(newArticleData),
    });
    if (response.status !== 201) {
      const errorData = await response.json();
      if (errorData && errorData.message) {
         if (errorData.message.includes("unique")) {
             throw new Error("Tytuł artykułu musi być unikalny.");
         }
         throw new Error(errorData.message); //inne błędy
      }
      throw new Error(`Status: ${response.status}`);
    }
    return true;
  } catch (error) {
    console.error('Fetch error:' , error);
    //on the webpage:
    const errorNode_p = document.createElement("p");
    errorNode_p.id = "errorMessage";
    const errorTextNode = document.createTextNode("error: " + error.message);
    const formDiv = document.getElementById("addContentToDB");
    errorNode_p.appendChild(errorTextNode);
    formDiv.appendChild(errorNode_p);
    return false;
  }
};
