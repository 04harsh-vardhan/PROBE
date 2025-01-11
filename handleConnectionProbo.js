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
    console.log("message ", message);
    if (Number(message.utf8Data) === 2) {
      connection.sendUTF("3");
      console.log(3);
      return;
    }
    let formatedString;
    if (firstCheck) {
      firstCheck = false;
      formatedString = message.utf8Data.slice(1);
    } else {
      formatedString = formatString(message.utf8Data);
    }
    const data = JSON.parse(formatedString);
    if (data?.upgrades) {
      console.log(1, " --- >  ", data);
      connection.sendUTF(token);
      return;
    }
    if (data?.sid) {
      connection.sendUTF(42 + ["subscribe_orderbook", 3537097]);
      console.log(2, " --   ", data);
      // connection.sendUTF(["subscribe_ltp_stream", 3535417]);
      return;
    }
  });
}

function formatString(s) {
  return s.slice(2);
}

module.exports = {
  handleConnectionProbo,
};
