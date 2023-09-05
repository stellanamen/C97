
//ADICIONE SEUS LINKS FIREBASE
// Your web app's Firebase configuration
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


//**********************************************
// AULA C95
//**********************************************
//      A função addRoom() ajudará a adicionar nomes de salas em localStorage do Firebase.
//      A função getData() obterá dados do Firebase e os exibirá na página da sala do kwitter.
//      A função redirectToRoomName() será redirecionada para a respectiva sala clicada.

userName = localStorage.getItem("userName");

document.getElementById("userName").innerHTML = "Bem-vindo(a) " + userName + "!";

function addRoom()
{
  roomName = document.getElementById("roomName").value;

  firebase.database().ref("/").child(roomName).update({
    purpose : "adicionar nome de sala"
  });

    localStorage.setItem("roomName", roomName);
    
    window.location = "kwitterPage.html";
}

function getData() {  firebase.database().ref("/").on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key;
      roomNames = childKey;
      console.log("Nome da Sala - " + roomNames);
      
      row = "<div class='roomName' id="+roomNames+" onclick='redirectToRoomName(this.id)' >#"+ roomNames +"</div><hr>";
      
      document.getElementById("output").innerHTML += row;
    });
  });

}

getData();

function redirectToRoomName(name)
{
  console.log(name);
  localStorage.setItem("roomName", name);
    window.location = "kwitterPage.html";
}

function logout() {
localStorage.removeItem("userName");
localStorage.removeItem("roomName");
    window.location = "index.html";
}
