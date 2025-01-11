const token = `${40}{ "token": "1BcooLnFt1Lp2k5bXbcyziyhHsMe6kosMKwWV6HQYno=" }`;
let firstCheck = true;

function handleConnectionProbo(connection) {
  console.log("Probo client connected");

  connection.on("error", function (error) {
    console.log("Connection Error: " + error.toString());
  });
  connection.on("close", function (data) {
    console.log("Connection Closed -->  ", data);
  });
  connection.on("message", function (message) {
    let formatedString = formatString(message.utf8Data);
    if (firstCheck) {
      firstCheck = false;
      formatedString = message.utf8Data.slice(1);
    } else {
      formatString = formatString(message.utf8Data);
    }
    const data = JSON.parse(formatedString);
    console.log("data -->  ", data);
    if (data?.upgrades) {
      console.log("token-> ", token);
      connection.sendUTF(token);
      return;
    }
    if (data?.sid) {
      connection.sendUTF(["subscribe_orderbook", 3535417]);
     // connection.sendUTF(["subscribe_ltp_stream", 3535417]);
      return;
    }
    if (Number(data) === 2) {
      connection.sendUTF(3);
    }
    console.log(data);
  });
}

function formatString(s) {
  return s.slice(2);
}

module.exports = {
  handleConnectionProbo,
};
