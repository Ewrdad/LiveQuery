# LiveQuery By Edward Jones(Ewrdad) [Alpha]

A simple application to use for hosting questions and answer sessions. Designed to be live and flexible for things from ticket pointing to running workshops.

## How to use

Currently deploy method is not fleshed out, and is currently just designed to use local host.

To run at the moment you need to run :

```bash
#To start
bash ./LiveQuery.sh start

#To Stop
bash ./LiveQuery.sh stop
```

## Configurable Things

Currently no formal customisation at deploy.

### Frontend API address

This can be done by editing the websocket address in `./ui/LiveQuery/src/App.jsx` hope to update this eventually, but want to clear it working first.

### Backend Port

This can be changed at the bottom of `./server/index.js` where the webserver is hosted. Again hope to improve this at some point.
