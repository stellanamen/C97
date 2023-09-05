//LINKS FIREBASE
const firebaseConfig = {
  apiKey: "AIzaSyC8xVEmnPzLK4vc0S-TC5AX3cda8osUE1s",
  authDomain: "kwiter-c06fe.firebaseapp.com",
  databaseURL: "https://kwiter-c06fe-default-rtdb.firebaseio.com",
  projectId: "kwiter-c06fe",
  storageBucket: "kwiter-c06fe.appspot.com",
  messagingSenderId: "154370899090",
  appId: "1:154370899090:web:71e58c406c2edb47e13a4b"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// OBTER NOME DO USUÁRIO E SALA
	userName = localStorage.getItem("userName");
	roomName = localStorage.getItem("roomName");

function send()
{
  msg = document.getElementById("msg").value;
  firebase.database().ref(roomName).push({
    name:userName,
    message:msg,
    like:0
   });

  document.getElementById("msg").value = "";
}


// =============== AULA C97 =============== atenção a linha 35

function getData() { 
    firebase.database().ref("/"+roomName).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebaseMessageId = childKey;
         messageData = childData;

//Início do código
         console.log(firebaseMessageId); //contem todas as Ids únicas,das mensagens,geradas pelo firebase.
	       console.log(messageData); //contem todos os dados da mensagem.

	       name = messageData['name'];
	       message = messageData['message'];
         like = messageData['like'];

         nameWithTag = "<h4> "+ name +"<img class='user_tick' src='tick.png'></h4>";
         messageWithTag = "<h4 class='message_h4'>" + message + "</h4>";
         like_button ="<button class='btn btn-warning' id="+firebaseMessageId+" value="+like+" onclick='updateLike(this.id)'>";
         spanWithTag = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>";

        row = nameWithTag + messageWithTag +like_button + spanWithTag;

        document.getElementById("output").innerHTML += row;
//Fim do código
      } });  }); }
getData();

function updateLike(messageId)
{
  console.log("botão de like pressionado - " + messageId);
	buttonId = messageId;
	likes = document.getElementById(buttonId).value;
	updatedLikes = Number(likes) + 1;
	console.log(updatedLikes);

	firebase.database().ref(roomName).child(messageId).update({
		like : updatedLikes  
	 });

}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
window.location.replace("index.html");
}
