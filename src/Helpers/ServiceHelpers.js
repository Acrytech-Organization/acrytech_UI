import { DEVELOPMENT_ENV } from "./ExtraProperties";
import { serverMethods } from "./ServerMethods";
// import { mockMethods } from "./mockMethods";

// This is one place where we can control the connection with server
// if we set this flag to false, the client will connect to the service


// var useMock = false;

if (process.env.NODE_ENV === DEVELOPMENT_ENV) {
    // useMock = true
    //if you want to connect to the emulater just change to the false of useMock value
    //if you want to connect the current project to the online you need to Add .env file
    //Add  REACT_APP_ACTUAL_SERVER = true
}

export const serviceHelpers = new serverMethods();
