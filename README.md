<h1>CodeBot</h1>

<p><strong>This project was build in collaboration with https://github.com/manalrani </strong></p>

<p>Embark on a coding adventure designed just for you!

Each challenge unfolds a new chapter, pushing your skills further as you solve and explore

Ready to test your skills and learn something new?</p>

<h3>Features:</h3>

<ul>
  <li>Help programmers develop logical thinking by providing challenges and guiding them to the solution instead of outright giving them the answer.</li>
  <li>The challenges, generated by the bot, will be in the form of a story that progresses with each correct solution.</li>
  <li>The user will submit a solution to the challenge that will be checked.</li>
  <li>If the answer isn't good, the bot will give hints to help the user. The bot will keep giving hints after every wrong try. However, after 3 hints the bot will give the solution and the story will get reset to a new one.</li>
  <li>If the answer is good, the story will progress and the challenge will become slightly harder</li>
</ul>

<h3>Below are the screenshots:</h3>
</br>

![image](https://github.com/user-attachments/assets/cb42b1ce-aa3f-4c2e-bcd0-f978420f461c)

![image](https://github.com/user-attachments/assets/523e3fdb-ffb0-4734-83b1-e4a2ad5d67ac)


<h3>Youtube video link:</h3>
https://www.youtube.com/watch?v=ZHosTDFff14&ab_channel=ibrahimmansoor

<h3>To run the code:</h3>
<p>NOTE: make sure you have an OpenAI API key stored inside a .env file in the backend folder. Make sure the env variable name is OPENAI_API_KEY</p>
<p>To run the backend code, cd into the backend directory and run uvicorn main:app --reload to start the FAST API server.</p>
<p>You may also need to install dependencies such as fastapi and openai</p>
<p>To run the frontend code, cd into the frontend directory and run npm i to get the node_modules folder. After this, just run npm start to start the frontend.</p>
<p>You may also need to install dependencies such as axios and monaco editor</p>
<p>NOTE: make sure to run the backend before the frontend or else you might run into some errors</p>
