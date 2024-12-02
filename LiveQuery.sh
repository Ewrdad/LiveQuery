#!/bin/bash


if [ $1 == "start" ]
then 
    echo "Starting Up"
    #Start up the server
    cd ./server
    npm run serve & 

    cd ..

    #Start the UI
    cd ./ui/LiveQuery
    npm run dev &

    cd ../..
elif [ $1 == "stop" ]
then
    echo "Shutting Down"
    #Shut down the server
    kill $(lsof -t -i:5173) &
    kill $(lsof -t -i:3002) &

    echo "Finished Shutting Down"
else
    echo "Invalid Command"

fi