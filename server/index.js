const http = require("http").createServer();

const io = require("socket.io")(http, {
  cors: { origin: "*" },
});

const session = {};

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on("Welcome", (message) => {
    console.log(message);
  });

  socket.on("JoinSession", (message) => {
    console.log(message);
    socket.join(message.sessionID);
    socket
      .to(message.sessionID)
      .emit(
        "UserJoined",
        `New user joined the session ${socket.id} ${message.sessionID}`
      );
    socket.emit("SuccessJoined", {
      message: "Successfully joined session",
      sessionID: message.sessionID,
      status: 200,
    });
  });

  socket.on("CreateSesh", (message) => {
    console.log(message, Date.now());
    const sessionID = message.seshID;

    session[sessionID] = {
      admin: socket.id,
      questions: [
        {
          text: "Question 1",
          options: [
            { text: "Option a", votes: 3 },
            { text: "Option c", votes: 4 },
          ],
          active: true,
        },
        {
          text: "Question 2",
          options: [
            { text: "Option 1", votes: 4 },
            { text: "Option 2", votes: 6 },
            { text: "Option 3", votes: 2 },
          ],
        },
      ],
    };
    socket.join(sessionID);

    socket.emit("SeshCreated", { status: 200, sessionID: sessionID });
  });

  socket.on("GetQuestion", (message) => {
    try {
      console.log(message);
      if (session[message.sessionID] === undefined) {
        throw new Error("Session not found");
      }
      //1 second delay
      setTimeout(() => {
        const question = session[message.sessionID].questions.filter(
          (question) => question.active
        )[0];
        socket.emit("Question", question);
      }, 1000);
      const question = session[message.sessionID].questions.filter(
        (question) => question.active
      )[0];
      socket.to(message.sessionID).emit("Question", question);
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("MakeActive", (message) => {
    try {
      if (session[message.SessionID] === undefined) {
        throw new Error("Session not found");
      }

      console.log("MakeActive", message);
      session[message.SessionID].questions.forEach((question) => {
        question.active = false;
      });
      session[message.SessionID].questions.forEach((question, index) => {
        if (index === message.index) {
          question.active = true;
        }
      });
      console.log(session[message.SessionID].questions);
      socket.to(message.SessionID).emit("Question", message.Question);
    } catch (e) {
      console.error(e);
    }
  });

  socket.on("GetAllQuestion", (message) => {
    console.log(message);
    if (session[message.sessionID] === undefined) {
      throw new Error("Session not found");
    }
    console.log(session[message.sessionID].questions);
    socket.emit("AllQuestions", {
      sessionID: message.sessionID,
      questions: session[message.sessionID].questions,
    });
  });
});

http.listen(3001, () => console.log("listening on http://localhost:3001"));
