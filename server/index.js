const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

const session = {};

let counter = 0;

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("increment", (message) => {
    
    console.log("increment", message);
    counter += message.amount;
    socket.emit("counter", counter);
    code = message.code ?? "default";
    socket.join(`${code}`);
    socket.to(`${code}`).emit("counter", counter);
  });


  socket.on("Welcome", (message) => {
    console.log("Welcome", message);
  });

  socket.on("JoinSession", async (message) => {
    try {
      if (session[`${message.sessionID}`] === undefined) {
        throw new Error("Session not found: JoinSession");
      }
      console.log("JoinSession", message);
      socket.join(`${message.sessionID}`);
      //Increment session player count
      session[`${message.sessionID}`]["players"] += 1;
      socket
        .to(`${message.sessionID}`)
        .emit(
          "UserJoined",
          `New user joined the session ${socket.id} ${message.sessionID}`
        );
      socket.emit("SuccessJoined", {
        message: "Successfully joined session",
        sessionID: message.sessionID,
        status: 200,
      });
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("CreateSesh", (message) => {
    console.log(message, Date.now());
    const sessionID = `${message.seshID}`;

    session[`${sessionID}`] = {
      admin: socket.id,
      players: 0,
      questions: [
        {
          text: "Question 1",
          options: [
            { text: "Option a", votes: 0 },
            { text: "Option c", votes: 0 },
          ],
          active: true,
        },
        {
          text: "Question 2",
          options: [
            { text: "Option 1", votes: 0 },
            { text: "Option 2", votes: 0 },
            { text: "Option 3", votes: 0 },
          ],
        },
      ],
    };
    socket.join(`${sessionID}`);

    socket.emit("SeshCreated", { status: 200, sessionID: `${sessionID}` });
  });

  socket.on("GetQuestion", (message) => {
    try {
      console.log("Get Message", message);
      if (session[`${message.sessionID}`] === undefined) {
        throw new Error("Session not found: GetQuestion");
      }
      socket.join(`${message.sessionID}`);

      const question = session[`${message.sessionID}`].questions.filter(
        (question) => question.active
      )[0];
      if(question.length >=2){ console.error("More than one question active WHAH WHA WHA");}

      console.info("returning these", question);
      question["players"] = session[`${message.sessionID}`].players;
      socket.to(`${message.sessionID}`).emit("Question", question);
      socket.emit("Question", question);
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("MakeActive", (message) => {
    try {
      if (session[`${message.SessionID}`] === undefined) {
        throw new Error("Session not found");
      }

      console.log("MakeActive", message);
      session[message.SessionID].questions.forEach((question) => {
        question.active = false;
      });
      session[`${message.SessionID}`].questions.forEach((question, index) => {
        if (index === message.index) {
          question.active = true;
        }
      });
      const question = session[`${message.SessionID}`].questions.filter(
        (question) => question.active
      )[0];

      socket.to(`${message.sessionID}`).emit("Question", question);
      socket.emit("Question", question);
      socket.to(`${message.sessionID}`).emit("Update", session[`${message.sessionID}`]);

    } catch (e) {
      console.error(e);
    }
  });

  socket.on("GetAllQuestion", (message) => {
    try {
      console.log("GetAllQuestions", message);
      if (session[`${message.sessionID}`] === undefined) {
        throw new Error("Session not found  : GetAllQuestion");
      }
      socket.emit("AllQuestions", {
        sessionID: `${message.sessionID}`,
        questions: session[`${message.sessionID}`].questions,
      });
      socket.to(`${message.sessionID}`).emit("AllQuestions", {
        sessionID: `${message.sessionID}`,
        questions: session[`${message.sessionID}`].questions,
      });
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("Vote", (message) => {
    try {
      if (session[`${message.sessionID}`] === undefined) {
        throw new Error("Session not found");
      }

      console.log("Vote", message);
      //Find ID of active question
      const mes = session[`${message.sessionID}`].questions.findIndex(
        (question) => question.active
      );

      session[`${message.sessionID}`].questions[mes].options[
        message.optionIndex
      ].votes += 1;
      socket
        .to(`${message.sessionID}`)
        .emit("Update", session[`${message.sessionID}`]);

        socket.to(`${message.sessionID}`).emit("AllQuestions", { sessionID: `${message.sessionID}`, questions: session[`${message.sessionID}`].questions });
        socket.to(`${message.sessionID}`).emit("Question", session[`${message.sessionID}`].questions[mes]);
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("ReplaceQuestion", (message) => {
    try {
      if (session[`${message.sessionID}`] === undefined) {
        throw new Error("Session not found");
      }

      console.log("ReplaceQuestion", message);
      session[`${message.sessionID}`].questions[message.index] =
        message.question;
      socket
        .to(`${message.sessionID}`)
        .emit("Update", session[`${message.sessionID}`]);
    } catch (e) {
      console.error(e);
    }
  });
});

http.listen(3002, () => console.log("listening on http://localhost:3002"));
